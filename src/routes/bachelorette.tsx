import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/bachelorette")({
  beforeLoad: () => {
    throw redirect({ to: "/bachelorette-party-cruise", replace: true });
  },
});