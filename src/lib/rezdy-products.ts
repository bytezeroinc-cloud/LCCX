// Mapping from internal tour ids to Rezdy products, split by how the operator
// sells each experience:
//   - SHARED  = per-person seats on a public departure (cheapest; share the boat)
//   - PRIVATE = the whole boat for your group (tiered by group size)
// A tour can offer one or both. The website shows a Shared/Private toggle when
// both exist. See REZDY-SETUP-SPEC.md for the full FareHarbor→Rezdy mapping.
export type RezdyProduct = { code: string; label: string };

// Optional paid upgrade on a product (e.g. the +$150 private shark-tooth guide).
export type AddOn = { label: string; price: number; optionLabel?: string };

export type TourModes = {
  shared?: RezdyProduct[]; // per-person products
  private?: RezdyProduct[]; // whole-boat products (often several durations)
  addOns?: AddOn[]; // apply to the private charter
};

// Only REAL, existing Rezdy product codes are wired here. Modes that exist in
// FareHarbor but not yet in Rezdy (e.g. Sunset Shared $65, Dolphin Shared) are
// left out until the product is created — see REZDY-SETUP-SPEC.md §B — so the
// site never shows a broken tab.
export const TOUR_MODES: Record<string, TourModes> = {
  // Shark Tooth / Fossil: BOTH modes exist in Rezdy today → full dual-mode.
  sharktooth: {
    shared: [{ code: "PQGU8H", label: "Shared boat" }],
    private: [
      { code: "PBU4S4", label: "Private charter — 3 hours" },
      { code: "PZZRAJ", label: "Private charter — 4 hours" },
    ],
    addOns: [{ label: "Add a private shark-tooth guide", price: 150, optionLabel: "Private Shark-Tooth Guide" }],
  },
  fossil: {
    shared: [{ code: "PQGU8H", label: "Shared boat" }],
    private: [
      { code: "PBU4S4", label: "Private charter — 3 hours" },
      { code: "PZZRAJ", label: "Private charter — 4 hours" },
    ],
    addOns: [{ label: "Add a private shark-tooth guide", price: 150, optionLabel: "Private Shark-Tooth Guide" }],
  },
  // Sunset: private (PFLDUF) + shared per-person PSYCE3 ($65, created 2026-06-05).
  // Shared goes live once LCCX schedules availability for PSYCE3.
  sunset: {
    shared: [{ code: "PSYCE3", label: "Shared boat" }],
    private: [{ code: "PFLDUF", label: "Private charter" }],
  },
  // Dolphin: private (PX8TNQ) + shared per-person P4ASS4 ($55, created 2026-06-05).
  dolphin: {
    shared: [{ code: "P4ASS4", label: "Shared boat" }],
    private: [{ code: "PX8TNQ", label: "Private charter" }],
  },
  // Party cruises: private/whole-boat by nature.
  bachelorette: {
    private: [
      { code: "P0J2KW", label: "Private charter — 2 hours" },
      { code: "PDXBTS", label: "Private charter — 3 hours" },
      { code: "P5LW6H", label: "Private charter — 4 hours" },
    ],
  },
  // Multi-day camp (flat group rate). Not a boat charter — handled as its own thing.
  "kids-fishing-camp": {
    private: [{ code: "PQBVEF", label: "Kid's Fish Camp" }],
  },
};

export function bookingModesForTour(tourId: string): TourModes {
  return TOUR_MODES[tourId] ?? {};
}

// Backwards-compatible flat list (union of all modes) — used to decide whether a
// page has any in-page booking at all.
export function productsForTour(tourId: string): RezdyProduct[] {
  const m = TOUR_MODES[tourId];
  if (!m) return [];
  return [...(m.private ?? []), ...(m.shared ?? [])];
}

export const REZDY_CHECKOUT_BASE = "https://lowcountrycoastalexcursions.securedirectbookings.com";

// Exact Rezdy-hosted (SecureDirectBookings) page paths per product code.
const REZDY_CHECKOUT_SLUG: Record<string, string> = {
  PFLDUF: "sunset-boat-tour-1-5-hours-pPFLDUF.html",
  PX8TNQ: "dolphin-boat-tour-2-hours-pPX8TNQ.html",
  PQGU8H: "morris-island-shark-tooth-fossil-co-charter-trip-4-hour-sandbar-adventure-pPQGU8H.html",
  PBU4S4: "shark-tooth-sea-shell-hunting-tour-3-hours-pPBU4S4.html",
  PZZRAJ: "shark-tooth-sea-shell-hunting-tour-4-hours-pPZZRAJ.html",
  PU5YVD: "charleston-harbor-cruise-2-hours-pPU5YVD.html",
  P0J2KW: "bachelorette-party-cruise-2-hours-pP0J2KW.html",
  PDXBTS: "bachelorette-party-cruise-3-hours-pPDXBTS.html",
  P5LW6H: "bachelorette-party-cruise-4-hours-pP5LW6H.html",
};

export function rezdyCheckoutUrl(productCode: string): string {
  const slug = REZDY_CHECKOUT_SLUG[productCode];
  if (slug) return `${REZDY_CHECKOUT_BASE}/${slug}`;
  return REZDY_CHECKOUT_BASE;
}
