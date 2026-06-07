import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import lccxCss from "../lccx/index.css?url";
import { Chatbot } from "../lccx/components/Chatbot";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "LowCountry Coastal Excursions" },
      {
        name: "description",
        content:
          "Private Charleston boat tours, fossil hunts, shark tooth trips, sunset cruises, and coastal charters.",
      },
      { name: "author", content: "LowCountry Coastal Excursions" },
      { property: "og:title", content: "LowCountry Coastal Excursions" },
      {
        property: "og:description",
        content: "Private Lowcountry coastal tours from Shem Creek with licensed local captains.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "LowCountry Coastal Excursions" },
      { name: "twitter:description", content: "Private Lowcountry boat charters from Shem Creek with licensed captains and unforgettable coastal routes." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8e4b2464-9878-40ce-b016-e74ec17d8a62/id-preview-cf661473--82b08a75-ed77-4890-aadf-2739ef6e307f.lovable.app-1777404044649.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8e4b2464-9878-40ce-b016-e74ec17d8a62/id-preview-cf661473--82b08a75-ed77-4890-aadf-2739ef6e307f.lovable.app-1777404044649.png" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "stylesheet",
        href: lccxCss,
      },
    ],
    scripts: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-46TR1B64C5",
        async: true,
      },
      {
        children:
          "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-46TR1B64C5');",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <Chatbot />
    </>
  );
}
