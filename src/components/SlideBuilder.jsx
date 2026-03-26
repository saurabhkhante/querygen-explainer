import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, Save } from 'lucide-react';
import { generateId } from '../utils/slideStorage';
import SlideBuilderBackground, { DEFAULT_FONT } from './SlideBuilderBackground';
import SlideBuilderLineEditor from './SlideBuilderLineEditor';
import SlideBuilderPreview from './SlideBuilderPreview';

const DEFAULT_SLIDE = () => ({
  name: 'Untitled Slide',
  font: DEFAULT_FONT,
  background: {
    baseColor: '#075E54',
    topRightOrb: { color: '#128C7E', opacity: 20 },
    bottomLeftOrb: { color: '#25D366', opacity: 15 },
  },
  lines: [
    {
      id: generateId('line'),
      segments: [{ text: 'Your message here.', fontSize: 64, fontWeight: 'light' }],
      verticalGroup: 'middle',
      marginBottom: 32,
    },
    {
      id: generateId('line'),
      segments: [{ text: 'Bold line.', fontSize: 80, fontWeight: 'black' }],
      verticalGroup: 'middle',
      marginBottom: 0,
    },
  ],
});

export default function SlideBuilder({ onSave, existingSlide = null }) {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(() => existingSlide ?? DEFAULT_SLIDE());

  // --- updaters ---
  const updateName = (name) => setSlide(p => ({ ...p, name }));

  const updateFont = (font) => setSlide(p => ({ ...p, font }));

  const updateBackground = (field, value) =>
    setSlide(p => ({ ...p, background: { ...p.background, [field]: value } }));

  const updateOrb = (which, updates) =>
    setSlide(p => ({
      ...p,
      background: { ...p.background, [which]: { ...p.background[which], ...updates } },
    }));

  const addLine = () =>
    setSlide(p => ({
      ...p,
      lines: [...p.lines, {
        id: generateId('line'),
        segments: [{ text: '', fontSize: 64, fontWeight: 'light' }],
        verticalGroup: 'middle',
        marginBottom: 0,
      }],
    }));

  const deleteLine = (lineId) =>
    setSlide(p => ({ ...p, lines: p.lines.filter(l => l.id !== lineId) }));

  const updateLine = (lineId, updates) =>
    setSlide(p => ({ ...p, lines: p.lines.map(l => l.id === lineId ? { ...l, ...updates } : l) }));

  const moveLine = (lineId, direction) =>
    setSlide(p => {
      const lines = [...p.lines];
      const idx = lines.findIndex(l => l.id === lineId);
      const swap = direction === 'up' ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= lines.length) return p;
      [lines[idx], lines[swap]] = [lines[swap], lines[idx]];
      return { ...p, lines };
    });

  const addSegment = (lineId) =>
    setSlide(p => ({
      ...p,
      lines: p.lines.map(l =>
        l.id === lineId
          ? { ...l, segments: [...l.segments, { text: '', fontSize: 64, fontWeight: 'light' }] }
          : l
      ),
    }));

  const deleteSegment = (lineId, segIndex) =>
    setSlide(p => ({
      ...p,
      lines: p.lines.map(l =>
        l.id === lineId
          ? { ...l, segments: l.segments.filter((_, i) => i !== segIndex) }
          : l
      ),
    }));

  const updateSegment = (lineId, segIndex, updates) =>
    setSlide(p => ({
      ...p,
      lines: p.lines.map(l =>
        l.id === lineId
          ? { ...l, segments: l.segments.map((s, i) => i === segIndex ? { ...s, ...updates } : s) }
          : l
      ),
    }));

  const handleSave = () => {
    const savedId = onSave(slide);
    navigate(`/custom-slide/${savedId}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8', display: 'flex', flexDirection: 'column' }}>

      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 24px',
        background: '#FFF',
        borderBottom: '1px solid #E8E8E4',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', display: 'flex', alignItems: 'center', gap: 4, fontSize: 13 }}
        >
          <ArrowLeft size={16} /> Home
        </button>

        <div style={{ flex: 1 }}>
          <input
            value={slide.name}
            onChange={e => updateName(e.target.value)}
            placeholder="Slide name…"
            style={{
              border: 'none', outline: 'none', fontSize: 16, fontWeight: 600,
              color: '#1A1A1A', background: 'transparent', width: '100%',
              maxWidth: 320,
            }}
          />
        </div>

        <button
          onClick={handleSave}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 18px',
            background: '#075E54', color: '#FFF',
            border: 'none', borderRadius: 6,
            fontSize: 13, fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <Save size={14} /> Save Slide
        </button>
      </div>

      {/* Main 2-col layout — left scrolls, right is sticky */}
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', flex: 1, minHeight: 0 }}>

        {/* LEFT: Controls — scrollable */}
        <div style={{
          borderRight: '1px solid #E8E8E4',
          overflowY: 'auto',
          padding: '20px 20px 60px',
          background: '#FFF',
          height: 'calc(100vh - 57px)', // viewport minus top bar
        }}>

          {/* Background */}
          <SlideBuilderBackground
            background={slide.background}
            font={slide.font}
            onUpdate={updateBackground}
            onUpdateOrb={updateOrb}
            onUpdateFont={updateFont}
          />

          {/* Lines */}
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#555', textTransform: 'uppercase', marginBottom: 12 }}>
            Text Lines
          </div>

          {slide.lines.map((line, i) => (
            <SlideBuilderLineEditor
              key={line.id}
              line={line}
              lineIndex={i}
              totalLines={slide.lines.length}
              onUpdateLine={updateLine}
              onDeleteLine={deleteLine}
              onMoveLine={moveLine}
              onAddSegment={addSegment}
              onDeleteSegment={deleteSegment}
              onUpdateSegment={updateSegment}
            />
          ))}

          <button
            onClick={addLine}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              width: '100%', padding: '10px',
              border: '1.5px dashed #C8C8C4', borderRadius: 6,
              background: 'none', color: '#AAA', fontSize: 12,
              cursor: 'pointer',
            }}
          >
            <Plus size={14} /> Add Line
          </button>
        </div>

        {/* RIGHT: Preview — sticky, never scrolls */}
        <div style={{
          padding: '24px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          position: 'sticky',
          top: 57,
          height: 'calc(100vh - 57px)',
          overflow: 'hidden',
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: '#BBB', textTransform: 'uppercase' }}>
            Live Preview
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <SlideBuilderPreview slide={slide} />
          </div>
          <div style={{ fontSize: 11, color: '#CCC', textAlign: 'center' }}>
            Saves to /custom-slide/… · full-screen
          </div>
        </div>
      </div>
    </div>
  );
}
