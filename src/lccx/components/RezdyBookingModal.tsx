import { useMemo, useState } from "react";
import { bookingModesForTour } from "../../lib/rezdy-products";
import { BookingFlow } from "./BookingFlow";

// Generic booking modal — opened by "Book Now" buttons on pages that have no
// inline booking section (e.g. the homepage). It hosts the SAME new BookingFlow
// (with the Private/Shared toggle) used inline on tour pages. When no specific
// tour is given, it first shows a quick tour picker.

const TOUR_PICKER: { id: string; label: string; blurb: string }[] = [
  { id: "sharktooth", label: "Shark Tooth Hunting", blurb: "Barrier-island fossil beds · keep what you find" },
  { id: "fossil", label: "Fossil Hunt", blurb: "Megalodon teeth & 40-million-year-old finds" },
  { id: "sunset", label: "Sunset Cruise", blurb: "Golden-hour harbor cruise" },
  { id: "dolphin", label: "Dolphin Watching", blurb: "Wild dolphins off Shem Creek" },
  { id: "bachelorette", label: "Bachelorette Cruise", blurb: "Your crew, the whole boat" },
  { id: "kids-fishing-camp", label: "Kid's Fishing Camp", blurb: "Multi-day camp for ages 7–13" },
];

function hasBooking(id: string) {
  const m = bookingModesForTour(id);
  return Boolean(m.shared?.length || m.private?.length);
}

export function RezdyBookingModal({
  tourId,
  onClose,
}: {
  tourId: string;
  onClose: () => void;
}) {
  const tours = useMemo(() => TOUR_PICKER.filter((t) => hasBooking(t.id)), []);
  const [picked, setPicked] = useState<string>(tourId && hasBooking(tourId) ? tourId : "");
  const pickedLabel = tours.find((t) => t.id === picked)?.label;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a tour"
      style={overlay}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} style={sheet}>
        <div style={topBar}>
          {picked && !tourId ? (
            <button type="button" onClick={() => setPicked("")} style={backBtn}>
              ‹ All tours
            </button>
          ) : (
            <strong style={{ color: "var(--navy)", fontSize: 16 }}>
              {picked ? pickedLabel : "What would you like to book?"}
            </strong>
          )}
          <button onClick={onClose} aria-label="Close" style={closeBtn}>
            ×
          </button>
        </div>

        {!picked ? (
          <div style={pickerGrid}>
            {tours.map((t) => (
              <button key={t.id} style={tourCard} onClick={() => setPicked(t.id)}>
                <span style={{ fontWeight: 800, color: "var(--navy)", fontSize: 16 }}>{t.label}</span>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>{t.blurb}</span>
                <span style={{ color: "var(--accent)", fontWeight: 800, fontSize: 13, marginTop: 4 }}>
                  Check availability →
                </span>
              </button>
            ))}
          </div>
        ) : (
          <BookingFlow tourId={picked} heading={`Book your ${pickedLabel ?? "trip"}`} />
        )}
      </div>
    </div>
  );
}

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 1000,
  background: "rgba(10,27,48,0.72)",
  display: "grid",
  placeItems: "start center",
  padding: "clamp(10px, 3vw, 32px)",
  overflowY: "auto",
};
const sheet: React.CSSProperties = {
  width: "min(1080px, 100%)",
  background: "var(--white, #fff)",
  borderRadius: 18,
  boxShadow: "0 30px 90px rgba(0,0,0,0.38)",
  overflow: "hidden",
};
const topBar: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 18px",
  borderBottom: "1px solid var(--border)",
  background: "var(--white)",
  position: "sticky",
  top: 0,
  zIndex: 2,
};
const pickerGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: 12,
  padding: "clamp(16px, 3vw, 28px)",
};
const tourCard: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  textAlign: "left",
  padding: "16px 18px",
  borderRadius: "var(--r-card, 14px)",
  border: "1px solid var(--border, #ddd)",
  background: "var(--cream, #fff8f0)",
  cursor: "pointer",
};
const backBtn: React.CSSProperties = {
  background: "none",
  border: 0,
  color: "var(--accent)",
  fontWeight: 800,
  cursor: "pointer",
  fontSize: 14,
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
  color: "var(--navy)",
};
