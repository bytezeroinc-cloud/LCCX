import { createFileRoute } from "@tanstack/react-router";
import { BachelorettePage } from "../lccx/pages/BachelorettePage";
import { LccxShell, useLccxActions } from "../lccx/LccxShell";

export const Route = createFileRoute("/bachelorette-party-cruise")({
  head: () => ({
    meta: [
      { title: "Charleston Bachelorette Boat Cruise | LCCX" },
      {
        name: "description",
        content:
          "Private Charleston bachelorette boat cruises with sandbar stops, music, skyline views, and golden-hour photos.",
      },
      { property: "og:title", content: "Charleston Bachelorette Boat Cruise | LCCX" },
      {
        property: "og:description",
        content: "Celebrate on a private Lowcountry boat charter built for bachelorette groups.",
      },
    ],
    links: [{ rel: "canonical", href: "https://charlestonsharkteethhunting.com/bachelorette-party-cruise" }],
  }),
  component: Page,
});

function Page() {
  const actions = useLccxActions();
  return (
    <LccxShell navPage="bachelorette" darkNav>
      <BachelorettePage onBack={actions.goHome} onBook={actions.book} />
    </LccxShell>
  );
}
