# Rezdy Setup Spec — to match FareHarbor & power Private/Shared booking

**Goal:** make the Rezdy catalog mirror the live FareHarbor offerings so the website can
offer a correct **Private (whole-boat)** vs **Shared (per-person)** choice on each tour.

Source of truth = FareHarbor (pulled 2026-06-05). All prices below are the **base price
(before the 3% card surcharge)**. The website adds the 3% at checkout, matching FareHarbor's
"Final Price."

Legend: ✅ exists & correct · ✏️ exists, needs edit · ➕ create new · ❓ business decision needed

---

## A. Corrections to EXISTING Rezdy products

| Rezdy code | Product | Issue | Fix |
|---|---|---|---|
| `PQGU8H` | Morris Island Shark Tooth & Fossil (shared) | Price is **$100/person** | ✏️ Change to **$125/person** (matches FareHarbor) |
| `PFLDUF` | Sunset Boat Tour | Says **1.5 Hours**; tiers cap at Group 11 = $725 | ✏️ Rename to **2 Hours**; extend tiers (see §C) |
| `PX8TNQ` | Dolphin Boat Tour (2h) | Private tiers cap low, no big-boat tiers | ✏️ Extend tiers (see §C) |
| `PU5YVD` | Charleston Harbor Cruise (2h) | Same | ✏️ Extend tiers (see §C) |
| `P0J2KW/PDXBTS/P5LW6H` | Bachelorette 2/3/4h | Cap at Group 11 = $850, no Roamer IV | ✏️ Add Roamer IV tiers (see §C) |
| `PRR5KY/P3VTES/PMXUWZ` | Bachelor 2/3/4h | Same | ✏️ Add Roamer IV tiers |

---

## B. NEW per-person (Shared) products to create

These power the "Join a shared trip" option. Each is a single **"Person"** price option,
public/shared departures.

| Create | Per-person | Boat capacity | Status |
|---|---|---|---|
| **Sunset Boat Tour – 2 Hours (Shared)** | **$65** | up to 23 | ✅ exists in FareHarbor → just create the Rezdy product |
| Morris Island Shark Tooth & Fossil (Shared) | $125 | 6 | already `PQGU8H` (just fix price, §A) |
| Crab Bank Island Shark Tooth (Shared) | $75 | — | already `PGRNQU` ✅ |
| **Dolphin – Shared (per person)** | **suggest ~$55** (competitor-informed) | up to 23 | ❓ NEW offering — no shared dolphin exists today |
| **Party/Bachelorette – Shared seat** | **❓ set price** | — | ❓ NEW offering — party cruises are private-only today |

> **Decision needed:** Dolphin and Party "shared" don't exist anywhere yet. To offer them
> we need a per-person price from the client.
>
> **Competitor data (June 2026) strongly supports adding a shared DOLPHIN seat:** every
> Charleston dolphin competitor sells per-seat at **$36–$55** (Coastal Expeditions $52,
> Sandlapper $36–52, Flipper Finders ~$55); LCCX currently sells **only** the $375 private
> boat — the biggest revenue gap found. Suggested shared dolphin price: **~$55/person** to
> sit at the top of the competitive band while a private upsell remains.
>
> Party/Bachelorette is genuinely private by nature — keep private-only unless the client
> wants to sell individual seats on a themed party cruise.

---

## C. Private whole-boat tier ladders (the important part)

FareHarbor prices the whole boat by group size, then switches to a **bigger boat ("Roamer IV")**
for 13–23 guests. Every private cruise needs this full ladder in Rezdy.

### C1. Daily cruises — Sunset / Dolphin / Charleston Harbor / Harbor Island Hop
Base covers 1–4 guests, then +$50/guest:

| Group size | Price | | Group size | Price |
|---|---|---|---|---|
| 1–4 | **$375** | | 9 | $625 |
| 5 | $425 | | 10 | $675 |
| 6 | $475 | | 11 | $725 |
| 7 | $525 | | 12 | $775 |
| 8 | $575 | | | |
| **Roamer IV 1–12** | **$900** | | **Roamer IV 13–18** | **$1,100** |
| **Roamer IV 19–23** | **$1,200** | | | |

### C2. Party cruises — Bachelorette / Bachelor / Boat-to-Beach (per duration)
Base covers 1–2 guests, then +$50/guest. Base differs by duration:

| Group size | 2 Hours | 3 Hours | 4 Hours |
|---|---|---|---|
| 1–2 | **$350** | **$450** | **$550** |
| each +1 (3→12) | +$50/guest → $850 @12 | +$50/guest → $950 @12 | +$50/guest → $1,050 @12 |
| Roamer IV 1–12 | $900 | $900 | $900 |
| Roamer IV 13–18 | $1,100 | $1,100 | $1,100 |
| Roamer IV 19–23 | $1,200 | $1,200 | $1,200 |

(Birthday Party = same as Bachelorette but capped at 12, no Roamer IV.)

### C3. Shark Tooth & Sea Shell Hunting (PRIVATE) — `PBU4S4` (3h) / `PZZRAJ` (4h)
Base covers 1–2 guests, +$50 per extra guest, up to 12:

| Guests | 3 Hours | 4 Hours |
|---|---|---|
| 1–2 | **$400** | **$500** |
| 3→12 | +$50 each → $500 @12 | +$50 each → $600 @12 |

➕ **Add-on (both):** optional **"Private guide +$150"** ("Enhance Your Hunt With a Personal Guide").

### C4. Fishing — Inshore / Shark (3h / 4h)
Per-boat, 6 anglers/boat, jumps when a 2nd boat is needed:

| Anglers | 3 Hours | | Anglers | 3 Hours |
|---|---|---|---|---|
| 1–2 | **$450** | | 7–8 | $1,000 |
| 3 | $525 | | 9 | $1,050 |
| 4 | $600 | | 10 | $1,100 |
| 5 | $675 | | 11 | $1,150 |
| 6 | $750 | | 12 | $1,200 |

(4 Hours starts at $550 for 1–2, +$75/angler.)

---

## D. Add-ons / upsells to configure
- **Private guide +$150** on Shark Tooth & Sea Shell (C3) — optional checkbox.
- (Optional, future) gift cards already exist in Rezdy.

---

## E. Per-tour dual-mode readiness for the website

| Tour page | Shared | Private | Ready to launch dual? |
|---|---|---|---|
| **Shark Tooth / Fossil** | $125/pp (`PQGU8H`, fix price) | $400+ (`PBU4S4`/`PZZRAJ`) + guide | ✅ once price fixed |
| **Sunset** | $65/pp (create) | $375+ (`PFLDUF`, extend) | ✅ once shared created + tiers extended |
| **Dolphin** | ❓ needs price + product | $375+ (`PX8TNQ`, extend) | ⏳ private now; shared = client decision |
| **Bachelorette / Party** | ❓ needs price + product | $350+ (extend w/ Roamer IV) | ⏳ private now; shared = client decision |

---

## F. What I build on the website once the above is in Rezdy
1. A **"How do you want to go?"** toggle at the top of each tour page: **Join a shared trip ($X/pp)** vs **Book the whole boat (private, from $Y)** — the calendar + checkout adapt to the chosen mode.
2. **Add-on support** in checkout (e.g. the +$150 private guide).
3. Map each tour → its shared + private Rezdy product codes (in `src/lib/rezdy-products.ts`).
