# Трохи бажань — birthday wishlist

Public site: https://tahon-eng.github.io/birthday-wishlist/

Buildless HTML, CSS and JavaScript on GitHub Pages, backed by a dedicated free Supabase project `birthday-wishlist` (`dhfmqhtnnbzarbwrllhl`). No build or package installation is required.

## Behaviour

- Twelve gift ideas in Ukrainian, with original illustrations and labelled store search links.
- Names and reservation statuses are public. No guest email, telephone or registration is requested.
- One reservation per physical gift, enforced by a database unique constraint even during simultaneous requests.
- Sunglasses certificates, store gift cards and cash can be chosen by several guests; each browser can choose each gift once.
- Oleg's car phone holder reservation is preloaded and cannot be cancelled by other visitors.
- Visitors can cancel their own reservation in the original browser. Clearing site data, private browsing or moving to another device loses that ability. The owner can manage reservations in Supabase Table Editor.
- Status refreshes while the tab is visible, every 15 seconds and when the browser regains focus. Writes always reach the database directly.
- A connection failure disables booking and shows a retry action; the site never fakes a successful shared booking.

## Files

`app.js` holds gift copy, illustrations and shop search links. `styles.css` controls the responsive layout. `backend.js` calls the Supabase Data API. `config.js` contains only the public URL and publishable key. Never put a secret/service_role key there.

`setup.sql` is the database setup script, already applied to the dedicated project. It can be rerun without deleting reservations. RLS and column grants hide ownership hashes; inserts require a 256-bit browser secret and matching SHA-256 hash. Cancelling requires the same browser secret. Guests cannot update names, gifts, timestamps or ownership. The raw secret is stored only in the visitor's browser, never returned by the database.

## Administration

Open https://supabase.com/dashboard/project/dhfmqhtnnbzarbwrllhl/editor and choose `wishlist_reservations` to manage bookings as the project owner. Gift text changes belong in `app.js`; gift ID changes also require updating the SQL schema and catalogue. Avoid resetting existing reservations when editing the site.

The invitation page is public and guest-entered names are not verified identities. Keep the link within your intended guest circle. For a larger public audience, add anti-abuse controls. Supabase's Free plan may pause an inactive project; check that it is active before sharing invitations.

## Verification completed

Live API checks: public catalogue and reservation reads; protected ownership hashes; rejection of missing, malformed and mismatched secrets; simultaneous unique reservation; owner cancellation; outsider cancellation rejected; UPDATE rejected; repeatable gifts; duplicate own booking rejected; Oleg protection. Temporary test reservations were removed. Browser flow: create reservation, reload, cancel own reservation.
