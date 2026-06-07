import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { SiteNav } from "./components/Nav";
import { SiteFooter, MobileStickyCTA } from "./components/Contact";
import { PromoBanner } from "./components/PromoBanner";
import { RezdyBookingModal } from "./components/RezdyBookingModal";
import { BookingFlow } from "./components/BookingFlow";
import { productsForTour } from "../lib/rezdy-products";

const pageRouteByKey: Record<string, string> = {
  home: "/",
  about: "/about",
  contact: "/contact",
};

const tourRouteById: Record<string, string> = {
  fossil: "/fossil-hunt",
  sharktooth: "/shark-tooth-hunt",
  bachelorette: "/bachelorette-party-cruise",
  sunset: "/sunset",
  dolphin: "/dolphin-watching",
  "kids-fishing-camp": "/kids-fishing-camp",
};

const tourIdByNavPage: Record<string, string> = {
  sunset: "sunset",
  dolphin: "dolphin",
  sharktooth: "sharktooth",
  "shark-tooth-hunt": "sharktooth",
  fossil: "fossil",
  "fossil-hunt": "fossil",
  bachelorette: "bachelorette",
  "bachelorette-party-cruise": "bachelorette",
  "kids-fishing-camp": "kids-fishing-camp",
};

export function resolveTourRoute(tourId: string) {
  return tourRouteById[tourId] ?? tourRouteById.dolphin;
}

export function useLccxActions(openBooking?: () => void) {
  const navigate = useNavigate();

  return {
    goHome: () => navigate({ to: "/" }),
    book: (arg?: { id?: string } | string) => {
      // A tour card passes its tour so the booking opens straight to that tour;
      // a generic "Book Now" passes nothing → the modal shows the tour picker.
      const tourId = typeof arg === "string" ? arg : arg?.id;
      if (typeof window !== "undefined") {
        const bookingEvent = new CustomEvent("lccx:open-booking", {
          detail: tourId ? { tourId } : undefined,
          cancelable: true,
        });
        window.dispatchEvent(bookingEvent);
        if (bookingEvent.defaultPrevented) return;
      }
      if (openBooking) {
        openBooking();
        return;
      }
    },
    details: (tour: { id: string }) => {
      const to = resolveTourRoute(tour.id);
      navigate({ to: to as never });
    },
    navigateKey: (key: string) => {
      if (key === "book") {
        if (typeof window !== "undefined") {
          const bookingEvent = new Event("lccx:open-booking", { cancelable: true });
          window.dispatchEvent(bookingEvent);
          if (bookingEvent.defaultPrevented) return;
        }
        if (openBooking) {
          openBooking();
          return;
        }
        return;
      }
      const to = pageRouteByKey[key] ?? resolveTourRoute(key);
      navigate({ to: to as never });
    },
  };
}

export function LccxShell({
  children,
  navPage = "home",
  darkNav = false,
  stickyCta = true,
  inPageBooking = true,
}: {
  children: ReactNode;
  navPage?: string;
  darkNav?: boolean;
  stickyCta?: boolean;
  // When false, the shell does NOT auto-append the BookingFlow — the page renders
  // its own booking section (wrapped in #lccx-book) wherever it wants it, e.g. the
  // sunset page places the calendar high up and restricts it to per-person seats.
  inPageBooking?: boolean;
}) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingTourId, setBookingTourId] = useState<string>("");
  const actions = useLccxActions(() => setBookingOpen(true));

  // This page's tour (if any). When it has Rezdy products we render the booking
  // experience INLINE on the page and scroll to it — no popup.
  const pageTourId = tourIdByNavPage[navPage] ?? "";
  const hasInPageBooking = inPageBooking && productsForTour(pageTourId).length > 0;

  useEffect(() => {
    const openBooking = (event: Event) => {
      event.preventDefault();
      // Prefer the in-page booking section: scroll to it (computed position is
      // more reliable than scrollIntoView across SSR/route-scroll restoration).
      const el =
        typeof document !== "undefined" ? document.getElementById("lccx-book") : null;
      if (el) {
        // This site's scroll container isn't the window and smooth no-ops here;
        // scrollIntoView (instant) finds the right scroller. scroll-margin-top on
        // the element handles the sticky-header offset. Re-assert on the next tick
        // because a click can reset scroll right after the handler runs.
        el.scrollIntoView({ block: "start", behavior: "auto" });
        setTimeout(() => el.scrollIntoView({ block: "start", behavior: "auto" }), 60);
        return;
      }
      // Fallback (pages without an inline section): open the modal.
      const detail = (event as CustomEvent<{ tourId?: string }>).detail;
      const tid = detail?.tourId ?? tourIdByNavPage[navPage] ?? "";
      setBookingTourId(tid);
      setBookingOpen(true);
    };
    window.addEventListener("lccx:open-booking", openBooking);
    return () => window.removeEventListener("lccx:open-booking", openBooking);
  }, [navPage]);

  return (
    <>
      <PromoBanner onBook={actions.book} />
      <SiteNav page={navPage} onNavigate={actions.navigateKey} dark={darkNav} />
      <main className={`lccx-shell-main lccx-page-${navPage}`}>
        {children}
        {hasInPageBooking && (
          <div id="lccx-book" style={{ scrollMarginTop: 84 }}>
            <BookingFlow tourId={pageTourId} />
          </div>
        )}
      </main>
      <SiteFooter />
      {stickyCta && <MobileStickyCTA onBook={actions.book} />}
      {bookingOpen && (
        <RezdyBookingModal tourId={bookingTourId} onClose={() => setBookingOpen(false)} />
      )}
    </>
  );
}
