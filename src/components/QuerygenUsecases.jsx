import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  FileText,
  Mail,
  MessageSquare,
  Sparkles,
  Table2,
  Zap,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const HEADING = 'text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-[#1E1E1E]';
const SUBHEADING = 'mt-5 text-xl sm:text-3xl leading-snug text-[#333]';
const EASE = [0.22, 1, 0.36, 1];

// ── Scene building blocks ─────────────────────────────────────────────────────

function SceneConnector({ reducedMotion, delay = 0 }) {
  return (
    <div className="hidden md:block relative w-16 h-px bg-[#B8AB9B]/70">
      <motion.span
        className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#1A8A4A] shadow-[0_0_18px_rgba(26,138,74,0.75)]"
        initial={{ x: -12, opacity: 0 }}
        animate={reducedMotion ? { x: 18, opacity: 0.9 } : { x: [0, 40], opacity: [0, 1, 1, 0] }}
        transition={reducedMotion ? { duration: 0.01 } : { duration: 1.5, delay, repeat: Infinity, ease: 'linear' }}
      />
      {!reducedMotion && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1A8A4A]/45 to-transparent"
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 1.7, delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
}

function SceneStage({ left, center, right, reducedMotion }) {
  const t = (delay) => ({ duration: 0.65, delay, ease: EASE });
  return (
    <div className="mt-8 sm:mt-10 relative rounded-[30px] border border-[#D9D1C7] overflow-hidden bg-gradient-to-br from-[#FCFBF9] via-[#F6F2EB] to-[#EEE7DD] p-4 sm:p-6">
      <div className="pointer-events-none absolute -top-10 -left-4 w-52 h-52 rounded-full bg-[#1A8A4A]/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-10 w-64 h-64 rounded-full bg-[#E8B84B]/18 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.6),rgba(255,255,255,0)_50%)]" />
      <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-3 md:gap-4 items-center">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={t(0)}>{left}</motion.div>
        <SceneConnector reducedMotion={reducedMotion} delay={0.1} />
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={t(0.2)}>{center}</motion.div>
        <SceneConnector reducedMotion={reducedMotion} delay={0.45} />
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={t(0.4)}>{right}</motion.div>
      </div>
    </div>
  );
}

// ── Dashboard viz scene ───────────────────────────────────────────────────────

function DashboardVizScene({ reducedMotion }) {
  const sourceCards = [
    {
      label: 'Field Inspection Report',
      rows: [
        { a: '14 May', b: 'Priya S.', c: 'Closed' },
        { a: '13 May', b: 'Rohit M.', c: 'Open' },
      ],
      headerCols: ['Date', 'Inspector', 'Status'],
      closedColor: 'text-[#1A8A4A]',
      openColor: 'text-[#D97706]',
    },
    {
      label: 'Batch Log',
      rows: [
        { a: 'BT-2241', b: 'Metformin', c: 'QC' },
        { a: 'BT-2240', b: 'Amlodipine', c: 'Done' },
      ],
      headerCols: ['Batch', 'Product', 'Stage'],
      closedColor: 'text-[#1A8A4A]',
      openColor: 'text-[#2563EB]',
    },
  ];

  const metrics = [
    { value: '14', label: 'Reports filed this week', color: 'bg-[#EAF6F0] border-[#C8E8D4] text-[#1A8A4A]', pulse: false },
    { value: '3',  label: 'Open findings',           color: 'bg-[#FFFBEB] border-[#FDE68A] text-[#D97706]', pulse: true  },
    { value: '12 May', label: 'Next audit scheduled', color: 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569]', pulse: false },
  ];

  const barHeights = [40, 60, 45, 75, 55];

  return (
    <SceneStage
      reducedMotion={reducedMotion}
      left={
        <div className="rounded-3xl border border-[#D6CEC2] bg-white/92 px-4 py-4 shadow-[0_14px_30px_rgba(44,38,30,0.08)]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#73675B] mb-3">Your data</p>
          <div className="space-y-2.5">
            {sourceCards.map((card, ci) => (
              <motion.div
                key={card.label}
                className="rounded-xl border border-[#E8E2DA] bg-[#FDFBF8] overflow-hidden"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.18, duration: 0.4, ease: EASE }}
              >
                <div className="px-2.5 py-1.5 border-b border-[#EDE8E1] bg-[#F7F4F0]">
                  <p className="text-[9px] font-semibold text-[#4A4540]">{card.label}</p>
                </div>
                <div className="px-2.5 py-1.5">
                  <div className="grid grid-cols-3 text-[8px] text-[#9A8E84] font-medium mb-1">
                    {card.headerCols.map((h) => <span key={h}>{h}</span>)}
                  </div>
                  {card.rows.map((row, ri) => (
                    <div key={ri} className="grid grid-cols-3 text-[9px] text-[#2A2520]">
                      <span>{row.a}</span>
                      <span>{row.b}</span>
                      <span className={ri === 0 ? card.closedColor : card.openColor}>{row.c}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
            <motion.div
              className="rounded-xl border border-[#E8E2DA] bg-[#FDFBF8] px-2.5 py-2"
              animate={reducedMotion ? { opacity: 1 } : { opacity: [0.5, 1, 0.5] }}
              transition={reducedMotion ? { duration: 0.01 } : { duration: 2, repeat: Infinity }}
            >
              <p className="text-[9px] font-semibold text-[#4A4540] mb-0.5">Incident Note</p>
              <p className="text-[8px] text-[#7A7068]">Line 4 coolant pressure drop — escalated to maintenance</p>
            </motion.div>
          </div>
        </div>
      }
      center={
        <div className="rounded-3xl border border-[#CCE4D6] bg-gradient-to-br from-[#F5FCF8] to-[#EAF7EF] px-4 py-4 shadow-[0_14px_30px_rgba(26,138,74,0.12)] relative overflow-hidden">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#20633C] text-center mb-2">Querygen</p>
          <div
            className="mx-auto text-[28px] font-bold text-[#1A8A4A] leading-none text-center"
            style={{ fontFamily: "'Amaranth', sans-serif" }}
          >
            Q
          </div>
          <p className="text-[9px] text-center text-[#20633C] mt-2">Reading &amp; connecting</p>
          <div className="mt-3 relative rounded-lg border border-[#D8EBDF] bg-white/80 h-10 overflow-hidden">
            <motion.div
              className="absolute left-0 right-0 h-6 rounded bg-gradient-to-b from-[#1A8A4A]/25 via-[#1A8A4A]/10 to-transparent border border-[#1A8A4A]/30"
              animate={reducedMotion ? { top: 4, opacity: 0.9 } : { top: [4, 24, 4], opacity: [0.4, 0.9, 0.4] }}
              transition={reducedMotion ? { duration: 0.01 } : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      }
      right={
        <div className="rounded-3xl border border-[#B9DEC9] bg-gradient-to-br from-[#F2FBF6] to-[#E7F5ED] px-4 py-4 shadow-[0_14px_30px_rgba(26,138,74,0.14)]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#1F6B3E] mb-3">Live Dashboard</p>
          <div className="space-y-2">
            {metrics.map(({ value, label, color, pulse }) => (
              <motion.div
                key={label}
                className={`rounded-xl border px-3 py-2 flex items-center gap-2.5 ${color}`}
                animate={pulse && !reducedMotion ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
                transition={pulse ? { duration: 1.6, repeat: Infinity } : {}}
              >
                <span className="text-lg font-bold leading-none">{value}</span>
                <span className="text-[9px] leading-snug">{label}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 flex items-end gap-1 h-10 px-1">
            {barHeights.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-sm bg-[#1A8A4A]/30"
                style={{ height: `${h}%` }}
                animate={i === barHeights.length - 1 && !reducedMotion ? { height: ['55%', '75%', '55%'] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
          <p className="text-[8px] text-[#4A7A5A] mt-1 text-center">Reports filed per day</p>
        </div>
      }
    />
  );
}

// ── Bot viz scene ─────────────────────────────────────────────────────────────

function BotVizScene({ reducedMotion }) {
  const docCards = [
    { label: 'SOP Manual', tags: ['Cleaning', 'Sterilisation'] },
    { label: 'Product Protocols', tags: ['Line 3', 'Line 4', 'Reactor'] },
    { label: 'Audit Guidelines', tags: ['FDA', 'WHO-GMP'] },
  ];

  return (
    <SceneStage
      reducedMotion={reducedMotion}
      left={
        <div className="rounded-3xl border border-[#D6CEC2] bg-white/92 px-4 py-4 shadow-[0_14px_30px_rgba(44,38,30,0.08)]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#73675B] mb-3">Your documents</p>
          <div className="space-y-2.5">
            {docCards.map(({ label, tags }, idx) => (
              <motion.div
                key={label}
                className="rounded-xl border border-[#E8E2DA] bg-[#FDFBF8] px-3 py-2.5"
                animate={reducedMotion ? { opacity: 1 } : { opacity: [0.55, 1, 0.55] }}
                transition={reducedMotion ? { duration: 0.01 } : { duration: 2.2, delay: idx * 0.4, repeat: Infinity }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <FileText size={10} className="text-[#C2410C] shrink-0" />
                  <p className="text-[9px] font-semibold text-[#2A2520]">{label}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {tags.map((t) => (
                    <span key={t} className="text-[8px] px-1.5 py-0.5 rounded-full bg-[#EDE8E1] text-[#5A5048]">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      }
      center={
        <div className="rounded-3xl border border-[#CCE4D6] bg-gradient-to-br from-[#F5FCF8] to-[#EAF7EF] px-4 py-4 shadow-[0_14px_30px_rgba(26,138,74,0.12)]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#20633C] mb-2">Knowledge Base</p>
          <div className="space-y-1.5">
            {['SOP Manual', 'Product Protocols', 'Audit Guidelines', 'Compliance Docs'].map((f, idx) => (
              <motion.div
                key={f}
                className="flex items-center gap-2 rounded-lg bg-white/85 border border-[#D7ECDF] px-2 py-1.5"
                animate={reducedMotion ? { opacity: 1 } : { opacity: [0.5, 1, 0.5] }}
                transition={reducedMotion ? { duration: 0.01 } : { duration: 2, delay: idx * 0.3, repeat: Infinity }}
              >
                <FileText size={9} className="text-[#1A8A4A] shrink-0" />
                <span className="text-[8.5px] text-[#19472C]">{f}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[8.5px] text-[#20633C]">
            <motion.div
              className="w-2 h-2 rounded-full bg-[#1A8A4A] shrink-0"
              animate={reducedMotion ? { scale: 1 } : { scale: [1, 1.6, 1] }}
              transition={reducedMotion ? { duration: 0.01 } : { duration: 1.2, repeat: Infinity }}
            />
            Always up to date
          </div>
        </div>
      }
      right={
        <div className="rounded-3xl border border-[#B9DEC9] bg-gradient-to-br from-[#F2FBF6] to-[#E7F5ED] px-4 py-4 shadow-[0_14px_30px_rgba(26,138,74,0.14)]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#1F6B3E] mb-3">Bot answers instantly</p>
          <div className="space-y-2">
            <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-[#DCF8C6] px-2.5 py-2 text-[9px] text-[#263025]">
              What is the cleaning protocol for Reactor 3?
            </div>
            <motion.div
              className="max-w-[92%] rounded-2xl rounded-tl-sm bg-white border border-[#D0E9DA] px-2.5 py-2 text-[9px] text-[#1E3A2A] space-y-0.5"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <p className="font-semibold text-[#1A8A4A]">Per SOP-CV-017:</p>
              <p>Pre-rinse 3× with purified water</p>
              <p>NaOH 2% solution — 15 min contact</p>
              <p>Final rinse conductivity ≤ 1.3 µS/cm</p>
            </motion.div>
            <p className="text-[8px] text-[#4A7A5A] flex items-center gap-1">
              <CheckCircle2 size={9} /> Answered from SOP Manual
            </p>
          </div>
        </div>
      }
    />
  );
}

// ── Flows viz scene ───────────────────────────────────────────────────────────

function FlowsVizScene({ reducedMotion }) {
  const actions = [
    { label: 'Batch cost sheet updated — yield variance flagged', color: 'bg-[#EAF6F0] border-[#C8E8D4] text-[#1A8A4A]', delay: 0.4 },
    { label: 'QC sampling request raised automatically', color: 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]', delay: 0.75 },
    { label: 'Dispatch team notified: batch ready for release', color: 'bg-[#FFFBEB] border-[#FDE68A] text-[#D97706]', delay: 1.1 },
  ];

  return (
    <SceneStage
      reducedMotion={reducedMotion}
      left={
        <div className="rounded-3xl border border-[#D6CEC2] bg-[#F9F7F4] px-4 py-4 shadow-[0_14px_30px_rgba(44,38,30,0.07)]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#7A6A5A] mb-3 inline-flex items-center gap-1.5">
            <Mail size={11} /> Email · Production Floor
          </p>
          <div className="rounded-xl border border-[#E0D8CE] bg-white px-3 py-3">
            <p className="text-[10px] font-semibold text-[#2A2018] leading-snug">Batch 2247 complete</p>
            <p className="text-[9px] text-[#6A5A48] mt-1">Product: Cefotaxime Sodium</p>
            <p className="text-[9px] text-[#6A5A48]">Yield: 94 kg · RM consumed per BOM</p>
            <p className="text-[9px] text-[#9A8A78] mt-2">Rajan More · 14 May · 02:15 PM</p>
          </div>
        </div>
      }
      center={
        <div className="rounded-3xl border border-[#FDE68A] bg-gradient-to-br from-[#FFFDF5] to-[#FFF8DC] px-4 py-4 shadow-[0_14px_30px_rgba(217,119,6,0.12)] text-center">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#92400E] mb-2">Querygen</p>
          <motion.div
            className="mx-auto w-10 h-10 rounded-full bg-white border border-[#FDE68A] flex items-center justify-center text-[#D97706]"
            animate={reducedMotion ? { rotate: 0 } : { rotate: [0, 360] }}
            transition={reducedMotion ? { duration: 0.01 } : { duration: 6, repeat: Infinity, ease: 'linear' }}
          >
            <Zap size={18} />
          </motion.div>
          <p className="text-[9px] text-[#92400E] mt-2">Automation running</p>
        </div>
      }
      right={
        <div className="rounded-3xl border border-[#B9DEC9] bg-gradient-to-br from-[#F2FBF6] to-[#E7F5ED] px-4 py-4 shadow-[0_14px_30px_rgba(26,138,74,0.14)]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#1F6B3E] mb-3">Actions taken automatically</p>
          <div className="space-y-2">
            {actions.map(({ label, color, delay }) => (
              <motion.div
                key={label}
                className={`rounded-xl border px-3 py-2 flex items-center gap-2 ${color}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay, duration: 0.4, ease: EASE }}
              >
                <CheckCircle2 size={12} className="shrink-0" />
                <span className="text-[9px] font-medium leading-snug">{label}</span>
              </motion.div>
            ))}
          </div>
          <p className="mt-3 text-[8.5px] text-[#4A7A5A]">Three teams updated. One message sent.</p>
        </div>
      }
    />
  );
}

// ── Nichem bot scene ──────────────────────────────────────────────────────────

function NichemBotScene({ reducedMotion }) {
  return (
    <SceneStage
      reducedMotion={reducedMotion}
      left={
        <div className="rounded-3xl border border-[#D6CEC2] bg-white/92 backdrop-blur px-4 py-4 shadow-[0_14px_30px_rgba(44,38,30,0.08)]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#73675B] inline-flex items-center gap-2">
            <MessageSquare size={13} /> WhatsApp · Nichem Chemicals
          </p>
          <div className="mt-3 mx-auto w-[168px] rounded-[26px] border-[3px] border-[#151515] bg-[#F6F1E9] shadow-[0_12px_26px_rgba(20,18,14,0.25)] overflow-hidden relative">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-[#292929]" />
            <div className="h-12 bg-[#0E6A59] text-white px-3 pt-4 pb-2 flex items-center text-[10px]">
              <div className="w-5 h-5 rounded-full bg-[#32C46C] mr-2 shrink-0" />
              <div>
                <p className="font-semibold leading-none">Nichem Chemicals</p>
                <p className="opacity-80 text-[9px] mt-0.5">online</p>
              </div>
            </div>
            <div className="p-2.5 space-y-1.5 bg-[#ECE5DD]">
              <motion.div
                className="max-w-[92%] rounded-xl bg-white border border-[#E3DBCF] px-2.5 py-1.5"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.35 }}
              >
                <p className="text-[8px] text-[#9A8E84] mb-0.5">Al Rashid Medical · Saudi Arabia</p>
                <p className="text-[9px] font-semibold text-[#2E2520]" dir="rtl">هل لديكم Metformin HCl بدرجة USP؟</p>
              </motion.div>
              <motion.div
                className="max-w-[40%] rounded-xl bg-white border border-[#E3DBCF] px-2.5 py-1.5 flex gap-1 items-center"
                animate={reducedMotion ? { opacity: 1 } : { opacity: [0.4, 1, 0.4] }}
                transition={reducedMotion ? { duration: 0.01 } : { duration: 1.2, repeat: Infinity }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#9A8E84]"
                    animate={reducedMotion ? { scale: 1 } : { scale: [1, 1.5, 1] }}
                    transition={reducedMotion ? { duration: 0.01 } : { duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      }
      center={
        <div className="rounded-3xl border border-[#CCE4D6] bg-gradient-to-br from-[#F5FCF8] to-[#EAF7EF] px-4 py-4 shadow-[0_14px_30px_rgba(26,138,74,0.12)] relative overflow-hidden">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#20633C] inline-flex items-center gap-2">
            <BookOpen size={13} /> Knowledge Base
          </p>
          <div className="mt-3 space-y-2">
            {[
              'Product Catalog 2024.pdf',
              'SDS Sheets (240 SKUs)',
              'DMF Status List.xlsx',
              'Pharmacopeia Grades.csv',
            ].map((label, idx) => (
              <motion.div
                key={label}
                className="flex items-center gap-2 rounded-lg bg-white/85 border border-[#D7ECDF] px-2.5 py-1.5"
                animate={reducedMotion ? { opacity: 1 } : { opacity: [0.5, 1, 0.5] }}
                transition={reducedMotion ? { duration: 0.01 } : { duration: 2, delay: idx * 0.35, repeat: Infinity }}
              >
                <FileText size={10} className="text-[#1A8A4A] shrink-0" />
                <span className="text-[9px] text-[#19472C]">{label}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[9px] text-[#20633C]">
            <motion.div
              className="w-2 h-2 rounded-full bg-[#1A8A4A]"
              animate={reducedMotion ? { scale: 1 } : { scale: [1, 1.6, 1] }}
              transition={reducedMotion ? { duration: 0.01 } : { duration: 1.2, repeat: Infinity }}
            />
            <span>Arabic detected · searching in English</span>
          </div>
        </div>
      }
      right={
        <div className="rounded-3xl border border-[#B9DEC9] bg-gradient-to-br from-[#F2FBF6] to-[#E7F5ED] px-4 py-4 shadow-[0_14px_30px_rgba(26,138,74,0.14)]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#1F6B3E] inline-flex items-center gap-2">
            <Sparkles size={13} /> Bot Response
          </p>
          <motion.div
            className="mt-3 rounded-xl bg-white border border-[#D0E9DA] px-2.5 py-2 text-[9px] text-[#1E3A2A] space-y-0.5"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.45 }}
          >
            <p className="font-semibold text-[#1A8A4A]">Metformin HCl — USP Grade</p>
            <p>US-DMF filed · Type II</p>
            <p>Sampling: 100g available</p>
            <p>MOQ: 500kg / year commercial</p>
          </motion.div>
          <motion.div
            className="mt-2.5 rounded-xl bg-[#EAF6F0] border border-[#C8E8D4] px-2.5 py-2 text-[9px] text-[#1A8A4A] space-y-0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.4 }}
          >
            <p className="font-semibold text-[8px] uppercase tracking-wider text-[#1F6B3E] mb-1">Lead captured →</p>
            <p>Company: Al Rashid Medical</p>
            <p>Molecule: Metformin HCl USP</p>
            <p>Language: Arabic → English</p>
            <div className="flex items-center gap-1 mt-1">
              <CheckCircle2 size={9} />
              <span>Routed to BD Team</span>
            </div>
          </motion.div>
        </div>
      }
    />
  );
}

// ── What We Do slide ─────────────────────────────────────────────────────────


const SOURCES = [
  {
    Icon: FileText,
    label: 'Documents',
    desc: 'PDFs, SOPs, compliance reports, audit findings',
    bg: 'bg-[#FFF7ED]',
    border: 'border-[#FED7AA]',
    iconCls: 'text-[#C2410C]',
  },
  {
    Icon: Table2,
    label: 'Spreadsheets',
    desc: 'Excel files, batch logs, data trackers',
    bg: 'bg-[#EFF6FF]',
    border: 'border-[#BFDBFE]',
    iconCls: 'text-[#2563EB]',
  },
  {
    Icon: MessageSquare,
    label: 'Team Messages',
    desc: 'WhatsApp, emails, field updates, and messages from your team',
    bg: 'bg-[#F8FAFC]',
    border: 'border-[#E2E8F0]',
    iconCls: 'text-[#64748B]',
  },
];

const OUTPUTS = [
  {
    Icon: BarChart3,
    label: 'Live Dashboard',
    desc: 'A real-time view of what\'s happening — without anyone entering data manually',
    bg: 'bg-[#F0FDF4]',
    border: 'border-[#BBF7D0]',
    iconCls: 'text-[#1A8A4A]',
  },
  {
    Icon: Sparkles,
    label: 'AI Bot',
    desc: 'Answers questions from your team or clients — from your own documents, 24/7',
    bg: 'bg-[#F5F3FF]',
    border: 'border-[#DDD6FE]',
    iconCls: 'text-[#7C3AED]',
  },
  {
    Icon: Zap,
    label: 'Automated Workflows',
    desc: 'When something changes, the right people are notified and records are updated — automatically',
    bg: 'bg-[#FFFBEB]',
    border: 'border-[#FDE68A]',
    iconCls: 'text-[#D97706]',
  },
  {
    Icon: ClipboardList,
    label: 'Structured Report',
    desc: 'Clean, organised data your team can read and act on',
    bg: 'bg-[#EFF6FF]',
    border: 'border-[#BFDBFE]',
    iconCls: 'text-[#2563EB]',
  },
];

function WhatWeDoSlide({ reducedMotion }) {
  return (
    <section className="w-full">
      <h2 className={HEADING}>What Querygen Does</h2>
      <p className="mt-4 text-lg sm:text-xl text-[#555] leading-snug max-w-3xl">
        We build AI tools on top of data your team already creates — dashboards, bots, and automations — so nothing gets lost and nothing needs to be entered twice.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_64px_1fr] gap-4 items-center">
        {/* Sources */}
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9A8E84] mb-3">Where your data lives today</p>
          {SOURCES.map(({ Icon, label, desc, bg, border, iconCls }) => (
            <div key={label} className={`flex items-start gap-3 rounded-2xl border ${border} ${bg} px-4 py-3.5`}>
              <Icon size={18} className={`${iconCls} shrink-0 mt-0.5`} />
              <div>
                <p className="text-sm font-semibold text-[#1E1E1E]">{label}</p>
                <p className="text-xs text-[#666] mt-0.5 leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Animated connector */}
        <div className="hidden md:flex flex-col items-center justify-center gap-0 self-stretch py-8">
          <div className="flex-1 w-px bg-gradient-to-b from-transparent via-[#C8C0B6] to-transparent" />
          <div className="my-2 relative flex flex-col items-center gap-1.5">
            {[0, 0.4, 0.8].map((delay) => (
              <div key={delay} className="relative w-8 h-px bg-[#C8C0B6]/60">
                <motion.span
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#1A8A4A] shadow-[0_0_10px_rgba(26,138,74,0.65)]"
                  animate={reducedMotion ? { x: 24, opacity: 0.9 } : { x: [0, 28], opacity: [0, 1, 1, 0] }}
                  transition={reducedMotion ? { duration: 0.01 } : { duration: 1.4, delay, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            ))}
          </div>
          <div
            className="my-2 text-[22px] font-bold text-[#1A8A4A] leading-none"
            style={{ fontFamily: "'Amaranth', sans-serif" }}
          >
            Q
          </div>
          <div className="my-2 relative flex flex-col items-center gap-1.5">
            {[0.2, 0.6, 1].map((delay) => (
              <div key={delay} className="relative w-8 h-px bg-[#C8C0B6]/60">
                <motion.span
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#1A8A4A] shadow-[0_0_10px_rgba(26,138,74,0.65)]"
                  animate={reducedMotion ? { x: 24, opacity: 0.9 } : { x: [0, 28], opacity: [0, 1, 1, 0] }}
                  transition={reducedMotion ? { duration: 0.01 } : { duration: 1.4, delay, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            ))}
          </div>
          <div className="flex-1 w-px bg-gradient-to-b from-transparent via-[#C8C0B6] to-transparent" />
        </div>

        {/* Outputs */}
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9A8E84] mb-3">What you get</p>
          {OUTPUTS.map(({ Icon, label, desc, bg, border, iconCls }) => (
            <div key={label} className={`flex items-start gap-3 rounded-2xl border ${border} ${bg} px-4 py-3.5`}>
              <Icon size={18} className={`${iconCls} shrink-0 mt-0.5`} />
              <div>
                <p className="text-sm font-semibold text-[#1E1E1E]">{label}</p>
                <p className="text-xs text-[#666] mt-0.5 leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Slide renderers ───────────────────────────────────────────────────────────

function SectionSlide({ slide }) {
  return (
    <section className="w-full min-h-[62vh] flex flex-col items-center justify-center text-center">
      <h2 className={HEADING}>{slide.title}</h2>
      <p className={`${SUBHEADING} max-w-2xl`}>{slide.subtitle}</p>
    </section>
  );
}

function CaseGridSlide({ slide }) {
  return (
    <section className="w-full">
      <h2 className={HEADING}>{slide.title}</h2>
      <p className={SUBHEADING}>{slide.subtitle}</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {slide.cases.map((c) => (
          <Link
            key={c.name}
            to={c.href}
            className="group flex flex-col rounded-2xl border border-[#D7D0C8] bg-white hover:shadow-[0_4px_18px_rgba(44,38,30,0.09)] hover:bg-[#FAFAF8] transition-all overflow-hidden"
          >
            <div className="flex items-start gap-3 p-4 pb-3">
              <div className="w-1 self-stretch rounded-full shrink-0 mt-0.5" style={{ backgroundColor: c.color }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-[#1E1E1E] leading-snug">{c.name}</p>
                  <span
                    className="text-[9px] font-medium text-white px-2 py-0.5 rounded-full shrink-0 mt-0.5 leading-none"
                    style={{ backgroundColor: c.color }}
                  >
                    {c.tag}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-[#666] leading-snug">{c.line}</p>
              </div>
            </div>
            <div className="px-4 pb-4 pt-0 flex items-center justify-between pl-8">
              <span className="text-xs font-medium text-[#1A8A4A]">{c.metric}</span>
              <span className="text-sm text-[#C0B8B0] group-hover:text-[#1A8A4A] transition-colors">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function parseBold(text) {
  return text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1
      ? <strong key={i} className="font-semibold text-[#1E1E1E]">{part}</strong>
      : part
  );
}

function StandardSlide({ slide }) {
  return (
    <section className="w-full">
      <div className="max-w-5xl">
        <h2 className={HEADING}>{slide.title}</h2>
        <p className={SUBHEADING}>{slide.subtitle}</p>
        <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 max-w-4xl">
          {slide.bullets.map((bullet) => (
            <li key={bullet} className="text-base sm:text-lg leading-snug text-[#2B2B2B] flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1E1E1E] shrink-0" />
              <span>{parseBold(bullet)}</span>
            </li>
          ))}
        </ul>
        {slide.footnote && (
          <p className="mt-8 text-sm text-[#999] italic border-t border-[#EAE6E1] pt-5 max-w-4xl">
            {slide.footnote}
          </p>
        )}
      </div>
    </section>
  );
}

function PharmaSceneSlide({ slide, reducedMotion }) {
  const SCENE_MAP = {
    'nichem-bot':    NichemBotScene,
    'dashboard-viz': DashboardVizScene,
    'bot-viz':       BotVizScene,
    'flows-viz':     FlowsVizScene,
  };
  const SceneComponent = SCENE_MAP[slide.sceneId] || NichemBotScene;

  return (
    <section className="w-full">
      <div className="max-w-5xl">
        {slide.eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9A8E84] mb-3">
            {slide.eyebrow}
          </p>
        )}
        <h2 className={HEADING}>{slide.title}</h2>
        <p className={SUBHEADING}>{slide.subtitle}</p>
        <SceneComponent reducedMotion={reducedMotion} />
        {slide.bullets && (
          <>
          {slide.bulletsTitle && (
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-widest text-[#9A8E84]">
              {slide.bulletsTitle}
            </p>
          )}
          <ul className={`${slide.bulletsTitle ? 'mt-2' : 'mt-6'} space-y-1.5 max-w-4xl`}>
            {slide.bullets.map((bullet) => (
              <li key={bullet} className="text-sm sm:text-base leading-snug text-[#4A4A4A] flex items-start gap-2.5">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#9A8E84] shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          </>
        )}
        {slide.ctaHref && (
          <div className="mt-6">
            <Link
              to={slide.ctaHref}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium bg-[#1A8A4A] text-white hover:bg-[#156F3B] transition-colors"
            >
              {slide.ctaLabel}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function ClosingSlide({ slide }) {
  return (
    <section className="w-full">
      <div className="max-w-5xl">
        <h2 className={HEADING}>{slide.title}</h2>
        <p className={SUBHEADING}>{slide.subtitle}</p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {slide.points.map((point, idx) => (
            <div
              key={point}
              className="rounded-2xl border border-[#D7D0C8] bg-white/80 px-5 py-5 shadow-[0_4px_16px_rgba(44,38,30,0.06)]"
            >
              <p className="text-xs uppercase tracking-wider text-[#9A8E84] mb-2">Question {idx + 1}</p>
              <p className="text-base sm:text-lg text-[#1E1E1E] leading-snug">{point}</p>
            </div>
          ))}
        </div>
        {slide.offer && (
          <div className="mt-4 rounded-2xl border border-[#D7D0C8] border-l-4 border-l-[#1A8A4A] bg-white/80 px-5 py-5 shadow-[0_4px_16px_rgba(44,38,30,0.06)]">
            <p className="text-xs uppercase tracking-wider text-[#1A8A4A] mb-2">One thought</p>
            <p className="text-base sm:text-lg text-[#1E1E1E] leading-snug">{parseBold(slide.offer)}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ThankyouSlide({ slide }) {
  return (
    <section className="w-full min-h-[62vh] flex flex-col justify-center">
      <h2 className={HEADING}>{slide.title}</h2>
      <div className="mt-8 rounded-2xl border border-[#D7D0C8] bg-white/80 p-5 max-w-md">
        <p className="text-sm sm:text-base text-[#2B2B2B]">
          Website:{' '}
          <a href={`https://${slide.website}`} target="_blank" rel="noreferrer" className="text-[#1A8A4A] font-medium hover:underline">
            {slide.website}
          </a>
        </p>
        <p className="mt-2 text-sm sm:text-base text-[#2B2B2B]">
          Call:{' '}
          <a href="tel:+918879901887" className="text-[#1A8A4A] font-medium hover:underline">{slide.phones[0]}</a>
          {' / '}
          <a href="tel:+919970375002" className="text-[#1A8A4A] font-medium hover:underline">{slide.phones[1]}</a>
        </p>
      </div>
    </section>
  );
}

// ── Slide data ────────────────────────────────────────────────────────────────

const SLIDES = [
  {
    id: 'cover',
    type: 'section',
    title: 'We 100x the workflows your business runs on.',
    subtitle: 'AI tools for logistics, operations, sales, and dispatch — built around how your team already works.',
  },
  {
    id: 'what-we-do',
    type: 'whatwedo',
    title: 'What Querygen Does',
  },
  {
    id: 'dashboard-viz',
    type: 'pharma-scene',
    sceneId: 'dashboard-viz',
    eyebrow: 'What Querygen Does  ·  1 of 3',
    title: 'A dashboard that builds itself',
    subtitle: 'Your team files reports and logs batches. The dashboard reads them and stays current — no one enters data manually.',
    bulletsTitle: 'Other examples',
    bullets: [
      'Inspector field reports → batch-wise compliance score updated daily — no spreadsheet needed',
      'Supplier delivery data → on-time vs. delayed tracker across all vendors, built automatically',
      'Batch records across lines → real-time yield vs. target — gaps visible before end of shift',
    ],
  },
  {
    id: 'bot-viz',
    type: 'pharma-scene',
    sceneId: 'bot-viz',
    eyebrow: 'What Querygen Does  ·  2 of 3',
    title: 'Any question, answered from your own documents',
    subtitle: 'Upload your SOPs, protocols, and guidelines once. Ask a question — the bot answers instantly, from your data.',
    bulletsTitle: 'Other examples',
    bullets: [
      '"What is the cleaning validation limit for Reactor 2?" — answered from your protocol, not a phone call',
      '"Which SOPs were revised last quarter?" — pulled from your document register in seconds',
      '"What training has Rajan completed?" — answered from training records, no HR follow-up needed',
    ],
  },
  {
    id: 'flows-viz',
    type: 'pharma-scene',
    sceneId: 'flows-viz',
    eyebrow: 'What Querygen Does  ·  3 of 3',
    title: 'Things that happen without anyone pressing send',
    subtitle: 'One message from the production floor — by email, Teams, or any channel — and three teams are updated. No forms, no calls, no follow-up chasing.',
    bulletsTitle: 'Other examples',
    bullets: [
      'Shift handover report → production register updated, yield variance sent to plant head — no manual entry',
      'QA batch release → dispatch advice auto-generated, customer notified, COA number logged',
      'Store stock drops below minimum → purchase requisition raised, procurement and planning notified',
    ],
  },
  {
    id: 'case-studies',
    type: 'casegrid',
    title: 'What We\'ve Built',
    subtitle: 'Six case studies you can explore — a sample of what we\'ve shipped. Click any to open the full explainer.',
    cases: [
      {
        name: 'Prime Graphite',
        tag: 'Manufacturing Ops',
        line: 'WhatsApp group → compliance & training dashboard',
        metric: '11 compliance flags surfaced',
        href: '/prime-graphite',
        color: '#1a1a2e',
      },
      {
        name: 'Charu Construction',
        tag: 'Fleet Ops',
        line: 'Dispatch messages → payout dashboard + anomaly detection',
        metric: '38% fuel anomaly caught',
        href: '/charu-constructions-explainer',
        color: '#1E293B',
      },
      {
        name: 'CFPL',
        tag: 'Field Reporting',
        line: 'WhatsApp field reports → live Excel across 20+ cities',
        metric: '0 manual entry, real-time',
        href: '/cfpl-deck',
        color: '#1A5C3A',
      },
      {
        name: 'Nichem Chemicals',
        tag: 'Knowledge Bot',
        line: '240+ SKUs → 24/7 multilingual bot on WhatsApp + website',
        metric: '10+ languages, 0 lead loss',
        href: '/nichem-explainer',
        color: '#0D6E6E',
      },
      {
        name: 'The Wrapping Store',
        tag: 'Sales Pipeline',
        line: '253 WhatsApp conversations → 11-stage tracked pipeline',
        metric: '₹7.75L pipeline made visible',
        href: '/wrapping-store-explainer',
        color: '#4A1942',
      },
      {
        name: 'Laaj Creations',
        tag: 'Order to Dispatch',
        line: 'WhatsApp screenshots → end-to-end order automation',
        metric: '40–80 orders/day, 1 manual step',
        href: '/laaj-explainer',
        color: '#6B1A2B',
      },
    ],
  },
  {
    id: 'thankyou',
    type: 'thankyou',
    title: 'Thank You',
    website: 'querygen.ai',
    phones: ['+91 8879901887', '+91 9970375002'],
  },
];

// ── Main component ────────────────────────────────────────────────────────────

export default function QuerygenUsecases() {
  const [index, setIndex] = useState(0);
  const [showIndex, setShowIndex] = useState(false);
  const reducedMotion = useReducedMotion();
  const slide = SLIDES[index];
  const isFirst = index === 0;
  const isLast = index === SLIDES.length - 1;

  useEffect(() => {
    const onKey = (e) => {
      if (['ArrowRight', 'PageDown'].includes(e.key)) setIndex((p) => Math.min(p + 1, SLIDES.length - 1));
      if (['ArrowLeft', 'PageUp'].includes(e.key)) setIndex((p) => Math.max(p - 1, 0));
      if (e.key === 'Home') setIndex(0);
      if (e.key === 'End') setIndex(SLIDES.length - 1);
      if (e.key === 'Escape') setShowIndex(false);
      if (e.key.toLowerCase() === 'i') setShowIndex((p) => !p);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const prev = document.title;
    document.title = 'Querygen — 100x Your Business Workflows';
    return () => { document.title = prev; };
  }, []);

  function renderSlide() {
    if (slide.type === 'section') return <SectionSlide slide={slide} />;
    if (slide.type === 'whatwedo') return <WhatWeDoSlide reducedMotion={Boolean(reducedMotion)} />;
    if (slide.type === 'casegrid') return <CaseGridSlide slide={slide} />;
    if (slide.type === 'pharma-scene') return <PharmaSceneSlide slide={slide} reducedMotion={Boolean(reducedMotion)} />;
    if (slide.type === 'closing') return <ClosingSlide slide={slide} />;
    if (slide.type === 'thankyou') return <ThankyouSlide slide={slide} />;
    return <StandardSlide slide={slide} />;
  }

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1E1E1E]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Amaranth:wght@700&display=swap');`}</style>

      {/* Mobile notice */}
      <div className="block sm:hidden bg-[#1F1F1F] text-white text-xs text-center px-4 py-2.5 leading-snug">
        Best viewed on a laptop —{' '}
        <button
          className="underline underline-offset-2 opacity-80"
          onClick={() => navigator.clipboard.writeText(window.location.href)}
        >
          copy link
        </button>
      </div>

      {/* Header */}
      <div className="pointer-events-none fixed top-4 left-6 right-16 sm:top-6 sm:left-10 sm:right-24 z-30 flex items-center justify-between">
        <div className="inline-flex items-center gap-2.5 text-sm sm:text-base text-[#26221d] tracking-wide">
          <span
            className="inline-flex items-center justify-center text-[26px] sm:text-[28px] font-bold leading-none text-[#1A8A4A]"
            style={{ fontFamily: "'Amaranth', sans-serif" }}
            aria-hidden="true"
          >
            Q
          </span>
          <span className="font-medium">querygen.ai</span>
        </div>
      </div>

      {/* Slides button */}
      <button
        onClick={() => setShowIndex(true)}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-40 text-sm px-3 py-2 rounded-lg border border-[#D7D0C8] bg-white/80 text-[#2C2C2C] hover:bg-[#F1EEE9] transition-colors"
      >
        Slides
      </button>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-14 sm:py-16 min-h-screen flex flex-col">
        <main className="flex-1 flex items-center">
          <motion.div
            key={index}
            className="w-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {renderSlide()}
          </motion.div>
        </main>

        <footer className="pt-6 flex items-center justify-between">
          <span className="text-xs text-[#9A8E84]">{index + 1} / {SLIDES.length}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setIndex((p) => Math.max(p - 1, 0))}
              disabled={isFirst}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#D7D0C8] text-[#2C2C2C] hover:bg-[#F1EEE9] disabled:opacity-35 transition-colors text-sm"
            >
              <ArrowLeft size={15} /> Previous
            </button>
            <button
              onClick={() => setIndex((p) => Math.min(p + 1, SLIDES.length - 1))}
              disabled={isLast}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1F1F1F] text-white hover:bg-black disabled:opacity-35 transition-colors text-sm"
            >
              Next <ArrowRight size={15} />
            </button>
          </div>
        </footer>
      </div>

      {/* Slide index drawer */}
      {showIndex && (
        <div
          className="fixed inset-0 z-40 bg-black/20 flex justify-end"
          onClick={() => setShowIndex(false)}
        >
          <div
            className="w-64 max-w-[85vw] bg-[#F7F5F2] border-l border-[#D7D0C8] h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#F7F5F2] border-b border-[#DDD6CE] px-4 py-3 flex items-center justify-between">
              <h3 className="text-base font-semibold">Slides</h3>
              <button
                onClick={() => setShowIndex(false)}
                className="text-sm px-2 py-1 rounded border border-[#D7D0C8] hover:bg-[#F1EEE9]"
              >
                ✕
              </button>
            </div>
            <div className="p-3 space-y-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => { setIndex(i); setShowIndex(false); }}
                  className={`w-full text-left px-3 py-3 rounded-xl border transition-colors ${
                    i === index
                      ? 'bg-white border-[#1F1F1F]'
                      : 'bg-[#F7F5F2] border-[#DDD6CE] hover:bg-white'
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-wide text-[#888]">Slide {i + 1}</p>
                  <p className="text-sm font-medium mt-0.5">{s.title}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
