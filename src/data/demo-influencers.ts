import type { Influencer } from "@/lib/supabase";

/** Generates a friendly cartoon avatar (no real people / no copyright concerns). */
export function avatarFor(seed: string) {
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear`;
}

/**
 * Shown instantly on first paint and used as a fallback whenever Supabase
 * isn't configured yet (or a request fails), so the page is always populated.
 */
export const demoInfluencers: Influencer[] = [
  {
    id: "demo-1",
    name: "Ayesha Noor",
    avatar_url: avatarFor("Ayesha Noor"),
    rating: 4.8,
    reach: "245K",
    content_type: "Comedy & Lifestyle Reels",
    instagram_url: "https://instagram.com/",
    languages: ["Urdu", "English"],
    platforms: ["Instagram", "TikTok"],
    reviews: [
      {
        reviewer: "Mavme Studio",
        comment: "Turned our launch reel into the most-watched thing we've ever posted.",
        rating: 5,
      },
      {
        reviewer: "Gullakwala",
        comment: "Easy to brief, always on time, great comedic timing.",
        rating: 4.5,
      },
    ],
  },
  {
    id: "demo-2",
    name: "Bilal Siddiqui",
    avatar_url: avatarFor("Bilal Siddiqui"),
    rating: 4.6,
    reach: "180K",
    content_type: "Food & Restaurant Reviews",
    instagram_url: "https://instagram.com/",
    languages: ["Urdu", "English"],
    platforms: ["Instagram", "YouTube"],
    reviews: [
      {
        reviewer: "Maryas Cafe",
        comment: "His review brought in a full week of reservations.",
        rating: 5,
      },
      { reviewer: "Arooma", comment: "Great production quality on every reel.", rating: 4.2 },
    ],
  },
  {
    id: "demo-3",
    name: "Mahnoor Khan",
    avatar_url: avatarFor("Mahnoor Khan"),
    rating: 4.9,
    reach: "320K",
    content_type: "Beauty & Skincare",
    instagram_url: "https://instagram.com/",
    languages: ["Urdu"],
    platforms: ["Instagram", "TikTok", "Snapchat"],
    reviews: [
      {
        reviewer: "Zensphere",
        comment: "Her audience trusts her — sell-through was immediate.",
        rating: 5,
      },
      { reviewer: "Mure", comment: "Beautifully shot, on-brand every time.", rating: 4.8 },
    ],
  },
  {
    id: "demo-4",
    name: "Hamza Tariq",
    avatar_url: avatarFor("Hamza Tariq"),
    rating: 4.4,
    reach: "96K",
    content_type: "Tech Unboxing & Reviews",
    instagram_url: "https://instagram.com/",
    languages: ["English", "Urdu"],
    platforms: ["YouTube", "Instagram"],
    reviews: [
      {
        reviewer: "Bisaat Labs",
        comment: "Detailed, honest reviews that convert well for tech clients.",
        rating: 4.5,
      },
    ],
  },
  {
    id: "demo-5",
    name: "Zara Ahmed",
    avatar_url: avatarFor("Zara Ahmed"),
    rating: 4.7,
    reach: "410K",
    content_type: "Fashion & Style",
    instagram_url: "https://instagram.com/",
    languages: ["Urdu", "English", "Punjabi"],
    platforms: ["Instagram", "TikTok"],
    reviews: [
      {
        reviewer: "Gullakwala",
        comment: "One of the biggest reach spikes we've seen from a single reel.",
        rating: 5,
      },
      {
        reviewer: "Mavme Studio",
        comment: "Professional, creative, and quick to turn content around.",
        rating: 4.6,
      },
    ],
  },
];
