// Run: node scripts/generate-og-pharma-chem.cjs
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const W = 1200, H = 630;
const PAD = 72;
const BG = '#F7F5F2';
const GREEN = '#1A8A4A';
const TEAL_DARK = '#0A5040';
const TEAL_BORDER = '#C5DDD5';
const TEAL_DOT = '#0D7A5F';
const TEXT = '#1E1E1E';
const MUTED = '#555555';
const BORDER = '#D7D0C8';
const SANS = 'Arial, sans-serif';

const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

// ── Background ────────────────────────────────────────────────────────────────
ctx.fillStyle = BG;
ctx.fillRect(0, 0, W, H);

// ── Header ────────────────────────────────────────────────────────────────────
const headerY = 52;

// Q logo
ctx.font = `bold 30px ${SANS}`;
ctx.fillStyle = GREEN;
ctx.textAlign = 'left';
ctx.textBaseline = 'middle';
ctx.fillText('Q', PAD, headerY);

// "querygen.ai"
ctx.font = `500 18px ${SANS}`;
ctx.fillStyle = '#26221d';
ctx.fillText('querygen.ai', PAD + 36, headerY);

// Badge pill — "● Pharma & Chemicals"
const badgeLabel = '● Pharma & Chemicals';
ctx.font = `15px ${SANS}`;
const badgeTW = ctx.measureText(badgeLabel).width;
const badgePadX = 18, badgePadY = 10;
const badgeW = badgeTW + badgePadX * 2;
const badgeH = 34;
const badgeX = W - PAD - badgeW;
const badgeTop = headerY - badgeH / 2;
const badgeR = badgeH / 2;

// draw rounded pill
ctx.beginPath();
ctx.moveTo(badgeX + badgeR, badgeTop);
ctx.lineTo(badgeX + badgeW - badgeR, badgeTop);
ctx.quadraticCurveTo(badgeX + badgeW, badgeTop, badgeX + badgeW, badgeTop + badgeR);
ctx.lineTo(badgeX + badgeW, badgeTop + badgeH - badgeR);
ctx.quadraticCurveTo(badgeX + badgeW, badgeTop + badgeH, badgeX + badgeW - badgeR, badgeTop + badgeH);
ctx.lineTo(badgeX + badgeR, badgeTop + badgeH);
ctx.quadraticCurveTo(badgeX, badgeTop + badgeH, badgeX, badgeTop + badgeH - badgeR);
ctx.lineTo(badgeX, badgeTop + badgeR);
ctx.quadraticCurveTo(badgeX, badgeTop, badgeX + badgeR, badgeTop);
ctx.closePath();
ctx.fillStyle = 'rgba(255,255,255,0.85)';
ctx.fill();
ctx.strokeStyle = TEAL_BORDER;
ctx.lineWidth = 1.5;
ctx.stroke();

ctx.font = `15px ${SANS}`;
ctx.fillStyle = TEAL_DARK;
ctx.textAlign = 'left';
ctx.textBaseline = 'middle';
ctx.fillText(badgeLabel, badgeX + badgePadX, headerY);

// ── Divider ───────────────────────────────────────────────────────────────────
ctx.fillStyle = BORDER;
ctx.fillRect(PAD, 82, W - PAD * 2, 1);

// ── Centered title ────────────────────────────────────────────────────────────
ctx.textAlign = 'center';
ctx.textBaseline = 'alphabetic';

// Measure to decide on font size — target single line if it fits
ctx.font = `bold 72px ${SANS}`;
const fullTitle = 'AI for Pharma & Chemical Operations';
const titleW = ctx.measureText(fullTitle).width;
const maxTitleW = W - PAD * 2;

if (titleW <= maxTitleW) {
  ctx.fillStyle = TEXT;
  ctx.fillText(fullTitle, W / 2, 320);
} else {
  // Two lines
  ctx.fillStyle = TEXT;
  ctx.fillText('AI for Pharma &', W / 2, 290);
  ctx.fillText('Chemical Operations', W / 2, 378);
}

// ── Subtitle ──────────────────────────────────────────────────────────────────
const subtitleTop = titleW <= maxTitleW ? 370 : 430;
ctx.font = `26px ${SANS}`;
ctx.fillStyle = MUTED;
ctx.fillText('Dashboards, bots, and automations built around data your team already creates.', W / 2, subtitleTop);

// ── Bottom divider + url ──────────────────────────────────────────────────────
ctx.fillStyle = BORDER;
ctx.fillRect(PAD, H - 80, W - PAD * 2, 1);

ctx.font = `16px ${SANS}`;
ctx.fillStyle = '#9A8E84';
ctx.textAlign = 'right';
ctx.textBaseline = 'middle';
ctx.fillText('querygen.ai', W - PAD, H - 48);

const out = path.join(__dirname, '..', 'public', 'og-pharma-chem.png');
fs.writeFileSync(out, canvas.toBuffer('image/png'));
console.log('Written:', out);
