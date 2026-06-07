import { useState } from "react";
import sharkHeroKids from "../../assets/lccx/kids-teeth.png";
import sharkHeroHand from "../../assets/lccx/fossil-teeth-hand.webp";
import sharkHeroCollection from "../../assets/lccx/st-teeth-collection.jpg";
import { LccxHeroBanner } from "../components/LccxHeroBanner";
import {
  Icon,
  Badge,
  Btn,
  Container,
  Placeholder,
  SectionLabel,
  SectionWave,
} from "../components/Primitives";
import { QuickFactsBar, DepartureTimes, WeatherBring, MapDirections } from "../components/TourSections";

const ST_QUICK = [
  { icon: "clock", k: "Duration", v: "3–4 hours" },
  { icon: "sun", k: "Departs", v: "Mornings (tide-timed)" },
  { icon: "users", k: "From", v: "$125 / person (shared)" },
  { icon: "shell", k: "You keep", v: "Every tooth you find" },
  { icon: "anchor", k: "Aboard", v: "Up to 23 guests" },
  { icon: "pin", k: "Boards at", v: "Shem Creek, Mt. Pleasant" },
];

const ST_SCHEDULE = [
  { season: "Morris Island (4 hrs · shared)", sunset: "Tide-timed", depart: "~8:00 AM" },
  { season: "Sea Shell Hunt (3 hrs · private)", sunset: "Tide-timed", depart: "morning" },
  { season: "Sea Shell Hunt (4 hrs · private)", sunset: "Tide-timed", depart: "morning" },
];

const ST_BRING = [
  "Water shoes or sandals you can get wet",
  "Sunscreen, a hat & sunglasses",
  "A bag or container for your finds",
  "Water & snacks (BYOB welcome)",
  "A towel and a change of clothes",
];

// Booking is handled by the Rezdy modal — dispatching with no detail lets the
// shell infer the tour from the current page.
const BOOK_PRIVATE = "";
const BOOK_SHARED = "";
const BOOK_ALL = "";

const openBooking = (_url?: string) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("lccx:open-booking", { cancelable: true, detail: { tourId: "sharktooth" } }),
  );
};

const CHARTERS = [
  {
    id: "harbor-2hr",
    badge: "Best Value",
    badgeVariant: "orange" as const,
    name: "Harbor Island Hopping & Shark Tooth Hunt",
    tagline: "2 hours · all ages · up to 23 guests",
    desc: "Step aboard and let the harbor unfold its hidden magic. A quick island-hop with a guided shark tooth stop — perfect for families short on time.",
    price: "$375 – $1,200",
    unit: "/group · up to 23 guests",
    kind: "morrisdolphin",
    perks: [
      "2-hour private charter",
      "All ages welcome",
      "Up to 23 guests on the boat",
      "Harbor island stop with shark tooth hunt",
      "Hunting gear provided",
    ],
    cta: "Book 2-Hour Trip",
    href: BOOK_ALL,
    accent: false,
  },
  {
    id: "shark-3hr",
    badge: "Most Popular",
    badgeVariant: "gold" as const,
    name: "Shark Tooth & Sea Shell Hunting Tour",
    tagline: "3 hours · all ages · up to 12 guests",
    desc: "Embark on a thrilling shark tooth and shelling adventure on a remote barrier island — our signature trip with plenty of time to find real teeth.",
    price: "$400",
    unit: "/group · up to 12 guests",
    kind: "morrissunset",
    perks: [
      "3-hour private charter",
      "All ages welcome",
      "Up to 12 guests",
      "Tide-timed for maximum finds",
      "Keep every tooth, shell & fossil",
    ],
    cta: "Book 3-Hour Tour",
    href: BOOK_ALL,
    accent: true,
  },
  {
    id: "shark-4hr",
    badge: "Megalodon Odds",
    badgeVariant: "orange" as const,
    name: "Shark Tooth & Sea Shell Hunting Tour",
    tagline: "4 hours · all ages · up to 12 guests",
    desc: "The full experience — extra time on the beach for the best shot at a Megalodon find, plus more shelling and exploring on the most fossil-rich beaches.",
    price: "$500",
    unit: "/group · up to 12 guests",
    kind: "morrisbeach",
    perks: [
      "4-hour private charter",
      "Best odds at finding Megalodon",
      "Up to 12 guests",
      "More beach time, more finds",
      "Captain IDs every species on the spot",
    ],
    cta: "Book 4-Hour Tour",
    href: BOOK_ALL,
    accent: false,
  },
] as const;

const HOW_IT_WORKS = [
  {
    icon: "pin",
    head: "Meet at Shem Creek",
    body: "Arrive at 100 Church St, Mt. Pleasant — minutes from downtown Charleston with free public parking nearby.",
  },
  {
    icon: "anchor",
    head: "Hop aboard",
    body: "Relax on either our co-chartered skiff or your personal private boat. Cruise through dolphin-rich Charleston Harbor.",
  },
  {
    icon: "compass",
    head: "Explore a hidden island",
    body: "Land on Morris Island, Crab Bank (seasonal), or another barrier island — yours to explore for teeth, shells & ancient fossils.",
  },
  {
    icon: "gift",
    head: "Keep your finds",
    body: "All gear is provided. Every shark tooth, shell, and fossil you uncover is yours to take home — most groups leave with 20–40 pieces.",
  },
] as const;

const SPECIES = [
  "Sand tiger shark teeth",
  "Mako shark teeth",
  "Lemon shark teeth",
  "Bull shark teeth",
  "Megalodon (lucky days!)",
];

const REVIEWS = [
  {
    q: "Our kids are still talking about it — they found 5 shark teeth in the first 30 minutes! One of the most memorable things we did in Charleston.",
    n: "Emily R.",
    src: "Google",
  },
  {
    q: "The captain was so knowledgeable about the species we were finding. Access to spots you simply can't reach without a boat — total game changer.",
    n: "Tom B.",
    src: "TripAdvisor",
  },
];

const FAQ_ITEMS = [
  {
    q: "Do I get to keep everything I find?",
    a: "Yes — every tooth, shell, and fossil you find is yours to take home. Most guests leave with 20–40 pieces. Reference guides help you identify each species on the spot.",
  },
  {
    q: "What species of teeth can I find?",
    a: "Sand tiger, mako, lemon, and bull shark teeth are common. On lucky days guests find Megalodon — the largest shark that ever lived. The captain IDs every find.",
  },
  {
    q: "What's the difference between Private and Shared charters?",
    a: "Shared charters are priced per person on a co-chartered skiff with set departure times — great value for couples, solo guests, and small families. Private charters reserve the entire boat for your group (up to 23 guests) with flexible departures and a captain who tailors the trip to your party.",
  },
  {
    q: "Is the tour suitable for children?",
    a: "Absolutely — fossil hunting is a hit with kids. The walks are easy and we wade only in shallow water. All ages welcome.",
  },
  {
    q: "When is the best time to go?",
    a: "Fall and winter are prime — fewer crowds, lower tides, and the best conditions for Megalodon finds. We run great trips year-round though.",
  },
  {
    q: "What if the weather is bad?",
    a: "We run tours in light rain — a little drizzle never stopped a good fossil hunt. Severe weather gets a full refund or reschedule. No questions asked.",
  },
  {
    q: "Where do you depart from?",
    a: "100 Church St, Mt. Pleasant, SC 29464 — right on Shem Creek, 14 minutes from downtown Charleston. Free public parking nearby. Call (843) 508-1600.",
  },
];

export function SharkToothPage({ onBack, onBook }: { onBack?: () => void; onBook?: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <LccxHeroBanner
        images={[
          { src: sharkHeroKids, alt: "Kids holding shark teeth after a Charleston fossil hunt", position: "center center" },
          { src: sharkHeroHand, alt: "Collection of shark teeth found on a Lowcountry beach", position: "center center" },
          { src: sharkHeroCollection, alt: "Shark tooth and fossil collection from a Charleston tour", position: "center center" },
        ]}
        title="Find your"
        accentTitle="Megalodon."
        subtitle="A unique Charleston quest — find shark teeth, glimmering shells, and ancient fossils on private barrier islands."
        ctaLabel="Hunt for Fossils"
        ctaIcon="compass"
        onCta={() => openBooking(BOOK_ALL)}
        proofItems={[
          { icon: "check", label: "USCG Licensed" },
          { icon: "star", label: "500+ Reviews" },
          { icon: "anchor", label: "Keep All Finds" },
          { icon: "users", label: "Up to 23 Guests" },
        ]}
      />

      <QuickFactsBar items={ST_QUICK} />

      {/* ── Charter options: Private vs Shared ───────────────────────────── */}
      <section
        id="charters"
        className="st-section"
        style={{ background: "#fff" }}
      >
        <Container>
          <div className="lccx-section-intro" style={{ marginBottom: 48 }}>
            <SectionLabel align="center" style={{ marginBottom: 16, justifyContent: "center" }}>
              Choose Your Charter
            </SectionLabel>
            <h2 style={{ marginBottom: 14 }}>
              Private or Shared — both find <span style={{ color: "var(--accent)" }}>real teeth.</span>
            </h2>
            <p style={{ color: "var(--body)", fontSize: 16, lineHeight: 1.6, margin: "0 auto", maxWidth: 560 }}>
              Same captains, same fossil beds, same beaches. Pick the booking style that fits your group — book in seconds.
            </p>
          </div>
          <div
            className="charter-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
          >
            {CHARTERS.map((pkg) => (
              <div
                key={pkg.id}
                className="lccx-info-card st-charter-card"
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  border: `1.5px solid ${pkg.accent ? "var(--accent)" : "var(--border)"}`,
                  display: "flex",
                  flexDirection: "column",
                  background: "#fff",
                  boxShadow: pkg.accent ? "0 18px 48px rgba(255,122,26,0.14)" : "0 8px 24px rgba(10,27,48,0.05)",
                }}
              >
                <div
                  style={{ height: 240, overflow: "hidden", position: "relative", flexShrink: 0 }}
                >
                  <Placeholder kind={pkg.kind} width="100%" height="100%" />
                  <div style={{ position: "absolute", top: 16, left: 16 }}>
                    <Badge variant={pkg.badgeVariant}>{pkg.badge}</Badge>
                  </div>
                </div>
                <div
                  style={{
                    padding: "28px 28px 32px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <h3 style={{ color: "var(--navy)", margin: 0 }}>{pkg.name}</h3>
                      <p style={{ color: "var(--muted)", margin: "4px 0 0", fontSize: 14 }}>
                        {pkg.tagline}
                      </p>
                    </div>
                    <div style={{ flexShrink: 0, textAlign: "right" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 800,
                          fontSize: 22,
                          color: "var(--navy)",
                        }}
                      >
                        {pkg.price}
                      </span>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>
                        {pkg.unit}
                      </div>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: 14.5,
                      color: "var(--body)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {pkg.desc}
                  </p>
                  <ul className="lccx-card-list" style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                    {pkg.perks.map((perk) => (
                      <li key={perk} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "var(--body)", lineHeight: 1.5 }}>
                        <Icon name="check" size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <Btn
                    variant={pkg.accent ? "primary" : "secondary"}
                    style={{ marginTop: 6, justifyContent: "center" }}
                    onClick={() => openBooking(pkg.href)}
                  >
                    {pkg.cta} →
                  </Btn>
                </div>
              </div>
            ))}
          </div>

          {/* Private Guide upsell */}
          <div
            className="guide-upsell"
            style={{
              marginTop: 32,
              borderRadius: 20,
              padding: "28px 32px",
              background: "linear-gradient(135deg, var(--navy) 0%, #14304f 100%)",
              color: "#fff",
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              alignItems: "center",
              gap: 28,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 999,
                background: "rgba(255,122,26,0.18)",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <Icon name="compass" size={26} color="var(--accent)" />
            </div>
            <div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                <h3 style={{ color: "#fff", margin: 0 }}>Add a Private Tour Guide</h3>
                <Badge variant="orange">+$200 / group</Badge>
              </div>
              <p style={{ color: "rgba(255,255,255,0.78)", margin: 0, fontSize: 14.5, lineHeight: 1.6 }}>
                Personal guide finds the hottest fossil spots, walks the beach with you, identifies every tooth by species, and hands you a take-home tooth guide. Available on any charter — call to add.
              </p>
            </div>
            <Btn
              variant="secondary"
              onDark
              onClick={() => (window.location.href = "tel:+18435081600")}
              style={{ flexShrink: 0 }}
            >
              <Icon name="phone" size={14} /> (843) 508-1600
            </Btn>
          </div>
        </Container>
      </section>

      {/* ── How it works timeline ────────────────────────────────────────── */}
      <section className="st-section" style={{ background: "var(--sand)" }}>
        <Container>
          <div className="lccx-section-intro" style={{ marginBottom: 48 }}>
            <SectionLabel align="center" style={{ marginBottom: 16, justifyContent: "center" }}>
              How It Works
            </SectionLabel>
            <h2 style={{ marginBottom: 14 }}>
              From Shem Creek to your <span style={{ color: "var(--accent)" }}>first Megalodon.</span>
            </h2>
            <p style={{ color: "var(--body)", fontSize: 16, lineHeight: 1.6, margin: "0 auto", maxWidth: 560 }}>
              Four simple steps — no experience needed, all gear provided, fun for all ages.
            </p>
          </div>
          <div
            className="timeline-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}
          >
            {HOW_IT_WORKS.map((step, i) => (
              <div
                key={i}
                className="lccx-snippet-card"
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "28px 24px",
                  border: "1px solid var(--border)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -14,
                    left: 24,
                    width: 28,
                    height: 28,
                    borderRadius: 999,
                    background: "var(--accent)",
                    color: "#fff",
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 14,
                  }}
                >
                  {i + 1}
                </div>
                <Icon name={step.icon} size={26} color="var(--navy)" style={{ marginTop: 8, marginBottom: 14, strokeWidth: 1.75 }} />
                <h3 style={{ color: "var(--navy)", margin: "0 0 8px", fontSize: 18 }}>{step.head}</h3>
                <p style={{ fontSize: 14, color: "var(--body)", lineHeight: 1.6, margin: 0 }}>{step.body}</p>
              </div>
            ))}
          </div>

          {/* Species hunted strip */}
          <div
            style={{
              marginTop: 32,
              padding: "20px 24px",
              borderRadius: 16,
              background: "#fff",
              border: "1px dashed var(--border)",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
              justifyContent: "center",
            }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--navy)", fontSize: 14, textTransform: "uppercase", letterSpacing: ".08em" }}>
              What you'll hunt for:
            </span>
            {SPECIES.map((s) => (
              <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--body)", padding: "6px 12px", background: "var(--sand)", borderRadius: 999 }}>
                <Icon name="sparkle" size={12} color="var(--accent)" /> {s}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Morris Island feature ─────────────────────────────────────────── */}
      <section className="st-section" style={{ background: "#fff" }}>
        <Container>
          <SectionLabel style={{ marginBottom: 16 }}>Morris Island</SectionLabel>
          <h2 style={{ maxWidth: 520, marginBottom: 48 }}>
            A barrier island only reachable by boat.
          </h2>
          <div
            className="morris-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}
          >
            {/* Large photo left */}
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                aspectRatio: "3/4",
                position: "relative",
              }}
            >
              <Placeholder kind="morrisbeach" width="100%" height="100%" position="top" />
            </div>
            {/* Two stacked right */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", flex: 1, minHeight: 0 }}>
                <Placeholder kind="morrisdolphin" width="100%" height="100%" />
              </div>
              <div style={{ borderRadius: 20, overflow: "hidden", flex: 1, minHeight: 0 }}>
                <Placeholder kind="morrissunset" width="100%" height="100%" />
              </div>
            </div>
          </div>
          <div
            className="morris-copy"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40 }}
          >
            {[
              {
                icon: "compass",
                head: "No roads in",
                body: "Morris Island is only accessible by water — your boat is the key to one of the most fossil-rich beaches on the East Coast.",
              },
              {
                icon: "fish",
                head: "Wild dolphins",
                body: "The passage to Morris Island runs through a dolphin highway. Sightings on the way out are almost guaranteed.",
              },
              {
                icon: "sun",
                head: "The lighthouse",
                body: "The 1876 Morris Island Lighthouse stands offshore, surrounded by water since the island eroded away — one of Charleston's most iconic views.",
              },
            ].map((c, i) => (
              <div key={i} className="lccx-snippet-card">
                <Icon
                  name={c.icon}
                  size={22}
                  color="var(--accent)"
                  style={{ strokeWidth: 1.75, marginBottom: 12 }}
                />
                <h3 style={{ color: "var(--navy)", marginBottom: 8 }}>{c.head}</h3>
                <p style={{ fontSize: 14, color: "var(--body)", lineHeight: 1.7, margin: 0 }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div className="st-wave">
        <SectionWave from="#fff" to="var(--navy)" height={80} />
      </div>

      {/* ── What to expect ────────────────────────────────────────────────── */}
      <section
        className="st-section"
        style={{ background: "var(--navy)", color: "#fff" }}
      >
        <Container>
          <div
            className="st-expect"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
          >
            <div className="lccx-section-intro st-expect-copy">
              <SectionLabel align="center" style={{ color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>
                What to Expect
              </SectionLabel>
              <h2 style={{ color: "#fff", marginBottom: 24 }}>
                Your captain does the work. You find the fossils.
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.70)",
                  fontSize: 17,
                  lineHeight: 1.75,
                  marginBottom: 32,
                }}
              >
                We time every departure around low tide — when the fossil layer is most exposed.
                Your captain guides you to the right spots, teaches sifting technique, and IDs every
                find on the spot.
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.70)",
                  fontSize: 17,
                  lineHeight: 1.75,
                  marginBottom: 40,
                }}
              >
                No experience needed. All ages welcome. The best season is October through January
                when Crab Bank is accessible and tides run lowest — but we find teeth year-round.
              </p>
              <Btn variant="secondary" onDark onClick={onBook}>
                Reserve Your Trip →
              </Btn>
            </div>
            <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "3/4" }}>
              <Placeholder kind="sthunt" width="100%" height="100%" />
            </div>
          </div>
        </Container>
      </section>

      <div className="st-wave">
        <SectionWave from="var(--navy)" to="var(--sand)" height={80} flip />
      </div>

      {/* ── Reviews ───────────────────────────────────────────────────────── */}
      <section className="st-section" style={{ background: "var(--sand)" }}>
        <Container>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 56,
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <h2 style={{ maxWidth: 400 }}>Real finds. Real families.</h2>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Icon
                  key={i}
                  name="star"
                  size={18}
                  color="var(--accent)"
                  style={{ fill: "var(--accent)" }}
                />
              ))}
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "var(--navy)",
                  marginLeft: 8,
                }}
              >
                5.0
              </span>
              <span style={{ color: "var(--muted)", fontSize: 13, marginLeft: 4 }}>
                Google &amp; TripAdvisor
              </span>
            </div>
          </div>
          <div
            className="st-reviews"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
          >
            {REVIEWS.map((r, i) => (
              <figure
                key={i}
                className="lccx-info-card st-review-card"
                style={{
                  margin: 0,
                  padding: "36px 36px 32px",
                  borderRadius: 20,
                  background: i === 0 ? "#fff" : "var(--navy)",
                  border: i === 0 ? "1px solid var(--border)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
              >
                <div style={{ display: "flex", gap: 3 }}>
                  {[0, 1, 2, 3, 4].map((j) => (
                    <Icon
                      key={j}
                      name="star"
                      size={14}
                      color={i === 0 ? "var(--accent)" : "var(--accent-2)"}
                      style={{ fill: i === 0 ? "var(--accent)" : "var(--accent-2)" }}
                    />
                  ))}
                </div>
                <blockquote
                  style={{
                    margin: 0,
                    fontSize: 16,
                    lineHeight: 1.7,
                    color: i === 0 ? "var(--body)" : "rgba(255,255,255,0.85)",
                    fontStyle: "italic",
                  }}
                >
                  "{r.q}"
                </blockquote>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "auto",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 14,
                      color: i === 0 ? "var(--navy)" : "#fff",
                    }}
                  >
                    {r.n}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: i === 0 ? "var(--muted)" : "rgba(255,255,255,0.4)",
                    }}
                  >
                    {r.src}
                  </span>
                </div>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <div className="st-wave">
        <SectionWave from="var(--sand)" to="#fff" height={70} flip />
      </div>

      {/* ── Know Before You Go ───────────────────────────────────────────── */}
      <section className="st-section" style={{ background: "#fff" }}>
        <Container>
          <div className="lccx-section-intro" style={{ marginBottom: 40 }}>
            <SectionLabel align="center" style={{ marginBottom: 16, justifyContent: "center" }}>
              Know Before You Go
            </SectionLabel>
            <h2 style={{ marginBottom: 14 }}>The quick rundown.</h2>
          </div>
          <div
            className="kbyg-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}
          >
            {[
              { icon: "pin", head: "Where", body: "100 Church St, Mt. Pleasant — Shem Creek. Free parking nearby." },
              { icon: "clock", head: "Duration", body: "2, 3, or 4-hour options. Tide-timed for the best finds." },
              { icon: "users", head: "Capacity", body: "Up to 23 guests per boat. Shared by the seat or full private." },
              { icon: "gift", head: "Bring", body: "Sunscreen, hat, beach footwear that can get wet, a small bag for finds." },
            ].map((c, i) => (
              <div
                key={i}
                className="lccx-snippet-card"
                style={{
                  padding: "24px 22px",
                  borderRadius: 16,
                  background: "var(--sand)",
                  border: "1px solid var(--border)",
                }}
              >
                <Icon name={c.icon} size={22} color="var(--accent)" style={{ marginBottom: 12, strokeWidth: 1.75 }} />
                <h3 style={{ color: "var(--navy)", margin: "0 0 6px", fontSize: 16 }}>{c.head}</h3>
                <p style={{ fontSize: 14, color: "var(--body)", lineHeight: 1.55, margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section id="faq" className="st-section" style={{ background: "var(--sand)" }}>
        <Container>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionLabel style={{ justifyContent: "center", marginBottom: 16 }}>FAQ</SectionLabel>
            <h2 style={{ textAlign: "center", marginBottom: 56 }}>Common questions.</h2>
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
        intro={<>Shark teeth surface on the sandbars at low tide, so we depart in the mornings on a tide-driven schedule. Pick a date in the calendar below and we'll confirm your exact departure.</>}
        col2="Window"
        col3="Departs"
        rows={ST_SCHEDULE}
        note="Departures are tide-dependent and confirmed at booking. Please arrive 15 minutes early."
        onBook={onBook}
        bg="#fff"
      />

      <WeatherBring
        kicker="Weather & What to Bring"
        title="Dress for the sandbar."
        bringTitle="Pack this for the hunt"
        bring={ST_BRING}
        blurb="Live Charleston Harbor conditions. We hunt the Morris Island sandbars near low tide — expect sun, sand and shallow water. We run rain or shine and only cancel for unsafe weather (full refund or free reschedule)."
        bg="var(--cream)"
      />

      <MapDirections
        intro="We cast off from Shem Creek in Mt. Pleasant — about 14 minutes from downtown Charleston across the Ravenel Bridge. Arrive 15 minutes before your morning departure."
        bg="var(--sand)"
      />

      <div className="st-wave">
        <SectionWave from="var(--sand)" to="var(--navy)" height={90} />
      </div>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section
        className="st-section"
        style={{
          background: "var(--navy)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.08 }}>
          <Placeholder kind="stteeth" width="100%" height="100%" />
        </div>
        <Container style={{ position: "relative", zIndex: 2 }}>
          <h2
            style={{
              color: "#fff",
              maxWidth: 600,
              margin: "0 auto 20px",
              lineHeight: 1.1,
            }}
          >
            The best shark tooth hunting in South Carolina.
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.60)",
              fontSize: 18,
              maxWidth: 440,
              margin: "0 auto 48px",
              lineHeight: 1.65,
            }}
          >
            Departs daily from Mt. Pleasant, tide-timed for maximum finds.
          </p>
          <div
            className="st-cta-btns"
            style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Btn size="lg" onClick={() => openBooking(BOOK_PRIVATE)}>
              Book Private →
            </Btn>
            <Btn size="lg" variant="secondary" onDark onClick={() => openBooking(BOOK_SHARED)}>
              Book Shared →
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
          <p style={{ marginTop: 24, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
            Free cancellation up to 48 hrs · 100 Church St, Mt. Pleasant, SC
          </p>
        </Container>
      </section>

      {/* ── Sticky bottom booking bar ────────────────────────────────────── */}
      <div
        className="st-sticky-bar"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          background: "rgba(10,27,48,0.96)",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          flexWrap: "wrap",
          boxShadow: "0 -8px 24px rgba(0,0,0,0.18)",
        }}
      >
        <span
          className="st-sticky-label"
          style={{
            color: "#fff",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 14,
            marginRight: 6,
          }}
        >
          Ready to hunt?
        </span>
        <Btn size="sm" onClick={() => openBooking(BOOK_PRIVATE)}>
          Private Charter →
        </Btn>
        <Btn size="sm" variant="secondary" onDark onClick={() => openBooking(BOOK_SHARED)}>
          Shared Charter →
        </Btn>
        <button
          type="button"
          onClick={() => (window.location.href = "tel:+18435081600")}
          aria-label="Call (843) 508-1600"
          style={{
            width: 38,
            height: 38,
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.25)",
            background: "transparent",
            color: "#fff",
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Icon name="phone" size={15} />
        </button>
      </div>

      <style>{`
        .lccx-shell-main { padding-bottom: 76px; }
        @media (max-width: 900px) {
          .st-expect { grid-template-columns: 1fr !important; gap: 48px !important; }
          .morris-copy { grid-template-columns: 1fr 1fr !important; }
          .timeline-grid { grid-template-columns: 1fr 1fr !important; }
          .kbyg-grid { grid-template-columns: 1fr 1fr !important; }
          .faq-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 700px) {
          .mobile-icon-strip { justify-content: center !important; gap: 18px !important; padding-left: 8px !important; padding-right: 8px !important; }
          .mobile-icon-strip > span { display: none !important; }
          .mobile-icon-strip > div { width: 42px; height: 42px; justify-content: center; border: 1px solid rgba(255,255,255,0.18); border-radius: 999px; background: rgba(255,255,255,0.06); }
          .mobile-icon-strip > div svg { width: 18px; height: 18px; }
          .mobile-icon-strip > div { font-size: 0 !important; gap: 0 !important; }
          .st-section { padding-top: 60px !important; padding-bottom: 60px !important; }
          .st-stats { grid-template-columns: 1fr 1fr !important; }
          .st-stats > div { border-right: none !important; border-bottom: 1px solid var(--border); }
          .st-stats > div:nth-child(odd) { border-right: 1px solid var(--border) !important; }
          .st-stats > div:nth-last-child(-n+2) { border-bottom: none; }
          .charter-grid { grid-template-columns: 1fr !important; }
          .timeline-grid { grid-template-columns: 1fr !important; }
          .kbyg-grid { grid-template-columns: 1fr 1fr !important; }
          .guide-upsell { grid-template-columns: 1fr !important; text-align: center; gap: 16px !important; padding: 24px !important; }
          .guide-upsell > div:first-child { margin: 0 auto; }
          .guide-upsell > div:nth-child(2) > div { justify-content: center !important; }
          .guide-upsell > div:nth-child(2) { display: flex !important; flex-direction: column; align-items: center; gap: 10px; }
          .guide-upsell > a, .guide-upsell > button { width: min(100%, 260px) !important; justify-content: center !important; }
          .st-charter-card > div:last-child { align-items: center !important; }
          .charter-grid > div > div:last-child > div:first-child { flex-direction: column !important; align-items: center !important; justify-content: center !important; text-align: center; gap: 10px !important; width: 100%; }
          .charter-grid > div > div:last-child > div:first-child > div:last-child { text-align: center !important; }
          .charter-grid > div > div:last-child { text-align: center; }
          .charter-grid ul { text-align: left; align-self: stretch; max-width: 280px; margin-left: auto !important; margin-right: auto !important; }
          .morris-grid { grid-template-columns: 1fr !important; }
          .morris-grid > div:last-child { display: none !important; }
          .morris-copy { grid-template-columns: 1fr !important; gap: 28px !important; }
          .st-expect { grid-template-columns: 1fr !important; gap: 40px !important; }
          .st-expect-copy { max-width: 330px !important; }
          .st-expect > div:last-child { display: none !important; }
          .st-reviews { grid-template-columns: 1fr !important; }
          .st-cta-btns { flex-direction: column !important; align-items: center !important; }
          .st-cta-btns > * { width: 100%; justify-content: center; white-space: normal !important; text-align: center; }
          .st-wave svg { height: 40px !important; }
          .st-sticky-bar { padding: 10px 76px 10px 12px !important; gap: 8px !important; }
          .st-sticky-label { display: none !important; }
          .st-sticky-bar > button, .st-sticky-bar > a { flex: 1; min-width: 0; font-size: 13px !important; }
        }
      `}</style>
    </div>
  );
}
