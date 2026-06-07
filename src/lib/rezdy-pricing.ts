// Party-size → price logic for the two Rezdy pricing models we use:
//  - PER-PERSON: price = guests × per-guest rate (e.g. Shark Tooth: Adult $100).
//  - TIERED / PRIVATE CHARTER: the whole boat is priced by group-size band
//    (e.g. Sunset: "Group from 1 to 4" $375, "Group from 5 to 6" $475,
//    "Group of 7" $525 … up to 11). The total jumps as the group crosses a band.
//
// Both are driven by the same Rezdy session `priceOptions` so the UI can show a
// single "How many guests?" control and price it correctly behind the scenes.

export type PriceOption = { label?: string; price?: number };

export type Tier = { label: string; price: number; min: number; max: number };

export type Pricing =
  | {
      model: "per-person";
      perGuest: number;
      optionLabel: string;
      min: number;
      max: number;
    }
  | {
      model: "tiered";
      tiers: Tier[];
      min: number;
      max: number;
    }
  | { model: "unknown"; min: number; max: number };

export type Quote = {
  total: number; // before any card surcharge
  quantities: { optionLabel: string; value: number }[]; // payload for Rezdy /bookings
  unitLabel?: string; // e.g. "$100 / guest" or the matched tier label
};

// "Group from 1 to 4" → [1,4]; "Group of 5" → [5,5]; "Group from 5 to 6" → [5,6]
function parseRange(label: string): [number, number] | null {
  const l = label.toLowerCase();
  const fromTo = l.match(/(\d+)\s*(?:to|through|–|—|-)\s*(\d+)/);
  if (fromTo) return [Number(fromTo[1]), Number(fromTo[2])];
  const of = l.match(/(?:group of|party of|up to)\s*(\d+)/);
  if (of) return [Number(of[1]), Number(of[1])];
  const bare = l.match(/\b(\d+)\b/);
  if (bare && /group|party|charter|people|guests/.test(l)) {
    const n = Number(bare[1]);
    return [n, n];
  }
  return null;
}

export function analyzePricing(priceOptions: PriceOption[]): Pricing {
  const opts = (priceOptions || []).filter(
    (o): o is { label: string; price: number } =>
      typeof o.price === "number" && typeof o.label === "string",
  );
  if (opts.length === 0) return { model: "unknown", min: 1, max: 1 };

  // Tiered if (almost) every option parses to a group range.
  const ranged = opts
    .map((o) => {
      const r = parseRange(o.label);
      return r ? { label: o.label, price: o.price, min: r[0], max: r[1] } : null;
    })
    .filter(Boolean) as Tier[];

  const looksTiered =
    (opts.length > 1 && ranged.length >= opts.length - 1) ||
    (opts.length === 1 && /group|charter|party/i.test(opts[0].label) && ranged.length === 1);

  if (looksTiered && ranged.length > 0) {
    ranged.sort((a, b) => a.min - b.min);
    return {
      model: "tiered",
      tiers: ranged,
      min: ranged[0].min,
      max: ranged[ranged.length - 1].max,
    };
  }

  // Otherwise per-person: use the first/lowest-priced rate as the per-guest rate.
  const primary = [...opts].sort((a, b) => a.price - b.price)[0];
  return {
    model: "per-person",
    perGuest: primary.price,
    optionLabel: primary.label,
    min: 1,
    max: 99,
  };
}

// Clamp a desired party size into the allowed range for this product.
export function clampParty(pricing: Pricing, desired: number): number {
  const n = Math.round(desired || pricing.min);
  return Math.max(pricing.min, Math.min(pricing.max, n));
}

// Quote a given party size. Returns null if the size can't be priced.
export function quoteForParty(
  priceOptions: PriceOption[],
  partySize: number,
): Quote | null {
  const pricing = analyzePricing(priceOptions);
  const n = clampParty(pricing, partySize);

  if (pricing.model === "per-person") {
    return {
      total: pricing.perGuest * n,
      quantities: [{ optionLabel: pricing.optionLabel, value: n }],
      unitLabel: `$${pricing.perGuest.toFixed(0)} / guest`,
    };
  }

  if (pricing.model === "tiered") {
    // A party size can match more than one band when the operator offers two
    // boats for the same group (e.g. small boat "Group of 8 = $650" AND
    // "Roamer IV 1-12 = $900"). Give the customer the cheapest boat that fits;
    // larger sizes (13-23) only match the bigger boat, so they get it naturally.
    const matching = pricing.tiers.filter((t) => n >= t.min && n <= t.max);
    const tier = matching.length
      ? matching.reduce((best, t) => (t.price < best.price ? t : best))
      : // fall back to nearest tier if no exact band (e.g. gaps)
        pricing.tiers.reduce((best, t) =>
          Math.abs((t.min + t.max) / 2 - n) < Math.abs((best.min + best.max) / 2 - n)
            ? t
            : best,
        );
    if (!tier) return null;
    return {
      total: tier.price,
      // Tiered/charter = one "unit" of the matched band.
      quantities: [{ optionLabel: tier.label, value: 1 }],
      unitLabel: tier.label,
    };
  }

  return null;
}

// Add a card surcharge (e.g. 3% RezdyPay) to a base total.
export function withSurcharge(base: number, surchargePct: number): {
  base: number;
  surcharge: number;
  total: number;
} {
  const surcharge = Math.round(base * surchargePct) / 100;
  return { base, surcharge: +(base * (surchargePct / 100)).toFixed(2), total: +(base + base * (surchargePct / 100)).toFixed(2) };
}
