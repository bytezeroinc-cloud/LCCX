// Reusable "tourist-info" sections shared across every tour page:
// quick-facts bar, photo gallery, departure-times table, live weather +
// what-to-bring, and map & directions. Content is passed via props so each
// tour supplies its own facts/images/schedule; the dock + weather are shared
// (all tours leave from the same Charleston / Shem Creek dock).
import { useEffect, useState } from "react";
import { Icon, Btn, Container, SectionLabel } from "./Primitives";

/* ── Shared operator facts (single source of truth) ────────────────────────── */
export const LCCX = {
  phone: "(843) 508-1600",
  tel: "+18435081600",
  dock: {
    name: "Shem Creek",
    address: "Shem Creek, Mt. Pleasant, SC 29464",
    locality: "Mt. Pleasant, SC 29464",
    mapQ: "Shem Creek, Mt Pleasant, SC",
    lat: 32.8067,
    lon: -79.8602,
  },
  // Charleston Harbor (weather)
  lat: 32.79,
  lon: -79.93,
};
// Real, keyless OpenStreetMap embed centred on the dock with a marker pin.
const MAP_EMBED = (() => {
  const { lat, lon } = LCCX.dock;
  const dLat = 0.012, dLon = 0.02;
  const bbox = `${(lon - dLon).toFixed(5)},${(lat - dLat).toFixed(5)},${(lon + dLon).toFixed(5)},${(lat + dLat).toFixed(5)}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
})();
const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(LCCX.dock.mapQ)}`;
const MAP_VIEW = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LCCX.dock.mapQ)}`;

/* ── Quick-facts bar (navy strip) ──────────────────────────────────────────── */
export type QuickFact = { icon: string; k: string; v: string };
export function QuickFactsBar({ items }: { items: QuickFact[] }) {
  return (
    <section style={{ background: "var(--navy)" }}>
      <Container>
        <div className="ts-quickbar">
          {items.map((q) => (
            <div key={q.k} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={quickIcon}>
                <Icon name={q.icon} size={18} color="var(--accent-2)" />
              </span>
              <div>
                <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", fontWeight: 700 }}>
                  {q.k}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "#fff" }}>
                  {q.v}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <style>{tsStyles}</style>
    </section>
  );
}

/* ── Photo gallery ─────────────────────────────────────────────────────────── */
export type GalleryImage = { src: string; alt: string; span?: 1 | 2 };
export function PhotoGallery({
  kicker = "Gallery",
  title,
  images,
  bg = "#fff",
}: {
  kicker?: string;
  title: string;
  images: GalleryImage[];
  bg?: string;
}) {
  return (
    <section style={{ background: bg, padding: "84px 0" }}>
      <Container>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 40px" }}>
          <SectionLabel style={{ justifyContent: "center", marginBottom: 14 }}>{kicker}</SectionLabel>
          <h2>{title}</h2>
        </div>
        <div className="ts-gallery">
          {images.map((g, i) => (
            <div key={i} className={g.span === 2 ? "ts-gal-wide" : ""} style={galItem}>
              <img src={g.src} alt={g.alt} loading="lazy" decoding="async" style={galImg} />
            </div>
          ))}
        </div>
      </Container>
      <style>{tsStyles}</style>
    </section>
  );
}

/* ── Departure times table ─────────────────────────────────────────────────── */
export type ScheduleRow = { season: string; sunset?: string; depart: string };
export function DepartureTimes({
  kicker = "Departure Times",
  title,
  intro,
  col2 = "Sunset",
  col3 = "We depart",
  rows,
  note,
  onBook,
  bg = "var(--cream)",
}: {
  kicker?: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  col2?: string;
  col3?: string;
  rows: ScheduleRow[];
  note?: string;
  onBook?: () => void;
  bg?: string;
}) {
  return (
    <section style={{ background: bg, padding: "100px 0" }}>
      <Container>
        <div className="ts-split">
          <div>
            <SectionLabel align="left">{kicker}</SectionLabel>
            <h2 style={{ marginTop: 16, marginBottom: 16 }}>{title}</h2>
            <p style={{ color: "var(--body)", lineHeight: 1.7, fontSize: 16, marginBottom: 24, maxWidth: 460 }}>{intro}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {onBook && <Btn onClick={onBook}>See live times &amp; book →</Btn>}
              <Btn variant="secondary" onClick={() => (window.location.href = `tel:${LCCX.tel}`)}>
                <Icon name="phone" size={16} /> {LCCX.phone}
              </Btn>
            </div>
          </div>
          <div style={schedTable}>
            <div style={{ ...schedRow, borderBottom: "2px solid var(--border)", fontWeight: 800 }}>
              <span style={{ color: "var(--navy)" }}>Season</span>
              <span style={{ color: "var(--navy)" }}>{col2}</span>
              <span style={{ color: "var(--navy)", textAlign: "right" }}>{col3}</span>
            </div>
            {rows.map((s) => (
              <div key={s.season} style={schedRow}>
                <span style={{ color: "var(--navy)", fontWeight: 700 }}>{s.season}</span>
                <span style={{ color: "var(--body)" }}>{s.sunset ?? "—"}</span>
                <span style={{ color: "var(--accent)", fontWeight: 800, textAlign: "right" }}>{s.depart}</span>
              </div>
            ))}
            {note && (
              <p style={{ fontSize: 12.5, color: "var(--muted)", margin: "16px 4px 0", lineHeight: 1.6 }}>{note}</p>
            )}
          </div>
        </div>
      </Container>
      <style>{tsStyles}</style>
    </section>
  );
}

/* ── Live weather (Open-Meteo, no key) + what-to-bring ─────────────────────── */
function wxLabel(code?: number): { emoji: string; text: string } {
  if (code == null) return { emoji: "🌤️", text: "Charleston Harbor" };
  if (code === 0) return { emoji: "☀️", text: "Clear skies" };
  if (code <= 2) return { emoji: "🌤️", text: "Mostly clear" };
  if (code === 3) return { emoji: "☁️", text: "Overcast" };
  if (code <= 48) return { emoji: "🌫️", text: "Fog" };
  if (code <= 67) return { emoji: "🌦️", text: "Light rain" };
  if (code <= 77) return { emoji: "🌨️", text: "Wintry mix" };
  if (code <= 82) return { emoji: "🌧️", text: "Showers" };
  if (code <= 99) return { emoji: "⛈️", text: "Storms" };
  return { emoji: "🌤️", text: "Charleston Harbor" };
}

export function LiveWeatherCard({ blurb }: { blurb?: string }) {
  const [wx, setWx] = useState<{ temperature_2m?: number; weather_code?: number; wind_speed_10m?: number } | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LCCX.lat}&longitude=${LCCX.lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FNew_York`,
    )
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setWx(d?.current ?? null); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);
  const w = wxLabel(wx?.weather_code);
  return (
    <div style={wxCard}>
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>
        On the water right now
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10 }}>
        <span style={{ fontSize: 44, lineHeight: 1 }}>{w.emoji}</span>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 34, color: "var(--navy)", lineHeight: 1 }}>
            {wx?.temperature_2m != null ? `${Math.round(wx.temperature_2m)}°F` : "—"}
          </div>
          <div style={{ fontSize: 14, color: "var(--body)" }}>
            {w.text}{wx?.wind_speed_10m != null ? ` · wind ${Math.round(wx.wind_speed_10m)} mph` : ""}
          </div>
        </div>
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", margin: "12px 0 0", lineHeight: 1.6 }}>
        {blurb ??
          "Live Charleston Harbor conditions. We sail rain or shine and only cancel for unsafe weather — full refund or free reschedule."}
      </p>
    </div>
  );
}

export function WeatherBring({
  kicker = "Weather & What to Bring",
  title = "Come prepared, leave glowing.",
  bringTitle = "Pack this for the trip",
  bring,
  blurb,
  bg = "#fff",
}: {
  kicker?: string;
  title?: string;
  bringTitle?: string;
  bring: string[];
  blurb?: string;
  bg?: string;
}) {
  return (
    <section style={{ background: bg, padding: "100px 0" }}>
      <Container>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 40px" }}>
          <SectionLabel style={{ justifyContent: "center", marginBottom: 14 }}>{kicker}</SectionLabel>
          <h2>{title}</h2>
        </div>
        <div className="ts-weather-grid">
          <LiveWeatherCard blurb={blurb} />
          <div style={{ background: "var(--sand)", borderRadius: "var(--r-card-lg)", padding: "28px 30px" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--navy)", marginBottom: 16 }}>
              {bringTitle}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {bring.map((b) => (
                <div key={b} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <Icon name="check" size={18} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 15, color: "var(--body)", lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <style>{tsStyles}</style>
    </section>
  );
}

/* ── Map & directions (shared dock) ────────────────────────────────────────── */
export function MapDirections({
  kicker = "Where to Find Us",
  intro,
  arriveNote = "Please get to the dock 15 minutes before departure.",
  bg = "#fff",
}: {
  kicker?: string;
  intro?: React.ReactNode;
  arriveNote?: string;
  bg?: string;
}) {
  const rows = [
    { icon: "pin", k: "Address", v: LCCX.dock.address },
    { icon: "anchor", k: "Getting here", v: "14 min from downtown Charleston across the Ravenel Bridge. Free public parking nearby at Shem Creek." },
    { icon: "clock", k: "Arrive early", v: arriveNote },
    { icon: "phone", k: "Questions?", v: LCCX.phone },
  ];
  return (
    <section style={{ background: bg, padding: "100px 0" }}>
      <Container>
        <div className="ts-map-grid">
          <div>
            <SectionLabel align="left">{kicker}</SectionLabel>
            <h2 style={{ marginTop: 16, marginBottom: 16 }}>
              Board at <span style={{ color: "var(--accent)" }}>{LCCX.dock.name}.</span>
            </h2>
            <p style={{ color: "var(--body)", lineHeight: 1.7, fontSize: 16, marginBottom: 22 }}>
              {intro ??
                `We cast off from ${LCCX.dock.name} in Mt. Pleasant — about a 14-minute drive across the Ravenel Bridge from downtown Charleston.`}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 26 }}>
              {rows.map((d) => (
                <div key={d.k} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={mapIcon}>
                    <Icon name={d.icon} size={18} color="var(--accent)" />
                  </span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--muted)" }}>{d.k}</div>
                    <div style={{ fontSize: 15.5, color: "var(--navy)", fontWeight: 600, lineHeight: 1.5 }}>{d.v}</div>
                  </div>
                </div>
              ))}
            </div>
            <Btn as="a" href={MAP_DIRECTIONS} target="_blank" rel="noopener noreferrer">
              <Icon name="compass" size={16} /> Get directions →
            </Btn>
          </div>
          <div style={mapFrame}>
            <iframe
              title={`Map of ${LCCX.dock.name}, Mt. Pleasant, SC`}
              src={MAP_EMBED}
              style={{ position: "absolute", inset: 0, border: 0, width: "100%", height: "100%" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Location strip — names where we are + opens Google Maps */}
            <a href={MAP_VIEW} target="_blank" rel="noopener noreferrer" style={mapStrip}>
              <Icon name="pin" size={16} color="var(--accent)" style={{ flexShrink: 0 }} />
              <span style={{ flex: 1, minWidth: 0, color: "var(--muted)" }}>
                <strong style={{ color: "var(--navy)" }}>{LCCX.dock.name}</strong> · {LCCX.dock.locality}
              </span>
              <span style={{ color: "var(--accent)", fontWeight: 800, whiteSpace: "nowrap" }}>View on Google Maps →</span>
            </a>
          </div>
        </div>
      </Container>
      <style>{tsStyles}</style>
    </section>
  );
}

/* ── shared styles ─────────────────────────────────────────────────────────── */
const quickIcon: React.CSSProperties = { width: 38, height: 38, borderRadius: 10, background: "rgba(232,176,75,0.14)", border: "1px solid rgba(232,176,75,0.3)", display: "grid", placeItems: "center", flexShrink: 0 };
const mapIcon: React.CSSProperties = { width: 40, height: 40, borderRadius: 10, background: "rgba(255,122,26,0.10)", border: "1px solid rgba(255,122,26,0.18)", display: "grid", placeItems: "center", flexShrink: 0 };
const galItem: React.CSSProperties = { borderRadius: 16, overflow: "hidden", background: "var(--sand)" };
const galImg: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover", display: "block" };
const schedTable: React.CSSProperties = { background: "#fff", borderRadius: "var(--r-card-lg)", padding: "26px 28px", boxShadow: "var(--shadow-card)" };
const schedRow: React.CSSProperties = { display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 12, padding: "14px 0", borderBottom: "1px solid var(--border)", alignItems: "center", fontSize: 15 };
const wxCard: React.CSSProperties = { background: "linear-gradient(135deg, #fff 0%, var(--sand) 100%)", borderRadius: "var(--r-card-lg)", padding: "28px 30px", border: "1px solid var(--border)" };
const mapFrame: React.CSSProperties = { position: "relative", borderRadius: "var(--r-card-lg)", overflow: "hidden", border: "1px solid var(--border)", minHeight: 380, boxShadow: "var(--shadow-card)", background: "#e8edf1" };
const mapStrip: React.CSSProperties = { position: "absolute", left: 12, right: 12, bottom: 12, display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, background: "rgba(255,255,255,0.96)", boxShadow: "0 6px 20px rgba(0,0,0,0.18)", textDecoration: "none", fontSize: 13 };

const tsStyles = `
  .ts-quickbar { display: grid; grid-template-columns: repeat(6, 1fr); gap: 24px; padding: 22px 0; align-items: center; }
  .ts-split { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
  .ts-gallery { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 200px; gap: 14px; }
  .ts-gal-wide { grid-column: span 2; }
  .ts-weather-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: stretch; }
  .ts-map-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
  @media (max-width: 1000px) { .ts-quickbar { grid-template-columns: repeat(3, 1fr); gap: 18px 24px; } }
  @media (max-width: 900px) {
    .ts-split { grid-template-columns: 1fr !important; gap: 40px !important; }
    .ts-weather-grid { grid-template-columns: 1fr !important; }
    .ts-map-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    .ts-gallery { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 160px; }
  }
  @media (max-width: 560px) { .ts-quickbar { grid-template-columns: repeat(2, 1fr); } }

  .tc-card { display: grid; grid-template-columns: 0.92fr 1.08fr; min-height: 340px; background: #fff; border-radius: var(--r-card-lg); overflow: hidden; box-shadow: var(--shadow-card); }
  .tc-card-img { position: relative; min-height: 240px; }
  .tc-card-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .tc-card-body { padding: 36px 38px; display: flex; flex-direction: column; gap: 18px; justify-content: center; }
  @media (max-width: 760px) {
    .tc-card { grid-template-columns: 1fr; }
    .tc-card-img { min-height: 200px; }
    .tc-card-body { padding: 26px 24px; }
  }
`;

/* ── Testimonials carousel ──────────────────────────────────────────────────── */
export type Testimonial = {
  quote: string;
  name: string;
  location?: string;
  source: "google" | "instagram";
  image?: string;
};

const TC_AVATAR_COLORS = ["#0C2340", "#E8B04B", "#FF7A1A", "#1E7A3E", "#7A4FBF", "#C2185B"];
function tcInitials(name: string) {
  return name.split(/\s+/).map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}
function tcColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return TC_AVATAR_COLORS[h % TC_AVATAR_COLORS.length];
}

// Official Google "G" (4-colour) — real logo for credibility.
function GoogleLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}
function InstagramLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
      <defs>
        <linearGradient id="tc-ig" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#FEDA75" />
          <stop offset="0.25" stopColor="#FA7E1E" />
          <stop offset="0.5" stopColor="#D62976" />
          <stop offset="0.75" stopColor="#962FBF" />
          <stop offset="1" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#tc-ig)" />
      <circle cx="12" cy="12" r="4.6" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="17.6" cy="6.4" r="1.3" fill="#fff" />
    </svg>
  );
}

export function TestimonialsCarousel({
  kicker = "Reviews",
  heading,
  ratingLabel = "5.0 · Google & Instagram",
  testimonials,
  sectionBg = "var(--navy)",
}: {
  kicker?: string;
  heading: React.ReactNode;
  ratingLabel?: string;
  testimonials: Testimonial[];
  sectionBg?: string;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  useEffect(() => {
    if (paused || n <= 1) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 6000);
    return () => clearInterval(t);
  }, [paused, n]);
  const go = (d: number) => setI((x) => (x + d + n) % n);

  return (
    <section style={{ background: sectionBg, padding: "100px 0" }}>
      <Container>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 36px" }}>
          <SectionLabel style={{ justifyContent: "center", marginBottom: 14 }} color="var(--accent-2)">{kicker}</SectionLabel>
          <h2 style={{ color: "#fff" }}>{heading}</h2>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 14 }}>
            {[0, 1, 2, 3, 4].map((s) => (
              <Icon key={s} name="star" size={18} color="var(--accent-2)" style={{ fill: "var(--accent-2)" }} />
            ))}
            <span style={{ color: "#fff", fontWeight: 800, fontFamily: "var(--font-display)", fontSize: 15, marginLeft: 4 }}>{ratingLabel}</span>
          </div>
        </div>

        <div
          style={{ position: "relative", maxWidth: 920, margin: "0 auto" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div style={{ overflow: "hidden", borderRadius: "var(--r-card-lg)" }}>
            <div style={{ display: "flex", transition: "transform 0.5s ease", transform: `translateX(-${i * 100}%)` }}>
              {testimonials.map((t, idx) => (
                <div key={idx} style={{ flex: "0 0 100%" }}>
                  <figure className="tc-card" style={{ margin: 0 }}>
                    {t.image && (
                      <div className="tc-card-img">
                        <img src={t.image} alt={`Charleston sunset cruise review — ${t.name}`} loading="lazy" decoding="async" />
                      </div>
                    )}
                    <div className="tc-card-body">
                      <div style={{ display: "flex", gap: 3 }}>
                        {[0, 1, 2, 3, 4].map((s) => (
                          <Icon key={s} name="star" size={15} color="var(--accent-2)" style={{ fill: "var(--accent-2)" }} />
                        ))}
                      </div>
                      <blockquote style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: "var(--navy)", fontWeight: 500 }}>
                        "{t.quote}"
                      </blockquote>
                      <figcaption style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 2 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <span style={{ width: 46, height: 46, borderRadius: "50%", background: tcColor(t.name), color: "#fff", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
                            {tcInitials(t.name)}
                          </span>
                          <span>
                            <span style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--navy)", fontSize: 15 }}>{t.name}</span>
                            {t.location && <span style={{ display: "block", fontSize: 13, color: "var(--muted)" }}>{t.location}</span>}
                          </span>
                        </span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, flexShrink: 0 }} title={t.source === "google" ? "Posted on Google" : "Shared on Instagram"}>
                          {t.source === "google" ? <GoogleLogo size={20} /> : <InstagramLogo size={20} />}
                          <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700 }}>{t.source === "google" ? "Google" : "Instagram"}</span>
                        </span>
                      </figcaption>
                    </div>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          {n > 1 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 24 }}>
              <button aria-label="Previous review" onClick={() => go(-1)} style={tcArrow}>‹</button>
              <div style={{ display: "flex", gap: 8 }}>
                {testimonials.map((_, d) => (
                  <button
                    key={d}
                    aria-label={`Go to review ${d + 1}`}
                    onClick={() => setI(d)}
                    style={{ width: d === i ? 26 : 9, height: 9, borderRadius: 999, border: 0, cursor: "pointer", background: d === i ? "var(--accent-2)" : "rgba(255,255,255,0.3)", transition: "all .2s", padding: 0 }}
                  />
                ))}
              </div>
              <button aria-label="Next review" onClick={() => go(1)} style={tcArrow}>›</button>
            </div>
          )}
        </div>
      </Container>
      <style>{tsStyles}</style>
    </section>
  );
}

const tcArrow: React.CSSProperties = { width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 24, cursor: "pointer", display: "grid", placeItems: "center", lineHeight: 1 };
