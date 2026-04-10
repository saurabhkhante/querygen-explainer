import React from 'react';

import { FONTS, DEFAULT_FONT } from './SlideBuilderBackground';

// Build one @import covering all possible fonts so any saved slide renders correctly
const ALL_FONTS_IMPORT = `@import url('https://fonts.googleapis.com/css2?${FONTS.map(f => `family=${f.google}`).join('&')}&display=swap');`;

const WEIGHT_STYLE = {
  light:   300,
  regular: 400,
  bold:    700,
  black:   900,
};

export default function CustomSlideRenderer({ slide }) {
  const { background, lines, font } = slide;
  const fontFamily = `'${font || DEFAULT_FONT}', sans-serif`;

  const topLines    = lines.filter(l => l.verticalGroup === 'top');
  const middleLines = lines.filter(l => l.verticalGroup === 'middle');
  const bottomLines = lines.filter(l => l.verticalGroup === 'bottom');

  const renderLine = (line) => (
    <div
      key={line.id}
      style={{ marginBottom: line.marginBottom, textAlign: 'center' }}
    >
      {line.segments.map((seg, i) => (
        <span
          key={i}
          style={{
            color: '#FFFFFF',
            fontSize: seg.fontSize,
            fontWeight: WEIGHT_STYLE[seg.fontWeight],
            letterSpacing: seg.fontWeight === 'black' ? '-0.02em' : '0.02em',
            lineHeight: 1.1,
          }}
        >
          {seg.text}
        </span>
      ))}
    </div>
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: background.baseColor,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily,
      }}
    >
      <style>{ALL_FONTS_IMPORT}</style>
      {/* Top-right orb */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 384,
        height: 384,
        borderRadius: '50%',
        backgroundColor: background.topRightOrb.color,
        opacity: background.topRightOrb.opacity / 100,
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />
      {/* Bottom-left orb */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 384,
        height: 384,
        borderRadius: '50%',
        backgroundColor: background.bottomLeftOrb.color,
        opacity: background.bottomLeftOrb.opacity / 100,
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />

      {/* Top section */}
      {topLines.length > 0 && (
        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '96px 48px 0',
        }}>
          {topLines.map(renderLine)}
        </div>
      )}

      {/* Middle section — grows to fill, centers vertically */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 48px',
        maxWidth: 1200,
        margin: '0 auto',
        width: '100%',
      }}>
        {middleLines.map(renderLine)}
      </div>

      {/* Bottom section */}
      {bottomLines.length > 0 && (
        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 48px 96px',
        }}>
          {bottomLines.map(renderLine)}
        </div>
      )}

      {/* Branding */}
      <div style={{
        position: 'absolute',
        bottom: 48,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 300,
        letterSpacing: '0.2em',
        opacity: 0.9,
        zIndex: 10,
      }}>
        querygen.ai
      </div>
    </div>
  );
}
