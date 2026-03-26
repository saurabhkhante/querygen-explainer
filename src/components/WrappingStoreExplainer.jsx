import React, { useEffect, useRef, useState } from 'react';

const PLUM  = '#4A1942';
const ROSE  = '#B76E79';
const CREAM = '#FDF8F5';
const INK   = '#1A1010';
const MUTED = '#8B6F6F';
const WA_GREEN = '#25D366';
const WA_BG    = '#ECE5DD';
const WA_BUBBLE_OUT = '#DCF8C6';
const WA_BUBBLE_IN  = '#FFFFFF';

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
    <div style={{ marginBottom: '32px' }}>
      <div style={{
        fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em',
        color: light ? ROSE : ROSE, marginBottom: '8px',
      }}>
        {label}
      </div>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '26px', fontWeight: 700,
        color: light ? '#fff' : INK,
        margin: 0, lineHeight: 1.25,
      }}>
        {title}
      </h2>
    </div>
  );
}

/* ── WhatsApp Phone Shell ── */
function PhoneMock({ children, caption, name = 'The Wrapping Store', avatar = '🎁' }) {
  return (
    <div>
      <div style={{
        background: '#1a1a1a', borderRadius: '28px',
        padding: '10px', boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
        maxWidth: '280px', margin: '0 auto',
        border: '2px solid #333',
      }}>
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
        <div style={{
          background: '#075E54',
          padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '50%',
            background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', flexShrink: 0,
          }}>{avatar}</div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{name}</div>
            <div style={{ fontSize: '10px', color: '#a0d0c0' }}>online</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
            <span style={{ color: '#a0d0c0', fontSize: '14px' }}>📞</span>
            <span style={{ color: '#a0d0c0', fontSize: '14px' }}>⋮</span>
          </div>
        </div>
        <div style={{
          background: WA_BG, height: '360px',
          padding: '10px 10px 6px',
          display: 'flex', flexDirection: 'column', gap: '6px',
          overflowY: 'auto',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9b49a' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}>
          {children}
        </div>
        <div style={{
          background: '#f0f0f0',
          padding: '8px 10px',
          display: 'flex', alignItems: 'center', gap: '8px',
          borderRadius: '0 0 18px 18px',
        }}>
          <div style={{
            flex: 1, background: '#fff', borderRadius: '20px',
            padding: '7px 12px', fontSize: '11px', color: '#aaa',
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
      {caption && (
        <p style={{
          textAlign: 'center', fontSize: '12px', color: MUTED,
          marginTop: '12px', fontStyle: 'italic',
        }}>
          {caption}
        </p>
      )}
    </div>
  );
}

/* ── WhatsApp bubble ── */
function Bubble({ text, out = false, time = '3:14 PM', isImage = false, imageLabel = '' }) {
  return (
    <div style={{ display: 'flex', justifyContent: out ? 'flex-end' : 'flex-start' }}>
      <div style={{
        background: out ? WA_BUBBLE_OUT : WA_BUBBLE_IN,
        borderRadius: out ? '12px 2px 12px 12px' : '2px 12px 12px 12px',
        padding: isImage ? '4px 4px 6px' : '8px 10px 4px',
        maxWidth: '82%',
        boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
      }}>
        {isImage ? (
          <div>
            <div style={{
              width: '160px', height: '110px',
              background: 'linear-gradient(135deg, #f8e0e8, #f0d0d8)',
              borderRadius: '8px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '4px',
            }}>
              <span style={{ fontSize: '28px' }}>🎁</span>
              <span style={{ fontSize: '9px', color: PLUM, fontWeight: 600 }}>{imageLabel}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '2px 2px 0' }}>
              <span style={{ fontSize: '9px', color: '#888' }}>{time} ✓✓</span>
            </div>
          </div>
        ) : (
          <div>
            <p style={{
              fontSize: '12px', margin: 0, lineHeight: '1.45',
              color: INK, whiteSpace: 'pre-line', wordBreak: 'break-word',
            }}>
              {text}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2px' }}>
              <span style={{ fontSize: '9px', color: '#888' }}>{time} {out ? '✓✓' : ''}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Date divider ── */
function DateDivider({ label }) {
  return (
    <div style={{ textAlign: 'center', margin: '4px 0' }}>
      <span style={{
        background: '#D9F0CC', color: '#555',
        fontSize: '10px', padding: '3px 10px',
        borderRadius: '8px', fontWeight: 500,
      }}>
        {label}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════
   SECTION 2: Prospects Table Mock
══════════════════════════════════════ */
const STAGE_COLORS = {
  'Inquiry':          { bg: '#EEF2FF', color: '#4338CA' },
  'Price Shared':     { bg: '#FEF9C3', color: '#854D0E' },
  'Product Selection':{ bg: '#E0F2FE', color: '#0369A1' },
  'Payment Received': { bg: '#F0FDF4', color: '#15803D' },
  'Delivered':        { bg: '#F0FDF4', color: '#15803D' },
  'Order Confirmed':  { bg: '#F3E8FF', color: '#7E22CE' },
  'Payment Pending':  { bg: '#FFF7ED', color: '#C2410C' },
  'Shipped':          { bg: '#E0F2FE', color: '#0369A1' },
};

const STAGE_TABS = [
  { label: 'All', count: 253 },
  { label: 'Inquiry', count: 121 },
  { label: 'Price Shared', count: 121 },
  { label: 'Product Selection', count: 42 },
  { label: 'Negotiation', count: 37 },
  { label: 'Payment Pending', count: 33 },
];

const PROSPECT_ROWS = [
  {
    name: 'Swapnal Patil',
    phone: '+917045123171',
    tag: 'Repeat',
    stage: 'Price Shared',
    items: 'Wedding Invitation platter (18×2…)',
    amount: '₹10,999',
    nextStep: 'Ask prospect to confirm quantity and delivery date, share final price including shipping to proceed with order confirmation.',
    time: '2h ago',
    detail: {
      quotePaid: { quote: '₹10,999', paid: null },
      itemTags: ['Wedding Invitation Platter (18×2)', 'Satin Ribbon', 'Organza Bags × 10'],
      orderDetails: { ref: null, method: null },
      instagram: 'Wedding decor reel — floral tray with gold ribbon',
      location: 'Pune',
      reelNote: 'Prospect shared a screenshot of reel TWS-2211 (wedding invitation platter arrangement).',
    },
  },
  {
    name: 'Shaik Yousuf',
    phone: '+919292916000007',
    tag: 'Repeat',
    stage: 'Payment Received',
    items: 'Heels cover, Saree cover, Bangles cover…',
    amount: '₹2,400',
    nextStep: 'Acknowledge payment and share receipt confirmation. Request full delivery address and preferred delivery date. Prepare order for dispatch.',
    time: '4h ago',
    detail: {
      quotePaid: { quote: '₹2,400', paid: '₹2,400' },
      itemTags: ['Heels cover', 'Saree cover', 'Bangles cover', 'Ring box / Ring platter (inquiry)'],
      orderDetails: { ref: 'T26032616592247267 · UTR: 895174976980', method: 'PhonePe / UPI (receipt shows GPay service, UPI network)' },
      instagram: 'Cover set reel — heels & saree packaging',
      location: null,
      reelNote: 'Prospect found via Instagram reel showing heels + saree cover combo. Direct inquiry, quick conversion.',
    },
  },
  {
    name: 'Tushar Patel',
    phone: '+917059889100',
    tag: 'Repeat',
    stage: 'Inquiry',
    items: 'Tray, Bridal Welcome Trousseau',
    amount: '—',
    nextStep: 'Ask prospect if they want pricing for the non-coloured tray or other options, share direct product links/prices and confirm quantities.',
    time: '6h ago',
    detail: {
      quotePaid: { quote: null, paid: null },
      itemTags: ['Tray 12×16 (6)', 'Foldable Hanger Tray', 'Bridal Welcome Trousseau'],
      orderDetails: { ref: null, method: null },
      instagram: 'Trousseau packing reel — multi-tray bridal set',
      location: 'Ahmedabad',
      reelNote: 'Prospect sent Instagram post link of bridal trousseau setup. Looking for 6-piece tray set for a December wedding.',
    },
  },
  {
    name: 'Mansi',
    phone: '+917894561230',
    tag: 'Repeat',
    stage: 'Price Shared',
    items: 'Foldable Tray, Tray with Acrylic lid For shoes, Wooden Tray…',
    amount: '₹30,000',
    nextStep: 'Ask prospect to confirm which items they want to order, request delivery address and preferred delivery date, provide shipping charges and share payment details.',
    time: '15h ago',
    detail: {
      quotePaid: { quote: '₹30,000', paid: null },
      itemTags: ['Foldable Tray', 'Tray with Acrylic Lid (shoes)', 'Wooden Tray with Lid (jewellery)', 'Wooden Tray with Lid (bangles)', 'Basket for Chocolates', 'Double Layer Acrylic Box'],
      orderDetails: { ref: null, method: null },
      instagram: 'Luxury trousseau reel — full set display',
      location: 'Gulbarga',
      reelNote: 'Prospect shared 3 Instagram screenshots of different tray styles. Large order — likely a wedding or gifting business buyer.',
    },
  },
];

function DetailSection({ label, icon, children }) {
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        marginBottom: '10px',
      }}>
        <span style={{ fontSize: '13px' }}>{icon}</span>
        <span style={{
          fontSize: '9px', fontWeight: 800, color: PLUM,
          letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>{label}</span>
        <div style={{ flex: 1, height: '1px', background: `${PLUM}15`, marginLeft: '4px' }} />
      </div>
      {children}
    </div>
  );
}

function ProspectDetailPanel({ detail, name, stage }) {
  const hasPayment = detail.quotePaid.quote || detail.quotePaid.paid;
  const hasOrderDetails = detail.orderDetails.ref || detail.orderDetails.method;
  const stageStyle = STAGE_COLORS[stage] || { bg: '#F3F4F6', color: '#374151' };

  return (
    <div style={{
      borderTop: `2px solid ${PLUM}18`,
      animation: 'fadeSlideIn 0.2s ease',
    }}>
      <style>{`@keyframes fadeSlideIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      {/* Identity bar — makes clear which prospect this belongs to */}
      <div style={{
        background: `${PLUM}08`,
        borderBottom: `1px solid ${PLUM}12`,
        padding: '10px 20px',
        display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: PLUM, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '11px', fontWeight: 800, flexShrink: 0,
        }}>
          {name.charAt(0).toUpperCase()}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: PLUM }}>{name}</span>
          <span style={{ fontSize: '9px', color: MUTED }}>·</span>
          <span style={{
            fontSize: '9px', fontWeight: 700, padding: '2px 8px', borderRadius: '8px',
            background: stageStyle.bg, color: stageStyle.color,
          }}>{stage}</span>
          {detail.location && (
            <>
              <span style={{ fontSize: '9px', color: MUTED }}>·</span>
              <span style={{ fontSize: '10px', color: MUTED }}>📍 {detail.location}</span>
            </>
          )}
        </div>
        {/* Payment status badges top-right */}
        {hasPayment && (
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
            {detail.quotePaid.quote && (
              <span style={{
                fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px',
                background: '#F3F4F6', color: '#374151', border: '1px solid #E5E7EB',
              }}>Quote {detail.quotePaid.quote}</span>
            )}
            {detail.quotePaid.paid && (
              <span style={{
                fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px',
                background: '#F0FDF4', color: '#15803D', border: '1px solid #86EFAC',
              }}>Paid {detail.quotePaid.paid}</span>
            )}
          </div>
        )}
      </div>

      {/* Detail content */}
      <div style={{ padding: '16px 20px 18px', background: '#FDFAF8', display: 'flex', flexDirection: 'column', gap: '18px' }}>

        {/* Items Discussed */}
        <DetailSection label="Items Discussed" icon="🛍️">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {detail.itemTags.map(item => (
              <span key={item} style={{
                fontSize: '11px', padding: '5px 11px', borderRadius: '20px',
                background: '#fff', color: INK,
                border: `1px solid ${PLUM}22`,
                boxShadow: '0 1px 3px rgba(74,25,66,0.06)',
              }}>{item}</span>
            ))}
          </div>
        </DetailSection>

        {/* Instagram source */}
        <DetailSection label="Instagram Source" icon="📸">
          <div style={{
            background: '#fff', border: `1px solid ${PLUM}15`,
            borderRadius: '10px', padding: '12px 14px',
            display: 'flex', alignItems: 'flex-start', gap: '12px',
            boxShadow: '0 1px 4px rgba(74,25,66,0.05)',
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
              background: 'linear-gradient(135deg, #f9a8d4 0%, #c084fc 50%, #60a5fa 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px',
            }}>🎁</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: INK, marginBottom: '3px' }}>{detail.instagram}</div>
              <div style={{ fontSize: '10px', color: MUTED, lineHeight: 1.55 }}>{detail.reelNote}</div>
            </div>
            <button style={{
              flexShrink: 0, alignSelf: 'center',
              fontSize: '10px', fontWeight: 700, padding: '6px 12px',
              background: '#FFF0F5', color: '#BE185D', border: '1px solid #FBCFE8',
              borderRadius: '8px', cursor: 'pointer',
            }}>↗ View post</button>
          </div>
        </DetailSection>

        {/* Order Details */}
        {hasOrderDetails && (
          <DetailSection label="Order Details" icon="🧾">
            <div style={{
              background: '#fff', border: `1px solid ${PLUM}15`,
              borderRadius: '10px', padding: '12px 14px',
              display: 'grid', gridTemplateColumns: '100px 1fr', gap: '8px 16px',
              boxShadow: '0 1px 4px rgba(74,25,66,0.05)',
            }}>
              {detail.orderDetails.ref && (
                <>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: MUTED, alignSelf: 'center' }}>Payment Ref</span>
                  <span style={{ fontSize: '10px', color: INK, fontFamily: 'monospace' }}>{detail.orderDetails.ref}</span>
                </>
              )}
              {detail.orderDetails.method && (
                <>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: MUTED, alignSelf: 'center' }}>Method</span>
                  <span style={{ fontSize: '11px', color: INK }}>{detail.orderDetails.method}</span>
                </>
              )}
            </div>
          </DetailSection>
        )}
      </div>
    </div>
  );
}

function ProspectsTableMock() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedRow, setExpandedRow] = useState(null);

  return (
    <div style={{
      background: '#fff', borderRadius: '14px',
      border: `1.5px solid ${PLUM}18`,
      boxShadow: '0 4px 24px rgba(74,25,66,0.08)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 20px',
        borderBottom: `1px solid ${PLUM}12`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontWeight: 700, fontSize: '14px', color: INK }}>
          All Prospects <span style={{ color: MUTED, fontWeight: 400 }}>253 total</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: '#FFF7ED', border: '1px solid #FED7AA',
          borderRadius: '20px', padding: '4px 10px',
        }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#F97316' }} />
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#C2410C' }}>37 stale</span>
        </div>
      </div>

      {/* Stage filter tabs */}
      <div style={{
        display: 'flex', gap: '0', overflowX: 'auto',
        borderBottom: `1px solid ${PLUM}12`,
        padding: '0 16px',
      }}>
        {STAGE_TABS.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              padding: '10px 14px', fontSize: '11px', fontWeight: 600,
              color: activeTab === i ? PLUM : MUTED,
              background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: activeTab === i ? `2px solid ${PLUM}` : '2px solid transparent',
              whiteSpace: 'nowrap', transition: 'all 0.2s',
            }}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Rows */}
      <div>
        {PROSPECT_ROWS.map((p, i) => {
          const stageStyle = STAGE_COLORS[p.stage] || { bg: '#F3F4F6', color: '#374151' };
          const isExpanded = expandedRow === i;
          return (
            <div key={i} style={{
              borderBottom: !isExpanded && i < PROSPECT_ROWS.length - 1 ? `1px solid ${PLUM}10` : 'none',
              border: isExpanded ? `1.5px solid ${PLUM}28` : undefined,
              borderRadius: isExpanded ? '10px' : undefined,
              background: isExpanded ? `${PLUM}05` : 'transparent',
              margin: isExpanded ? '4px -2px' : undefined,
              overflow: 'hidden',
              boxShadow: isExpanded ? `0 2px 14px ${PLUM}12` : undefined,
              transition: 'background 0.15s',
            }}>
              {/* Clickable row header */}
              <div
                onClick={() => setExpandedRow(isExpanded ? null : i)}
                style={{
                  padding: '12px 20px', cursor: 'pointer',
                }}
                onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.background = `${PLUM}03`; }}
                onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.background = 'transparent'; }}
              >
                {/* Row top */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '4px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: INK }}>{p.name}</span>
                      <span style={{
                        fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '10px',
                        background: p.tag === 'Repeat' ? '#F0FDF4' : '#EFF6FF',
                        color: p.tag === 'Repeat' ? '#15803D' : '#1D4ED8',
                      }}>{p.tag}</span>
                      <span style={{
                        fontSize: '9px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px',
                        background: stageStyle.bg, color: stageStyle.color,
                      }}>{p.stage}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: MUTED }}>{p.items}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: p.amount !== '—' ? PLUM : MUTED }}>{p.amount}</div>
                      <div style={{ fontSize: '10px', color: MUTED }}>{p.time}</div>
                    </div>
                    <span style={{ fontSize: '12px', color: MUTED, transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block' }}>▾</span>
                  </div>
                </div>
                {/* AI Next Step */}
                <div style={{ fontSize: '11px', color: '#C2410C', lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 700 }}>Next: </span>{p.nextStep}
                </div>
                {/* Actions */}
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                  <button onClick={e => e.stopPropagation()} style={{
                    padding: '4px 10px', fontSize: '10px', fontWeight: 700,
                    background: '#F0FDF4', color: '#15803D', border: '1px solid #86EFAC',
                    borderRadius: '6px', cursor: 'pointer',
                  }}>◎ WA</button>
                  <button onClick={e => e.stopPropagation()} style={{
                    padding: '4px 10px', fontSize: '10px', fontWeight: 700,
                    background: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE',
                    borderRadius: '6px', cursor: 'pointer',
                  }}>↗ Chat</button>
                </div>
              </div>

              {/* Expanded detail panel */}
              {isExpanded && <ProspectDetailPanel detail={p.detail} name={p.name} stage={p.stage} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SECTION 3: Prospect Detail Mock (combined)
══════════════════════════════════════ */
function ProspectDetailMock() {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 260px', gap: '32px',
      alignItems: 'flex-start',
    }}>
      {/* Left — detail card */}
      <div style={{ background: '#fff', borderRadius: '14px', border: `1.5px solid ${PLUM}18`, overflow: 'hidden', boxShadow: '0 4px 24px rgba(74,25,66,0.07)' }}>
        {/* Header */}
        <div style={{ background: PLUM, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: `${ROSE}44`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '15px', fontWeight: 700, color: '#fff',
            }}>M</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>Mansi</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>+91 78945 61230 · Gulbarga</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ fontSize: '9px', fontWeight: 700, padding: '3px 8px', borderRadius: '10px', background: '#F0FDF4', color: '#15803D' }}>Repeat</span>
            <span style={{ fontSize: '9px', fontWeight: 700, padding: '3px 8px', borderRadius: '10px', background: '#FEF9C344', color: '#FEF9C3', border: '1px solid #FEF9C344' }}>Price Shared</span>
          </div>
        </div>

        {/* AI Next Steps */}
        <div style={{ padding: '14px 18px', background: '#FFFBF0', borderBottom: `1px solid ${PLUM}10` }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: '#C2410C', letterSpacing: '0.1em', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span>⚡</span> NEXT STEPS
          </div>
          <p style={{ fontSize: '12px', color: '#9A3412', lineHeight: 1.6, margin: 0 }}>
            Ask the prospect to confirm which items they want to order, request delivery address and preferred delivery date, provide shipping charges and lead time, and share payment details (UPI/Bank) to confirm the order.
          </p>
        </div>

        {/* Stage Progress */}
        <div style={{ padding: '14px 18px', borderBottom: `1px solid ${PLUM}10` }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: MUTED, letterSpacing: '0.1em', marginBottom: '10px' }}>STAGE PROGRESS</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0', overflowX: 'auto' }}>
            {['Inquiry', 'Product Selection', 'Price Shared', 'Negotiation', 'Order Confirmed', 'Payment Pending'].map((s, i) => {
              const isActive = s === 'Price Shared';
              const isDone = i < 2;
              return (
                <React.Fragment key={s}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '72px' }}>
                    <div style={{
                      width: '10px', height: '10px', borderRadius: '50%',
                      background: isActive ? PLUM : isDone ? ROSE : `${PLUM}30`,
                      border: isActive ? `2px solid ${ROSE}` : 'none',
                      flexShrink: 0,
                    }} />
                    <span style={{ fontSize: '8px', color: isActive ? PLUM : isDone ? ROSE : MUTED, fontWeight: isActive ? 700 : 400, textAlign: 'center', lineHeight: 1.2 }}>{s}</span>
                  </div>
                  {i < 5 && <div style={{ height: '1px', flex: 1, background: isDone ? ROSE : `${PLUM}20`, marginBottom: '14px', flexShrink: 0, minWidth: '8px' }} />}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Items Discussed (Dashboard 1 style) */}
        <div style={{ padding: '14px 18px', borderBottom: `1px solid ${PLUM}10` }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: MUTED, letterSpacing: '0.1em', marginBottom: '8px' }}>ITEMS DISCUSSED</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
            {['Foldable Tray', 'Tray with Acrylic Lid for Shoes', 'Wooden Tray with Lid', 'Basket for Chocolates'].map(item => (
              <span key={item} style={{
                fontSize: '10px', padding: '4px 8px', borderRadius: '6px',
                background: `${ROSE}15`, color: PLUM, border: `1px solid ${ROSE}33`,
              }}>{item}</span>
            ))}
            <span style={{ fontSize: '10px', padding: '4px 8px', borderRadius: '6px', background: `${PLUM}10`, color: MUTED }}>+4 more</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '9px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: `${ROSE}15`, color: PLUM }}>Quote ₹30,000</span>
            <span style={{ fontSize: '10px', color: MUTED }}>Pending payment</span>
          </div>
        </div>

        {/* Activity Timeline */}
        <div style={{ padding: '14px 18px' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: MUTED, letterSpacing: '0.1em', marginBottom: '12px' }}>ACTIVITY TIMELINE</div>
          {[
            { stage: 'Inquiry', stageColor: '#4338CA', stageBg: '#EEF2FF', date: '20 Mar 2026, 11:42 am', messages: ['Mansi: Hi, I want trays for a wedding trousseau. Can you share the catalogue?'] },
            { stage: 'Price Shared', stageColor: '#854D0E', stageBg: '#FEF9C3', date: '22 Mar 2026, 03:15 pm', messages: ['Mansi: I want the foldable tray, wooden tray with lid and a few more. How much for 15 pieces total?', 'The Wrapping Store: Sharing full price list now. Total comes to ₹30,000 for the set.'] },
          ].map((entry, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: entry.stageColor, flexShrink: 0, marginTop: '2px' }} />
                {i < 1 && <div style={{ width: '1px', flex: 1, background: `${PLUM}15`, marginTop: '4px', minHeight: '30px' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '6px', background: entry.stageBg, color: entry.stageColor }}>{entry.stage}</span>
                  <span style={{ fontSize: '9px', color: MUTED }}>{entry.date}</span>
                </div>
                {entry.messages.map((msg, j) => (
                  <div key={j} style={{
                    background: '#F9F9F9', borderRadius: '6px', padding: '6px 8px',
                    fontSize: '10px', color: INK, lineHeight: 1.4, marginBottom: '4px',
                    border: `1px solid ${PLUM}08`,
                  }}>
                    {msg}
                  </div>
                ))}
                <button style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '10px', color: ROSE, padding: '2px 0', display: 'flex', alignItems: 'center', gap: '3px',
                }}>
                  ☰ AI Summary ▼
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — PhoneMock */}
      <div>
        <PhoneMock caption="The conversation that started it all" name="Mansi" avatar="👩">
          <DateDivider label="20 Mar 2026" />
          <Bubble text={"Hi! I want trays for a wedding trousseau. Saw your Reels — beautiful work 😍"} time="11:42 AM" out={false} />
          <Bubble text={"Thank you! Please share a picture from our profile or Instagram of the products you like and we'll share prices."} time="11:44 AM" out />
          <Bubble isImage imageLabel="instagram.com/the_wrapping_store" time="11:46 AM" out={false} />
          <Bubble text={"I want the foldable tray, wooden tray with lid, basket for chocolates. Around 15 pieces total — for a wedding."} time="11:49 AM" out={false} />
          <DateDivider label="22 Mar 2026" />
          <Bubble text={"Full price list for 15 pieces:\n\nFoldable Tray × 5: ₹8,500\nWooden Tray × 6: ₹12,000\nBasket × 4: ₹9,500\n\nTotal: ₹30,000"} time="3:15 PM" out />
        </PhoneMock>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SECTION 4: Stale Prospect Mock
══════════════════════════════════════ */
const STALE_ROWS = [
  { name: 'Anjali R.',   days: '8 days',  item: 'Acrylic Double Layer × 2', amount: '₹4,200' },
  { name: 'Tanu K.',     days: '11 days', item: 'Wedding Invitation Platter × 4', amount: '₹8,200' },
  { name: 'Priya S.',    days: '14 days', item: 'Wedding Tray Set × 8', amount: '₹18,400' },
  { name: 'Meera J.',    days: '9 days',  item: 'Satin Pouch + Ribbon', amount: '₹2,800' },
  { name: 'Deepak P.',   days: '17 days', item: 'Corporate Gift Hamper', amount: '₹11,500' },
  { name: 'Fatima S.',   days: '21 days', item: 'Cover With Decor × 6', amount: '₹7,200' },
];

function StaleProspectMock() {
  const [highlighted, setHighlighted] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlighted(h => (h + 1) % STALE_ROWS.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'flex-start' }}>
      {/* Left — stale list */}
      <div>
        <div style={{ fontSize: '9px', fontWeight: 700, color: MUTED, letterSpacing: '0.12em', marginBottom: '12px' }}>
          STALE PROSPECTS — FLAGGED BY AI
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {STALE_ROWS.map((row, i) => (
            <div key={i} style={{
              background: highlighted === i ? `${ROSE}18` : '#fff',
              border: highlighted === i ? `1px solid ${ROSE}55` : '1px solid rgba(0,0,0,0.07)',
              borderLeft: highlighted === i ? `3px solid ${ROSE}` : '3px solid transparent',
              borderRadius: '10px', padding: '10px 12px',
              transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: INK, marginBottom: '2px' }}>{row.name}</div>
                  <div style={{ fontSize: '10px', color: MUTED }}>{row.item}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: ROSE }}>{row.amount}</div>
                  <span style={{
                    fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '6px',
                    background: '#FEF3C7', color: '#92400E', display: 'inline-block', marginTop: '2px',
                  }}>
                    {row.days} ago
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div style={{ textAlign: 'center', fontSize: '10px', color: MUTED, padding: '8px 0' }}>
            +31 more stale prospects
          </div>
        </div>
      </div>

      {/* Right — stat + math */}
      <div>
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '80px', fontWeight: 700, color: ROSE, lineHeight: 1,
          }}>37</div>
          <div style={{ fontSize: '13px', color: MUTED, marginTop: '4px' }}>stale prospects identified</div>
          <div style={{ fontSize: '12px', color: MUTED, marginTop: '4px' }}>
            People who showed interest — then went silent.
          </div>
        </div>

        <div style={{
          background: '#fff', border: `1.5px solid ${ROSE}33`,
          borderRadius: '14px', padding: '20px 22px',
          boxShadow: '0 2px 12px rgba(183,110,121,0.1)',
        }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: ROSE, letterSpacing: '0.12em', marginBottom: '14px' }}>
            IF YOU RECOVER JUST 1 ORDER / MONTH
          </div>
          {[
            { label: 'Avg. gift order value', value: '₹40,790' },
            { label: '× Orders recovered / month', value: '× 1' },
            { label: '= Monthly recovery', value: '₹40,790', highlight: true },
          ].map(({ label, value, highlight }, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              borderBottom: i < 2 ? `1px solid ${ROSE}22` : 'none',
              padding: '8px 0',
            }}>
              <span style={{ fontSize: '11px', color: MUTED }}>{label}</span>
              <span style={{
                fontFamily: highlight ? "'Cormorant Garamond', serif" : 'inherit',
                fontSize: highlight ? '20px' : '13px',
                fontWeight: 700,
                color: highlight ? ROSE : INK,
              }}>{value}</span>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '12px', color: MUTED, lineHeight: 1.6, marginTop: '16px' }}>
          Before Querygen, these conversations were invisible — buried in old WhatsApp threads with no way to know they'd gone cold.
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SECTION 5: Sales Funnel Mock
══════════════════════════════════════ */
const FUNNEL_STAGES = [
  { label: 'Inquiry',           count: 251, pct: 100,  dropPct: null,   color: '#6366F1', targetWidth: '100%' },
  { label: 'Price Shared',      count: 121, pct: 48,   dropPct: '-52%', color: '#818CF8', targetWidth: '88%'  },
  { label: 'Product Selection', count: 42,  pct: 35,   dropPct: '-65%', color: '#A78BFA', targetWidth: '72%', bigDrop: true },
  { label: 'Negotiation',       count: 37,  pct: 88,   dropPct: '-12%', color: '#F59E0B', targetWidth: '60%'  },
  { label: 'Quote Shared',      count: 36,  pct: 97,   dropPct: '-3%',  color: '#FBBF24', targetWidth: '56%'  },
  { label: 'Order Confirmed',   count: 36,  pct: 100,  dropPct: '0%',   color: '#10B981', targetWidth: '54%'  },
  { label: 'Payment Pending',   count: 33,  pct: 92,   dropPct: '-8%',  color: '#F97316', targetWidth: '50%', warn: true },
  { label: 'Payment Received',  count: 27,  pct: 82,   dropPct: '-18%', color: '#22C55E', targetWidth: '44%'  },
  { label: 'Shipped',           count: 9,   pct: 33,   dropPct: '-67%', color: '#3B82F6', targetWidth: '28%'  },
  { label: 'Delivered',         count: 4,   pct: 44,   dropPct: null,   color: '#14B8A6', targetWidth: '20%'  },
  { label: 'Closed Lost',       count: 6,   pct: null, dropPct: null,   color: '#F87171', targetWidth: '16%'  },
];

function FunnelMock() {
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

  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: '40px', alignItems: 'flex-start' }}>
      {/* Left — funnel bars */}
      <div>
        {FUNNEL_STAGES.map((s, i) => (
          <div key={i} style={{ marginBottom: '4px' }}>
            <div style={{
              width: visible ? s.targetWidth : '8%',
              background: s.color,
              borderRadius: '6px',
              padding: '9px 14px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${i * 60}ms`,
              minWidth: '80px',
            }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{s.label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {s.bigDrop && <span style={{ fontSize: '9px', background: 'rgba(255,255,255,0.25)', padding: '1px 5px', borderRadius: '4px', color: '#fff', fontWeight: 700 }}>⚠️ big drop</span>}
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>{s.count}</span>
                {s.dropPct && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.65)' }}>{s.dropPct}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right — stat callouts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[
          { num: '7.5%', label: 'Inquiry → Payment', sub: 'Overall conversion rate' },
          { num: '33', label: 'In Payment Pending', sub: '₹34,100 waiting to be collected', warn: true },
          { num: '-65%', label: 'Biggest drop-off', sub: 'Inquiry → Product Selection', warn: true },
        ].map(({ num, label, sub, warn }, i) => (
          <div key={i} style={{
            background: warn ? '#FFF7ED' : `${PLUM}06`,
            border: `1px solid ${warn ? '#FED7AA' : `${PLUM}18`}`,
            borderRadius: '10px', padding: '14px 16px',
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '28px', fontWeight: 700,
              color: warn ? '#C2410C' : PLUM, lineHeight: 1,
            }}>{num}</div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: warn ? '#9A3412' : INK, marginTop: '4px' }}>{label}</div>
            <div style={{ fontSize: '10px', color: MUTED, marginTop: '2px' }}>{sub}</div>
          </div>
        ))}

        <div style={{
          background: '#FFF7ED', border: '1px solid #FED7AA',
          borderRadius: '10px', padding: '12px 14px',
        }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#C2410C', marginBottom: '4px' }}>💡 The opportunity</div>
          <div style={{ fontSize: '11px', color: '#9A3412', lineHeight: 1.5 }}>
            33 prospects stuck in Payment Pending. Each one has already said yes. They just need a nudge.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SECTION 6: Word Cloud + Revenue
══════════════════════════════════════ */
const CLOUD_WORDS = [
  // [text, fontSize, color, opacity, top, left, rotate]
  ['Cover With Decor',         30, PLUM,   1.0,  '38%', '20%',  0  ],
  ['Acrylic Double Layer',     20, ROSE,   0.95, '15%', '8%',   -3 ],
  ['Trays',                    24, PLUM,   0.9,  '60%', '50%',  0  ],
  ['Tray',                     18, PLUM,   0.85, '20%', '55%',  2  ],
  ['Wedding Inv. Platter',     16, ROSE,   0.85, '70%', '15%',  -4 ],
  ['Acrylic Box For Sweets',   15, MUTED,  0.8,  '50%', '72%',  3  ],
  ['Acrylic Bag 12 Inch',      14, MUTED,  0.75, '78%', '40%',  -2 ],
  ['Cover With Flower Bunch',  13, ROSE,   0.7,  '10%', '38%',  4  ],
  ['Saree Cover',              13, MUTED,  0.65, '55%', '2%',   -3 ],
  ['Fruit Basket',             12, MUTED,  0.6,  '82%', '68%',  2  ],
  ['Flower Bunch',             12, PLUM,   0.55, '28%', '82%',  -5 ],
  ['Acrylic Boxes',            11, MUTED,  0.5,  '88%', '20%',  3  ],
  ['Sweet Box',                11, ROSE,   0.45, '8%',  '72%',  6  ],
  ['Acrylic Box 14×14',        10, MUTED,  0.4,  '45%', '88%',  -4 ],
];

const REVENUE_BARS = [
  { label: 'Collected',  amount: '₹7,75,018', pct: 100, color: '#22C55E', bg: '#F0FDF4', border: '#86EFAC' },
  { label: 'Awaiting',   amount: '₹34,100',   pct: 4,   color: ROSE,      bg: `${ROSE}10`, border: `${ROSE}33` },
];

function RevenueBarsMock() {
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

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ fontSize: '9px', fontWeight: 700, color: MUTED, letterSpacing: '0.12em', marginBottom: '4px' }}>REVENUE PIPELINE</div>
      {REVENUE_BARS.map(({ label, amount, pct, color, bg, border }, i) => (
        <div key={i} style={{ background: bg, border: `1px solid ${border}`, borderRadius: '10px', padding: '12px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: INK }}>{label}</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 700, color }}>{amount}</span>
          </div>
          <div style={{ background: `${color}20`, borderRadius: '4px', height: '7px', overflow: 'hidden' }}>
            <div style={{
              width: visible ? `${pct}%` : '0%', height: '100%',
              background: color, borderRadius: '4px',
              transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${i * 200}ms`,
            }} />
          </div>
        </div>
      ))}
      <div style={{ padding: '10px 14px', background: `${PLUM}06`, border: `1px solid ${PLUM}18`, borderRadius: '10px' }}>
        <div style={{ fontSize: '10px', color: MUTED, marginBottom: '2px' }}>Total pipeline</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 700, color: PLUM }}>₹8,09,118</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
const WrappingStoreExplainer = () => {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const BEFORE_AFTER = [
    { before: '🔍 No idea which of 253 prospects are still interested', after: '✅ Every prospect tracked across 11 stages with stage, last activity, and AI next step' },
    { before: '💬 Quotes shared over chat — no record if accepted or ignored', after: '📋 Price Shared stage tracked. AI flags if no reply after a few days' },
    { before: '🤷 "Who are my repeat buyers?" — manual memory or guess', after: '🔄 First Timer / Repeat tags auto-extracted from conversation history' },
    { before: '📉 No funnel — no idea where deals are dying', after: '📊 11-stage funnel visible. Biggest drop: -65% at Product Selection' },
    { before: '😴 37 warm leads went cold silently — no one noticed', after: '⚠️ Stale prospect list generated daily, each flagged with days since last message' },
    { before: '🤔 "Which product sells best?" — gut feeling only', after: '☁️ Product popularity ranked by mentions. Cover With Decor leads with 17' },
    { before: '💰 Partial payments buried in chat, no structured record', after: '🧾 Payment card per prospect: Total / Paid / Due extracted automatically' },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: CREAM, color: INK, minHeight: '100vh', overflowX: 'hidden' }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500&family=DM+Sans:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      {/* ════════════ HERO ════════════ */}
      <section style={{
        background: `linear-gradient(160deg, ${PLUM} 0%, #17051A 100%)`,
        position: 'relative', overflow: 'hidden',
        padding: '80px 24px 72px',
      }}>
        {/* Crosshatch overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.05,
          backgroundImage: `repeating-linear-gradient(45deg, ${ROSE} 0, ${ROSE} 1px, transparent 1px, transparent 12px),
                            repeating-linear-gradient(-45deg, ${ROSE} 0, ${ROSE} 1px, transparent 1px, transparent 12px)`,
        }} />
        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: `radial-gradient(circle, ${ROSE}22 0%, transparent 70%)`,
        }} />

        <div style={{ position: 'relative', maxWidth: '680px', margin: '0 auto' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: `${ROSE}22`, border: `1px solid ${ROSE}55`,
            borderRadius: '20px', padding: '6px 14px', marginBottom: '24px',
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: ROSE }} />
            <span style={{ fontSize: '10px', fontWeight: 700, color: ROSE, letterSpacing: '0.1em' }}>
              A PROPOSAL FROM QUERYGEN
            </span>
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '42px', fontWeight: 700,
            color: '#fff', lineHeight: 1.2, margin: '0 0 20px',
          }}>
            The Wrapping Store —<br />
            <span style={{ color: ROSE, fontStyle: 'italic' }}>a pipeline that finds</span><br />
            your missing sales.
          </h1>

          {/* Subtext */}
          <p style={{
            fontSize: '15px', lineHeight: 1.7,
            color: 'rgba(255,255,255,0.65)', margin: '0 0 40px', maxWidth: '520px',
          }}>
            Right now, 253 WhatsApp conversations are black boxes. You don't know who's about to convert — and who went cold 3 weeks ago.
          </p>

          {/* Stat strip */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px',
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}>
            {[
              { num: '253', label: 'Prospects tracked' },
              { num: '37',  label: 'Gone stale' },
              { num: '7.5%', label: 'Inquiry → Payment' },
            ].map(({ num, label }) => (
              <div key={label} style={{
                background: `${ROSE}18`, border: `1px solid ${ROSE}44`,
                borderRadius: '12px', padding: '16px 18px',
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '30px', fontWeight: 700, color: ROSE, lineHeight: 1,
                }}>{num}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ SECTION 1: PROSPECTS VIEW ════════════ */}
      <section style={{ padding: '72px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <Reveal>
          <SectionHead label="01 — THE PIPELINE" title="Every WhatsApp conversation becomes a tracked deal." />
        </Reveal>
        <Reveal delay={60}>
          <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7, margin: '0 0 32px', maxWidth: '600px' }}>
            Querygen reads every chat and builds a live pipeline automatically. No manual entry. No new tool for the team to learn. The dashboard just appears.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <ProspectsTableMock />
        </Reveal>
        <Reveal delay={160}>
          <div style={{ display: 'flex', gap: '24px', marginTop: '24px', flexWrap: 'wrap' }}>
            {[
              { num: '11', label: 'deal stages tracked' },
              { num: '253', label: 'total prospects' },
              { num: '230', label: 'active pipeline' },
            ].map(({ num, label }) => (
              <div key={label} style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 700, color: PLUM }}>{num}</span>
                <span style={{ fontSize: '12px', color: MUTED }}>{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ════════════ SECTION 2: AI INTELLIGENCE ════════════ */}
      <section style={{
        background: '#fff', borderTop: `1px solid ${PLUM}12`,
        borderBottom: `1px solid ${PLUM}12`, padding: '72px 24px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <SectionHead label="02 — AI INTELLIGENCE" title="Every prospect gets a dedicated AI analyst." />
          </Reveal>
          <Reveal delay={60}>
            <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7, margin: '0 0 36px', maxWidth: '600px' }}>
              Querygen reads every message in the thread and surfaces exactly what to do next — specific, actionable, and tailored to that conversation.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ProspectDetailMock />
          </Reveal>
          <Reveal delay={140}>
            <div style={{
              marginTop: '32px', padding: '14px 20px',
              background: `${PLUM}06`, border: `1px solid ${PLUM}18`,
              borderRadius: '10px', fontSize: '13px', color: PLUM, lineHeight: 1.6,
              textAlign: 'center',
            }}>
              "Every message. Every payment. Every stage change. Tracked automatically — without your team doing anything different."
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ SECTION 3: STALE PROSPECTS ════════════ */}
      <section style={{
        background: '#FDF0F2', padding: '80px 24px',
        position: 'relative', overflow: 'hidden',
        borderTop: `1px solid ${ROSE}22`,
      }}>
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(${ROSE}25 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }} />
        {/* Glow */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '480px', height: '480px', borderRadius: '50%',
          background: `radial-gradient(circle, ${ROSE}20 0%, transparent 65%)`,
        }} />
        <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <SectionHead
              label="⚠️  THE KILLER INSIGHT"
              title={<>37 prospects went quiet.<br />Each one is a gift order waiting to happen.</>}
            />
          </Reveal>
          <Reveal delay={80}>
            <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7, margin: '0 0 40px', maxWidth: '560px' }}>
              Before Querygen, these conversations were invisible — buried in old WhatsApp threads, with no way to know they'd gone cold.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <StaleProspectMock />
          </Reveal>
        </div>
      </section>

      {/* ════════════ SECTION 4: SALES FUNNEL ════════════ */}
      <section style={{
        background: '#fff', borderTop: `1px solid ${PLUM}12`, padding: '72px 24px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <SectionHead label="03 — SALES FUNNEL" title="251 inquiries. 4 deliveries. Here's where each one went." />
          </Reveal>
          <Reveal delay={60}>
            <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7, margin: '0 0 36px', maxWidth: '600px' }}>
              The funnel tells you where you're losing deals — before the money disappears.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <FunnelMock />
          </Reveal>
        </div>
      </section>

      {/* ════════════ SECTION 5: PRODUCT INTELLIGENCE ════════════ */}
      <section style={{ background: '#fff', borderTop: `1px solid ${PLUM}12`, padding: '72px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Reveal>
          <SectionHead label="04 — PRODUCT INTELLIGENCE" title="What your customers actually want." />
        </Reveal>
        <Reveal delay={60}>
          <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7, margin: '0 0 36px', maxWidth: '600px' }}>
            Querygen reads every conversation and counts which products customers ask about most — ranked by mentions, automatically.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '48px', alignItems: 'flex-start' }}>
            {/* Word Cloud */}
            <div style={{
              background: '#fff', borderRadius: '14px',
              border: `1.5px solid ${PLUM}18`,
              padding: '24px',
              boxShadow: '0 4px 24px rgba(74,25,66,0.06)',
            }}>
              <div style={{ fontSize: '9px', fontWeight: 700, color: MUTED, letterSpacing: '0.12em', marginBottom: '16px' }}>
                PRODUCT POPULARITY — TOP ITEMS DISCUSSED
              </div>
              <div style={{ position: 'relative', height: '240px', userSelect: 'none' }}>
                {CLOUD_WORDS.map(([text, size, color, opacity, top, left, rotate]) => (
                  <span key={text} style={{
                    position: 'absolute', top, left,
                    fontSize: `${size}px`, fontWeight: 700,
                    color, opacity,
                    transform: `rotate(${rotate}deg)`,
                    fontFamily: "'Cormorant Garamond', serif",
                    whiteSpace: 'nowrap',
                  }}>
                    {text}
                  </span>
                ))}
              </div>
            </div>

            {/* Revenue bars */}
            <RevenueBarsMock />
          </div>
        </Reveal>
      </div>
      </section>

      {/* ════════════ BEFORE / AFTER ════════════ */}
      <section style={{
        background: CREAM, borderTop: `1px solid ${PLUM}12`,
        padding: '72px 24px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Reveal>
          <SectionHead label="05 — THE TRANSFORMATION" title="Before vs. after, in one view." />
        </Reveal>
        {BEFORE_AFTER.map(({ before, after }, i) => (
          <Reveal key={i} delay={i * 50}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 36px 1fr',
              gap: '10px', alignItems: 'center', marginBottom: '10px',
            }}>
              <div style={{
                background: '#FFF5F5', border: '1px solid #F5C6C6',
                borderRadius: '8px', padding: '10px 12px',
                fontSize: '12px', color: '#7A2020', lineHeight: 1.45,
              }}>
                {before}
              </div>
              <div style={{ textAlign: 'center', fontSize: '16px', color: ROSE }}>→</div>
              <div style={{
                background: '#F0FDF4', border: '1px solid #86EFAC',
                borderRadius: '8px', padding: '10px 12px',
                fontSize: '12px', color: '#14532D', lineHeight: 1.45,
              }}>
                {after}
              </div>
            </div>
          </Reveal>
        ))}
        </div>
      </section>

      {/* ════════════ CLOSING ════════════ */}
      <section style={{
        background: `linear-gradient(160deg, ${PLUM} 0%, #17051A 100%)`,
        position: 'relative', overflow: 'hidden',
        padding: '72px 24px 64px',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.05,
          backgroundImage: `repeating-linear-gradient(45deg, ${ROSE} 0, ${ROSE} 1px, transparent 1px, transparent 12px),
                            repeating-linear-gradient(-45deg, ${ROSE} 0, ${ROSE} 1px, transparent 1px, transparent 12px)`,
        }} />
        <div style={{
          position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)',
          width: '400px', height: '400px', borderRadius: '50%',
          background: `radial-gradient(circle, ${ROSE}1a 0%, transparent 70%)`,
        }} />
        <div style={{ position: 'relative', maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <div style={{ width: '40px', height: '2px', background: ROSE, margin: '0 auto 24px' }} />
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '28px', fontWeight: 700, color: '#fff',
              lineHeight: 1.3, margin: '0 0 16px',
            }}>
              The Wrapping Store deserves to know which conversations are alive — and which ones need one last message.
            </h2>
            <p style={{
              fontSize: '14px', lineHeight: 1.7,
              color: 'rgba(255,255,255,0.62)', margin: '0 0 32px',
            }}>
              Every gift in those boxes started as a WhatsApp message. Querygen makes sure none of those conversations — or the revenue inside them — gets lost.
            </p>

            {/* Next step */}
            <div style={{
              background: `${ROSE}1a`, border: `1.5px solid ${ROSE}44`,
              borderRadius: '12px', padding: '20px 24px',
              textAlign: 'left', marginBottom: '28px',
            }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: ROSE, letterSpacing: '0.1em', marginBottom: '8px' }}>
                GET STARTED
              </div>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.65, margin: '0 0 14px', fontWeight: 500 }}>
                We set everything up. You use it for a week.
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: 0 }}>
                Share your WhatsApp business number, we connect Querygen, and your full pipeline appears — every prospect, every stage, every AI next step. No technical work on your end. We work with you, together, every step of the way.
              </p>
            </div>

            {/* Footer badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: `${ROSE}18`, border: `1px solid ${ROSE}44`,
              borderRadius: '20px', padding: '6px 18px',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: ROSE }} />
              <span style={{ fontSize: '12px', color: ROSE, fontWeight: 600 }}>querygen.ai</span>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};

export default WrappingStoreExplainer;
