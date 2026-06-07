import { useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

// RezdyPay publishable key (Stripe). Set VITE_REZDY_STRIPE_PK in env.
// Card data is tokenized client-side and never touches our server (no PCI).
const PUBLISHABLE_KEY = import.meta.env.VITE_REZDY_STRIPE_PK as string | undefined;
const stripePromise = PUBLISHABLE_KEY ? loadStripe(PUBLISHABLE_KEY) : null;

export type CheckoutSession = {
  startTime: string; // "YYYY-MM-DD HH:mm:ss"
  endTime?: string;
  seatsAvailable?: number;
  priceOptions: { label?: string; price?: number }[];
};

type PriceOption = { label: string; price: number };

function fmtMoney(n: number) {
  return `$${n.toFixed(2)}`;
}
function fmtWhen(iso: string) {
  const d = new Date(iso.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function RezdyNativeCheckout(props: {
  productCode: string;
  productLabel: string;
  session: CheckoutSession;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
      style={overlay}
      onClick={props.onClose}
    >
      <div onClick={(e) => e.stopPropagation()} style={card}>
        <div style={header}>
          <strong style={{ color: "var(--navy, #0a1b30)", fontSize: 18 }}>
            Complete your booking
          </strong>
          <button onClick={props.onClose} aria-label="Close" style={closeBtn}>
            ×
          </button>
        </div>
        {stripePromise ? (
          <Elements stripe={stripePromise}>
            <CheckoutForm {...props} />
          </Elements>
        ) : (
          <p style={errStyle}>
            Payment isn't configured yet (missing VITE_REZDY_STRIPE_PK). Add the
            RezdyPay publishable key to enable card payments.
          </p>
        )}
      </div>
    </div>
  );
}

function CheckoutForm({
  productCode,
  productLabel,
  session,
  onClose,
}: {
  productCode: string;
  productLabel: string;
  session: CheckoutSession;
  onClose: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const options: PriceOption[] = useMemo(
    () =>
      (session.priceOptions || [])
        .filter((p) => typeof p.price === "number")
        .map((p) => ({ label: p.label || "Guest", price: p.price as number })),
    [session.priceOptions],
  );

  // Charter products price by group tier ("Group from 1 to 4", "Group of 5"...) —
  // the guest picks ONE tier. Per-person products get a quantity per option.
  const isTiered = options.length > 1 && options.some((o) => /group/i.test(o.label));

  const [tierIndex, setTierIndex] = useState(0);
  const [perOption, setPerOption] = useState<Record<string, number>>(
    options.length === 1 ? { [options[0].label]: 1 } : {},
  );

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const { total, quantities } = useMemo(() => {
    if (isTiered) {
      const t = options[tierIndex];
      return {
        total: t?.price ?? 0,
        quantities: t ? [{ optionLabel: t.label, value: 1 }] : [],
      };
    }
    let sum = 0;
    const q: { optionLabel: string; value: number }[] = [];
    for (const o of options) {
      const n = perOption[o.label] ?? 0;
      if (n > 0) {
        sum += n * o.price;
        q.push({ optionLabel: o.label, value: n });
      }
    }
    return { total: sum, quantities: q };
  }, [isTiered, options, tierIndex, perOption]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!stripe || !elements) return;
    if (quantities.length === 0) {
      setError("Please choose your party size.");
      return;
    }
    if (!first.trim() || !last.trim() || !email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    const cardEl = elements.getElement(CardElement);
    if (!cardEl) {
      setError("Card field not ready. Please try again.");
      return;
    }

    setSubmitting(true);
    try {
      const { token, error: tokErr } = await stripe.createToken(cardEl);
      if (tokErr || !token) {
        setError(tokErr?.message || "Card was declined or invalid.");
        setSubmitting(false);
        return;
      }

      const res = await fetch("/api/public/rezdy-create-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productCode,
          startTimeLocal: session.startTime,
          quantities,
          customer: {
            firstName: first.trim(),
            lastName: last.trim(),
            email: email.trim(),
            phone: phone.trim(),
          },
          cardToken: token.id,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        orderNumber?: string;
        error?: string;
      };
      if (!res.ok || !body.ok) {
        setError(body.error || `Booking failed (${res.status}).`);
        setSubmitting(false);
        return;
      }
      setConfirmation(body.orderNumber || "confirmed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <div style={{ display: "grid", gap: 12 }}>
        <div style={{ fontSize: 40 }}>🎉</div>
        <strong style={{ color: "var(--navy, #0a1b30)", fontSize: 18 }}>
          You're booked!
        </strong>
        <p style={{ color: "var(--body, #444)", margin: 0 }}>
          {productLabel} — {fmtWhen(session.startTime)}.
          {confirmation !== "confirmed" && (
            <>
              {" "}
              Confirmation <strong>#{confirmation}</strong>.
            </>
          )}{" "}
          A confirmation email is on its way.
        </p>
        <button type="button" onClick={onClose} style={primaryBtn}>
          Done
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
      {/* Summary */}
      <div style={summaryBox}>
        <div style={{ fontWeight: 700, color: "var(--navy, #0a1b30)" }}>{productLabel}</div>
        <div style={{ color: "var(--muted, #666)", fontSize: 14 }}>
          {fmtWhen(session.startTime)}
        </div>
      </div>

      {/* Party size / pricing */}
      <div>
        <label style={h4}>{isTiered ? "Your group size" : "Guests"}</label>
        {isTiered ? (
          <select
            value={tierIndex}
            onChange={(e) => setTierIndex(Number(e.target.value))}
            style={input}
          >
            {options.map((o, i) => (
              <option key={o.label} value={i}>
                {o.label} — {fmtMoney(o.price)}
              </option>
            ))}
          </select>
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            {options.map((o) => (
              <div key={o.label} style={qtyRow}>
                <span>
                  {o.label} · {fmtMoney(o.price)}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button
                    type="button"
                    style={stepBtn}
                    onClick={() =>
                      setPerOption((p) => ({
                        ...p,
                        [o.label]: Math.max(0, (p[o.label] ?? 0) - 1),
                      }))
                    }
                  >
                    −
                  </button>
                  <span style={{ minWidth: 18, textAlign: "center" }}>
                    {perOption[o.label] ?? 0}
                  </span>
                  <button
                    type="button"
                    style={stepBtn}
                    onClick={() =>
                      setPerOption((p) => ({
                        ...p,
                        [o.label]: Math.min(
                          session.seatsAvailable ?? 99,
                          (p[o.label] ?? 0) + 1,
                        ),
                      }))
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Guest details */}
      <div style={{ display: "grid", gap: 8 }}>
        <label style={h4}>Your details</label>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            placeholder="First name"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            style={input}
            autoComplete="given-name"
          />
          <input
            placeholder="Last name"
            value={last}
            onChange={(e) => setLast(e.target.value)}
            style={input}
            autoComplete="family-name"
          />
        </div>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
          autoComplete="email"
        />
        <input
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={input}
          autoComplete="tel"
        />
      </div>

      {/* Payment */}
      <div>
        <label style={h4}>Payment</label>
        <div style={cardField}>
          <CardElement options={{ hidePostalCode: false }} />
        </div>
      </div>

      {error && <p style={errStyle}>{error}</p>}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "var(--muted, #666)", fontSize: 14 }}>Total</span>
        <strong style={{ color: "var(--navy, #0a1b30)", fontSize: 22 }}>
          {fmtMoney(total)}
        </strong>
      </div>

      <button type="submit" disabled={submitting || !stripe} style={primaryBtn}>
        {submitting ? "Processing…" : `Pay ${fmtMoney(total)} & Book`}
      </button>
      <p style={{ fontSize: 12, color: "var(--muted, #666)", textAlign: "center", margin: 0 }}>
        Secure payment · You won't leave this site
      </p>
    </form>
  );
}

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 1100,
  background: "rgba(10,27,48,0.72)",
  display: "grid",
  placeItems: "center",
  padding: "clamp(14px, 3vw, 36px)",
};
const card: React.CSSProperties = {
  width: "min(560px, 100%)",
  maxHeight: "calc(100svh - 28px)",
  overflowY: "auto",
  background: "#fff",
  borderRadius: 18,
  padding: 24,
  boxShadow: "0 30px 90px rgba(0,0,0,0.38)",
};
const header: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 16,
};
const summaryBox: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 12,
  background: "var(--sand, #f7f6f2)",
};
const qtyRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 12px",
  border: "1px solid var(--border, #ddd)",
  borderRadius: 10,
};
const cardField: React.CSSProperties = {
  padding: "12px 14px",
  border: "1px solid var(--border, #ddd)",
  borderRadius: 10,
};
const h4: React.CSSProperties = {
  display: "block",
  fontWeight: 700,
  color: "var(--navy, #0a1b30)",
  fontSize: 14,
  marginBottom: 8,
};
const input: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid var(--border, #ddd)",
  fontSize: 16,
};
const stepBtn: React.CSSProperties = {
  width: 30,
  height: 30,
  borderRadius: 8,
  border: "1px solid var(--border, #ddd)",
  background: "#fff",
  cursor: "pointer",
  fontSize: 18,
  lineHeight: 1,
};
const primaryBtn: React.CSSProperties = {
  padding: "14px 18px",
  borderRadius: 999,
  border: 0,
  background: "var(--accent, #ff7a1a)",
  color: "#fff",
  fontWeight: 700,
  fontSize: 16,
  cursor: "pointer",
  width: "100%",
};
const closeBtn: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 999,
  border: "1px solid var(--border, #ddd)",
  background: "var(--sand, #f7f6f2)",
  cursor: "pointer",
  fontSize: 22,
  lineHeight: 1,
};
const errStyle: React.CSSProperties = {
  color: "#b00020",
  background: "#ffeaea",
  padding: "8px 12px",
  borderRadius: 8,
  fontSize: 14,
  margin: 0,
};
