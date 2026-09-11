# TCEA Solve Counter API

This is the smallest backend needed for the anonymous breakout solve counters.

It stores only:

- `breakout_id`
- `count`
- `updated_at`

It does not accept names, emails, answers, school names, device IDs, cookies, or persistent user identifiers. The frontend sends only an empty `POST` request to increment a breakout ID.

## Setup Needed

1. Create a Cloudflare Worker.
2. Create a D1 database named `tcea-solve-counter`.
3. Copy `wrangler.toml.example` to `wrangler.toml`.
4. Replace `PASTE_D1_DATABASE_ID_HERE` with the D1 database ID.
5. Apply `schema.sql` to the D1 database.
6. Deploy the Worker.
7. Put the deployed Worker URL in `shared/solve-counter-config.js`.

The Worker config disables persisted Workers Logs with `[observability] enabled = false` and `head_sampling_rate = 0`.
