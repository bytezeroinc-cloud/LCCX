import { useState, useEffect } from "react";
import { Icon, Container, Placeholder } from "./Primitives";

const PROMO_CAMPAIGNS = [
  {
    key: "sunset",
    eyebrow: "Book Tonight",
    title: "Sunset Cruise",
    sub: "Golden hour on Charleston Harbor. BYOB, dolphin sightings, Ravenel Bridge views.",
    price: "From $65 / seat · Charter from $375",
    cta: "Reserve your sunset",
    image: "sunset",
    accent: "#E8B04B",
  },
  {
    key: "fossil",
    eyebrow: "Family Favorite",
    title: "Shark Tooth Hunting",
    sub: "Megalodon teeth, private beaches, tide-timed trips. Kids go home with real fossils.",
    price: "From $125 / seat · Charter from $400",
    cta: "Hunt for fossils",
    image: "sharktooth",
    accent: "#FF7A1A",
  },
  {
    key: "celebrate",
    eyebrow: "Private Parties",
    title: "Bachelorette & Birthdays",
    sub: "Your crew, our captain. Custom playlists, decorations, the whole harbor is yours.",
    price: "From $350 / charter",
    cta: "Plan your party",
    image: "family",
    accent: "#D97757",
  },
];

export function PromoBanner({ onBook }: { onBook?: () => void }) {
  const items = PROMO_CAMPAIGNS;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % items.length), 5500);
    return () => clearInterval(id);
  }, [paused, items.length]);

  useEffect(() => {
    document.documentElement.style.setProperty("--nav-offset", "var(--promo-height, 56px)");
    return () => {
      document.documentElement.style.removeProperty("--nav-offset");
    };
  }, []);

  const c = items[idx];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 51,
        background: "var(--navy)",
        color: "#fff",
        overflow: "hidden",
        height: "var(--promo-height, 56px)",
      }}
      className="promo-banner"
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.22 }} key={`bg-${c.key}`}>
        <Placeholder kind={c.image} width="100%" height="100%" />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, var(--navy) 0%, rgba(12,35,64,0.80) 50%, rgba(12,35,64,0.40) 100%)",
        }}
      />

      <Container style={{ position: "relative", padding: "10px 0", zIndex: 2 }} className="promo-container">
        <div className="promo-row" style={{ display: "grid", gridTemplateColumns: "28px minmax(0, 1fr) 28px", alignItems: "center", gap: 14 }}>
          <button
            aria-label="Previous promo"
            onClick={() => setIdx((i) => (i - 1 + items.length) % items.length)}
            style={{
              width: 28,
              height: 28,
              borderRadius: 50,
              border: "1px solid rgba(255,255,255,0.25)",
              background: "transparent",
              color: "#fff",
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
            className="promo-arrow"
          >
            <Icon name="chevron" size={12} style={{ transform: "rotate(180deg)" }} />
          </button>

          <div
            key={`content-${c.key}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flex: 1,
              minWidth: 0,
              animation: "pbFade 400ms var(--ease-out)",
            }}
            className="promo-content"
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: c.accent,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              className="promo-eyebrow"
            >
              {c.eyebrow}
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                flex: 1,
                minWidth: 0,
                flexWrap: "nowrap",
                overflow: "hidden",
              }}
              className="promo-copy"
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#fff",
                  whiteSpace: "nowrap",
                }}
                className="promo-title"
              >
                <span className="promo-title-full">{c.title}</span>
                <span className="promo-title-short">{c.key === "sunset" ? "Sunset" : c.key === "fossil" ? "Fossils" : "Party"}</span>
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.72)",
                  minWidth: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="pb-sub"
              >
                {c.sub}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: 12,
                  color: c.accent,
                  whiteSpace: "nowrap",
                }}
                className="promo-price"
              >
                {c.price}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexShrink: 0 }} className="promo-dots">
            {items.map((it, i) => (
              <button
                key={it.key}
                aria-label={`Show promo ${i + 1}`}
                onClick={() => setIdx(i)}
                style={{
                  width: i === idx ? 24 : 8,
                  height: 8,
                  borderRadius: 50,
                  border: 0,
                  cursor: "pointer",
                  background: i === idx ? c.accent : "rgba(255,255,255,0.3)",
                  transition: "width 250ms, background 250ms",
                }}
              />
            ))}
          </div>
          <button
            aria-label="Next promo"
            onClick={() => setIdx((i) => (i + 1) % items.length)}
            style={{
              width: 28,
              height: 28,
              borderRadius: 50,
              border: "1px solid rgba(255,255,255,0.25)",
              background: "transparent",
              color: "#fff",
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
            className="promo-arrow"
          >
            <Icon name="chevron" size={12} />
          </button>
        </div>
      </Container>

      <style>{`
        @keyframes pbFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .promo-title-short { display: none; }
        @media (max-width: 900px) {
          :root { --promo-height: 64px; }
          .promo-container { padding-top: 8px !important; padding-bottom: 8px !important; }
          .promo-row { grid-template-columns: 24px minmax(0, 1fr) 24px !important; gap: 10px !important; height: 48px; }
          .promo-arrow { width: 24px !important; height: 24px !important; }
          .promo-content { gap: 8px !important; min-width: 0; }
          .promo-copy { display: block !important; min-width: 42px !important; flex: 0 1 auto !important; }
          .promo-title { display: block; font-size: 12px !important; overflow: hidden; text-overflow: ellipsis; max-width: 54px; }
          .promo-title-full { display: none; }
          .promo-title-short { display: inline; }
          .promo-eyebrow { font-size: 9px !important; letter-spacing: .10em !important; }
          .pb-sub, .promo-price, .promo-dots { display: none !important; }
        }
        @media (max-width: 360px) {
          .promo-eyebrow { display: none !important; }
        }
      `}</style>
    </div>
  );
}
