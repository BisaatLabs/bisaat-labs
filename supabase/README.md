# Supabase setup

1. Run `schema.sql` in the project's Supabase SQL Editor. It creates the roster table, private write policies, and the public avatar bucket.
2. In Authentication → Users, create the email/password account that should access `/admin`.
3. Keep the project URL and anonymous key in `.env.local` for local development and in the hosting provider's environment settings for production.

Only published profiles are visible to anonymous website visitors. Every authenticated Supabase user can manage the roster, so only create accounts for trusted Bisaat Labs administrators.

## Project enquiry email

The website submits the contact form to the public `send-enquiry` Edge Function. The function
validates the request and uses Resend to deliver it to `bisaatlabs@gmail.com`; the Resend API key
never reaches the browser.

1. In Resend, verify a sending domain and create an API key.
2. In Supabase → Edge Functions → Secrets, add:
   - `RESEND_API_KEY` — the private Resend API key.
   - `ENQUIRY_FROM_EMAIL` — a sender on the verified domain, for example
     `Bisaat Labs <hello@yourdomain.com>`.
   - `ENQUIRY_TO_EMAIL` — `bisaatlabs@gmail.com`.
   - `ALLOWED_ORIGINS` — optional comma-separated website origins, for example
     `https://your-domain.com,http://localhost:8081`.
3. Deploy the function from the project root:

   ```sh
   npx supabase login
   npx supabase link --project-ref YOUR_PROJECT_REF
   npx supabase functions deploy send-enquiry --no-verify-jwt
   ```

The public form intentionally uses a function with JWT verification disabled because visitors are
not signed in. Input validation, an origin allowlist, and a hidden bot-trap are handled inside the
function. For a high-volume public launch, add Turnstile or another CAPTCHA and persistent rate
limiting as a second abuse-control layer.
