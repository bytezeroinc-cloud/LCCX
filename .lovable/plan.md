# FareHarbor Reseller API Integration

Replace the embed iframe with a native, on-site booking flow powered by the FareHarbor Reseller API. Customers browse availability, pick a time, enter guest info, and pay — all without leaving the site.

## Background

Today, every "Book" CTA opens a modal iframe pointing at `fareharbor.com/embeds/book/lowcountrycoastalexcursions/...`. We want to replace that with a custom UI that calls FareHarbor's REST API server-side.

FareHarbor Reseller API basics:
- Base: `https://fareharbor.com/api/external/v1/`
- Auth headers (server-only, never sent to browser):
  - `X-FareHarbor-API-App: <APP_KEY>`
  - `X-FareHarbor-API-User: <USER_KEY>`
- Key endpoints we'll use:
  - `GET /companies/<shortname>/items/` — list bookable tours
  - `GET /companies/<shortname>/items/<item_pk>/availabilities/date-range/?start=YYYY-MM-DD&end=YYYY-MM-DD` — time slots + pricing
  - `GET /companies/<shortname>/availabilities/<availability_pk>/` — slot details (customer types, capacity)
  - `POST /companies/<shortname>/availabilities/<availability_pk>/bookings/` — create booking (returns `payment_url` for hosted checkout, or supports direct card via Reseller agreement)

Shortname is `lowcountrycoastalexcursions` (visible in current embed URL).

## Plan

### 1. Store API credentials securely
Add two runtime secrets via Lovable Cloud (you'll be prompted):
- `FAREHARBOR_APP_KEY`
- `FAREHARBOR_USER_KEY`

These are read only inside server functions via `process.env` — never bundled to the client.

### 2. Server-side FareHarbor client
Create `src/lib/fareharbor.server.ts`:
- Tiny `fhFetch(path, init)` wrapper that injects auth headers and base URL
- Typed helpers: `listItems()`, `getAvailabilities(itemPk, start, end)`, `getAvailability(availPk)`, `createBooking(availPk, payload)`
- Throws structured errors with status + body for clean UI handling

### 3. Server functions (RPC) in `src/lib/booking.functions.ts`
Using `createServerFn` (TanStack Start pattern):
- `getTours()` — cached list of items
- `getAvailability({ itemPk, startDate, endDate })` — calendar/time slots with prices and seats remaining
- `getSlotDetails({ availabilityPk })` — customer types (adult/child/etc.), per-type pricing, min/max guests
- `createBooking({ availabilityPk, customers, contact, note })` — returns `{ uuid, payment_url }`

All inputs validated with Zod (length/format limits, ISO dates, guest counts capped).

### 4. Map our tour pages → FareHarbor item PKs
Add a small config `src/lib/fareharbor-items.ts` that maps each tour route id (`fossil`, `sharktooth`, `bachelorette`, `sunset`, `dolphin`, `kids-fishing-camp`) to its FareHarbor `item_pk`. We'll discover the PKs via a one-time `getTours()` call and hard-code the mapping (you'll confirm).

### 5. Booking UI
New component `src/lccx/components/BookingFlow.tsx` — a 4-step modal that replaces the iframe:
1. **Date** — month calendar; days with availability are highlighted (driven by `getAvailability`)
2. **Time** — list of slots for the selected day with price + "X seats left"
3. **Guests** — steppers per customer type, live total
4. **Contact + Pay** — name, email, phone, optional note → `createBooking` → redirect to FareHarbor's `payment_url` (PCI-compliant hosted checkout, customer returns to a confirmation page on our site)

Wire into existing `LccxShell` booking event so every existing "Book" CTA opens the new flow instead of the iframe. Per-tour pages (e.g. SharkToothPage) pass their `itemPk` via the `lccx:open-booking` event.

### 6. Confirmation route
`src/routes/booking-confirmed.tsx` — reads `?uuid=` from the URL, calls a `getBooking` server fn, shows summary + "what to bring" details.

### 7. Keep iframe as fallback
If `FAREHARBOR_APP_KEY` is unset (preview without secrets), the booking event falls back to the existing iframe modal so nothing breaks.

## Technical notes (for engineers)

- All FareHarbor calls live in `*.server.ts` / `*.functions.ts` — import-protection blocks them from the client bundle. Keys never reach the browser.
- Rate limits: FareHarbor Reseller API ~60 req/min per key. We cache `getTours()` and `getAvailability()` responses in memory for 60s in the Worker, keyed by item+date-range.
- Payment: default to FareHarbor's hosted payment page via `payment_url`. Direct card capture requires PCI scope and is out of scope for v1.
- Cancellations/refunds aren't part of v1 — those happen via FareHarbor dashboard.
- Errors from FareHarbor (sold out, validation) are surfaced to the UI with friendly messages; raw API errors are logged server-side only.

## What I need from you to proceed

1. The **APP key** and **USER key** for the Reseller API (added as secrets — I'll prompt).
2. Confirmation that `lowcountrycoastalexcursions` is the correct shortname (looks correct from current embed URLs).
3. Approve hosted-payment redirect (FareHarbor `payment_url`) for v1, vs. building direct card capture later.
