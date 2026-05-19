// Run: node scripts/generate-og-pharma-chem.cjs
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const W = 1200, H = 630, PAD = 80;
const BG='#F7F5F2', GREEN='#1A8A4A', TEAL='#0D7A5F', TEXT='#1E1E1E', MUTED='#6B6560', BORDER='#D7D0C8';
const SANS='-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif';

const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

ctx.fillStyle=BG; ctx.fillRect(0,0,W,H);
ctx.fillStyle=GREEN; ctx.fillRect(0,0,10,H);

ctx.font=`bold 22px ${SANS}`; ctx.fillStyle=GREEN; ctx.textAlign='left'; ctx.textBaseline='top';
ctx.fillText('Querygen', PAD+20, 56);

ctx.font=`16px ${SANS}`; ctx.fillStyle=TEAL; ctx.textAlign='right'; ctx.textBaseline='top';
ctx.fillText('● Pharma & Chemicals', W-PAD, 60);

ctx.fillStyle=BORDER; ctx.fillRect(PAD+20, 96, W-PAD*2-10, 1);

const titleX = PAD+20;
ctx.textAlign='left'; ctx.textBaseline='alphabetic';

ctx.font=`bold 72px ${SANS}`; ctx.fillStyle=TEXT;
ctx.fillText('AI for Pharma &', titleX, 230);
ctx.fillStyle=GREEN;
ctx.fillText('Chemical Operations', titleX, 318);

ctx.font=`26px ${SANS}`; ctx.fillStyle=MUTED;
ctx.fillText('Dashboards, bots, and automations — built around your team\'s data.', titleX, 384);

ctx.fillStyle=BORDER; ctx.fillRect(PAD+20, 430, W-PAD*2-10, 1);

const chips=['Live Dashboard','SpecBot','Automated Workflows','Structured Reports'];
let chipX=PAD+20;
const chipY=462, chipH=42, chipR=21;
ctx.font=`16px ${SANS}`;
chips.forEach(label => {
  const tw=ctx.measureText(label).width, cW=tw+32;
  ctx.beginPath();
  ctx.moveTo(chipX+chipR,chipY); ctx.lineTo(chipX+cW-chipR,chipY);
  ctx.quadraticCurveTo(chipX+cW,chipY,chipX+cW,chipY+chipR);
  ctx.lineTo(chipX+cW,chipY+chipH-chipR);
  ctx.quadraticCurveTo(chipX+cW,chipY+chipH,chipX+cW-chipR,chipY+chipH);
  ctx.lineTo(chipX+chipR,chipY+chipH);
  ctx.quadraticCurveTo(chipX,chipY+chipH,chipX,chipY+chipH-chipR);
  ctx.lineTo(chipX,chipY+chipR);
  ctx.quadraticCurveTo(chipX,chipY,chipX+chipR,chipY);
  ctx.closePath();
  ctx.fillStyle='#EAF6F0'; ctx.fill();
  ctx.strokeStyle='#B5D9C5'; ctx.lineWidth=1.5; ctx.stroke();
  ctx.fillStyle=GREEN; ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText(label, chipX+cW/2, chipY+chipH/2);
  chipX += cW+12;
});

ctx.font=`15px ${SANS}`; ctx.fillStyle=MUTED; ctx.textAlign='right'; ctx.textBaseline='middle';
ctx.fillText('querygen.ai', W-PAD, chipY+chipH/2);

const out = path.join(__dirname,'..','public','og-pharma-chem.png');
fs.writeFileSync(out, canvas.toBuffer('image/png'));
console.log('Written:', out);
