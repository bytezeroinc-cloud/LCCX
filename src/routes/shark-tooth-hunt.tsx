import { createFileRoute } from "@tanstack/react-router";
import { SharkToothPage } from "../lccx/pages/SharkToothPage";
import { LccxShell, useLccxActions } from "../lccx/LccxShell";

export const Route = createFileRoute("/shark-tooth-hunt")({
  head: () => ({
    meta: [
      { title: "Shark Tooth Hunt Charleston | LowCountry Coastal Excursions" },
      {
        name: "description",
        content:
          "Search Morris Island and Lowcountry fossil beds for shark teeth and megalodon finds on a private boat tour.",
      },
      {
        property: "og:title",
        content: "Shark Tooth Hunt Charleston | LowCountry Coastal Excursions",
      },
      {
        property: "og:description",
        content:
          "Private shark tooth hunting charters with tide-timed stops and take-home fossil finds.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const actions = useLccxActions();
  return (
    <LccxShell navPage="sharktooth" stickyCta={false}>
      <SharkToothPage onBack={actions.goHome} onBook={actions.book} />
    </LccxShell>
  );
}
