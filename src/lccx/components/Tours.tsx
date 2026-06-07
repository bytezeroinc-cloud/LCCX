/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useState, useRef } from "react";
import { Icon, Badge, Btn, Container, Placeholder, SectionLabel } from "./Primitives";
import dolphinImg from "../../assets/lccx/dolphin-leap.webp";
import bachImg from "../../assets/lccx/bachelorette-hero-charleston-ai.jpg";
import sharkImg from "../../assets/lccx/fossil-teeth-hand.webp";
import sunsetFeatImg from "../../assets/lccx/sunset-marina-evening.jpg";
import sunsetPrivateImg from "../../assets/lccx/sunset-harbor-bow.webp";

// ── Tour data ─────────────────────────────────────────────────────────────────
export const TOURS = [
  {
    id: "sunset",
    name: "Sunset Harbor Cruise",
    tagline: "Golden hour over Charleston Harbor — shared or private",
    price: 65,
    unit: "/seat",
    privateFrom: 375,
    duration: "2 hours",
    capacity: "Up to 23 guests",
    kind: "sunset",
    badge: "Golden Hour",
    badgeVariant: "gold",
    description:
      "Cast off 90 minutes before sunset. Champagne toast off Fort Sumter while the city skyline lights up. BYOB — we bring the cooler, the ice, and the glasses.",
    highlights: ["Fort Sumter & Castle Pinckney", "Charleston skyline at dusk", "BYOB setup included"],
    href: "/sunset",
  },
  {
    id: "dolphin",
    name: "Dolphin Watching Tour",
    tagline: "Find the pods in Shem Creek & the harbor",
    price: 375,
    unit: "/charter",
    duration: "2 hours",
    capacity: "Up to 23 guests",
    kind: "dolphin",
    badge: "Most Popular",
    badgeVariant: "orange",
    description:
      "Bottlenose dolphins use the waters off Mt. Pleasant as a nursery — we know their patterns, their favorite feeding creeks, and the best light to see them surface.",
    highlights: ["Strand feeding behavior", "Pelican nesting islands", "Shem Creek shrimp fleet"],
    href: "/dolphin-watching",
  },
  {
    id: "sharktooth",
    name: "Shark Tooth & Fossil Hunt",
    tagline: "Morris Island megalodon teeth & prehistoric finds",
    price: 125,
    unit: "/seat",
    privateFrom: 400,
    duration: "4 hours",
    capacity: "Up to 23 guests",
    kind: "sharktooth",
    badge: "Family Favorite",
    badgeVariant: "gold",
    description:
      "The Lowcountry's prehistoric floor is covered in megalodon teeth, whale bone, and fossils 40 million years old. Tide-timed so you beach at the best hunting spots.",
    highlights: ["Megalodon teeth finds", "Morris Island beach stop", "Take-home collection bag"],
    href: "/shark-tooth-hunt",
  },
  {
    id: "bachelorette",
    name: "Bachelorette Party Cruise",
    tagline: "Her day, your crew, our captain",
    price: 350,
    unit: "/charter",
    duration: "2 – 4 hours",
    capacity: "Up to 23 guests",
    kind: "bach1",
    badge: "Private Event",
    badgeVariant: "navy",
    description:
      "Champagne, speakers, a sash for the bride, and a bluetooth-ready boat. We'll stop at a sandbar for photos and cruise past the Battery for her golden hour shot.",
    highlights: ["Sash + bluetooth speakers", "Sandbar photo stop", "Custom playlist welcome"],
    href: "/bachelorette-party-cruise",
  },
] as const;

export type Tour = (typeof TOURS)[number] & {
  badge?: string;
  badgeVariant?: string;
  unit?: string;
  privateFrom?: number;
  href?: string;
};

// ── TrustStrip ────────────────────────────────────────────────────────────────
export function TrustStrip() {
  const items = [
    { k: "5.0", label: "Google Reviews", icon: "star" },
    { k: "TripAdvisor", label: "Travelers' Choice '24", icon: "star" },
    { k: "USCG", label: "Licensed Captains", icon: "compass" },
    { k: "Private", label: "Optional charters", icon: "anchor" },
  ];
  return (
    <section
      style={{ background: "#fff", borderBottom: "1px solid var(--border)", padding: "28px 0" }}
      className="trust-section"
    >
      <Container>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            alignItems: "center",
          }}
          className="trust-grid"
        >
          {items.map((it, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center" }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  background: "var(--sand)",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--accent)",
                }}
              >
                <Icon name={it.icon} size={18} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 16,
                    color: "var(--navy)",
                    lineHeight: 1.1,
                  }}
                >
                  <span className="trust-text">{it.k}</span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    color: "var(--muted)",
                    marginTop: 2,
                  }}
                >
                  <span className="trust-label">{it.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .trust-section { padding: 18px 0 !important; }
          .trust-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 10px !important; }
          .trust-grid > div { min-width: 0; justify-content: flex-start !important; background: var(--sand); border: 1px solid var(--border); border-radius: 14px; padding: 12px; }
          .trust-grid > div > div:first-child { background: #fff !important; width: 34px !important; height: 34px !important; }
          .trust-text { font-size: 15px; line-height: 1.05; }
          .trust-label { font-size: 12px; line-height: 1.3; }
        }
      `}</style>
    </section>
  );
}

// ── TourCard ──────────────────────────────────────────────────────────────────
export function TourCard({
  tour,
  onBook,
  onDetails,
  layout = "grid",
}: {
  tour: any;
  onBook?: () => void;
  onDetails?: () => void;
  layout?: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--navy)",
        border: "1px solid var(--border)",
        borderRadius: 18,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 0,
        transition:
          "transform 220ms var(--ease-out), box-shadow 220ms var(--ease-out), border-color 220ms var(--ease-out)",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hover ? "var(--shadow-lift)" : "0 10px 30px rgba(12,35,64,0.07)",
        borderColor: hover ? "rgba(255,122,26,0.3)" : "var(--border)",
        cursor: onDetails ? "pointer" : "default",
        height: "100%",
        minHeight: layout === "carousel" ? 430 : 470,
        position: "relative",
        overflow: "hidden",
      }}
      onClick={onDetails}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: hover ? "scale(1.04)" : "scale(1)",
            transition: "transform 400ms var(--ease-out)",
          }}
        >
          <Placeholder kind={tour.kind} width="100%" height="100%" />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,27,48,0.10) 0%, rgba(10,27,48,0.36) 42%, rgba(10,27,48,0.92) 100%)",
          }}
        />
        {tour.badge && (
          <div style={{ position: "absolute", top: 12, left: 12 }}>
            <Badge variant={tour.badgeVariant || "orange"}>{tour.badge}</Badge>
          </div>
        )}
        <div style={{ position: "absolute", top: 12, right: 12, display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end" }}>
          <div style={{ background: "var(--accent)", borderRadius: 50, padding: "5px 12px", fontWeight: 800, fontSize: 13, color: "#fff", whiteSpace: "nowrap" }}>
            From ${tour.price}<span style={{ fontWeight: 500, fontSize: 11 }}>{tour.unit || "/guest"}</span>
          </div>
          {tour.privateFrom && (
            <div style={{ background: "rgba(255,255,255,0.93)", borderRadius: 50, padding: "4px 10px", fontWeight: 700, fontSize: 11, color: "var(--navy)", whiteSpace: "nowrap" }}>
              Charter from ${tour.privateFrom}
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          flex: 1,
          justifyContent: "flex-end",
          padding: "92px 22px 22px",
          minHeight: layout === "carousel" ? 430 : 470,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            color: "rgba(255,255,255,0.78)",
            fontSize: 13,
            fontWeight: 700,
            flexWrap: "nowrap",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Icon name="clock" size={14} /> {tour.duration}
          </span>
          <span>·</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Icon name="users" size={14} /> {tour.capacity}
          </span>
        </div>
        <h3 style={{ color: "var(--white)", lineHeight: 1.08 }}>{tour.name}</h3>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.80)", lineHeight: 1.5 }}>
          {tour.tagline}
        </p>
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 10,
            marginTop: 2,
          }}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              if (tour.href) window.location.href = tour.href;
              else onBook?.();
            }}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: "var(--accent)", border: 0, borderRadius: 999, color: "var(--white)",
              cursor: "pointer", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15,
              padding: "11px 18px", whiteSpace: "nowrap",
            }}
          >
            Book Now
            <Icon name="arrow" size={14} style={{ transform: hover ? "translateX(4px)" : "translateX(0)", transition: "transform 220ms var(--ease-out)" }} />
          </button>
          <a
            href={tour.href || "#"}
            onClick={(e) => { if (!tour.href) { e.preventDefault(); onDetails?.(); } }}
            style={{ color: "rgba(255,255,255,0.66)", fontSize: 13, fontWeight: 700, textDecoration: "none" }}
          >
            Learn More →
          </a>
        </div>
      </div>
    </article>
  );
}

// ── ToursSection ──────────────────────────────────────────────────────────────
export function ToursSection({
  layout = "grid",
  onBook,
  onDetails,
}: {
  layout?: string;
  onBook?: (t: any) => void;
  onDetails?: (t: any) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const visibleTours = TOURS.filter((t) => t.id !== "kids-fishing-camp" && t.id !== "fossil");

  const scroll = (dir: number) => {
    scrollerRef.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <section
      id="tours"
      style={{ background: "var(--sand)", padding: "96px 0 112px", position: "relative" }}
    >
      <Container>
        <div
          className="tours-heading"
          style={{ marginBottom: 40, textAlign: "center", maxWidth: 720, margin: "0 auto 40px" }}
        >
          <SectionLabel style={{ justifyContent: "center" }}>Charter Your Course</SectionLabel>
          <h2 className="tours-h2" style={{ marginTop: 14, whiteSpace: "normal" }}>
            Pick your excursion.{" "}
            <span style={{ color: "var(--accent)" }}>We'll handle the water.</span>
          </h2>
          <p
            className="lead"
            style={{ marginTop: 14, color: "var(--body)", maxWidth: 560, margin: "14px auto 0" }}
          >
            Every trip is private — just your group, your captain, and the Lowcountry.
          </p>
        </div>

        {layout === "grid" ? (
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 22 }}
            className="tours-grid"
          >
            {visibleTours.map((t) => (
              <TourCard
                key={t.id}
                tour={t}
                onBook={() => onBook?.(t)}
                onDetails={() => onDetails?.(t)}
              />
            ))}
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            <div
              ref={scrollerRef}
              style={{
                display: "grid",
                gridAutoFlow: "column",
                gridAutoColumns: "min(360px, 85%)",
                gap: 20,
                overflowX: "auto",
                overflowY: "visible",
                scrollSnapType: "x mandatory",
                padding: "4px 4px 24px",
                margin: "0 -4px",
              }}
            >
              {visibleTours.map((t) => (
                <div key={t.id} style={{ scrollSnapAlign: "start" }}>
                  <TourCard
                    tour={t}
                    onBook={() => onBook?.(t)}
                    onDetails={() => onDetails?.(t)}
                    layout="carousel"
                  />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
              <button onClick={() => scroll(-1)} style={arrowBtnStyle}>
                <Icon name="chevron" size={16} style={{ transform: "rotate(180deg)" }} />
              </button>
              <button onClick={() => scroll(1)} style={arrowBtnStyle}>
                <Icon name="chevron" size={16} />
              </button>
            </div>
          </div>
        )}
      </Container>
      <style>{`
        .tours-grid > article { animation: tourCardIn 420ms var(--ease-out) both; }
        .tours-grid > article:nth-child(2) { animation-delay: 60ms; }
        .tours-grid > article:nth-child(3) { animation-delay: 120ms; }
        .tours-grid > article:nth-child(4) { animation-delay: 180ms; }
        .tours-grid > article:nth-child(5) { animation-delay: 240ms; }
        @keyframes tourCardIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .tours-grid > article { grid-column: span 1; }
        .tours-grid > article h3 { font-size: 22px !important; }
        .tours-heading { max-width: 760px; }
        .tours-h2 { font-size: clamp(30px, 4vw, 52px) !important; white-space: normal !important; }
        @media (max-width: 1200px) { .tours-grid { grid-template-columns: repeat(2, 1fr) !important; } .tours-grid > article { grid-column: span 1 !important; } }
        @media (max-width: 900px) {
          #tours { padding: 58px 0 66px !important; }
          .tours-heading { margin-bottom: 24px !important; max-width: 340px; }
          .tours-h2 { font-size: clamp(28px, 8.5vw, 36px) !important; line-height: 1.08 !important; }
          .tours-heading .lead { font-size: 16px !important; line-height: 1.5 !important; max-width: 320px !important; }
          .tours-grid { display: grid !important; grid-template-columns: 1fr !important; gap: 14px !important; margin: 0; padding: 0; overflow: visible; }
          .tours-grid > article { min-width: 0; width: 100%; min-height: 390px !important; border-radius: 14px !important; padding: 0 !important; gap: 0 !important; }
          .tours-grid > article h3 { font-size: 20px !important; line-height: 1.14 !important; }
          .tours-grid > article p { font-size: 14px !important; line-height: 1.45 !important; }
          .tours-grid > article > div:first-child { border-radius: 0 !important; }
          .tours-grid > article > div:nth-child(2) { min-height: 390px !important; padding: 82px 18px 18px !important; }
        }
        @media (max-width: 640px) { .tours-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

const arrowBtnStyle: React.CSSProperties = {
  width: 42, height: 42, borderRadius: 50, background: "#fff",
  border: "1px solid var(--border)", display: "inline-grid",
  placeItems: "center", cursor: "pointer", color: "var(--navy)",
};

// ── GroupToursSection ─────────────────────────────────────────────────────────
// Shared / per-person tours: Sunset ($65/seat) + Shark Tooth ($125/seat)
const GROUP_TOURS = [
  {
    id: "sunset",
    name: "Sunset Harbor Cruise",
    tagline: "Golden hour on Charleston Harbor — open water, copper skies, dolphins",
    price: 65,
    unit: "/seat",
    seats: 23,
    duration: "2 hours",
    departure: "Daily at 6:30 PM",
    highlights: ["BYOB — cooler & ice included", "Ravenel Bridge & Fort Sumter route", "Dolphins on 90% of departures"],
    img: sunsetFeatImg,
    href: "/sunset?mode=shared#lccx-book",
    badge: "Daily Departures",
    badgeBg: "#E8B04B",
  },
  {
    id: "sharktooth",
    name: "Shark Tooth Hunt",
    tagline: "Megalodon teeth from Morris Island — tide-timed beach stops",
    price: 125,
    unit: "/seat",
    seats: 23,
    duration: "4 hours",
    departure: "Tide-dependent · mornings",
    highlights: ["Megalodon & fossil finds guaranteed", "Morris Island beach landing", "Take-home collection bag"],
    img: sharkImg,
    href: "/shark-tooth-hunt?mode=shared#lccx-book",
    badge: "Family Favorite",
    badgeBg: "#FF7A1A",
  },
];

export function GroupToursSection() {
  return (
    <section style={{ background: "var(--sand)", padding: "100px 0" }}>
      <Container>
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 52px" }}>
          <SectionLabel style={{ justifyContent: "center" }}>Group Tours</SectionLabel>
          <h2 style={{ marginTop: 14 }}>
            Join a departure.{" "}
            <span style={{ color: "var(--accent)" }}>Book a seat.</span>
          </h2>
          <p style={{ color: "var(--body)", fontSize: 16, lineHeight: 1.65, marginTop: 12, maxWidth: 520, margin: "12px auto 0" }}>
            Our shared departures run daily on the Roamer IV — up to 23 guests, per-person pricing. Book as few or as many seats as you need.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }} className="gt-grid">
          {GROUP_TOURS.map((t) => (
            <article key={t.id} style={{ borderRadius: 22, overflow: "hidden", background: "#fff", border: "1px solid var(--border)", boxShadow: "0 4px 24px rgba(12,35,64,0.08)" }}>
              {/* Photo */}
              <div style={{ position: "relative", height: 280 }}>
                <img src={t.img} alt={t.name} loading="eager" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(12,35,64,0.75) 100%)" }} />
                {/* Badge */}
                <div style={{ position: "absolute", top: 16, left: 16, background: t.badgeBg, borderRadius: 50, padding: "5px 13px", fontSize: 11, fontWeight: 800, color: "#fff", letterSpacing: "0.08em" }}>
                  {t.badge}
                </div>
                {/* Price pill */}
                <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.95)", borderRadius: 50, padding: "6px 14px", fontWeight: 800, fontSize: 16, color: "var(--navy)" }}>
                  ${t.price}<span style={{ fontWeight: 500, fontSize: 12, color: "var(--muted)" }}>{t.unit}</span>
                </div>
                {/* Overlay text */}
                <div style={{ position: "absolute", bottom: 16, left: 20, right: 20 }}>
                  <h3 style={{ color: "#fff", fontSize: 22, margin: 0, lineHeight: 1.1 }}>{t.name}</h3>
                  <p style={{ color: "rgba(255,255,255,0.80)", fontSize: 13, margin: "5px 0 0", lineHeight: 1.4 }}>{t.tagline}</p>
                </div>
              </div>
              {/* Body */}
              <div style={{ padding: "24px 26px" }}>
                {/* Quick facts */}
                <div style={{ display: "flex", gap: 18, marginBottom: 18, flexWrap: "wrap" }}>
                  <span style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>
                    <Icon name="clock" size={14} color="var(--accent)" /> {t.duration}
                  </span>
                  <span style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>
                    <Icon name="users" size={14} color="var(--accent)" /> Up to {t.seats} seats
                  </span>
                  <span style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>
                    <Icon name="sun" size={14} color="var(--accent)" /> {t.departure}
                  </span>
                </div>
                {/* Highlights */}
                <ul style={{ listStyle: "none", margin: "0 0 22px", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {t.highlights.map((h) => (
                    <li key={h} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "var(--body)" }}>
                      <Icon name="check" size={15} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} />
                      {h}
                    </li>
                  ))}
                </ul>
                {/* CTA */}
                <a
                  href={t.href}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    background: "var(--accent)", borderRadius: 999, color: "#fff",
                    fontWeight: 800, fontSize: 16, padding: "14px 0", textDecoration: "none",
                  }}
                >
                  Book a Seat — ${t.price}{t.unit}
                  <Icon name="arrow" size={15} color="#fff" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 720px) { .gt-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ── PrivateCharterSection ─────────────────────────────────────────────────────
const PRIVATE_TOURS = [
  {
    id: "sunset-private",
    name: "Sunset Charter",
    sub: "Whole boat · golden hour",
    priceFrom: 375,
    priceNote: "1–4 guests",
    img: sunsetPrivateImg,
    bullets: ["Up to 23 guests · Roamer IV", "6:30 PM daily departure", "BYOB — cooler & glasses included"],
    href: "/sunset-private#lccx-book",
    detailHref: "/sunset",
    badge: "Golden Hour",
  },
  {
    id: "dolphin-private",
    name: "Dolphin Charter",
    sub: "Private pod-finding mission",
    priceFrom: 375,
    priceNote: "1–4 guests",
    img: dolphinImg,
    bullets: ["Up to 23 guests", "2 hours · Shem Creek & harbor", "Dolphins on 98% of departures"],
    href: "/dolphin-watching#lccx-book",
    detailHref: "/dolphin-watching",
    badge: "Most Popular",
  },
  {
    id: "shark-private",
    name: "Shark Tooth Charter",
    sub: "Private fossil-hunting expedition",
    priceFrom: 400,
    priceNote: "1–2 guests · 3hrs",
    img: sharkImg,
    bullets: ["Up to 23 guests", "3 or 4-hour options", "Optional expert guide +$150"],
    href: "/shark-tooth-hunt?mode=private",
    detailHref: "/shark-tooth-hunt",
    badge: "Family Favorite",
  },
  {
    id: "bach-private",
    name: "Party Cruise",
    sub: "Bachelorette, birthdays & celebrations",
    priceFrom: 350,
    priceNote: "1–2 guests · 2hrs",
    img: bachImg,
    bullets: ["Up to 23 guests", "2, 3, or 4-hour options", "Custom playlist & décor welcome"],
    href: "/bachelorette-party-cruise#lccx-book",
    detailHref: "/bachelorette-party-cruise",
    badge: "Private Event",
  },
];

export function PrivateCharterSection({ onBook }: { onBook?: () => void }) {
  return (
    <section style={{ background: "var(--navy)", padding: "100px 0" }}>
      <Container>
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 52px" }}>
          <SectionLabel color="var(--accent-2)" style={{ justifyContent: "center" }}>Private Charters</SectionLabel>
          <h2 style={{ color: "#fff", marginTop: 14 }}>
            The whole boat.{" "}
            <em style={{ color: "var(--accent-2)" }}>Just your group.</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 16, lineHeight: 1.65, marginTop: 12, maxWidth: 480, margin: "12px auto 0" }}>
            Private charters on the Roamer IV — up to 23 guests, one flat price, no strangers on board. Every tour available as a private charter.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }} className="pc-grid">
          {PRIVATE_TOURS.map((t) => (
            <article
              key={t.id}
              style={{ borderRadius: 20, overflow: "hidden", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              {/* Photo */}
              <div style={{ position: "relative", height: 200 }}>
                <img src={t.img} alt={t.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(12,35,64,0.15) 0%, rgba(12,35,64,0.70) 100%)" }} />
                <div style={{ position: "absolute", top: 12, left: 12 }}>
                  <Badge variant="outline" style={{ fontSize: 10, padding: "4px 10px" }}>{t.badge}</Badge>
                </div>
              </div>
              {/* Body */}
              <div style={{ padding: "20px 20px 22px" }}>
                <div style={{ marginBottom: 4 }}>
                  <h3 style={{ color: "#fff", fontSize: 18, margin: 0 }}>{t.name}</h3>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12.5, margin: "3px 0 0" }}>{t.sub}</p>
                </div>
                {/* Price */}
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "12px 0" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 26, color: "var(--accent-2)" }}>
                    ${t.priceFrom}
                  </span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.50)", fontWeight: 600 }}>from · {t.priceNote}</span>
                </div>
                {/* Bullets */}
                <ul style={{ listStyle: "none", margin: "0 0 18px", padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                  {t.bullets.map((b) => (
                    <li key={b} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12.5, color: "rgba(255,255,255,0.72)" }}>
                      <Icon name="check" size={13} color="var(--accent-2)" style={{ flexShrink: 0, marginTop: 2 }} />
                      {b}
                    </li>
                  ))}
                </ul>
                {/* CTAs */}
                <a
                  href={t.href}
                  style={{
                    display: "block", textAlign: "center", background: "var(--accent)", borderRadius: 999,
                    color: "#fff", fontWeight: 800, fontSize: 14, padding: "11px 0", textDecoration: "none", marginBottom: 8,
                  }}
                >
                  Book Private Charter
                </a>
                <a
                  href={t.detailHref}
                  style={{
                    display: "block", textAlign: "center", background: "transparent",
                    border: "1px solid rgba(255,255,255,0.22)", borderRadius: 999,
                    color: "rgba(255,255,255,0.72)", fontWeight: 600, fontSize: 13, padding: "9px 0", textDecoration: "none",
                  }}
                >
                  View details →
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 1100px) { .pc-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .pc-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ── SunsetFeatureSection ──────────────────────────────────────────────────────
export function SunsetFeatureSection({ onBook }: { onBook?: () => void }) {
  return (
    <section style={{ background: "var(--navy)", padding: "0" }} className="sf-section">
      {/* Top: hero photo strip */}
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", minHeight: 520 }} className="sf-grid">
        {/* Left: image */}
        <div style={{ position: "relative", overflow: "hidden", minHeight: 380 }}>
          <img src={sunsetFeatImg} alt="Charleston marina at golden hour" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} loading="eager" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(12,35,64,0) 60%, rgba(12,35,64,0.5) 100%)" }} />
          {/* Badge */}
          <div style={{ position: "absolute", top: 24, left: 24, background: "rgba(232,176,75,0.18)", border: "1px solid var(--accent-2)", borderRadius: 50, padding: "7px 16px", color: "var(--accent-2)", fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            ☀ Golden Hour
          </div>
        </div>
        {/* Right: content */}
        <div style={{ padding: "56px 52px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 32 }} className="sf-content">
          <div>
            <SectionLabel color="var(--accent-2)" align="left">Sunset Cruise</SectionLabel>
            <h2 style={{ color: "#fff", marginTop: 14, lineHeight: 1.08 }}>
              The most beautiful<br />
              <em style={{ color: "var(--accent-2)" }}>two hours in Charleston.</em>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, lineHeight: 1.7, marginTop: 14, maxWidth: 400 }}>
              Departs daily. Timed to golden hour — Ravenel Bridge, Fort Sumter, open harbor. BYOB with cooler & ice provided. Dolphins follow the boat home.
            </p>
          </div>
          {/* Two booking options */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="sf-options">
            {/* Shared */}
            <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16, padding: "20px 18px" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-2)", marginBottom: 8 }}>Group Seats</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 28, color: "#fff", lineHeight: 1 }}>$65<span style={{ fontSize: 14, fontWeight: 500 }}>/seat</span></div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 6, marginBottom: 14 }}>Join a shared departure · up to 23 seats</div>
              <button onClick={onBook} style={{ width: "100%", background: "var(--accent)", border: 0, borderRadius: 999, color: "#fff", fontWeight: 800, fontSize: 14, padding: "11px 0", cursor: "pointer" }}>
                Book a Seat →
              </button>
            </div>
            {/* Private */}
            <div style={{ background: "rgba(232,176,75,0.10)", border: "1px solid rgba(232,176,75,0.30)", borderRadius: 16, padding: "20px 18px" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-2)", marginBottom: 8 }}>Private Charter</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 28, color: "#fff", lineHeight: 1 }}>$375<span style={{ fontSize: 14, fontWeight: 500 }}>/charter</span></div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 6, marginBottom: 14 }}>Whole boat for your group · up to 23</div>
              <a href="/sunset" style={{ display: "block", width: "100%", textAlign: "center", background: "transparent", border: "1px solid rgba(232,176,75,0.6)", borderRadius: 999, color: "var(--accent-2)", fontWeight: 800, fontSize: 14, padding: "11px 0", cursor: "pointer", textDecoration: "none" }}>
                See Private Options →
              </a>
            </div>
          </div>
          {/* Why choose us bullets */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["Timed to exact golden hour", "BYOB — cooler, ice & glasses provided", "Licensed USCG captains", "Dolphins on 90% of departures", "Free cancellation 24hrs before"].map((pt) => (
              <div key={pt} style={{ display: "flex", gap: 10, alignItems: "center", color: "rgba(255,255,255,0.80)", fontSize: 14 }}>
                <Icon name="check" size={15} color="var(--accent-2)" style={{ flexShrink: 0 }} />
                {pt}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Bottom: second photo strip */}
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img src={sunsetPrivateImg} alt="View from the bow at sunset" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }} loading="lazy" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(12,35,64,0.85) 0%, rgba(12,35,64,0.2) 60%)" }} />
        <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, textAlign: "center" }}>
          <a href="/sunset" style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: 700, textDecoration: "none", letterSpacing: "0.06em" }}>
            View full Sunset Cruise page →
          </a>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .sf-grid { grid-template-columns: 1fr !important; }
          .sf-content { padding: 36px 24px !important; }
          .sf-options { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ── OtherToursSection ──────────────────────────────────────────────────────────
const OTHER_TOURS = [
  {
    id: "dolphin",
    name: "Dolphin Watching",
    tagline: "Bottlenose pods, year-round sightings",
    price: 375,
    unit: "/charter",
    img: dolphinImg,
    badge: "Most Popular",
    bullets: ["Private boat · up to 23 guests", "2 hours · Shem Creek & harbor", "Dolphins on 98% of tours"],
    href: "/dolphin-watching",
  },
  {
    id: "sharktooth",
    name: "Shark Tooth & Fossil Hunt",
    tagline: "Megalodon teeth from Morris Island",
    price: 125,
    unit: "/seat",
    privateFrom: 400,
    img: sharkImg,
    badge: "Family Favorite",
    bullets: ["Shared ($125/seat) or Private ($400+)", "4 hours · tide-timed beach stops", "Kids take home megalodon teeth"],
    href: "/shark-tooth-hunt",
  },
  {
    id: "bachelorette",
    name: "Bachelorette Party Cruise",
    tagline: "Private charter, custom playlist",
    price: 350,
    unit: "/charter",
    img: bachImg,
    badge: "Private Event",
    bullets: ["Whole boat for your crew", "2–4 hrs · up to 23 guests", "Custom decorations welcome"],
    href: "/bachelorette-party-cruise",
  },
];

export function OtherToursSection({ onBook }: { onBook?: () => void }) {
  return (
    <section style={{ background: "var(--cream)", padding: "100px 0" }}>
      <Container>
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 52px" }}>
          <SectionLabel style={{ justifyContent: "center" }}>More Adventures</SectionLabel>
          <h2 style={{ marginTop: 14 }}>
            Every trip is private.{" "}
            <span style={{ color: "var(--accent)" }}>Every view is yours.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="ot-grid">
          {OTHER_TOURS.map((t) => (
            <article
              key={t.id}
              style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid var(--border)", boxShadow: "0 4px 20px rgba(12,35,64,0.06)" }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: 220 }}>
                <img src={t.img} alt={t.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(12,35,64,0.65) 100%)" }} />
                <div style={{ position: "absolute", top: 12, left: 12 }}>
                  <Badge variant={t.id === "dolphin" ? "orange" : t.id === "sharktooth" ? "gold" : "navy"}>{t.badge}</Badge>
                </div>
                {/* Dual price pills */}
                <div style={{ position: "absolute", top: 12, right: 12, display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                  <span style={{ background: "var(--accent)", borderRadius: 50, padding: "4px 10px", fontSize: 12, fontWeight: 800, color: "#fff", whiteSpace: "nowrap" }}>
                    From ${t.price}{t.unit}
                  </span>
                  {t.privateFrom && (
                    <span style={{ background: "rgba(255,255,255,0.93)", borderRadius: 50, padding: "3px 9px", fontSize: 11, fontWeight: 700, color: "var(--navy)", whiteSpace: "nowrap" }}>
                      Charter ${t.privateFrom}+
                    </span>
                  )}
                </div>
              </div>
              {/* Body */}
              <div style={{ padding: "22px 24px" }}>
                <h3 style={{ fontSize: 20, color: "var(--navy)", marginBottom: 4 }}>{t.name}</h3>
                <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 14 }}>{t.tagline}</p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 7, marginBottom: 20 }}>
                  {t.bullets.map((b) => (
                    <li key={b} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13.5, color: "var(--body)" }}>
                      <Icon name="check" size={14} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} />
                      {b}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={onBook}
                    style={{ flex: 1, background: "var(--accent)", border: 0, borderRadius: 999, color: "#fff", fontWeight: 800, fontSize: 14, padding: "11px 0", cursor: "pointer" }}
                  >
                    Book Now
                  </button>
                  <a
                    href={t.href}
                    style={{ flex: 1, textAlign: "center", background: "var(--sand)", borderRadius: 999, color: "var(--navy)", fontWeight: 700, fontSize: 14, padding: "11px 0", textDecoration: "none", display: "block" }}
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 960px) { .ot-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 601px) and (max-width: 960px) { .ot-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}

// ── WhyChooseAndDirections ────────────────────────────────────────────────────
export function WhyChooseAndDirections({ onBook }: { onBook?: () => void }) {
  const WHY = [
    { icon: "anchor", title: "USCG-Licensed Captains", body: "Every boat is operated by a US Coast Guard licensed captain who knows these waters inside out." },
    { icon: "users", title: "Roamer IV — up to 23 guests", body: "Our largest vessel, the Roamer IV, comfortably seats 23. No cramped boats, no stranger strangers." },
    { icon: "star", title: "500+ Five-Star Reviews", body: "Rated 5.0 on Google and TripAdvisor by real guests who actually came, saw, and came back." },
    { icon: "heart", title: "BYOB Always Welcome", body: "Bring your own food and drinks. We provide cooler, ice, and cups — you bring the good stuff." },
    { icon: "sun", title: "Timed to Nature", body: "We time every departure to the tide, golden hour, or wildlife patterns so you see the Lowcountry at its best." },
    { icon: "compass", title: "Free Cancellation", body: "Cancel 24 hours before for a full refund. No questions asked, no stress." },
  ];
  return (
    <section style={{ background: "#fff", padding: "100px 0" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }} className="wc-grid">
          {/* Left: Why Choose Us */}
          <div>
            <SectionLabel align="left" style={{ marginBottom: 14 }}>Why Choose Us</SectionLabel>
            <h2 style={{ marginBottom: 36 }}>
              The Lowcountry, done{" "}
              <span style={{ color: "var(--accent)" }}>right.</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="wc-bullets">
              {WHY.map((w) => (
                <div key={w.title}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,122,26,0.10)", border: "1px solid rgba(255,122,26,0.18)", display: "grid", placeItems: "center", marginBottom: 10 }}>
                    <Icon name={w.icon} size={18} color="var(--accent)" />
                  </div>
                  <div style={{ fontWeight: 800, color: "var(--navy)", fontSize: 14, marginBottom: 4 }}>{w.title}</div>
                  <p style={{ fontSize: 13.5, color: "var(--body)", lineHeight: 1.6, margin: 0 }}>{w.body}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 36 }}>
              <Btn onClick={onBook}>Reserve Your Trip →</Btn>
            </div>
          </div>
          {/* Right: Map + directions */}
          <div>
            <SectionLabel align="left" style={{ marginBottom: 14 }}>Where to Find Us</SectionLabel>
            <h2 style={{ marginBottom: 16 }}>Board at <span style={{ color: "var(--accent)" }}>Shem Creek.</span></h2>
            <p style={{ color: "var(--body)", fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
              14 minutes from downtown Charleston across the Ravenel Bridge. Free public parking at Shem Creek — look for our boat at the docks.
            </p>
            {/* Google Maps embed — satellite/hybrid view */}
            <div style={{ borderRadius: 18, overflow: "hidden", border: "1px solid var(--border)", boxShadow: "0 4px 20px rgba(12,35,64,0.1)", marginBottom: 16, position: "relative", height: 300 }}>
              <iframe
                title="Shem Creek, Mt. Pleasant, SC — LowCountry Coastal Excursions departure dock"
                src="https://maps.google.com/maps?q=Shem+Creek+Marina,+Mt+Pleasant,+SC&t=k&z=16&output=embed"
                style={{ position: "absolute", inset: 0, border: 0, width: "100%", height: "100%" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Btn
                as="a"
                href="https://www.google.com/maps/dir/?api=1&destination=Shem+Creek+Marina,+Mt+Pleasant,+SC"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="compass" size={16} /> Get Directions →
              </Btn>
              <Btn variant="secondary" as="a" href="tel:+18435081600">
                <Icon name="phone" size={16} /> (843) 508-1600
              </Btn>
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .wc-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .wc-bullets { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ── GoldenHourFeature ─────────────────────────────────────────────────────────
export function GoldenHourFeature({ onBook }: { onBook?: () => void }) {
  return (
    <section
      id="experience"
      style={{ position: "relative", color: "#fff", overflow: "hidden" }}
      className="golden-section"
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <Placeholder kind="marsh" width="100%" height="100%" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(10,27,48,0.88) 0%, rgba(10,27,48,0.55) 55%, rgba(10,27,48,0.25) 100%)",
          }}
        />
      </div>
      <Container
        style={{ position: "relative", padding: "120px 0", zIndex: 2 }}
        className="golden-container"
      >
        <div style={{ maxWidth: 620 }}>
          <SectionLabel color="var(--accent-2)" align="left">The Golden Hour</SectionLabel>
          <h2
            className="golden-title"
            style={{ color: "#fff", marginTop: 18 }}
          >
            The 90 minutes before{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent-2)" }}>sunset</em> are why we do
            this.
          </h2>
          <p
            className="lead golden-lead"
            style={{ color: "rgba(255,255,255,0.85)", marginTop: 22, fontSize: 19 }}
          >
            The water turns copper, the dolphins feed close to the boat, and the Charleston skyline
            lights up behind you. It's the moment everyone remembers — we just know where to point
            the bow.
          </p>
          <div
            style={{ display: "flex", gap: 40, marginTop: 36, flexWrap: "wrap" }}
            className="golden-stats"
          >
            {[
              { k: "Sunset", v: "7:48 PM tonight" },
              { k: "Tide", v: "Incoming, +3.1 ft" },
              { k: "Best spot", v: "Off Castle Pinckney" },
            ].map((s, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.6)",
                    textTransform: "uppercase",
                    letterSpacing: ".14em",
                  }}
                >
                  {s.k}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#fff",
                    marginTop: 6,
                  }}
                >
                  {s.v}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{ marginTop: 36, display: "flex", gap: 10, flexWrap: "wrap" }}
            className="golden-actions"
          >
            <Btn size="lg" onClick={onBook}>
              Reserve Sunset Cruise →
            </Btn>
            <Btn size="lg" variant="secondary" onDark>
              Check Tonight's Window
            </Btn>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .golden-section { min-height: 620px; }
          .golden-container { padding-top: 74px !important; padding-bottom: 74px !important; }
          .golden-title { font-size: clamp(30px, 8.5vw, 38px) !important; line-height: 1.08 !important; max-width: 340px; }
          .golden-lead { font-size: 16px !important; line-height: 1.52 !important; margin-top: 16px !important; max-width: 330px; }
          .golden-stats { display: grid !important; grid-template-columns: 1fr; gap: 16px !important; margin-top: 26px !important; }
          .golden-actions { display: grid !important; grid-template-columns: 1fr; gap: 10px !important; margin-top: 26px !important; }
          .golden-actions > * { width: 100%; justify-content: center; white-space: normal !important; text-align: center; }
        }
      `}</style>
    </section>
  );
}

// ── WildlifeStrip ─────────────────────────────────────────────────────────────
export function WildlifeStrip() {
  const items = [
    {
      name: "Bottlenose Dolphin",
      hint: "Resident pods, year-round",
      kind: "dolphin",
      freq: "Seen on 98% of tours",
    },
    {
      name: "Loggerhead Turtle",
      hint: "Nesting Apr–Oct",
      kind: "turtle",
      freq: "Summer sightings",
    },
    { name: "Brown Pelican", hint: "Diving for mullet", kind: "pelican", freq: "Year-round" },
    {
      name: "Roseate Spoonbill",
      hint: "Rare summer visitor",
      kind: "spoonbill",
      freq: "June–August",
    },
    { name: "West Indian Manatee", hint: "Warm-water migrant", kind: "manatee", freq: "Summer" },
    { name: "Bald Eagle", hint: "Nesting on barrier islands", kind: "eagle", freq: "Winter" },
  ];
  return (
    <section style={{ background: "#fff", padding: "40px 0" }} className="wildlife-section">
      <Container>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 20px" }}>
          <SectionLabel style={{ justifyContent: "center" }}>What you'll see</SectionLabel>
          <h2 className="wildlife-title" style={{ marginTop: 8 }}>
            The Lowcountry is <span style={{ color: "var(--accent)" }}>alive</span>.
          </h2>
          <p
            className="lead wildlife-lead"
            style={{ marginTop: 8, color: "var(--body)", maxWidth: 560, margin: "8px auto 0" }}
          >
            Three estuaries meet in Charleston Harbor. That means more wildlife, more often, than
            almost anywhere else on the East Coast.
          </p>
          <div className="wildlife-action" style={{ marginTop: 12 }}>
            <Btn variant="secondary">Wildlife Calendar →</Btn>
          </div>
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}
          className="wildlife-grid"
        >
          {items.map((it, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  aspectRatio: "1/1",
                  borderRadius: 16,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Placeholder kind={it.kind} width="100%" height="100%" />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, transparent 40%, rgba(10,27,48,0.7) 100%)",
                  }}
                />
                <div style={{ position: "absolute", bottom: 10, left: 10, right: 10 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 14,
                      color: "#fff",
                    }}
                  >
                    {it.name}
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--muted)",
                }}
              >
                {it.freq}
              </div>
            </div>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 1000px) { .wildlife-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 900px) {
          .wildlife-section { padding: 58px 0 !important; }
          .wildlife-title { font-size: clamp(28px, 8.5vw, 36px) !important; line-height: 1.08 !important; max-width: 330px; }
          .wildlife-lead { font-size: 16px !important; line-height: 1.5 !important; max-width: 330px !important; }
          .wildlife-action { display: none; }
          .wildlife-grid { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 12px !important; margin: 0; padding: 0; overflow: visible; }
          .wildlife-grid > div { min-width: 0; }
        }
        @media (max-width: 600px) { .wildlife-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}
