/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useState } from "react";
import seaPhoto from "../../assets/lccx/6_Water-Tours-52e76a255056a36_52e76b5b-5056-a36a-06b63ef67afd614e.jpg";
import bachPartyPhoto from "../../assets/lccx/bachelorette-party-cruise.png";
import bachelorettePhoto from "../../assets/lccx/bachelorette.webp";
import charlestonSunsetPhoto from "../../assets/lccx/charleston-sunset.webp";
import dolphinsPhoto from "../../assets/lccx/dolphins-morris-island.jpg";
import fishingPhoto from "../../assets/lccx/fishing-flounder.jpg";
import fossilTeethPhoto from "../../assets/lccx/fossil-teeth-hand.webp";
import marshPhoto from "../../assets/lccx/marsh-golden.png";
import morrisShellsPhoto from "../../assets/lccx/morris-island-shells.jpg";
import morrisSunsetPhoto from "../../assets/lccx/morriss-ilsand3.webp";
import privateCharterPhoto from "../../assets/lccx/private-charter.png";
import ravenelSunsetPhoto from "../../assets/lccx/ravenel-sunset-close.webp";
import sunsetMarshPhoto from "../../assets/lccx/sunset-marsh-bridge.jpg";
import wildlifeEaglePhoto from "../../assets/lccx/wildlife-eagle.png";
import wildlifeManateePhoto from "../../assets/lccx/wildlife-manatee.png";
import wildlifePelicanPhoto from "../../assets/lccx/wildlife-pelican.png";
import wildlifeSpoonbillPhoto from "../../assets/lccx/wildlife-spoonbill.png";
import wildlifeTurtlePhoto from "../../assets/lccx/wildlife-turtle.png";
import kidsFishingHeroPhoto from "../../assets/lccx/kids-fishing-camp-hero.jpg";
import kidsFishingCatchPhoto from "../../assets/lccx/kids-fishing-camp-catch.webp";
import kidsFishingBoatPhoto from "../../assets/lccx/kids-fishing-camp-boat.jpeg";

// ── Icon ──────────────────────────────────────────────────────────────────────
const iconPaths: Record<string, React.ReactNode> = {
  anchor: (
    <>
      <circle cx="12" cy="5" r="3" />
      <path d="M12 22V8" />
      <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
    </>
  ),
  waves: (
    <>
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </>
  ),
  fish: (
    <>
      <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z" />
      <path d="M18 12v.5" />
      <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" />
      <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33" />
      <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" />
      <path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" />
    </>
  ),
  leaf: (
    <>
      <path d="M11 20A7 7 0 0 1 4 13C4 7 9 3 20 3c-1 9-5 17-11 17Z" />
      <path d="M8 16c2.5-3.5 5.5-5.5 10-7" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  phone: (
    <>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </>
  ),
  message: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </>
  ),
  star: (
    <>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </>
  ),
  chevron: (
    <>
      <polyline points="9 18 15 12 9 6" />
    </>
  ),
  chevronDown: (
    <>
      <polyline points="6 9 12 15 18 9" />
    </>
  ),
  check: (
    <>
      <polyline points="20 6 9 17 4 12" />
    </>
  ),
  close: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  plus: (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  minus: (
    <>
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  menu: (
    <>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14m-7-7l7 7-7 7" />
    </>
  ),
  arrowDown: (
    <>
      <path d="M12 5v14m-7-7 7 7 7-7" />
    </>
  ),
  gift: (
    <>
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </>
  ),
  shell: (
    <>
      <path d="M12 22c-5-3-9-7-9-13a9 9 0 0 1 18 0c0 6-4 10-9 13z" />
      <path d="M12 22V9M8 15c1-2 2-4 4-6" />
      <path d="M16 15c-1-2-2-4-4-6" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
    </>
  ),
  facebook: (
    <>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </>
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
    </>
  ),
  tiktok: (
    <>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </>
  ),
  play: (
    <>
      <polygon points="5 3 19 12 5 21 5 3" />
    </>
  ),
  camera: (
    <>
      <path d="M14.5 4 16 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l1.5-3h5Z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  heart: (
    <>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="19" r="3" />
      <circle cx="18" cy="5" r="3" />
      <path d="M9 19h5a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-5" />
    </>
  ),
  wineGlasses: (
    <>
      <path d="M8 2H4l.7 7.1A3.32 3.32 0 0 0 8 12a3.32 3.32 0 0 0 3.3-2.9L12 2H8Z" />
      <path d="M6 22h4" />
      <path d="M8 12v10" />
      <path
        d="M20 2h-4l.7 7.1A3.32 3.32 0 0 0 20 12a3.32 3.32 0 0 0 3.3-2.9L24 2h-4Z"
        transform="translate(-3)"
      />
      <path d="M18 12v10" />
      <path d="M16 22h4" />
    </>
  ),
};

export function Icon({
  name,
  size = 20,
  stroke = 2,
  color = "currentColor",
  style,
  className,
}: {
  name: string;
  size?: number;
  stroke?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
      aria-hidden="true"
    >
      {iconPaths[name] || null}
    </svg>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
export function Badge({
  children,
  variant = "sand",
  style,
  className,
}: {
  children: React.ReactNode;
  variant?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  const palette: Record<string, React.CSSProperties> = {
    sand: { background: "var(--sand)", color: "var(--navy)", border: "1px solid var(--border)" },
    orange: { background: "var(--accent)", color: "#fff" },
    navy: { background: "var(--navy)", color: "#fff" },
    white: { background: "#fff", color: "var(--navy)", border: "1px solid var(--border)" },
    outline: {
      background: "transparent",
      color: "#fff",
      border: "1.5px solid rgba(255,255,255,0.4)",
    },
    gold: {
      background: "rgba(232,176,75,0.18)",
      color: "var(--accent-2)",
      border: "1px solid rgba(232,176,75,0.4)",
    },
  };
  return (
    <span
      className={className ? `badge lccx-pill-chip ${className}` : "badge lccx-pill-chip"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 8,
        padding: "7px 14px",
        borderRadius: 50,
        whiteSpace: "normal",
        ...(palette[variant] || {}),
        ...style,
      }}
    >
      {children}
    </span>
  );
}

// ── Button ────────────────────────────────────────────────────────────────────
export function Btn({
  children,
  variant = "primary",
  onDark = false,
  size = "md",
  as: Tag = "button",
  href,
  style,
  className,
  onClick,
  ...rest
}: {
  children: React.ReactNode;
  variant?: string;
  onDark?: boolean;
  size?: string;
  as?: any;
  href?: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: 10,
    padding: size === "sm" ? "8px 18px" : size === "lg" ? "12px 28px" : "10px 24px",
    minHeight: size === "sm" ? 38 : size === "lg" ? 48 : 44,
    borderRadius: 50,
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    fontSize: size === "sm" ? 14 : size === "lg" ? 17 : 16,
    lineHeight: 1,
    border: "2px solid transparent",
    cursor: "pointer",
    textDecoration: "none",
    transition:
      "background 150ms var(--ease-out), color 150ms var(--ease-out), transform 100ms var(--ease-out), border-color 150ms var(--ease-out)",
    whiteSpace: "normal",
    transform: press ? "scale(0.97)" : "scale(1)",
  };
  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: hover ? "var(--accent-hover)" : "var(--accent)",
      color: "#fff",
      boxShadow: hover ? "0 8px 20px rgba(255,122,26,0.35)" : "0 4px 12px rgba(255,122,26,0.22)",
    },
    secondary: onDark
      ? {
          background: hover ? "#fff" : "transparent",
          color: hover ? "var(--navy)" : "#fff",
          borderColor: "#fff",
        }
      : {
          background: hover ? "var(--navy)" : "transparent",
          color: hover ? "#fff" : "var(--navy)",
          borderColor: "var(--navy)",
        },
    ghost: onDark
      ? { background: hover ? "rgba(255,255,255,0.08)" : "transparent", color: "#fff" }
      : { background: hover ? "var(--sand)" : "transparent", color: "var(--navy)" },
  };
  return (
    <Tag
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setPress(false);
      }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      href={href}
      onClick={onClick}
      className={className ? `lccx-pill-cta ${className}` : "lccx-pill-cta"}
      style={{ ...base, ...(variants[variant] || variants.primary), ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ── Chip ──────────────────────────────────────────────────────────────────────
export function Chip({
  children,
  active = false,
  icon,
  onClick,
  style,
}: {
  children: React.ReactNode;
  active?: boolean;
  icon?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "9px 16px",
        borderRadius: 50,
        background: active ? "var(--accent)" : "var(--white)",
        border: active ? "1px solid var(--accent)" : "1px solid var(--border)",
        color: active ? "#fff" : "var(--navy)",
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        fontSize: 14,
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition:
          "background 150ms var(--ease-out), color 150ms var(--ease-out), border-color 150ms var(--ease-out)",
        ...style,
      }}
    >
      {icon && <Icon name={icon} size={14} color={active ? "#fff" : "var(--muted)"} />}
      {children}
    </button>
  );
}

// ── Placeholder / Image ───────────────────────────────────────────────────────
const PHOTO_MAP: Record<string, string> = {
  sea: seaPhoto,
  dolphin: dolphinsPhoto,
  sunset: ravenelSunsetPhoto,
  marsh: marshPhoto,
  family: bachPartyPhoto,
  fish: fishingPhoto,
  fossil: fossilTeethPhoto,
  sharktooth: fossilTeethPhoto,
  boat: privateCharterPhoto,
  harbor: charlestonSunsetPhoto,
  turtle: wildlifeTurtlePhoto,
  pelican: wildlifePelicanPhoto,
  spoonbill: wildlifeSpoonbillPhoto,
  eagle: wildlifeEaglePhoto,
  manatee: wildlifeManateePhoto,
  // Shark tooth page — AI-generated
  stkids: fossilTeethPhoto,
  stboat: seaPhoto,
  sthunt: morrisShellsPhoto,
  stteeth: fossilTeethPhoto,
  morrisdolphin: dolphinsPhoto,
  morrisbeach: morrisShellsPhoto,
  morrissunset: morrisSunsetPhoto,
  bach1: bachPartyPhoto,
  bach2: bachelorettePhoto,
  bach3: bachPartyPhoto,
  sunsetbridge: ravenelSunsetPhoto,
  sunsetmarsh: sunsetMarshPhoto,
  flounder: fishingPhoto,
  kidsfishing: kidsFishingHeroPhoto,
  kidscatch: kidsFishingCatchPhoto,
  kidsboat: kidsFishingBoatPhoto,
};

export function Placeholder({
  kind = "sea",
  width = "100%",
  height = "100%",
  rounded = 0,
  style,
  label,
  caption,
  position = "center",
  loading = "lazy",
}: {
  kind?: string;
  width?: string | number;
  height?: string | number;
  rounded?: number;
  style?: React.CSSProperties;
  label?: string;
  caption?: string;
  position?: string;
  loading?: "lazy" | "eager";
}) {
  const photo = PHOTO_MAP[kind];
  if (photo) {
    return (
      <div
        style={{
          position: "relative",
          width,
          height,
          borderRadius: rounded,
          overflow: "hidden",
          backgroundColor: "#0C2340",
          backgroundImage: `url(${photo})`,
          backgroundSize: "cover",
          backgroundPosition: position,
          backgroundRepeat: "no-repeat",
          ...style,
        }}
      >
        <img
          src={photo}
          alt={label || caption || `${kind} tour image`}
          loading={loading}
          decoding="async"
          fetchPriority={loading === "eager" ? "high" : "auto"}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: position,
            display: "block",
          }}
        />
        {label && (
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: 10,
              padding: "4px 10px",
              borderRadius: 50,
              background: "rgba(0,0,0,0.5)",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: ".04em",
            }}
          >
            {label}
          </div>
        )}
        {caption && (
          <div
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              padding: "4px 10px",
              borderRadius: 50,
              background: "rgba(255,255,255,0.85)",
              color: "var(--navy)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 11,
            }}
          >
            {caption}
          </div>
        )}
      </div>
    );
  }
  // Fallback gradient for unmapped kinds
  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        borderRadius: rounded,
        overflow: "hidden",
        background: "linear-gradient(180deg, #5A8FB0 0%, #1A3A52 100%)",
        ...style,
      }}
    >
      {label && (
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            padding: "4px 10px",
            borderRadius: 50,
            background: "rgba(0,0,0,0.5)",
            color: "#fff",
            fontSize: 11,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

// ── Container ─────────────────────────────────────────────────────────────────
export function Container({
  children,
  style,
  className,
  ...rest
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div className={className ? `container ${className}` : "container"} style={style} {...rest}>
      {children}
    </div>
  );
}

// ── SectionLabel ──────────────────────────────────────────────────────────────
// Smart icon defaults: infer a meaningful icon from the label text so every
// section eyebrow renders with a strategic glyph without touching callsites.
const sectionIconMap: Array<[RegExp, string]> = [
  [/faq|question|answer/i, "message"],
  [/gift/i, "gift"],
  [/guest|review|testimonial|log/i, "star"],
  [/dock|find us|find the|location|address|map/i, "pin"],
  [/contact|send|message/i, "mail"],
  [/availability|book|schedule|calendar|sample|week/i, "calendar"],
  [/safety|safe|first/i, "shield"],
  [/tuition|policy|policies|price|pricing/i, "shield"],
  [/wildlife|see|spot|sight|what you/i, "leaf"],
  [/included|what's|fish camp|glance|notes|learn/i, "check"],
  [/sunset|golden hour|hour/i, "sun"],
  [/charter|expedition|course|tour|choose/i, "compass"],
  [/morris|island|hunt|fossil|tooth|teeth/i, "shell"],
  [/private|matters|why/i, "heart"],
  [/cast off|ready|begin/i, "anchor"],
  [/crew|operate|story|about|who/i, "users"],
  [/special|makes/i, "sparkle"],
  [/parent|kids|family/i, "users"],
  [/bachelorette|fun|water/i, "wineGlasses"],
  [/still|deciding/i, "compass"],
];

function inferSectionIcon(text: string): string {
  for (const [re, name] of sectionIconMap) if (re.test(text)) return name;
  return "waves";
}

export function SectionLabel({
  children,
  color = "var(--accent)",
  icon,
  align = "center",
  style,
}: {
  children: React.ReactNode;
  color?: string;
  icon?: string | null;
  align?: "left" | "center" | "right";
  style?: React.CSSProperties;
}) {
  const labelText = typeof children === "string" ? children : "";
  const iconName =
    icon === null ? null : icon || (labelText ? inferSectionIcon(labelText) : "waves");
  const justify =
    align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start";
  return (
    <div
      className="lccx-section-label"
      data-align={align}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: justify,
        gap: 10,
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        color,
        width: "100%",
        ...style,
      }}
    >
      <span style={{ width: 28, height: 2, background: color, borderRadius: 2, flexShrink: 0 }} />
      {iconName && (
        <Icon name={iconName} size={16} color={color} style={{ flexShrink: 0 }} />
      )}
      <span style={{ minWidth: 0 }}>{children}</span>
    </div>
  );
}

// ── SectionWave ───────────────────────────────────────────────────────────────
export function SectionWave({
  from = "transparent",
  to = "var(--navy)",
  height = 80,
  flip = false,
  style,
}: {
  from?: string;
  to?: string;
  height?: number;
  flip?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: to,
        height,
        marginTop: -1,
        marginBottom: -1,
        lineHeight: 0,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

// ── TideDivider ───────────────────────────────────────────────────────────────
export function TideDivider({
  color = "var(--navy)",
  bg = "transparent",
  flip = false,
  style,
}: {
  color?: string;
  bg?: string;
  flip?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ background: bg, lineHeight: 0, ...style }}>
      <svg
        viewBox="0 0 1440 60"
        width="100%"
        height="40"
        preserveAspectRatio="none"
        style={{ display: "block", transform: flip ? "scaleY(-1)" : "none" }}
      >
        <path
          d="M0 30 Q180 10 360 30 T720 30 T1080 30 T1440 30 V60 H0 Z"
          fill={color}
          opacity=".08"
        />
        <path
          d="M0 35 Q180 18 360 35 T720 35 T1080 35 T1440 35"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          opacity=".35"
        />
      </svg>
    </div>
  );
}
