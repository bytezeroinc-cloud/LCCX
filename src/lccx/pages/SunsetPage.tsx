import { useState } from "react";
import sunsetHeroBridge from "../../assets/lccx/ravenel-sunset-close.webp";
import sunsetMarinaEvening from "../../assets/lccx/sunset-marina-evening.jpg";
import sunsetHarborBow from "../../assets/lccx/sunset-harbor-bow.webp";
import charlestonHarborDusk from "../../assets/lccx/charleston-harbor-dusk.webp";
import { LccxHeroBanner } from "../components/LccxHeroBanner";
import { BookingFlow } from "../components/BookingFlow";
import { Icon, Btn, Container, SectionLabel, SectionWave } from "../components/Primitives";
import {
  LCCX,
  QuickFactsBar,
  DepartureTimes,
  WeatherBring,
  MapDirections,
  TestimonialsCarousel,
  type Testimonial,
} from "../components/TourSections";

const QUICK = [
  { icon: "clock", k: "Duration", v: "About 2 hours" },
  { icon: "sun", k: "Departs", v: "6:30 PM, nightly" },
  { icon: "users", k: "From", v: "$65 per person" },
  { icon: "anchor", k: "Aboard", v: "Roamer IV · up to 23" },
  { icon: "pin", k: "Boards at", v: `${LCCX.dock.name}, Mt. Pleasant` },
  { icon: "heart", k: "BYOB", v: "Drinks welcome" },
];

const FEATURES = [
  { icon: "sun", title: "Timed to golden hour", body: "We cast off at 6:30 PM, so you're on open water exactly when the harbour turns copper and the skyline lights up." },
  { icon: "route", title: "The Fort Sumter route", body: "Past Castle Pinckney, under the Ravenel Bridge, out toward Fort Sumter and the harbour mouth — Charleston's most scenic stretch of water." },
  { icon: "fish", title: "Dolphins at dusk", body: "Bottlenose dolphins feed in the harbour at golden hour. Sightings are common on the ride out and the cruise home." },
  { icon: "users", title: "Book by the seat", body: "Grab just the seats you need aboard the Roamer IV — room for up to 23, so solo travellers, couples, and families all fit comfortably." },
  { icon: "wineGlasses", title: "BYOB, fully welcome", body: "Bring champagne, beer, or a charcuterie board. We supply the cooler, ice, and cups. Toast the sunset exactly the way you like." },
  { icon: "camera", title: "Your captain shoots the photo", body: "Ask and your captain frames you against the skyline at peak light. Phones and real cameras both welcome — you'll leave with the shot." },
];

const LANDMARKS = [
  "Charleston Harbor & The Battery",
  "Ravenel (Cooper River) Bridge",
  "Castle Pinckney",
  "Fort Sumter",
  "Sullivan's Island lighthouse",
  "Dolphin feeding waters",
];

const SCHEDULE = [
  { season: "Summer · Jun–Aug", sunset: "8:15 – 8:30 PM", depart: "6:30 PM" },
  { season: "Spring & Fall", sunset: "6:30 – 7:30 PM", depart: "6:30 PM" },
  { season: "Winter · Dec–Feb", sunset: "5:15 – 5:45 PM", depart: "4:00 PM" },
];

const BRING = [
  "Light layers — it cools ~10°F on the water at dusk",
  "Flat or soft-soled shoes (no heels on deck)",
  "Sunglasses and a light jacket",
  "Your BYOB drinks & snacks — we bring the cooler & ice",
  "A phone or camera for the skyline",
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Best sunset boat tour in Charleston, hands down. We grabbed two seats our first night and the whole harbour lit up gold under the Ravenel Bridge — dolphins on the way back, ice-cold champagne. Book this sunset cruise.",
    name: "Dana & Matt K.", location: "Atlanta, GA", source: "google", image: sunsetMarinaEvening,
  },
  {
    quote: "This sunset boat trip was the highlight of our Charleston trip. Per-person seats meant we didn't have to charter the whole boat, BYOB was a nice touch, and the golden-hour light over the water was unreal.",
    name: "Priya S.", location: "Charlotte, NC", source: "instagram", image: sunsetHarborBow,
  },
  {
    quote: "If you're looking for a Charleston sunset tour, book this one. The captain knew exactly where to be for the best light and even grabbed a photo of us against the skyline. Easily five stars.",
    name: "Lauren H.", location: "Nashville, TN", source: "google", image: charlestonHarborDusk,
  },
  {
    quote: "Our Charleston harbor sunset cruise was the most romantic evening of the trip — calm water, copper sky, Fort Sumter in the distance. The perfect sunset tour for an anniversary.",
    name: "Marcus & Elena R.", location: "Columbus, OH", source: "google", image: sunsetHeroBridge,
  },
  {
    quote: "Did the shared sunset cruise solo and loved every minute. Friendly crew, a gorgeous Lowcountry sunset, and you only pay for your seat. Already telling friends it's the best sunset boat tour in Charleston.",
    name: "Jordan T.", location: "Austin, TX", source: "instagram", image: sunsetMarinaEvening,
  },
  {
    quote: "Booked a sunset boat trip for my mom's birthday and it delivered. Departed right on time, dolphins showed up, and the sky put on a show. A must-do Charleston sunset tour.",
    name: "Whitney B.", location: "Greenville, SC", source: "google", image: charlestonHarborDusk,
  },
];

const FAQ_ITEMS = [
  { q: "How much is a sunset cruise?", a: "Shared seats start at $65 per person (plus a 3% card surcharge). You only pay for the seats you book — choose your guest count right in the calendar above." },
  { q: "What time does it leave?", a: "We depart at 6:30 PM. The exact sunset shifts with the season, but 6:30 PM puts you on the water for the best light most of the year. Your date and time are confirmed in the calendar above." },
  { q: "How many people are on the boat?", a: "It's a shared cruise aboard the Roamer IV, which seats up to 23. You'll share the deck with other guests — there's plenty of room and a clear view from every seat." },
  { q: "Can we bring food and drinks?", a: "Yes — BYOB and outside snacks are fully welcome. We provide the cooler, ice, and cups. A bottle of champagne or a charcuterie board is the move." },
  { q: "What if it's cloudy or rains?", a: "Partly cloudy skies often make the most dramatic sunsets. We only cancel for unsafe weather, and you'll get a full refund or a free reschedule." },
  { q: "Where do we meet?", a: `We board at ${LCCX.dock.name}, ${LCCX.dock.locality}, about 14 minutes from downtown Charleston. Free public parking is nearby. Please arrive 15 minutes before departure.` },
  { q: "Is it good for proposals or anniversaries?", a: "It's one of Charleston's best. For a private moment, book the whole boat instead — see Private Sunset Charter at the bottom of this page." },
  { q: "Do you offer private charters?", a: "Yes. If you'd rather have the boat to just your group, book a Private Sunset Charter (linked below) — same route, your party only." },
];

const galImg: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover", display: "block" };
const featIcon: React.CSSProperties = { width: 40, height: 40, borderRadius: 10, background: "rgba(232,176,75,0.12)", border: "1px solid rgba(232,176,75,0.25)", display: "grid", placeItems: "center", flexShrink: 0 };
const routeCard: React.CSSProperties = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "24px 26px" };
const privateBand: React.CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 28, flexWrap: "wrap" };

export function SunsetPage({ onBack, onBook }: { onBack?: () => void; onBook?: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  void onBack;

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <LccxHeroBanner
        images={[
          { src: sunsetHeroBridge, alt: "Ravenel Bridge glowing at sunset over Charleston Harbor", position: "center center" },
          { src: sunsetMarinaEvening, alt: "Charleston marina ablaze under a fiery red sunset", position: "center center" },
          { src: sunsetHarborBow, alt: "Pink sunset over Charleston Harbor from the bow of the boat", position: "center center" },
          { src: charlestonHarborDusk, alt: "Blue-hour over Charleston Harbor, the marsh and the lit pier", position: "center center" },
        ]}
        title="Charleston's sunset,"
        accentTitle="by the seat."
        subtitle="Hop aboard our nightly golden-hour harbour cruise — per-person seats from $65. Ravenel Bridge, Fort Sumter & dolphins, timed to the very last light."
        ctaLabel="Book Your Seats"
        ctaIcon="sun"
        onCta={onBook}
        proofItems={[
          { icon: "sun", label: "Timed to Golden Hour" },
          { icon: "users", label: "Seats from $65" },
          { icon: "anchor", label: "Roamer IV · up to 23" },
          { icon: "star", label: "500+ Five-Star Reviews" },
        ]}
      />

      <QuickFactsBar items={QUICK} />

      {/* ── Intro ─────────────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "84px 0 48px" }}>
        <Container>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <SectionLabel style={{ justifyContent: "center", marginBottom: 16 }}>
              Charleston Sunset Harbor Cruise
            </SectionLabel>
            <h2 style={{ marginBottom: 18 }}>
              The most beautiful two hours <span style={{ color: "var(--accent)" }}>in Charleston.</span>
            </h2>
            <p className="lead" style={{ color: "var(--body)", fontSize: 18, lineHeight: 1.7 }}>
              This is <strong>the</strong> sunset boat tour in Charleston. Every evening we leave Shem Creek
              and cruise the harbour as the skyline turns gold — Ravenel Bridge, Fort Sumter, dolphins at
              dusk. Book just the seats you need from <strong>$65 a person</strong>, bring your own drinks,
              and let the captain do the rest.
            </p>
          </div>
        </Container>
      </section>

      {/* ── 3) Booking calendar (per-person seats) ────────────────────────── */}
      <div id="lccx-book" style={{ scrollMarginTop: 84 }}>
        <BookingFlow
          tourId="sunset"
          only={["shared"]}
          heading="Pick your sunset date — book your seats"
          emptyNote={
            <span>
              🌅 <strong>Per-person seats for this month are being released for the season.</strong>{" "}
              Call <a href={`tel:${LCCX.tel}`} style={{ color: "var(--accent)", fontWeight: 800 }}>{LCCX.phone}</a> to
              grab seats now, try “Go to next available date,” or{" "}
              <a href="/sunset-private" style={{ color: "var(--accent)", fontWeight: 800 }}>book a private sunset charter →</a>
            </span>
          }
        />
      </div>

      <SectionWave from="var(--cream)" to="var(--navy)" height={80} />

      {/* ── What you'll see + route ───────────────────────────────────────── */}
      <section style={{ background: "var(--navy)", padding: "100px 0" }}>
        <Container>
          <div className="ts-split">
            <div>
              <SectionLabel align="left" color="var(--accent-2)">What Makes It Special</SectionLabel>
              <h2 style={{ color: "#fff", marginTop: 16, marginBottom: 30 }}>
                The 90 minutes that make <span style={{ color: "var(--accent-2)" }}>the whole trip.</span>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {FEATURES.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span style={featIcon}>
                      <Icon name={item.icon} size={18} color="var(--accent-2)" />
                    </span>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 3 }}>
                        {item.title}
                      </div>
                      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, margin: 0 }}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "4/3" }}>
                <img src={sunsetHarborBow} alt="Pink sunset over Charleston Harbor from the bow of the boat" loading="lazy" style={galImg} />
              </div>
              <div style={routeCard}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17, color: "#fff", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                  <Icon name="route" size={18} color="var(--accent-2)" /> The route you'll cruise
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 18px" }}>
                  {LANDMARKS.map((l) => (
                    <div key={l} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 14, color: "rgba(255,255,255,0.82)" }}>
                      <Icon name="pin" size={14} color="var(--accent-2)" style={{ flexShrink: 0 }} />
                      {l}
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", margin: "14px 0 0" }}>
                  Route varies with wind &amp; tide — your captain always chases the best light.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SectionWave from="var(--navy)" to="var(--cream)" height={80} flip />

      <DepartureTimes
        title={<>We chase the light <span style={{ color: "var(--accent)" }}>year-round.</span></>}
        intro={<>The sunset moves with the season, but we depart at <strong>6:30 PM</strong> most of the year to catch the best light. The exact time for your date is shown on every tile in the calendar above. Here's roughly when the sun sets when you sail from Shem Creek:</>}
        rows={SCHEDULE}
        note="Times are typical and seasonal. Please arrive 15 minutes early — boats leave on time to catch the light."
        onBook={onBook}
      />

      <WeatherBring
        bring={BRING}
        bringTitle="Pack this for the perfect evening"
        blurb="Live Charleston Harbor conditions. Evenings are calmest on the water — but it cools quickly after sunset, so bring a layer. We sail rain or shine and only cancel for unsafe weather (full refund or free reschedule)."
      />

      <SectionWave from="#fff" to="var(--navy)" height={80} />

      {/* ── Reviews (carousel) ────────────────────────────────────────────── */}
      <TestimonialsCarousel
        kicker="Reviews"
        heading={<>The moment they keep <span style={{ color: "var(--accent-2)" }}>talking about.</span></>}
        ratingLabel="5.0 · Google & Instagram"
        testimonials={TESTIMONIALS}
        sectionBg="var(--navy)"
      />

      <SectionWave from="var(--navy)" to="#fff" height={80} flip />

      <MapDirections
        intro={`We cast off from ${LCCX.dock.name} in Mt. Pleasant — about a 14-minute drive across the Ravenel Bridge from downtown Charleston. Arrive 15 minutes before your 6:30 PM departure.`}
      />

      <SectionWave from="#fff" to="var(--cream)" height={70} />

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--cream)", padding: "100px 0" }}>
        <Container>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionLabel style={{ justifyContent: "center", marginBottom: 16 }}>FAQ</SectionLabel>
            <h2 style={{ textAlign: "center", marginBottom: 56 }}>Good to know before you board.</h2>
            <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0 40px" }}>
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} style={{ borderTop: i < 2 ? "1px solid var(--border)" : "none", borderBottom: "1px solid var(--border)" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", background: "transparent", border: 0, cursor: "pointer", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--navy)", textAlign: "left", gap: 20 }}
                  >
                    {item.q}
                    <Icon name="chevronDown" size={16} color="var(--accent)" style={{ flexShrink: 0, transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 200ms" }} />
                  </button>
                  {openFaq === i && (
                    <p style={{ margin: "0 0 22px", color: "var(--body)", lineHeight: 1.75, fontSize: 15 }}>{item.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Private charter band ──────────────────────────────────────────── */}
      <section style={{ background: "var(--navy)", padding: "64px 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <Container>
          <div style={privateBand}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <span style={{ ...featIcon, width: 52, height: 52, borderRadius: 14 }}>
                <Icon name="anchor" size={24} color="var(--accent-2)" />
              </span>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "#fff" }}>
                  Want the whole boat to yourselves?
                </div>
                <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.65)", fontSize: 15, maxWidth: 520, lineHeight: 1.6 }}>
                  Proposals, anniversaries, families & groups — book a private sunset charter on the Roamer
                  IV. Same golden-hour route, just your party.
                </p>
              </div>
            </div>
            <Btn as="a" href="/sunset-private" size="lg" variant="secondary" onDark>
              Private Sunset Charter →
            </Btn>
          </div>
        </Container>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--navy)", padding: "100px 0 120px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.12 }}>
          <img src={sunsetHeroBridge} alt="" aria-hidden style={galImg} />
        </div>
        <Container style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{ color: "#fff", maxWidth: 580, margin: "0 auto 18px", lineHeight: 1.1 }}>
            Charleston's #1 sunset cruise is leaving tonight.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 17, maxWidth: 440, margin: "0 auto 40px", lineHeight: 1.65 }}>
            Per-person seats from $65. Departs nightly, timed to the light. Book in under two minutes.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn size="lg" onClick={onBook}>
              <Icon name="sun" size={16} /> Book Your Seats →
            </Btn>
            <Btn variant="secondary" size="lg" onDark onClick={() => (window.location.href = `tel:${LCCX.tel}`)}>
              <Icon name="phone" size={16} /> {LCCX.phone}
            </Btn>
          </div>
          <p style={{ marginTop: 24, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
            Free cancellation · BYOB welcome · {LCCX.dock.address}
          </p>
        </Container>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .mobile-icon-strip { justify-content: center !important; gap: 14px !important; padding-left: 8px !important; padding-right: 8px !important; flex-wrap: nowrap !important; }
          .mobile-icon-strip > div { width: 42px; height: 42px; justify-content: center; border: 1px solid rgba(255,255,255,0.18); border-radius: 999px; background: rgba(255,255,255,0.06); font-size: 0 !important; gap: 0 !important; }
          .mobile-icon-strip > div svg { width: 18px; height: 18px; }
          .faq-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
