import React, { useEffect, useRef, useState } from 'react';
import { useResponsive } from '../hooks/useResponsive';

// ─── Palette ──────────────────────────────────────────────────────────────────
const FOREST   = '#1A4A3A';   // Deep forest green — Indian chemical industry feel
const SAGE     = '#4A7C6F';   // Mid sage green
const SAGE_LT  = '#C8DDD8';   // Light sage
const MINT     = '#E8F4F0';   // Very light green bg
const GOLD     = '#C67C2A';   // Warm amber gold
const GOLD_LT  = '#FEF3DC';   // Light gold
const CREAM    = '#FAF8F4';   // Warm cream page bg
const INK      = '#1A1A14';   // Near-black
const MUTED    = '#6B7566';   // Muted green-grey text
const WA_DARK  = '#075E54';
const WA_GREEN = '#25D366';
const WA_BG    = '#ECE5DD';
const WA_OUT   = '#DCF8C6';
const GREEN_OK = '#15803D';
const GREEN_BG = '#F0FDF4';
const RED_C    = '#B91C1C';
const RED_BG   = '#FEF2F2';

/* ── Fade-in-up on scroll ── */
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ── Section label + heading ── */
function SectionHead({ label, title, light = false }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{
        fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: light ? `${GOLD}` : GOLD, marginBottom: '8px',
      }}>
        {label}
      </div>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '28px', fontWeight: 700,
        color: light ? '#fff' : INK,
        margin: 0, lineHeight: 1.2,
      }}>
        {title}
      </h2>
    </div>
  );
}

/* ─── WhatsApp Phone Shell ─────────────────────────────────────────────────── */
function PhoneMock({ children, name = 'Nichem', subtitle = 'online', avatarText = 'N', avatarBg }) {
  return (
    <div style={{
      background: '#1a1a1a', borderRadius: '28px',
      padding: '10px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      maxWidth: '280px', margin: '0 auto',
      border: '2px solid #333', flexShrink: 0,
    }}>
      {/* Status bar */}
      <div style={{
        background: '#111', borderRadius: '18px 18px 0 0',
        padding: '8px 16px 6px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '10px', color: '#888' }}>9:41</span>
        <div style={{ width: '60px', height: '6px', background: '#333', borderRadius: '3px' }} />
        <div style={{ display: 'flex', gap: '4px' }}>
          {[4, 3, 2].map(h => (
            <div key={h} style={{ width: '3px', height: `${h * 2}px`, background: '#888', borderRadius: '1px', alignSelf: 'flex-end' }} />
          ))}
        </div>
      </div>
      {/* WA header */}
      <div style={{
        background: WA_DARK, padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '50%',
          background: avatarBg || FOREST,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '13px', fontWeight: 800, color: '#fff', flexShrink: 0,
          fontFamily: "'DM Sans', sans-serif",
        }}>{avatarText}</div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', fontFamily: "'DM Sans', sans-serif" }}>{name}</div>
          <div style={{ fontSize: '10px', color: '#a0d0c0', fontFamily: "'DM Sans', sans-serif" }}>{subtitle}</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
          <span style={{ color: '#a0d0c0', fontSize: '14px' }}>📞</span>
          <span style={{ color: '#a0d0c0', fontSize: '14px' }}>⋮</span>
        </div>
      </div>
      {/* Chat area */}
      <div style={{
        background: WA_BG, minHeight: '340px', maxHeight: '400px',
        padding: '10px 10px 6px',
        display: 'flex', flexDirection: 'column', gap: '6px',
        overflowY: 'auto',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9b49a' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}>
        {children}
      </div>
      {/* Input bar */}
      <div style={{
        background: '#f0f0f0', padding: '8px 10px',
        display: 'flex', alignItems: 'center', gap: '8px',
        borderRadius: '0 0 18px 18px',
      }}>
        <div style={{
          flex: 1, background: '#fff', borderRadius: '20px',
          padding: '7px 12px', fontSize: '11px', color: '#aaa',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Message
        </div>
        <div style={{
          width: '30px', height: '30px', borderRadius: '50%',
          background: WA_GREEN, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '14px', flexShrink: 0,
        }}>🎤</div>
      </div>
    </div>
  );
}

/* ─── WA Bubble ─────────────────────────────────────────────────────────────── */
function Bubble({ text, out = false, time = '10:32 AM', sender }) {
  return (
    <div style={{ display: 'flex', justifyContent: out ? 'flex-end' : 'flex-start' }}>
      <div style={{
        background: out ? WA_OUT : '#fff',
        borderRadius: out ? '12px 2px 12px 12px' : '2px 12px 12px 12px',
        padding: '8px 10px 4px', maxWidth: '84%',
        boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
      }}>
        {sender && (
          <div style={{ fontSize: '10px', fontWeight: 700, color: FOREST, marginBottom: '2px', fontFamily: "'DM Sans', sans-serif" }}>
            {sender}
          </div>
        )}
        <p style={{
          fontSize: '12px', margin: 0, lineHeight: 1.45,
          color: INK, whiteSpace: 'pre-line', wordBreak: 'break-word',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {text}
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2px' }}>
          <span style={{ fontSize: '9px', color: '#888', fontFamily: "'DM Sans', sans-serif" }}>
            {time} {out ? '✓✓' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Date divider ──────────────────────────────────────────────────────────── */
function DateDivider({ label }) {
  return (
    <div style={{ textAlign: 'center', margin: '4px 0' }}>
      <span style={{
        background: '#D9F0CC', color: '#555',
        fontSize: '10px', padding: '3px 10px',
        borderRadius: '8px', fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Product search result card ────────────────────────────────────────────── */
function ProductResultCard({ name, category, use, cas, highlight }) {
  return (
    <div style={{
      background: highlight ? `${FOREST}08` : '#fff',
      border: `1.5px solid ${highlight ? FOREST + '40' : '#e5e5e0'}`,
      borderRadius: '10px', padding: '12px 14px',
      boxShadow: highlight ? `0 2px 12px ${FOREST}14` : '0 1px 4px rgba(0,0,0,0.04)',
      transition: 'all 0.2s',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: INK, fontFamily: "'DM Sans', sans-serif" }}>{name}</div>
        {highlight && (
          <span style={{
            fontSize: '9px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px',
            background: FOREST, color: '#fff', whiteSpace: 'nowrap', flexShrink: 0,
            fontFamily: "'DM Sans', sans-serif",
          }}>Best match</span>
        )}
      </div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '4px' }}>
        <span style={{
          fontSize: '10px', background: GOLD_LT, color: '#8B5E1A',
          padding: '2px 8px', borderRadius: '6px', fontFamily: "'DM Sans', sans-serif",
        }}>{category}</span>
        <span style={{
          fontSize: '10px', background: MINT, color: FOREST,
          padding: '2px 8px', borderRadius: '6px', fontFamily: "'DM Sans', sans-serif",
        }}>{use}</span>
      </div>
      {cas && <div style={{ fontSize: '10px', color: MUTED, fontFamily: 'monospace' }}>CAS {cas}</div>}
    </div>
  );
}

/* ─── Email Lead Card ───────────────────────────────────────────────────────── */
function EmailLeadCard() {
  return (
    <div style={{
      background: '#fff',
      border: '1.5px solid #E5E5E0',
      borderRadius: '14px',
      overflow: 'hidden',
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      maxWidth: '400px',
      margin: '0 auto',
    }}>
      {/* Email chrome */}
      <div style={{
        background: FOREST, padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '15px', flexShrink: 0,
        }}>✉️</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', fontFamily: "'DM Sans', sans-serif" }}>
            New Lead — Nichem Bot
          </div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontFamily: "'DM Sans', sans-serif" }}>
            Sent to sales@nichem.com
          </div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.15)', borderRadius: '6px',
          padding: '3px 8px', fontSize: '10px', color: '#fff',
          fontFamily: "'DM Sans', sans-serif",
        }}>Just now</div>
      </div>

      {/* Body */}
      <div style={{ padding: '16px 18px' }}>
        {/* Subject */}
        <div style={{
          fontSize: '12px', fontWeight: 700, color: INK,
          marginBottom: '12px', fontFamily: "'DM Sans', sans-serif",
        }}>
          Lead: Water Purification Chemicals — Ahmet K. (Turkey)
        </div>

        {/* AI Summary box */}
        <div style={{
          background: MINT, border: `1px solid ${SAGE_LT}`,
          borderRadius: '8px', padding: '10px 12px', marginBottom: '12px',
        }}>
          <div style={{
            fontSize: '9px', fontWeight: 700, color: SAGE, letterSpacing: '0.1em',
            textTransform: 'uppercase', marginBottom: '6px',
            fontFamily: "'DM Sans', sans-serif",
          }}>AI Summary</div>
          <p style={{
            fontSize: '11.5px', color: INK, lineHeight: 1.65, margin: 0,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Buyer from Istanbul sourcing <strong>Poly Aluminium Chloride (PAC)</strong> for a 50 T/month industrial water treatment plant. Comparing 2 suppliers. Wants pricing & COA within the week. High urgency.
          </p>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
          {['🔴 High Intent', '🌊 Water Treatment', '🏭 Industrial', '🇹🇷 Turkey'].map(t => (
            <span key={t} style={{
              fontSize: '10px', background: CREAM,
              border: '1px solid #e0ddd8', borderRadius: '20px',
              padding: '3px 10px', fontFamily: "'DM Sans', sans-serif",
              color: INK,
            }}>{t}</span>
          ))}
        </div>

        {/* Chat transcript line */}
        <div style={{
          background: '#FAFAF8', border: '1px solid #EEEDE8',
          borderRadius: '8px', padding: '10px 12px',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <div style={{
            width: '28px', height: '28px', background: GOLD_LT,
            borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', flexShrink: 0,
          }}>📎</div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: INK, fontFamily: "'DM Sans', sans-serif" }}>
              chat_transcript_ahmet.pdf
            </div>
            <div style={{ fontSize: '9.5px', color: MUTED, fontFamily: "'DM Sans', sans-serif" }}>
              Full conversation history attached
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Language Demo (interactive) ──────────────────────────────────────────── */
const LANGUAGES = [
  {
    lang: 'Turkish', flag: '🇹🇷', country: 'Turkey',
    user: 'Su arıtma için ürün var mı?',
    bot: 'Merhaba! Evet — Poli Alüminyum Klorür (PAC) ve Sodyum Hipoklorit dahil eksiksiz bir su arıtma ürün yelpazemiz var. Ne tür bir uygulama için arıyorsunuz?',
  },
  {
    lang: 'Arabic', flag: '🇦🇪', country: 'UAE',
    user: 'هل لديكم مواد كيميائية لمعالجة المياه؟',
    bot: 'مرحباً! نعم، لدينا مجموعة كاملة من منتجات معالجة المياه تشمل كلوريد البولي ألومنيوم وهيبوكلوريت الصوديوم. ما نوع التطبيق الذي تبحث عنه؟',
  },
  {
    lang: 'Hindi', flag: '🇮🇳', country: 'India',
    user: 'पानी शुद्धिकरण के लिए कोई केमिकल है?',
    bot: 'नमस्ते! हाँ — हमारे पास पानी शुद्धिकरण का पूरा रेंज है जिसमें PAC (पॉली एल्युमिनियम क्लोराइड) और सोडियम हाइपोक्लोराइट शामिल हैं। आपका उपयोग किस प्रकार का है?',
  },
  {
    lang: 'German', flag: '🇩🇪', country: 'Germany',
    user: 'Haben Sie Chemikalien für die Wasseraufbereitung?',
    bot: 'Guten Tag! Ja — wir führen eine vollständige Palette an Wasseraufbereitungsprodukten, darunter PAC und Natriumhypochlorit. Für welche Art von Anwendung suchen Sie?',
  },
];

function LangDemo() {
  const [active, setActive] = useState(0);
  const current = LANGUAGES[active];
  const { isMobile } = useResponsive();

  return (
    <div style={{
      background: '#fff',
      border: `1.5px solid ${SAGE_LT}`,
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 24px rgba(26,74,58,0.08)',
      maxWidth: isMobile ? '100%' : '420px',
      margin: '0 auto',
    }}>
      {/* Tab strip */}
      <div style={{
        display: 'flex', borderBottom: `1px solid ${SAGE_LT}`,
        background: MINT, padding: '4px 6px', gap: '4px',
      }}>
        {LANGUAGES.map((l, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              flex: 1, padding: '7px 4px',
              border: 'none', borderRadius: '8px', cursor: 'pointer',
              background: active === i ? '#fff' : 'transparent',
              boxShadow: active === i ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              fontSize: '16px', lineHeight: 1,
              transition: 'all 0.15s',
            }}
            title={l.lang}
          >
            {l.flag}
          </button>
        ))}
      </div>

      {/* Language label */}
      <div style={{
        padding: '8px 14px 0',
        fontSize: '10px', fontWeight: 700, color: FOREST, letterSpacing: '0.1em',
        textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif",
      }}>
        {current.flag} {current.lang} · {current.country}
      </div>

      {/* Fake chat */}
      <div style={{
        background: WA_BG, margin: '8px', borderRadius: '10px',
        padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px',
        minHeight: '160px',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9b49a' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{
            background: WA_OUT, borderRadius: '12px 2px 12px 12px',
            padding: '7px 10px', maxWidth: '85%',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}>
            <p style={{ fontSize: '12px', margin: 0, color: INK, fontFamily: "'DM Sans', sans-serif" }}>{current.user}</p>
            <div style={{ fontSize: '9px', color: '#888', textAlign: 'right', marginTop: '2px', fontFamily: "'DM Sans', sans-serif" }}>10:14 ✓✓</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{
            background: '#fff', borderRadius: '2px 12px 12px 12px',
            padding: '7px 10px', maxWidth: '90%',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}>
            <p style={{ fontSize: '11.5px', margin: 0, color: INK, lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>{current.bot}</p>
            <div style={{ fontSize: '9px', color: '#888', textAlign: 'right', marginTop: '2px', fontFamily: "'DM Sans', sans-serif" }}>10:14</div>
          </div>
        </div>
      </div>

      <div style={{
        padding: '8px 14px 12px',
        fontSize: '10.5px', color: MUTED, fontFamily: "'DM Sans', sans-serif",
        textAlign: 'center',
      }}>
        Bot auto-detects the language and responds fluently
      </div>
    </div>
  );
}

/* ─── Animated scroll-reveal bars ──────────────────────────────────────────── */
function ImpactBars() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const bars = [
    { label: 'Response time', before: '4–8 hrs', after: 'Instant', pct: 100, color: FOREST },
    { label: 'Languages supported', before: '1 (English/Hindi only)', after: '10+', pct: 88, color: SAGE },
    { label: 'SKUs accessible 24/7', before: 'Depends on staff', after: '100%', pct: 100, color: GOLD },
    { label: 'Leads captured to CRM', before: 'Manual / missed', after: 'Auto-email every time', pct: 92, color: '#2E86AB' },
  ];

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {bars.map(({ label, before, after, pct, color }, i) => (
        <div key={i} style={{
          background: '#fff', border: '1px solid #EEEDE8',
          borderRadius: '12px', padding: '14px 16px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            marginBottom: '8px', gap: '12px',
          }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: INK, fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '10px', color: MUTED, textDecoration: 'line-through', fontFamily: "'DM Sans', sans-serif" }}>{before}</span>
              <span style={{ fontSize: '11px', fontWeight: 700, color, fontFamily: "'DM Sans', sans-serif" }}>→ {after}</span>
            </div>
          </div>
          <div style={{ background: '#F0F0EA', borderRadius: '4px', height: '7px', overflow: 'hidden' }}>
            <div style={{
              width: visible ? `${pct}%` : '0%', height: '100%',
              background: color, borderRadius: '4px',
              transition: `width 1.1s cubic-bezier(0.4,0,0.2,1) ${i * 150}ms`,
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Before / After row ────────────────────────────────────────────────────── */
function BeforeAfter({ before, after }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
      <div style={{
        background: RED_BG, border: `1px solid ${RED_C}22`,
        borderRadius: '10px', padding: '12px 14px',
        display: 'flex', gap: '10px', alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: '12px', flexShrink: 0, marginTop: '1px' }}>✗</span>
        <span style={{ fontSize: '12px', color: RED_C, lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>{before}</span>
      </div>
      <div style={{
        background: GREEN_BG, border: `1px solid ${GREEN_OK}22`,
        borderRadius: '10px', padding: '12px 14px',
        display: 'flex', gap: '10px', alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: '12px', flexShrink: 0, marginTop: '1px' }}>✓</span>
        <span style={{ fontSize: '12px', color: GREEN_OK, lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>{after}</span>
      </div>
    </div>
  );
}

/* ─── Knowledge Base Diagram ────────────────────────────────────────────────── */
function KnowledgeBaseDiagram() {
  const { isMobile } = useResponsive();
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const sources = [
    {
      icon: '📊', label: 'SKU Master Sheet', sub: '240+ chemicals',
      color: '#16A34A', bg: '#F0FDF4', border: '#86EFAC',
      chips: ['Water Treatment', 'Rodent Control', 'Anti-Fog', 'Disinfectants', 'Odour Removal', '+12 more'],
      preview: [
        { sku: 'NCH-001', name: 'Poly Aluminium Chloride' },
        { sku: 'NCH-002', name: 'Sodium Hypochlorite' },
        { sku: 'NCH-003', name: 'Anti-Fog Additive AF-200' },
      ],
    },
    {
      icon: '🌐', label: 'Website Content', sub: 'Auto-scraped & synced',
      color: '#2563EB', bg: '#EFF6FF', border: '#93C5FD',
      chips: ['Product pages', 'Category FAQs', 'Application guides', 'Company info'],
      preview: null,
    },
    {
      icon: '📄', label: 'Docs & Spec Sheets', sub: 'PDFs & SDS files',
      color: '#D97706', bg: '#FFFBEB', border: '#FCD34D',
      chips: ['Safety Data Sheets', 'Tech Specs', 'Application Notes', 'Certificates'],
      preview: null,
    },
  ];

  return (
    <div ref={ref} style={{ maxWidth: '900px', margin: '0 auto' }}>

      {/* Label */}
      <Reveal>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: GOLD, marginBottom: '8px',
            fontFamily: "'DM Sans', sans-serif",
          }}>How the bot is trained</div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: isMobile ? '24px' : '30px', fontWeight: 700,
            color: INK, margin: 0, lineHeight: 1.2,
          }}>
            Everything Nichem knows — poured into one brain.
          </h2>
          <p style={{
            fontSize: '13.5px', color: MUTED, marginTop: '10px', lineHeight: 1.7,
            fontFamily: "'DM Sans', sans-serif", maxWidth: '520px', margin: '10px auto 0',
          }}>
            The SKU master sheet, the website, product documents — all of it flows into the bot's knowledge base. Every time something changes on the website, it syncs automatically.
          </p>
        </div>
      </Reveal>

      {/* ── Desktop: orbit layout ── Mobile: stacked ── */}
      {isMobile ? (
        /* ── MOBILE: simple stacked list ── */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {sources.map(({ icon, label, sub, color, bg, border, chips }, si) => (
            <div key={si} style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.5s ease ${si * 100}ms, transform 0.5s ease ${si * 100}ms`,
              background: '#fff', border: `1.5px solid ${border}`,
              borderRadius: '14px', overflow: 'hidden',
            }}>
              <div style={{ background: bg, borderBottom: `1px solid ${border}`, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>{icon}</span>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color, fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
                  <div style={{ fontSize: '10px', color: MUTED, fontFamily: "'DM Sans', sans-serif" }}>{sub}</div>
                </div>
              </div>
              <div style={{ padding: '10px 14px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {chips.map(c => (
                  <span key={c} style={{ fontSize: '10px', padding: '3px 9px', background: bg, color, borderRadius: '20px', border: `1px solid ${border}`, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{c}</span>
                ))}
              </div>
            </div>
          ))}
          {/* Down arrow */}
          <div style={{ display: 'flex', justifyContent: 'center', opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease 350ms' }}>
            <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
              <path d="M 12 0 L 12 24" stroke={SAGE_LT} strokeWidth="2" strokeDasharray="4 3" />
              <polygon points="5,22 19,22 12,30" fill={SAGE} />
            </svg>
          </div>
          {/* Brain */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.9)', transition: 'opacity 0.6s ease 450ms, transform 0.6s ease 450ms' }}>
            <div style={{ background: `linear-gradient(145deg, ${FOREST}, #2A6A50)`, border: `2px solid ${SAGE}`, borderRadius: '20px', padding: '20px 22px', textAlign: 'center', position: 'relative', boxShadow: `0 12px 48px ${FOREST}44` }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🧠</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Bot Knowledge Base</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>240+ SKUs · Website · Docs & SDS</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '4px 10px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 0 3px rgba(74,222,128,0.3)', animation: 'nichem-dot 1.5s ease-in-out infinite' }} />
                <span style={{ fontSize: '9px', color: '#4ADE80', fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Always up to date</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── DESKTOP: orbit canvas ── */
        /*
          Canvas is 860px wide × 400px tall (fixed).
          Brain centre: x=430, y=200
          Source cards: ~180px wide, ~120px tall — right edge connects to brain
            S0 (SKU):     top-left,    right-edge x≈190, centre-y≈80
            S1 (Website): mid,         right-edge x≈220, centre-y≈200
            S2 (Docs):    bottom-left, right-edge x≈170, centre-y≈320
          Output cards: left edge at x≈570
            O0 (WA):      centre-y≈155
            O1 (Website): centre-y≈255
          SVG lines go from card right-edge midpoint → brain left-edge (x≈370,y=200)
          Output lines go from brain right-edge (x≈490,y=200) → card left-edge
        */
        <div style={{ position: 'relative', width: '860px', maxWidth: '100%', height: '420px', margin: '0 auto' }}>

          {/* ── SVG connector layer (behind cards) ── */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}
            viewBox="0 0 860 420"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0,0 6,3 0,6" fill={SAGE} />
              </marker>
            </defs>
            {/* S0 → Brain */}
            <path
              d="M 196 80 C 290 80, 340 200, 372 200"
              stroke={SAGE_LT} strokeWidth="1.8" strokeDasharray="5 3" fill="none"
              markerEnd="url(#arr)"
              opacity={visible ? 1 : 0} style={{ transition: 'opacity 0.5s ease 380ms' }}
            />
            {/* S1 → Brain */}
            <path
              d="M 228 200 L 372 200"
              stroke={SAGE_LT} strokeWidth="1.8" strokeDasharray="5 3" fill="none"
              markerEnd="url(#arr)"
              opacity={visible ? 1 : 0} style={{ transition: 'opacity 0.5s ease 440ms' }}
            />
            {/* S2 → Brain */}
            <path
              d="M 178 328 C 280 328, 340 200, 372 200"
              stroke={SAGE_LT} strokeWidth="1.8" strokeDasharray="5 3" fill="none"
              markerEnd="url(#arr)"
              opacity={visible ? 1 : 0} style={{ transition: 'opacity 0.5s ease 500ms' }}
            />
            {/* Brain → O0 */}
            <path
              d="M 488 200 C 520 200, 536 158, 574 158"
              stroke={SAGE_LT} strokeWidth="1.8" strokeDasharray="5 3" fill="none"
              markerEnd="url(#arr)"
              opacity={visible ? 1 : 0} style={{ transition: 'opacity 0.5s ease 660ms' }}
            />
            {/* Brain → O1 */}
            <path
              d="M 488 200 C 520 200, 536 262, 574 262"
              stroke={SAGE_LT} strokeWidth="1.8" strokeDasharray="5 3" fill="none"
              markerEnd="url(#arr)"
              opacity={visible ? 1 : 0} style={{ transition: 'opacity 0.5s ease 720ms' }}
            />
          </svg>

          {/* ── Source card S0: SKU — top-left ── */}
          {sources.slice(0, 1).map(({ icon, label, sub, color, bg, border, chips, preview }) => (
            <div key="s0" style={{
              position: 'absolute', top: 20, left: 0, width: 196,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-16px)',
              transition: 'opacity 0.5s ease 0ms, transform 0.5s ease 0ms',
            }}>
              <div style={{ background: '#fff', border: `1.5px solid ${border}`, borderRadius: '14px', overflow: 'hidden', boxShadow: `0 2px 14px ${color}14` }}>
                <div style={{ background: bg, borderBottom: `1px solid ${border}`, padding: '9px 13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color, fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
                    <div style={{ fontSize: '9px', color: MUTED, fontFamily: "'DM Sans', sans-serif" }}>{sub}</div>
                  </div>
                </div>
                <div style={{ padding: '10px 13px' }}>
                  {preview && preview.map(({ sku, name }) => (
                    <div key={sku} style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '4px 0', borderBottom: '1px solid #f0ede6' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '9px', color: MUTED, flexShrink: 0, minWidth: '52px' }}>{sku}</span>
                      <span style={{ fontSize: '10.5px', color: INK, fontFamily: "'DM Sans', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
                    </div>
                  ))}
                  <div style={{ fontSize: '9px', color: MUTED, fontStyle: 'italic', fontFamily: "'DM Sans', sans-serif", marginTop: '5px', marginBottom: '8px' }}>+ 237 more rows…</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {chips.slice(0, 4).map(c => (
                      <span key={c} style={{ fontSize: '9.5px', padding: '2px 8px', background: bg, color, borderRadius: '20px', border: `1px solid ${border}`, fontFamily: "'DM Sans', sans-serif" }}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* ── Source card S1: Website — mid, nudged right ── */}
          {sources.slice(1, 2).map(({ icon, label, sub, color, bg, border, chips }) => (
            <div key="s1" style={{
              position: 'absolute', top: 152, left: 32, width: 196,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-16px)',
              transition: 'opacity 0.5s ease 120ms, transform 0.5s ease 120ms',
            }}>
              <div style={{ background: '#fff', border: `1.5px solid ${border}`, borderRadius: '14px', overflow: 'hidden', boxShadow: `0 2px 14px ${color}14` }}>
                <div style={{ background: bg, borderBottom: `1px solid ${border}`, padding: '9px 13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color, fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
                    <div style={{ fontSize: '9px', color: MUTED, fontFamily: "'DM Sans', sans-serif" }}>{sub}</div>
                  </div>
                </div>
                <div style={{ padding: '10px 13px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {chips.map(c => (
                    <span key={c} style={{ fontSize: '9.5px', padding: '2px 8px', background: bg, color, borderRadius: '20px', border: `1px solid ${border}`, fontFamily: "'DM Sans', sans-serif" }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* ── Source card S2: Docs — bottom, nudged left ── */}
          {sources.slice(2, 3).map(({ icon, label, sub, color, bg, border, chips }) => (
            <div key="s2" style={{
              position: 'absolute', top: 284, left: 0, width: 178,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-16px)',
              transition: 'opacity 0.5s ease 230ms, transform 0.5s ease 230ms',
            }}>
              <div style={{ background: '#fff', border: `1.5px solid ${border}`, borderRadius: '14px', overflow: 'hidden', boxShadow: `0 2px 14px ${color}14` }}>
                <div style={{ background: bg, borderBottom: `1px solid ${border}`, padding: '9px 13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color, fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
                    <div style={{ fontSize: '9px', color: MUTED, fontFamily: "'DM Sans', sans-serif" }}>{sub}</div>
                  </div>
                </div>
                <div style={{ padding: '10px 13px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {chips.map(c => (
                    <span key={c} style={{ fontSize: '9.5px', padding: '2px 8px', background: bg, color, borderRadius: '20px', border: `1px solid ${border}`, fontFamily: "'DM Sans', sans-serif" }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* ── Brain ── centred at x=430, y=200 ── */}
          <div style={{
            position: 'absolute', top: 110, left: 372,
            width: 116,
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(0.85)',
            transition: 'opacity 0.6s ease 500ms, transform 0.6s ease 500ms',
          }}>
            <div style={{
              background: `linear-gradient(145deg, ${FOREST}, #2A6A50)`,
              border: `2px solid ${SAGE}`,
              borderRadius: '20px',
              padding: '18px 14px',
              textAlign: 'center',
              position: 'relative',
              boxShadow: `0 12px 48px ${FOREST}44, 0 0 0 6px ${FOREST}18`,
            }}>
              <div style={{ position: 'absolute', inset: '-8px', borderRadius: '26px', border: `1.5px solid ${SAGE}40`, animation: 'nichem-pulse 2.5s ease-in-out infinite' }} />
              <div style={{ position: 'absolute', inset: '-16px', borderRadius: '32px', border: `1px solid ${SAGE}20`, animation: 'nichem-pulse 2.5s ease-in-out 0.6s infinite' }} />
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>🧠</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', fontWeight: 700, color: '#fff', lineHeight: 1.25, marginBottom: '6px' }}>Bot Knowledge Base</div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.55)', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
                240+ SKUs<br />Website content<br />Docs & SDS
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '3px 8px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 0 3px rgba(74,222,128,0.25)', animation: 'nichem-dot 1.5s ease-in-out infinite' }} />
                <span style={{ fontSize: '8px', color: '#4ADE80', fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Always up to date</span>
              </div>
            </div>
          </div>

          {/* ── Output O0: WhatsApp ── */}
          <div style={{
            position: 'absolute', top: 100, left: 574, width: 160,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(14px)',
            transition: 'opacity 0.5s ease 660ms, transform 0.5s ease 660ms',
          }}>
            <div style={{ background: '#F0FDF4', border: '1.5px solid #86EFAC', borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '30px', height: '30px', background: WA_GREEN + '22', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', flexShrink: 0 }}>💬</div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: WA_GREEN, fontFamily: "'DM Sans', sans-serif" }}>WhatsApp Bot</div>
                <div style={{ fontSize: '10px', color: MUTED, fontFamily: "'DM Sans', sans-serif" }}>Instant answers</div>
              </div>
            </div>
          </div>

          {/* ── Output O1: Website ── */}
          <div style={{
            position: 'absolute', top: 210, left: 574, width: 160,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(14px)',
            transition: 'opacity 0.5s ease 720ms, transform 0.5s ease 720ms',
          }}>
            <div style={{ background: '#EFF6FF', border: '1.5px solid #93C5FD', borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '30px', height: '30px', background: '#2563EB22', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', flexShrink: 0 }}>🌐</div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB', fontFamily: "'DM Sans', sans-serif" }}>Website Chat</div>
                <div style={{ fontSize: '10px', color: MUTED, fontFamily: "'DM Sans', sans-serif" }}>On nichem.in</div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Footnote */}
      <Reveal delay={800}>
        <div style={{
          marginTop: '24px', textAlign: 'center',
          fontSize: '12px', color: MUTED, fontFamily: "'DM Sans', sans-serif",
          fontStyle: 'italic',
        }}>
          The website is scraped automatically — so whenever Nichem updates a product page, the bot knows.
        </div>
      </Reveal>

    </div>
  );
}

/* ─── Problem scenario card ─────────────────────────────────────────────────── */
function ProblemCard({ icon, title, body }) {
  return (
    <div style={{
      background: '#fff',
      border: '1.5px solid #E8E5DE',
      borderRadius: '14px',
      padding: '20px 20px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    }}>
      <div style={{ fontSize: '26px', marginBottom: '10px' }}>{icon}</div>
      <div style={{
        fontSize: '14px', fontWeight: 700, color: INK,
        marginBottom: '6px', fontFamily: "'DM Sans', sans-serif",
      }}>{title}</div>
      <div style={{ fontSize: '13px', color: MUTED, lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>{body}</div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════════════════════ */
export default function NichemExplainer() {
  const { isMobile } = useResponsive();
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: CREAM, color: INK, minHeight: '100vh', overflowX: 'hidden' }}>

      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500;1,700&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
        @keyframes nichem-pulse { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.02); } }
        @keyframes nichem-dot { 0%, 100% { box-shadow: 0 0 0 3px rgba(74,222,128,0.3); } 50% { box-shadow: 0 0 0 6px rgba(74,222,128,0.15); } }
        .nichem-hover-card:hover { box-shadow: 0 6px 28px rgba(26,74,58,0.14) !important; transform: translateY(-2px); }
        .nichem-hover-card { transition: box-shadow 0.2s, transform 0.2s; }
      `}</style>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section style={{
        background: `linear-gradient(160deg, ${FOREST} 0%, #2A6A50 55%, #3D8060 100%)`,
        padding: isMobile ? '52px 20px 48px' : '80px 32px 72px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Warm texture overlay — feels like a printed factory brochure */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(198,124,42,0.12) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 40%)`,
        }} />
        {/* Subtle grid lines — laboratory graph paper feel */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>

          {/* Badge */}
          <div style={{
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(12px)',
            transition: 'all 0.5s ease 0.1s',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '20px', padding: '6px 14px', marginBottom: '24px',
            }}>
              <span style={{ fontSize: '12px' }}>⚗️</span>
              <span style={{
                fontSize: '11px', color: 'rgba(255,255,255,0.85)', fontWeight: 600,
                letterSpacing: '0.06em', fontFamily: "'DM Sans', sans-serif",
              }}>
                Nichem Chemicals · Wagle Estate, Thane
              </span>
            </div>
          </div>

          {/* Headline */}
          <div style={{
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(16px)',
            transition: 'all 0.55s ease 0.2s',
          }}>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? '38px' : '56px',
              fontWeight: 700, color: '#fff',
              lineHeight: 1.1, margin: '0 0 8px',
              maxWidth: '660px',
            }}>
              Hundreds of chemicals.
              <br />
              <em style={{ color: '#F5C97A' }}>One bot that knows them all.</em>
            </h1>
          </div>

          {/* Sub */}
          <div style={{
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(16px)',
            transition: 'all 0.55s ease 0.35s',
          }}>
            <p style={{
              fontSize: '16px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75,
              maxWidth: '520px', margin: '16px 0 36px',
              fontFamily: "'DM Sans', sans-serif",
            }}>
              A second-generation family business in Wagle Estate. A vast chemical catalogue. Buyers from Turkey to Indonesia. This is how Nichem stopped losing enquiries and started winning them.
            </p>
          </div>

          {/* Chips */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '10px',
            opacity: heroVisible ? 1 : 0, transition: 'all 0.5s ease 0.5s',
          }}>
            {[
              { icon: '💬', label: 'Website + WhatsApp bot' },
              { icon: '🌍', label: 'Multi-language' },
              { icon: '📬', label: 'Auto lead emails' },
              { icon: '🔬', label: 'Full SKU knowledge base' },
            ].map(({ icon, label }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px', padding: '7px 14px',
              }}>
                <span style={{ fontSize: '13px' }}>{icon}</span>
                <span style={{
                  fontSize: '12px', color: 'rgba(255,255,255,0.85)',
                  fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
                }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PART 01 — THE PROBLEM
      ══════════════════════════════════════════════════════════════════════ */}

      {/* Part divider */}
      <section style={{ background: CREAM, padding: isMobile ? '48px 20px 8px' : '64px 32px 8px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '4px',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: FOREST, color: '#fff',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700, fontSize: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>1</div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: GOLD, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>
                The Problem
              </div>
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? '26px' : '34px', fontWeight: 700,
              color: INK, margin: '8px 0 0', lineHeight: 1.2,
            }}>
              When knowledge lives in people,<br />
              <em style={{ color: SAGE }}>every holiday is a liability.</em>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Problem cards */}
      <section style={{ background: CREAM, padding: isMobile ? '24px 20px 56px' : '32px 32px 72px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
            <Reveal delay={0}>
              <ProblemCard
                icon="🧪"
                title="A catalogue too vast for any one person"
                body="Rodent repellents, anti-fog additives, water purification chemicals, odour neutralisers — hundreds of SKUs, each with its own CAS number, dosage, and application. No sales rep knows it all."
              />
            </Reveal>
            <Reveal delay={100}>
              <ProblemCard
                icon="📞"
                title="Buyers ask questions. Nobody is always available."
                body={'A manufacturer in Pune needs water clarification chemicals at 9 PM. A reseller in Surat asks about dosage on Sunday. Before the bot — no answer meant no deal.'}
              />
            </Reveal>
            <Reveal delay={150}>
              <ProblemCard
                icon="🌏"
                title="International buyers hit a language wall"
                body="Nichem gets enquiries from Turkey, the Middle East, Indonesia. When buyers write in Turkish or Arabic, the team struggles to respond — and the lead goes cold."
              />
            </Reveal>
            <Reveal delay={200}>
              <ProblemCard
                icon="📋"
                title="Leads captured informally, often not at all"
                body="Conversations happened over WhatsApp. Without a system to record, qualify, and route leads, many promising enquiries simply slipped through the cracks."
              />
            </Reveal>
          </div>

          {/* Scenario callout */}
          <Reveal delay={250}>
            <div style={{
              marginTop: '28px',
              background: '#fff', border: `1.5px solid ${SAGE_LT}`,
              borderRadius: '14px', padding: '20px 22px',
              boxShadow: '0 2px 12px rgba(26,74,58,0.06)',
              display: 'flex', gap: '16px', alignItems: 'flex-start',
            }}>
              <div style={{
                width: '40px', height: '40px', background: GOLD_LT, borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', flexShrink: 0,
              }}>💬</div>
              <div>
                <div style={{
                  fontSize: '11px', fontWeight: 700, color: GOLD, letterSpacing: '0.1em',
                  textTransform: 'uppercase', marginBottom: '6px',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  A real scenario
                </div>
                <p style={{
                  fontSize: '13.5px', color: INK, lineHeight: 1.7, margin: 0,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  A buyer from Ahmedabad asks: <strong>"Do you have something for water purification in fish tanks?"</strong> — They don't know the chemical name. They don't speak technical. A person would need to be on call, know the product, speak the buyer's language, and close the conversation before the person moves on. The bot does all of it, instantly.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PART 02 — THE SOLUTION
      ══════════════════════════════════════════════════════════════════════ */}

      <section style={{
        background: FOREST, padding: isMobile ? '48px 20px 16px' : '64px 32px 16px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '4px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: GOLD, color: '#fff',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700, fontSize: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>2</div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: GOLD, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>
                The Solution
              </div>
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? '26px' : '34px', fontWeight: 700,
              color: '#fff', margin: '8px 0 0', lineHeight: 1.2,
            }}>
              An AI bot trained on Nichem's entire universe —<br />
              <em style={{ color: '#F5C97A' }}>running 24/7 on WhatsApp and their website.</em>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Knowledge Base Diagram */}
      <section style={{ background: CREAM, padding: isMobile ? '48px 20px' : '64px 32px' }}>
        <Reveal>
          <KnowledgeBaseDiagram />
        </Reveal>
      </section>

      {/* Solution 1 — finds products by use case */}
      <section style={{ background: '#fff', padding: isMobile ? '48px 20px' : '72px 32px' }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'flex', flexDirection: isMobile ? 'column' : 'row',
          gap: '48px', alignItems: 'center',
        }}>
          <div style={{ flex: 1 }}>
            <Reveal>
              <SectionHead label="Solution · 01" title="Finds the right product even when the buyer doesn't know its name." />
              <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.75, marginBottom: '16px', fontFamily: "'DM Sans', sans-serif" }}>
                Nichem loaded every SKU — with details, applications, and dosage — into the knowledge base. The bot also crawls their website automatically, so the catalogue is always in sync.
              </p>
              <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif" }}>
                Buyers can ask in plain language: <em style={{ color: INK }}>"something for rodent control in a food warehouse"</em> or <em style={{ color: INK }}>"anti-fog additive for plastic packaging"</em> — and get the right product immediately.
              </p>
            </Reveal>
          </div>

          <Reveal delay={150} style={{ flexShrink: 0, width: isMobile ? '100%' : 'auto' }}>
            <PhoneMock name="Nichem Chemicals" subtitle="online" avatarText="NC" avatarBg={FOREST}>
              <DateDivider label="Today" />
              <Bubble
                out={false}
                text={"👋 Welcome to Nichem! How can I help you today?"}
                time="10:02 AM"
              />
              <Bubble
                out={true}
                text={"I need something to keep rodents away from my food warehouse"}
                time="10:03 AM"
              />
              <Bubble
                out={false}
                text={"Got it! For food-safe rodent repellent applications, we carry Nichem RR-40 — a granular rodent repellent approved for use in food storage environments.\n\nCoverage: up to 8,000 sq ft | Reapplication: every 60 days\n\nShall I connect you with our sales team for pricing?"}
                time="10:03 AM"
              />
              <Bubble out={true} text={"Yes please, I need 10kg to start"} time="10:04 AM" />
            </PhoneMock>
          </Reveal>
        </div>
      </section>

      {/* Solution 2 — Website + WA side by side */}
      <section style={{ background: MINT, padding: isMobile ? '48px 20px' : '72px 32px' }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse',
          gap: '48px', alignItems: 'center',
        }}>
          <div style={{ flex: 1 }}>
            <Reveal>
              <SectionHead label="Solution · 02" title="One brain. Two channels. Website and WhatsApp." />
              <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.75, marginBottom: '20px', fontFamily: "'DM Sans', sans-serif" }}>
                Whether a buyer visits nichem.in or sends a message on WhatsApp, the same intelligent bot is on duty — with complete product knowledge and the same quality of answers.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { icon: '🌐', title: 'Website chatbot', body: 'Embedded directly on product pages. Buyers get answers without leaving the site.' },
                  { icon: '💬', title: 'WhatsApp Business', body: 'For buyers who prefer messaging over web forms — especially B2B and international buyers.' },
                  { icon: '🔄', title: 'Same knowledge, always in sync', body: 'Cohesion scrapes the website automatically, so product updates reflect without manual effort.' },
                ].map(({ icon, title, body }) => (
                  <div key={title} style={{
                    display: 'flex', gap: '12px', alignItems: 'flex-start',
                    background: '#fff', border: '1px solid #E8E5DE',
                    borderRadius: '10px', padding: '12px 14px',
                  }}>
                    <div style={{
                      width: '32px', height: '32px', background: MINT,
                      borderRadius: '8px', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '15px', flexShrink: 0,
                    }}>{icon}</div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: INK, marginBottom: '2px', fontFamily: "'DM Sans', sans-serif" }}>{title}</div>
                      <div style={{ fontSize: '12px', color: MUTED, lineHeight: 1.55, fontFamily: "'DM Sans', sans-serif" }}>{body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={150} style={{ flexShrink: 0, width: isMobile ? '100%' : 'auto' }}>
            <PhoneMock name="Nichem Chemicals" subtitle="online" avatarText="NC" avatarBg={SAGE}>
              <DateDivider label="Today" />
              <Bubble
                out={false}
                text={"🧪 Hello! I'm Nichem's AI assistant. Ask me about any product — use case, dosage, spec sheet, or availability."}
                time="2:14 PM"
              />
              <Bubble out={true} text={"Do you have water purification chemicals?"} time="2:15 PM" />
              <Bubble
                out={false}
                text={"Yes! Our water treatment range includes:\n\n• WC-50 Clarifier — removes turbidity\n• PAC (Poly Aluminium Chloride) — coagulant for municipal & industrial use\n• DE-40 Dechlorinator — for aquaculture & process water\n\nWhat's your application?"}
                time="2:15 PM"
              />
              <Bubble out={true} text={"Industrial — roughly 50 tonnes per month"} time="2:16 PM" />
              <Bubble
                out={false}
                text={"Perfect — PAC is your best fit at that scale. Shall I have our sales team reach out with pricing and a COA?"}
                time="2:16 PM"
              />
            </PhoneMock>
          </Reveal>
        </div>
      </section>

      {/* Solution 3 — Multilingual */}
      <section style={{ background: '#fff', padding: isMobile ? '48px 20px' : '72px 32px' }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'flex', flexDirection: isMobile ? 'column' : 'row',
          gap: '48px', alignItems: 'center',
        }}>
          <div style={{ flex: 1 }}>
            <Reveal>
              <SectionHead label="Solution · 03" title="Speaks the language of every buyer — automatically." />
              <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.75, marginBottom: '16px', fontFamily: "'DM Sans', sans-serif" }}>
                Nichem attracts enquiries from Turkey, UAE, Indonesia, Germany, and beyond. When a prospect writes in Turkish, the bot replies in Turkish. Arabic gets Arabic. No translator needed.
              </p>
              <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif" }}>
                The bot auto-detects language from the very first message — and maintains that language throughout the entire conversation.
              </p>
            </Reveal>
          </div>

          <Reveal delay={150} style={{ flexShrink: 0, width: isMobile ? '100%' : 'auto' }}>
            <LangDemo />
          </Reveal>
        </div>
      </section>

      {/* Solution 4 — Lead capture + email */}
      <section style={{ background: MINT, padding: isMobile ? '48px 20px' : '72px 32px' }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse',
          gap: '48px', alignItems: 'flex-start',
        }}>
          <div style={{ flex: 1 }}>
            <Reveal>
              <SectionHead label="Solution · 04" title="Every promising conversation triggers an email to the sales team." />
              <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.75, marginBottom: '20px', fontFamily: "'DM Sans', sans-serif" }}>
                When the bot identifies buying intent — a specific product, a quantity, urgency — it qualifies the lead and sends a complete summary directly to the Nichem sales team.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { n: '1', t: 'Bot detects buying intent in the conversation' },
                  { n: '2', t: 'Collects name, contact, product requirement, and scale' },
                  { n: '3', t: 'Sends AI-written summary + full chat transcript to sales' },
                  { n: '4', t: 'Sales team follows up with context — no cold calls' },
                ].map(({ n, t }) => (
                  <div key={n} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      background: FOREST, color: '#fff',
                      fontSize: '11px', fontWeight: 700, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'DM Sans', sans-serif",
                    }}>{n}</div>
                    <div style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.6, paddingTop: '3px', fontFamily: "'DM Sans', sans-serif" }}>{t}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={150} style={{ flexShrink: 0, width: isMobile ? '100%' : 'auto' }}>
            <EmailLeadCard />
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PART 03 — THE IMPACT
      ══════════════════════════════════════════════════════════════════════ */}

      <section style={{
        background: FOREST, padding: isMobile ? '48px 20px 16px' : '64px 32px 16px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '4px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: GOLD, color: '#fff',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700, fontSize: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>3</div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: GOLD, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>
                The Impact
              </div>
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? '26px' : '34px', fontWeight: 700,
              color: '#fff', margin: '8px 0 0', lineHeight: 1.2,
            }}>
              From knowledge bottleneck to<br />
              <em style={{ color: '#F5C97A' }}>always-on sales assistant.</em>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Animated impact bars */}
      <section style={{ background: CREAM, padding: isMobile ? '48px 20px' : '64px 32px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '32px', alignItems: 'start',
          }}>
            <Reveal>
              <div style={{ marginBottom: '20px' }}>
                <SectionHead label="What changed" title="Before and after, by the numbers." />
              </div>
              <ImpactBars />
            </Reveal>

            <Reveal delay={150}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {[
                  { value: '24/7', sub: 'Availability — website & WhatsApp', icon: '⏰' },
                  { value: '10+', sub: 'Languages supported', icon: '🌍' },
                  { value: '100%', sub: 'of SKUs accessible to every buyer', icon: '🔬' },
                  { value: '0', sub: 'Leads lost to slow response', icon: '📩' },
                ].map(({ value, sub, icon }) => (
                  <div key={value} className="nichem-hover-card" style={{
                    background: '#fff', border: '1.5px solid #E8E5DE',
                    borderRadius: '14px', padding: '18px 16px',
                    textAlign: 'center',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  }}>
                    <div style={{ fontSize: '22px', marginBottom: '6px' }}>{icon}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '32px', fontWeight: 700, color: FOREST, lineHeight: 1,
                      marginBottom: '4px',
                    }}>{value}</div>
                    <div style={{ fontSize: '11px', color: MUTED, lineHeight: 1.45, fontFamily: "'DM Sans', sans-serif" }}>{sub}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section style={{ background: '#fff', padding: isMobile ? '48px 20px' : '64px 32px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <SectionHead label="Transformation" title="The way things used to work. The way they work now." />
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              {
                before: 'Buyer asks about a product — waits hours for a reply from whoever is available',
                after: 'Bot answers instantly, 24/7, with full product specs and use cases',
              },
              {
                before: "International buyer writes in Turkish — team can't respond, lead goes cold",
                after: 'Bot detects Turkish, replies in Turkish, qualifies the lead, sends to sales',
              },
              {
                before: 'Product knowledge lives with 2-3 senior people. They take leave. Business stops.',
                after: 'Every buyer gets expert-level answers, regardless of who is in office',
              },
              {
                before: 'Sales team gets vague WhatsApp enquiries — no context, no qualification',
                after: 'Sales gets a structured email: product, quantity, urgency, full chat history',
              },
              {
                before: 'Missed enquiries outside business hours = lost orders',
                after: 'Bot handles all hours — leads are captured and queued for the team',
              },
            ].map(({ before, after }, i) => (
              <Reveal key={i} delay={i * 60}>
                <BeforeAfter before={before} after={after} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Closing ──────────────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(160deg, ${FOREST} 0%, #2A6A50 60%, #1A5040 100%)`,
        padding: isMobile ? '64px 20px' : '96px 32px',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {/* Warm glow */}
        <div style={{
          position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)',
          width: '500px', height: '250px',
          background: `radial-gradient(ellipse, ${GOLD}18 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: '620px', margin: '0 auto', position: 'relative' }}>
          <Reveal>
            <div style={{ fontSize: '36px', marginBottom: '20px' }}>⚗️</div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? '28px' : '40px', fontWeight: 700,
              color: '#fff', margin: '0 0 16px', lineHeight: 1.15,
            }}>
              Nichem's knowledge is now available to every buyer,{' '}
              <em style={{ color: '#F5C97A' }}>everywhere, in every language.</em>
            </h2>
            <p style={{
              fontSize: '15px', color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.8, marginBottom: '32px',
              fontFamily: "'DM Sans', sans-serif",
            }}>
              The second generation didn't just inherit a chemical business. They gave it a brain that never sleeps, never forgets a product, and never lets a lead go cold.
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '10px', padding: '10px 20px',
            }}>
              <span style={{ fontSize: '14px' }}>🤝</span>
              <span style={{
                fontSize: '13px', color: 'rgba(255,255,255,0.85)',
                fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
              }}>Powered by Cohesion AI</span>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
