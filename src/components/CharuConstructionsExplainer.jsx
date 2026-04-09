import { useState, useEffect, useRef } from 'react';
import { useResponsive } from '../hooks/useResponsive';

// ─── Palette ──────────────────────────────────────────────────────────────────
const SLATE    = '#1E293B';
const AMBER    = '#D97706';
const AMBER_LT = '#FEF3C7';
const CREAM    = '#FAFAF8';
const INK      = '#0F172A';
const MUTED    = '#64748B';
const GREEN    = '#059669';
const GREEN_LT = '#D1FAE5';
const RED      = '#DC2626';
const RED_LT   = '#FEE2E2';
const WA_DARK  = '#075E54';
const WA_GREEN = '#25D366';
const WA_BG    = '#ECE5DD';
const WA_OUT   = '#DCF8C6';

// ─── Reveal ───────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const [v, setV] = useState(false);
  const r = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 });
    if (r.current) obs.observe(r.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={r} style={{
      opacity: v ? 1 : 0,
      transform: v ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHead({ label, heading }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: AMBER, marginBottom: 10 }}>
        {label}
      </div>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.15,
        color: INK, margin: 0,
      }}>
        {heading}
      </h2>
    </div>
  );
}

// ─── WhatsApp phone ───────────────────────────────────────────────────────────
function PhoneMock({ groupName, participants, children, tab, setTab }) {
  const { isMobile } = useResponsive();
  return (
    <div style={{
      width: isMobile ? '100%' : 290,
      maxWidth: 290,
      background: '#111',
      borderRadius: 32,
      padding: '6px 6px 10px',
      boxShadow: '0 40px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.08)',
      flexShrink: 0,
    }}>
      <div style={{ background: '#fff', borderRadius: 26, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Status bar */}
        <div style={{ background: WA_DARK, padding: '8px 14px 0', display: 'flex', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ color: '#fff', fontSize: 10, fontWeight: 600 }}>9:47</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <span style={{ color: '#fff', fontSize: 9 }}>●●●</span>
          </div>
        </div>
        {/* Group header */}
        <div style={{ background: WA_DARK, padding: '6px 14px 10px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: AMBER, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
            VC
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 12 }}>{groupName}</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 9, marginTop: 1 }}>{participants} participants</div>
          </div>
        </div>
        {/* Toggle tabs inside phone */}
        {tab !== undefined && (
          <div style={{ background: WA_DARK, padding: '0 10px 8px', flexShrink: 0 }}>
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.25)', borderRadius: 8, padding: 2, gap: 2 }}>
              {['Dispatch Details', 'Fuel Receipts'].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  flex: 1, fontSize: 10, fontWeight: 600, padding: '5px 6px', borderRadius: 6,
                  border: 'none', cursor: 'pointer',
                  background: tab === t ? '#fff' : 'transparent',
                  color: tab === t ? WA_DARK : 'rgba(255,255,255,0.6)',
                  transition: 'all 0.2s ease',
                }}>{t}</button>
              ))}
            </div>
          </div>
        )}
        {/* Chat — fixed height, scrollable */}
        <div style={{
          background: WA_BG,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c9baad' fill-opacity='0.12'%3E%3Cpath d='M0 0h4v4H0zm8 0h4v4H8zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zM4 8h4v4H4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4z'/%3E%3C/g%3E%3C/svg%3E")`,
          padding: '10px 8px',
          height: 340,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}>
          {children}
        </div>
        {/* Input */}
        <div style={{ background: '#f0f0f0', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{ flex: 1, background: '#fff', borderRadius: 20, padding: '6px 12px', fontSize: 11, color: '#aaa' }}>Type a message</div>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: WA_GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#fff' }}>🎤</div>
        </div>
      </div>
    </div>
  );
}

// ─── Incoming bubble ──────────────────────────────────────────────────────────
function InBubble({ sender, text, time, color = '#e91e8c' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '86%' }}>
      <span style={{ fontSize: 10, fontWeight: 700, color, marginLeft: 2, marginBottom: 2 }}>{sender}</span>
      <div style={{
        background: '#fff', borderRadius: '2px 12px 12px 12px',
        padding: '7px 10px', boxShadow: '0 1px 1px rgba(0,0,0,0.08)',
      }}>
        <div style={{ fontSize: 11.5, color: INK, whiteSpace: 'pre-line', lineHeight: 1.55 }}>{text}</div>
        <div style={{ fontSize: 9, color: '#aaa', textAlign: 'right', marginTop: 3 }}>{time}</div>
      </div>
    </div>
  );
}

// ─── Date divider ─────────────────────────────────────────────────────────────
function DateDiv({ label }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <span style={{ background: 'rgba(225,210,196,0.8)', fontSize: 10, color: '#6b5b4e', padding: '2px 10px', borderRadius: 8 }}>
        {label}
      </span>
    </div>
  );
}

// ─── Receipt thermal print ────────────────────────────────────────────────────
function ThermalReceipt({ animated, visible }) {
  const lines = [
    ['Txn No',    '254560-ORGNL'],
    ['Txn ID',    '0000006021409947'],
    ['Veh No',    '5807'],
    ['Date',      '14/02/2026'],
    ['Time',      '09:52:38'],
    ['FP ID / Nzl', '1 / 1'],
    ['Fuel',      'HSD (Diesel)'],
    ['Preset',    '100 L'],
    ['Rate',      '₹90.71 / L'],
    ['Amount',    '₹9,071.00'],
    ['Volume',    '100.00 L'],
  ];
  return (
    <div style={{
      background: '#fafafa',
      border: '1px solid #ddd',
      borderRadius: 4,
      padding: '20px 18px',
      fontFamily: "'Courier New', Courier, monospace",
      boxShadow: '2px 4px 12px rgba(0,0,0,0.08), inset 0 0 0 1px #eee',
      position: 'relative',
      maxWidth: 280,
    }}>
      {/* Perforated top */}
      <div style={{ position: 'absolute', top: -1, left: 0, right: 0, height: 6, backgroundImage: 'radial-gradient(circle at 6px -2px, transparent 4px, #fafafa 4px)', backgroundSize: '12px 6px' }} />
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 14, borderBottom: '1px dashed #ccc', paddingBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>FEDER-ROOT FUEL</div>
        <div style={{ fontSize: 10, color: '#666', marginTop: 2 }}>PETROL PUMP RECEIPT</div>
      </div>

      {/* Number plate */}
      <div style={{
        background: '#FFFDE7', border: '2px solid #F9A825',
        borderRadius: 4, padding: '6px 10px', textAlign: 'center', marginBottom: 14,
      }}>
        <div style={{ fontSize: 10, color: '#888', marginBottom: 1 }}>VEHICLE</div>
        <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: 3, color: '#1a1a1a' }}>MH 49 BZ 5807</div>
      </div>

      {/* Lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {lines.map(([k, v], i) => (
          <div key={k} style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: 10.5, padding: '2px 0',
            borderBottom: k === 'Fuel' ? '1px dashed #ddd' : 'none',
            opacity: animated ? (visible ? 1 : 0) : 1,
            transition: animated ? `opacity 0.3s ease ${i * 0.07}s` : 'none',
          }}>
            <span style={{ color: '#666' }}>{k}</span>
            <span style={{ fontWeight: 700, color: k === 'Amount' ? GREEN : '#111' }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ marginTop: 12, borderTop: '1px dashed #ccc', paddingTop: 10, textAlign: 'center', fontSize: 9, color: '#999', lineHeight: 1.6 }}>
        Thank you for your purchase<br />
        Keep receipt for records
      </div>
      {/* Perforated bottom */}
      <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 6, backgroundImage: 'radial-gradient(circle at 6px 8px, transparent 4px, #fafafa 4px)', backgroundSize: '12px 6px' }} />
    </div>
  );
}

// ─── Extracted data panel ─────────────────────────────────────────────────────
function ExtractedPanel({ visible }) {
  const fields = [
    { label: 'Vehicle',    value: 'MH49BZ5807', icon: '🚛' },
    { label: 'Date',       value: '14 Feb 2026', icon: '📅' },
    { label: 'Volume',     value: '100.0 L', icon: '🛢️' },
    { label: 'Rate/Litre', value: '₹90.71', icon: '💰' },
    { label: 'Total',      value: '₹9,071', icon: '🧾', highlight: true },
    { label: 'Pump',       value: 'Feder-Root, Nzl 1', icon: '⛽' },
  ];
  return (
    <div style={{
      background: '#fff', borderRadius: 14, padding: '20px 22px',
      border: `1.5px solid ${GREEN}44`,
      boxShadow: `0 8px 32px rgba(5,150,105,0.08)`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: GREEN, boxShadow: `0 0 0 3px ${GREEN}30` }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Extracted & Logged
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {fields.map((f, i) => (
          <div key={f.label} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '9px 0', borderBottom: i < fields.length - 1 ? '1px solid #f1f5f9' : 'none',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-8px)',
            transition: `opacity 0.35s ease ${0.15 + i * 0.1}s, transform 0.35s ease ${0.15 + i * 0.1}s`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14 }}>{f.icon}</span>
              <span style={{ fontSize: 12, color: MUTED }}>{f.label}</span>
            </div>
            <span style={{
              fontSize: 13, fontWeight: 700,
              color: f.highlight ? GREEN : INK,
              background: f.highlight ? GREEN_LT : 'transparent',
              padding: f.highlight ? '2px 8px' : '0',
              borderRadius: f.highlight ? 6 : 0,
            }}>{f.value}</span>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 14, padding: '9px 12px',
        background: '#F0FDF4', borderRadius: 8,
        fontSize: 11.5, color: GREEN, fontWeight: 600,
        opacity: visible ? 1 : 0,
        transition: `opacity 0.4s ease 0.85s`,
      }}>
        ✓ Auto-saved to Google Sheets · No manual entry
      </div>
    </div>
  );
}

// ─── Dashboard mock ───────────────────────────────────────────────────────────
const LEADERBOARD = [
  { rank: 1, vehicle: '5182 DC', trips: 4,  weight: '160.6t', payout: '₹17,340', fill: '150L', eff: '2.7',  effColor: MUTED },
  { rank: 2, vehicle: '7140 CT', trips: 3,  weight: '126.5t', payout: '₹13,662', fill: '150L', eff: '5.3',  effColor: MUTED },
  { rank: 3, vehicle: '2899 DC', trips: 3,  weight: '117.5t', payout: '₹12,692', fill: '150L', eff: '4.0',  effColor: MUTED },
  { rank: 4, vehicle: '7210 DC', trips: 3,  weight: '93.9t',  payout: '₹10,137', fill: '100L', eff: '3.0',  effColor: AMBER },
  { rank: 5, vehicle: '2318 DC', trips: 3,  weight: '86.6t',  payout: '₹9,348',  fill: '150L', eff: '7.3',  effColor: RED, flag: true },
  { rank: 6, vehicle: '7077 DC', trips: 2,  weight: '83.8t',  payout: '₹9,049',  fill: '70L',  eff: '—',    effColor: MUTED },
  { rank: 7, vehicle: '7455 BF', trips: 2,  weight: '82.7t',  payout: '₹8,933',  fill: '70L',  eff: '1.4',  effColor: AMBER },
  { rank: 8, vehicle: '2075 BL', trips: 2,  weight: '55.2t',  payout: '₹5,961',  fill: '150L', eff: '5.3',  effColor: MUTED },
  { rank: 9, vehicle: '4578 DC', trips: 1,  weight: '42.8t',  payout: '₹4,618',  fill: '40L',  eff: '—',    effColor: MUTED },
];

function DashboardMock({ activeTab, setActiveTab, expandedRow, setExpandedRow }) {
  const { isMobile } = useResponsive();
  return (
    <div style={{
      background: '#fff', borderRadius: 16,
      boxShadow: '0 4px 32px rgba(0,0,0,0.07)', border: '1px solid #e2e8f0',
      overflow: 'hidden',
    }}>
      {/* Top bar */}
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Charu Construction</div>
          <div style={{ fontSize: 10, color: MUTED }}>Vehicle Tracking · Fri, Mar 27 2026</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['Today', '7D', '30D'].map(t => (
            <button key={t} onClick={() => {}} style={{
              fontSize: 11, padding: '4px 10px', borderRadius: 6,
              background: t === 'Today' ? INK : 'transparent',
              color: t === 'Today' ? '#fff' : MUTED,
              border: '1px solid #e2e8f0', cursor: 'pointer', fontWeight: 600,
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 0, borderBottom: '1px solid #f1f5f9' }}>
        {[
          { label: 'TRIPS',      value: '23',      sub: '9 vehicles',    icon: '📦' },
          { label: 'LOAD',       value: '849.5t',  sub: 'Total tonnes',  icon: '⚖️' },
          { label: 'FUEL',       value: '430.0L',  sub: '₹38,999',       icon: '🔥' },
          { label: 'EFF',        value: '5.3',     sub: 'trips / 100L',  icon: '⚡' },
        ].map((c, i) => (
          <div key={c.label} style={{ padding: '14px 16px', borderRight: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: MUTED, marginBottom: 6 }}>{c.icon} {c.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: INK, lineHeight: 1 }}>{c.value}</div>
            <div style={{ fontSize: 10, color: MUTED, marginTop: 3 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div style={{ padding: '12px 16px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: INK, letterSpacing: '0.06em' }}>VEHICLE LEADERBOARD</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {['Payout', 'Trips', 'Weight'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              fontSize: 10, padding: '3px 8px', borderRadius: 5,
              background: activeTab === t ? INK : '#f8fafc',
              color: activeTab === t ? '#fff' : MUTED,
              border: 'none', cursor: 'pointer', fontWeight: 600,
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Header row */}
      <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '20px 1fr 70px 56px 16px' : '20px 60px 36px 58px 70px 44px 56px 16px',
        gap: 0, padding: '4px 16px 6px', background: '#f8fafc',
      }}>
        {(isMobile
          ? ['#', 'VEHICLE', 'PAYOUT', 'EFF', '']
          : ['#', 'VEHICLE', 'TRIPS', 'WEIGHT', 'PAYOUT', 'FILL', 'EFF', '']
        ).map(h => (
          <span key={h} style={{ fontSize: 8.5, fontWeight: 700, color: MUTED, letterSpacing: '0.07em' }}>{h}</span>
        ))}
      </div>

      {LEADERBOARD.map((row, i) => (
        <div key={row.vehicle}>
          <div
            onClick={() => setExpandedRow(expandedRow === i ? null : i)}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '20px 1fr 70px 56px 16px' : '20px 60px 36px 58px 70px 44px 56px 16px',
              gap: 0, padding: '9px 16px',
              borderTop: '1px solid #f8fafc',
              background: row.flag ? `${AMBER}10` : expandedRow === i ? '#f8fafc' : '#fff',
              border: row.flag ? `1px solid ${AMBER}40` : expandedRow === i ? `1px solid #e2e8f0` : '1px solid transparent',
              borderRadius: row.flag ? 6 : 0,
              margin: row.flag ? '2px 8px' : 0,
              cursor: 'pointer',
              transition: 'background 0.2s',
              position: 'relative',
            }}
          >
            <span style={{ fontSize: 10, color: MUTED }}>{row.rank}</span>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: INK }}>{row.vehicle}</span>
            {!isMobile && <span style={{ fontSize: 11, color: INK, textAlign: 'center' }}>{row.trips}</span>}
            {!isMobile && <span style={{ fontSize: 11, color: MUTED }}>{row.weight}</span>}
            <span style={{ fontSize: 11, fontWeight: 600, color: GREEN }}>{row.payout}</span>
            {!isMobile && <span style={{ fontSize: 11, color: '#3B82F6' }}>{row.fill}</span>}
            <span style={{ fontSize: 11, fontWeight: 700, color: row.effColor }}>{row.eff}</span>
            <span style={{ fontSize: 11, color: MUTED, textAlign: 'right' }}>
              {expandedRow === i ? '▲' : '▼'}
            </span>
            {row.flag && (
              <div style={{
                position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
                background: RED, color: '#fff', fontSize: 8, fontWeight: 700,
                padding: '2px 5px', borderRadius: 3, letterSpacing: '0.04em',
              }}>⚠ ANOMALY</div>
            )}
          </div>

          {/* Expanded row */}
          {expandedRow === i && (
            <div style={{
              margin: '0 8px 4px', padding: '12px 14px',
              background: '#f8fafc', borderRadius: '0 0 8px 8px',
              border: '1px solid #e2e8f0', borderTop: 'none',
            }}>
              {row.flag ? (
                <div>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: RED, marginBottom: 6 }}>
                    ⚠ Efficiency anomaly — 7.3 trips/100L vs fleet avg 5.3
                  </div>
                  <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.6 }}>
                    Vehicle 2318 DC has completed 127 trips total. It consumes 38% more fuel per trip than comparable dumpers on the same DYKE→HALD route. Either route deviation or siphoning.
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.6 }}>
                  Route: DYKE → HALD · Rate: ₹108/t · Last fuelled: {row.rank <= 4 ? '27 Mar' : '25 Mar'}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      </div>{/* end scroll wrapper */}

      <div style={{ padding: '10px 16px', borderTop: '1px solid #f1f5f9' }}>
        <span style={{ fontSize: 10, color: MUTED }}>Click any row to expand · Auto-refreshed from WhatsApp</span>
      </div>
    </div>
  );
}

// ─── Part header (numbered circle + label + heading) ─────────────────────────
function PartHeader({ num, label, heading, light = false, amber = false, isMobile }) {
  const accentColor = amber ? AMBER : (light ? AMBER : SLATE);
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '4px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: accentColor, color: '#fff',
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>{num}</div>
        <div style={{ fontSize: '10px', fontWeight: 700, color: amber ? AMBER : (light ? 'rgba(255,255,255,0.55)' : AMBER), letterSpacing: '0.14em', textTransform: 'uppercase' }}>{label}</div>
      </div>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: isMobile ? '26px' : '34px', fontWeight: 700,
        color: light ? '#fff' : INK, margin: '8px 0 0', lineHeight: 1.2,
      }}>{heading}</h2>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function CharuConstructionsExplainer() {
  const [activeTab, setActiveTab]   = useState('Payout');
  const [expandedRow, setExpandedRow] = useState(4); // anomaly row open by default
  const [chaosTab, setChaosTab]     = useState('Dispatch Details');
  const { isMobile } = useResponsive();

  // OCR section
  const [ocrVisible, setOcrVisible] = useState(false);
  const ocrRef = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOcrVisible(true); }, { threshold: 0.2 });
    if (ocrRef.current) obs.observe(ocrRef.current);
    return () => obs.disconnect();
  }, []);

  // Hero stats
  const [heroVis, setHeroVis] = useState(false);
  useEffect(() => { setTimeout(() => setHeroVis(true), 200); }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: CREAM, color: INK, overflowX: 'hidden' }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(150deg, ${SLATE} 0%, #0d1829 100%)`,
        padding: isMobile ? '56px 16px 48px' : '88px 40px 80px',
        position: 'relative', overflow: 'hidden',
        minHeight: isMobile ? 'auto' : '88vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', textAlign: 'center',
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {/* Glow */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 480, height: 480, background: AMBER, borderRadius: '50%', filter: 'blur(130px)', opacity: 0.1 }} />
        <div style={{ position: 'absolute', bottom: -100, left: -60, width: 400, height: 400, background: WA_GREEN, borderRadius: '50%', filter: 'blur(120px)', opacity: 0.07 }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 760 }}>
          <Reveal>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: `${AMBER}22`, border: `1px solid ${AMBER}40`,
              padding: '5px 14px', borderRadius: 20, marginBottom: 28,
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: AMBER, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Case Study · Nagpur · Fleet Operations
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(40px, 6.5vw, 68px)', fontWeight: 700,
              color: '#fff', lineHeight: 1.1, margin: '0 0 20px',
            }}>
              17 vehicles.<br />50+ trips a day.<br />
              <span style={{ color: AMBER }}>The owner saw nothing.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 48px' }}>
              Dispatch slips and fuel receipts, arriving in WhatsApp groups at 2am. No audit trail. No pattern detection. Just chat history.
            </p>
          </Reveal>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { v: '982',    l: 'Trips tracked' },
              { v: '18,754L', l: 'Fuel logged' },
              { v: '20',     l: 'Vehicles' },
              { v: '₹39.8L', l: 'Payouts auto-calculated' },
            ].map(({ v, l }, i) => (
              <div key={l} style={{
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12, padding: '14px 20px', backdropFilter: 'blur(10px)',
                opacity: heroVis ? 1 : 0,
                transform: heroVis ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.7s ease ${0.3 + i * 0.1}s, transform 0.7s ease ${0.3 + i * 0.1}s`,
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.45)', marginTop: 5, letterSpacing: '0.03em' }}>{l}</div>
              </div>
            ))}
          </div>

          <Reveal delay={0.6}>
            <div style={{ marginTop: 28, fontSize: 11, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              All from WhatsApp · Zero manual entry
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TLDR ─────────────────────────────────────────────────────── */}
      <section style={{ padding: isMobile ? '40px 16px' : '72px 40px', maxWidth: 1000, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: AMBER, marginBottom: 12 }}>
              The Story
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 700,
              color: INK, margin: 0, lineHeight: 1.2,
            }}>
              Truck fleet. WhatsApp ops. Invisible leakage.
            </h2>
          </div>
        </Reveal>

        {/* Flow: 3 equal cards + connecting line */}
        <Reveal delay={0.1}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: isMobile ? '12px' : 0, position: 'relative' }}>

            {/* Connecting line between cards only — desktop only */}
            {!isMobile && <div style={{
              position: 'absolute', top: 52, left: '33.33%', right: '33.33%',
              height: 1,
              background: '#e2e8f0',
              zIndex: 0,
            }} />}

            {[
              {
                icon: '🚛',
                iconBg: `${AMBER}18`,
                label: 'WHO',
                labelColor: AMBER,
                title: 'Charu Constructions',
                sub: 'Nagpur',
                bullets: ['17 dumpers', '50+ trips / day', '₹1.27L daily diesel', 'DYKE → HALD route'],
                border: '1px solid #e2e8f0',
                style: {},
              },
              {
                icon: '📱',
                iconBg: `${RED}12`,
                label: 'PROBLEM',
                labelColor: RED,
                title: 'All ops in WhatsApp',
                sub: 'No visibility',
                bullets: ['Dispatch slips at 2am', 'Fuel receipts in chat', 'No audit trail', 'Leakage undetectable'],
                border: `1px solid ${RED}25`,
                style: { background: `${RED}04` },
              },
              {
                icon: '⚡',
                iconBg: `${GREEN}14`,
                label: 'WHAT WE BUILT',
                labelColor: GREEN,
                title: 'Live ops dashboard',
                sub: 'From WhatsApp',
                bullets: ['OCR fuel receipts', 'Auto-log to Sheets', 'Per-vehicle analytics', 'Anomaly detection'],
                border: `1px solid ${GREEN}35`,
                style: { background: `${GREEN}04` },
              },
            ].map((card, i) => (
              <div key={card.label} style={{ padding: '0 10px', position: 'relative', zIndex: 1 }}>
                {/* Arrow between cards — desktop only */}
                {i > 0 && !isMobile && (
                  <div style={{
                    position: 'absolute', left: -4, top: 44,
                    width: 24, height: 24,
                    background: '#fff', border: '1.5px solid #e2e8f0',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, color: MUTED, zIndex: 2,
                  }}>→</div>
                )}
                <div style={{
                  background: '#fff', borderRadius: 16,
                  border: card.border,
                  padding: '28px 24px',
                  ...card.style,
                }}>
                  {/* Icon */}
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: card.iconBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24, marginBottom: 20,
                  }}>{card.icon}</div>

                  {/* Label */}
                  <div style={{ fontSize: 10, fontWeight: 700, color: card.labelColor, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
                    {card.label}
                  </div>

                  {/* Title */}
                  <div style={{ fontSize: 17, fontWeight: 800, color: INK, lineHeight: 1.25, marginBottom: 2 }}>{card.title}</div>
                  <div style={{ fontSize: 12, color: MUTED, marginBottom: 20 }}>{card.sub}</div>

                  {/* Bullet facts */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {card.bullets.map(b => (
                      <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: card.labelColor, flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: INK }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Result strip */}
        <Reveal delay={0.25}>
          <div style={{
            marginTop: 24, padding: '0 10px',
          }}>
            <div style={{
              background: SLATE, borderRadius: 12, padding: '16px 24px',
              display: isMobile ? 'flex' : 'grid',
              flexDirection: isMobile ? 'column' : undefined,
              gridTemplateColumns: isMobile ? undefined : 'auto 1px 1fr 1px 1fr 1px 1fr 1px 1fr',
              alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? '8px' : '0 16px',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Value
              </div>
              {[
                { v: 'Full trip visibility', l: 'real time' },
                { v: 'Fuel receipts verified', l: 'automatically' },
                { v: 'Payouts auto-calculated', l: 'no manual billing' },
                { v: 'Leakage detectable', l: 'impossible before' },
              ].map(({ v, l }) => (
                <>
                  {!isMobile && <div key={`div-${v}`} style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)' }} />}
                  <div key={v}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{v}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 1 }}>{l}</div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── PART 01 HEADER ───────────────────────────────────────────── */}
      <section style={{ background: CREAM, padding: isMobile ? '52px 16px 8px' : '64px 40px 8px', borderTop: '1px solid #e2e8f0' }}>
        <Reveal>
          <PartHeader num="1" label="The Problem" isMobile={isMobile}
            heading={<>50+ messages a day.<br /><em style={{ color: AMBER, fontStyle: 'italic' }}>The owner could see none of it.</em></>}
          />
        </Reveal>
      </section>

      {/* ── SECTION 1: CHAOS ─────────────────────────────────────────── */}
      <section style={{ padding: isMobile ? '24px 16px 64px' : '28px 40px 80px', maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '32px' : 64, alignItems: 'center' }}>
          <div>
            <Reveal>
              <SectionHead label="Before QueryGen" heading="The ops record was a WhatsApp scroll." />
            </Reveal>
            <Reveal delay={0.12}>
              <p style={{ fontSize: 15.5, color: MUTED, lineHeight: 1.8, marginBottom: 20 }}>
                Drivers sent dispatch slips at 2am, 3am, 4am — challan photos from the VIPL weighbridge. Each message typed by hand: vehicle number, weight, LR number.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p style={{ fontSize: 15.5, color: MUTED, lineHeight: 1.8 }}>
                Fuel receipts arrived in a separate group. Vehicle plate + pump receipt, photographed together. Honest — but unverifiable at 50 messages a day.
              </p>
            </Reveal>
            <Reveal delay={0.32}>
              <div style={{ marginTop: 28, padding: '14px 18px', borderLeft: `3px solid ${AMBER}`, background: `${AMBER}0A`, borderRadius: '0 8px 8px 0' }}>
                <p style={{ fontSize: 13.5, color: INK, fontStyle: 'italic', margin: 0, lineHeight: 1.7 }}>
                  "50+ messages a day. How do you audit that? You just... trust."
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              {/* Phone */}
              {chaosTab === 'Dispatch Details' ? (
                <PhoneMock groupName="Dispatch Details" participants="13" tab={chaosTab} setTab={setChaosTab}>
                  <DateDiv label="27 Feb 2026" />
                  <InBubble sender="Ramesh (5182)" color="#e91e8c"
                    text={"03.DYKE TO HALD\nDC 5182 : 01\nWT : 37.78\nLR No : 2540"} time="2:09 am" />
                  {/* Dispatch slip image mock */}
                  <div style={{ alignSelf: 'flex-start', maxWidth: '82%' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#9c27b0', marginLeft: 2, marginBottom: 2, display: 'block' }}>Santosh (7140)</span>
                    <div style={{
                      background: '#fff', borderRadius: '2px 12px 12px 12px',
                      overflow: 'hidden', boxShadow: '0 1px 1px rgba(0,0,0,0.08)',
                    }}>
                      {/* Simulated weighbridge slip */}
                      <div style={{
                        background: '#f8f8f6', padding: '10px 12px',
                        fontFamily: 'monospace', fontSize: 9.5, lineHeight: 1.7, color: '#333',
                        borderBottom: '1px solid #eee',
                      }}>
                        <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 10, marginBottom: 4, letterSpacing: 1 }}>VIDARBHA INDUSTRIES POWER LIMITED</div>
                        <div style={{ textAlign: 'center', color: '#666', marginBottom: 6, fontSize: 9 }}>Outbound-Flyash</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px 8px' }}>
                          {[
                            ['Trip No', 'TRIP-0019113'],
                            ['Vehicle No', 'MH40CT7140'],
                            ['Type', 'DUMPER'],
                            ['LR No', '2541'],
                            ['Gross Wt', '53.65 MT'],
                            ['Tare Wt', '14.75 MT'],
                            ['Net Wt', '38.90 MT'],
                            ['Transporter', 'CHARU CONST.'],
                          ].map(([k, v]) => (
                            <div key={k} style={{ display: 'contents' }}>
                              <span style={{ color: '#888' }}>{k}</span>
                              <span style={{ fontWeight: 700 }}>{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div style={{ padding: '5px 10px', fontSize: 9, color: '#aaa' }}>
                        04.DYKE TO HALD · CT 7140 : 01 · WT : 38.90 · LR No : 2541
                        <div style={{ textAlign: 'right', marginTop: 2 }}>2:16 am ✓✓</div>
                      </div>
                    </div>
                  </div>
                  <InBubble sender="Manoj (2318)" color="#f44336"
                    text={"05.DYKE TO HALD\nDC 2318 : 01\nWT : 25.81\nLR No : 2542"} time="2:41 am" />
                  <InBubble sender="Raju (2899)" color="#2196f3"
                    text={"06.DYKE TO HALD\nDC 2899 : 01\nWT : 41.15\nLR No : 2543"} time="3:07 am" />
                  <div style={{ textAlign: 'center', padding: '6px 0' }}>
                    <span style={{ background: 'rgba(225,210,196,0.9)', fontSize: 10, color: '#6b5b4e', padding: '3px 12px', borderRadius: 8 }}>
                      + 46 more today
                    </span>
                  </div>
                </PhoneMock>
              ) : (
                <PhoneMock groupName="Fuel Receipts" participants="10" tab={chaosTab} setTab={setChaosTab}>
                  <DateDiv label="27 Feb 2026" />
                  {/* Fuel receipt photo bubble */}
                  {[
                    { sender: 'Santosh (5807)', color: '#9c27b0', plate: 'MH 49 BZ 5807', vol: '100L', amt: '₹9,071', time: '9:54 am', caption: 'MH40BG7450\nMH40CT9001\nfull tank' },
                    { sender: 'Ramesh (5808)', color: '#e91e8c', plate: 'MH 49 BZ 5808', vol: '150L', amt: '₹13,607', time: '10:12 am', caption: 'MH49BZ5808\nfull tank' },
                  ].map(({ sender, color, plate, vol, amt, time, caption }) => (
                    <div key={sender} style={{ alignSelf: 'flex-start', maxWidth: '88%' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color, marginLeft: 2, marginBottom: 2, display: 'block' }}>{sender}</span>
                      <div style={{ background: '#fff', borderRadius: '2px 12px 12px 12px', overflow: 'hidden', boxShadow: '0 1px 1px rgba(0,0,0,0.08)' }}>
                        {/* Photo simulation */}
                        <div style={{ background: `linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)`, padding: '10px 12px', position: 'relative' }}>
                          {/* Number plate */}
                          <div style={{ background: '#FFF9C4', border: '2px solid #F9A825', borderRadius: 3, padding: '3px 8px', display: 'inline-block', marginBottom: 6 }}>
                            <span style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 900, letterSpacing: 2 }}>{plate}</span>
                          </div>
                          {/* Receipt strip */}
                          <div style={{ background: '#fafafa', borderRadius: 2, padding: '5px 8px', fontFamily: 'monospace', fontSize: 8.5, lineHeight: 1.6, color: '#333' }}>
                            <div style={{ textAlign: 'center', fontWeight: 700, marginBottom: 2 }}>FEDER-ROOT</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#888' }}>Volume</span><span style={{ fontWeight: 700 }}>{vol}</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#888' }}>Amount</span><span style={{ fontWeight: 700, color: '#059669' }}>{amt}</span></div>
                          </div>
                          <div style={{ position: 'absolute', top: 6, right: 8, background: 'rgba(0,0,0,0.5)', borderRadius: 4, padding: '2px 5px', fontSize: 8, color: '#fff' }}>📷 Photo</div>
                        </div>
                        <div style={{ padding: '5px 10px', fontSize: 10, color: '#333', whiteSpace: 'pre-line', lineHeight: 1.5 }}>
                          {caption}
                          <div style={{ fontSize: 9, color: '#aaa', textAlign: 'right', marginTop: 2 }}>{time} ✓✓</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ textAlign: 'center', padding: '6px 0' }}>
                    <span style={{ background: 'rgba(225,210,196,0.9)', fontSize: 10, color: '#6b5b4e', padding: '3px 12px', borderRadius: 8 }}>
                      + 15 more today
                    </span>
                  </div>
                </PhoneMock>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PART 02 HEADER ───────────────────────────────────────────── */}
      <section style={{ background: SLATE, padding: isMobile ? '52px 16px 8px' : '64px 40px 8px' }}>
        <Reveal>
          <PartHeader num="2" label="The Solution" light isMobile={isMobile}
            heading={<>Querygen reads every message —<br /><em style={{ color: AMBER, fontStyle: 'italic' }}>and builds a live ops system from it.</em></>}
          />
        </Reveal>
      </section>

      {/* ── SECTION 2: OCR ────────────────────────────────────────────── */}
      <section style={{ background: `${SLATE}05`, padding: isMobile ? '40px 16px' : '96px 40px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <SectionHead label="How it works" heading="One photo. Every field — extracted and saved." />
              <p style={{ fontSize: 15.5, color: MUTED, maxWidth: 480, margin: '0 auto' }}>
                Driver photos the number plate + pump receipt. QueryGen reads it. Done.
              </p>
            </div>
          </Reveal>

          <div ref={ocrRef} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 80px 1fr', alignItems: 'center', gap: 0 }}>
            <Reveal delay={0.1} style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-end' }}>
              <ThermalReceipt animated visible={ocrVisible} />
            </Reveal>

            {/* Arrow */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: isMobile ? '16px 0' : 0 }}>
              <div style={{
                width: 44, height: 44, background: AMBER, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, boxShadow: `0 0 0 8px ${AMBER}22`,
                color: '#fff', fontWeight: 700,
              }}>{isMobile ? '↓' : '→'}</div>
              <span style={{ fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center' }}>OCR</span>
            </div>

            <Reveal delay={0.25}>
              <ExtractedPanel visible={ocrVisible} />
            </Reveal>
          </div>

          <Reveal delay={0.4}>
            <p style={{ textAlign: 'center', fontSize: 13, color: MUTED, marginTop: 28 }}>
              Works on crumpled receipts. Works in bad lighting. Works at 2am.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 3: DASHBOARD ─────────────────────────────────────── */}
      <section style={{ padding: isMobile ? '40px 16px' : '96px 40px', maxWidth: 1060, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionHead label="Live Operations" heading="Every morning: a full picture." />
            <p style={{ fontSize: 15.5, color: MUTED, maxWidth: 480, margin: '0 auto' }}>
              The dashboard auto-populates from WhatsApp. Click any row.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <DashboardMock
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            expandedRow={expandedRow}
            setExpandedRow={setExpandedRow}
          />
        </Reveal>
      </section>

      {/* ── SECTION 4: THE INSIGHT ───────────────────────────────────── */}
      <section style={{ background: `${SLATE}05`, padding: isMobile ? '40px 16px' : '96px 40px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ display: 'inline-block', background: RED_LT, border: `1px solid ${RED}30`, padding: '5px 14px', borderRadius: 20, marginBottom: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: '0.12em', textTransform: 'uppercase' }}>The Sleeper Insight</span>
              </div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 700,
                color: INK, lineHeight: 1.2, margin: 0,
              }}>
                A human admin structurally<br />cannot catch this.
              </h2>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 28 }}>

            {/* Left — human side */}
            <Reveal delay={0.1}>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 18 }}>
                  What a human admin sees
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { s: 'Manoj (2318)', t: '01. DYKE TO HALD · WT: 38.5 · LR 2401', ts: '1:58am' },
                    { s: 'Manoj (2318)', t: '📷 [receipt photo]', ts: '2:15am' },
                    { s: 'Manoj (2318)', t: '02. DYKE TO HALD · WT: 41.2 · LR 2418', ts: '4:30am' },
                    { s: 'Manoj (2318)', t: '📷 [receipt photo]', ts: '4:46am' },
                    { s: 'Manoj (2318)', t: '03. DYKE TO HALD · WT: 36.9 · LR 2432', ts: '6:55am' },
                  ].map((m, i) => (
                    <div key={i} style={{ background: '#f8fafc', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <span style={{ fontSize: 10, color: WA_GREEN, fontWeight: 700 }}>{m.s} </span>
                        <span style={{ fontSize: 11, color: MUTED }}>{m.t}</span>
                      </div>
                      <span style={{ fontSize: 9.5, color: '#ccc', flexShrink: 0, paddingLeft: 8 }}>{m.ts}</span>
                    </div>
                  ))}
                  <div style={{ textAlign: 'center', fontSize: 11, color: '#ccc', padding: '6px 0' }}>· · · 122 more messages · · ·</div>
                </div>
                <div style={{ marginTop: 16, padding: '12px 14px', background: '#fafafa', borderRadius: 8, border: '1px solid #f1f5f9' }}>
                  <p style={{ fontSize: 12, color: MUTED, margin: 0, lineHeight: 1.6 }}>
                    Looks fine. Trips are done. Receipts arrived. Admin marks ✓.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Right — QueryGen side */}
            <Reveal delay={0.2}>
              <div style={{ background: '#fff', border: `1.5px solid ${AMBER}50`, borderRadius: 16, padding: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: AMBER, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 18 }}>
                  What QueryGen sees
                </div>

                <div style={{ fontSize: 11, color: MUTED, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Efficiency · Trips per 100L
                </div>

                {[
                  { v: 'Fleet avg',  e: 5.3, pct: 66, color: '#94a3b8' },
                  { v: '5182 DC',   e: 2.7, pct: 34, color: MUTED },
                  { v: '7140 CT',   e: 5.3, pct: 66, color: MUTED },
                  { v: '2899 DC',   e: 4.0, pct: 50, color: MUTED },
                  { v: '2318 DC',   e: 7.3, pct: 91, color: RED, flag: true },
                ].map(r => (
                  <div key={r.v} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                      <span style={{ fontSize: 12, color: r.flag ? INK : MUTED, fontWeight: r.flag ? 700 : 400 }}>{r.v}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: r.color }}>{r.e}</span>
                        {r.flag && <span style={{ fontSize: 9, background: RED, color: '#fff', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>+38% HIGH</span>}
                      </div>
                    </div>
                    <div style={{ height: 5, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${r.pct}%`, background: r.color, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}

                <div style={{ marginTop: 16, padding: '12px 14px', background: RED_LT, borderRadius: 8, border: `1px solid ${RED}20` }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: RED, marginBottom: 4 }}>⚠ 2318 DC · 127 trips</div>
                  <p style={{ fontSize: 11.5, color: '#7f1d1d', margin: 0, lineHeight: 1.6 }}>
                    38% more fuel per trip than comparable dumpers on the same route. Either route deviation or siphoning.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Callout */}
          <Reveal delay={0.3}>
            <div style={{
              marginTop: 40, padding: isMobile ? '24px 20px' : '36px 44px',
              background: '#fff', border: '1px solid #e2e8f0',
              borderRadius: 20, textAlign: 'center',
              boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(20px, 3vw, 32px)', color: INK,
                fontWeight: 700, lineHeight: 1.3, margin: '0 0 12px',
              }}>
                "This isn't a time-saving tool.<br />It's a money-protection system."
              </p>
              <p style={{ fontSize: 14, color: MUTED, margin: 0 }}>
                At ₹1.27L/day in fuel costs, catching 2–3% leakage pays for itself many times over — and no human reading WhatsApp chats would ever catch it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 5: BILLING ────────────────────────────────────────── */}
      <section style={{ padding: isMobile ? '40px 16px' : '96px 40px', maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '32px' : 64, alignItems: 'start' }}>
          <div>
            <Reveal>
              <SectionHead label="Reports & Billing" heading="Per-vehicle reports. PDF-ready." />
            </Reveal>
            <Reveal delay={0.12}>
              <p style={{ fontSize: 15.5, color: MUTED, lineHeight: 1.8, marginBottom: 28 }}>
                Every vehicle, every trip, every challan — listed and calculated. Fuel deductions auto-applied. Download and share.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'Total Bill',       value: '₹1,25,966', color: INK, bg: '#f8fafc' },
                  { label: 'Fuel Deduction',   value: '− ₹71,660', color: RED, bg: '#fff' },
                  { label: 'TDS (1%)',          value: '− ₹1,260',  color: RED, bg: '#fff' },
                  { label: 'Total Payout',      value: '₹53,046',   color: GREEN, bg: GREEN_LT, bold: true },
                ].map(({ label, value, color, bg, bold }) => (
                  <div key={label} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '11px 16px', background: bg,
                    border: bold ? `1px solid ${GREEN}30` : '1px solid #f1f5f9',
                    borderRadius: 8,
                  }}>
                    <span style={{ fontSize: 13, color: bold ? INK : MUTED, fontWeight: bold ? 700 : 400 }}>{label}</span>
                    <span style={{ fontSize: 14, fontWeight: bold ? 800 : 600, color }}>{value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.35}>
              <p style={{ fontSize: 12, color: MUTED, marginTop: 14 }}>
                Vehicle 4578 DC · March 2026 · 30 trips · DYKE → HALD
              </p>
            </Reveal>
          </div>

          {/* Fuel deductions breakdown */}
          <Reveal delay={0.2}>
            <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: INK, marginBottom: 4 }}>Fuel Deductions — 4578 DC</div>
              <div style={{ fontSize: 11, color: MUTED, marginBottom: 20 }}>Auto-calculated from pump receipts</div>
              {[
                { date: '18 Mar 2026', vol: '150.0L', amt: '₹13,607' },
                { date: '20 Mar 2026', vol: '150.0L', amt: '₹13,607' },
                { date: '22 Mar 2026', vol: '150.0L', amt: '₹13,607' },
                { date: '24 Mar 2026', vol: '150.0L', amt: '₹13,607' },
                { date: '25 Mar 2026', vol: '150.0L', amt: '₹13,607' },
                { date: '27 Mar 2026', vol: '40.0L',  amt: '₹3,628'  },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < 5 ? '1px solid #f8fafc' : 'none' }}>
                  <div>
                    <div style={{ fontSize: 12, color: INK }}>{r.date}</div>
                    <div style={{ fontSize: 10.5, color: MUTED }}>{r.vol}</div>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: RED }}>{r.amt}</span>
                </div>
              ))}
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: INK }}>Total Fuel Deduction</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: RED }}>₹71,660</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PART 03 HEADER + IMPACT ──────────────────────────────────── */}
      <section style={{ background: SLATE, padding: isMobile ? '52px 16px 8px' : '64px 40px 8px' }}>
        <Reveal>
          <PartHeader num="3" label="The Impact" light isMobile={isMobile}
            heading={<>What changed when the owner<br /><em style={{ color: AMBER, fontStyle: 'italic' }}>could finally see everything.</em></>}
          />
        </Reveal>
      </section>

      <section style={{ background: `${SLATE}04`, padding: isMobile ? '32px 16px 64px' : '40px 40px 80px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>

          {/* Stat row */}
          <Reveal delay={60}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
              {[
                { v: '982', l: 'Trips tracked', icon: '📦' },
                { v: '18,754L', l: 'Fuel logged & verified', icon: '⛽' },
                { v: '₹39.8L', l: 'Payouts auto-calculated', icon: '💰' },
                { v: '0', l: 'Hours of manual entry', icon: '⏱️' },
              ].map(({ v, l, icon }, i) => (
                <Reveal key={v} delay={i * 60}>
                  <div style={{
                    background: '#fff', borderRadius: '14px',
                    padding: '20px 18px',
                    border: `1px solid ${AMBER}25`,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  }}>
                    <div style={{ fontSize: '20px', marginBottom: '8px' }}>{icon}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 700, color: SLATE, lineHeight: 1 }}>{v}</div>
                    <div style={{ fontSize: '11px', color: MUTED, marginTop: '5px', lineHeight: 1.4 }}>{l}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          {/* Before / After */}
          <Reveal delay={120}>
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ padding: '10px 20px', fontSize: '10px', fontWeight: 700, color: RED, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Before</div>
                <div style={{ padding: '10px 20px', fontSize: '10px', fontWeight: 700, color: GREEN, letterSpacing: '0.1em', textTransform: 'uppercase', borderLeft: '1px solid #e2e8f0' }}>After</div>
              </div>
              {[
                { before: 'Dispatch slips buried in 2am WhatsApp messages', after: 'Every trip auto-extracted, logged, timestamped' },
                { before: 'Fuel receipts unverifiable — admin just trusted', after: 'OCR reads every receipt. Volume + amount locked.' },
                { before: 'Payouts calculated manually — hours of work', after: 'Per-vehicle billing auto-calculated, PDF-ready' },
                { before: '38% fuel anomaly on 2318 DC — invisible for months', after: 'Flagged within days. Route deviation or siphoning caught.' },
              ].map(({ before, after }, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: i > 0 ? '1px solid #f1f5f9' : 'none' }}>
                  <div style={{ padding: '14px 20px', fontSize: '13px', color: MUTED, lineHeight: 1.5 }}>{before}</div>
                  <div style={{ padding: '14px 20px', fontSize: '13px', color: INK, lineHeight: 1.5, fontWeight: 500, borderLeft: '1px solid #f1f5f9', background: `${GREEN}04` }}>{after}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CLOSING ──────────────────────────────────────────────────── */}
      <section style={{
        background: SLATE,
        padding: isMobile ? '56px 16px' : '88px 40px',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 360, height: 360, background: AMBER, borderRadius: '50%', filter: 'blur(110px)', opacity: 0.08 }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, background: WA_GREEN, borderRadius: '50%', filter: 'blur(120px)', opacity: 0.07 }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 620, margin: '0 auto' }}>
          <Reveal>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(26px, 4.5vw, 44px)', fontWeight: 700,
              color: '#fff', lineHeight: 1.25, margin: '0 0 20px',
            }}>
              Charu Constructions now knows things their drivers don't know they're reporting.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontSize: 15.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 44 }}>
              Structural visibility that wasn't possible before — not faster, different category.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <a
              href="https://wa.me/918879901887"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: isMobile ? 'flex' : 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                background: WA_GREEN, color: '#fff',
                padding: '14px 32px', borderRadius: 50,
                fontWeight: 700, fontSize: 15, textDecoration: 'none',
                boxShadow: `0 8px 28px ${WA_GREEN}40`,
                width: isMobile ? '100%' : 'auto', boxSizing: 'border-box',
              }}
            >
              <span style={{ fontSize: 18 }}>💬</span>
              Talk to us on WhatsApp
            </a>
          </Reveal>

          <Reveal delay={0.4}>
            <div style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { v: '982',    l: 'Trips tracked' },
                { v: '18,754L', l: 'Fuel logged' },
                { v: '20',     l: 'Vehicles' },
                { v: '₹39.8L', l: 'Payouts managed' },
              ].map(({ v, l }) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: AMBER }}>{v}</div>
                  <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
