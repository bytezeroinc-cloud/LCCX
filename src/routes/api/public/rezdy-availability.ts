import { createFileRoute } from "@tanstack/react-router";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const PRODUCT_RE = /^[A-Z0-9]{4,12}$/;

type RezdyPriceOption = { label?: string; price?: number };
type RezdySession = {
  startTimeLocal?: string;
  endTimeLocal?: string;
  seats?: number;
  seatsAvailable?: number;
  priceOptions?: RezdyPriceOption[];
};

export const Route = createFileRoute("/api/public/rezdy-availability")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      GET: async ({ request }) => {
        const apiKey = process.env.REZDY_API_KEY;
        if (!apiKey) {
          return new Response(
            JSON.stringify({ error: "REZDY_API_KEY is not configured" }),
            { status: 500, headers: CORS },
          );
        }

        const url = new URL(request.url);
        const productCode = url.searchParams.get("productCode") ?? "";
        const start = url.searchParams.get("start") ?? "";
        const end = url.searchParams.get("end") ?? "";

        if (!PRODUCT_RE.test(productCode)) {
          return new Response(
            JSON.stringify({ error: "Invalid productCode" }),
            { status: 400, headers: CORS },
          );
        }
        if (!DATE_RE.test(start) || !DATE_RE.test(end)) {
          return new Response(
            JSON.stringify({ error: "start and end must be YYYY-MM-DD" }),
            { status: 400, headers: CORS },
          );
        }

        const rezdy = new URL("https://api.rezdy.com/v1/availability");
        rezdy.searchParams.set("apiKey", apiKey);
        rezdy.searchParams.set("productCode", productCode);
        rezdy.searchParams.set("startTimeLocal", `${start} 00:00:00`);
        rezdy.searchParams.set("endTimeLocal", `${end} 00:00:00`);

        try {
          const res = await fetch(rezdy.toString(), {
            headers: { Accept: "application/json" },
          });
          const text = await res.text();
          if (!res.ok) {
            console.error("Rezdy availability error", res.status, text.slice(0, 300));
            return new Response(
              JSON.stringify({ error: `Rezdy returned ${res.status}` }),
              { status: 502, headers: CORS },
            );
          }
          const json = JSON.parse(text) as {
            sessions?: RezdySession[];
            availability?: { sessions?: RezdySession[] }[];
          };
          const rawSessions: RezdySession[] =
            json.sessions ??
            json.availability?.flatMap((a) => a.sessions ?? []) ??
            [];

          const sessions = rawSessions.map((s) => ({
            startTime: s.startTimeLocal,
            endTime: s.endTimeLocal,
            seats: s.seats,
            seatsAvailable: s.seatsAvailable,
            priceOptions: (s.priceOptions ?? []).map((p) => ({
              label: p.label,
              price: p.price,
            })),
          }));

          return new Response(
            JSON.stringify({ productCode, sessions }),
            { status: 200, headers: CORS },
          );
        } catch (err) {
          console.error("rezdy-availability failed", err);
          return new Response(
            JSON.stringify({ error: "Failed to reach Rezdy" }),
            { status: 502, headers: CORS },
          );
        }
      },
    },
  },
});