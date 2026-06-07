import { createFileRoute } from "@tanstack/react-router";
import sharkToothHero from "../assets/lccx/fossil-teeth-hand.webp";
import fossilHero from "../assets/lccx/st-fossil-hunt.jpg";
import sunsetHero from "../assets/lccx/ravenel-sunset-close.webp";
import bacheloretteHero from "../assets/lccx/bachelorette-hero-charleston-ai.jpg";
import { LccxHeroBanner } from "../lccx/components/LccxHeroBanner";
import { GroupToursSection, PrivateCharterSection, WhyChooseAndDirections, WildlifeStrip } from "../lccx/components/Tours";
import { AvailabilitySection } from "../lccx/components/Availability";
import { FinalCTA } from "../lccx/components/Contact";
import { Testimonials, GiftCards, FAQ } from "../lccx/components/TourDetail";
import { SectionWave } from "../lccx/components/Primitives";
import { LccxShell, useLccxActions } from "../lccx/LccxShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LowCountry Coastal Excursions | Charleston Tours" },
      {
        name: "description",
        content:
          "Private Charleston boat tours for shark tooth hunts, fossil trips, dolphins, sunsets, and bachelorette cruises.",
      },
      { property: "og:title", content: "LowCountry Coastal Excursions | Charleston Tours" },
      {
        property: "og:description",
        content:
          "Private Lowcountry boat charters from Shem Creek with licensed captains and unforgettable coastal routes.",
      },
      { property: "og:url", content: "https://charlestonsharkteethhunting.com/" },
    ],
    links: [{ rel: "canonical", href: "https://charlestonsharkteethhunting.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "LowCountry Coastal Excursions",
          description:
            "Private Charleston boat tours for shark tooth hunts, fossil trips, dolphins, sunsets, and bachelorette cruises.",
          url: "https://charlestonsharkteethhunting.com/",
          telephone: "+1-843-628-3033",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Shem Creek",
            addressLocality: "Mount Pleasant",
            addressRegion: "SC",
            postalCode: "29464",
            addressCountry: "US",
          },
          areaServed: "Charleston, SC",
          priceRange: "$$",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Where do tours depart from?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "All trips depart from Shem Creek in Mount Pleasant, just minutes from downtown Charleston.",
              },
            },
            {
              "@type": "Question",
              name: "Are tours private?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes — every charter is private to your group with a licensed local captain.",
              },
            },
            {
              "@type": "Question",
              name: "How many guests can come?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We accommodate groups up to 23 guests depending on the vessel and tour.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const actions = useLccxActions();

  return (
    <LccxShell navPage="home" darkNav stickyCta={false}>
      <LccxHeroBanner
        images={[
          {
            src: bacheloretteHero,
            alt: "Bachelorette group celebrating on a Charleston boat day",
            position: "center center",
          },
          {
            src: sunsetHero,
            alt: "Charleston sunset harbor cruise near the Ravenel Bridge",
            position: "center center",
          },
          {
            src: sharkToothHero,
            alt: "Handful of shark teeth found on a Lowcountry fossil hunt",
            position: "center 58%",
          },
          {
            src: fossilHero,
            alt: "Lowcountry fossil hunt finds on the beach",
            position: "center center",
          },
        ]}
        slides={[
          {
            id: "bachelorette",
            src: bacheloretteHero,
            alt: "Bachelorette group celebrating on a Charleston boat day",
            position: "center center",
            title: "Bachelorette",
            accentTitle: "boat days.",
            subtitle:
              "Built around the bride, the playlist, the photos, and a private cruise your crew will remember.",
          },
          {
            id: "sunset",
            src: sunsetHero,
            alt: "Charleston sunset harbor cruise near the Ravenel Bridge",
            position: "center center",
            title: "Sunset Harbor",
            accentTitle: "cruises.",
            subtitle:
              "Golden hour on Charleston Harbor with skyline views, BYOB setup, and an easy private ride.",
          },
          {
            id: "sharktooth",
            src: sharkToothHero,
            alt: "Handful of shark teeth found on a Lowcountry fossil hunt",
            position: "center 58%",
            title: "Shark Tooth",
            accentTitle: "hunting.",
            subtitle:
              "Tide-timed beach stops for megalodon teeth, shells, whale bone, and take-home Lowcountry finds.",
          },
          {
            id: "fossil",
            src: fossilHero,
            alt: "Lowcountry fossil hunt finds on the beach",
            position: "center center",
            title: "Fossil",
            accentTitle: "hunts.",
            subtitle:
              "Walk Lowcountry fossil beds for shark teeth, megalodon finds, shells, and ancient bone.",
          },
        ]}
        title="Private Charleston"
        accentTitle="boat tours."
        subtitle="Shark tooth hunts, fossil trips, dolphins, sunsets, and bachelorette cruises from Shem Creek with licensed local captains."
        ctaLabel="Book Your Trip"
        ctaIcon="anchor"
        onCta={actions.book}
        secondaryCtaLabel="Know More"
        onSecondaryCta={(slide) => actions.details({ id: slide.id ?? "dolphin" })}
        proofItems={[
          { icon: "anchor", label: "Private Charters" },
          { icon: "star", label: "500+ Reviews" },
          { icon: "compass", label: "Shem Creek Departures" },
          { icon: "users", label: "Groups up to 23" },
        ]}
      />
      {/* § 1 — Group Tours: Sunset + Shark Tooth per-person shared */}
      <GroupToursSection />

      {/* § 2 — Private Charters: all 4 tours, whole-boat */}
      <SectionWave from="var(--sand)" to="var(--navy)" height={80} />
      <PrivateCharterSection onBook={actions.book} />

      {/* § 4 — Why Choose Us + Directions / Map */}
      <SectionWave from="var(--navy)" to="#fff" height={80} flip />
      <WhyChooseAndDirections onBook={actions.book} />

      {/* § 5 — Wildlife strip */}
      <SectionWave from="#fff" to="var(--sand)" height={60} />
      <WildlifeStrip />

      {/* § 6 — Live availability with tour pill selector */}
      <SectionWave from="var(--sand)" to="var(--sand)" height={0} />
      <AvailabilitySection onBook={actions.book} />

      {/* § 7 — Testimonials */}
      <SectionWave from="var(--sand)" to="#fff" height={70} flip />
      <Testimonials />

      {/* § 8 — Gift Cards */}
      <SectionWave from="#fff" to="var(--cream)" height={70} />
      <GiftCards onBuy={actions.book} />

      {/* § 9 — FAQ */}
      <SectionWave from="var(--cream)" to="#fff" height={70} flip />
      <FAQ />

      {/* § 10 — Final CTA */}
      <SectionWave from="#fff" to="var(--navy-ink)" height={90} />
      <FinalCTA onBook={actions.book} />
    </LccxShell>
  );
}
