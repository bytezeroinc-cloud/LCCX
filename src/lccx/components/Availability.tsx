import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { Icon, Btn, Container, SectionLabel } from "./Primitives";

/* ── Tour definitions for this section ──────────────────────────────────────── */
const AVAIL_TOURS = [
  { id: "sunset",     label: "Sunset Cruise",      icon: "sun",    productCode: "PSYCE3", type: "shared", priceHint: "From $65/seat" },
  { id: "sharktooth", label: "Shark Tooth Hunt",   icon: "anchor", productCode: "PQGU8H", type: "shared", priceHint: "From $125/seat" },
  { id: "dolphin",    label: "Dolphin Charter",    icon: "compass",productCode: "PX8TNQ", type: "private",priceHint: "From $375/charter" },
  { id: "private",    label: "Private Charter",    icon: "users",  productCode: "PFLDUF", type: "private",priceHint: "From $375/charter" },
] as const;

type TourId = (typeof AVAIL_TOURS)[number]["id"];

/* ── Date helpers ────────────────────────────────────────────────────────────── */
const ISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

type RezdySession = {
  startTime: string;
  endTime?: string;
  seats?: number;
  seatsAvailable?: number;
  priceOptions?: { label?: string; price?: number }[];
};

function seatsLabel(s: RezdySession): { text: string; color: string; bg: string } {
  const n = s.seatsAvailable ?? 0;
  if (n <= 0) return { text: "Sold out", color: "#a23", bg: "rgba(162,0,50,0.12)" };
  if (n <= 4) return { text: `${n} left`, color: "var(--accent-hover, #e86200)", bg: "rgba(255,122,26,0.14)" };
  return { text: `${n} seats`, color: "#1E7A3E", bg: "rgba(52,168,83,0.14)" };
}

/* ── Component ───────────────────────────────────────────────────────────────── */
export function AvailabilitySection({ onBook }: { onBook?: () => void }) {
  const [selectedTour, setSelectedTour] = useState<TourId>("sunset");
  const [selectedDay, setSelectedDay] = useState(0);
  const [sessions, setSessions] = useState<RezdySession[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tour = AVAIL_TOURS.find((t) => t.id === selectedTour)!;

  // Build 7-day window from today
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      idx: i,
      iso: ISO(d),
      dow: d.toLocaleDateString("en-US", { weekday: "short" }),
      dom: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
    };
  });

  // Fetch 7-day availability whenever tour changes
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setSessions([]);
    setSelectedDay(0);
    const start = ISO(today);
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 8);
    const end = ISO(endDate);
    fetch(`/api/public/rezdy-availability?productCode=${encodeURIComponent(tour.productCode)}&start=${start}&end=${end}`)
      .then(async (r) => {
        const b = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(b?.error || `Error ${r.status}`);
        return (b.sessions || []) as RezdySession[];
      })
      .then((s) => { if (!cancelled) setSessions(s); })
      .catch((e) => { if (!cancelled) setError(String(e?.message || e)); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tour.productCode]);

  // Group sessions by ISO date
  const byDay = useMemo(() => {
    const m = new Map<string, RezdySession[]>();
    for (const s of sessions) {
      const day = (s.startTime || "").slice(0, 10);
      if (!day) continue;
      if (!m.has(day)) m.set(day, []);
      m.get(day)!.push(s);
    }
    return m;
  }, [sessions]);

  const daySessions = (byDay.get(days[selectedDay]?.iso || "") || [])
    .slice()
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const fmtTime = (iso: string) => {
    const d = new Date(iso.replace(" ", "T"));
    return isNaN(d.getTime()) ? iso : d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  const dayHasOpen = (iso: string) =>
    (byDay.get(iso) || []).some((s) => (s.seatsAvailable ?? 0) > 0);

  const stepBtn: React.CSSProperties = {
    width: 28, height: 28, borderRadius: 50, border: 0,
    background: "#fff", cursor: "pointer", display: "grid", placeItems: "center", color: "var(--navy)",
  };

  return (
    <section id="availability" style={{ background: "var(--sand)", padding: "100px 0" }} className="availability-section">
      <Container>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 36px" }}>
          <SectionLabel style={{ justifyContent: "center" }}>Check Availability</SectionLabel>
          <h2 className="availability-title" style={{ marginTop: 14 }}>
            When are <span style={{ color: "var(--accent)" }}>you coming?</span>
          </h2>
          <p className="lead availability-lead" style={{ marginTop: 14, color: "var(--body)", maxWidth: 560, margin: "14px auto 0" }}>
            Live availability from Rezdy. Pick your tour, pick your day, book in minutes.
          </p>
        </div>

        {/* Tour pill selector */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }} className="avail-pills">
          {AVAIL_TOURS.map((t) => {
            const active = t.id === selectedTour;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTour(t.id)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "10px 18px", borderRadius: 999, cursor: "pointer",
                  border: active ? "2px solid var(--navy)" : "1.5px solid var(--border)",
                  background: active ? "var(--navy)" : "#fff",
                  color: active ? "#fff" : "var(--navy)",
                  fontWeight: 700, fontSize: 14, transition: "all .15s",
                  boxShadow: active ? "0 4px 12px rgba(12,35,64,0.18)" : "none",
                }}
              >
                <Icon name={t.icon} size={15} color={active ? "#fff" : "var(--accent)"} />
                {t.label}
                <span style={{ fontSize: 11, opacity: 0.75, fontWeight: 500 }}>{t.priceHint}</span>
              </button>
            );
          })}
        </div>

        {/* Calendar card */}
        <div style={{ background: "#fff", borderRadius: 24, border: "1px solid var(--border)", overflow: "hidden", boxShadow: "var(--shadow-card)" }}>
          {/* Day picker */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid var(--border)" }} className="avail-days">
            {days.map((d) => {
              const open = dayHasOpen(d.iso);
              const active = d.idx === selectedDay;
              return (
                <button
                  key={d.idx}
                  onClick={() => setSelectedDay(d.idx)}
                  style={{
                    padding: "20px 8px", border: 0, cursor: "pointer", textAlign: "center",
                    background: active ? "var(--navy)" : "transparent",
                    color: active ? "#fff" : "var(--body)",
                    borderRight: d.idx < 6 ? "1px solid var(--border)" : "none",
                    transition: "background 200ms, color 200ms",
                    position: "relative",
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", opacity: 0.7 }}>
                    {d.idx === 0 ? "Today" : d.dow}
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, marginTop: 4 }}>{d.dom}</div>
                  <div style={{ fontSize: 11, opacity: 0.6, marginTop: 2 }}>{d.month}</div>
                  {/* Availability dot */}
                  {!loading && (
                    <div style={{
                      width: 6, height: 6, borderRadius: 50, margin: "6px auto 0",
                      background: open ? "#34A853" : "rgba(107,122,143,0.3)",
                    }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Slots */}
          <div style={{ padding: 32 }} className="availability-body">
            {/* Day header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--navy)" }}>
                {days[selectedDay].dow}, {days[selectedDay].month} {days[selectedDay].dom}
                {!loading && (
                  <span style={{ color: "var(--muted)", fontWeight: 500 }}>
                    {" "}·{" "}{daySessions.length} {daySessions.length === 1 ? "departure" : "departures"}
                  </span>
                )}
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: 50, background: "var(--accent)" }} />
                {tour.type === "shared" ? "Per-seat booking" : "Private charter"}
                {" · "}{tour.priceHint}
              </div>
            </div>

            {loading && (
              <div style={{ textAlign: "center", padding: "32px 0", color: "var(--muted)", fontSize: 15 }}>
                <Icon name="compass" size={20} color="var(--accent)" />
                <div style={{ marginTop: 8 }}>Checking live availability…</div>
              </div>
            )}

            {!loading && error && (
              <div style={{ padding: "16px 18px", borderRadius: 12, background: "#fdeaea", color: "#b00020", fontSize: 14 }}>
                {error} — <button onClick={onBook} style={{ background: "none", border: 0, color: "var(--accent)", fontWeight: 700, cursor: "pointer" }}>call (843) 508-1600</button>
              </div>
            )}

            {!loading && !error && daySessions.length === 0 && (
              <div style={{ textAlign: "center", padding: "24px 0", color: "var(--muted)" }}>
                No departures scheduled for this day.{" "}
                <button onClick={() => { const nextOpen = days.find((d, i) => i > selectedDay && dayHasOpen(d.iso)); if (nextOpen) setSelectedDay(nextOpen.idx); }} style={{ background: "none", border: 0, color: "var(--accent)", fontWeight: 700, cursor: "pointer" }}>
                  Jump to next available →
                </button>
              </div>
            )}

            {!loading && !error && daySessions.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                {daySessions.map((s, i) => {
                  const sold = (s.seatsAvailable ?? 0) <= 0;
                  const lbl = seatsLabel(s);
                  return (
                    <button
                      key={`${s.startTime}-${i}`}
                      disabled={sold}
                      onClick={onBook}
                      style={{
                        textAlign: "left", padding: "14px 16px", borderRadius: 12,
                        border: "1px solid var(--border)", background: sold ? "#F7F6F2" : "#fff",
                        cursor: sold ? "not-allowed" : "pointer", opacity: sold ? 0.55 : 1,
                        transition: "border-color 150ms, background 150ms", display: "flex", flexDirection: "column", gap: 6,
                      }}
                      onMouseEnter={(e) => { if (!sold) { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLButtonElement).style.background = "#FFFBF7"; } }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.background = sold ? "#F7F6F2" : "#fff"; }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--navy)" }}>
                          {fmtTime(s.startTime)}
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 50, background: lbl.bg, color: lbl.color, whiteSpace: "nowrap" }}>
                          {lbl.text}
                        </span>
                      </div>
                      <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{tour.label} · {tour.priceHint}</div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Footer */}
            <div style={{ marginTop: 24, padding: 16, borderRadius: 16, background: "var(--sand)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div style={{ fontSize: 14, color: "var(--body)" }}>
                <strong style={{ color: "var(--navy)" }}>Don't see your time?</strong>{" "}
                Private charters run year-round — we work around your schedule.
              </div>
              <Btn size="sm" variant="secondary" as="a" href="tel:+18435081600">
                <Icon name="phone" size={14} /> Call (843) 508-1600
              </Btn>
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 700px) {
          .availability-section { padding: 58px 0 !important; }
          .availability-title { font-size: clamp(28px, 8.5vw, 36px) !important; line-height: 1.08 !important; max-width: 330px; }
          .availability-lead { font-size: 16px !important; line-height: 1.5 !important; max-width: 330px; }
          .avail-pills { gap: 8px !important; }
          .avail-pills button { font-size: 12px !important; padding: 8px 12px !important; }
          .avail-days { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
          .avail-days > button { padding: 14px 4px !important; }
          .avail-days > button:nth-child(4) { border-right: none !important; }
          .avail-days > button:nth-child(n+5) { border-top: 1px solid var(--border); }
          .availability-body { padding: 18px !important; }
        }
      `}</style>
    </section>
  );
}
