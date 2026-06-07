import { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { bookingModesForTour, type RezdyProduct, type AddOn } from "../../lib/rezdy-products";
import { analyzePricing, quoteForParty } from "../../lib/rezdy-pricing";

const PUBLISHABLE_KEY = import.meta.env.VITE_REZDY_STRIPE_PK as string | undefined;
const stripePromise = PUBLISHABLE_KEY ? loadStripe(PUBLISHABLE_KEY) : null;
const CARD_SURCHARGE_PCT = 3; // RezdyPay 3% card surcharge
// Terms & per-passenger liability waiver. TERMS_URL renders on-site; WAIVER_URL
// is the e-sign (Smartwaiver) link emailed after booking + available at the dock.
const TERMS_URL = "/terms";
const WAIVER_URL = "/terms"; // TODO: replace with the live Smartwaiver sign link

type Session = {
  startTime: string;
  endTime?: string;
  seats?: number;
  seatsAvailable?: number;
  priceOptions: { label?: string; price?: number }[];
};

// Booking closes 30 minutes before departure — no last-second walk-ins.
const CUTOFF_MINUTES = 30;
const minsUntil = (iso: string) => (parseLocal(iso).getTime() - Date.now()) / 60_000;
const sessionBookable = (s: Session) => !isMultiDay(s) && minsUntil(s.startTime) <= 0
  ? false
  : !isMultiDay(s) && minsUntil(s.startTime) < CUTOFF_MINUTES
    ? false
    : true;

// Weather protection offered at checkout on every shared per-person tour.
// optionLabel MUST exactly match the Rezdy-configured extra name, or Rezdy
// silently drops it (verified against the live product: "Optional Weather
// Protection Policy", $45 FIXED).
const WEATHER_PROTECTION: AddOn = {
  label: "Weather Protection Policy",
  price: 45,
  optionLabel: "Optional Weather Protection Policy",
};

/* ---------- date helpers (all local) ---------- */
const ISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const todayIso = () => ISO(new Date());
const parseLocal = (iso: string) =>
  new Date(iso.length <= 10 ? `${iso}T00:00:00` : iso.replace(" ", "T"));
const money = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
const fmtTime = (iso: string) => {
  const d = parseLocal(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
};
const fmtDateShort = (iso: string) =>
  parseLocal(iso).toLocaleDateString([], { month: "short", day: "numeric" });
// A session is multi-day when its end falls on a later calendar day than its start.
const isMultiDay = (s: { startTime: string; endTime?: string }) =>
  !!s.endTime && s.startTime.slice(0, 10) !== s.endTime.slice(0, 10);
// Human label for when a session runs: a time for day-tours, a date range for camps.
const fmtWhen = (s: { startTime: string; endTime?: string }) =>
  isMultiDay(s) ? `${fmtDateShort(s.startTime)} – ${fmtDateShort(s.endTime!)}` : fmtTime(s.startTime);
type ModeKey = "shared" | "private";
type ModeOption = { key: ModeKey; label: string; sub: string; products: RezdyProduct[] };

export function BookingFlow({
  tourId,
  heading = "When would you like to join us?",
  only,
  emptyNote,
}: {
  tourId: string;
  heading?: string;
  // Restrict which booking modes show (e.g. only={["shared"]} on the sunset page,
  // which pushes per-person seats and sends private to its own page).
  only?: ("shared" | "private")[];
  // Shown when the loaded month has no scheduled departures for the product —
  // keeps the section from looking broken before availability is published.
  emptyNote?: React.ReactNode;
}) {
  const modes = useMemo(() => bookingModesForTour(tourId), [tourId]);
  const available = useMemo<ModeOption[]>(() => {
    const allow = (k: ModeKey) => !only || only.includes(k);
    const a: ModeOption[] = [];
    if (allow("shared") && modes.shared?.length)
      a.push({ key: "shared", label: "Join a shared trip", sub: "Per person · share the boat", products: modes.shared });
    if (allow("private") && modes.private?.length)
      a.push({ key: "private", label: "Book a private charter", sub: "Whole boat · just your group", products: modes.private });
    return a;
  }, [modes, only]);

  // Allow the URL to pre-select a mode: /sunset?mode=private or /sunset?mode=shared
  const [mode, setMode] = useState<ModeKey>(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search).get("mode") as ModeKey | null;
      if (p && available.some((m) => m.key === p)) return p;
    }
    return available[0]?.key ?? "private";
  });
  // If a URL mode param was present, skip the auto-availability probe — the user
  // arrived via a direct link (e.g. "Book Private Charter") and the mode is intentional.
  const [autoPicked, setAutoPicked] = useState(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search).get("mode");
      return !!p && available.some((m) => m.key === p);
    }
    return false;
  });
  const current = available.find((m) => m.key === mode) ?? available[0];

  // Default to the first mode that actually has upcoming availability, so a tour
  // whose shared product isn't scheduled yet doesn't open on an empty Shared tab.
  useEffect(() => {
    if (autoPicked || available.length < 2) return;
    let cancelled = false;
    (async () => {
      const now = new Date();
      const start = ISO(new Date(now.getFullYear(), now.getMonth(), 1));
      const end = ISO(new Date(now.getFullYear(), now.getMonth() + 2, 1));
      for (const m of available) {
        const code = m.products[0]?.code;
        if (!code) continue;
        try {
          const r = await fetch(
            `/api/public/rezdy-availability?productCode=${encodeURIComponent(code)}&start=${start}&end=${end}`,
          );
          const b = await r.json().catch(() => ({}));
          if ((b.sessions || []).some((s: Session) => (s.seatsAvailable ?? 0) > 0)) {
            if (!cancelled) {
              setMode(m.key);
              setAutoPicked(true);
            }
            return;
          }
        } catch {
          /* ignore probe errors — fall through to next mode */
        }
      }
      if (!cancelled) setAutoPicked(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [available, autoPicked]);

  return (
    <section style={wrap} aria-label="Book this tour">
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <p style={kicker}>
          <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
            📅 Check availability
          </span>
        </p>
        <h2 style={h2}>{heading}</h2>
        {!current ? (
          <p style={{ textAlign: "center", color: "var(--muted)" }}>
            This tour books by request — call (843) 508-1600.
          </p>
        ) : (
          <>
            {available.length > 1 && (
              <div style={modeToggleWrap} role="tablist" aria-label="How would you like to book?">
                {available.map((m) => (
                  <button
                    key={m.key}
                    role="tab"
                    aria-selected={m.key === mode}
                    onClick={() => {
                      setMode(m.key);
                      setAutoPicked(true);
                    }}
                    style={modeBtn(m.key === mode)}
                  >
                    <span style={{ fontWeight: 800, fontSize: 15 }}>{m.label}</span>
                    <span style={{ fontSize: 12, opacity: 0.85 }}>{m.sub}</span>
                  </button>
                ))}
              </div>
            )}
            {stripePromise ? (
              <Elements stripe={stripePromise}>
                <Flow key={mode} products={current.products} addOns={mode === "private" ? modes.addOns : undefined} emptyNote={emptyNote} />
              </Elements>
            ) : (
              <Flow key={mode} products={current.products} addOns={mode === "private" ? modes.addOns : undefined} emptyNote={emptyNote} />
            )}
          </>
        )}
      </div>
    </section>
  );
}

function Flow({ products, addOns, emptyNote }: { products: RezdyProduct[]; addOns?: AddOn[]; emptyNote?: React.ReactNode }) {
  const [product, setProduct] = useState<RezdyProduct>(products[0]);
  const [addOnSel, setAddOnSel] = useState<Record<string, boolean>>({});
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });
  const [date, setDate] = useState<string>(todayIso());
  const [monthSessions, setMonthSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [party, setParty] = useState(0);
  const [stage, setStage] = useState<"select" | "checkout" | "done">("select");

  // Fetch a whole month of availability for the selected product.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setSession(null);
    const start = ISO(new Date(cursor.y, cursor.m, 1));
    const end = ISO(new Date(cursor.y, cursor.m + 1, 1));
    fetch(
      `/api/public/rezdy-availability?productCode=${encodeURIComponent(product.code)}&start=${start}&end=${end}`,
    )
      .then(async (r) => {
        const b = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(b?.error || `Request failed (${r.status})`);
        return b as { sessions: Session[] };
      })
      .then((d) => !cancelled && setMonthSessions(d.sessions || []))
      .catch((e) => !cancelled && setError(String(e?.message || e)))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [product, cursor]);

  // Map day → sessions for quick lookup.
  const byDay = useMemo(() => {
    const m = new Map<string, Session[]>();
    for (const s of monthSessions) {
      const day = (s.startTime || "").slice(0, 10);
      if (!day) continue;
      (m.get(day) ?? m.set(day, []).get(day)!).push(s);
    }
    return m;
  }, [monthSessions]);

  const dayHasOpen = (iso: string) =>
    (byDay.get(iso) ?? []).some((s) => (s.seatsAvailable ?? 0) > 0 && sessionBookable(s));

  // NOTE: the calendar always opens on the current month with today selected.
  // We deliberately do NOT auto-jump the date or month — the user picks a
  // highlighted (green/yellow) day themselves. Availability dots show where.

  const daySessions = (byDay.get(date) ?? []).slice().sort((a, b) => a.startTime.localeCompare(b.startTime));

  const pricing = session ? analyzePricing(session.priceOptions) : null;
  // No quote when party = 0 — show "add guests to see price" instead of $0
  const quote = session && party > 0 ? quoteForParty(session.priceOptions, party) : null;
  const selectedAddOns = (addOns ?? []).filter((a) => addOnSel[a.label]);
  const addOnTotal = selectedAddOns.reduce((s, a) => s + a.price, 0);

  // Two booking models, presented the way the operator sells them:
  //  - PRIVATE charter (tiered) = whole boat, flat price by group band, NO per-head charge.
  //  - SHARED tour (per-person) = buy individual seats, price per guest.
  const mode: "private" | "shared" | null =
    pricing?.model === "tiered" ? "private" : pricing?.model === "per-person" ? "shared" : null;
  const perPerson = quote && party > 0 ? quote.total / party : null;
  // Camp-like = a tiered/group product whose sessions span multiple days. We
  // swap the "whole boat" charter language for neutral flat-group-rate wording.
  const campLike = useMemo(() => monthSessions.some(isMultiDay), [monthSessions]);
  const groupNoun = campLike ? "your group" : "the whole boat";
  const fromInfo = useMemo(() => {
    for (const s of monthSessions) {
      const p = analyzePricing(s.priceOptions);
      if (p.model === "tiered" && p.tiers.length) {
        // Cheapest band = the true entry price (avoids grabbing a bigger-boat
        // band like "Roamer IV 1-12 = $900" that overlaps the small-boat ladder).
        const cheap = p.tiers.reduce((b, t) => (t.price < b.price ? t : b));
        return {
          mode: "private" as const,
          big: money(cheap.price),
          unit: `${isMultiDay(s) ? "for your group" : "the whole boat"} (up to ${cheap.max} guests)`,
        };
      }
      if (p.model === "per-person")
        return { mode: "shared" as const, big: money(p.perGuest), unit: "per person" };
    }
    return null;
  }, [monthSessions]);

  // Clamp party to product limits when session chosen — but never force 0 → 1.
  useEffect(() => {
    if (pricing) setParty((p) => p === 0 ? 0 : Math.max(pricing.min, Math.min(pricing.max, p)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (stage === "done") {
    return <Done product={product} session={session!} onReset={() => location.reload()} />;
  }

  if (stage === "checkout" && session && quote) {
    const offerWeather = mode === "shared";
    return (
      <Checkout
        product={product}
        session={session}
        party={party}
        baseTotal={quote.total}
        quantities={quote.quantities}
        extras={selectedAddOns}
        weatherProtection={offerWeather ? WEATHER_PROTECTION : undefined}
        onBack={() => setStage("select")}
        onDone={() => setStage("done")}
      />
    );
  }

  /* ── helpers for the new UI ── */
  const seatsLeft = (s: Session) => s.seatsAvailable ?? null;
  const slotStatus = (s: Session) => {
    if (!sessionBookable(s)) return "closed" as const;
    const n = seatsLeft(s) ?? 99;
    if (n <= 0) return "sold" as const;
    if (n <= 4) return "low" as const;
    if (n <= 10) return "limited" as const;
    return "open" as const;
  };
  const dayStatus = (iso: string): "open" | "limited" | "sold" | "none" => {
    const ss = byDay.get(iso) ?? [];
    if (!ss.length) return "none";
    const statuses = ss.map(slotStatus);
    if (statuses.some((x) => x === "open")) return "open";
    if (statuses.some((x) => x === "limited")) return "limited";
    return "sold";
  };

  return (
    <div style={panel}>
      {/* ── Top: price context ── */}
      {fromInfo && (
        <div style={priceCtx}>
          <span style={priceCtxBadge}>
            {fromInfo.mode === "private" ? "Private charter" : "Per-person seats"}
          </span>
          <span style={priceCtxFrom}>From</span>
          <span style={priceCtxAmount}>{fromInfo.big}</span>
          <span style={priceCtxUnit}>{fromInfo.unit}</span>
        </div>
      )}
      {!loading && !error && monthSessions.length === 0 && emptyNote && (
        <div style={emptyNoteBox}>{emptyNote}</div>
      )}

      {/* ── Trip-length selector (multi-product) ── */}
      {products.length > 1 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--muted)", alignSelf: "center", marginRight: 4 }}>Trip length</span>
          {products.map((p) => (
            <button key={p.code} onClick={() => setProduct(p)} style={chip(p.code === product.code)}>
              {p.label.replace(/.*—\s*/, "")}
            </button>
          ))}
        </div>
      )}

      {/* ── Main 2-col layout: calendar + right panel ── */}
      <div className="bf-main-grid" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "start" }}>

        {/* ── LEFT: Calendar ── */}
        <NewCalendar
          cursor={cursor}
          setCursor={setCursor}
          date={date}
          setDate={(d) => { setDate(d); setSession(null); }}
          dayStatus={dayStatus}
          loading={loading}
        />

        {/* ── RIGHT: Date header + slots + guest picker + CTA ── */}
        <div>
          {/* Date heading */}
          <div style={rightDateHead}>
            {parseLocal(date).toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[1, 2].map((i) => (
                <div key={i} style={{ height: 68, borderRadius: 14, background: "linear-gradient(90deg, var(--sand) 0%, #f0ede8 50%, var(--sand) 100%)", backgroundSize: "200% 100%", animation: "bfShimmer 1.4s infinite" }} />
              ))}
              <style>{`@keyframes bfShimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div style={{ padding: "14px 16px", borderRadius: 12, background: "#fdeaea", color: "#b00020", fontSize: 14 }}>
              Couldn't load availability — <a href="tel:+18435081600" style={{ color: "#b00020", fontWeight: 700 }}>call us at (843) 508-1600</a>
            </div>
          )}

          {/* No sessions on this day */}
          {!loading && !error && daySessions.length === 0 && (
            <div style={{ padding: "28px 20px", textAlign: "center", color: "var(--muted)", fontSize: 15, borderRadius: 14, background: "var(--sand)", border: "1px dashed var(--border)" }}>
              No departures on this day.<br />
              <span style={{ fontSize: 13 }}>Select a highlighted date on the calendar.</span>
            </div>
          )}

          {/* Session slot pills */}
          {!loading && !error && daySessions.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {daySessions.map((s, i) => {
                const st = slotStatus(s);
                const sold = st === "sold" || st === "closed";
                const active = session?.startTime === s.startTime;
                const seats = seatsLeft(s);
                return (
                  <button
                    key={`${s.startTime}-${i}`}
                    disabled={sold}
                    onClick={() => { setSession(active ? null : s); setParty(0); }}
                    style={{
                      width: "100%", textAlign: "left", padding: "16px 20px",
                      borderRadius: 14, cursor: sold ? "not-allowed" : "pointer", opacity: sold ? 0.5 : 1,
                      border: active ? "2px solid var(--accent)" : "1.5px solid var(--border)",
                      background: active ? "rgba(255,122,26,0.05)" : "#fff",
                      display: "flex", alignItems: "center", gap: 16,
                      transition: "all .15s",
                      boxShadow: active ? "0 0 0 3px rgba(255,122,26,0.12)" : "none",
                    }}
                  >
                    {/* Time */}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: active ? "var(--accent)" : "var(--navy)", lineHeight: 1 }}>
                        {fmtWhen(s)}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 3 }}>
                        {product.label}
                      </div>
                    </div>
                    {/* Seats badge */}
                    <div style={{
                      padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 800, whiteSpace: "nowrap",
                      background: sold ? "rgba(107,122,143,0.12)"
                        : st === "low" ? "rgba(220,38,38,0.10)"
                        : st === "limited" ? "rgba(234,179,8,0.12)"
                        : "rgba(34,197,94,0.12)",
                      color: sold ? "var(--muted)"
                        : st === "low" ? "#dc2626"
                        : st === "limited" ? "#a16207"
                        : "#15803d",
                    }}>
                      {st === "closed" ? "Check-in closed"
                        : st === "sold" ? "Sold out"
                        : st === "low" ? `${seats} seat${seats === 1 ? "" : "s"} left!`
                        : st === "limited" ? `${seats} left`
                        : seats !== null ? `${seats} seats open` : "Available"}
                    </div>
                    {/* Selected checkmark */}
                    {active && (
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--accent)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3 3 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Guest picker + add-ons + CTA — slides in after slot selected ── */}
          {session && (
            <div style={{ marginTop: 20, padding: "22px 22px 18px", borderRadius: 18, border: "1.5px solid var(--border)", background: "#fff", boxShadow: "0 4px 20px rgba(12,35,64,0.08)" }}>
              {/* Guest counter */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 800, color: "var(--navy)", fontSize: 14, marginBottom: 12 }}>
                  {mode === "private" ? "How many in your group?" : "How many guests?"}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 0, border: "1.5px solid var(--border)", borderRadius: 14, overflow: "hidden", width: "fit-content" }}>
                  <button
                    onClick={() => setParty((p) => Math.max(0, p - 1))}
                    disabled={party === 0}
                    style={{ width: 52, height: 52, background: party === 0 ? "var(--sand)" : "#fff", border: 0, fontSize: 22, color: party === 0 ? "var(--light)" : "var(--navy)", cursor: party === 0 ? "not-allowed" : "pointer", fontWeight: 300 }}
                  >
                    −
                  </button>
                  <div style={{ width: 64, height: 52, display: "grid", placeItems: "center", borderLeft: "1.5px solid var(--border)", borderRight: "1.5px solid var(--border)", background: "#fff" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--navy)" }}>
                      {party === 0 ? "—" : party}
                    </span>
                  </div>
                  <button
                    onClick={() => setParty((p) => Math.min(pricing?.max ?? 23, p + 1))}
                    style={{ width: 52, height: 52, background: "#fff", border: 0, fontSize: 22, color: "var(--navy)", cursor: "pointer", fontWeight: 300 }}
                  >
                    +
                  </button>
                </div>
                {party === 0 && (
                  <p style={{ fontSize: 12.5, color: "var(--accent)", fontWeight: 700, margin: "8px 0 0" }}>
                    Tap + to add guests and see your total
                  </p>
                )}
                {party > 0 && mode === "private" && (
                  <p style={{ fontSize: 12, color: "var(--muted)", margin: "8px 0 0" }}>
                    One flat price for the whole boat — price steps up only when crossing a group-size band.
                  </p>
                )}
              </div>

              {/* Add-ons */}
              {addOns && addOns.length > 0 && party > 0 && (
                <div style={{ marginBottom: 18, padding: "12px 14px", borderRadius: 10, background: "var(--cream)", border: "1px dashed var(--border)" }}>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>Enhance your trip</div>
                  {addOns.map((a) => (
                    <label key={a.label} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14, color: "var(--navy)", padding: "4px 0" }}>
                      <input type="checkbox" checked={!!addOnSel[a.label]} onChange={(e) => setAddOnSel((s) => ({ ...s, [a.label]: e.target.checked }))} style={{ width: 17, height: 17, accentColor: "var(--accent)" }} />
                      <span style={{ flex: 1, fontWeight: 600 }}>{a.label}</span>
                      <span style={{ fontWeight: 800 }}>+{money(a.price)}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Price breakdown */}
              {party > 0 && quote && (
                <div style={{ marginBottom: 16, padding: "12px 14px", borderRadius: 10, background: "var(--seafoam)" }}>
                  {mode === "shared" ? (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontSize: 13, color: "var(--body)" }}>{party} guest{party !== 1 ? "s" : ""} × {quote.unitLabel}</span>
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 22, color: "var(--navy)" }}>{money(quote.total + addOnTotal)}</span>
                    </div>
                  ) : (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontSize: 13, color: "var(--body)" }}>{campLike ? "Group rate" : "Whole boat"} · up to {party} guests</span>
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 22, color: "var(--navy)" }}>{money(quote.total + addOnTotal)}</span>
                    </div>
                  )}
                  {addOnTotal > 0 && <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2, textAlign: "right" }}>incl. {money(addOnTotal)} add-ons</div>}
                </div>
              )}

              {/* CTA */}
              <button
                disabled={party === 0 || !quote}
                onClick={() => { if (party > 0 && quote) setStage("checkout"); }}
                style={{
                  width: "100%", height: 54, borderRadius: 999, border: 0,
                  background: party > 0 && quote ? "var(--accent)" : "var(--sand)",
                  color: party > 0 && quote ? "#fff" : "var(--muted)",
                  fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17,
                  cursor: party > 0 && quote ? "pointer" : "not-allowed",
                  transition: "all .15s", letterSpacing: "0.01em",
                }}
              >
                {party === 0 ? "Select guests to continue" : `Reserve ${party} seat${party !== 1 ? "s" : ""} →`}
              </button>

              {/* Trust signals */}
              <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 7 }}>
                {[
                  "✓ Free cancellation 24 hours before departure",
                  "✓ Secure payment — you stay on this site",
                  "✓ Instant confirmation by email",
                ].map((t) => (
                  <div key={t} style={{ fontSize: 12.5, color: "var(--muted)", display: "flex", gap: 6 }}>{t}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .bf-main-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ── New world-class Calendar ──────────────────────────────────────────────── */
function NewCalendar({
  cursor, setCursor, date, setDate, dayStatus, loading,
}: {
  cursor: { y: number; m: number };
  setCursor: (f: (c: { y: number; m: number }) => { y: number; m: number }) => void;
  date: string;
  setDate: (d: string) => void;
  dayStatus: (iso: string) => "open" | "limited" | "sold" | "none";
  loading: boolean;
}) {
  const first = new Date(cursor.y, cursor.m, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(startPad).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const today = todayIso();
  const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const dotColor = { open: "#22c55e", limited: "#eab308", sold: "#ef4444", none: "transparent" };

  // Prev month: disable if it's already the current calendar month
  const nowY = new Date().getFullYear(), nowM = new Date().getMonth();
  const canGoBack = cursor.y > nowY || (cursor.y === nowY && cursor.m > nowM);

  return (
    <div style={{ background: "#fff", borderRadius: 18, border: "1.5px solid var(--border)", padding: "18px 16px", minWidth: 280, userSelect: "none" }}>
      {/* Legend */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 12 }}>
        {[{ label: "Available", color: "#22c55e" }, { label: "Limited", color: "#eab308" }, { label: "Sold out", color: "#ef4444" }].map((l) => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--muted)", fontWeight: 600 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: l.color }} />
            {l.label}
          </div>
        ))}
      </div>

      {/* Month nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <button
          onClick={() => setCursor((c) => ({ y: c.m === 0 ? c.y - 1 : c.y, m: (c.m + 11) % 12 }))}
          disabled={!canGoBack}
          style={{ width: 36, height: 36, borderRadius: 10, border: "1.5px solid var(--border)", background: canGoBack ? "#fff" : "var(--sand)", cursor: canGoBack ? "pointer" : "not-allowed", color: canGoBack ? "var(--navy)" : "var(--light)", fontSize: 18, display: "grid", placeItems: "center" }}
        >
          ‹
        </button>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, color: "var(--navy)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          {first.toLocaleDateString([], { month: "long", year: "numeric" })}
        </span>
        <button
          onClick={() => setCursor((c) => ({ y: c.m === 11 ? c.y + 1 : c.y, m: (c.m + 1) % 12 }))}
          style={{ width: 36, height: 36, borderRadius: 10, border: "1.5px solid var(--border)", background: "#fff", cursor: "pointer", color: "var(--navy)", fontSize: 18, display: "grid", placeItems: "center" }}
        >
          ›
        </button>
      </div>

      {/* DOW headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 4 }}>
        {DOW.map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: "var(--muted)", paddingBottom: 6 }}>{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px 0" }}>
        {cells.map((n, i) => {
          if (n == null) return <div key={i} />;
          const iso = ISO(new Date(cursor.y, cursor.m, n));
          const past = iso < today;
          const st = loading ? "none" : dayStatus(iso);
          const isSelected = iso === date;
          const isToday = iso === today;
          const clickable = !past && st !== "none" && st !== "sold";

          return (
            <button
              key={i}
              disabled={!clickable}
              onClick={() => setDate(iso)}
              style={{
                width: "100%", aspectRatio: "1", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 2,
                borderRadius: 10, border: isToday && !isSelected ? "2px solid var(--navy)" : "2px solid transparent",
                background: isSelected ? "var(--accent)" : "transparent",
                cursor: clickable ? "pointer" : "not-allowed",
                transition: "all .1s",
              }}
            >
              <span style={{
                fontSize: 14, fontWeight: isSelected ? 800 : clickable ? 700 : 400,
                color: isSelected ? "#fff" : past || st === "none" ? "var(--light)" : "var(--navy)",
              }}>
                {n}
              </span>
              {/* Availability dot */}
              <div style={{
                width: 5, height: 5, borderRadius: "50%",
                background: loading ? "var(--border)" : (isSelected ? "rgba(255,255,255,0.6)" : (past ? "transparent" : dotColor[st])),
              }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── LEGACY PLACEHOLDER (kept so existing call sites compile) ──────────────────
function Calendar({
  cursor, setCursor, date, setDate, dayHasOpen,
}: {
  cursor: { y: number; m: number };
  setCursor: (f: (c: { y: number; m: number }) => { y: number; m: number }) => void;
  date: string;
  setDate: (d: string) => void;
  dayHasOpen: (iso: string) => boolean;
}) {
  return (
    <NewCalendar
      cursor={cursor}
      setCursor={setCursor}
      date={date}
      setDate={setDate}
      dayStatus={(iso) => dayHasOpen(iso) ? "open" : "none"}
      loading={false}
    />
  );
}

/* ---------- Inline checkout ---------- */
function Checkout({
  product,
  session,
  party,
  baseTotal,
  quantities,
  extras = [],
  weatherProtection,
  onBack,
  onDone,
}: {
  product: RezdyProduct;
  session: Session;
  party: number;
  baseTotal: number;
  quantities: { optionLabel: string; value: number }[];
  extras?: AddOn[];
  weatherProtection?: AddOn;
  onBack: () => void;
  onDone: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [voucher, setVoucher] = useState("");
  const [weatherSel, setWeatherSel] = useState(false);
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // "ambiguous" = the booking request was sent but we never got a clean
  // confirmation (network drop / server 5xx). The card MAY already be charged,
  // so we must not silently let the user re-submit and double-charge.
  const [ambiguous, setAmbiguous] = useState(false);

  // ── 15-minute cart hold timer ──
  const CART_KEY = `lccx-cart-${product.code}-${session.startTime}`;
  const HOLD_SECS = 15 * 60; // 15 minutes
  const [secsLeft, setSecsLeft] = useState<number>(() => {
    try {
      const saved = sessionStorage.getItem(CART_KEY);
      if (saved) {
        const rem = Math.floor((Number(saved) - Date.now()) / 1000);
        if (rem > 0) return rem;
      }
    } catch { /* SSR / private mode */ }
    try { sessionStorage.setItem(CART_KEY, String(Date.now() + HOLD_SECS * 1000)); } catch { /* noop */ }
    return HOLD_SECS;
  });

  useEffect(() => {
    if (secsLeft <= 0) {
      try { sessionStorage.removeItem(CART_KEY); } catch { /* noop */ }
      onBack();
      return;
    }
    const t = setTimeout(() => setSecsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secsLeft, CART_KEY, onBack]);

  const timerMins = Math.floor(secsLeft / 60);
  const timerSecs = String(secsLeft % 60).padStart(2, "0");
  const timerUrgent = secsLeft < 120; // red at < 2 mins

  const weatherCost = weatherSel && weatherProtection ? weatherProtection.price : 0;
  const extrasTotal = extras.reduce((s, a) => s + a.price, 0);
  const subtotal = +(baseTotal + extrasTotal + weatherCost).toFixed(2);
  const surcharge = +(subtotal * (CARD_SURCHARGE_PCT / 100)).toFixed(2);
  const total = +(subtotal + surcharge).toFixed(2);

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return; // guard against a double-click firing two charges
    setError(null);
    if (!stripe || !elements) return;
    if (!first.trim() || !last.trim() || !email.trim()) {
      setError("Please fill in your name and email.");
      return;
    }
    if (!phone.trim()) {
      setError("Please add a mobile number so we can reach you about your trip.");
      return;
    }
    if (!terms) {
      setError("Please agree to the terms & liability waiver to continue.");
      return;
    }
    const cardEl = elements.getElement(CardElement);
    if (!cardEl) return setError("Card field not ready.");
    setBusy(true);
    setAmbiguous(false);
    let requestSent = false; // true once the booking POST leaves the browser
    try {
      const { token, error: tErr } = await stripe.createToken(cardEl);
      if (tErr || !token) {
        setError(tErr?.message || "Card declined.");
        setBusy(false);
        return;
      }
      const allExtras = [
        ...extras.map((a) => ({ name: a.optionLabel ?? a.label, quantity: 1 })),
        ...(weatherSel && weatherProtection
          ? [{ name: weatherProtection.optionLabel ?? weatherProtection.label, quantity: 1 }]
          : []),
      ];
      requestSent = true;
      const res = await fetch("/api/public/rezdy-create-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productCode: product.code,
          startTimeLocal: session.startTime,
          quantities,
          extras: allExtras,
          customer: {
            firstName: first.trim(),
            lastName: last.trim(),
            email: email.trim(),
            phone: phone.trim(),
            ...(company.trim() ? { company: company.trim() } : {}),
          },
          ...(voucher.trim() ? { voucherCode: voucher.trim() } : {}),
          termsAccepted: true,
          marketingOptIn: marketing,
          cardToken: token.id,
        }),
      });
      const b = await res.json().catch(() => ({}));

      // Success.
      if (res.ok && b.ok) {
        try { sessionStorage.removeItem(CART_KEY); } catch { /* noop */ }
        onDone();
        return;
      }

      // Definitive failure: our server (or Rezdy) explicitly rejected with a
      // 400 + reason. RezdyPay only charges on a SUCCESSFUL booking, so a 400
      // means no charge was made — it's safe to fix the input and retry.
      if (res.status === 400 && b.error) {
        setError(b.error);
        setBusy(false);
        return;
      }

      // Anything else (5xx, 502 "couldn't reach Rezdy", unparseable body): the
      // charge MAY have gone through. Do not allow a silent re-charge.
      setAmbiguous(true);
      setError(
        "We couldn't confirm your booking. Your card may already have been charged — please check your email for a confirmation before trying again, or call (843) 508-1600.",
      );
      setBusy(false);
    } catch (err) {
      if (requestSent) {
        // Connection dropped after the request left the browser — Rezdy may
        // have created the booking and charged the card.
        setAmbiguous(true);
        setError(
          "Connection lost before we could confirm your booking. Your card may already have been charged — check your email or call (843) 508-1600 before retrying.",
        );
      } else {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
      setBusy(false);
    }
  }

  return (
    <form onSubmit={pay} style={panel}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 4 }}>
        <button type="button" onClick={onBack} style={backLink}>
          ‹ Back to times
        </button>
        {/* Cart hold timer */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999,
          background: timerUrgent ? "rgba(176,0,32,0.08)" : "var(--seafoam)",
          border: `1px solid ${timerUrgent ? "rgba(176,0,32,0.25)" : "var(--border)"}`,
          fontSize: 13, fontWeight: 700, color: timerUrgent ? "#b00020" : "var(--navy)",
          animation: timerUrgent ? "timerPulse 1s ease-in-out infinite" : "none",
        }}>
          ⏱ Seats held for{" "}
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 15 }}>
            {timerMins}:{timerSecs}
          </span>
          {timerUrgent && " — complete now!"}
        </div>
      </div>
      <style>{`@keyframes timerPulse{0%,100%{opacity:1}50%{opacity:0.65}}`}</style>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px, 3vw, 48px)", marginTop: 20 }} className="co-grid">
        {/* ── LEFT: form fields ── */}
        <div className="co-left">
          {/* Contact info */}
          <div style={fieldSection}>
            <div style={sectionHead}>Your contact information</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <label style={flbl} htmlFor="co-first">First name *</label>
                <input id="co-first" style={inp} placeholder="First name" value={first} onChange={(e) => setFirst(e.target.value)} autoComplete="given-name" required />
              </div>
              <div>
                <label style={flbl} htmlFor="co-last">Last name *</label>
                <input id="co-last" style={inp} placeholder="Last name" value={last} onChange={(e) => setLast(e.target.value)} autoComplete="family-name" required />
              </div>
            </div>
            <div style={{ marginTop: 10 }}>
              <label style={flbl} htmlFor="co-email">Email address *</label>
              <input id="co-email" style={inp} placeholder="you@email.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
              <div>
                <label style={flbl} htmlFor="co-phone">Mobile number *</label>
                <input id="co-phone" style={inp} placeholder="(555) 555-5555" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" required />
              </div>
              <div>
                <label style={flbl} htmlFor="co-company">Company / Group <span style={{ color: "var(--muted)" }}>(optional)</span></label>
                <input id="co-company" style={inp} placeholder="Group or company" value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" />
              </div>
            </div>
          </div>

          {/* Promo / voucher */}
          <div style={{ ...fieldSection, marginTop: 18 }}>
            <div style={sectionHead}>Promo code or voucher</div>
            <input
              style={inp}
              placeholder="Enter code (leave blank if none)"
              value={voucher}
              onChange={(e) => setVoucher(e.target.value.toUpperCase())}
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          {/* Weather Protection */}
          {weatherProtection && (
            <div
              style={{ marginTop: 18, borderRadius: "var(--r-card)", border: weatherSel ? "2px solid var(--accent)" : "1px solid var(--border)", background: weatherSel ? "rgba(255,122,26,0.04)" : "var(--white)", cursor: "pointer", overflow: "hidden" }}
              onClick={() => setWeatherSel(!weatherSel)}
            >
              {/* Header row */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: weatherSel ? "rgba(255,122,26,0.08)" : "var(--sand)" }}>
                <span style={{ fontSize: 22 }}>☂️</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: "var(--navy)", fontSize: 14 }}>Optional Weather Protection</div>
                  <div style={{ fontSize: 12, color: "var(--body)" }}>100% refund if we cancel for weather · $45 flat fee</div>
                </div>
                <input type="checkbox" checked={weatherSel} onChange={(e) => { e.stopPropagation(); setWeatherSel(e.target.checked); }} style={{ ...cb, flexShrink: 0 }} onClick={(e) => e.stopPropagation()} />
              </div>
              {/* Details — always visible, no scroll */}
              <div style={{ padding: "12px 16px", fontSize: 12.5, color: "var(--body)", lineHeight: 1.6 }}>
                <p style={{ margin: "0 0 6px" }}>The $45 fee is non-refundable. If we cancel due to qualifying weather, your full trip cost is refunded.</p>
                <p style={{ margin: 0, color: "var(--muted)" }}>
                  ✅ Covers: lightning, tropical storm/hurricane warnings, unsafe winds or seas, Coast Guard closure.{" "}
                  ❌ Doesn't cover: light rain, cloudy/hot/cold, choppy-but-safe seas, or guest cancellation.
                </p>
              </div>
            </div>
          )}

          {/* Payment */}
          <div style={{ ...fieldSection, marginTop: 18 }}>
            <div style={sectionHead}>Payment</div>
            <div style={cardField}>
              <CardElement options={{ hidePostalCode: false }} />
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 8, display: "flex", gap: 6, alignItems: "center" }}>
              🔒 Secure · You stay on this site · Free cancellation 24h before
            </div>
          </div>

          {/* Terms & waiver */}
          <div style={{ ...waiverBox, marginTop: 18 }}>
            <div style={{ fontWeight: 800, color: "var(--navy)", fontSize: 14, marginBottom: 6 }}>⚓ Before you board</div>
            <p style={{ fontSize: 12.5, color: "var(--body)", margin: "0 0 10px", lineHeight: 1.5 }}>
              Boating carries inherent risks. <strong>Every guest must sign a liability waiver before boarding</strong> — we'll email a link and a kiosk is at the dock. A parent or guardian signs for under-18s.
            </p>
            <label style={consentRow}>
              <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} style={cb} />
              <span style={{ fontSize: 12.5, color: "var(--navy)" }}>
                I agree to the{" "}
                <a href={TERMS_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", fontWeight: 700 }}>Terms & Liability Waiver</a>
                {" "}and understand all guests must sign before boarding.
              </span>
            </label>
            <label style={{ ...consentRow, marginTop: 8 }}>
              <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} style={cb} />
              <span style={{ fontSize: 12.5, color: "var(--body)" }}>Email me Charleston trip ideas, tide-timed openings & special offers.</span>
            </label>
          </div>
          {error && <p style={errBox}>{error}</p>}
        </div>

        {/* ── RIGHT: sticky order summary ── */}
        <div className="co-right">
          <div style={summaryCard}>
            <div style={{ fontWeight: 800, color: "var(--navy)", fontSize: 17 }}>{product.label}</div>
            <div style={{ color: "var(--muted)", fontSize: 14, marginBottom: 14 }}>
              {isMultiDay(session)
                ? `${fmtWhen(session)} · starts ${fmtTime(session.startTime)}`
                : `${parseLocal(session.startTime).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })} · ${fmtTime(session.startTime)}`}{" "}
              · {party} {party === 1 ? "guest" : "guests"}
            </div>
            <Row k="Subtotal" v={money(baseTotal)} />
            {extras.map((a) => (
              <Row key={a.label} k={a.label} v={money(a.price)} />
            ))}
            {weatherSel && weatherProtection && (
              <Row k="Weather Protection" v={money(weatherProtection.price)} />
            )}
            {voucher.trim() && (
              <Row k={`Voucher: ${voucher}`} v="Applied at checkout" />
            )}
            <Row k={`Card surcharge (${CARD_SURCHARGE_PCT}%)`} v={money(surcharge)} />
            <div style={{ height: 1, background: "var(--border)", margin: "12px 0" }} />
            <Row k="Total" v={money(total)} big />
            <button type="submit" disabled={busy || !stripe || !terms} style={{ ...cta, width: "100%", marginTop: 16, justifyContent: "center", opacity: terms ? 1 : 0.6, background: ambiguous ? "var(--navy)" : "var(--accent)" }}>
              {busy ? "Processing…" : ambiguous ? `Charge my card again — ${money(total)}` : `Pay ${money(total)}`}
            </button>
            {ambiguous && (
              <p style={{ fontSize: 11.5, color: "var(--muted)", textAlign: "center", marginTop: 8, lineHeight: 1.4 }}>
                Only retry if you did <strong>not</strong> receive a confirmation email.
              </p>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .co-grid { grid-template-columns: 1fr 1fr !important; }
        @media (max-width: 700px) {
          .co-grid { grid-template-columns: 1fr !important; }
          .co-right { order: -1; }
        }
      `}</style>
    </form>
  );
}

function Row({ k, v, big }: { k: string; v: string; big?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
      <span style={{ color: big ? "var(--navy)" : "var(--body)", fontWeight: big ? 800 : 500, fontSize: big ? 18 : 14 }}>{k}</span>
      <span style={{ color: "var(--navy)", fontWeight: big ? 900 : 700, fontSize: big ? 22 : 14 }}>{v}</span>
    </div>
  );
}

function Done({ product, session, onReset }: { product: RezdyProduct; session: Session; onReset: () => void }) {
  return (
    <div style={{ ...panel, textAlign: "center" }}>
      <div style={{ fontSize: 48 }}>🎉</div>
      <h3 style={{ color: "var(--navy)", fontFamily: "var(--font-display)", margin: "8px 0" }}>You're booked!</h3>
      <p style={{ color: "var(--body)" }}>
        {product.label} —{" "}
        {isMultiDay(session)
          ? `${fmtWhen(session)}, starts at ${fmtTime(session.startTime)}`
          : `${parseLocal(session.startTime).toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })} at ${fmtTime(session.startTime)}`}
        . A confirmation email is on its way.
      </p>
      <div style={{ ...waiverBox, textAlign: "left", maxWidth: 460, margin: "16px auto 0" }}>
        <div style={{ fontWeight: 800, color: "var(--navy)", fontSize: 14 }}>⚓ One quick step before your trip</div>
        <p style={{ fontSize: 12.5, color: "var(--body)", margin: "6px 0 10px", lineHeight: 1.5 }}>
          Every guest must sign the liability waiver before boarding (a parent/guardian signs for under-18s).
          We've emailed you the link — or sign now:
        </p>
        <a href={WAIVER_URL} target="_blank" rel="noopener noreferrer" style={{ ...cta, display: "inline-flex", textDecoration: "none" }}>
          Sign your waiver →
        </a>
      </div>
      <button style={{ ...cta, margin: "16px auto 0", background: "var(--navy)" }} onClick={onReset}>
        Book another trip
      </button>
    </div>
  );
}

/* ---------- styles (brand tokens) ---------- */
const wrap: React.CSSProperties = { background: "var(--cream)", padding: "clamp(36px, 6vw, 72px) 20px" };
const kicker: React.CSSProperties = { textAlign: "center", color: "var(--accent)", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", fontSize: 13, margin: 0 };
const h2: React.CSSProperties = { textAlign: "center", color: "var(--navy)", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(26px, 4vw, 40px)", margin: "8px 0 20px" };
const modeToggleWrap: React.CSSProperties = { display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", maxWidth: 620, margin: "0 auto 22px" };
const modeBtn = (active: boolean): React.CSSProperties => ({
  flex: "1 1 240px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
  padding: "14px 18px", borderRadius: "var(--r-card)", cursor: "pointer", textAlign: "center",
  border: active ? "2px solid var(--accent)" : "1px solid var(--border)",
  background: active ? "var(--accent)" : "var(--white)", color: active ? "#fff" : "var(--navy)",
  boxShadow: active ? "var(--shadow-card)" : "none", transition: "all .12s",
});
const panel: React.CSSProperties = { background: "var(--white)", borderRadius: "var(--r-card-lg)", boxShadow: "var(--shadow-card)", padding: "clamp(18px, 3vw, 28px)" };
// New world-class booking UI styles
const priceCtx: React.CSSProperties = { display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap", padding: "12px 16px", marginBottom: 20, borderRadius: 12, background: "var(--seafoam)", border: "1px solid var(--border)" };
const priceCtxBadge: React.CSSProperties = { width: "100%", fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 2 };
const priceCtxFrom: React.CSSProperties = { fontSize: 14, color: "var(--muted)", fontWeight: 500 };
const priceCtxAmount: React.CSSProperties = { fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 34, color: "var(--navy)", lineHeight: 1 };
const priceCtxUnit: React.CSSProperties = { fontSize: 15, color: "var(--body)", fontWeight: 600 };
const rightDateHead: React.CSSProperties = { fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--navy)", marginBottom: 14 };
const addOnBox: React.CSSProperties = { marginTop: 16, padding: "14px 18px", borderRadius: "var(--r-card)", background: "var(--cream)", border: "1px dashed var(--border)" };
const emptyNoteBox: React.CSSProperties = { marginBottom: 18, padding: "14px 18px", borderRadius: "var(--r-card)", background: "var(--seafoam)", color: "var(--navy)", fontSize: 14.5, lineHeight: 1.6, border: "1px solid var(--border)" };
const addOnRow: React.CSSProperties = { display: "flex", alignItems: "center", gap: 12, padding: "6px 0", cursor: "pointer", fontSize: 15 };
const miniLabel: React.CSSProperties = { fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" };
const step: React.CSSProperties = { width: 34, height: 34, borderRadius: 10, border: "1px solid var(--border)", background: "var(--white)", cursor: "pointer", fontSize: 18, color: "var(--navy)" };
const cta: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 26px", borderRadius: "var(--r-pill)", border: 0, background: "var(--accent)", color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer" };
const lbl: React.CSSProperties = { display: "block", fontWeight: 800, color: "var(--navy)", fontSize: 13, letterSpacing: "0.04em", marginBottom: 8 };
// Checkout-specific styles
const fieldSection: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 0 };
const sectionHead: React.CSSProperties = { fontWeight: 800, color: "var(--navy)", fontSize: 13, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 10, paddingBottom: 6, borderBottom: "2px solid var(--border)" };
const flbl: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 700, color: "var(--muted)", marginBottom: 5 };
const chip = (active: boolean): React.CSSProperties => ({ padding: "8px 14px", borderRadius: "var(--r-pill)", cursor: "pointer", border: active ? "1px solid var(--navy)" : "1px solid var(--border)", background: active ? "var(--navy)" : "var(--white)", color: active ? "#fff" : "var(--navy)", fontWeight: 700, fontSize: 14 });
const inp: React.CSSProperties = { flex: 1, width: "100%", padding: "12px 14px", borderRadius: "var(--r-input)", border: "1px solid var(--border)", fontSize: 16, fontFamily: "inherit" };
const cardField: React.CSSProperties = { padding: "14px", borderRadius: "var(--r-input)", border: "1px solid var(--border)" };
const waiverBox: React.CSSProperties = { marginTop: 14, padding: "14px 16px", borderRadius: "var(--r-card)", background: "var(--sand)", border: "1px solid var(--border)" };
const consentRow: React.CSSProperties = { display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" };
const cb: React.CSSProperties = { width: 18, height: 18, marginTop: 1, accentColor: "var(--accent)", flexShrink: 0 };
const summaryCard: React.CSSProperties = { background: "var(--sand)", borderRadius: "var(--r-card)", padding: 24, position: "sticky", top: 88 };
const errBox: React.CSSProperties = { color: "#b00020", background: "#fdeaea", padding: "10px 12px", borderRadius: 10, fontSize: 14, marginTop: 12 };
const backLink: React.CSSProperties = { background: "none", border: 0, color: "var(--accent)", fontWeight: 800, cursor: "pointer", fontSize: 14 };
