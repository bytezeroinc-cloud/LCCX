/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useState, useEffect } from "react";
import { Btn, Container, Placeholder, SectionLabel } from "./Primitives";

const cdIcon = (name: string, color = "var(--accent)") => {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const paths: Record<string, React.ReactNode> = {
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    ship: (
      <>
        <path d="M3 14l9 6 9-6" />
        <path d="M5 11h14l-1-5H6z" />
        <path d="M12 2v4" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
    ),
    pin: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    camera: (
      <>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </>
    ),
    award: (
      <>
        <circle cx="12" cy="8" r="7" />
        <path d="M8.2 13.6L7 22l5-3 5 3-1.2-8.4" />
      </>
    ),
    fish: (
      <>
        <path d="M6.5 12c0-4 4-7 8-7 3 0 6 2 7 5-1-1-3-1-4 0 1 2 1 4 0 6-1-1-3-1-4 0-1-3-4-5-7-4zM6.5 12c-2 0-3 1-3 3m3-3c-2 0-3-1-3-3" />
      </>
    ),
    leaf: <path d="M11 20A7 7 0 0 1 4 13c0-6 5-10 16-10-1 9-5 17-11 17-3 0-4-2-4-4s2-4 4-4" />,
    users: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
  };
  return (
    <svg {...common} aria-hidden="true">
      {paths[name] || paths.award}
    </svg>
  );
};

const TRIPS: Record<string, any> = {
  fossil: {
    key: "fossil",
    tourId: "fossil",
    tabLabel: "Fossil Hunt",
    image: "fossil",
    caption: { title: "Take Home Real Megalodon", sub: "40-million-year-old finds" },
    label: "Shark Tooth & Fossil Hunting",
    headline: (
      <>
        Find teeth.{" "}
        <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Keep everything.</em>
      </>
    ),
    features: [
      { icon: "clock", title: "Tide-Timed Departures" },
      { icon: "award", title: "#1 Rated on Google" },
      { icon: "heart", title: "Kids Love It" },
      { icon: "pin", title: "Private Beach Stops" },
      { icon: "ship", title: "All Tools Included" },
      { icon: "shield", title: "Find-Something Promise" },
    ],
  },
  bachelorette: {
    key: "bachelorette",
    tourId: "bachelorette",
    tabLabel: "Bachelorette",
    image: "bach1",
    caption: { title: "Included With Every Cruise", sub: "Show up & celebrate" },
    label: "Bachelorette Party Tours",
    headline: (
      <>
        Celebrate. Dance. <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Shine.</em>
      </>
    ),
    features: [
      { icon: "ship", title: "Private Charter Boat" },
      { icon: "heart", title: "Bluetooth Sound System" },
      { icon: "sun", title: "Cooler Stocked with Ice" },
      { icon: "award", title: "BYOB Friendly (21+)" },
      { icon: "camera", title: "Iconic Photo Stops" },
      { icon: "users", title: "Up to 23 Guests" },
    ],
  },
  sunset: {
    key: "sunset",
    tourId: "sunset",
    tabLabel: "Sunset",
    image: "sunsetmarsh",
    caption: { title: "Most Romantic Cruise", sub: "Charleston Harbor at golden hour" },
    label: "Sunset Harbor Cruise",
    headline: (
      <>
        Golden hour. <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Open water.</em>
      </>
    ),
    features: [
      { icon: "sun", title: "Perfect Timing, Every Time" },
      { icon: "heart", title: "Champagne on Ice" },
      { icon: "pin", title: "Fort Sumter Route" },
      { icon: "camera", title: "Captain as Photographer" },
      { icon: "users", title: "Private Charter Only" },
      { icon: "ship", title: "Smooth Stable Ride" },
    ],
  },
  dolphin: {
    key: "dolphin",
    tourId: "dolphin",
    tabLabel: "Dolphin",
    image: "morrisdolphin",
    caption: { title: "98% Sighting Rate", sub: "Resident pods, every tour" },
    label: "Dolphin Watching Tour",
    headline: (
      <>
        Wild dolphins. <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Up close.</em>
      </>
    ),
    features: [
      { icon: "fish", title: "Resident Pods Daily" },
      { icon: "leaf", title: "Respectful Viewing" },
      { icon: "users", title: "Small Groups Only" },
      { icon: "sun", title: "Golden Hour Option" },
      { icon: "camera", title: "Photos Included" },
      { icon: "shield", title: "Sighting Guarantee" },
    ],
  },
};

export function CoastalDifference({
  trip = "fossil",
  showTabs = true,
  onBook,
  onKnowMore,
}: {
  trip?: string;
  showTabs?: boolean;
  onBook?: () => void;
  onKnowMore?: (tourId: string) => void;
}) {
  const [active, setActive] = useState(trip);
  useEffect(() => {
    setActive(trip);
  }, [trip]);
  const data = TRIPS[active] || TRIPS.fossil;

  return (
    <section
      id="difference"
      style={{ background: "var(--cream)", padding: "104px 0 116px", position: "relative" }}
      className="cd-section"
    >
      <Container>
        {showTabs && (
          <div
            className="cd-tabs-wrap"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 48,
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            <div
              className="cd-tabs"
              style={{
                display: "inline-flex",
                background: "#fff",
                padding: 4,
                borderRadius: 50,
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-calc)",
              }}
            >
              {Object.values(TRIPS).map((tr: any) => (
                <button
                  key={tr.key}
                  onClick={() => setActive(tr.key)}
                  style={{
                    padding: "9px 18px",
                    borderRadius: 50,
                    border: 0,
                    cursor: "pointer",
                    background: active === tr.key ? "var(--navy)" : "transparent",
                    color: active === tr.key ? "#fff" : "var(--body)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: 13,
                    letterSpacing: ".02em",
                    transition: "background 200ms, color 200ms",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tr.tabLabel}
                </button>
              ))}
            </div>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: ".95fr 1.25fr",
            gap: 72,
            alignItems: "center",
          }}
          className="cd-grid"
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                borderRadius: 18,
                overflow: "hidden",
                aspectRatio: "4/5",
                boxShadow:
                  "0 30px 60px -20px rgba(12,35,64,0.35), 0 16px 32px -12px rgba(12,35,64,0.22)",
              }}
              key={active}
            >
              <Placeholder kind={data.image} width="100%" height="100%" />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: -18,
                left: 20,
                right: 20,
                maxWidth: 280,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                background: "#fff",
                borderRadius: 16,
                padding: "14px 18px",
                boxShadow: "0 14px 30px -8px rgba(12,35,64,0.22)",
                border: "1px solid var(--border)",
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 50,
                  flexShrink: 0,
                  background: "var(--sand)",
                  color: "var(--accent)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {cdIcon("award")}
              </span>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    color: "var(--navy)",
                    fontSize: 15,
                    lineHeight: 1.1,
                  }}
                >
                  {data.caption.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--muted)",
                    fontSize: 12,
                    marginTop: 3,
                  }}
                >
                  {data.caption.sub}
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionLabel>{data.label}</SectionLabel>
            <h2 className="cd-title" style={{ marginTop: 16, maxWidth: 720 }}>{data.headline}</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
                marginTop: 40,
              }}
              className="cd-features"
            >
              {data.features.map((f: any, i: number) => (
                <div
                  key={`${active}-${i}`}
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    background: "rgba(255,255,255,0.62)",
                    border: "1px solid rgba(229,220,204,0.78)",
                    borderRadius: 14,
                    padding: 16,
                    animation: `cdFade 450ms var(--ease-out) ${i * 40}ms both`,
                  }}
                >
                  <span
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      flexShrink: 0,
                      background: "rgba(255,122,26,0.10)",
                      border: "1px solid rgba(255,122,26,0.22)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {cdIcon(f.icon)}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        color: "var(--navy)",
                        fontSize: 16,
                      }}
                    >
                      {f.title}
                    </div>
                    {f.body && (
                      <p
                        style={{
                          color: "var(--body)",
                          marginTop: 4,
                          fontSize: 14,
                          lineHeight: 1.55,
                        }}
                      >
                        {f.body}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 40,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {onBook && <Btn onClick={onBook}>Book the {data.tabLabel} Tour →</Btn>}
              {onKnowMore && (
                <button
                  onClick={() => onKnowMore(data.tourId)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    background: "transparent",
                    border: "1.5px solid var(--navy)",
                    borderRadius: 50,
                    padding: "10px 20px",
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "var(--navy)",
                    letterSpacing: ".01em",
                    transition: "background 180ms, color 180ms",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--navy)";
                    (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--navy)";
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Know More
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        @keyframes cdFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 900px) {
          .cd-section { padding: 58px 0 70px !important; }
          .cd-tabs-wrap { justify-content: flex-start !important; margin: 0 0 32px !important; overflow: visible; }
          .cd-tabs { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)); width: 100%; border-radius: 14px !important; padding: 4px !important; }
          .cd-tabs button { min-width: 0; padding: 10px 8px !important; font-size: 12px !important; overflow: hidden; text-overflow: ellipsis; }
          .cd-grid { grid-template-columns: 1fr !important; gap: 46px !important; }
          .cd-title { font-size: clamp(30px, 8.5vw, 38px) !important; line-height: 1.08 !important; max-width: 340px !important; }
          .cd-features { gap: 10px !important; margin-top: 26px !important; }
          .cd-features > div { padding: 13px !important; border-radius: 12px !important; gap: 11px !important; }
          .cd-features > div > span { width: 34px !important; height: 34px !important; }
        }
        @media (max-width: 520px) { .cd-features { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
