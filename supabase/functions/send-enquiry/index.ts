type Enquiry = {
  name?: unknown;
  email?: unknown;
  brand?: unknown;
  project?: unknown;
  budget?: unknown;
  message?: unknown;
  website?: unknown;
};

const allowedOrigins = (Deno.env.get("ALLOWED_ORIGINS") ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

function corsHeaders(origin: string | null) {
  const allowedOrigin =
    origin && allowedOrigins.includes(origin) ? origin : (allowedOrigins[0] ?? "*");

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
}

function json(body: Record<string, unknown>, status: number, headers: HeadersInit) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]!,
  );
}

Deno.serve(async (request) => {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);

  if (request.method === "OPTIONS") return new Response("ok", { headers });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, headers);

  if (allowedOrigins.length && (!origin || !allowedOrigins.includes(origin))) {
    return json({ error: "Origin not allowed" }, 403, headers);
  }

  let payload: Enquiry;
  try {
    payload = (await request.json()) as Enquiry;
  } catch {
    return json({ error: "Invalid request" }, 400, headers);
  }

  // Bots commonly fill fields that are visually hidden from real visitors.
  if (text(payload.website, 200)) return json({ ok: true }, 200, headers);

  const enquiry = {
    name: text(payload.name, 100),
    email: text(payload.email, 254).toLowerCase(),
    brand: text(payload.brand, 120),
    project: text(payload.project, 100),
    budget: text(payload.budget, 100) || "Prefer to discuss",
    message: text(payload.message, 4000),
  };

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email);
  if (!enquiry.name || !emailIsValid || !enquiry.brand || !enquiry.project || !enquiry.message) {
    return json({ error: "Please complete all required fields." }, 400, headers);
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  const toEmail = Deno.env.get("ENQUIRY_TO_EMAIL") ?? "bisaatlabs@gmail.com";
  const fromEmail = Deno.env.get("ENQUIRY_FROM_EMAIL");

  if (!apiKey || !fromEmail) {
    console.error("Missing RESEND_API_KEY or ENQUIRY_FROM_EMAIL");
    return json({ error: "Email service is not configured." }, 500, headers);
  }

  const safe = Object.fromEntries(
    Object.entries(enquiry).map(([key, value]) => [key, escapeHtml(value)]),
  ) as typeof enquiry;

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: enquiry.email,
      subject: `Project enquiry — ${enquiry.brand}`,
      text: [
        `Name: ${enquiry.name}`,
        `Email: ${enquiry.email}`,
        `Brand: ${enquiry.brand}`,
        `Project type: ${enquiry.project}`,
        `Budget: ${enquiry.budget}`,
        "",
        "Project details:",
        enquiry.message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1c1815">
          <h1 style="font-size:24px">New project enquiry</h1>
          <p><strong>Name:</strong> ${safe.name}</p>
          <p><strong>Email:</strong> ${safe.email}</p>
          <p><strong>Brand:</strong> ${safe.brand}</p>
          <p><strong>Project type:</strong> ${safe.project}</p>
          <p><strong>Budget:</strong> ${safe.budget}</p>
          <hr style="border:0;border-top:1px solid #e8ded3;margin:24px 0" />
          <p><strong>Project details</strong></p>
          <p style="white-space:pre-wrap">${safe.message}</p>
        </div>
      `,
    }),
  });

  if (!emailResponse.ok) {
    console.error("Resend request failed", emailResponse.status, await emailResponse.text());
    return json({ error: "Unable to send enquiry." }, 502, headers);
  }

  return json({ ok: true }, 200, headers);
});
