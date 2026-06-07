import { useEffect, useState } from "react";
import { toast } from "sonner";
import bacheloretteBeachPartyUpload from "../../assets/lccx/lccx-beach-party-upload.jpeg";
import bacheloretteByobCooler from "../../assets/lccx/bachelorette-byob-cooler-ai.jpg";
import bacheloretteCapsBoat from "../../assets/lccx/bachelorette-caps-boat.png";
import bacheloretteCrewBoat from "../../assets/lccx/bachelorette.webp";
import bacheloretteHeroCharlestonAi from "../../assets/lccx/bachelorette-hero-charleston-ai.jpg";
import bacheloretteDjBannerUpload from "../../assets/lccx/bachelorette-dj-banner-upload.png";
import bacheloretteFloatPartyUpload from "../../assets/lccx/bachelorette-float-party-upload.jpeg";
import bacheloretteLargeCapacityBlueBikini from "../../assets/lccx/bachelorette-large-capacity-blue-bikini.png";
import bachelorettePhotoStop from "../../assets/lccx/bachelorette-photo-stop-ai.jpg";
import bacheloretteBoatPartyUpload from "../../assets/lccx/bachelorette-boat-party-upload.png";
import bachelorettePartyCruise from "../../assets/lccx/bachelorette-party-cruise.png";
import bacheloretteRavenelGroup from "../../assets/lccx/bachelorette-ravenel-group.webp";
import { LccxHeroBanner } from "../components/LccxHeroBanner";
import { Icon, Btn, Container, Placeholder, SectionLabel, SectionWave } from "../components/Primitives";
import { QuickFactsBar, WeatherBring, MapDirections } from "../components/TourSections";

const BACH_QUICK = [
  { icon: "clock", k: "Duration", v: "2 / 3 / 4 hours" },
  { icon: "users", k: "Capacity", v: "Up to 23 guests" },
  { icon: "gift", k: "From", v: "$350 · whole boat" },
  { icon: "music", k: "Vibe", v: "BYOB · your playlist" },
  { icon: "anchor", k: "Aboard", v: "Roamer IV" },
  { icon: "pin", k: "Boards at", v: "Shem Creek, Mt. Pleasant" },
];

const BACH_BRING = [
  "Swimsuits & cover-ups",
  "Your playlist — we've got the Bluetooth speaker",
  "BYOB drinks, snacks & a cooler-friendly cake",
  "Décor, sashes & photo props",
  "Sunscreen & sunglasses",
];

const SHOW_UP_ITEMS = [
  {
    icon: "anchor",
    image: bacheloretteRavenelGroup,
    position: "center",
    title: "Private Charter Boat",
    body: "Your group only — no strangers, no shared tours. The whole boat is yours.",
  },
  {
    icon: "wineGlasses",
    image: bacheloretteByobCooler,
    position: "center",
    title: "Cooler Stocked with Ice",
    body: "Bring the drinks — we keep everything cold and ready for the cruise.",
  },
  {
    icon: "camera",
    image: bacheloretteCrewBoat,
    position: "center",
    title: "Iconic Photo Stops",
    body: "Bridge, skyline, harbor, and beachy backdrops your crew will actually want to post.",
  },
  {
    icon: "route",
    image: bachelorettePartyCruise,
    position: "center",
    title: "Customizable Itinerary",
    body: "Sandbar stop, skyline loop, photo timing, or extra float time — we build around the bride.",
  },
  {
    icon: "lock",
    image: bacheloretteCapsBoat,
    position: "center",
    title: "Dry Storage",
    body: "Your belongings stay safe and dry while everyone enjoys the ride.",
  },
  {
    icon: "users",
    image: bacheloretteLargeCapacityBlueBikini,
    position: "center",
    title: "Large-Capacity Boats",
    body: "Host up to 23 guests. For parties over 12, upgrade to Roamer IV — she even has a bathroom.",
  },
];

const FUN_ITEMS = [
  {
    icon: "music",
    image: bacheloretteDjBannerUpload,
    title: "Bluetooth Sound System",
    body: "Your playlist runs the party from dockside hugs to golden-hour dancing.",
  },
  {
    icon: "wineGlasses",
    image: bacheloretteBeachPartyUpload,
    title: "BYOB Friendly",
    body: "Bring the cans, bubbles, and bride favorites — we make it easy to serve and sip.",
  },
  {
    icon: "waves",
    image: bacheloretteFloatPartyUpload,
    title: "Float Mats",
    body: "Lounge, laugh, and float in style with photogenic mats made for Charleston bachelorette boat days.",
  },
];

const WHY_CHOOSE_US = [
  { icon: "anchor", title: "Intimate & Private", body: "A well-maintained boat reserved for your group — no crowded bars, no strangers." },
  { icon: "route", title: "Custom Routes", body: "Choose the sights, stops, timing, and pace of your Charleston harbor celebration." },
  { icon: "star", title: "Princess Treatment", body: "Playlist, chilled drinks, float mats, and thoughtful touches for the bride." },
  { icon: "shield", title: "Safety First", body: "Licensed captains keep the bachelorette booze cruise easy and worry-free." },
  { icon: "camera", title: "Style & Photos", body: "We know the skyline, bridge, and harbor backdrops that make every shot share-worthy." },
  { icon: "gift", title: "Personalized Extras", body: "Decorations, props, themed accessories, and treats can make it one-of-a-kind." },
  { icon: "clock", title: "Flexible Crew", body: "Later departure, extended cruise, or special itinerary — we help dial in the details." },
  { icon: "users", title: "Room for Everyone", body: "Bring up to 23 friends and family members to share the perfect day." },
];

const HERO_IMAGES = [
  { src: bacheloretteHeroCharlestonAi, alt: "Bachelorette group celebrating on a Charleston boat with the Ravenel Bridge behind them", position: "center center" },
  { src: bachelorettePhotoStop, alt: "Bride and friends taking golden-hour photos on a Charleston bachelorette boat cruise", position: "center center" },
];

const PRICING_ITEMS = [
  {
    title: "Bachelorette Party Cruise - 2 Hours",
    details: "All ages · Up to 23 People · Enjoy a fun and exciting time on the Charleston waters!",
    price: "From $350 – 1,200",
  },
  {
    title: "Bachelorette Party Cruise - 3 Hours",
    details: "All ages · Up to 23 People · Enjoy a fun and exciting time on the Charleston waters!",
    price: "From $450 – 1,750",
  },
  {
    title: "Bachelorette Party Cruise - 4 Hours",
    details: "All ages · Up to 23 People · Enjoy a fun and exciting time on the Charleston waters!",
    price: "From $550 – 2,200",
  },
];

const SECTION_IMAGES = [
  ...HERO_IMAGES.map((image, index) => ({ src: image.src, section: `Hero banner #${index + 1}` })),
  ...SHOW_UP_ITEMS.map((item) => ({ src: item.image, section: `What we show up with: ${item.title}` })),
  ...FUN_ITEMS.map((item) => ({ src: item.image, section: `Bachelorette fun: ${item.title}` })),
];

function warnOnDuplicateBacheloretteAssets() {
  if (!import.meta.env.DEV) return;

  const duplicateGroups = Array.from(
    SECTION_IMAGES.reduce((groups, item) => {
      groups.set(item.src, [...(groups.get(item.src) ?? []), item.section]);
      return groups;
    }, new Map<string, string[]>()).values(),
  ).filter((sections) => sections.length > 1);

  if (!duplicateGroups.length) return;

  const description = duplicateGroups.map((sections) => sections.join(" → ")).join(" | ");
  console.warn("Duplicate Bachelorette page image usage detected:", duplicateGroups);
  toast.warning("Duplicate Bachelorette image usage", { description });
}

const REVIEWS = [
  {
    q: "Hands down the best part of the entire bachelorette weekend. Captain was hilarious, the boat was gorgeous, and the photos on the harbor — unreal. 10/10.",
    n: "Lindsey K., Bride",
    src: "Google",
    stars: 5,
  },
  {
    q: "We did the sunset time slot and it was absolutely perfect. Music, champagne, dolphins on the way back. Every single bridesmaid is still talking about it.",
    n: "Jessica T., MOH",
    src: "TripAdvisor",
    stars: 5,
  },
  {
    q: "They even helped us decorate the boat. So thoughtful. We showed up with mimosas and they handled everything else. Zero stress, all memories.",
    n: "Amber R.",
    src: "Google",
    stars: 5,
  },
];

const FAQ_ITEMS = [
  {
    q: "Can we bring our own alcohol?",
    a: "Yes — BYOB is fully welcome. Bring whatever you like. We provide the cooler, ice, cups, and bottle opener. The boat is licensed for personal consumption.",
  },
  {
    q: "How many people can come?",
    a: "We take groups from 8 up to 23 guests. If your party is smaller, we still give you the full private charter — no strangers added.",
  },
  {
    q: "Can we decorate the boat?",
    a: "Absolutely. Bring banners, balloons, sashes — whatever makes it festive. We ask that nothing is glued or permanently attached. Arrive 20 minutes early to set up.",
  },
  {
    q: "What's the best time of day to book?",
    a: "The 5:30–6:00 PM departure gives you golden hour on the harbour — the light is incredible and dolphins are usually feeding. Morning slots are cooler and great for larger groups.",
  },
  {
    q: "What's included in the price?",
    a: "Private 3-hour charter, USCG-licensed captain, cooler with ice, Bluetooth sound system, harbour and coastline route, and photo-worthy stops. You bring the drinks and the vibe.",
  },
  {
    q: "Where do you depart from?",
    a: "100 Church St, Mt. Pleasant, SC 29464 — Shem Creek, 14 minutes from downtown Charleston. Free public parking nearby. Call (843) 508-1600.",
  },
];

export function BachelorettePage({ onBack, onBook }: { onBack?: () => void; onBook?: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    warnOnDuplicateBacheloretteAssets();
  }, []);

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <LccxHeroBanner
        images={HERO_IMAGES}
        title="Her party."
        accentTitle="Our boat."
        subtitle="Private charter on Charleston Harbour. Your music, your drinks, your squad — and a captain who makes it unforgettable."
        ctaLabel="Book Her Cruise"
        ctaIcon="heart"
        onCta={onBook}
        proofItems={[
          { icon: "users", label: "Up to 23 Guests" },
          { icon: "wineGlasses", label: "BYOB Friendly" },
          { icon: "anchor", label: "Private Charter Only" },
          { icon: "star", label: "500+ Five-Star Reviews" },
        ]}
      />

      <QuickFactsBar items={BACH_QUICK} />

      {/* ── What's Included ───────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "72px 0" }}>
        <Container>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 40px" }}>
            <SectionLabel>Everything Included</SectionLabel>
            <h2 style={{ marginTop: 16 }}>
              Show up. <span style={{ color: "var(--accent)" }}>We handle the rest.</span>
            </h2>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
            className="bach-includes"
          >
            {SHOW_UP_ITEMS.map((item, i) => (
              <div
                key={i}
                className="bach-include-card"
              >
                <img src={item.image} alt="" loading="lazy" decoding="async" />
                <div className="bach-include-overlay" />
                <div className="bach-include-content">
                  <span className="bach-include-icon">
                    <Icon name={item.icon} size={22} color="#fff" />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Btn size="lg" onClick={onBook}>
              Reserve the Boat →
            </Btn>
          </div>
        </Container>
      </section>

      <section className="bach-cta-band" style={{ background: "#fff" }}>
        <Container>
          <div className="bach-cta-inner">
            <p>Planning for a big crew? Lock in your boat before the weekend books up.</p>
            <div>
              <Btn size="sm" onClick={onBook}>Book Now →</Btn>
              <Btn size="sm" variant="secondary" onClick={() => (window.location.href = "tel:+18435081600")}>
                <Icon name="phone" size={14} /> Call
              </Btn>
            </div>
          </div>
        </Container>
      </section>

      <SectionWave from="#fff" to="var(--sand)" height={70} />

      {/* ── Bachelorette Fun ──────────────────────────────────────────────── */}
      <section style={{ background: "var(--sand)", padding: "70px 0 0" }}>
        <Container>
          <div style={{ maxWidth: 620, margin: "0 auto 40px", textAlign: "center" }}>
            <SectionLabel>Let the Bachelorette Fun Begin</SectionLabel>
            <h2 style={{ marginTop: 16 }}>
              Music, drinks, and float-mat moments.
            </h2>
          </div>
          <div className="bach-fun-grid">
            {FUN_ITEMS.map((item) => (
              <article key={item.title} className="bach-fun-card">
                <img src={item.image} alt="" loading="lazy" decoding="async" />
                <div className="bach-fun-copy">
                  <span><Icon name={item.icon} size={18} color="var(--accent)" /></span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--sand)", padding: "70px 0 90px" }}>
        <Container>
          <div style={{ maxWidth: 620, margin: "0 auto 42px", textAlign: "center" }}>
            <SectionLabel>ON THE WATER</SectionLabel>
            <h2 style={{ marginTop: 16 }}>
              Built around the bride, the playlist, and the photos.
            </h2>
          </div>
          <div className="bach-pricing-grid">
            {PRICING_ITEMS.map((item, index) => (
              <article
                key={item.title}
                className="bach-pricing-card"
                style={{ backgroundImage: `url(${HERO_IMAGES[index % HERO_IMAGES.length].src})` }}
              >
                <div className="bach-pricing-card-content">
                  <h3>{item.title}</h3>
                  <p>{item.details}</p>
                  <div className="bach-pricing-card-footer">
                    <strong>{item.price}</strong>
                    <button type="button" onClick={onBook}>Book now</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "82px 0" }}>
        <Container>
          <div style={{ maxWidth: 720, marginBottom: 38 }}>
            <SectionLabel>Why Choose Us</SectionLabel>
            <h2 style={{ marginTop: 16 }}>
              A private Charleston bachelorette cruise built around your squad.
            </h2>
            <p style={{ marginTop: 18, maxWidth: 620, color: "var(--body)" }}>
              Catch the magic of the moment with a celebration made to feel easy, stylish, and completely yours.
            </p>
          </div>
          <div className="bach-why-grid">
            {WHY_CHOOSE_US.map((item) => (
              <article key={item.title} className="bach-why-item">
                <span><Icon name={item.icon} size={18} color="var(--accent)" /></span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bach-cta-band" style={{ background: "#fff" }}>
        <Container>
          <div className="bach-cta-inner">
            <p>Want golden hour, float mats, or a custom stop? Tell us the vibe.</p>
            <div>
              <Btn size="sm" onClick={onBook}>Book Now →</Btn>
              <Btn size="sm" variant="secondary" onClick={() => (window.location.href = "tel:+18435081600")}>
                <Icon name="phone" size={14} /> Call
              </Btn>
            </div>
          </div>
        </Container>
      </section>

      <SectionWave from="#fff" to="var(--navy)" height={80} />

      {/* ── Reviews ───────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--navy)", padding: "100px 0" }}>
        <Container>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 48,
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <h2 style={{ color: "#fff", maxWidth: 380 }}>
              Brides who came back as guests.
            </h2>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Icon
                  key={i}
                  name="star"
                  size={18}
                  color="var(--accent-2)"
                  style={{ fill: "var(--accent-2)" }}
                />
              ))}
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#fff",
                  marginLeft: 8,
                }}
              >
                5.0
              </span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginLeft: 4 }}>
                Google &amp; TripAdvisor
              </span>
            </div>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
            className="bach-reviews"
          >
            {REVIEWS.map((r, i) => (
              <figure
                key={i}
                style={{
                  margin: 0,
                  padding: "32px 28px",
                  borderRadius: 20,
                  background: i === 1 ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <div style={{ display: "flex", gap: 3 }}>
                  {[0, 1, 2, 3, 4].map((j) => (
                    <Icon
                      key={j}
                      name="star"
                      size={13}
                      color="var(--accent-2)"
                      style={{ fill: "var(--accent-2)" }}
                    />
                  ))}
                </div>
                <blockquote
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.72,
                    color: "rgba(255,255,255,0.82)",
                    fontStyle: "italic",
                    flex: 1,
                  }}
                >
                  "{r.q}"
                </blockquote>
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 14,
                      color: "#fff",
                    }}
                  >
                    {r.n}
                  </span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{r.src}</span>
                </div>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <SectionWave from="var(--navy)" to="#fff" height={80} flip />

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "100px 0" }}>
        <Container>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionLabel style={{ justifyContent: "center", marginBottom: 16 }}>FAQ</SectionLabel>
            <h2 style={{ textAlign: "center", marginBottom: 56 }}>
              Everything you need to plan it.
            </h2>
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

      <WeatherBring
        title="Plan the perfect party."
        bringTitle="Bring this aboard"
        bring={BACH_BRING}
        blurb="Live Charleston Harbor conditions. We cruise the calm harbour so the party never stops — and only cancel for unsafe weather (full refund or free reschedule)."
        bg="var(--sand)"
      />

      <MapDirections
        intro="Your private charter casts off from Shem Creek in Mt. Pleasant — about 14 minutes from downtown Charleston across the Ravenel Bridge. Arrive 15 minutes early so you don't miss a minute."
        bg="#fff"
      />

      <SectionWave from="#fff" to="var(--navy)" height={90} />

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--navy)",
          padding: "120px 0",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
          <Placeholder kind="bach1" width="100%" height="100%" position="top center" />
        </div>
        <Container style={{ position: "relative", zIndex: 2 }}>
          <h2
            style={{
              color: "#fff",
              maxWidth: 580,
              margin: "0 auto 18px",
              lineHeight: 1.1,
            }}
          >
            Charleston Harbour is the backdrop she deserves.
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 17,
              maxWidth: 420,
              margin: "0 auto 44px",
              lineHeight: 1.65,
            }}
          >
            Private charter. Golden hour. No strangers. Just her people.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn size="lg" onClick={onBook}>
              Book Her Cruise →
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
          <p style={{ marginTop: 24, fontSize: 13, color: "rgba(255,255,255,0.30)" }}>
            100 Church St, Mt. Pleasant, SC · Free cancellation up to 48 hrs
          </p>
        </Container>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .mobile-icon-strip { justify-content: center !important; gap: 14px !important; padding-left: 8px !important; padding-right: 8px !important; flex-wrap: nowrap !important; }
          .bach-hero-actions { justify-content: flex-start !important; padding-left: 0 !important; padding-right: 0 !important; flex-wrap: wrap !important; }
          .mobile-icon-strip > div { width: 42px; height: 42px; justify-content: center; border: 1px solid rgba(255,255,255,0.18); border-radius: 999px; background: rgba(255,255,255,0.06); font-size: 0 !important; gap: 0 !important; }
          .mobile-icon-strip > div svg { width: 18px; height: 18px; }
          .bach-includes { grid-template-columns: 1fr 1fr !important; }
          .bach-pricing-grid { grid-template-columns: 1fr !important; }
          .bach-reviews { grid-template-columns: 1fr !important; }
          .faq-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .bach-includes { grid-template-columns: 1fr !important; }
        }

        .bach-pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .bach-pricing-card {
          min-height: 220px;
          border-radius: 8px;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          position: relative;
          color: #fff;
          display: flex;
          align-items: flex-end;
          box-shadow: var(--shadow-soft);
        }

        .bach-pricing-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10,27,48,0.12), rgba(10,27,48,0.78));
        }

        .bach-pricing-card-content {
          position: relative;
          z-index: 1;
          width: 100%;
          padding: 18px;
        }

        .bach-pricing-card h3 {
          color: #fff;
          font-size: clamp(18px, 2vw, 22px);
          line-height: 1.08;
          margin: 0 0 8px;
        }

        .bach-pricing-card p {
          color: rgba(255,255,255,0.9);
          font-size: 14px;
          line-height: 1.45;
          margin: 0 0 18px;
        }

        .bach-pricing-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .bach-pricing-card strong {
          color: #fff;
          font-size: 14px;
          line-height: 1.2;
        }

        .bach-pricing-card button {
          border: 0;
          border-radius: 6px;
          background: #1479c9;
          color: #fff;
          cursor: pointer;
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 800;
          padding: 11px 15px;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}
