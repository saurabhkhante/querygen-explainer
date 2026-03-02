import React, { useEffect, useRef, useState } from 'react';

const GOLD = '#C9922A';
const MAROON = '#6B1A2B';
const CREAM = '#FDF6EC';
const INK = '#1C1209';
const MUTED = '#7A6450';
const WA_GREEN = '#25D366';
const WA_BG = '#ECE5DD';
const WA_BUBBLE_OUT = '#DCF8C6';
const WA_BUBBLE_IN = '#FFFFFF';

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
        color: light ? `${GOLD}` : GOLD, marginBottom: '8px',
      }}>
        {label}
      </div>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '26px', fontWeight: 700,
        color: light ? '#fff' : INK,
        margin: 0, lineHeight: 1.25,
      }}>
        {title}
      </h2>
    </div>
  );
}

/* ══════════════════════════════════════
   MOCK: WhatsApp Phone Shell
══════════════════════════════════════ */
function PhoneMock({ children, caption, name = 'Sunita Sharma', avatar = '🪡' }) {
  return (
    <div>
      <div style={{
        background: '#1a1a1a', borderRadius: '28px',
        padding: '10px', boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
        maxWidth: '280px', margin: '0 auto',
        border: '2px solid #333',
      }}>
        {/* Top bar */}
        <div style={{
          background: '#111', borderRadius: '18px 18px 0 0',
          padding: '8px 16px 6px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: '10px', color: '#888' }}>9:41</span>
          <div style={{
            width: '60px', height: '6px', background: '#333',
            borderRadius: '3px',
          }} />
          <div style={{ display: 'flex', gap: '4px' }}>
            {[4, 3, 2].map(h => (
              <div key={h} style={{ width: '3px', height: `${h * 2}px`, background: '#888', borderRadius: '1px', alignSelf: 'flex-end' }} />
            ))}
          </div>
        </div>
        {/* WA Header */}
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
        {/* Chat area */}
        <div style={{
          background: WA_BG, minHeight: '320px',
          padding: '10px 10px 6px',
          display: 'flex', flexDirection: 'column', gap: '6px',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9b49a' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}>
          {children}
        </div>
        {/* Input bar */}
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
function Bubble({ text, out = false, time = '3:14 PM', isImage = false, imageLabel = '', link = false }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: out ? 'flex-end' : 'flex-start',
    }}>
      <div style={{
        background: out ? WA_BUBBLE_OUT : WA_BUBBLE_IN,
        borderRadius: out ? '12px 2px 12px 12px' : '2px 12px 12px 12px',
        padding: isImage ? '4px 4px 6px' : '8px 10px 4px',
        maxWidth: '82%',
        boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
        position: 'relative',
      }}>
        {isImage ? (
          <div>
            <div style={{
              width: '160px', height: '110px',
              background: 'linear-gradient(135deg, #f8e0e8, #f0d0d8)',
              borderRadius: '8px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '4px',
            }}>
              <span style={{ fontSize: '28px' }}>🥻</span>
              <span style={{ fontSize: '9px', color: MAROON, fontWeight: 600 }}>{imageLabel}</span>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'flex-end',
              padding: '2px 2px 0',
            }}>
              <span style={{ fontSize: '9px', color: '#888' }}>{time} ✓✓</span>
            </div>
          </div>
        ) : (
          <div>
            <p style={{
              fontSize: '12px', margin: 0, lineHeight: '1.45',
              color: INK, whiteSpace: 'pre-line', wordBreak: 'break-word',
            }}>
              {link ? (
                <>
                  {text.split('checkout.laajcreations.in/')[0]}
                  <span style={{ color: '#0066cc', textDecoration: 'underline', wordBreak: 'break-all' }}>
                    checkout.laajcreations.in/order/xk92m
                  </span>
                  {text.split('\norder/xk92m')[1]}
                </>
              ) : text}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2px' }}>
              <span style={{ fontSize: '9px', color: '#888' }}>
                {time} {out ? '✓✓' : ''}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Date divider in WA chat ── */
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
   MOCK: Quick-reply selector (team dashboard)
══════════════════════════════════════ */
function QuickReplyMock() {
  const [selected, setSelected] = useState(null);
  const sarees = [
    { sku: 'LC-0452', name: 'Magenta Banarasi Silk', price: '₹2,400', emoji: '🥻' },
    { sku: 'LC-0453', name: 'Teal Kanjivaram', price: '₹3,100', emoji: '🪡' },
    { sku: 'LC-0454', name: 'Ivory Chiffon', price: '₹1,800', emoji: '✨' },
  ];
  return (
    <div style={{
      background: '#fff', borderRadius: '14px',
      border: `1.5px solid ${GOLD}33`,
      overflow: 'hidden',
      boxShadow: `0 4px 20px ${GOLD}18`,
      maxWidth: '320px', margin: '0 auto',
    }}>
      <div style={{
        background: '#075E54', padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: '#a0d0c0', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '12px',
        }}>👩</div>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>Priya (Team)</div>
          <div style={{ fontSize: '9px', color: '#a0d0c0' }}>Assign saree to customer</div>
        </div>
      </div>
      <div style={{ padding: '12px 14px' }}>
        <div style={{ fontSize: '11px', color: MUTED, marginBottom: '8px', fontWeight: 600 }}>
          Customer sent a screenshot. Select the saree:
        </div>
        {sarees.map((s) => (
          <div
            key={s.sku}
            onClick={() => setSelected(s.sku)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '8px 10px', borderRadius: '8px', marginBottom: '6px',
              border: `1.5px solid ${selected === s.sku ? GOLD : '#eee'}`,
              background: selected === s.sku ? `${GOLD}11` : '#fafafa',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            <span style={{ fontSize: '18px' }}>{s.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: INK }}>{s.name}</div>
              <div style={{ fontSize: '10px', color: MUTED }}>{s.sku} · {s.price}</div>
            </div>
            <div style={{
              width: '16px', height: '16px', borderRadius: '50%',
              border: `2px solid ${selected === s.sku ? GOLD : '#ccc'}`,
              background: selected === s.sku ? GOLD : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {selected === s.sku && <span style={{ fontSize: '8px', color: '#fff' }}>✓</span>}
            </div>
          </div>
        ))}
        <button style={{
          width: '100%', padding: '9px',
          background: selected ? WA_GREEN : '#ccc',
          color: '#fff', border: 'none', borderRadius: '8px',
          fontSize: '12px', fontWeight: 700,
          marginTop: '4px', cursor: selected ? 'pointer' : 'default',
          transition: 'background 0.2s',
        }}>
          {selected ? '✓ Send checkout link' : 'Select a saree first'}
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MOCK: Checkout page
══════════════════════════════════════ */
function CheckoutMock() {
  return (
    <div style={{
      background: '#f7f7f7', borderRadius: '16px',
      border: '1.5px solid #e0e0e0',
      overflow: 'hidden', maxWidth: '300px', margin: '0 auto',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Browser chrome */}
      <div style={{
        background: '#fff', padding: '8px 12px',
        borderBottom: '1px solid #e8e8e8',
        display: 'flex', alignItems: 'center', gap: '6px',
      }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          {['#FF5F57','#FEBC2E','#28C840'].map(c => (
            <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{
          flex: 1, background: '#f0f0f0', borderRadius: '6px',
          padding: '3px 8px', fontSize: '9px', color: '#888',
        }}>
          🔒 checkout.laajcreations.in
        </div>
      </div>
      {/* Page content */}
      <div style={{ padding: '14px' }}>
        {/* Order summary */}
        <div style={{
          background: '#fff', borderRadius: '10px',
          padding: '10px 12px', marginBottom: '10px',
          border: '1px solid #eee',
          display: 'flex', gap: '10px', alignItems: 'center',
        }}>
          <div style={{
            width: '48px', height: '56px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #f8e0e8, #e8c8d8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px', flexShrink: 0,
          }}>🥻</div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: INK }}>Magenta Banarasi Silk</div>
            <div style={{ fontSize: '10px', color: MUTED }}>SKU: LC-0452</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: MAROON, marginTop: '2px' }}>₹2,400</div>
          </div>
        </div>
        {/* Form */}
        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: MUTED, marginBottom: '6px', letterSpacing: '0.08em' }}>
            DELIVERY ADDRESS
          </div>
          {[
            { label: 'Full Name', val: 'Sunita Sharma', fill: true },
            { label: 'Phone', val: '98765 43210', fill: true },
            { label: 'Address', val: '12, Laxmi Nagar...', fill: true },
            { label: 'Pincode', val: '440001', fill: true },
          ].map(({ label, val, fill }) => (
            <div key={label} style={{ marginBottom: '5px' }}>
              <div style={{ fontSize: '9px', color: '#999', marginBottom: '2px' }}>{label}</div>
              <div style={{
                background: fill ? `${GOLD}0a` : '#fff',
                border: `1px solid ${fill ? GOLD + '55' : '#e0e0e0'}`,
                borderRadius: '6px', padding: '6px 8px',
                fontSize: '11px', color: fill ? INK : '#ccc',
              }}>
                {fill ? val : ''}
              </div>
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', marginTop: '5px' }}>
            {[
              { label: 'City', val: 'Nagpur ✓' },
              { label: 'State', val: 'Maharashtra ✓' },
            ].map(({ label, val }) => (
              <div key={label}>
                <div style={{ fontSize: '9px', color: '#999', marginBottom: '2px' }}>{label}</div>
                <div style={{
                  background: '#f0fdf4', border: '1px solid #86efac',
                  borderRadius: '6px', padding: '6px 8px',
                  fontSize: '10px', color: '#166534',
                }}>
                  {val}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Pay button */}
        <button style={{
          width: '100%', padding: '11px',
          background: `linear-gradient(135deg, ${MAROON}, #8B2035)`,
          color: '#fff', border: 'none', borderRadius: '8px',
          fontSize: '13px', fontWeight: 700,
          cursor: 'pointer',
          boxShadow: `0 4px 12px ${MAROON}44`,
        }}>
          Pay ₹2,400 →
        </button>
        <p style={{
          textAlign: 'center', fontSize: '9px', color: '#aaa',
          margin: '6px 0 0',
        }}>
          🔒 Secured by Razorpay
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MOCK: Orders dashboard
══════════════════════════════════════ */
function OrdersDashMock() {
  const orders = [
    { id: 'LC-1234', saree: 'Magenta Banarasi', customer: 'Sunita S.', city: 'Nagpur', courier: 'BlueDart', status: 'Label Ready', paid: '₹2,400' },
    { id: 'LC-1235', saree: 'Teal Kanjivaram', customer: 'Rekha P.', city: 'Pune', courier: 'Delhivery', status: 'Label Ready', paid: '₹3,100' },
    { id: 'LC-1236', saree: 'Ivory Chiffon', customer: 'Meena K.', city: 'Mumbai', courier: 'DTDC', status: 'Label Ready', paid: '₹1,800' },
    { id: 'LC-1237', saree: 'Red Paithani', customer: 'Anita R.', city: 'Nashik', courier: 'Ekart', status: 'Label Ready', paid: '₹2,800' },
  ];
  return (
    <div style={{
      background: '#fff', borderRadius: '14px',
      border: '1.5px solid #e0e0e0',
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      maxWidth: '560px', margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{
        background: MAROON, padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
            Today's Orders — 2 Mar 2026
          </div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>
            47 confirmed · ₹1,12,400 collected
          </div>
        </div>
        <button style={{
          background: GOLD, color: '#fff', border: 'none',
          borderRadius: '6px', padding: '5px 10px',
          fontSize: '10px', fontWeight: 700, cursor: 'pointer',
        }}>
          🖨 Print All Labels
        </button>
      </div>
      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
          <thead>
            <tr style={{ background: '#f8f8f8', borderBottom: '1px solid #eee' }}>
              {['Order', 'Saree', 'Customer', 'City', 'Courier', 'Status', 'Amount'].map(h => (
                <th key={h} style={{
                  padding: '8px 10px', textAlign: 'left',
                  fontWeight: 700, color: MUTED, whiteSpace: 'nowrap',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={o.id} style={{
                borderBottom: '1px solid #f0f0f0',
                background: i % 2 === 0 ? '#fff' : '#fdfcfb',
              }}>
                <td style={{ padding: '8px 10px', fontWeight: 700, color: MAROON }}>{o.id}</td>
                <td style={{ padding: '8px 10px', color: INK }}>{o.saree}</td>
                <td style={{ padding: '8px 10px', color: INK }}>{o.customer}</td>
                <td style={{ padding: '8px 10px', color: MUTED }}>{o.city}</td>
                <td style={{ padding: '8px 10px' }}>
                  <span style={{
                    background: '#EEF2FF', color: '#4338CA',
                    borderRadius: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 600,
                  }}>
                    {o.courier}
                  </span>
                </td>
                <td style={{ padding: '8px 10px' }}>
                  <span style={{
                    background: '#F0FDF4', color: '#15803D',
                    borderRadius: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 600,
                  }}>
                    {o.status}
                  </span>
                </td>
                <td style={{ padding: '8px 10px', fontWeight: 700, color: INK }}>{o.paid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{
        padding: '8px 16px', background: `${GOLD}0a`,
        borderTop: '1px solid #eee', fontSize: '10px', color: MUTED, textAlign: 'right',
      }}>
        Showing 4 of 47 orders today · All courier labels auto-assigned by Shiprocket
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MOCK: Shipping label
══════════════════════════════════════ */
function ShippingLabelMock() {
  return (
    <div style={{
      background: '#fff', borderRadius: '10px',
      border: '2px dashed #ccc', padding: '16px',
      maxWidth: '280px', margin: '0 auto',
      fontFamily: 'monospace',
      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '10px',
      }}>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: INK }}>LAAJ CREATIONS</div>
          <div style={{ fontSize: '9px', color: MUTED }}>12, Silk Market, Nagpur · 440001</div>
          <div style={{ fontSize: '9px', color: MUTED }}>GST: 27XXXXX1234Z1</div>
        </div>
        <div style={{
          background: MAROON, color: '#fff',
          fontSize: '9px', fontWeight: 700,
          padding: '3px 7px', borderRadius: '4px',
        }}>
          BlueDart
        </div>
      </div>
      <div style={{ borderTop: '1px dashed #ccc', borderBottom: '1px dashed #ccc', padding: '8px 0', marginBottom: '10px' }}>
        <div style={{ fontSize: '9px', color: MUTED, marginBottom: '2px' }}>SHIP TO:</div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: INK }}>Sunita Sharma</div>
        <div style={{ fontSize: '10px', color: INK }}>12, Laxmi Nagar, Nagpur</div>
        <div style={{ fontSize: '10px', color: INK }}>Maharashtra — 440001</div>
        <div style={{ fontSize: '10px', color: INK }}>📞 98765 43210</div>
      </div>
      {/* Fake barcode */}
      <div style={{ marginBottom: '8px', textAlign: 'center' }}>
        <div style={{
          display: 'flex', height: '32px', gap: '1px',
          justifyContent: 'center', marginBottom: '4px',
        }}>
          {Array.from({ length: 36 }, (_, i) => (
            <div key={i} style={{
              width: `${[2,1,3,1,2,1,1,3,2,1,2,3,1,2,1,3,2,1,1,2,3,1,2,1,2,1,3,2,1,2,1,3,1,2,1,2][i] * 1.5}px`,
              background: i % 5 === 0 ? 'transparent' : '#1a1a1a',
              borderRadius: '1px',
            }} />
          ))}
        </div>
        <div style={{ fontSize: '9px', color: '#666', letterSpacing: '0.1em' }}>LC1234-BD-440001</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: MUTED }}>
        <span>Order: #LC-1234</span>
        <span>SKU: LC-0452</span>
        <span>₹2,400 ✓ PAID</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   CHAT TOGGLE
══════════════════════════════════════ */
function ChatToggle() {
  const [view, setView] = useState('laaj'); // 'laaj' | 'customer'
  const isLaaj = view === 'laaj';

  return (
    <Reveal delay={80}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '24px', alignItems: 'start' }}>
        {/* Phone with toggle */}
        <div>
          {/* Toggle pill */}
          <div style={{
            display: 'flex', background: '#f0f0f0',
            borderRadius: '20px', padding: '3px',
            marginBottom: '14px', width: 'fit-content',
          }}>
            {[
              { id: 'laaj', label: "Laaj's view" },
              { id: 'customer', label: "Customer's view" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setView(id)}
                style={{
                  padding: '6px 14px', borderRadius: '16px', border: 'none',
                  fontSize: '11px', fontWeight: 700, cursor: 'pointer',
                  background: view === id ? MAROON : 'transparent',
                  color: view === id ? '#fff' : MUTED,
                  transition: 'all 0.2s',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <PhoneMock
            name={isLaaj ? 'Sunita Sharma' : 'Laaj Creations'}
            avatar={isLaaj ? '👩' : '🪡'}
          >
            <DateDivider label="Today" />
            {isLaaj ? (
              /* Laaj's view — customer screenshot comes in from left, bot reply goes out right */
              <>
                <Bubble isImage imageLabel="Screenshot from live" time="3:01 PM" out={false} />
                <Bubble
                  text={"You've selected:\n*Magenta Banarasi Silk — ₹2,400*\n\nTap below to fill your address and pay:\ncheckout.laajcreations.in/order/xk92m\n\n⏱ Valid for 30 minutes."}
                  time="3:04 PM"
                  out
                  link
                />
              </>
            ) : (
              /* Customer's view — customer sends from right, bot reply comes in from left */
              <>
                <Bubble isImage imageLabel="Screenshot from live" time="3:01 PM" out />
                <Bubble
                  text={"You've selected:\n*Magenta Banarasi Silk — ₹2,400*\n\nTap below to fill your address and pay:\ncheckout.laajcreations.in/order/xk92m\n\n⏱ Valid for 30 minutes."}
                  time="3:04 PM"
                  out={false}
                  link
                />
              </>
            )}
          </PhoneMock>
        </div>

        {/* Quick reply panel */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: MUTED, textAlign: 'center', marginBottom: '10px' }}>
            What the team sees (one tap)
          </div>
          <QuickReplyMock />
        </div>
      </div>
    </Reveal>
  );
}

/* ══════════════════════════════════════
   PAYMENT AUTOMATION SECTION
══════════════════════════════════════ */

// Timing constants (ms)
const STEP_DURATION = 1200;   // each step lights up every 1.2s
const HOLD_DURATION = 3000;   // pause at end before resetting
const TOTAL_STEPS   = 5;

function useLoopingSteps() {
  const [step, setStep] = useState(0);
  const timers = useRef([]);

  const start = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStep(0);
    for (let i = 1; i <= TOTAL_STEPS; i++) {
      timers.current.push(setTimeout(() => setStep(i), i * STEP_DURATION));
    }
    // reset + loop
    timers.current.push(
      setTimeout(() => start(), TOTAL_STEPS * STEP_DURATION + HOLD_DURATION)
    );
  };

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  return { step, start };
}

function PaymentAutoSection() {
  const sectionRef = useRef(null);
  const { step, start } = useLoopingSteps();
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          start();
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const automationSteps = [
    { icon: '🧾', label: 'Order #LC-1238 created', sub: 'Unique order number assigned', color: '#3B82F6', bg: '#EFF6FF', border: '#BFDBFE' },
    { icon: '📦', label: 'Inventory updated', sub: 'LC-0452 stock: 5 → 4 remaining', color: '#16A34A', bg: '#F0FDF4', border: '#86EFAC' },
    { icon: '🚚', label: 'Shiprocket order created', sub: 'BlueDart auto-assigned for Nagpur', color: MAROON, bg: '#FFF1F2', border: '#FECDD3' },
    { icon: '🖨️', label: 'Shipping label generated', sub: 'Barcode label queued for printer', color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
    { icon: '💬', label: 'WhatsApp sent to customer', sub: 'Order confirmation delivered', color: '#059669', bg: '#ECFDF5', border: '#6EE7B7' },
  ];

  const printing = step >= 4;
  const waVisible = step >= 5;

  return (
    <section style={{
      background: '#111827',
      borderTop: `1px solid rgba(255,255,255,0.06)`,
      borderBottom: `1px solid rgba(255,255,255,0.06)`,
      padding: '80px 32px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
      }} />
      {/* Gold glow top-right */}
      <div style={{
        position: 'absolute', top: -100, right: -100,
        width: 400, height: 400, borderRadius: '50%',
        background: `radial-gradient(circle, ${GOLD}18 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div ref={sectionRef} style={{ position: 'relative', maxWidth: '960px', margin: '0 auto' }}>

        {/* Header */}
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: GOLD, color: '#fff', fontFamily: "'Playfair Display', serif",
              fontWeight: 700, fontSize: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>4</div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: GOLD, letterSpacing: '0.14em' }}>PAYMENT CONFIRMED</div>
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '32px', fontWeight: 700, color: '#fff',
            lineHeight: 1.2, margin: '0 0 10px',
          }}>
            Customer pays. Five things happen — <em style={{ color: GOLD, fontStyle: 'italic' }}>automatically.</em>
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', margin: '0 0 48px', maxWidth: '520px' }}>
            The moment Razorpay confirms, the system takes over. No one on the team has to do a thing.
          </p>
        </Reveal>

        {/* ── Main 3-col grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr 260px',
          gap: '28px',
          alignItems: 'start',
        }}>

          {/* ── Col 1: Cascade list ── */}
          <div>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: '14px' }}>
              SYSTEM ACTIONS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {automationSteps.map((s, i) => {
                const active = step > i;
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '12px',
                    padding: '12px 14px', borderRadius: '12px',
                    background: active ? s.bg : 'rgba(255,255,255,0.03)',
                    border: `1.5px solid ${active ? s.border : 'rgba(255,255,255,0.07)'}`,
                    transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
                    transform: active ? 'translateX(0) scale(1)' : 'translateX(-6px) scale(0.98)',
                    opacity: active ? 1 : 0.28,
                  }}>
                    <span style={{ fontSize: '20px', lineHeight: 1, flexShrink: 0, marginTop: '1px' }}>{s.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '13px', fontWeight: 700,
                        color: active ? s.color : 'rgba(255,255,255,0.3)',
                        transition: 'color 0.7s', marginBottom: '2px',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        {s.label}
                      </div>
                      <div style={{
                        fontSize: '11px', color: active ? s.color + 'aa' : 'rgba(255,255,255,0.2)',
                        transition: 'color 0.7s',
                      }}>
                        {s.sub}
                      </div>
                    </div>
                    <div style={{
                      width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                      background: active ? s.color : 'rgba(255,255,255,0.08)',
                      border: `2px solid ${active ? s.color : 'rgba(255,255,255,0.12)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.5s',
                      marginTop: '2px',
                    }}>
                      {active && <span style={{ fontSize: '9px', color: '#fff', fontWeight: 700 }}>✓</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Col 2: Dashboard + Printer ── */}
          <div>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: '14px' }}>
              ORDER DASHBOARD + PRINTER
            </div>

            {/* Dashboard */}
            <div style={{
              background: '#fff', borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
              marginBottom: '20px',
            }}>
              <div style={{
                background: MAROON, padding: '10px 14px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>Today's Orders</div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)' }}>2 Mar 2026</div>
                </div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '22px', fontWeight: 700, color: GOLD,
                  transition: 'all 0.6s',
                }}>
                  {step >= 1 ? '48' : '47'}
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontFamily: "'DM Sans', sans-serif", fontWeight: 400, marginLeft: '4px' }}>orders</span>
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                <thead>
                  <tr style={{ background: '#f8f8f8', borderBottom: '2px solid #eee' }}>
                    {['Order #', 'Saree', 'Customer', 'City', 'Courier', 'Status', 'Amount'].map(h => (
                      <th key={h} style={{ padding: '7px 10px', textAlign: 'left', color: MUTED, fontWeight: 600, fontSize: '10px', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'LC-1235', saree: 'Teal Kanjivaram', c: 'Rekha P.', city: 'Pune', courier: 'Delhivery', amt: '₹3,100' },
                    { id: 'LC-1236', saree: 'Ivory Chiffon', c: 'Meena K.', city: 'Mumbai', courier: 'DTDC', amt: '₹1,800' },
                    { id: 'LC-1237', saree: 'Red Paithani', c: 'Anita R.', city: 'Nashik', courier: 'Ekart', amt: '₹2,800' },
                  ].map((o, i) => (
                    <tr key={o.id} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 ? '#fafafa' : '#fff' }}>
                      <td style={{ padding: '8px 10px', fontWeight: 700, color: MAROON, fontSize: '11px' }}>{o.id}</td>
                      <td style={{ padding: '8px 10px', color: INK, fontSize: '11px' }}>{o.saree}</td>
                      <td style={{ padding: '8px 10px', color: INK, fontSize: '11px' }}>{o.c}</td>
                      <td style={{ padding: '8px 10px', color: MUTED, fontSize: '11px' }}>{o.city}</td>
                      <td style={{ padding: '8px 10px' }}>
                        <span style={{ background: '#EEF2FF', color: '#4338CA', borderRadius: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 600 }}>{o.courier}</span>
                      </td>
                      <td style={{ padding: '8px 10px' }}>
                        <span style={{ background: '#F0FDF4', color: '#15803D', borderRadius: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 600 }}>✓ Ready</span>
                      </td>
                      <td style={{ padding: '8px 10px', fontWeight: 700, fontSize: '11px', color: INK }}>{o.amt}</td>
                    </tr>
                  ))}
                  {/* New order row */}
                  <tr style={{
                    borderBottom: '1px solid #f0f0f0',
                    background: step >= 1 ? '#FFFBEB' : '#fff',
                    transition: 'background 1s ease',
                    boxShadow: step >= 1 ? `inset 0 0 0 2px ${GOLD}88` : 'none',
                  }}>
                    <td style={{ padding: '8px 10px', fontSize: '11px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 700, color: MAROON }}>
                        {step >= 1 && (
                          <span style={{
                            width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0,
                            background: GOLD,
                            boxShadow: `0 0 0 3px ${GOLD}44`,
                            display: 'inline-block',
                          }} />
                        )}
                        LC-1238
                      </span>
                    </td>
                    <td style={{ padding: '8px 10px', color: INK, fontSize: '11px' }}>Magenta Banarasi</td>
                    <td style={{ padding: '8px 10px', color: INK, fontSize: '11px' }}>Sunita S.</td>
                    <td style={{ padding: '8px 10px', color: MUTED, fontSize: '11px' }}>Nagpur</td>
                    <td style={{ padding: '8px 10px' }}>
                      <span style={{ background: '#EEF2FF', color: '#4338CA', borderRadius: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 600 }}>BlueDart</span>
                    </td>
                    <td style={{ padding: '8px 10px' }}>
                      <span style={{
                        borderRadius: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 700,
                        background: step >= 1 ? '#FEF9C3' : '#F0FDF4',
                        color: step >= 1 ? '#92400E' : '#15803D',
                        transition: 'all 1s',
                      }}>
                        {step >= 4 ? '🖨 Printing...' : step >= 1 ? '⚡ Just confirmed' : '✓ Ready'}
                      </span>
                    </td>
                    <td style={{ padding: '8px 10px', fontWeight: 700, fontSize: '11px', color: INK }}>₹2,400</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* ── Printer ── */}
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: '20px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px', padding: '20px',
            }}>
              {/* Printer SVG-style mock */}
              <div style={{ flexShrink: 0 }}>
                {/* Printer body */}
                <div style={{
                  width: '140px',
                  background: 'linear-gradient(180deg, #f0f0f0 0%, #d8d8d8 100%)',
                  borderRadius: '10px 10px 6px 6px',
                  padding: '12px 16px 0',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.6)',
                  position: 'relative',
                }}>
                  {/* Top paper slot */}
                  <div style={{
                    height: '5px', background: '#b0b0b0',
                    borderRadius: '2px', marginBottom: '10px',
                  }} />
                  {/* Status row */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: '10px',
                  }}>
                    {/* Status dot */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <div style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: printing ? '#22C55E' : '#888',
                        boxShadow: printing ? '0 0 8px #22C55E, 0 0 16px #22C55E44' : 'none',
                        transition: 'all 0.5s',
                      }} />
                      <span style={{ fontSize: '8px', fontFamily: 'monospace', color: printing ? '#555' : '#999' }}>
                        {printing ? 'PRINT' : 'IDLE'}
                      </span>
                    </div>
                    {/* WiFi bars */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', opacity: printing ? 1 : 0.3, transition: 'opacity 0.5s' }}>
                      {[4, 6, 8, 10].map((h, i) => (
                        <div key={i} style={{
                          width: '3px', height: `${h}px`,
                          background: printing ? '#3B82F6' : '#aaa',
                          borderRadius: '1px',
                          transition: 'background 0.5s',
                        }} />
                      ))}
                    </div>
                  </div>
                  {/* Output slot */}
                  <div style={{
                    background: '#a8a8a8',
                    height: '8px',
                    borderRadius: '2px 2px 0 0',
                    position: 'relative',
                  }}>
                    {/* Paper coming out */}
                    <div style={{
                      position: 'absolute',
                      bottom: '0px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '108px',
                      height: printing ? '90px' : '0px',
                      background: '#fff',
                      border: '1px solid #ddd',
                      borderTop: 'none',
                      transition: 'height 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      overflow: 'hidden',
                      display: 'flex', flexDirection: 'column',
                      padding: '6px',
                      gap: '3px',
                    }}>
                      {/* Label content inside paper */}
                      <div style={{ fontSize: '7px', fontFamily: 'monospace', color: '#222', fontWeight: 700, letterSpacing: '0.04em' }}>LAAJ CREATIONS</div>
                      <div style={{ fontSize: '6.5px', fontFamily: 'monospace', color: '#555' }}>Sunita Sharma, Nagpur 440001</div>
                      <div style={{ fontSize: '6.5px', fontFamily: 'monospace', color: '#555' }}>COURIER: BlueDart</div>
                      {/* Barcode */}
                      <div style={{ display: 'flex', gap: '0.8px', height: '18px', marginTop: '3px', alignItems: 'stretch' }}>
                        {[2,1,3,1,2,1,1,3,2,1,2,3,1,2,1,3,2,1,1,2,3,1,2,1,2,1,3,2,1,2,3,1,2,1,2,3].map((w, i) => (
                          <div key={i} style={{
                            width: `${w * 0.9}px`,
                            background: i % 7 === 0 ? 'transparent' : '#111',
                            flexShrink: 0,
                          }} />
                        ))}
                      </div>
                      <div style={{ fontSize: '6px', fontFamily: 'monospace', color: '#888', textAlign: 'center', letterSpacing: '0.08em' }}>LC1238-BD-440001</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '6px', fontFamily: 'monospace', color: '#aaa', marginTop: '1px' }}>
                        <span>LC-1238</span><span>₹2,400 PAID</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: '6px' }}>WiFi label printer</div>
              </div>

              {/* Printer callout text */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '12px', fontWeight: 700, color: printing ? '#fff' : 'rgba(255,255,255,0.35)',
                  marginBottom: '6px', transition: 'color 0.6s',
                }}>
                  {printing ? '🖨️ Printing label...' : 'Waiting for payment'}
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.55 }}>
                  Label with barcode, customer address, and SKU — prints automatically. No copy-pasting into Word.
                </div>
              </div>
            </div>
          </div>

          {/* ── Col 3: WhatsApp ── */}
          <div>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: '14px' }}>
              CUSTOMER'S PHONE
            </div>
            <div style={{
              opacity: waVisible ? 1 : 0.2,
              transform: waVisible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
              transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)',
            }}>
              <PhoneMock name="Laaj Creations" avatar="🪡">
                <DateDivider label="Today" />
                <Bubble
                  text={"✅ Payment received!\n\nYour order *#LC-1238* for *Magenta Banarasi Silk* is confirmed.\n\nWe'll ship within 24 hours and send you a tracking link. Thank you! 🥻"}
                  time="3:05 PM"
                />
              </PhoneMock>
            </div>
          </div>

        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '36px' }}>
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <div key={i} style={{
              width: step > i ? '24px' : '7px', height: '7px',
              borderRadius: '4px',
              background: step > i ? GOLD : 'rgba(255,255,255,0.15)',
              transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
            }} />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
const LaajExplainer = () => {
  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: CREAM, color: INK,
      minHeight: '100vh', overflowX: 'hidden',
    }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* ════════════ HERO ════════════ */}
      <section style={{
        background: `linear-gradient(160deg, ${MAROON} 0%, #2E0B14 100%)`,
        position: 'relative', overflow: 'hidden',
        padding: '72px 24px 56px',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.055,
          backgroundImage: `repeating-linear-gradient(45deg, ${GOLD} 0, ${GOLD} 1px, transparent 1px, transparent 12px),
                            repeating-linear-gradient(-45deg, ${GOLD} 0, ${GOLD} 1px, transparent 1px, transparent 12px)`,
        }} />
        <div style={{
          position: 'absolute', top: '-100px', right: '-80px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: `radial-gradient(circle, ${GOLD}33 0%, transparent 70%)`,
        }} />
        <div style={{ position: 'relative', maxWidth: '560px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: `${GOLD}22`, border: `1px solid ${GOLD}55`,
            borderRadius: '20px', padding: '5px 14px', marginBottom: '24px',
          }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: GOLD }} />
            <span style={{ fontSize: '10px', fontWeight: 700, color: GOLD, letterSpacing: '0.12em' }}>
              A PROPOSAL FROM QUERYGEN
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '38px', fontWeight: 700, color: '#fff',
            lineHeight: 1.2, margin: '0 0 16px',
          }}>
            Laaj Creations —<br />
            <em style={{ color: GOLD, fontStyle: 'italic' }}>a system that runs<br />your orders for you.</em>
          </h1>

          <p style={{
            fontSize: '15px', lineHeight: 1.7,
            color: 'rgba(255,255,255,0.68)', margin: '0 0 32px',
            maxWidth: '440px',
          }}>
            Right now, 40–80 orders a day run on WhatsApp screenshots, UPI photos, and Word doc labels.
            Here is exactly what changes — shown step by step.
          </p>

        </div>
      </section>

      {/* ════════════ STEP 1: Catalog ════════════ */}
      <section style={{ padding: '64px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: GOLD, color: '#fff', fontFamily: "'Playfair Display', serif",
              fontWeight: 700, fontSize: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>1</div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: GOLD, letterSpacing: '0.12em' }}>BEFORE THE LIVE</div>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: INK, margin: '0 0 12px' }}>
            Team catalogs today's sarees
          </h2>
          <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.65, margin: '0 0 28px', maxWidth: '480px' }}>
            Each saree gets a SKU, photo, name, price, and stock count in a Google Sheet. This is the live inventory — the moment a saree sells out, it's marked automatically.
          </p>
        </Reveal>
        <Reveal delay={100}>
          {/* Google Sheet mock */}
          <div style={{
            background: '#fff', borderRadius: '12px',
            border: '1.5px solid #e0e0e0', overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}>
            <div style={{
              background: '#1a73e8', padding: '8px 14px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{ fontSize: '14px' }}>📊</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>
                Laaj Creations — Today's Catalog (2 Mar 2026)
              </span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ background: '#f8f9fa', borderBottom: '1px solid #e8eaed' }}>
                  {['SKU', 'Name', 'Price', 'Stock', 'Status'].map(h => (
                    <th key={h} style={{ padding: '7px 12px', textAlign: 'left', color: '#5f6368', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { sku: 'LC-0452', name: 'Magenta Banarasi Silk', price: '₹2,400', stock: 3, sold: false },
                  { sku: 'LC-0453', name: 'Teal Kanjivaram', price: '₹3,100', stock: 0, sold: true },
                  { sku: 'LC-0454', name: 'Ivory Chiffon', price: '₹1,800', stock: 5, sold: false },
                  { sku: 'LC-0455', name: 'Red Paithani', price: '₹2,800', stock: 2, sold: false },
                ].map((r, i) => (
                  <tr key={r.sku} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 ? '#fafafa' : '#fff' }}>
                    <td style={{ padding: '7px 12px', color: '#1a73e8', fontWeight: 600 }}>{r.sku}</td>
                    <td style={{ padding: '7px 12px', color: INK }}>{r.name}</td>
                    <td style={{ padding: '7px 12px', fontWeight: 600, color: INK }}>{r.price}</td>
                    <td style={{ padding: '7px 12px', color: r.stock === 0 ? '#c0392b' : '#166534', fontWeight: 600 }}>{r.stock}</td>
                    <td style={{ padding: '7px 12px' }}>
                      <span style={{
                        background: r.sold ? '#FEE2E2' : '#D1FAE5',
                        color: r.sold ? '#991B1B' : '#065F46',
                        borderRadius: '4px', padding: '2px 7px',
                        fontSize: '10px', fontWeight: 700,
                      }}>
                        {r.sold ? '🔴 Sold Out' : '🟢 Available'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* ════════════ STEP 2 + 3: Customer messages + Quick reply ════════════ */}
      <section style={{
        background: '#fff', borderTop: `1px solid ${GOLD}22`, borderBottom: `1px solid ${GOLD}22`,
        padding: '64px 24px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: GOLD, color: '#fff', fontFamily: "'Playfair Display', serif",
                fontWeight: 700, fontSize: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>2</div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: GOLD, letterSpacing: '0.12em' }}>DURING THE LIVE</div>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: INK, margin: '0 0 12px' }}>
              Customer messages. Team taps once. Bot does the rest.
            </h2>
            <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.65, margin: '0 0 32px', maxWidth: '500px' }}>
              Customer sees a saree on the live and WhatsApps. The bot greets them and asks for a screenshot.
              Team member sees it, picks the saree from a list — one tap, no typing.
              That is the <strong style={{ color: INK }}>only manual step</strong> in the entire order flow.
            </p>
          </Reveal>
          <ChatToggle />
        </div>
      </section>

      {/* ════════════ STEP 3: Checkout ════════════ */}
      <section style={{ padding: '64px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: MAROON, color: '#fff', fontFamily: "'Playfair Display', serif",
              fontWeight: 700, fontSize: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>3</div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: MAROON, letterSpacing: '0.12em' }}>CHECKOUT</div>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: INK, margin: '0 0 12px' }}>
            One page. Address + payment. Done.
          </h2>
          <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.65, margin: '0 0 32px', maxWidth: '500px' }}>
            Customer taps the link — it opens in their browser, no app needed. They fill their address
            (pincode auto-fills city and state). If a courier doesn't deliver to their pincode, they're told upfront.
            They tap Pay, Razorpay opens, they pay via UPI, card, or netbanking.
          </p>
        </Reveal>
        <Reveal delay={100} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 auto' }}>
            <CheckoutMock />
          </div>
          <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
            {[
              { icon: '📍', title: 'Pincode auto-fill', desc: 'Enter 440001 → Nagpur, Maharashtra fills in automatically. Zero typing errors.' },
              { icon: '🚚', title: 'Serviceability check', desc: "If no courier delivers to that pincode, customer is told upfront — no failed deliveries." },
              { icon: '💳', title: 'All payment methods', desc: 'UPI, cards, netbanking, wallets — all via Razorpay. No UPI screenshot needed.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                display: 'flex', gap: '10px', marginBottom: '16px',
                padding: '12px 14px', background: `${GOLD}08`,
                borderRadius: '10px', border: `1px solid ${GOLD}22`,
              }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: INK, marginBottom: '3px' }}>{title}</div>
                  <div style={{ fontSize: '12px', color: MUTED, lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ════════════ STEP 4: Payment → automation ════════════ */}
      <PaymentAutoSection />

      {/* ════════════ STEP 5: Packing dashboard ════════════ */}
      <section style={{ padding: '64px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: GOLD, color: '#fff', fontFamily: "'Playfair Display', serif",
              fontWeight: 700, fontSize: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>5</div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: GOLD, letterSpacing: '0.12em' }}>PACKING & DISPATCH</div>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: INK, margin: '0 0 12px' }}>
            After the live — one screen, every order.
          </h2>
          <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.65, margin: '0 0 28px', maxWidth: '500px' }}>
            No paper register. No WhatsApp groups to scroll through. All orders in one place, each showing the SKU
            so the team knows exactly which saree to pull. Print all labels in one click.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <OrdersDashMock />
        </Reveal>
        <Reveal delay={180} style={{ marginTop: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: MUTED, marginBottom: '10px' }}>
                Each order gets a proper label:
              </div>
              <ShippingLabelMock />
            </div>
            <div style={{ paddingTop: '30px' }}>
              {[
                { icon: '🏷', title: 'Real barcode', desc: 'Proper formatted label with barcode. Courier scans it, no errors.' },
                { icon: '🚚', title: 'Right courier, auto-assigned', desc: 'Shiprocket picks from 25+ couriers for that pincode. No manual calls.' },
                { icon: '📦', title: 'One-click print', desc: 'Print all labels for the day at once. Label goes on the package.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{
                  display: 'flex', gap: '10px', marginBottom: '14px',
                }}>
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: INK }}>{title}</div>
                    <div style={{ fontSize: '12px', color: MUTED, lineHeight: 1.5 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ════════════ STEP 6: Tracking ════════════ */}
      <section style={{
        background: '#fff', borderTop: `1px solid ${GOLD}22`, borderBottom: `1px solid ${GOLD}22`,
        padding: '64px 24px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: GOLD, color: '#fff', fontFamily: "'Playfair Display', serif",
                fontWeight: 700, fontSize: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>6</div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: GOLD, letterSpacing: '0.12em' }}>AFTER SHIPPING</div>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: INK, margin: '0 0 12px' }}>
              "Where is my order?" — answered automatically.
            </h2>
            <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.65, margin: '0 0 32px', maxWidth: '500px' }}>
              Every courier milestone triggers a WhatsApp message to the customer. The team never has to reply to a tracking question.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div style={{ maxWidth: '300px', margin: '0 auto' }}>
              <PhoneMock caption="Customers get these automatically">
                <DateDivider label="Today" />
                <Bubble text={"📦 Your order #LC-1234 has been picked up!\n\nTrack here: track.shiprocket.in/LC-1234"} time="5:30 PM" />
                <DateDivider label="Tomorrow" />
                <Bubble text={"🚚 Your order #LC-1234 is in transit.\nEstimated delivery: 4 Mar 2026."} time="9:00 AM" />
                <Bubble text={"🛵 Your order #LC-1234 is out for delivery today!"} time="8:45 AM" />
                <Bubble text={"✅ Delivered!\n\nYour order #LC-1234 has been delivered. Thank you for shopping with Laaj Creations! 🥻"} time="2:10 PM" />
              </PhoneMock>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ BEFORE / AFTER SUMMARY ════════════ */}
      <section style={{ padding: '64px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <Reveal>
          <SectionHead label="THE TRANSFORMATION" title="Before vs. after, in one view" />
        </Reveal>
        {[
          { before: '📸 UPI screenshot → manually match bank portal', after: '✅ Razorpay confirms. Money in or it isn\'t. Zero fraud.' },
          { before: '💬 Address over chat → typed into Word', after: '📋 Structured form. Pincode auto-fills city + state.' },
          { before: '🖨 Labels typed in Word, no barcode', after: '🏷 Barcode labels from Shiprocket. One-click print.' },
          { before: '📞 2 courier relationships, manual assignment', after: '🚚 Shiprocket auto-assigns from 25+ couriers per pincode.' },
          { before: '❓ "Is it sold?" — no one knows till too late', after: '🔢 Real-time stock. Auto marks sold out when stock = 0.' },
          { before: '😰 "Where is my order?" all day', after: '📲 Auto WhatsApp at every milestone. Zero manual replies.' },
          { before: '📒 Paper accounting, CA panic at tax time', after: '📊 Every transaction logged. GST invoices auto-generated.' },
        ].map(({ before, after }, i) => (
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
              <div style={{ textAlign: 'center', fontSize: '16px', color: GOLD }}>→</div>
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
      </section>

      {/* ════════════ CLOSING ════════════ */}
      <section style={{
        background: `linear-gradient(160deg, ${MAROON} 0%, #220810 100%)`,
        position: 'relative', overflow: 'hidden',
        padding: '72px 24px 64px',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.05,
          backgroundImage: `repeating-linear-gradient(45deg, ${GOLD} 0, ${GOLD} 1px, transparent 1px, transparent 12px),
                            repeating-linear-gradient(-45deg, ${GOLD} 0, ${GOLD} 1px, transparent 1px, transparent 12px)`,
        }} />
        <div style={{
          position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)',
          width: '360px', height: '360px', borderRadius: '50%',
          background: `radial-gradient(circle, ${GOLD}1a 0%, transparent 70%)`,
        }} />
        <div style={{ position: 'relative', maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <div style={{ width: '40px', height: '2px', background: GOLD, margin: '0 auto 24px' }} />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '28px', fontWeight: 700, color: '#fff',
              lineHeight: 1.25, margin: '0 0 16px',
            }}>
              Laaj Creations deserves a system as beautiful as its sarees.
            </h2>
            <p style={{
              fontSize: '14px', lineHeight: 1.7,
              color: 'rgba(255,255,255,0.62)', margin: '0 0 32px',
            }}>
              The livestream stays. Aunty stays. The energy stays.
              Everything that slowed the team down gets replaced by a clean, automated flow.
              The team focuses on packing — the one thing that needs human hands.
            </p>
            <div style={{
              background: `${GOLD}1a`, border: `1.5px solid ${GOLD}44`,
              borderRadius: '12px', padding: '20px 24px',
              textAlign: 'left', marginBottom: '28px',
            }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: GOLD, letterSpacing: '0.1em', marginBottom: '8px' }}>
                NEXT STEP
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, margin: 0 }}>
                A short call to walk through your current ops in detail — order volumes, how the team is structured today, and what a rollout looks like. No commitments needed.
              </p>
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: `${GOLD}18`, border: `1px solid ${GOLD}44`,
              borderRadius: '20px', padding: '6px 18px',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: GOLD }} />
              <span style={{ fontSize: '12px', color: GOLD, fontWeight: 600 }}>querygen.ai</span>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};

export default LaajExplainer;
