import * as React from "react";
import { useState } from "react";
import contactHeroSea from "../../assets/lccx/hero-harbor-golden.png";
import contactHeroBoat from "../../assets/lccx/private-charter.png";
import contactHeroBridge from "../../assets/lccx/ravenel-sunset-close.webp";
import { LccxHeroBanner } from "../components/LccxHeroBanner";
import {
  Icon,
  Btn,
  Container,
  Placeholder,
  SectionLabel,
  SectionWave,
} from "../components/Primitives";

const TOUR_OPTIONS = [
  "Fossil Hunt",
  "Sharktooth Hunting",
  "Bachelorette Party Cruise",
  "Sunset Harbour Cruise",
  "Dolphin Watching",
  "Private Charter",
  "Other / Not sure yet",
];

const CONTACT_INFO = [
  { icon: "pin", head: "Dock Location", body: "100 Church St, Mt. Pleasant, SC 29464" },
  { icon: "phone", head: "Call or Text", body: "(843) 508-1600" },
  { icon: "clock", head: "Hours", body: "Daily 7 AM – 8 PM · Tours run year-round" },
];

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactPage({ onBack, onBook }: { onBack?: () => void; onBook?: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    tour: "",
    guests: "",
    message: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => setFormState("success"), 1200);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: "1.5px solid var(--border)",
    fontFamily: "var(--font-body)",
    fontSize: 15,
    color: "var(--navy)",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 150ms",
  };

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <LccxHeroBanner
        images={[
          { src: contactHeroSea, alt: "Golden Charleston harbor with a private boat", position: "center center" },
          { src: contactHeroBoat, alt: "Private charter boat on calm Charleston water", position: "center center" },
          { src: contactHeroBridge, alt: "Ravenel Bridge sunset over Charleston Harbor", position: "center center" },
        ]}
        title="Let's plan your"
        accentTitle="time on the water."
        subtitle="Questions about a tour, group pricing, custom charters, or a special event? Fill in the form and we'll get back to you within a few hours."
        ctaLabel="Call or Text"
        ctaIcon="phone"
        onCta={() => (window.location.href = "tel:+18435081600")}
        proofItems={[
          { icon: "pin", label: "Shem Creek Dock" },
          { icon: "phone", label: "Call or Text" },
          { icon: "clock", label: "Daily 7 AM – 8 PM" },
          { icon: "anchor", label: "Private Charters" },
        ]}
      />

      <SectionWave from="var(--navy)" to="var(--sand)" height={70} />

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <section style={{ background: "var(--sand)", padding: "80px 0 120px" }}>
        <Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 420px",
              gap: 64,
              alignItems: "start",
            }}
            className="contact-grid"
          >
            {/* ── Form ─────────────────────────────────────────────────── */}
            <div
              style={{
                background: "#fff",
                borderRadius: 24,
                padding: "48px 44px",
                border: "1px solid var(--border)",
                boxShadow: "0 8px 40px -12px rgba(12,35,64,0.12)",
              }}
              className="contact-form-wrap"
            >
              {formState === "success" ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 50,
                      background: "rgba(52,168,83,0.12)",
                      display: "grid",
                      placeItems: "center",
                      margin: "0 auto 24px",
                    }}
                  >
                    <Icon name="check" size={32} color="#1E7A3E" style={{ strokeWidth: 2.5 }} />
                  </div>
                  <h2 style={{ color: "var(--navy)", marginBottom: 12 }}>
                    Message sent!
                  </h2>
                  <p
                    style={{
                      fontSize: 16,
                      color: "var(--body)",
                      lineHeight: 1.65,
                      maxWidth: 360,
                      margin: "0 auto 32px",
                    }}
                  >
                    We'll be in touch within a few hours. For urgent bookings, call us directly at
                    (843) 508-1600.
                  </p>
                  <Btn onClick={() => setFormState("idle")}>Send Another Message</Btn>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <SectionLabel style={{ marginBottom: 8 }}>Send a Message</SectionLabel>
                  <h2 style={{ color: "var(--navy)", marginBottom: 32 }}>
                    We respond same day.
                  </h2>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                      marginBottom: 16,
                    }}
                    className="form-name-row"
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--navy)",
                          marginBottom: 6,
                        }}
                      >
                        Full Name *
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Jane Smith"
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                        onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--navy)",
                          marginBottom: 6,
                        }}
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="(843) 000-0000"
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                        onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--navy)",
                        marginBottom: 6,
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="jane@email.com"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                      marginBottom: 16,
                    }}
                    className="form-tour-row"
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--navy)",
                          marginBottom: 6,
                        }}
                      >
                        Tour Interest
                      </label>
                      <select
                        value={form.tour}
                        onChange={set("tour")}
                        style={{
                          ...inputStyle,
                          appearance: "none",
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230C2340' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 14px center",
                          paddingRight: 36,
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                        onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                      >
                        <option value="">Select a tour…</option>
                        {TOUR_OPTIONS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--navy)",
                          marginBottom: 6,
                        }}
                      >
                        Number of Guests
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="23"
                        value={form.guests}
                        onChange={set("guests")}
                        placeholder="e.g. 4"
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                        onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--navy)",
                        marginBottom: 6,
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Tell us about your group, any special requests, preferred dates, or questions…"
                      style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    style={{
                      width: "100%",
                      padding: "18px 28px",
                      borderRadius: 14,
                      border: 0,
                      cursor: formState === "submitting" ? "wait" : "pointer",
                      background:
                        formState === "submitting" ? "rgba(255,122,26,0.7)" : "var(--accent)",
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: 18,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      transition: "background 200ms",
                    }}
                  >
                    {formState === "submitting" ? (
                      "Sending…"
                    ) : (
                      <>
                        Send Message <Icon name="arrow" size={18} color="#fff" />
                      </>
                    )}
                  </button>

                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      color: "var(--muted)",
                      marginTop: 14,
                    }}
                  >
                    We respond within a few hours · No spam, ever
                  </p>
                </form>
              )}
            </div>

            {/* ── Sidebar ───────────────────────────────────────────────── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Contact details */}
              <div
                style={{
                  background: "var(--navy)",
                  borderRadius: 20,
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
              >
                <h3 style={{ color: "#fff", margin: 0 }}>Prefer to talk?</h3>
                {CONTACT_INFO.map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: "rgba(255,122,26,0.15)",
                        border: "1px solid rgba(255,122,26,0.25)",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon name={c.icon} size={18} color="var(--accent)" />
                    </span>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: 14,
                          color: "rgba(255,255,255,0.50)",
                          textTransform: "uppercase",
                          letterSpacing: ".06em",
                          marginBottom: 4,
                        }}
                      >
                        {c.head}
                      </div>
                      <div style={{ fontSize: 15, color: "#fff", lineHeight: 1.5 }}>{c.body}</div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => (window.location.href = "tel:+18435081600")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    background: "var(--accent)",
                    border: 0,
                    borderRadius: 12,
                    padding: "14px 20px",
                    cursor: "pointer",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  <Icon name="phone" size={17} color="#fff" /> Call (843) 508-1600
                </button>
              </div>

              {/* Map / location image */}
              <div
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  aspectRatio: "4/3",
                  position: "relative",
                }}
              >
                <Placeholder kind="morrisbeach" width="100%" height="100%" />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(12,35,64,0.72) 0%, transparent 55%)",
                  }}
                />
                <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 16,
                      color: "#fff",
                      marginBottom: 4,
                    }}
                  >
                    Shem Creek, Mt. Pleasant
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
                    14 minutes from downtown Charleston
                  </div>
                </div>
              </div>

              {/* Quick book */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "28px 28px",
                  border: "1px solid var(--border)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 17,
                    color: "var(--navy)",
                    marginBottom: 8,
                  }}
                >
                  Ready to book?
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--body)",
                    lineHeight: 1.6,
                    margin: "0 0 20px",
                  }}
                >
                  Skip the form — check real-time availability and lock in your spot.
                </p>
                <Btn style={{ width: "100%", justifyContent: "center" }} onClick={onBook}>
                  Book a Tour →
                </Btn>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <style>{`
        .contact-grid { align-items: start; }
        .contact-form-wrap { padding: 48px 44px; }
        @media (max-width: 960px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .contact-form-wrap { padding: 32px 24px !important; }
          .form-name-row { grid-template-columns: 1fr !important; }
          .form-tour-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
