import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Trash2, Plus, ChevronRight } from 'lucide-react';
import SlideBuilderSegmentEditor from './SlideBuilderSegmentEditor';

const GROUPS = ['top', 'middle', 'bottom'];
const GROUP_LABEL = { top: 'Top', middle: 'Mid', bottom: 'Bot' };

export default function SlideBuilderLineEditor({
  line, lineIndex, totalLines,
  onUpdateLine, onDeleteLine, onMoveLine,
  onAddSegment, onDeleteSegment, onUpdateSegment,
}) {
  const [collapsed, setCollapsed] = useState(false);

  // Build a short preview of the line text for when collapsed
  const linePreview = line.segments.map(s => s.text).join('').slice(0, 48) || '(empty)';

  return (
    <div style={{
      border: '1px solid #E0E0DC',
      borderRadius: 8,
      marginBottom: 8,
      background: '#FFFFFF',
      overflow: 'hidden',
    }}>
      {/* Line header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 10px',
        background: '#F5F5F2',
        borderBottom: collapsed ? 'none' : '1px solid #E8E8E4',
        cursor: 'pointer',
        userSelect: 'none',
      }}
        onClick={() => setCollapsed(c => !c)}
      >
        {/* Collapse arrow */}
        <ChevronRight
          size={14}
          style={{
            color: '#AAA',
            transform: collapsed ? 'rotate(0deg)' : 'rotate(90deg)',
            transition: 'transform 0.15s',
            flexShrink: 0,
          }}
        />

        <span style={{ fontSize: 10, fontWeight: 700, color: '#AAA', letterSpacing: '0.1em', flexShrink: 0 }}>
          L{lineIndex + 1}
        </span>

        {/* Preview text when collapsed */}
        {collapsed && (
          <span style={{
            fontSize: 11, color: '#888', flex: 1,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            marginLeft: 4,
          }}>
            {linePreview}
          </span>
        )}

        {/* Position badge — always visible */}
        <span style={{
          fontSize: 9, fontWeight: 700,
          color: '#075E54',
          background: '#E8F5F2',
          padding: '1px 5px',
          borderRadius: 3,
          letterSpacing: '0.08em',
          marginLeft: collapsed ? 0 : 'auto',
          flexShrink: 0,
        }}>
          {GROUP_LABEL[line.verticalGroup]}
        </span>

        {/* Controls — stop propagation so clicks don't toggle collapse */}
        <div style={{ display: 'flex', gap: 2, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
          <button
            onClick={() => onMoveLine(line.id, 'up')}
            disabled={lineIndex === 0}
            style={{ background: 'none', border: 'none', cursor: lineIndex === 0 ? 'default' : 'pointer', color: lineIndex === 0 ? '#DDD' : '#AAA', padding: '2px 3px' }}
            title="Move up"
          >
            <ChevronUp size={13} />
          </button>
          <button
            onClick={() => onMoveLine(line.id, 'down')}
            disabled={lineIndex === totalLines - 1}
            style={{ background: 'none', border: 'none', cursor: lineIndex === totalLines - 1 ? 'default' : 'pointer', color: lineIndex === totalLines - 1 ? '#DDD' : '#AAA', padding: '2px 3px' }}
            title="Move down"
          >
            <ChevronDown size={13} />
          </button>
          <button
            onClick={() => onDeleteLine(line.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DDD', padding: '2px 3px' }}
            title="Delete line"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Body — hidden when collapsed */}
      {!collapsed && (
        <div style={{ padding: '12px 12px 10px' }}>
          {line.segments.map((seg, i) => (
            <SlideBuilderSegmentEditor
              key={i}
              segment={seg}
              segIndex={i}
              lineId={line.id}
              onUpdate={onUpdateSegment}
              onDelete={onDeleteSegment}
              canDelete={line.segments.length > 1}
            />
          ))}

          <button
            onClick={() => onAddSegment(line.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: 'none', border: '1px dashed #CCC', borderRadius: 4,
              padding: '4px 10px', fontSize: 11, color: '#AAA', cursor: 'pointer',
              marginBottom: 12, width: '100%', justifyContent: 'center',
            }}
          >
            <Plus size={12} /> Add Word/Phrase
          </button>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: '#BBB', textTransform: 'uppercase', marginBottom: 4 }}>Position</div>
              <div style={{ display: 'flex', gap: 3 }}>
                {GROUPS.map(g => (
                  <button
                    key={g}
                    onClick={() => onUpdateLine(line.id, { verticalGroup: g })}
                    style={{
                      padding: '3px 8px', fontSize: 10,
                      border: `1px solid ${line.verticalGroup === g ? '#075E54' : '#DDD'}`,
                      borderRadius: 3,
                      background: line.verticalGroup === g ? '#075E54' : '#FFF',
                      color: line.verticalGroup === g ? '#FFF' : '#888',
                      cursor: 'pointer',
                    }}
                  >
                    {GROUP_LABEL[g]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: '#BBB', textTransform: 'uppercase', marginBottom: 4 }}>Gap after</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  type="number"
                  value={line.marginBottom}
                  min={0} max={200} step={8}
                  onChange={e => onUpdateLine(line.id, { marginBottom: Number(e.target.value) })}
                  style={{ width: 52, padding: '3px 6px', border: '1px solid #DDD', borderRadius: 4, fontSize: 12, textAlign: 'center' }}
                />
                <span style={{ fontSize: 10, color: '#BBB' }}>px</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
