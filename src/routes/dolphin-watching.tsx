import { createFileRoute } from "@tanstack/react-router";
import { TourDetailPage } from "../lccx/components/TourDetail";
import { LccxShell, useLccxActions } from "../lccx/LccxShell";

export const Route = createFileRoute("/dolphin-watching")({
  head: () => ({
    meta: [
      { title: "Dolphin Watching Tour | LowCountry Coastal Excursions" },
      {
        name: "description",
        content:
          "Private dolphin watching tours through Shem Creek, Charleston Harbor, and Lowcountry wildlife routes.",
      },
      { property: "og:title", content: "Dolphin Watching Tour | LowCountry Coastal Excursions" },
      {
        property: "og:description",
        content:
          "Spot wild dolphins and coastal wildlife with a licensed local captain on a private charter.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const actions = useLccxActions();
  return (
    <LccxShell navPage="dolphin">
      <TourDetailPage tourId="dolphin" onBack={actions.goHome} onBook={actions.book} />
    </LccxShell>
  );
}
