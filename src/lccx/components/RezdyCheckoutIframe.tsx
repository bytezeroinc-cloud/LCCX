import { useEffect } from "react";

export function RezdyCheckoutIframe({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Secure booking"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1100,
        background: "rgba(10,27,48,0.82)",
        display: "grid",
        placeItems: "center",
        padding: "clamp(0px, 2vw, 24px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "min(960px, 100%)",
          height: "90vh",
          maxHeight: "100svh",
          background: "var(--white, #fff)",
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 30px 90px rgba(0,0,0,0.45)",
          display: "flex",
          flexDirection: "column",
        }}
        className="lccx-rezdy-iframe-shell"
      >
        <button
          onClick={onClose}
          aria-label="Close booking"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 2,
            width: 40,
            height: 40,
            borderRadius: 999,
            border: "none",
            background: "var(--accent, #ff7a1a)",
            color: "#fff",
            fontSize: 24,
            lineHeight: 1,
            cursor: "pointer",
            boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
          }}
        >
          ×
        </button>
        <iframe
          src={url}
          title="Rezdy booking"
          style={{
            flex: 1,
            width: "100%",
            border: 0,
            display: "block",
          }}
          allow="payment *; clipboard-write"
        />
        <div
          style={{
            padding: "8px 14px",
            fontSize: 12,
            color: "var(--muted, #666)",
            textAlign: "center",
            background: "var(--sand, #f7f6f2)",
            borderTop: "1px solid var(--border, #e5e5e5)",
          }}
        >
          Secure booking powered by Rezdy
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .lccx-rezdy-iframe-shell {
            width: 100% !important;
            height: 100svh !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}