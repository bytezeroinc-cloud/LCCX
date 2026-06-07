import { createFileRoute } from "@tanstack/react-router";

// Server-side route that creates a Rezdy booking + charges via RezdyPay.
// The Stripe card token is generated client-side (Stripe Elements) using the
// RezdyPay publishable key, so raw card data never touches our server (no PCI).
// Payment mutation endpoint — restrict to our own origin so third-party sites
// can't POST card tokens / read booking responses cross-origin. (Same-origin
// requests from our own frontend don't consult this header at all.)
const CORS = {
  "Access-Control-Allow-Origin": "https://charlestonsharkteethhunting.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const PRODUCT_RE = /^[A-Z0-9]{4,12}$/;
const DATETIME_RE = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Quantity = { optionLabel: string; value: number };
type Extra = { name?: string; quantity?: number };
type BookingBody = {
  productCode?: string;
  startTimeLocal?: string;
  quantities?: Quantity[];
  extras?: Extra[];
  customer?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
  };
  voucherCode?: string;
  termsAccepted?: boolean;
  marketingOptIn?: boolean;
  cardToken?: string;
};

export const Route = createFileRoute("/api/public/rezdy-create-booking")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: async ({ request }) => {
        const json = (obj: unknown, status: number) =>
          new Response(JSON.stringify(obj), { status, headers: CORS });

        const apiKey = process.env.REZDY_API_KEY;
        if (!apiKey) return json({ error: "REZDY_API_KEY is not configured" }, 500);

        let body: BookingBody;
        try {
          body = (await request.json()) as BookingBody;
        } catch {
          return json({ error: "Invalid JSON body" }, 400);
        }

        const { productCode, startTimeLocal, quantities, extras, customer, cardToken, termsAccepted, marketingOptIn, voucherCode } = body;

        if (!productCode || !PRODUCT_RE.test(productCode))
          return json({ error: "Invalid productCode" }, 400);
        if (!startTimeLocal || !DATETIME_RE.test(startTimeLocal))
          return json({ error: "startTimeLocal must be 'YYYY-MM-DD HH:mm:ss'" }, 400);
        if (!Array.isArray(quantities) || quantities.length === 0)
          return json({ error: "quantities are required" }, 400);
        const cleanQuantities = quantities
          .filter((q) => q && typeof q.optionLabel === "string" && Number(q.value) > 0)
          .map((q) => ({ optionLabel: q.optionLabel, value: Math.floor(Number(q.value)) }));
        if (cleanQuantities.length === 0)
          return json({ error: "At least one quantity with value > 0 is required" }, 400);
        // Optional paid extras (e.g. the $150 private guide). Matched by name in Rezdy.
        const cleanExtras = (Array.isArray(extras) ? extras : [])
          .filter((e) => e && typeof e.name === "string" && Number(e.quantity) > 0)
          .map((e) => ({ name: e.name as string, quantity: Math.floor(Number(e.quantity)) }));
        if (!customer?.firstName || !customer?.lastName)
          return json({ error: "Customer first and last name are required" }, 400);
        if (!customer?.email || !EMAIL_RE.test(customer.email))
          return json({ error: "A valid customer email is required" }, 400);
        // Phone is how the operator reaches guests about weather/schedule
        // changes — require at least 7 digits (matches client-side requirement).
        const phoneDigits = (customer?.phone ?? "").replace(/\D/g, "");
        if (phoneDigits.length < 7)
          return json({ error: "A valid customer phone number is required" }, 400);
        if (!cardToken || typeof cardToken !== "string")
          return json({ error: "cardToken is required" }, 400);

        // Record consent on the booking so it shows on the manifest/booking
        // record (first-party data + proof of terms acceptance).
        const comments = [
          "Booked via charlestonsharkteethhunting.com",
          `Terms & waiver accepted: ${termsAccepted ? "Yes" : "No"}`,
          `Marketing opt-in: ${marketingOptIn ? "Yes" : "No"}`,
        ].join(" | ");

        const payload = {
          comments,
          customer: {
            firstName: customer.firstName.trim(),
            lastName: customer.lastName.trim(),
            email: customer.email.trim(),
            phone: (customer.phone ?? "").trim(),
            ...(customer.company?.trim() ? { company: customer.company.trim() } : {}),
          },
          ...(voucherCode?.trim() ? { voucherCode: voucherCode.trim() } : {}),
          items: [
            {
              productCode,
              startTimeLocal,
              quantities: cleanQuantities,
              ...(cleanExtras.length ? { extras: cleanExtras } : {}),
            },
          ],
          // RezdyPay: omit `payments`, pass the Stripe token. Rezdy charges the card.
          creditCard: { cardToken },
        };

        try {
          const res = await fetch(
            `https://api.rezdy.com/v1/bookings?apiKey=${encodeURIComponent(apiKey)}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json", Accept: "application/json" },
              body: JSON.stringify(payload),
            },
          );
          const text = await res.text();
          let parsed: {
            requestStatus?: { success?: boolean; error?: { errorMessage?: string } };
            booking?: { orderNumber?: string; status?: string };
          } = {};
          try {
            parsed = JSON.parse(text);
          } catch {
            /* non-JSON response */
          }

          // Require an EXPLICIT success from Rezdy. `!== false` previously let
          // an empty/redirect/maintenance 200 (no requestStatus) through as a
          // fake success — showing the customer a confirmation with no booking.
          const ok = res.ok && parsed.requestStatus?.success === true;
          if (!ok) {
            const msg =
              parsed.requestStatus?.error?.errorMessage || `Rezdy returned ${res.status}`;
            console.error("rezdy booking failed", res.status, text.slice(0, 600));
            return json({ error: msg }, 400);
          }

          return json(
            {
              ok: true,
              orderNumber: parsed.booking?.orderNumber ?? null,
              status: parsed.booking?.status ?? null,
            },
            200,
          );
        } catch (err) {
          console.error("rezdy-create-booking failed", err);
          return json({ error: "Failed to reach Rezdy" }, 502);
        }
      },
    },
  },
});
