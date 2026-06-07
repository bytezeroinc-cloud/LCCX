/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useState } from "react";
import dolphinHeroLeap from "../../assets/lccx/dolphin-leap.webp";
import dolphinHeroMorris from "../../assets/lccx/dolphins-morris-island.jpg";
import dolphinHeroPelican from "../../assets/lccx/wildlife-pelican.png";
import { LccxHeroBanner } from "./LccxHeroBanner";
import { Icon, Badge, Btn, Container, Placeholder, SectionLabel } from "./Primitives";
import { QuickFactsBar, PhotoGallery, WeatherBring, MapDirections } from "./TourSections";
import dolphinSpoonbill from "../../assets/lccx/wildlife-spoonbill.png";
import dolphinEagle from "../../assets/lccx/wildlife-eagle.png";
import dolphinMarsh from "../../assets/lccx/marsh-golden.png";
import { TOURS } from "./Tours";

const DOLPHIN_QUICK = [
  { icon: "clock", k: "Duration", v: "About 2 hours" },
  { icon: "sun", k: "Departs", v: "Morning & afternoon" },
  { icon: "users", k: "From", v: "$55 per person (shared)" },
  { icon: "fish", k: "Wildlife", v: "Dolphins, pelicans & more" },
  { icon: "anchor", k: "Aboard", v: "Roamer IV · up to 23" },
  { icon: "pin", k: "Boards at", v: "Shem Creek, Mt. Pleasant" },
];

const DOLPHIN_GALLERY = [
  { src: dolphinHeroLeap, alt: "Wild bottlenose dolphin leaping in Charleston water", span: 2 as const },
  { src: dolphinHeroMorris, alt: "Dolphins swimming near Morris Island", span: 1 as const },
  { src: dolphinHeroPelican, alt: "Pelican landing on Lowcountry water", span: 1 as const },
  { src: dolphinSpoonbill, alt: "Roseate spoonbill in the Lowcountry marsh", span: 1 as const },
  { src: dolphinEagle, alt: "Bald eagle over Charleston Harbor", span: 1 as const },
  { src: dolphinMarsh, alt: "Golden Lowcountry marsh at low light", span: 2 as const },
];

const DOLPHIN_BRING = [
  "Sunscreen, a hat & sunglasses",
  "A light layer for the breeze on the water",
  "Binoculars & a camera for the wildlife",
  "Water & snacks (BYOB welcome)",
  "Comfortable, flat-soled shoes",
];

// ── TourDetailPage ────────────────────────────────────────────────────────────
export function TourDetailPage({
  tourId = "dolphin",
  onBack,
  onBook,
}: {
  tourId?: string;
  onBack?: () => void;
  onBook?: () => void;
}) {
  const tour = TOURS.find((t) => t.id === tourId) || TOURS[0];
  const [guests, setGuests] = useState(4);
  const [dayIdx, setDayIdx] = useState(2);
  const [timeIdx, setTimeIdx] = useState(1);

  const today = new Date();
  const days = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      dow: d.toLocaleDateString("en-US", { weekday: "short" }),
      dom: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
    };
  });
  const times = ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM", "6:45 PM"];
  const total = tour.price * guests;

  const slotsByDay: Record<number, { t: string; label: string; avail: string }[]> = {
    0: [
      { t: "9:00 AM", label: "Dolphin", avail: "1 left" },
      { t: "2:00 PM", label: "Fossil", avail: "Open" },
    ],
    1: [
      { t: "10:00 AM", label: tour.name, avail: "Open" },
      { t: "4:30 PM", label: tour.name, avail: "2 left" },
      { t: "6:30 PM", label: tour.name, avail: "Full" },
    ],
    2: [
      { t: "9:00 AM", label: tour.name, avail: "Open" },
      { t: "11:30 AM", label: tour.name, avail: "Open" },
      { t: "4:00 PM", label: tour.name, avail: "Open" },
      { t: "6:45 PM", label: tour.name, avail: "3 left" },
    ],
    3: [
      { t: "10:00 AM", label: tour.name, avail: "Open" },
      { t: "4:00 PM", label: tour.name, avail: "Open" },
      { t: "7:00 PM", label: tour.name, avail: "Open" },
    ],
    4: [
      { t: "9:30 AM", label: tour.name, avail: "2 left" },
      { t: "6:45 PM", label: tour.name, avail: "1 left" },
    ],
  };

  const stepBtn: React.CSSProperties = {
    width: 28,
    height: 28,
    borderRadius: 50,
    border: 0,
    background: "#fff",
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
    color: "var(--navy)",
  };

  return (
    <div>
      <LccxHeroBanner
        images={[
          { src: dolphinHeroLeap, alt: "Wild dolphin leaping in Lowcountry water", position: "center center" },
          { src: dolphinHeroMorris, alt: "Dolphins swimming near Morris Island", position: "center center" },
          { src: dolphinHeroPelican, alt: "Pelican landing on Charleston coastal water", position: "center center" },
        ]}
        title="Wild dolphins."
        accentTitle="Open water."
        subtitle={tour.description}
        ctaLabel="Book This Tour"
        ctaIcon="anchor"
        onCta={onBook}
        proofItems={[
          { icon: "clock", label: tour.duration },
          { icon: "users", label: tour.capacity },
          { icon: "pin", label: "Shem Creek Dock" },
          { icon: "star", label: "500+ Reviews" },
        ]}
      />

      <QuickFactsBar items={DOLPHIN_QUICK} />

      {/* Booking widget */}
      <section style={{ background: "var(--sand)", padding: "64px 0" }}>
        <Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: 40,
              alignItems: "start",
            }}
            className="td-body"
          >
            <div>
              <SectionLabel>What's included</SectionLabel>
              <ul
                style={{
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  padding: 0,
                  listStyle: "none",
                }}
              >
                {tour.highlights.map((h, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      fontSize: 16,
                      color: "var(--body)",
                    }}
                  >
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 50,
                        background: "rgba(255,122,26,0.12)",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon name="check" size={13} color="var(--accent)" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking card */}
            <div
              style={{
                background: "#fff",
                borderRadius: 24,
                border: "1px solid var(--border)",
                overflow: "hidden",
                boxShadow: "var(--shadow-card)",
                position: "sticky",
                top: 100,
              }}
            >
              <div
                style={{
                  padding: "24px 28px",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 28,
                      color: "var(--navy)",
                    }}
                  >
                    ${tour.price}
                    <span style={{ fontSize: 14, fontWeight: 500, color: "var(--muted)" }}>
                      {(tour as any).unit || "/guest"}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>
                    {tour.duration} · {tour.capacity}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 2 }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Icon
                      key={i}
                      name="star"
                      size={14}
                      color="var(--accent)"
                      style={{ fill: "var(--accent)" }}
                    />
                  ))}
                </div>
              </div>

              {/* Day picker */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {days.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setDayIdx(i)}
                    style={{
                      padding: "14px 4px",
                      border: 0,
                      cursor: "pointer",
                      textAlign: "center",
                      background: dayIdx === i ? "var(--navy)" : "transparent",
                      color: dayIdx === i ? "#fff" : "var(--body)",
                      borderRight: i < 4 ? "1px solid var(--border)" : "none",
                      transition: "background 200ms",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        opacity: 0.7,
                      }}
                    >
                      {i === 0 ? "Today" : d.dow}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: 20,
                        marginTop: 2,
                      }}
                    >
                      {d.dom}
                    </div>
                  </button>
                ))}
              </div>

              {/* Slots */}
              <div style={{ padding: 24 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 16,
                      color: "var(--navy)",
                    }}
                  >
                    {days[dayIdx].dow}, {days[dayIdx].month} {days[dayIdx].dom}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "var(--sand)",
                      padding: "4px 4px 4px 12px",
                      borderRadius: 50,
                    }}
                  >
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>Guests</span>
                    <button onClick={() => setGuests((g) => Math.max(1, g - 1))} style={stepBtn}>
                      <Icon name="minus" size={12} />
                    </button>
                    <span
                      style={{
                        minWidth: 18,
                        textAlign: "center",
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        color: "var(--navy)",
                        fontSize: 14,
                      }}
                    >
                      {guests}
                    </span>
                    <button onClick={() => setGuests((g) => Math.min(6, g + 1))} style={stepBtn}>
                      <Icon name="plus" size={12} />
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {(slotsByDay[dayIdx] || []).map((s, i) => {
                    const isFull = s.avail === "Full";
                    return (
                      <button
                        key={i}
                        disabled={isFull}
                        onClick={() => {
                          if (!isFull) {
                            setTimeIdx(i);
                            onBook?.();
                          }
                        }}
                        style={{
                          textAlign: "left",
                          padding: "12px 14px",
                          borderRadius: 10,
                          border: `1px solid ${timeIdx === i ? "var(--accent)" : "var(--border)"}`,
                          background: isFull ? "#F7F6F2" : timeIdx === i ? "#FFFBF7" : "#fff",
                          cursor: isFull ? "not-allowed" : "pointer",
                          opacity: isFull ? 0.55 : 1,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          transition: "border-color 150ms",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: 15,
                            color: "var(--navy)",
                          }}
                        >
                          {s.t}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            padding: "3px 8px",
                            borderRadius: 50,
                            background: isFull
                              ? "rgba(107,122,143,0.15)"
                              : s.avail === "Open"
                                ? "rgba(52,168,83,0.14)"
                                : "rgba(255,122,26,0.14)",
                            color: isFull
                              ? "var(--muted)"
                              : s.avail === "Open"
                                ? "#1E7A3E"
                                : "var(--accent-hover)",
                          }}
                        >
                          {s.avail}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div
                  style={{
                    marginTop: 20,
                    padding: "14px 16px",
                    background: "var(--sand)",
                    borderRadius: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 14, color: "var(--body)" }}>
                    Total for {guests} guests
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 20,
                      color: "var(--navy)",
                    }}
                  >
                    ${total}
                  </span>
                </div>
                <Btn
                  style={{ width: "100%", justifyContent: "center", marginTop: 14 }}
                  onClick={onBook}
                >
                  Book Now →
                </Btn>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    textAlign: "center",
                    marginTop: 10,
                  }}
                >
                  Free cancellation up to 48 hours before
                </p>
              </div>
            </div>
          </div>
        </Container>
        <style>{`@media (max-width: 900px) { .td-body { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      <PhotoGallery kicker="Out on the Water" title="Wildlife at every turn." images={DOLPHIN_GALLERY} />

      <WeatherBring
        title="Come prepared for the wild."
        bringTitle="Pack this for the cruise"
        bring={DOLPHIN_BRING}
        blurb="Live Charleston Harbor conditions. Dolphins feed here year-round and mornings are calmest on the water. We sail rain or shine and only cancel for unsafe weather (full refund or free reschedule)."
        bg="var(--cream)"
      />

      <MapDirections
        intro="We cast off from Shem Creek in Mt. Pleasant — about 14 minutes from downtown Charleston across the Ravenel Bridge. Arrive 15 minutes before departure."
        bg="#fff"
      />
    </div>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
export function Testimonials() {
  const reviews = [
    {
      q: "The best thing we did in Charleston. Captain Mike found dolphins within 5 minutes and we stayed with a pod of six for an hour. Kids are still talking about it.",
      n: "Jessica R.",
      src: "Google Review",
      stars: 5,
    },
    {
      q: "Booked the sunset cruise for our anniversary. Champagne, the skyline, and a pod of dolphins riding the bow wave as we came back in. Unreal.",
      n: "Matt & Dana K.",
      src: "TripAdvisor",
      stars: 5,
    },
    {
      q: "Did the fossil hunt with our 9 and 11 year olds. Both found shark teeth, one found a stingray barb. They thought they were archaeologists.",
      n: "The Patel Family",
      src: "Google Review",
      stars: 5,
    },
  ];
  return (
    <section style={{ background: "#fff", padding: "100px 0" }} className="testimonials-section">
      <Container>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 36px" }}>
          <SectionLabel style={{ justifyContent: "center" }}>Guest Log</SectionLabel>
          <h2 className="testimonials-title" style={{ marginTop: 14 }}>500+ five-star stories.</h2>
          <div style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "center", marginTop: 14, flexWrap: "wrap" }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <Icon
                key={i}
                name="star"
                size={22}
                color="var(--accent)"
                style={{ fill: "var(--accent)" }}
              />
            ))}
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 18,
                color: "var(--navy)",
                marginLeft: 8,
              }}
            >
              5.0
            </span>
            <span style={{ color: "var(--muted)", fontSize: 14 }}>
              Average · Google, Tripadvisor, Airbnb Experiences
            </span>
          </div>
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
          className="reviews-grid"
        >
          {reviews.map((r, i) => (
            <figure
              key={i}
              style={{
                margin: 0,
                background: i === 1 ? "var(--navy)" : "var(--sand)",
                color: i === 1 ? "#fff" : "var(--navy)",
                borderRadius: 20,
                padding: 28,
                border: i === 1 ? "none" : "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div style={{ display: "flex", gap: 2 }}>
                {[0, 1, 2, 3, 4].map((j) => (
                  <Icon
                    key={j}
                    name="star"
                    size={16}
                    color={i === 1 ? "var(--accent-2)" : "var(--accent)"}
                    style={{ fill: i === 1 ? "var(--accent-2)" : "var(--accent)" }}
                  />
                ))}
              </div>
              <blockquote
                style={{
                  margin: 0,
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: i === 1 ? "rgba(255,255,255,0.9)" : "var(--body)",
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
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>
                  {r.n}
                </div>
                <div style={{ fontSize: 12, opacity: 0.6 }}>{r.src}</div>
              </div>
            </figure>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .testimonials-section { padding: 58px 0 !important; }
          .testimonials-title { font-size: clamp(28px, 8.5vw, 36px) !important; line-height: 1.08 !important; }
          .reviews-grid { display: grid !important; grid-template-columns: 1fr !important; gap: 12px !important; margin: 0; padding: 0; overflow: visible; }
          .reviews-grid > figure { min-width: 0; padding: 22px !important; border-radius: 14px !important; }
          .reviews-grid blockquote { font-size: 15px !important; line-height: 1.58 !important; }
        }
      `}</style>
    </section>
  );
}

// ── GiftCards ─────────────────────────────────────────────────────────────────
export function GiftCards({ onBuy }: { onBuy?: () => void }) {
  const cards = [
    {
      label: "Dolphin for Two",
      price: "$130",
      desc: "2 guests · Dolphin Watching",
      color: "var(--seafoam)",
    },
    {
      label: "Golden Hour",
      price: "$170",
      desc: "2 guests · Sunset Cruise",
      color: "var(--blush)",
    },
    {
      label: "Custom Amount",
      price: "Any $",
      desc: "Let them choose their adventure",
      color: "var(--sand-deep)",
    },
  ];
  return (
    <section id="gift" style={{ background: "var(--cream)", padding: "100px 0" }} className="gift-section">
      <Container>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 36px" }}>
          <Icon name="gift" size={40} color="var(--accent)" />
          <SectionLabel style={{ justifyContent: "center", marginTop: 12 }}>Gift Cards</SectionLabel>
          <h2 className="gift-title" style={{ marginTop: 14 }}>
            Give them the <span style={{ color: "var(--accent)" }}>harbor</span>.
          </h2>
          <p
            className="lead gift-lead"
            style={{ marginTop: 14, color: "var(--body)", maxWidth: 520, margin: "14px auto 0" }}
          >
            Instant delivery by email. Never expires. Redeemable for any tour.
          </p>
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
          className="gift-grid"
        >
          {cards.map((c, i) => (
            <div
              key={i}
              style={{
                background: c.color,
                borderRadius: 20,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: 36,
                  color: "var(--navy)",
                }}
              >
                {c.price}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 20,
                    color: "var(--navy)",
                  }}
                >
                  {c.label}
                </div>
                <div style={{ fontSize: 14, color: "var(--body)", marginTop: 4 }}>{c.desc}</div>
              </div>
              <Btn variant="secondary" size="sm" onClick={onBuy} style={{ marginTop: "auto" }}>
                Buy Gift Card →
              </Btn>
            </div>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 700px) {
          .gift-section { padding: 58px 0 !important; }
          .gift-title { font-size: clamp(28px, 8.5vw, 36px) !important; line-height: 1.08 !important; max-width: 330px; }
          .gift-lead { font-size: 16px !important; line-height: 1.5 !important; max-width: 320px !important; }
          .gift-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .gift-grid > div { padding: 22px !important; border-radius: 14px !important; }
          .gift-grid > div > div:first-child { font-size: 32px !important; }
        }
      `}</style>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    {
      q: "How many people fit on a boat?",
      a: "All our tours are private charters for up to 6 guests. You never share the boat with strangers.",
    },
    {
      q: "What if the weather is bad?",
      a: "Safety first. If conditions are unsafe, we'll reschedule or refund you — no questions asked. We monitor forecasts the night before and text you by 7 AM.",
    },
    {
      q: "What should I bring?",
      a: "Sunscreen, sunglasses, a hat, and a camera. We provide everything else — including cold water, a cooler, and ice for your drinks.",
    },
    {
      q: "Can we bring food and drinks?",
      a: "Absolutely — BYOB and bring whatever snacks you'd like. We have a cooler and ice on board. For sunset cruises, we provide a champagne setup.",
    },
    {
      q: "Are children allowed?",
      a: "Yes — all ages are welcome. Kids under 4 must wear a life jacket (we provide them). Our captains are experienced with families and love having kids on board.",
    },
    {
      q: "Where do tours depart from?",
      a: "Shem Creek Marina, 110 Mill St, Mt. Pleasant, SC — 14 minutes from downtown Charleston. Free parking on site.",
    },
  ];
  return (
    <section id="faq" style={{ background: "#fff", padding: "100px 0" }} className="faq-section">
      <Container>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel style={{ justifyContent: "center" }}>FAQ</SectionLabel>
          <h2 className="faq-title" style={{ marginTop: 14, textAlign: "center" }}>Questions? We've got answers.</h2>
          <div className="faq-grid" style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0 40px" }}>
            {items.map((item, i) => (
              <div key={i} style={{ borderBottom: "1px solid var(--border)", overflow: "hidden" }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 0",
                    background: "transparent",
                    border: 0,
                    cursor: "pointer",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 17,
                    color: "var(--navy)",
                    textAlign: "left",
                    gap: 16,
                  }}
                >
                  {item.q}
                  <Icon
                    name="chevronDown"
                    size={18}
                    color="var(--accent)"
                    style={{
                      flexShrink: 0,
                      transform: open === i ? "rotate(180deg)" : "none",
                      transition: "transform 220ms",
                    }}
                  />
                </button>
                {open === i && (
                  <p
                    style={{
                      padding: "0 0 20px",
                      color: "var(--body)",
                      lineHeight: 1.7,
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
      <style>{`
        @media (max-width: 700px) {
          .faq-section { padding: 58px 0 !important; }
          .faq-title { font-size: clamp(28px, 8.5vw, 36px) !important; line-height: 1.08 !important; }
          .faq-section button { font-size: 16px !important; line-height: 1.3 !important; padding: 18px 0 !important; }
          .faq-section .faq-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
