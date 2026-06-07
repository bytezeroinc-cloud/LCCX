import aboutHeroSea from "../../assets/lccx/6_Water-Tours-52e76a255056a36_52e76b5b-5056-a36a-06b63ef67afd614e.jpg";
import aboutHeroPrivate from "../../assets/lccx/private-charter.png";
import aboutHeroMarsh from "../../assets/lccx/marsh-golden.png";
import { LccxHeroBanner } from "../components/LccxHeroBanner";
import {
  Icon,
  Btn,
  Container,
  Placeholder,
  SectionLabel,
  SectionWave,
} from "../components/Primitives";

const VALUES = [
  {
    icon: "anchor",
    head: "Private. Always.",
    body: "We don't do shared boats. Every charter is just your group — your people, your pace, your captain's full attention for the entire trip.",
  },
  {
    icon: "shield",
    head: "Safety First, Always",
    body: "Every captain is USCG-licensed and holds a 100-ton master's credential. Our vessels are Coast Guard inspected and carry all required safety equipment.",
  },
  {
    icon: "leaf",
    head: "We Protect What We Show You",
    body: "We follow NOAA dolphin viewing guidelines strictly. No chasing, no harassment. We observe from a respectful distance and let wildlife set the pace.",
  },
  {
    icon: "star",
    head: "No-Questions Guarantees",
    body: "Bad weather? Full refund or reschedule. Fossil hunt with zero finds? Free trip. We stand behind every tour we run — that's why we've never paid out on the promise.",
  },
];

const CAPTAINS = [
  {
    name: "Capt. Mike",
    credential: "100-Ton USCG Master",
    tours: "600+ tours",
    bio: "Born and raised in Mt. Pleasant. Mike knows every dolphin pod, every tidal flat, and exactly where to be when the light hits the harbour just right.",
  },
  {
    name: "Capt. Sarah",
    credential: "100-Ton USCG Master",
    tours: "400+ tours",
    bio: "Certified naturalist and marine educator. Sarah turns every fossil hunt into a field lesson — kids and adults leave knowing exactly what they found and why it matters.",
  },
  {
    name: "Capt. James",
    credential: "100-Ton USCG Master",
    tours: "350+ tours",
    bio: "Former commercial fisherman turned charter captain. James knows these waters like a commute — and his sunset timing has never once missed the light.",
  },
];

const STATS = [
  { value: "12+", label: "Years on the water" },
  { value: "1,400+", label: "Tours completed" },
  { value: "500+", label: "Five-star reviews" },
  { value: "98%", label: "Dolphin sighting rate" },
];

export function AboutPage({ onBack, onBook }: { onBack?: () => void; onBook?: () => void }) {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <LccxHeroBanner
        images={[
          { src: aboutHeroSea, alt: "Lowcountry boat tour on Charleston water", position: "center center" },
          { src: aboutHeroPrivate, alt: "Private charter boat cruising Charleston Harbor", position: "center center" },
          { src: aboutHeroMarsh, alt: "Golden Lowcountry marsh at sunset", position: "center center" },
        ]}
        title="We know every"
        accentTitle="creek in the harbour."
        subtitle="LowCountry Coastal Excursions has been running private charters out of Mt. Pleasant since 2012. Every captain is local, every route is tide-timed, and every guest goes home with a story worth telling."
        ctaLabel="Book Your Trip"
        ctaIcon="anchor"
        onCta={onBook}
        proofItems={[
          { icon: "clock", label: "12+ Years on the Water" },
          { icon: "compass", label: "1,400+ Tours Completed" },
          { icon: "star", label: "500+ Five-Star Reviews" },
          { icon: "anchor", label: "Private Charters" },
        ]}
      />

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--navy)",
          borderTop: "1px solid rgba(255,255,255,0.10)",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <Container>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}
            className="about-stats"
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "40px 24px",
                  textAlign: "center",
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.10)" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    color: "var(--accent-2)",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.50)",
                    marginTop: 8,
                    letterSpacing: ".04em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Story ─────────────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "100px 0" }}>
        <Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
            className="about-story"
          >
            <div>
              <SectionLabel align="left">Our Story</SectionLabel>
              <h2 style={{ marginTop: 16, marginBottom: 24 }}>
                Started by a captain. Still run by captains.
              </h2>
              <p style={{ fontSize: 16, color: "var(--body)", lineHeight: 1.8, marginBottom: 20 }}>
                LowCountry Coastal Excursions was founded in 2012 by a Mt. Pleasant native who grew
                up fishing these creeks, diving these shoals, and watching tourists miss the best
                parts of Charleston entirely.
              </p>
              <p style={{ fontSize: 16, color: "var(--body)", lineHeight: 1.8, marginBottom: 20 }}>
                The idea was simple: private charters only, USCG-licensed captains who actually know
                the water, and tours designed around what Charleston's harbour actually has to offer
                — not what looks good in a brochure.
              </p>
              <p style={{ fontSize: 16, color: "var(--body)", lineHeight: 1.8, marginBottom: 36 }}>
                Over 1,400 tours later, nothing's changed about that. We're still the same operation
                — just with more dolphin sightings, more Megalodon teeth found, and a whole lot more
                five-star reviews.
              </p>
              <Btn onClick={onBook}>Book a Tour →</Btn>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "4/3" }}>
                <Placeholder kind="stboat" width="100%" height="100%" />
              </div>
              <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "16/9" }}>
                <Placeholder kind="morrisdolphin" width="100%" height="100%" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SectionWave from="#fff" to="var(--sand)" height={70} />

      {/* ── Values ────────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--sand)", padding: "100px 0" }}>
        <Container>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 56px" }}>
            <SectionLabel>How We Operate</SectionLabel>
            <h2 style={{ marginTop: 16 }}>
              Four things we don't compromise on.
            </h2>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
            className="about-values"
          >
            {VALUES.map((v, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "36px 32px",
                  border: "1px solid var(--border)",
                  display: "flex",
                  gap: 20,
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
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <Icon name={v.icon} size={22} color="var(--accent)" />
                </span>
                <div>
                  <h3 style={{ color: "var(--navy)", marginBottom: 10 }}>{v.head}</h3>
                  <p style={{ fontSize: 14, color: "var(--body)", lineHeight: 1.72, margin: 0 }}>
                    {v.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <SectionWave from="var(--sand)" to="var(--navy)" height={80} />

      {/* ── Captains ──────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--navy)", padding: "100px 0" }}>
        <Container>
          <div style={{ textAlign: "center", maxWidth: 540, margin: "0 auto 56px" }}>
            <SectionLabel style={{ color: "rgba(255,255,255,0.45)" }}>The Crew</SectionLabel>
            <h2 style={{ color: "#fff", marginTop: 16 }}>
              Your captain is the product.
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.60)",
                fontSize: 16,
                marginTop: 16,
                lineHeight: 1.7,
              }}
            >
              Every captain is USCG-licensed, locally born, and runs these waters year-round. When
              you're out there, they're the reason it's good.
            </p>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
            className="about-captains"
          >
            {CAPTAINS.map((c, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: 20,
                  padding: "36px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 50,
                    background: "rgba(255,122,26,0.15)",
                    border: "1.5px solid rgba(255,122,26,0.3)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Icon name="anchor" size={26} color="var(--accent)" />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: 20,
                      color: "#fff",
                    }}
                  >
                    {c.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--accent)",
                      fontWeight: 600,
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      marginTop: 4,
                    }}
                  >
                    {c.credential}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.40)", marginTop: 3 }}>
                    {c.tours}
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.72,
                    margin: 0,
                  }}
                >
                  {c.bio}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <SectionWave from="var(--navy)" to="#fff" height={80} flip />

      {/* ── Location ──────────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "100px 0" }}>
        <Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
            className="about-location"
          >
            <div>
              <SectionLabel align="left">Find Us</SectionLabel>
              <h2 style={{ marginTop: 16, marginBottom: 24 }}>
                Shem Creek, Mt. Pleasant.
              </h2>
              <p style={{ fontSize: 16, color: "var(--body)", lineHeight: 1.8, marginBottom: 28 }}>
                14 minutes from downtown Charleston. Free public parking right at the dock. Easy
                access on foot, Uber, or car — no need to navigate deep into the marina.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
                {[
                  { icon: "pin", text: "100 Church St, Mt. Pleasant, SC 29464" },
                  { icon: "phone", text: "(843) 508-1600" },
                  { icon: "clock", text: "Open daily · Tours depart 7 AM – 8 PM (seasonal)" },
                ].map((l, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      fontSize: 15,
                      color: "var(--body)",
                    }}
                  >
                    <Icon name={l.icon} size={18} color="var(--accent)" />
                    {l.text}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Btn onClick={onBook}>Book a Tour →</Btn>
                <Btn
                  variant="secondary"
                  onClick={() => (window.location.href = "tel:+18435081600")}
                >
                  <Icon name="phone" size={16} /> Call Us
                </Btn>
              </div>
            </div>
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                aspectRatio: "4/5",
                background: "var(--sand)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Placeholder kind="morrisbeach" width="100%" height="100%" />
            </div>
          </div>
        </Container>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-stats { grid-template-columns: 1fr 1fr !important; }
          .about-stats > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.10); }
          .about-stats > div:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.10) !important; }
          .about-stats > div:nth-last-child(-n+2) { border-bottom: none; }
          .about-story { grid-template-columns: 1fr !important; }
          .about-values { grid-template-columns: 1fr !important; }
          .about-captains { grid-template-columns: 1fr !important; }
          .about-location { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
