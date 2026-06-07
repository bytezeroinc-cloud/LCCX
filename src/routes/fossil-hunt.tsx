import { createFileRoute } from "@tanstack/react-router";
import { FossilHuntPage } from "../lccx/pages/FossilHuntPage";
import { LccxShell, useLccxActions } from "../lccx/LccxShell";

export const Route = createFileRoute("/fossil-hunt")({
  head: () => ({
    meta: [
      { title: "Fossil Hunt Tours | LowCountry Coastal Excursions" },
      {
        name: "description",
        content:
          "Private Charleston fossil hunt tours to Lowcountry barrier islands and tidal flats with expert captains.",
      },
      { property: "og:title", content: "Fossil Hunt Tours | LowCountry Coastal Excursions" },
      {
        property: "og:description",
        content:
          "Guided fossil hunting charters timed around tides for families, collectors, and coastal explorers.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const actions = useLccxActions();
  return (
    <LccxShell navPage="fossil">
      <FossilHuntPage onBack={actions.goHome} onBook={actions.book} />
    </LccxShell>
  );
}
