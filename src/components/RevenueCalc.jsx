import { useState, useEffect, useRef } from "react";

const fmt = (n) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${Math.round(n)}`;
};

const fmtUSD = (n) => {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${Math.round(n)}`;
};

const USD_RATE = 83;

const PRESETS = [
  { label: "Seed Stage", businesses: 5000, addressable: 2, arpu: 500, nrr: 95, geos: 1 },
  { label: "Series A", businesses: 50000, addressable: 5, arpu: 2000, nrr: 105, geos: 2 },
  { label: "Growth", businesses: 200000, addressable: 8, arpu: 5000, nrr: 112, geos: 4 },
  { label: "Scale", businesses: 500000, addressable: 12, arpu: 10000, nrr: 120, geos: 6 },
];

// Light theme tokens
const T = {
  bg: "#FAFAF8",
  surface: "#FFFFFF",
  surfaceAlt: "#F5F5F2",
  border: "#E5E5E0",
  borderStrong: "#D0D0C8",
  text: "#1A1A1A",
  textMid: "#555550",
  textSoft: "#999990",
  textFaint: "#C8C8C0",
  blue: "#1A56FF",
  blueLight: "#EEF2FF",
  blueBorder: "#C5D0FF",
  amber: "#D97706",
  amberLight: "#FFFBEB",
  amberBorder: "#FDE68A",
  green: "#16A34A",
  greenLight: "#F0FDF4",
  greenBorder: "#BBF7D0",
  red: "#DC2626",
  redLight: "#FEF2F2",
};

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  const rafRef = useRef(null);

  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    const duration = 500;
    const startTime = performance.now();
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(start + (end - start) * ease);
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
      else prevRef.current = end;
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  return <span>{fmt(display)}</span>;
}

function Slider({ label, value, min, max, step, onChange, format, unit, description, highlight }) {
  const pct = ((value - min) / (max - min)) * 100;
  const trackColor = highlight ? T.amber : T.blue;
  const trackBg = highlight ? T.amberBorder : T.blueBorder;

  return (
    <div style={{
      padding: "20px 24px",
      borderBottom: `1px solid ${T.border}`,
      background: highlight ? T.amberLight : T.surface,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: highlight ? T.amber : T.textMid,
            textTransform: "uppercase",
            marginBottom: 4,
          }}>{label}</div>
          <div style={{
            fontSize: 11,
            color: T.textSoft,
            fontFamily: "'IBM Plex Mono', monospace",
            maxWidth: 220,
            lineHeight: 1.5,
          }}>{description}</div>
        </div>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 24,
          fontWeight: 700,
          color: highlight ? T.amber : T.text,
          letterSpacing: "-0.03em",
          minWidth: 130,
          textAlign: "right",
        }}>
          {format(value)}{unit}
        </div>
      </div>
      <div style={{ position: "relative", height: 20, display: "flex", alignItems: "center" }}>
        {/* Track background */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: 3,
          background: trackBg, borderRadius: 3,
        }} />
        {/* Fill */}
        <div style={{
          position: "absolute", left: 0, width: `${pct}%`, height: 3,
          background: trackColor, borderRadius: 3,
        }} />
        {/* Hidden input */}
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: "absolute", width: "100%", height: 20,
            opacity: 0, cursor: "pointer", margin: 0, padding: 0, zIndex: 2,
          }}
        />
        {/* Thumb dot */}
        <div style={{
          position: "absolute",
          left: `calc(${pct}% - 9px)`,
          width: 18, height: 18,
          borderRadius: "50%",
          background: T.surface,
          border: `2.5px solid ${trackColor}`,
          boxShadow: `0 1px 4px rgba(0,0,0,0.12)`,
          pointerEvents: "none",
        }} />
      </div>
    </div>
  );
}

function MetricCard({ label, value, sub, accent = T.text }) {
  return (
    <div style={{
      padding: "16px 18px",
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 6,
    }}>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: "0.18em",
        color: T.textSoft,
        textTransform: "uppercase",
        marginBottom: 8,
      }}>{label}</div>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 20,
        fontWeight: 700,
        color: accent,
        letterSpacing: "-0.02em",
        lineHeight: 1,
      }}>{value}</div>
      {sub && <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 10,
        color: T.textSoft,
        marginTop: 5,
      }}>{sub}</div>}
    </div>
  );
}

export default function RevenueCalc() {
  const [businesses, setBusinesses] = useState(50000);
  const [addressable, setAddressable] = useState(5);
  const [arpu, setArpu] = useState(2000);
  const [nrr, setNrr] = useState(105);
  const [geos, setGeos] = useState(2);
  const [targetARR, setTargetARR] = useState(10000000);
  const [activePreset, setActivePreset] = useState(null);
  const [showUSD, setShowUSD] = useState(false);

  const customers = Math.round(businesses * (addressable / 100));
  const tam = customers * arpu * 12 * geos;
  const annualRevenue = tam * (nrr / 100);
  const monthlyRevenue = annualRevenue / 12;
  const customersNeededForTarget = Math.ceil(targetARR / (arpu * 12 * geos * (nrr / 100)));
  const conversionRate = customers > 0 ? ((customersNeededForTarget / customers) * 100).toFixed(1) : 0;
  const arrMultiple = annualRevenue > 0 ? (annualRevenue / targetARR).toFixed(1) : 0;
  const isAboveTarget = annualRevenue >= targetARR;
  const usersFor1M = Math.ceil(1000000 / (arpu * 12 * geos * (nrr / 100)));

  const applyPreset = (preset, idx) => {
    setBusinesses(preset.businesses);
    setAddressable(preset.addressable);
    setArpu(preset.arpu);
    setNrr(preset.nrr);
    setGeos(preset.geos);
    setActivePreset(idx);
  };

  const displayFmt = (n) => showUSD ? fmtUSD(n / USD_RATE) : fmt(n);

  return (
    <div style={{
      minHeight: "100vh",
      background: T.bg,
      color: T.text,
      fontFamily: "'IBM Plex Mono', monospace",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=IBM+Plex+Mono:wght@300;400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${T.bg}; }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 99% { opacity: 0; }
        }
        .live-dot { animation: pulse 2s infinite; }
        .blink { animation: blink 1.2s infinite; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 0; height: 0; }
      `}</style>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "36px 24px" }}>

        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 36,
          paddingBottom: 24,
          borderBottom: `2px solid ${T.border}`,
        }}>
          <div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.28em",
              color: T.blue,
              textTransform: "uppercase",
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              <div className="live-dot" style={{
                width: 6, height: 6, borderRadius: "50%", background: T.blue,
              }} />
              QUERYGEN · REVENUE MODEL
            </div>
            <h1 style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: T.text,
            }}>
              ARR<br />CALCULATOR
            </h1>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
            <button
              onClick={() => setShowUSD(!showUSD)}
              style={{
                background: T.surface,
                border: `1px solid ${T.borderStrong}`,
                borderRadius: 4,
                padding: "6px 14px",
                color: T.textMid,
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.1em",
              }}
            >
              {showUSD ? "₹ INR" : "$ USD"}
            </button>
            <div style={{ display: "flex", gap: 6 }}>
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => applyPreset(p, i)}
                  style={{
                    background: activePreset === i ? T.blueLight : T.surface,
                    border: `1px solid ${activePreset === i ? T.blue : T.borderStrong}`,
                    borderRadius: 4,
                    padding: "5px 11px",
                    color: activePreset === i ? T.blue : T.textSoft,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 9,
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.08em",
                    transition: "all 0.15s",
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main 2-col grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 0 }}>

          {/* LEFT PANEL */}
          <div style={{
            border: `1px solid ${T.border}`,
            borderRadius: "6px 0 0 6px",
            overflow: "hidden",
          }}>
            {/* Panel header */}
            <div style={{
              padding: "12px 24px",
              borderBottom: `1px solid ${T.border}`,
              background: T.surfaceAlt,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: T.textSoft,
                textTransform: "uppercase",
              }}>INPUT VARIABLES</span>
              <div style={{ display: "flex", gap: 5 }}>
                {["#FF5F56","#FFBD2E","#27C93F"].map((c, i) => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
                ))}
              </div>
            </div>

            <Slider
              label="Target Businesses"
              description="WhatsApp-first businesses with teams in target markets"
              value={businesses} min={1000} max={1000000} step={1000}
              onChange={(v) => { setBusinesses(v); setActivePreset(null); }}
              format={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}K` : v}
              unit=""
            />
            <Slider
              label="Addressable %"
              description="% you can reach + convert — pain, willingness to pay, team size"
              value={addressable} min={0.1} max={30} step={0.1}
              onChange={(v) => { setAddressable(v); setActivePreset(null); }}
              format={(v) => v.toFixed(1)}
              unit="%"
            />
            <Slider
              label="Monthly ARPU"
              description={`Blended avg per customer/month${showUSD ? ` · ${fmtUSD(arpu/USD_RATE)}/mo` : ""}`}
              value={arpu} min={100} max={50000} step={100}
              onChange={(v) => { setArpu(v); setActivePreset(null); }}
              format={(v) => fmt(v)}
              unit="/mo"
              highlight={true}
            />
            <Slider
              label="Net Revenue Retention"
              description="Above 100% = expansion. Below 100% = churn-driven shrink"
              value={nrr} min={60} max={150} step={1}
              onChange={(v) => { setNrr(v); setActivePreset(null); }}
              format={(v) => v}
              unit="%"
            />
            <Slider
              label="Geographies"
              description="Markets you operate in. ARPU varies: Dubai ≠ Nagpur"
              value={geos} min={1} max={10} step={1}
              onChange={(v) => { setGeos(v); setActivePreset(null); }}
              format={(v) => v}
              unit="×"
            />

            {/* Target ARR */}
            <div style={{
              padding: "20px 24px",
              background: T.amberLight,
              borderTop: `1px solid ${T.amberBorder}`,
            }}>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: T.amber,
                textTransform: "uppercase",
                marginBottom: 12,
              }}>TARGET ARR</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {[100000, 1000000, 10000000, 100000000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setTargetARR(v)}
                    style={{
                      background: targetARR === v ? T.amber : T.surface,
                      border: `1px solid ${targetARR === v ? T.amber : T.borderStrong}`,
                      borderRadius: 4,
                      padding: "7px 13px",
                      color: targetARR === v ? "#FFF" : T.textMid,
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 10,
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {fmt(v)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div style={{
            borderTop: `1px solid ${T.border}`,
            borderRight: `1px solid ${T.border}`,
            borderBottom: `1px solid ${T.border}`,
            borderRadius: "0 6px 6px 0",
            display: "flex",
            flexDirection: "column",
            background: T.surface,
          }}>
            {/* Panel header */}
            <div style={{
              padding: "12px 24px",
              borderBottom: `1px solid ${T.border}`,
              background: T.surfaceAlt,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: T.textSoft,
                textTransform: "uppercase",
              }}>OUTPUT METRICS</span>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 8,
                color: T.textFaint,
                letterSpacing: "0.15em",
              }}>LIVE <span className="blink">■</span></span>
            </div>

            {/* BIG ARR */}
            <div style={{
              padding: "32px 32px 28px",
              borderBottom: `1px solid ${T.border}`,
              background: isAboveTarget ? T.greenLight : T.amberLight,
              transition: "background 0.4s",
            }}>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: T.textSoft,
                textTransform: "uppercase",
                marginBottom: 10,
              }}>PROJECTED ARR</div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 56,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: isAboveTarget ? T.green : T.amber,
                transition: "color 0.4s",
              }}>
                <AnimatedNumber value={annualRevenue} />
              </div>
              {showUSD && (
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: T.textSoft, marginTop: 6 }}>
                  {fmtUSD(annualRevenue / USD_RATE)} USD
                </div>
              )}
              <div style={{ marginTop: 16, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  color: isAboveTarget ? T.green : T.red,
                  background: isAboveTarget ? T.greenBorder : "#FEE2E2",
                  padding: "4px 10px",
                  borderRadius: 3,
                  letterSpacing: "0.05em",
                }}>
                  {arrMultiple}× target ({fmt(targetARR)})
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: T.textSoft }}>
                  {fmt(monthlyRevenue)}/mo
                </div>
              </div>
            </div>

            {/* Metric grid */}
            <div style={{ padding: "20px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <MetricCard
                label="Addressable Customers"
                value={customers.toLocaleString()}
                sub={`${addressable}% of ${(businesses/1000).toFixed(0)}K`}
              />
              <MetricCard
                label="Annual ARPU"
                value={displayFmt(arpu * 12)}
                sub={`${displayFmt(arpu)}/month × 12`}
              />
              <MetricCard
                label="TAM (Max)"
                value={displayFmt(tam)}
                sub="before NRR adjustment"
                accent={T.blue}
              />
              <MetricCard
                label="NRR Effect"
                value={`${nrr > 100 ? "+" : ""}${(nrr - 100).toFixed(0)}%`}
                sub={nrr > 100 ? "Expansion revenue" : nrr === 100 ? "Neutral" : "Churn drag"}
                accent={nrr > 100 ? T.green : nrr === 100 ? T.textMid : T.red}
              />
            </div>

            {/* TO HIT TARGET */}
            <div style={{
              margin: "0 24px 20px",
              padding: "18px 20px",
              background: T.amberLight,
              border: `1px solid ${T.amberBorder}`,
              borderRadius: 6,
            }}>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: T.amber,
                textTransform: "uppercase",
                marginBottom: 14,
              }}>TO HIT {fmt(targetARR)} ARR</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: T.textSoft, marginBottom: 4 }}>CUSTOMERS NEEDED</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 30, fontWeight: 700, color: T.amber, letterSpacing: "-0.03em" }}>
                    {customersNeededForTarget.toLocaleString()}
                  </div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: T.textSoft, marginTop: 3 }}>
                    {conversionRate}% of addressable
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: T.textSoft, marginBottom: 4 }}>USERS FOR ₹1Cr ARR</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 30, fontWeight: 700, color: T.blue, letterSpacing: "-0.03em" }}>
                    {usersFor1M.toLocaleString()}
                  </div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: T.textSoft, marginTop: 3 }}>
                    at {fmt(arpu)}/mo ARPU
                  </div>
                </div>
              </div>
            </div>

            {/* ARPU sensitivity */}
            <div style={{
              margin: "0 24px 24px",
              padding: "16px 20px",
              background: T.blueLight,
              border: `1px solid ${T.blueBorder}`,
              borderRadius: 6,
            }}>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: T.blue,
                textTransform: "uppercase",
                marginBottom: 12,
              }}>ARPU SENSITIVITY</div>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                {[100, 500, 1000, 2500, 5000, 10000].map((v) => {
                  const isActive = v === arpu;
                  const arr = customers * v * 12 * geos * (nrr / 100);
                  return (
                    <div
                      key={v}
                      onClick={() => { setArpu(v); setActivePreset(null); }}
                      style={{
                        cursor: "pointer",
                        padding: "8px 11px",
                        background: isActive ? T.blue : T.surface,
                        border: `1px solid ${isActive ? T.blue : T.borderStrong}`,
                        borderRadius: 4,
                        transition: "all 0.15s",
                      }}
                    >
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, color: isActive ? "#FFF" : T.text }}>
                        {fmt(v)}/mo
                      </div>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: isActive ? "rgba(255,255,255,0.7)" : T.textSoft, marginTop: 2 }}>
                        {fmt(arr)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Formula bar */}
        <div style={{
          marginTop: 14,
          padding: "13px 20px",
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 6,
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.04em",
          display: "flex",
          gap: 0,
          flexWrap: "wrap",
          alignItems: "center",
        }}>
          <span style={{ color: T.textFaint }}>ARR = </span>
          <span style={{ color: T.blue, fontWeight: 700, marginLeft: 6 }}>{(businesses/1000).toFixed(0)}K biz</span>
          <span style={{ color: T.textFaint, margin: "0 4px" }}>×</span>
          <span style={{ color: T.textMid }}>{addressable}%</span>
          <span style={{ color: T.textFaint, margin: "0 4px" }}>×</span>
          <span style={{ color: T.amber, fontWeight: 700 }}>{fmt(arpu)}/mo</span>
          <span style={{ color: T.textFaint, margin: "0 4px" }}>× 12 ×</span>
          <span style={{ color: T.textMid }}>{geos}geo</span>
          <span style={{ color: T.textFaint, margin: "0 4px" }}>×</span>
          <span style={{ color: nrr >= 100 ? T.green : T.red, fontWeight: 700 }}>{nrr}% NRR</span>
          <span style={{ color: T.textFaint, margin: "0 6px" }}>=</span>
          <span style={{ color: isAboveTarget ? T.green : T.amber, fontWeight: 700, fontSize: 12 }}>{fmt(annualRevenue)}</span>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "space-between",
          padding: "0 2px",
        }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: T.textFaint }}>
            QUERYGEN · REVENUE MODEL · CONFIDENTIAL
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: T.textFaint }}>
            ARPU IS THE LEVER — ₹100 → ₹5K = 50× ON SAME BASE
          </div>
        </div>

      </div>
    </div>
  );
}
