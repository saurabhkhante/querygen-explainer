import React from 'react';
import { X } from 'lucide-react';

const WEIGHTS = [
  { key: 'light',   label: 'Light',   numeric: 300, style: { fontWeight: 300, fontStyle: 'normal' } },
  { key: 'regular', label: 'Regular', numeric: 400, style: { fontWeight: 400 } },
  { key: 'bold',    label: 'Bold',    numeric: 700, style: { fontWeight: 700 } },
  { key: 'black',   label: 'Black',   numeric: 900, style: { fontWeight: 900, letterSpacing: '-0.02em' } },
];

export default function SlideBuilderSegmentEditor({ segment, segIndex, lineId, onUpdate, onDelete, canDelete }) {
  return (
    <div style={{
      background: '#F9F9F7',
      border: '1px solid #E8E8E4',
      borderRadius: 6,
      padding: '10px 12px',
      marginBottom: 8,
    }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <textarea
          value={segment.text}
          onChange={e => onUpdate(lineId, segIndex, { text: e.target.value })}
          placeholder="Text…"
          rows={2}
          style={{
            flex: 1,
            padding: '6px 8px',
            border: '1px solid #DDD',
            borderRadius: 4,
            fontSize: 13,
            resize: 'vertical',
            fontFamily: 'inherit',
            lineHeight: 1.4,
          }}
        />
        {canDelete && (
          <button
            onClick={() => onDelete(lineId, segIndex)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#CCC', padding: 2, alignSelf: 'flex-start' }}
            title="Remove segment"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Font size */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 10, color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Size</span>
          <input
            type="number"
            value={segment.fontSize}
            min={16} max={160} step={4}
            onChange={e => onUpdate(lineId, segIndex, { fontSize: Number(e.target.value) })}
            style={{ width: 52, padding: '3px 6px', border: '1px solid #DDD', borderRadius: 4, fontSize: 12, textAlign: 'center' }}
          />
          <span style={{ fontSize: 10, color: '#BBB' }}>px</span>
        </div>

        {/* Font weight — each button renders in its own actual weight */}
        <div style={{ display: 'flex', gap: 3 }}>
          {WEIGHTS.map(w => {
            const isActive = segment.fontWeight === w.key;
            return (
              <button
                key={w.key}
                onClick={() => onUpdate(lineId, segIndex, { fontWeight: w.key })}
                style={{
                  padding: '3px 8px',
                  fontSize: 12,
                  ...w.style,
                  border: `1.5px solid ${isActive ? '#1A1A1A' : '#E0E0DC'}`,
                  borderRadius: 3,
                  background: isActive ? '#1A1A1A' : '#FFF',
                  color: isActive ? '#FFF' : '#444',
                  cursor: 'pointer',
                  transition: 'all 0.1s',
                  fontFamily: 'Georgia, serif', // serif shows weight differences most clearly
                  lineHeight: 1,
                }}
              >
                {w.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
