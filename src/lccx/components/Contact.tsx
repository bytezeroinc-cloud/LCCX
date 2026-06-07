import { useState, useEffect } from "react";
import { Icon, Btn, Container, SectionLabel } from "./Primitives";
import { LccxLogo } from "./Nav";

// ── FinalCTA ──────────────────────────────────────────────────────────────────
export function FinalCTA({ onBook }: { onBook?: () => void }) {
  return (
    <section
      style={{
        background: "var(--navy-ink)",
        color: "#fff",
        padding: "90px 0",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <svg
        viewBox="0 0 1440 300"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, opacity: 0.18 }}
      >
        <path
          d="M0 150 Q180 100 360 150 T720 150 T1080 150 T1440 150"
          stroke="var(--accent-2)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M0 180 Q180 140 360 180 T720 180 T1080 180 T1440 180"
          stroke="var(--accent-2)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M0 210 Q180 180 360 210 T720 210 T1080 210 T1440 210"
          stroke="var(--accent-2)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
      <Container style={{ position: "relative", zIndex: 2 }}>
        <SectionLabel color="var(--accent-2)" style={{ justifyContent: "center" }}>
          Ready to Cast Off?
        </SectionLabel>
        <h2
          style={{
            color: "#fff",
            marginTop: 18,
            maxWidth: 760,
            margin: "18px auto 0",
            textAlign: "center",
          }}
        >
          The harbor isn't going anywhere.
          <br />
          <em style={{ fontStyle: "italic", color: "var(--accent-2)" }}>But the tide is.</em>
        </h2>
        <p
          className="lead"
          style={{
            color: "rgba(255,255,255,0.8)",
            marginTop: 22,
            maxWidth: 560,
            margin: "18px auto 0",
            textAlign: "center",
          }}
        >
          Bring your people, your cooler, and your camera. We'll bring the boat, the captain, and
          the Lowcountry.
        </p>
        {/* Contact + map block, merged from former ContactSection */}
        <div
          style={{
            marginTop: 56,
            textAlign: "left",
          }}
        >
          <div
            className="contact-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
              alignItems: "center",
              maxWidth: 1100,
              margin: "0 auto",
            }}
          >
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  {
                    icon: "pin",
                    label: "Shem Creek Marina",
                    sub: "110 Mill St, Mt. Pleasant, SC 29464",
                  },
                  {
                    icon: "phone",
                    label: "(843) 508-1600",
                    sub: "Call or text — fastest response",
                  },
                  {
                    icon: "mail",
                    label: "keith.lccx@gmail.com",
                    sub: "Group inquiries & custom itineraries",
                  },
                  {
                    icon: "clock",
                    label: "Open daily",
                    sub: "Tours depart 7 AM – 8:30 PM · Year-round",
                  },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 50,
                        background: "rgba(255,255,255,0.08)",
                        display: "grid",
                        placeItems: "center",
                        color: "var(--accent-2)",
                        flexShrink: 0,
                      }}
                    >
                      <Icon name={c.icon} size={18} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: 17,
                          color: "#fff",
                        }}
                      >
                        {c.label}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "rgba(255,255,255,0.65)",
                          marginTop: 2,
                        }}
                      >
                        {c.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Embedded Google Map */}
            <div
              style={{
                position: "relative",
                borderRadius: 24,
                overflow: "hidden",
                aspectRatio: "4/3",
                boxShadow: "var(--shadow-lift)",
                background: "#0c2340",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3353.9953563521462!2d-79.8809977!3d32.7923824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e13b90dc93e6aad%3A0x8a4d20748a628aad!2sLowCountry%20Coastal%20Excursions!5e0!3m2!1sen!2sca!4v1777589023649!5m2!1sen!2sca"
                title="LowCountry Coastal Excursions on Google Maps"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              />
            </div>
          </div>

          <div
            style={{
              marginTop: 48,
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Btn size="lg" onClick={onBook}>
              Book Your Charter →
            </Btn>
            <Btn size="lg" variant="secondary" onDark>
              Call (843) 508-1600
            </Btn>
          </div>
        </div>
      </Container>
      <style>{`@media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ── SiteFooter ────────────────────────────────────────────────────────────────
export function SiteFooter() {
  return (
    <footer
      style={{ background: "#081726", color: "rgba(255,255,255,0.75)", padding: "64px 0 28px" }}
    >
      <Container>
        <div
          style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1.2fr", gap: 40 }}
          className="footer-grid"
        >
          <div>
            <LccxLogo color="#fff" />
            <p style={{ fontSize: 14, marginTop: 16, maxWidth: 300, lineHeight: 1.6 }}>
              Private boat tours, dolphin charters, and custom excursions through Charleston Harbor
              and the Lowcountry since 2012.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {[
                { name: "facebook", href: "https://www.facebook.com/lowcountrycoastalexcursions/" },
                { name: "instagram", href: "https://www.instagram.com/lowcountry_coastal_excursions" },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 50,
                    background: "rgba(255,255,255,0.08)",
                    display: "grid",
                    placeItems: "center",
                    color: "#fff",
                  }}
                >
                  <Icon name={s.name} size={16} />
                </a>
              ))}
            </div>
          </div>
          {[
            {
              h: "Tours",
              links: [
                { label: "Bachelorette Cruise", href: "/bachelorette-party-cruise" },
                { label: "Sunset Cruise", href: "/sunset" },
                { label: "Private Sunset Charter", href: "/sunset-private" },
                { label: "Shark Tooth Hunting", href: "/shark-tooth-hunt" },
                { label: "Fossil Hunting", href: "/fossil-hunt" },
                { label: "Kid's Fishing Camp", href: "/kids-fishing-camp" },
              ],
            },
            {
              h: "Plan",
              links: [
                { label: "Availability", href: "/#availability" },
                { label: "Pricing", href: "/#pricing" },
                { label: "FAQ", href: "/#faq" },
                { label: "Gift Cards", href: "/#gift" },
                { label: "What to Bring", href: "/#what-to-bring" },
              ],
            },
            {
              h: "Company",
              links: [
                { label: "About", href: "/about" },
                { label: "Our Captains", href: "/about" },
                { label: "Our Boats", href: "/about" },
                { label: "Press", href: "/about" },
                { label: "Careers", href: "/about" },
              ],
            },
            {
              h: "Contact",
              links: [
                { label: "(843) 508-1600", href: "tel:+18435081600" },
                { label: "keith.lccx@gmail.com", href: "mailto:keith.lccx@gmail.com" },
                { label: "Shem Creek Marina", href: "/contact" },
                { label: "Mt. Pleasant, SC", href: "/contact" },
              ],
            },
          ].map((col) => (
            <div key={col.h}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: 13,
                  marginBottom: 14,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "#fff",
                }}
              >
                {col.h}
              </div>
              {col.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{
                    display: "block",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.62)",
                    textDecoration: "none",
                    padding: "5px 0",
                  }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            marginTop: 48,
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            color: "rgba(255,255,255,0.4)",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <span>© 2026 LowCountry Coastal Excursions · USCG License #1274591</span>
          <span style={{ fontStyle: "italic", color: "var(--accent-2)" }}>
            Tide's high. Let's go.
          </span>
        </div>
      </Container>
      <style>{`
        @media (max-width: 1000px) { .footer-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}

// ── MobileStickyCTA ───────────────────────────────────────────────────────────
export function MobileStickyCTA({ onBook }: { onBook?: () => void }) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const h = () => setShow(window.scrollY > 600);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  if (!show || dismissed) return null;

  return (
    <div
      className="mobile-sticky-cta"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: "#fff",
        borderTop: "1px solid var(--border)",
        padding: "12px 16px",
        boxShadow: "0 -8px 24px rgba(12,35,64,0.08)",
        display: "none",
        gap: 10,
        alignItems: "center",
      }}
    >
      <div className="mobile-sticky-cta-copy" style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 15,
            color: "var(--navy)",
          }}
        >
          Ready to book?
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>From $65 · per seat · BYOB welcome</div>
      </div>
      <Btn size="sm" onClick={onBook} className="mobile-sticky-cta-button">
        Book →
      </Btn>
      <button
        onClick={() => setDismissed(true)}
        style={{
          background: "transparent",
          border: 0,
          color: "var(--muted)",
          cursor: "pointer",
          padding: 4,
        }}
      >
        <Icon name="close" size={16} />
      </button>
      <style>{`
        @media (max-width: 768px) {
          .mobile-sticky-cta {
            display: flex !important;
            align-items: center !important;
            gap: 10px !important;
            padding: 10px 12px calc(10px + env(safe-area-inset-bottom)) !important;
          }
          .mobile-sticky-cta-copy {
            min-width: 0;
          }
          .mobile-sticky-cta-button {
            width: auto !important;
            min-width: 112px !important;
            margin: 0 !important;
          }
        }
        @media (max-width: 420px) {
          .mobile-sticky-cta-copy {
            max-width: 96px;
          }
        }
      `}</style>
    </div>
  );
}
