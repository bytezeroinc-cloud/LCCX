import { useState } from "react";
import fossilHeroKids from "../../assets/lccx/st-kids-teeth.jpg";
import fossilHeroHunt from "../../assets/lccx/st-fossil-hunt.jpg";
import fossilHeroHand from "../../assets/lccx/fossil-teeth-hand.webp";
import { LccxHeroBanner } from "../components/LccxHeroBanner";
import {
  Icon,
  Btn,
  Container,
  Placeholder,
  SectionLabel,
  SectionWave,
} from "../components/Primitives";
import { QuickFactsBar, DepartureTimes, WeatherBring, MapDirections } from "../components/TourSections";

const FH_QUICK = [
  { icon: "clock", k: "Duration", v: "3–4 hours" },
  { icon: "sun", k: "Departs", v: "Mornings (tide-timed)" },
  { icon: "users", k: "From", v: "$125 / person (shared)" },
  { icon: "shell", k: "You keep", v: "Every fossil you find" },
  { icon: "anchor", k: "Aboard", v: "Up to 23 guests" },
  { icon: "pin", k: "Boards at", v: "Shem Creek, Mt. Pleasant" },
];

const FH_SCHEDULE = [
  { season: "Morris Island (4 hrs · shared)", sunset: "Tide-timed", depart: "~8:00 AM" },
  { season: "Fossil & shell hunt (3 hrs · private)", sunset: "Tide-timed", depart: "morning" },
  { season: "Fossil & shell hunt (4 hrs · private)", sunset: "Tide-timed", depart: "morning" },
];

const FH_BRING = [
  "Water shoes or sandals you can get wet",
  "Sunscreen, a hat & sunglasses",
  "A bag for your fossils & shells",
  "Water & snacks (BYOB welcome)",
  "A towel and a change of clothes",
];

const REVIEWS = [
  {
    q: "My 7-year-old found 12 shark teeth in under an hour. She cried when we had to leave. Best $200 we spent on our entire trip.",
    n: "Sarah M.",
    src: "Google",
    stars: 5,
  },
  {
    q: "Our family of five found something on every single stop. The captain turned it into a real educational adventure — kids and adults loved every minute.",
    n: "The Hendersons",
    src: "TripAdvisor",
    stars: 5,
  },
  {
    q: "I was skeptical but we literally found megalodon teeth. Real ones. 40 million years old. Coming back next summer.",
    n: "Derek L.",
    src: "Google",
    stars: 5,
  },
];

const WHAT_YOU_FIND = [
  {
    icon: "fish",
    title: "Megalodon Teeth",
    body: "The holy grail — up to 7 inches long, jet black, unmistakable. We find them every week.",
  },
  {
    icon: "anchor",
    title: "Shark Teeth",
    body: "Sand tiger, mako, bull, and lemon shark teeth are the most common finds. Most guests leave with 20–40.",
  },
  {
    icon: "leaf",
    title: "Whale Bone",
    body: "Ancient whale vertebrae and ear bones surface on the lower tide flats — big, heavy, and totally unique.",
  },
  {
    icon: "compass",
    title: "Shells & Fossils",
    body: "Fossilised coral, horse conch, and prehistoric shells round out the haul. Every find has a story.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Do kids need any experience?",
    a: "None at all. Ages 4 and up can do this trip. The captain teaches everyone the sifting technique on the spot — most kids are pros within 10 minutes.",
  },
  {
    q: "Do we keep everything we find?",
    a: "Yes — every tooth, bone, and fossil is yours. We pack everything in individual bags and give you a reference sheet to ID each species at home.",
  },
  {
    q: "What if we don't find anything?",
    a: "We've never left anyone empty-handed. Our Find-Something Promise means if your group finds zero fossils, the trip is free. We haven't paid out yet.",
  },
  {
    q: "What should we wear / bring?",
    a: "Water shoes or sandals that can get wet. Light clothing. Sunscreen. We provide everything else — sifting tools, reference guides, collection bags, and cold water.",
  },
  {
    q: "How many guests can come?",
    a: "Up to 23 guests per charter. Great for families, school groups, birthday parties, or any group that wants a genuinely unique Charleston experience.",
  },
];

export function FossilHuntPage({ onBack, onBook }: { onBack?: () => void; onBook?: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <LccxHeroBanner
        images={[
          { src: fossilHeroKids, alt: "Kids showing fossils after a Charleston fossil hunt", position: "center center" },
          { src: fossilHeroHunt, alt: "Guests walking a Lowcountry shoreline on a fossil hunt", position: "center center" },
          { src: fossilHeroHand, alt: "Fossil shark teeth held in hand on a sandy beach", position: "center center" },
        ]}
        title="Real fossils."
        accentTitle="They keep every one."
        subtitle="Private barrier island beaches, 40-million-year-old finds, and a guide who guarantees your group goes home with fossils."
        ctaLabel="Book the Fossil Hunt"
        ctaIcon="compass"
        onCta={onBook}
        proofItems={[
          { icon: "shield", label: "Find-Something Promise" },
          { icon: "users", label: "Up to 23 Guests" },
          { icon: "anchor", label: "Keep Everything" },
          { icon: "star", label: "500+ Five-Star Reviews" },
        ]}
      />

      <QuickFactsBar items={FH_QUICK} />

      {/* ── What you'll find ──────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "100px 0" }}>
        <Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
            className="fh-split"
          >
            <div>
              <SectionLabel>What You'll Take Home</SectionLabel>
              <h2 style={{ marginTop: 16, marginBottom: 32 }}>
                Ancient ocean floor, <span style={{ color: "var(--accent)" }}>in your pocket.</span>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {WHAT_YOU_FIND.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: "rgba(255,122,26,0.10)",
                        border: "1px solid rgba(255,122,26,0.20)",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon name={item.icon} size={20} color="var(--accent)" />
                    </span>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: 16,
                          color: "var(--navy)",
                          marginBottom: 4,
                        }}
                      >
                        {item.title}
                      </div>
                      <p
                        style={{ fontSize: 14, color: "var(--body)", lineHeight: 1.65, margin: 0 }}
                      >
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 36 }}>
                <Btn onClick={onBook}>Book the Hunt →</Btn>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "4/3" }}>
                <Placeholder kind="stteeth" width="100%" height="100%" />
              </div>
              <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "16/9" }}>
                <Placeholder kind="sthunt" width="100%" height="100%" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SectionWave from="#fff" to="var(--sand)" height={70} />

      {/* ── Why private matters ──────────────────────────────────────────── */}
      <section style={{ background: "var(--sand)", padding: "100px 0" }}>
        <Container>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
            <SectionLabel>Why Private Matters</SectionLabel>
            <h2 style={{ marginTop: 16 }}>
              Your group. Your beach. Your pace.
            </h2>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
            className="fh-why"
          >
            {[
              {
                icon: "anchor",
                head: "Private Barrier Islands",
                body: "We take you to beaches not accessible by car or foot — these tidal flats are only reachable by boat, and that means far fewer people and far more fossils.",
              },
              {
                icon: "clock",
                head: "Tide-Timed Departures",
                body: "We don't leave until the tide is right. Every trip is scheduled to arrive when the fossil layer is maximally exposed — that's the difference between 5 finds and 50.",
              },
              {
                icon: "users",
                head: "No Strangers Allowed",
                body: "Your boat is your group only. No sharing with other families, no waiting, no strangers. The captain's full attention is on your people.",
              },
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "36px 28px",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: "rgba(255,122,26,0.10)",
                    display: "grid",
                    placeItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Icon name={c.icon} size={22} color="var(--accent)" />
                </span>
                <h3 style={{ color: "var(--navy)", marginBottom: 10 }}>{c.head}</h3>
                <p style={{ fontSize: 14, color: "var(--body)", lineHeight: 1.7, margin: 0 }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <SectionWave from="var(--sand)" to="var(--navy)" height={80} />

      {/* ── Reviews ───────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--navy)", padding: "100px 0" }}>
        <Container>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 48,
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <h2 style={{ color: "#fff", maxWidth: 380 }}>
              Families come back every year.
            </h2>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Icon
                  key={i}
                  name="star"
                  size={18}
                  color="var(--accent-2)"
                  style={{ fill: "var(--accent-2)" }}
                />
              ))}
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#fff",
                  marginLeft: 8,
                }}
              >
                5.0
              </span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginLeft: 4 }}>
                Google &amp; TripAdvisor
              </span>
            </div>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
            className="fh-reviews"
          >
            {REVIEWS.map((r, i) => (
              <figure
                key={i}
                style={{
                  margin: 0,
                  padding: "32px 28px",
                  borderRadius: 20,
                  background: i === 1 ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <div style={{ display: "flex", gap: 3 }}>
                  {[0, 1, 2, 3, 4].map((j) => (
                    <Icon
                      key={j}
                      name="star"
                      size={13}
                      color="var(--accent-2)"
                      style={{ fill: "var(--accent-2)" }}
                    />
                  ))}
                </div>
                <blockquote
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.72,
                    color: "rgba(255,255,255,0.82)",
                    fontStyle: "italic",
                    flex: 1,
                  }}
                >
                  "{r.q}"
                </blockquote>
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 14,
                      color: "#fff",
                    }}
                  >
                    {r.n}
                  </span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{r.src}</span>
                </div>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <SectionWave from="var(--navy)" to="#fff" height={80} flip />

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "100px 0" }}>
        <Container>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionLabel style={{ justifyContent: "center", marginBottom: 16 }}>FAQ</SectionLabel>
            <h2 style={{ textAlign: "center", marginBottom: 56 }}>
              Questions from families like yours.
            </h2>
            <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0 40px" }}>
              {FAQ_ITEMS.map((item, i) => (
                <div
                  key={i}
                  style={{
                    borderTop: i === 0 ? "1px solid var(--border)" : "none",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "22px 0",
                      background: "transparent",
                      border: 0,
                      cursor: "pointer",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 16,
                      color: "var(--navy)",
                      textAlign: "left",
                      gap: 20,
                    }}
                  >
                    {item.q}
                    <Icon
                      name="chevronDown"
                      size={16}
                      color="var(--accent)"
                      style={{
                        flexShrink: 0,
                        transform: openFaq === i ? "rotate(180deg)" : "none",
                        transition: "transform 200ms",
                      }}
                    />
                  </button>
                  {openFaq === i && (
                    <p
                      style={{
                        margin: "0 0 22px",
                        color: "var(--body)",
                        lineHeight: 1.75,
                        fontSize: 15,
                      }}
                    >
                      {item.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <DepartureTimes
        kicker="Tides & Times"
        title={<>Timed to the <span style={{ color: "var(--accent)" }}>tide.</span></>}
        intro={<>Fossils and shark teeth wash onto the sandbars at low tide, so we depart in the mornings on a tide-driven schedule. Pick a date in the calendar below and we'll confirm your exact departure.</>}
        col2="Window"
        col3="Departs"
        rows={FH_SCHEDULE}
        note="Departures are tide-dependent and confirmed at booking. Please arrive 15 minutes early."
        onBook={onBook}
        bg="var(--cream)"
      />

      <WeatherBring
        title="Dress for the sandbar."
        bringTitle="Pack this for the hunt"
        bring={FH_BRING}
        blurb="Live Charleston Harbor conditions. We comb the Morris Island sandbars near low tide — expect sun, sand and shallow water. We run rain or shine and only cancel for unsafe weather (full refund or free reschedule)."
        bg="var(--sand)"
      />

      <MapDirections
        intro="We cast off from Shem Creek in Mt. Pleasant — about 14 minutes from downtown Charleston across the Ravenel Bridge. Arrive 15 minutes before your morning departure."
        bg="#fff"
      />

      <SectionWave from="#fff" to="var(--navy)" height={90} />

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--navy)",
          padding: "120px 0",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.07 }}>
          <Placeholder kind="stkids" width="100%" height="100%" position="top center" />
        </div>
        <Container style={{ position: "relative", zIndex: 2 }}>
          <h2
            style={{
              color: "#fff",
              maxWidth: 560,
              margin: "0 auto 18px",
              lineHeight: 1.1,
            }}
          >
            The most fun two hours in Charleston. Guaranteed.
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 17,
              maxWidth: 420,
              margin: "0 auto 44px",
              lineHeight: 1.65,
            }}
          >
            Private beaches. Ancient fossils. Kids who won't stop talking about it.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn size="lg" onClick={onBook}>
              Book Your Hunt →
            </Btn>
            <Btn
              variant="secondary"
              size="lg"
              onDark
              onClick={() => (window.location.href = "tel:+18435081600")}
            >
              <Icon name="phone" size={16} /> (843) 508-1600
            </Btn>
          </div>
          <p style={{ marginTop: 24, fontSize: 13, color: "rgba(255,255,255,0.30)" }}>
            Free cancellation · 100 Church St, Mt. Pleasant, SC · Departs daily
          </p>
        </Container>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .mobile-icon-strip { justify-content: center !important; gap: 14px !important; padding-left: 8px !important; padding-right: 8px !important; flex-wrap: nowrap !important; }
          .mobile-icon-strip > div { width: 42px; height: 42px; justify-content: center; border: 1px solid rgba(255,255,255,0.18); border-radius: 999px; background: rgba(255,255,255,0.06); font-size: 0 !important; gap: 0 !important; }
          .mobile-icon-strip > div svg { width: 18px; height: 18px; }
          .fh-split { grid-template-columns: 1fr !important; }
          .fh-why { grid-template-columns: 1fr !important; }
          .fh-reviews { grid-template-columns: 1fr !important; }
          .faq-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
