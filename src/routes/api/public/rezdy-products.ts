import { createFileRoute } from "@tanstack/react-router";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

type RezdyProduct = {
  productCode?: string;
  name?: string;
  shortDescription?: string;
  advertisedPrice?: number;
  productType?: string;
};

export const Route = createFileRoute("/api/public/rezdy-products")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      GET: async () => {
        const apiKey = process.env.REZDY_API_KEY;
        if (!apiKey) {
          return new Response(
            JSON.stringify({ error: "REZDY_API_KEY is not configured" }),
            { status: 500, headers: CORS },
          );
        }

        const rezdy = new URL("https://api.rezdy.com/v1/products");
        rezdy.searchParams.set("apiKey", apiKey);
        rezdy.searchParams.set("limit", "100");

        try {
          const res = await fetch(rezdy.toString(), {
            headers: { Accept: "application/json" },
          });
          const text = await res.text();
          if (!res.ok) {
            console.error("Rezdy products error", res.status, text.slice(0, 300));
            return new Response(
              JSON.stringify({ error: `Rezdy returned ${res.status}` }),
              { status: 502, headers: CORS },
            );
          }
          const json = JSON.parse(text) as { products?: RezdyProduct[] };
          const products = (json.products ?? []).map((p) => ({
            code: p.productCode,
            name: p.name,
            price: p.advertisedPrice,
            type: p.productType,
            description: p.shortDescription,
          }));
          return new Response(JSON.stringify({ products }), { status: 200, headers: CORS });
        } catch (err) {
          console.error("rezdy-products failed", err);
          return new Response(
            JSON.stringify({ error: "Failed to reach Rezdy" }),
            { status: 502, headers: CORS },
          );
        }
      },
    },
  },
});