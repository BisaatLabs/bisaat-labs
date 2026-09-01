# Supabase setup

1. Run `schema.sql` in the project's Supabase SQL Editor. It creates the roster table, private write policies, and the public avatar bucket.
2. In Authentication → Users, create the email/password account that should access `/admin`.
3. Keep the project URL and anonymous key in `.env.local` for local development and in the hosting provider's environment settings for production.

Only published profiles are visible to anonymous website visitors. Every authenticated Supabase user can manage the roster, so only create accounts for trusted Bisaat Labs administrators.
