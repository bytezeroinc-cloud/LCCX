/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useState, useEffect } from "react";
import { Icon, Badge, Btn, Container } from "./Primitives";
import { Placeholder } from "./Primitives";

// ── Logo ──────────────────────────────────────────────────────────────────────
export function LccxLogo({ color = "var(--navy)" }: { color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, color }}>
      <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="19" stroke={color} strokeWidth="1.5" opacity=".25" />
        <path
          d="M6 24 Q12 20 18 24 T30 24 T38 22"
          stroke={color}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M14 18 Q18 10 26 13 Q30 15 32 18 Q28 17 26 20 Q22 22 18 22 Q14 22 14 18 Z"
          fill={color}
        />
        <path d="M22 11 Q24 6 26 13" fill={color} />
      </svg>
      <div style={{ lineHeight: 1 }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: "-0.02em",
          }}
        >
          LowCountry
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            opacity: 0.7,
            marginTop: 2,
          }}
        >
          Coastal Excursions
        </div>
      </div>
    </div>
  );
}

// ── SiteNav ───────────────────────────────────────────────────────────────────
// Grouped menu. Only items with `id` are rendered (active pages).
// Inactive entries are commented out until their pages exist.
type TourGroup = { label: string; items: { label: string; id: string }[] };
const TOUR_GROUPS: TourGroup[] = [
  {
    label: "Party Cruises",
    items: [
      { label: "Bachelorette Party Cruise", id: "bachelorette" },
      // { label: "Birthday Party Cruise", id: "birthday" },
      // { label: "Bachelor Party Cruise", id: "bachelor" },
    ],
  },
  {
    label: "Daily Cruises",
    items: [
      { label: "Sunset Tour Cruise", id: "sunset" },
      // { label: "Boat to Beach Cruise", id: "boat-to-beach" },
      // { label: "Charleston Historic Harbour Cruise", id: "historic-harbour" },
      // { label: "Dolphin", id: "dolphin" },
    ],
  },
  {
    label: "Fossil Hunt",
    items: [
      { label: "Fossil Hunt", id: "fossil" },
      { label: "Shark Tooth Hunting", id: "sharktooth" },
      // { label: "Morris Island Shared Charter", id: "morris-island" },
      // { label: "Harbour Island Hopping", id: "harbour-island" },
      // { label: "Crab Bank Island Shark Tooth", id: "crab-bank" },
    ],
  },
  {
    label: "Fishing Charters",
    items: [
      // { label: "Inshore Fishing", id: "inshore" },
      { label: "Kid's Fishing Camp", id: "kids-fishing-camp" },
    ],
  },
].filter((g) => g.items.length > 0);

export function SiteNav({
  page = "home",
  onNavigate,
  dark = false,
}: {
  page?: string;
  onNavigate?: (p: string) => void;
  dark?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toursOpen, setToursOpen] = useState(false);
  const closeToursTimer = React.useRef<number | null>(null);

  const openToursMenu = () => {
    if (closeToursTimer.current) {
      window.clearTimeout(closeToursTimer.current);
      closeToursTimer.current = null;
    }
    setToursOpen(true);
  };

  const closeToursMenu = () => {
    closeToursTimer.current = window.setTimeout(() => setToursOpen(false), 260);
  };

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 12);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const isDark = dark && !scrolled;
  const fg = isDark ? "#fff" : "var(--navy)";
  const navBg = scrolled
    ? "rgba(255,255,255,0.74)"
    : dark
      ? "transparent"
      : "rgba(255,255,255,0.95)";
  const border = scrolled ? "1px solid rgba(255,255,255,0.34)" : "1px solid transparent";

  return (
    <header
      style={{
        position: "fixed",
        top: "var(--nav-offset, 0px)",
        left: 0,
        right: 0,
        zIndex: 50,
        background: navBg,
        borderBottom: border,
        backdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
        transition: "background 250ms var(--ease-out), border-color 250ms var(--ease-out)",
      }}
    >
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 76,
        }}
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate?.("home");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: fg,
          }}
        >
          <LccxLogo color={fg} />
        </a>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontFamily: "var(--font-body)",
            fontSize: 15,
            fontWeight: 500,
            color: fg,
          }}
          className="nav-desktop"
        >
          {/* Tours dropdown */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={openToursMenu}
            onMouseLeave={closeToursMenu}
          >
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                background: "transparent",
                border: 0,
                cursor: "pointer",
                color: fg,
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: 15,
                opacity: 0.88,
                padding: 0,
              }}
            >
              Tours
              <svg
                width="11"
                height="7"
                viewBox="0 0 11 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                style={{
                  transition: "transform 200ms",
                  transform: toursOpen ? "rotate(180deg)" : "none",
                }}
              >
                <path d="M1 1l4.5 4.5L10 1" />
              </svg>
            </button>
            {toursOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  paddingTop: 10,
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  boxShadow: "0 16px 40px -8px rgba(12,35,64,0.18)",
                  padding: "8px 0",
                  minWidth: 220,
                  zIndex: 100,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -5,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 10,
                    height: 10,
                    background: "#fff",
                    border: "1px solid var(--border)",
                    borderRight: "none",
                    borderBottom: "none",
                    rotate: "45deg",
                  }}
                />
                {TOUR_GROUPS.map((g, gi) => (
                  <div key={g.label} style={{ paddingTop: gi === 0 ? 0 : 6 }}>
                    <div
                      style={{
                        padding: "8px 20px 4px",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: ".14em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {g.label}
                    </div>
                    {g.items.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setToursOpen(false);
                          onNavigate?.(t.id);
                        }}
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "left",
                          padding: "10px 20px",
                          background: "transparent",
                          border: 0,
                          cursor: "pointer",
                          fontFamily: "var(--font-body)",
                          fontWeight: 500,
                          fontSize: 14,
                          color: "var(--navy)",
                          transition: "background 120ms",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--sand)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            style={{ color: "inherit", textDecoration: "none", opacity: 0.88 }}
          >
            FAQ
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.("about");
            }}
            style={{ color: "inherit", textDecoration: "none", opacity: 0.88 }}
          >
            About Us
          </a>
          <a
            href="#gift"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("gift")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            style={{ color: "inherit", textDecoration: "none", opacity: 0.88 }}
          >
            Gift Cards
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.("contact");
            }}
            style={{ color: "inherit", textDecoration: "none", opacity: 0.88 }}
          >
            Contact
          </a>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <a
            href="tel:+18435550123"
            style={{
              display: "none",
              alignItems: "center",
              gap: 6,
              color: fg,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
            className="nav-phone"
          >
            <Icon name="phone" size={16} /> (843) 508-1600
          </a>
          <Btn size="sm" onClick={() => onNavigate?.("book")}>
            Book Now →
          </Btn>
          <button
            className="nav-burger"
            onClick={() => setMobileOpen((v) => !v)}
            style={{
              display: "none",
              background: "transparent",
              border: 0,
              cursor: "pointer",
              color: fg,
              padding: 4,
            }}
          >
            <Icon name={mobileOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </Container>
      {mobileOpen && (
        <div style={{ background: "#fff", borderTop: "1px solid var(--border)" }}>
          <Container
            style={{ padding: "16px 0 24px", display: "flex", flexDirection: "column", gap: 0 }}
          >
            {/* Tours — expandable */}
            <button
              onClick={() => setToursOpen((v) => !v)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 4px",
                background: "transparent",
                border: 0,
                borderBottom: "1px solid var(--border)",
                cursor: "pointer",
                color: "var(--navy)",
                fontFamily: "var(--font-body)",
                fontSize: 17,
                fontWeight: 500,
                textAlign: "left",
              }}
            >
              Tours
              <svg
                width="11"
                height="7"
                viewBox="0 0 11 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                style={{
                  transform: toursOpen ? "rotate(180deg)" : "none",
                  transition: "transform 200ms",
                }}
              >
                <path d="M1 1l4.5 4.5L10 1" />
              </svg>
            </button>
            {toursOpen && (
              <div style={{ background: "var(--sand)", borderBottom: "1px solid var(--border)" }}>
                {TOUR_GROUPS.map((g) => (
                  <div key={g.label}>
                    <div
                      style={{
                        padding: "10px 20px 4px",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: ".14em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {g.label}
                    </div>
                    {g.items.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setMobileOpen(false);
                          setToursOpen(false);
                          onNavigate?.(t.id);
                        }}
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "left",
                          padding: "12px 20px",
                          background: "transparent",
                          border: 0,
                          borderBottom: "1px solid var(--border)",
                          cursor: "pointer",
                          fontFamily: "var(--font-body)",
                          fontSize: 15,
                          fontWeight: 500,
                          color: "var(--navy)",
                        }}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {[
              {
                label: "FAQ",
                action: () => {
                  setMobileOpen(false);
                  document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
                },
              },
              {
                label: "About Us",
                action: () => {
                  setMobileOpen(false);
                  onNavigate?.("about");
                },
              },
              {
                label: "Gift Cards",
                action: () => {
                  setMobileOpen(false);
                  document.getElementById("gift")?.scrollIntoView({ behavior: "smooth" });
                },
              },
              {
                label: "Contact",
                action: () => {
                  setMobileOpen(false);
                  onNavigate?.("contact");
                },
              },
            ].map((l) => (
              <button
                key={l.label}
                onClick={l.action}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "14px 4px",
                  background: "transparent",
                  border: 0,
                  borderBottom: "1px solid var(--border)",
                  cursor: "pointer",
                  color: "var(--navy)",
                  fontFamily: "var(--font-body)",
                  fontSize: 17,
                  fontWeight: 500,
                }}
              >
                {l.label}
              </button>
            ))}
          </Container>
        </div>
      )}
      <style>{`
        @media (min-width: 1100px) { .nav-phone { display: inline-flex !important; } }
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-burger { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}

// ── Hero: Full Bleed ──────────────────────────────────────────────────────────
const HERO_SLIDES = [
  {
    kind: "sharktooth",
    position: "62% center",
    label: "Shark Tooth & Fossil Hunting",
    headline: (
      <>
        Find your
        <br />
        <em style={{ color: "var(--accent-2)", fontStyle: "normal" }}>Megalodon.</em>
      </>
    ),
    sub: "Private guided excursions to barrier island fossil beds. Real teeth — you keep every one.",
    cta: "Hunt for Fossils →",
  },
  {
    kind: "sunset",
    position: "center",
    label: "Sunset Tours",
    headline: (
      <>
        Golden hour
        <br />
        <em style={{ color: "var(--accent-2)", fontStyle: "normal" }}>on the harbor.</em>
      </>
    ),
    sub: "Watch the Ravenel Bridge light up as the sun drops behind the Lowcountry skyline.",
    cta: "Book a Sunset Cruise →",
  },
  {
    kind: "morrisdolphin",
    position: "center",
    label: "Dolphin Watching",
    headline: (
      <>
        Wild dolphins.
        <br />
        <em style={{ color: "var(--accent-2)", fontStyle: "normal" }}>Open water.</em>
      </>
    ),
    sub: "The passage to Morris Island is a dolphin highway. Sightings on every trip.",
    cta: "Meet the Dolphins →",
  },
  {
    kind: "bach1",
    position: "top center",
    label: "Bachelorette Party Tours",
    headline: (
      <>
        Your party.
        <br />
        <em style={{ color: "var(--accent-2)", fontStyle: "normal" }}>Our boat.</em>
      </>
    ),
    sub: "Charleston Harbor is your backdrop. Private charter, your group only — no strangers allowed.",
    cta: "Plan Your Party →",
  },
];

export function HeroFullBleed({
  onBook,
  onTours,
}: {
  onBook?: () => void;
  onTours?: () => void;
  heroKind?: string;
}) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx((i) => (i + 1) % HERO_SLIDES.length);
        setFading(false);
      }, 400);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const goTo = (i: number) => {
    if (i === idx) return;
    setFading(true);
    setTimeout(() => {
      setIdx(i);
      setFading(false);
    }, 400);
  };

  const slide = HERO_SLIDES[idx];

  return (
    <section
      id="home"
      style={{
        position: "relative",
        color: "#fff",
        overflow: "hidden",
        minHeight: "min(880px, 92vh)",
        display: "flex",
        alignItems: "flex-end",
        isolation: "isolate",
        background: "var(--navy)",
      }}
      className="hero-full-bleed"
    >
      {/* Slides — crossfade via opacity */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.kind}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === idx ? (fading ? 0 : 1) : 0,
            transition: "opacity 400ms ease",
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          <Placeholder
            kind={s.kind}
            width="100%"
            height="100%"
            position={(s as any).position || "center"}
            loading={i === 0 ? "eager" : "lazy"}
            style={{
              transform: i === idx ? "scale(1.01)" : "scale(1)",
              transition: "transform 5200ms linear",
            }}
          />
        </div>
      ))}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
          background:
            "radial-gradient(circle at 74% 22%, rgba(232,176,75,0.20) 0%, transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 32%)",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "linear-gradient(90deg, rgba(10,27,48,0.78) 0%, rgba(10,27,48,0.50) 42%, rgba(10,27,48,0.18) 100%), linear-gradient(180deg, rgba(10,27,48,0.18) 0%, rgba(10,27,48,0.10) 42%, rgba(10,27,48,0.78) 100%)",
        }}
      />

      <Container
        style={{
          position: "relative",
          zIndex: 3,
          paddingTop: 140,
          paddingBottom: 56,
          width: "100%",
        }}
        className="hero-container"
      >
        <div style={{ maxWidth: 820 }} className="hero-copy-panel">
          {/* Headline */}
          <h1
            style={{
              color: "#fff",
              marginTop: 0,
              maxWidth: 760,
              transition: "opacity 300ms",
              opacity: fading ? 0 : 1,
              textShadow: "0 10px 34px rgba(0,0,0,0.28)",
            }}
            className="hero-title"
          >
            {slide.headline}
          </h1>

          {/* Subhead */}
          <p
            className="lead hero-subhead"
            style={{
              color: "rgba(255,255,255,0.88)",
              marginTop: 22,
              maxWidth: 560,
              fontSize: 20,
              lineHeight: 1.55,
              transition: "opacity 300ms",
              opacity: fading ? 0 : 1,
            }}
          >
            {slide.sub}
          </p>

          {/* CTAs */}
          <div
            style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}
            className="hero-actions"
          >
            <Btn size="lg" onClick={onBook}>
              {slide.cta}
            </Btn>
            <Btn size="lg" variant="secondary" onDark onClick={onTours}>
              See All Tours
            </Btn>
          </div>

          {/* Slide dots */}
          <div
            style={{ display: "flex", gap: 8, marginTop: 56, alignItems: "center" }}
            className="hero-dots"
          >
            {HERO_SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === idx ? 28 : 8,
                  height: 8,
                  borderRadius: 99,
                  background: i === idx ? "var(--accent)" : "rgba(255,255,255,0.35)",
                  border: 0,
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 300ms ease",
                }}
              />
            ))}
          </div>
        </div>

        <div className="hero-proof-row">
          {[
            ["anchor", "Private", "available"],
            ["star", "5.0", "Google reviews"],
            ["star", "TripAdvisor", "Travelers' Choice '24"],
            ["compass", "Shem Creek", "departures"],
          ].map(([icon, k, v]) => (
            <div key={k} className="hero-proof-item">
              <Icon name={icon} size={18} color="var(--accent-2)" />
              <strong>{k}</strong>
              <span>{v}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            right: "clamp(20px, 5vw, 80px)",
            bottom: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            color: "rgba(255,255,255,0.65)",
          }}
          className="scroll-hint"
        >
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            Scroll
          </div>
          <Icon name="arrowDown" size={16} />
        </div>
      </Container>
      <style>{`
        .hero-proof-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1px;
          width: min(760px, 100%);
          margin-top: 46px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 18px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(14px);
        }
        .hero-proof-item { padding: 18px 20px; display: grid; grid-template-columns: auto 1fr; column-gap: 10px; row-gap: 3px; align-items: center; }
        .hero-proof-item svg { grid-row: span 2; }
          .hero-proof-item strong { color: #fff; font-family: var(--font-display); font-size: 18px; line-height: 1.08; }
          .hero-proof-item span { color: rgba(255,255,255,0.72); font-size: 12px; text-transform: uppercase; letter-spacing: .08em; line-height: 1.25; }
        @media (max-width: 900px) {
          .hero-full-bleed { min-height: 760px !important; align-items: stretch !important; }
          .hero-full-bleed > div:first-child img { object-position: inherit; }
          .hero-container { padding-top: 132px !important; padding-bottom: 18px !important; display: flex; flex-direction: column; justify-content: flex-end; }
          .hero-copy-panel { padding: 12px 0 0; max-width: 100% !important; }
          .hero-badge { max-width: 100%; overflow: hidden; text-overflow: ellipsis; font-size: 10px !important; letter-spacing: .06em !important; padding: 7px 10px !important; }
          .hero-title { font-size: clamp(34px, 10vw, 44px) !important; line-height: 1.02 !important; margin-top: 14px !important; max-width: 330px !important; }
          .hero-subhead { font-size: 16px !important; line-height: 1.5 !important; margin-top: 14px !important; max-width: 320px !important; }
          .hero-actions { display: grid !important; grid-template-columns: 1fr !important; gap: 10px !important; margin-top: 22px !important; max-width: 100%; }
          .hero-actions > * { width: 100%; min-height: 48px; justify-content: center; padding: 14px 18px !important; font-size: 15px !important; white-space: normal !important; text-align: center; }
          .hero-dots { margin-top: 22px !important; }
          .scroll-hint { display: none !important; }
          .hero-proof-row { grid-template-columns: repeat(4, minmax(0, 1fr)); width: 100%; margin-top: 22px; border-radius: 14px; }
          .hero-proof-item { padding: 12px 8px; min-width: 0; grid-template-columns: 1fr; justify-items: center; text-align: center; row-gap: 4px; }
          .hero-proof-item svg { grid-row: auto; }
          .hero-proof-item strong { font-size: 13px; }
          .hero-proof-item span { font-size: 8px; letter-spacing: .03em; }
        }
        @media (max-width: 360px) {
          .hero-full-bleed { min-height: 780px !important; }
          .hero-proof-row { grid-template-columns: 1fr; }
          .hero-actions { max-width: none; }
        }
      `}</style>
    </section>
  );
}

// ── Hero: Split ───────────────────────────────────────────────────────────────
export function HeroSplit({
  headline,
  subhead,
  onBook,
  heroKind = "dolphin",
}: {
  headline?: React.ReactNode;
  subhead?: string;
  onBook?: () => void;
  heroKind?: string;
}) {
  return (
    <section
      id="home"
      style={{ position: "relative", background: "var(--cream)", paddingTop: 110 }}
    >
      <Container>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr .9fr",
            gap: 48,
            alignItems: "center",
            paddingTop: 40,
            paddingBottom: 80,
          }}
          className="hero-split-grid"
        >
          <div>
            <Badge variant="sand">Charleston · Dolphin Tours · Private Charters</Badge>
            <h1 style={{ marginTop: 20 }}>
              {headline || (
                <>
                  Charleston,
                  <br />
                  from the <span style={{ color: "var(--accent)" }}>water.</span>
                </>
              )}
            </h1>
            <p className="lead" style={{ marginTop: 20, maxWidth: 540 }}>
              {subhead ||
                "Private boat tours, sunset cruises, and custom charters through the Lowcountry's salt marshes, harbor, and barrier islands."}
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
              <Btn size="lg" onClick={onBook}>
                Book a Charter →
              </Btn>
              <Btn size="lg" variant="secondary">
                See Tours
              </Btn>
            </div>
          </div>
          <div
            style={{
              borderRadius: 24,
              overflow: "hidden",
              aspectRatio: "4/5",
              boxShadow: "var(--shadow-lift)",
            }}
          >
            <Placeholder kind={heroKind} width="100%" height="100%" />
          </div>
        </div>
      </Container>
      <style>{`@media (max-width: 900px) { .hero-split-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ── Hero: Editorial ───────────────────────────────────────────────────────────
export function HeroEditorial({
  headline,
  subhead,
  onBook,
}: {
  headline?: React.ReactNode;
  subhead?: string;
  onBook?: () => void;
}) {
  return (
    <section
      id="home"
      style={{
        background: "var(--cream)",
        paddingTop: 140,
        paddingBottom: 80,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1100 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            <span style={{ width: 28, height: 2, background: "var(--accent)", borderRadius: 2 }} />
            Charleston, SC · Since 2012
          </div>
          <h1 style={{ marginTop: 24, fontSize: "clamp(56px, 10vw, 140px)", lineHeight: 0.92 }}>
            {headline || (
              <>
                Slow water.
                <br />
                <span
                  style={{
                    color: "var(--accent)",
                    fontStyle: "italic",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Big memories.
                </span>
              </>
            )}
          </h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 40,
              marginTop: 48,
              alignItems: "end",
            }}
            className="hero-ed-grid"
          >
            <p className="lead" style={{ fontSize: 22, maxWidth: 520 }}>
              {subhead ||
                "Charleston's waters are protected, wild, and right here. We'll take you out on them — just you, your people, and a captain who knows every creek."}
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
              <Btn size="lg" onClick={onBook}>
                Charter the Day →
              </Btn>
              <Btn size="lg" variant="ghost">
                Meet the Captains
              </Btn>
            </div>
          </div>
        </div>
      </Container>
      <div
        style={{
          position: "absolute",
          right: -60,
          top: 120,
          width: 480,
          height: 480,
          opacity: 0.08,
        }}
      >
        <Placeholder kind="dolphin" width="100%" height="100%" rounded={240} />
      </div>
      <style>{`@media (max-width: 900px) { .hero-ed-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
