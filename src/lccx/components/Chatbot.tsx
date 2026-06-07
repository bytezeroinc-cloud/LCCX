import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Icon } from "./Primitives";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi! I'm your **LowCountry Coastal** concierge ⚓\n\nI can help you pick a tour, answer questions, or guide you through booking. What are you planning?",
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setError(null);
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m) => m !== GREETING).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!resp.ok || !resp.body) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.error || "Couldn't reach the concierge — please try again.");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let assistant = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") continue;
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistant += delta;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: assistant };
                return copy;
              });
            }
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat with concierge"
          style={{
            position: "fixed",
            bottom: 22,
            right: 22,
            zIndex: 9999,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            boxShadow: "0 12px 30px rgba(255,122,26,0.45)",
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Icon name="message" size={26} color="#fff" />
        </button>
      )}

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 22,
            right: 22,
            zIndex: 9999,
            width: "min(380px, calc(100vw - 32px))",
            height: "min(560px, calc(100vh - 120px))",
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 24px 60px rgba(12,35,64,0.28)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: "1px solid var(--border)",
          }}
        >
          <header
            style={{
              background: "var(--navy)",
              color: "#fff",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "var(--accent)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Icon name="anchor" size={16} color="#fff" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14, fontFamily: "var(--font-display)" }}>
                LCCX Concierge
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
                Tours · Booking · Info
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                padding: 4,
              }}
            >
              <Icon name="close" size={18} color="#fff" />
            </button>
          </header>

          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 14px 8px",
              background: "var(--cream)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "86%",
                  background: m.role === "user" ? "var(--accent)" : "#fff",
                  color: m.role === "user" ? "#fff" : "var(--navy)",
                  border: m.role === "user" ? "none" : "1px solid var(--border)",
                  padding: "9px 13px",
                  borderRadius: 14,
                  fontSize: 14,
                  lineHeight: 1.5,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {m.role === "assistant" ? (
                  <div className="lccx-chat-md">
                    <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                  </div>
                ) : (
                  m.content
                )}
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div
                style={{
                  alignSelf: "flex-start",
                  background: "#fff",
                  border: "1px solid var(--border)",
                  padding: "9px 13px",
                  borderRadius: 14,
                  fontSize: 14,
                  color: "var(--muted)",
                }}
              >
                Typing…
              </div>
            )}
            {error && (
              <div
                style={{
                  alignSelf: "stretch",
                  background: "#fdecec",
                  border: "1px solid #f5c2c2",
                  color: "#8a1f1f",
                  padding: "9px 13px",
                  borderRadius: 12,
                  fontSize: 13,
                }}
              >
                {error}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            style={{
              display: "flex",
              gap: 8,
              padding: 12,
              borderTop: "1px solid var(--border)",
              background: "#fff",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about tours, dates, pricing…"
              disabled={loading}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: 999,
                border: "1px solid var(--border)",
                fontSize: 14,
                outline: "none",
                fontFamily: "var(--font-body)",
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "none",
                background: "var(--accent)",
                color: "#fff",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                opacity: loading || !input.trim() ? 0.5 : 1,
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <Icon name="arrow" size={16} color="#fff" />
            </button>
          </form>
        </div>
      )}

      <style>{`
        .lccx-chat-md p { margin: 0 0 6px; }
        .lccx-chat-md p:last-child { margin-bottom: 0; }
        .lccx-chat-md ul, .lccx-chat-md ol { margin: 4px 0 6px; padding-left: 18px; }
        .lccx-chat-md li { margin: 2px 0; }
        .lccx-chat-md strong { color: var(--navy); }
        .lccx-chat-md a { color: var(--accent); text-decoration: underline; }
      `}</style>
    </>
  );
}