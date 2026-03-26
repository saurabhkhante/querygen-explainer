import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

function Label({ children }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#888', textTransform: 'uppercase', marginBottom: 6 }}>
      {children}
    </div>
  );
}

function OrbRow({ label, orb, onChange }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <Label>{label}</Label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <input
          type="color"
          value={orb.color}
          onChange={e => onChange({ color: e.target.value })}
          style={{ width: 32, height: 26, border: '1px solid #ddd', borderRadius: 4, cursor: 'pointer', padding: 2 }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ fontSize: 11, color: '#999' }}>Opacity</span>
          <input
            type="number"
            value={orb.opacity}
            min={0} max={100} step={5}
            onChange={e => onChange({ opacity: Number(e.target.value) })}
            style={{ width: 48, padding: '3px 6px', border: '1px solid #ddd', borderRadius: 4, fontSize: 12, textAlign: 'center' }}
          />
          <span style={{ fontSize: 11, color: '#bbb' }}>%</span>
        </div>
      </div>
    </div>
  );
}

function Section({ title, badge, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid #F0F0EC', marginBottom: 4 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <ChevronRight
          size={13}
          style={{ color: '#AAA', transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s', flexShrink: 0 }}
        />
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#555', textTransform: 'uppercase', flex: 1 }}>
          {title}
        </span>
        {badge && (
          <span style={{ fontSize: 10, color: '#888', fontWeight: 400, letterSpacing: 0 }}>{badge}</span>
        )}
      </button>
      {open && <div style={{ paddingBottom: 14 }}>{children}</div>}
    </div>
  );
}

export const FONTS = [
  { key: 'Inter',             label: 'Inter',          category: 'Sans',    google: 'Inter:wght@300;400;700;900' },
  { key: 'DM Sans',           label: 'DM Sans',        category: 'Sans',    google: 'DM+Sans:wght@300;400;700;900' },
  { key: 'Outfit',            label: 'Outfit',         category: 'Sans',    google: 'Outfit:wght@300;400;700;900' },
  { key: 'Plus Jakarta Sans', label: 'Jakarta Sans',   category: 'Sans',    google: 'Plus+Jakarta+Sans:wght@300;400;700;800' },
  { key: 'Sora',              label: 'Sora',           category: 'Sans',    google: 'Sora:wght@300;400;700;800' },
  { key: 'Playfair Display',  label: 'Playfair',       category: 'Serif',   google: 'Playfair+Display:wght@400;700;900' },
  { key: 'Lora',              label: 'Lora',           category: 'Serif',   google: 'Lora:wght@400;700' },
  { key: 'Space Grotesk',     label: 'Space Grotesk',  category: 'Display', google: 'Space+Grotesk:wght@300;400;700' },
  { key: 'Bebas Neue',        label: 'Bebas Neue',     category: 'Display', google: 'Bebas+Neue' },
  { key: 'Montserrat',        label: 'Montserrat',     category: 'Sans',    google: 'Montserrat:wght@300;400;700;900' },
];

export const DEFAULT_FONT = 'Inter';

const ALL_FONTS_IMPORT = `@import url('https://fonts.googleapis.com/css2?${FONTS.map(f => `family=${f.google}`).join('&')}&display=swap');`;

const CATEGORY_COLORS = { Sans: '#3B82F6', Serif: '#8B5CF6', Display: '#F59E0B' };

export default function SlideBuilderBackground({ background, font, onUpdate, onUpdateOrb, onUpdateFont }) {
  const activeFont = FONTS.find(f => f.key === (font || DEFAULT_FONT));

  return (
    <div>
      <style>{ALL_FONTS_IMPORT}</style>

      {/* Font — collapsible */}
      <Section title="Font" badge={activeFont?.label}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {FONTS.map(f => {
            const isActive = (font || DEFAULT_FONT) === f.key;
            return (
              <button
                key={f.key}
                onClick={() => onUpdateFont(f.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '6px 10px',
                  border: `1.5px solid ${isActive ? '#075E54' : '#EEE'}`,
                  borderRadius: 6,
                  background: isActive ? '#F0FAF6' : '#FFF',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.1s',
                }}
              >
                <span style={{
                  fontFamily: `'${f.key}', sans-serif`,
                  fontSize: 14, fontWeight: 700,
                  color: isActive ? '#075E54' : '#1A1A1A',
                  flex: 1, lineHeight: 1,
                }}>
                  {f.label}
                </span>
                <span style={{
                  fontSize: 8, fontWeight: 700, letterSpacing: '0.1em',
                  color: CATEGORY_COLORS[f.category],
                  background: CATEGORY_COLORS[f.category] + '18',
                  padding: '2px 5px', borderRadius: 3, textTransform: 'uppercase',
                }}>
                  {f.category}
                </span>
                {isActive && <span style={{ fontSize: 10, color: '#075E54' }}>✓</span>}
              </button>
            );
          })}
        </div>
      </Section>

      {/* Background — collapsible */}
      <Section title="Background" badge={background.baseColor}>
        <div style={{ marginBottom: 12 }}>
          <Label>Base Color</Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input
              type="color"
              value={background.baseColor}
              onChange={e => onUpdate('baseColor', e.target.value)}
              style={{ width: 32, height: 26, border: '1px solid #ddd', borderRadius: 4, cursor: 'pointer', padding: 2 }}
            />
            <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#666' }}>{background.baseColor}</span>
          </div>
        </div>
        <OrbRow
          label="Top-right glow"
          orb={background.topRightOrb}
          onChange={updates => onUpdateOrb('topRightOrb', updates)}
        />
        <OrbRow
          label="Bottom-left glow"
          orb={background.bottomLeftOrb}
          onChange={updates => onUpdateOrb('bottomLeftOrb', updates)}
        />
      </Section>
    </div>
  );
}
