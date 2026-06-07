import { createFileRoute } from "@tanstack/react-router";
import "@tanstack/react-start";

const SYSTEM_PROMPT = `You are the LowCountry Coastal Excursions (LCCX) virtual concierge — a friendly, knowledgeable Charleston tour expert helping guests learn about and book private boat tours.

ABOUT LCCX:
- Family-owned charter company operating since 2012, departing from Shem Creek Marina (110 Mill St, Mt. Pleasant, SC 29464).
- USCG-licensed local captains, private boats only (no shared tours), groups up to 23 guests.
- 14 minutes from downtown Charleston. Free parking, covered boarding area.
- Phone: (843) 508-1600 · Email: keith.lccx@gmail.com

TOURS WE OFFER:
1. Dolphin Watching — Find pods in Shem Creek & Charleston Harbor. From $95/guest.
2. Sunset Harbor Cruise — Golden hour over Ravenel Bridge & Charleston skyline. BYOB. From $95/guest.
3. Shark Tooth Hunting — Megalodon teeth on barrier-island beaches (Morris Island, Edisto). Family favorite. From $85/guest.
4. Fossil Hunt — Private fossil expeditions for collectors. Ancient ocean-floor finds.
5. Bachelorette & Birthday Charters — Custom playlists, decorations, photo moments. From $650 / half-day.
6. Kids Fishing Camp — Youth fish camp on Shem Creek, week-long programs.
7. Private Charters — Custom itineraries, year-round, depart 7 AM – 8:30 PM.

HOW TO HELP:
- Recommend the best tour based on group size, interests, occasion, and time of year.
- Answer logistics: what to bring, weather policy, restrooms, accessibility, age limits, parking, gift cards.
- For booking, share the phone (843) 508-1600 OR direct guests to the "Book Now" button at the top of the page. Mention the team responds within a few hours.
- Keep replies short, warm, and Lowcountry-friendly. Use markdown sparingly (occasional bold or short bullet lists). Never invent prices, dates, or policies — defer to the team if unsure.
- If asked something unrelated to LCCX or Charleston tours, politely redirect.

Always be helpful, never pushy. Your goal is to make the guest feel taken care of.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const { messages } = (await request.json()) as {
            messages: Array<{ role: "user" | "assistant"; content: string }>;
          };

          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            return Response.json(
              { error: "AI service is not configured." },
              { status: 500 },
            );
          }

          const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              stream: true,
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...(Array.isArray(messages) ? messages : []),
              ],
            }),
          });

          if (!upstream.ok) {
            if (upstream.status === 429) {
              return Response.json(
                { error: "Too many requests right now — please try again in a moment." },
                { status: 429 },
              );
            }
            if (upstream.status === 402) {
              return Response.json(
                { error: "AI service is temporarily unavailable. Please call (843) 508-1600." },
                { status: 402 },
              );
            }
            const detail = await upstream.text().catch(() => "");
            console.error("AI gateway error", upstream.status, detail);
            return Response.json({ error: "AI service error." }, { status: 502 });
          }

          if (!upstream.body) {
            return Response.json({ error: "Empty response from AI service." }, { status: 502 });
          }

          return new Response(upstream.body, {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            },
          });
        } catch (e) {
          console.error("chat route error", e);
          return Response.json(
            { error: e instanceof Error ? e.message : "Unknown error" },
            { status: 500 },
          );
        }
      },
    },
  },
});