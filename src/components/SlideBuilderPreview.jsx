import React, { useRef, useState, useEffect } from 'react';
import CustomSlideRenderer from './CustomSlideRenderer';

export default function SlideBuilderPreview({ slide }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.45);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      // Scale to fit container width, maintaining 16:9 aspect
      const w = el.offsetWidth;
      setScale(w / 1440);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const SLIDE_W = 1440;
  const SLIDE_H = 900;
  const renderedH = Math.round(SLIDE_H * scale);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: renderedH,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 10,
        border: '1px solid #E0E0DC',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        background: '#111',
        flexShrink: 0,
      }}
    >
      <div style={{
        transformOrigin: 'top left',
        transform: `scale(${scale})`,
        width: SLIDE_W,
        height: SLIDE_H,
        pointerEvents: 'none',
      }}>
        <CustomSlideRenderer slide={slide} />
      </div>
    </div>
  );
}
