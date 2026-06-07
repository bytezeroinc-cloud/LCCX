import { createFileRoute } from "@tanstack/react-router";
import { SunsetPage } from "../lccx/pages/SunsetPage";
import { LccxShell, useLccxActions } from "../lccx/LccxShell";

const SUNSET_JSONLD = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Charleston Sunset Harbor Cruise",
  description:
    "Nightly golden-hour sunset boat cruise on Charleston Harbor. Per-person seats from $65 aboard the Roamer IV — Ravenel Bridge, Fort Sumter, dolphins and the skyline at sunset.",
  touristType: ["Couples", "Families", "Solo travelers", "Groups"],
  provider: {
    "@type": "TravelAgency",
    name: "LowCountry Coastal Excursions",
    telephone: "+1-843-508-1600",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shem Creek",
      addressLocality: "Mt. Pleasant",
      addressRegion: "SC",
      postalCode: "29464",
      addressCountry: "US",
    },
  },
  offers: {
    "@type": "Offer",
    name: "Shared sunset cruise — per person",
    price: "65",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    category: "Per person",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "500",
    bestRating: "5",
  },
};

export const Route = createFileRoute("/sunset")({
  head: () => ({
    meta: [
      { title: "Charleston Sunset Cruise — Boat Tour from $65/Person | LCCX" },
      {
        name: "description",
        content:
          "Charleston's #1 sunset boat tour. Nightly golden-hour harbor cruise from Shem Creek — per-person seats from $65 aboard the Roamer IV. Ravenel Bridge, Fort Sumter, dolphins & BYOB. Book online.",
      },
      {
        name: "keywords",
        content:
          "Charleston sunset cruise, Charleston sunset boat tour, sunset cruise Charleston SC, Charleston harbor sunset cruise, Shem Creek sunset boat tour, BYOB sunset cruise Charleston",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Charleston Sunset Cruise — Boat Tour from $65/Person | LCCX" },
      {
        property: "og:description",
        content:
          "Nightly golden-hour harbor cruise from Shem Creek. Per-person seats from $65 aboard the Roamer IV — Ravenel Bridge, Fort Sumter, dolphins & BYOB.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(SUNSET_JSONLD),
      },
    ],
  }),
  component: Page,
});

function Page() {
  const actions = useLccxActions();
  return (
    <LccxShell navPage="sunset" inPageBooking={false}>
      <SunsetPage onBack={actions.goHome} onBook={actions.book} />
    </LccxShell>
  );
}
