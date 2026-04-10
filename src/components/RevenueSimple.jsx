import { useState, useEffect, useRef } from "react";

const fmtINR = (n) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${Math.round(n)}`;
};

function AnimatedNumber({ value, formatter }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  const rafRef = useRef(null);

  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    const startTime = performance.now();
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const animate = (now) => {
      const p = Math.min((now - startTime) / 500, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(start + (end - start) * ease);
      if (p < 1) rafRef.current = requestAnimationFrame(animate);
      else prevRef.current = end;
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  return <span>{formatter(display)}</span>;
}

function Slider({ label, value, min, max, step, onChange, display, color = "#1A56FF" }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.12em",
          color: "#888",
          textTransform: "uppercase",
        }}>{label}</span>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 26,
          fontWeight: 700,
          color: color,
          letterSpacing: "-0.03em",
        }}>{display(value)}</span>
      </div>
      <div style={{ position: "relative", height: 28, display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", left: 0, right: 0, height: 4, background: "#EEE", borderRadius: 4 }} />
        <div style={{ position: "absolute", left: 0, width: `${pct}%`, height: 4, background: color, borderRadius: 4 }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ position: "absolute", width: "100%", height: 28, opacity: 0, cursor: "pointer", zIndex: 2 }}
        />
        <div style={{
          position: "absolute",
          left: `calc(${pct}% - 10px)`,
          width: 20, height: 20,
          borderRadius: "50%",
          background: "#FFF",
          border: `2.5px solid ${color}`,
          boxShadow: "0 1px 6px rgba(0,0,0,0.14)",
          pointerEvents: "none",
        }} />
      </div>
    </div>
  );
}

const TARGETS = [
  { label: "₹10L", value: 1000000 },
  { label: "₹1Cr", value: 10000000 },
  { label: "₹10Cr", value: 100000000 },
  { label: "₹100Cr", value: 1000000000 },
];

export default function RevenueSimple() {
  const [arpu, setArpu] = useState(2000);
  const [customers, setCustomers] = useState(500);
  const [target, setTarget] = useState(10000000);

  const arr = customers * arpu * 12;
  const isAbove = arr >= target;
  const customersNeeded = Math.ceil(target / (arpu * 12));
  const gap = customersNeeded - customers;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FAFAF8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'IBM Plex Mono', monospace",
      padding: "24px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=IBM+Plex+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 0; height: 0; }
      `}</style>

      <div style={{ width: "100%", maxWidth: 480 }}>

        {/* Title */}
        <div style={{ marginBottom: 44 }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.28em",
            color: "#BBB",
            textTransform: "uppercase",
            marginBottom: 8,
          }}>QUERYGEN · ARR CALCULATOR</div>
          <h1 style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "#1A1A1A",
            lineHeight: 1.1,
          }}>How do we<br />get to target?</h1>
        </div>

        {/* Sliders */}
        <Slider
          label="Monthly ARPU"
          value={arpu} min={100} max={20000} step={100}
          onChange={setArpu}
          display={(v) => fmtINR(v) + "/mo"}
          color="#D97706"
        />
        <Slider
          label="Paying Customers"
          value={customers} min={1} max={5000} step={1}
          onChange={setCustomers}
          display={(v) => Math.round(v).toLocaleString()}
          color="#1A56FF"
        />

        {/* Target selector */}
        <div style={{ marginBottom: 36 }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "#888",
            textTransform: "uppercase",
            marginBottom: 12,
          }}>Target ARR</div>
          <div style={{ display: "flex", gap: 8 }}>
            {TARGETS.map((t) => (
              <button
                key={t.value}
                onClick={() => setTarget(t.value)}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  background: target === t.value ? "#1A1A1A" : "#FFF",
                  border: `1px solid ${target === t.value ? "#1A1A1A" : "#DDD"}`,
                  borderRadius: 6,
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  color: target === t.value ? "#FFF" : "#888",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  letterSpacing: "0.04em",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Result card */}
        <div style={{
          padding: "28px 28px",
          background: isAbove ? "#F0FDF4" : "#FFFBEB",
          border: `1.5px solid ${isAbove ? "#BBF7D0" : "#FDE68A"}`,
          borderRadius: 10,
          marginBottom: 16,
        }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: isAbove ? "#16A34A" : "#D97706",
            textTransform: "uppercase",
            marginBottom: 8,
          }}>YOUR ARR</div>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: isAbove ? "#16A34A" : "#D97706",
          }}>
            <AnimatedNumber value={arr} formatter={fmtINR} />
          </div>

          <div style={{
            marginTop: 20,
            paddingTop: 18,
            borderTop: `1px solid ${isAbove ? "#BBF7D0" : "#FDE68A"}`,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}>
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#999", marginBottom: 4 }}>
                CUSTOMERS NEEDED
              </div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 24,
                fontWeight: 700,
                color: "#1A1A1A",
                letterSpacing: "-0.02em",
              }}>
                {customersNeeded.toLocaleString()}
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#AAA", marginTop: 2 }}>
                to hit {fmtINR(target)} ARR
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#999", marginBottom: 4 }}>
                {gap > 0 ? "STILL NEED" : "ABOVE BY"}
              </div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: gap > 0 ? "#DC2626" : "#16A34A",
              }}>
                {Math.abs(gap).toLocaleString()}
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#AAA", marginTop: 2 }}>
                {gap > 0 ? "more customers" : "customers surplus"}
              </div>
            </div>
          </div>
        </div>

        {/* Formula line */}
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          color: "#CCC",
          textAlign: "center",
          letterSpacing: "0.05em",
        }}>
          <span style={{ color: "#1A56FF" }}>{customers.toLocaleString()} customers</span>
          {" × "}
          <span style={{ color: "#D97706" }}>{fmtINR(arpu)}/mo</span>
          {" × 12 = "}
          <span style={{ color: isAbove ? "#16A34A" : "#D97706", fontWeight: 700 }}>{fmtINR(arr)}</span>
        </div>

      </div>
    </div>
  );
}
