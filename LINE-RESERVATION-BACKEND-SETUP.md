# Reservation Backend Setup (Cloudflare Worker + LINE + Google Sheets)

> **Status: ⏳ Not set up yet.** This doc walks through creating the Google Sheet, deploying the Apps Script, getting a LINE channel token, deploying the Worker, and wiring `reserve.html` + `dashboard.html` to it — the same pattern used for O'Fresh and LarnaCake.

## 1. Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/) and create a new blank spreadsheet — name it something like "The Base Hua Hin — Reservations".
2. In row 1, add these column headers exactly (lowercase, one per cell, in this order):
   ```
   timestamp | type | name | phone | email | roomid | roomname | checkindate | checkoutdate | moveindate | duration | note | status
   ```
   `type` is "รายวัน" or "รายเดือน". Daily requests fill `checkindate`/`checkoutdate` and leave `moveindate`/`duration` blank; monthly requests are the other way around.
3. Copy the Sheet's ID from its URL — the long string between `/d/` and `/edit`, e.g.:
   ```
   https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/edit
                                          ^^^^^^^^^^^^^^^^^^^^^^^^^^ this part
   ```

## 2. Deploy the Apps Script

1. In the Sheet, go to **Extensions → Apps Script**.
2. Delete the default `Code.gs` content and paste in the contents of `reservation-sheet-script.gs` (in this folder).
3. Replace `SHEET_ID` at the top with the Sheet ID from step 1.
4. Click **Deploy → New deployment**.
5. Type: **Web app**. Execute as: **Me**. Who has access: **Anyone**.
6. Click **Deploy**, authorize the permissions Google asks for, then copy the **Web app URL** — this is `SHEETS_URL`.

## 3. Get a LINE Messaging API channel + token

1. Go to [LINE Developers Console](https://developers.line.biz/console/) and log in with the account that manages the business's LINE.
2. Create a Provider for The Base Hua Hin (or reuse an existing one).
3. Click **Create a new channel → Messaging API channel**. This channel is only used to push reservation notifications, not to chat with customers.
4. Open the channel → **Messaging API** tab → scroll to **Channel access token (long-lived)** → click **Issue**. Copy this value — it's `LINE_CHANNEL_ACCESS_TOKEN`.

## 4. Get the LINE ID that should receive reservation notifications

This is the `userId` (or `groupId`) of whoever should get pinged when a reservation request comes in — e.g. the owner's personal LINE, or a staff group chat.

1. Add the bot as a friend (or to a group), send it any message.
2. Check the **Cloudflare Worker's real-time logs** (Workers & Pages → your worker → Logs → Begin log stream) while sending — the userId/groupId of the sender appears in the webhook payload if webhook is enabled, or ask the person to message the bot and inspect via LINE's [Get follower IDs API](https://developers.line.biz/en/reference/messaging-api/#get-follower-ids).
3. Once you have the ID, that's `LINE_TARGET_ID`.

## 5. Deploy the Worker

1. Go to [Cloudflare dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Create Worker**.
2. Give it a name (e.g. `thebasehuahin-api`), then open the editor and paste in the contents of `cloudflare-worker.js` (in this folder), replacing the default code.
3. Click **Deploy**.
4. Go to **Settings → Variables and Secrets** → add these **Secret** variables:
   - `LINE_CHANNEL_ACCESS_TOKEN` = (value from step 3)
   - `LINE_TARGET_ID` = (value from step 4)
   - `SHEETS_URL` = (value from step 2)
   - `ADMIN_PIN` = a PIN of your choice for `dashboard.html`
   - `SESSION_SECRET` = a long random string (any random text is fine)
5. Save and redeploy if prompted.
6. Copy the Worker's URL, shown at the top of the page — something like `https://thebasehuahin-api.<your-subdomain>.workers.dev`.

## 6. Point the website at the Worker

Open `reserve.html`, find this line near the top of the `<script>` block:

```js
const API_URL = "https://REPLACE-ME.workers.dev/api/reserve";
```

Replace it with your real Worker URL + `/api/reserve`.

Open `dashboard.html`, find the similar `API_URL` constant near the top and replace it with your real Worker URL (base, no path suffix — the dashboard calls `/api/admin/login`, `/api/admin/reservations`, `/api/admin/update-status` itself).

## Notes

- The "Call Us" and "Facebook" links on the reserve page are kept as backup contact options — they don't depend on the Worker.
- If the Worker call fails (network issue, misconfigured secret, etc.), the page shows an error and tells the customer to contact the owner directly, so no reservation request is silently lost.
- To rotate the LINE token or update secrets later, run `wrangler secret put LINE_CHANNEL_ACCESS_TOKEN --name thebasehuahin-api` (or the relevant secret name) from this folder and paste the new value when prompted.
