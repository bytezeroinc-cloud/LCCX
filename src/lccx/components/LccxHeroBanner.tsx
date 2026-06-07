import { useEffect, useState } from "react";
import { Container, Icon } from "./Primitives";

type HeroImage = {
  src: string;
  alt: string;
  position?: string;
};

type HeroSlide = HeroImage & {
  id?: string;
  title: string;
  accentTitle?: string;
  subtitle: string;
};

type ProofItem = {
  icon: string;
  label: string;
};

export function LccxHeroBanner({
  images,
  slides,
  title,
  accentTitle,
  subtitle,
  ctaLabel,
  ctaIcon = "anchor",
  onCta,
  secondaryCtaLabel,
  onSecondaryCta,
  proofItems,
}: {
  images: HeroImage[];
  slides?: HeroSlide[];
  title: string;
  accentTitle?: string;
  subtitle: string;
  ctaLabel: string;
  ctaIcon?: string;
  onCta?: () => void;
  secondaryCtaLabel?: string;
  onSecondaryCta?: (slide: HeroSlide) => void;
  proofItems?: ProofItem[];
}) {
  const heroSlides = slides?.length
    ? slides
    : images.map((image) => ({ ...image, title, accentTitle, subtitle }));
  const [activeSlide, setActiveSlide] = useState(0);
  const active = heroSlides[activeSlide] ?? heroSlides[0];

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section className="lccx-universal-hero bach-hero-section">
      <div
        className="bach-hero-rotator"
        style={{ position: "absolute", inset: 0 }}
        aria-hidden="true"
      >
        {heroSlides.map((image, i) => (
          <img
            key={`${image.src}-${image.title}`}
            src={image.src}
            alt={image.alt}
            width={1600}
            height={960}
            className="bach-hero-slide"
            style={{
              animation: "none",
              opacity: i === activeSlide ? 1 : 0,
              transform: i === activeSlide ? "scale(1.001)" : "scale(1.018)",
              transition: "opacity 900ms var(--ease-out), transform 5200ms linear",
              objectPosition: image.position ?? "center center",
            }}
            decoding={i === 0 ? "sync" : "async"}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
      <div className="lccx-universal-hero-overlay" />

      <div
        className="bach-hero-content"
        style={{ position: "relative", zIndex: 2, marginTop: "auto" }}
      >
        <Container>
          <div
            className="bach-hero-copy"
            style={{ textAlign: "left", paddingTop: 48, marginBottom: 14, maxWidth: 560 }}
          >
            <h1
              className="lccx-universal-hero-title"
              key={`title-${active.title}-${active.accentTitle ?? ""}`}
            >
              {active.title}
              {active.accentTitle ? (
                <>
                  <br />
                  <em>{active.accentTitle}</em>
                </>
              ) : null}
            </h1>
            <p className="lccx-universal-hero-subtitle" key={`subtitle-${active.subtitle}`}>
              {active.subtitle}
            </p>
          </div>

          <div className="mobile-icon-strip bach-hero-actions lccx-universal-hero-actions">
            <button onClick={onCta}>
              <Icon name={ctaIcon} size={16} color="#fff" />
              {ctaLabel}
            </button>
            {secondaryCtaLabel && onSecondaryCta ? (
              <button
                className="lccx-universal-hero-secondary"
                onClick={() => onSecondaryCta(active)}
              >
                <Icon name="compass" size={16} color="#fff" />
                {secondaryCtaLabel}
              </button>
            ) : null}
          </div>

          {proofItems?.length ? (
            <div className="lccx-universal-hero-proof">
              {proofItems.map((item) => (
                <div key={item.label}>
                  <Icon
                    name={item.icon}
                    size={13}
                    color="var(--accent)"
                    style={{ strokeWidth: 2.5 }}
                  />
                  {item.label}
                </div>
              ))}
            </div>
          ) : null}
        </Container>
      </div>
    </section>
  );
}
