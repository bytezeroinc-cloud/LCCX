// One-off helper: create shared sunset (PSYCE3) availability in Rezdy.
// Usage: node scripts/rezdy-create-sunset-availability.mjs <startISO> <count> [--commit]
//   - Without --commit it creates ONLY the first session (dry/test) and verifies.
//   - With --commit it creates <count> nightly sessions from <startISO>.
import { readFileSync } from "node:fs";

const PRODUCT = "PSYCE3";
const TIME = "18:30:00"; // 6:30 PM departure (per operator)
const DURATION_H = 2; // 2-hour cruise -> 8:30 PM
const SEATS = 23; // Roamer IV capacity
const PRICE_OPTIONS = [{ label: "Adult", price: 65, seatsUsed: 1 }];

const env = readFileSync(new URL("../.env", import.meta.url), "utf8");
const KEY = (env.match(/^REZDY_API_KEY=(.*)$/m)?.[1] || "").trim().replace(/^["']|["']$/g, "");
if (!KEY) { console.error("No REZDY_API_KEY in .env"); process.exit(1); }

const [, , startArg, countArg] = process.argv;
const commit = process.argv.includes("--commit");
const start = startArg || new Date().toISOString().slice(0, 10);
const count = commit ? Number(countArg || 30) : 1;

const pad = (n) => String(n).padStart(2, "0");
function addDays(iso, d) {
  const [y, m, day] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, day + d));
  return `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;
}
const endTime = `${pad(Number(TIME.slice(0, 2)) + DURATION_H)}:${TIME.slice(3)}`;

async function createOne(dateIso) {
  const body = {
    productCode: PRODUCT,
    startTimeLocal: `${dateIso} ${TIME}`,
    endTimeLocal: `${dateIso} ${endTime}`,
    allDay: false,
    seats: SEATS,
    priceOptions: PRICE_OPTIONS,
  };
  const res = await fetch(`https://api.rezdy.com/v1/availability?apiKey=${KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json; try { json = JSON.parse(text); } catch { json = { raw: text.slice(0, 300) }; }
  return { status: res.status, ok: res.ok, requestStatus: json?.requestStatus, body: json };
}

console.log(`${commit ? "COMMIT" : "TEST"} — product ${PRODUCT}, ${count} session(s) @ ${TIME}, ${SEATS} seats, from ${start}`);
let created = 0;
const errors = [];
for (let i = 0; i < count; i++) {
  const d = addDays(start, i);
  const r = await createOne(d);
  if (r.ok && r.requestStatus?.success !== false) {
    created++;
    if (i === 0 || !commit) console.log(`  ✓ ${d} ${TIME} →`, JSON.stringify(r.requestStatus || r.status));
  } else {
    errors.push({ d, status: r.status, err: r.requestStatus?.error || r.body });
    console.log(`  ✗ ${d} →`, r.status, JSON.stringify(r.requestStatus?.error || r.body).slice(0, 200));
    if (!commit) break; // stop early on test failure
  }
}
console.log(`Done. created=${created}, errors=${errors.length}`);
