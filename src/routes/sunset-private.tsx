import { createFileRoute } from "@tanstack/react-router";
import privateCharter from "../assets/lccx/private-charter.png";
import sunsetHarbor from "../assets/lccx/charleston-sunset.webp";
import sunsetBridge from "../assets/lccx/ravenel-sunset-close.webp";
import { LccxShell, useLccxActions } from "../lccx/LccxShell";
import { LccxHeroBanner } from "../lccx/components/LccxHeroBanner";
import { BookingFlow } from "../lccx/components/BookingFlow";
import { Icon, Btn, Container, SectionLabel } from "../lccx/components/Primitives";

const PHONE = "(843) 508-1600";
const TEL = "+18435081600";

const PERKS = [
  { icon: "anchor", title: "The whole Roamer IV", body: "Up to 23 guests, your party only. No strangers, no shared deck — just your people and the sunset." },
  { icon: "route", title: "Same golden-hour route", body: "Ravenel Bridge, Fort Sumter, Castle Pinckney and the harbour mouth — timed to the best light of the day." },
  { icon: "heart", title: "Made for the big moments", body: "Proposals, anniversaries, birthdays and family reunions. Tell us the occasion and the captain helps plan the moment." },
  { icon: "wineGlasses", title: "BYOB & decorate", body: "Bring your own drinks, food, music and décor. We provide the cooler, ice and cups — you bring the vibe." },
];

export const Route = createFileRoute("/sunset-private")({
  head: () => ({
    meta: [
      { title: "Private Charleston Sunset Charter — Whole Boat from $375 | LCCX" },
      {
        name: "description",
        content:
          "Book the whole boat for your group. Private Charleston sunset charter on the Roamer IV (up to 23 guests) from $375 — same golden-hour harbor route, just your party. BYOB welcome.",
      },
      { property: "og:title", content: "Private Charleston Sunset Charter | LCCX" },
      {
        property: "og:description",
        content:
          "The whole boat, your group, golden hour on Charleston Harbor. Private sunset charter on the Roamer IV from $375.",
      },
    ],
  }),
  component: Page,
});

function PrivateSunsetPage({ onBook }: { onBook?: () => void }) {
  return (
    <div>
      <LccxHeroBanner
        images={[
          { src: privateCharter, alt: "Private sunset charter on Charleston Harbor", position: "center center" },
          { src: sunsetHarbor, alt: "Charleston skyline at sunset from the water", position: "center center" },
          { src: sunsetBridge, alt: "Ravenel Bridge at golden hour", position: "center center" },
        ]}
        title="The whole boat,"
        accentTitle="just your group."
        subtitle="Private sunset charters on the Roamer IV — up to 23 guests, the same golden-hour route, and the harbour entirely to yourselves. From $375."
        ctaLabel="Check private dates"
        ctaIcon="anchor"
        onCta={onBook}
        proofItems={[
          { icon: "anchor", label: "Whole boat · up to 23" },
          { icon: "sun", label: "Timed to Golden Hour" },
          { icon: "heart", label: "Proposals & celebrations" },
          { icon: "star", label: "500+ Five-Star Reviews" },
        ]}
      />

      <section style={{ background: "#fff", padding: "84px 0 40px" }}>
        <Container>
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
            <SectionLabel style={{ justifyContent: "center", marginBottom: 16 }}>
              Private Sunset Charter
            </SectionLabel>
            <h2 style={{ marginBottom: 16 }}>
              Golden hour, <span style={{ color: "var(--accent)" }}>on your terms.</span>
            </h2>
            <p className="lead" style={{ color: "var(--body)", fontSize: 18, lineHeight: 1.7 }}>
              Rather not share the deck? Book the whole Roamer IV for your group. One flat price by group
              size — no per-head charge — for the same nightly golden-hour cruise across Charleston Harbor.
            </p>
          </div>
          <div className="priv-perks">
            {PERKS.map((p) => (
              <div key={p.title} style={{ background: "var(--sand)", borderRadius: "var(--r-card-lg)", padding: "26px 24px" }}>
                <span style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,122,26,0.1)", border: "1px solid rgba(255,122,26,0.18)", display: "grid", placeItems: "center" }}>
                  <Icon name={p.icon} size={20} color="var(--accent)" />
                </span>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, color: "var(--navy)", margin: "14px 0 6px" }}>
                  {p.title}
                </div>
                <p style={{ fontSize: 14, color: "var(--body)", lineHeight: 1.6, margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Private-only booking */}
      <div id="lccx-book" style={{ scrollMarginTop: 84 }}>
        <BookingFlow
          tourId="sunset"
          only={["private"]}
          heading="Pick your private sunset date"
          emptyNote={
            <span>
              No private dates loaded for this month — try “Go to next available date,” or call{" "}
              <a href={`tel:${TEL}`} style={{ color: "var(--accent)", fontWeight: 800 }}>{PHONE}</a> and
              we'll set it up around your schedule.
            </span>
          }
        />
      </div>

      <section style={{ background: "var(--navy)", padding: "72px 0", textAlign: "center" }}>
        <Container>
          <h2 style={{ color: "#fff", maxWidth: 520, margin: "0 auto 16px" }}>
            Just want a seat instead?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, maxWidth: 420, margin: "0 auto 32px", lineHeight: 1.6 }}>
            Solo, a couple, or a small group? Grab per-person seats on tonight's shared sunset cruise from $65.
          </p>
          <Btn as="a" href="/sunset" size="lg">
            <Icon name="sun" size={16} /> Shared sunset cruise →
          </Btn>
        </Container>
      </section>

      <style>{`
        .priv-perks { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        @media (max-width: 900px) { .priv-perks { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px) { .priv-perks { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

function Page() {
  const actions = useLccxActions();
  return (
    <LccxShell navPage="sunset" inPageBooking={false}>
      <PrivateSunsetPage onBook={actions.book} />
    </LccxShell>
  );
}
