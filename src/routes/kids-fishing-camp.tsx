import { createFileRoute } from "@tanstack/react-router";
import { KidsFishingCampPage } from "../lccx/pages/KidsFishingCampPage";
import { LccxShell, useLccxActions } from "../lccx/LccxShell";

export const Route = createFileRoute("/kids-fishing-camp")({
  head: () => ({
    meta: [
      { title: "Kids Fishing Camp Charleston SC | LCCX" },
      {
        name: "description",
        content:
          "Youth fish camp on Shem Creek for ages 7–13 with fishing skills, boating safety, conservation, and summer sessions in Charleston.",
      },
      { property: "og:title", content: "Kids Fishing Camp Charleston SC | LCCX" },
      {
        property: "og:description",
        content:
          "Hands-on Charleston kids fishing camp from Shem Creek with licensed captains, gear included, and four summer sessions.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const actions = useLccxActions();
  return (
    <LccxShell navPage="kids-fishing-camp" darkNav>
      <KidsFishingCampPage onBook={actions.book} />
    </LccxShell>
  );
}
