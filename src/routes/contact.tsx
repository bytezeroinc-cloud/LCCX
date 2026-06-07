import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "../lccx/pages/ContactPage";
import { LccxShell, useLccxActions } from "../lccx/LccxShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Book | LowCountry Coastal Excursions" },
      {
        name: "description",
        content:
          "Contact LowCountry Coastal Excursions to book private Charleston boat tours, fossil hunts, sunset cruises, and group charters.",
      },
      { property: "og:title", content: "Contact & Book | LowCountry Coastal Excursions" },
      {
        property: "og:description",
        content:
          "Request a charter, ask about availability, or plan a private Lowcountry coastal excursion.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const actions = useLccxActions();
  return (
    <LccxShell navPage="contact">
      <ContactPage onBack={actions.goHome} onBook={actions.book} />
    </LccxShell>
  );
}
