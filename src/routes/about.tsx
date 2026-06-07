import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "../lccx/pages/AboutPage";
import { LccxShell, useLccxActions } from "../lccx/LccxShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About LowCountry Coastal Excursions" },
      {
        name: "description",
        content:
          "Meet the licensed captains and Lowcountry values behind private Charleston coastal excursions.",
      },
      { property: "og:title", content: "About LowCountry Coastal Excursions" },
      {
        property: "og:description",
        content:
          "Private Charleston boat tours led by local captains who know the tides, wildlife, and barrier islands.",
      },
      { property: "og:url", content: "https://charlestonsharkteethhunting.com/about" },
    ],
    links: [{ rel: "canonical", href: "https://charlestonsharkteethhunting.com/about" }],
  }),
  component: Page,
});

function Page() {
  const actions = useLccxActions();
  return (
    <LccxShell navPage="about">
      <AboutPage onBack={actions.goHome} onBook={actions.book} />
    </LccxShell>
  );
}
