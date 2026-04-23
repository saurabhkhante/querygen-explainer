import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Table2,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const HEADING = 'text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-[#1E1E1E]';
const SUBTEXT = 'mt-3 text-base sm:text-lg leading-relaxed text-[#4A4540]';
const EASE = [0.22, 1, 0.36, 1];

// ── Slide 0: Intro — WhatsApp to Excel ──────────────────────────────────────
function IntroSlide({ reducedMotion }) {
  const msgFields = [
    { label: 'Outlet Name',    value: 'Smart Bazaar' },
    { label: 'City',           value: 'Gaya'         },
    { label: 'Total Footfall', value: '230'           },
    { label: 'Total Trials',   value: '207'           },
    { label: 'Bill Cut',       value: '83'            },
    { label: 'Consumer Sale',  value: '₹ 4,700'      },
  ];

  const excelRows = [
    { outlet: 'Big Bazaar',   city: 'Patna',   footfall: '312', trials: '289', sale: '₹6,200', highlight: false },
    { outlet: 'DMart',        city: 'Lucknow', footfall: '278', trials: '261', sale: '₹5,100', highlight: false },
    { outlet: 'Smart Bazaar', city: 'Gaya',    footfall: '230', trials: '207', sale: '₹4,700', highlight: true  },
    { outlet: 'Annapurna',    city: 'Ranchi',  footfall: '195', trials: '178', sale: '₹3,900', highlight: false },
  ];

  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <h2 className={HEADING}>WhatsApp to Excel Reports</h2>
      </motion.div>

      <div className="mt-8 flex flex-col sm:flex-row items-stretch gap-5">

        {/* Left — WhatsApp message */}
        <motion.div
          className="flex-1 rounded-[26px] border border-[#D6CEC2] bg-white shadow-[0_14px_36px_rgba(44,38,30,0.08)] overflow-hidden"
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 0.55, ease: EASE }}
        >
          {/* WA group bar */}
          <div className="bg-[#075E54] px-5 py-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-sm font-bold text-[#075E54] shrink-0">R</div>
            <div>
              <p className="text-sm font-semibold text-white leading-none">Reports – CFPL</p>
              <p className="text-[10px] text-white/60 mt-0.5">WhatsApp Group · 10 members</p>
            </div>
          </div>

          {/* Chat */}
          <div className="bg-[#ECE5DD] px-4 py-4">
            <p className="text-[9px] font-semibold text-[#1A8A4A] mb-1.5 ml-0.5">~ Dhiraj Kumar</p>
            <div className="bg-white rounded-xl rounded-tl-sm shadow-[0_1px_3px_rgba(0,0,0,0.08)] px-4 py-3.5">
              <p className="text-xs font-bold text-[#1A8A4A] mb-3">Consumer Activation Report</p>
              <div className="space-y-2">
                {msgFields.map((f) => (
                  <div key={f.label} className="flex justify-between gap-4 text-sm">
                    <span className="text-[#7A7068]">{f.label}</span>
                    <span className="font-semibold text-[#1F1F1F]">{f.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-[#9A8E84] text-right mt-3">10:02 AM ✓✓</p>
            </div>
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div
          className="flex sm:flex-col items-center justify-center gap-2 shrink-0 py-2"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.38, duration: 0.45, ease: EASE }}
        >
          <motion.div
            className="text-4xl text-[#1A8A4A] font-bold leading-none select-none"
            animate={reducedMotion ? { opacity: 1 } : { opacity: [0.5, 1, 0.5] }}
            transition={reducedMotion ? { duration: 0.01 } : { duration: 2, repeat: Infinity }}
          >
            →
          </motion.div>
          <p className="text-[10px] font-semibold text-[#1A8A4A] uppercase tracking-widest">
            automatically
          </p>
        </motion.div>

        {/* Right — Excel */}
        <motion.div
          className="flex-1 rounded-[26px] border border-[#B9DEC9] bg-gradient-to-br from-[#F5FCF8] to-[#EAF7EF] shadow-[0_14px_36px_rgba(26,138,74,0.09)] overflow-hidden"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55, duration: 0.55, ease: EASE }}
        >
          {/* Excel header bar */}
          <div className="bg-[#1D6F42] px-5 py-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <Table2 size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-none">MT Report · Apr 2026</p>
              <p className="text-[10px] text-white/60 mt-0.5">Consumer Activation · Updated live</p>
            </div>
          </div>

          {/* Spreadsheet */}
          <div className="p-4">
            <div className="rounded-xl overflow-hidden border border-[#C8E0D2] text-xs">
              <div className="grid grid-cols-5 bg-[#D9F0E5] text-[#2A5A3F] font-bold uppercase tracking-wider text-[10px]">
                {['Outlet', 'City', 'Footfall', 'Trials', 'Sale'].map((col, ci) => (
                  <div key={col} className={`px-3 py-2.5 ${ci < 4 ? 'border-r border-[#C8E0D2]' : ''}`}>{col}</div>
                ))}
              </div>
              {excelRows.map((row, ri) => (
                <motion.div
                  key={ri}
                  className={`grid grid-cols-5 border-t border-[#D4EBDF] ${
                    row.highlight
                      ? 'bg-[#EAF6F0] text-[#1A8A4A] font-semibold'
                      : 'bg-white/70 text-[#2A2520]'
                  }`}
                  animate={row.highlight && !reducedMotion ? { opacity: [0.25, 1, 0.25] } : { opacity: 1 }}
                  transition={row.highlight && !reducedMotion ? { duration: 2.4, delay: 1.2, repeat: Infinity } : {}}
                >
                  <div className="px-3 py-2.5 border-r border-[#D4EBDF]/60">{row.outlet}</div>
                  <div className="px-3 py-2.5 border-r border-[#D4EBDF]/60">{row.city}</div>
                  <div className="px-3 py-2.5 border-r border-[#D4EBDF]/60">{row.footfall}</div>
                  <div className="px-3 py-2.5 border-r border-[#D4EBDF]/60">{row.trials}</div>
                  <div className="px-3 py-2.5">{row.sale}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#1A8A4A]">
              <CheckCircle2 size={12} />
              <span>Row added automatically · 10:02 AM</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// ── Animated connector ───────────────────────────────────────────────────────
function FlowConnector({ reducedMotion, delay = 0 }) {
  return (
    <div className="hidden sm:flex items-center justify-center w-10 shrink-0 self-center">
      <div className="relative w-full h-px bg-[#C8C2BA]/60">
        <motion.span
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#1A8A4A] shadow-[0_0_10px_rgba(26,138,74,0.65)]"
          initial={{ x: -8, opacity: 0 }}
          animate={
            reducedMotion
              ? { x: 14, opacity: 0.9 }
              : { x: [0, 28], opacity: [0, 1, 1, 0] }
          }
          transition={
            reducedMotion
              ? { duration: 0.01 }
              : { duration: 1.6, delay, repeat: Infinity, ease: 'linear' }
          }
        />
      </div>
    </div>
  );
}

// ── Slide 1: Today's flow ────────────────────────────────────────────────────
function TodayFlowSlide({ reducedMotion }) {
  const steps = [
    {
      emoji: '📱',
      title: 'Field TA',
      body: 'Sends a Consumer Activation Report to the WhatsApp group',
    },
    {
      emoji: '💬',
      title: 'WhatsApp Group',
      body: 'Reports – CFPL. Messages from 20+ cities, all day.',
    },
    {
      emoji: '🧑‍💻',
      title: '1 admin reads each one',
      body: 'Opens every message. Types the numbers by hand into Excel.',
    },
    {
      emoji: '📊',
      title: 'Excel files built',
      body: 'MT · SAMT · GT — assembled manually, one row at a time.',
    },
    {
      emoji: '📧',
      title: 'Sent weekly',
      body: 'By the time it arrives, the data is already days old.',
    },
  ];

  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <span className="inline-block text-sm font-semibold uppercase tracking-wider text-[#7A6F5E] bg-[#EDE8E1] px-3.5 py-1.5 rounded-full mb-5">
          Today's process
        </span>
        <h2 className={HEADING}>
          Every outlet. Every city. Every day.
        </h2>
      </motion.div>

      <div className="mt-8 relative rounded-[28px] border border-[#D9D3CC] bg-gradient-to-br from-[#FDFCFA] via-[#F8F4EF] to-[#EEE8DF] p-6">
        <div className="pointer-events-none absolute -top-8 -left-4 w-48 h-48 rounded-full bg-[#E8B84B]/10 blur-3xl" />
        <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2 sm:gap-0">
          {steps.flatMap((step, i) => {
            const items = [
              <motion.div
                key={step.title}
                className="flex-1 rounded-2xl border border-[#D9D3CC] bg-white/90 p-4 flex flex-col items-center text-center gap-2 shadow-[0_2px_8px_rgba(44,38,30,0.06)]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.45, ease: EASE }}
              >
                <span className="text-3xl sm:text-4xl">{step.emoji}</span>
                <p className="text-sm font-bold text-[#1F1F1F] leading-snug">{step.title}</p>
                <p className="text-xs text-[#7A7068] leading-relaxed">{step.body}</p>
              </motion.div>,
            ];
            if (i < steps.length - 1) {
              items.push(
                <FlowConnector key={`conn-${i}`} reducedMotion={reducedMotion} delay={i * 0.3 + 0.2} />
              );
            }
            return items;
          })}
        </div>
      </div>

      <motion.div
        className="mt-5 flex flex-wrap gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
      >
        {[
          { val: '20+', label: 'cities' },
          { val: '1', label: 'admin, full time on this' },
          { val: '7 days', label: 'before you see the numbers' },
        ].map((s) => (
          <div
            key={s.val}
            className="rounded-xl border border-[#D9D3CC] bg-white px-4 py-2 inline-flex items-center gap-2"
          >
            <span className="text-xl font-bold text-[#1A1A1A]">{s.val}</span>
            <span className="text-sm text-[#7A7068]">{s.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

// ── Slide 2: QueryGen in the group ───────────────────────────────────────────
function InTheGroupSlide({ reducedMotion }) {
  const messages = [
    {
      name: '~ Raja',
      lines: ['Consumer Activation Report', 'Type: SAMT · City: Ranchi', 'Outlet: Annapurna Supermart', 'Footfall: 195 · Sale: ₹3,900'],
      time: '09:45',
    },
    {
      name: '~ Dhiraj Kumar',
      lines: ['Consumer Activation Report', 'Type: MT · City: Gaya', 'Outlet: Smart Bazaar', 'Footfall: 230 · Sale: ₹4,700'],
      time: '10:02',
    },
    {
      name: '~ Vikas Kachhap',
      lines: ['Stock Update Report', 'Type: SAMT · City: Ranchi', 'Outlet: Annapurna Supermart', 'Trials: 196 · Sale: ₹3,800'],
      time: '10:14',
    },
  ];

  const points = [
    {
      icon: <MessageSquare size={15} className="text-[#1A8A4A]" />,
      title: 'Reads every message in the group',
      body: 'The moment a TA sends their report, QueryGen sees it. No delay, no queue.',
    },
    {
      icon: <Sparkles size={15} className="text-[#1A8A4A]" />,
      title: 'Extracts the structured data',
      body: 'Outlet, city, footfall, trials, bill cut, sale — pulled out automatically from each message.',
    },
    {
      icon: <Table2 size={15} className="text-[#1A8A4A]" />,
      title: 'Adds a row to your Excel report',
      body: 'MT, SAMT, or GT — routed to the right file, right sheet, right row.',
    },
  ];

  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <span className="inline-block text-sm font-semibold uppercase tracking-wider text-[#1A8A4A] bg-[#E2F5EB] px-3.5 py-1.5 rounded-full mb-5">
          How QueryGen works
        </span>
        <h2 className={HEADING}>
          Querygen joins your WhatsApp group.
        </h2>
        <p className={SUBTEXT}>
          Your team keeps doing exactly what they've always done.
        </p>
      </motion.div>

      <div className="mt-7 flex flex-col sm:flex-row gap-5 items-start">
        {/* WhatsApp group mock */}
        <motion.div
          className="w-full sm:w-64 shrink-0 rounded-[24px] border border-[#D6CEC2] bg-white shadow-[0_16px_40px_rgba(44,38,30,0.10)] overflow-hidden"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55, ease: EASE }}
        >
          {/* WA header */}
          <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-xs font-bold text-[#075E54] shrink-0">
              R
            </div>
            <div>
              <p className="text-xs font-semibold leading-none">Reports – CFPL</p>
              <p className="text-[9px] text-white/60 mt-0.5">Sankesh, Raja, Dhiraj, +8 more</p>
            </div>
          </div>

          {/* Messages */}
          <div className="bg-[#ECE5DD] px-3 py-3 space-y-3">
            {messages.map((msg, i) => (
              <motion.div
                key={msg.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.18, duration: 0.4, ease: EASE }}
              >
                <p className="text-[9px] font-semibold text-[#1A8A4A] ml-1 mb-0.5">{msg.name}</p>
                <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 max-w-[92%] shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                  {msg.lines.map((line, li) => (
                    <p key={li} className={`text-[9px] leading-relaxed ${li === 0 ? 'font-semibold text-[#1A8A4A]' : 'text-[#2A2520]'}`}>
                      {line}
                    </p>
                  ))}
                  <p className="text-[8px] text-[#9A8E84] text-right mt-1">{msg.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* QueryGen row */}
          <motion.div
            className="bg-[#F0FBF5] border-t border-[#C8E8D4] px-4 py-2.5 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          >
            <div className="w-6 h-6 rounded-full bg-[#1A8A4A] flex items-center justify-center shrink-0">
              <Sparkles size={11} className="text-white" />
            </div>
            <p className="text-[10px] font-medium text-[#1A8A4A]">Querygen</p>
            <motion.p
              className="text-[10px] text-[#1A8A4A]/55 ml-auto"
              animate={reducedMotion ? { opacity: 1 } : { opacity: [0.35, 1, 0.35] }}
              transition={reducedMotion ? { duration: 0.01 } : { duration: 1.8, repeat: Infinity }}
            >
              reading…
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Points */}
        <motion.div
          className="flex-1 flex flex-col gap-3"
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45, duration: 0.55, ease: EASE }}
        >
          {points.map((pt) => (
            <div
              key={pt.title}
              className="rounded-2xl border border-[#D9D3CC] bg-white/90 px-5 py-4 flex items-start gap-3.5 shadow-[0_2px_8px_rgba(44,38,30,0.05)]"
            >
              <div className="w-8 h-8 rounded-xl bg-[#EAF6F0] flex items-center justify-center shrink-0">
                {pt.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1F1F1F]">{pt.title}</p>
                <p className="text-xs text-[#7A7068] mt-0.5 leading-relaxed">{pt.body}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Slide 3: Message → structured row ────────────────────────────────────────
function ExtractionSlide({ reducedMotion }) {
  const fields = [
    { label: 'Activity Type', value: 'MT',                 color: 'neutral' },
    { label: 'Date',          value: '16/04/2026',         color: 'neutral' },
    { label: 'TA Names',      value: 'Dhiraj / Pawan',     color: 'neutral' },
    { label: 'Outlet Name',   value: 'Smart Bazaar',       color: 'green'   },
    { label: 'City',          value: 'Gaya',               color: 'green'   },
    { label: 'Total Footfall',value: '230',                color: 'blue'    },
    { label: 'Total Trials',  value: '207',                color: 'blue'    },
    { label: 'Bill Cut',      value: '83',                 color: 'blue'    },
    { label: 'Consumer Sale', value: '₹ 4,700',            color: 'amber'   },
  ];

  const style = {
    green:   { row: 'bg-[#EAF6F0] border-[#C8E8D4]', val: 'text-[#1A8A4A]' },
    blue:    { row: 'bg-[#EBF2FF] border-[#C3D7FF]', val: 'text-[#2563EB]' },
    amber:   { row: 'bg-[#FEF3C7] border-[#FAD98A]', val: 'text-[#B45309]' },
    neutral: { row: 'bg-white border-[#E3DDD5]',     val: 'text-[#2A2520]' },
  };

  const existingRows = [
    { outlet: 'Big Bazaar', city: 'Patna',   footfall: '312', sale: '₹6,200' },
    { outlet: 'DMart',      city: 'Lucknow', footfall: '278', sale: '₹5,100' },
  ];

  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <span className="inline-block text-sm font-semibold uppercase tracking-wider text-[#1A8A4A] bg-[#E2F5EB] px-3.5 py-1.5 rounded-full mb-5">
          What it does with each message
        </span>
        <h2 className={HEADING}>Every message becomes a structured row.</h2>
      </motion.div>

      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left — WA message */}
        <motion.div
          className="rounded-[26px] border border-[#D6CEC2] bg-white/90 px-6 py-5 shadow-[0_14px_30px_rgba(44,38,30,0.07)]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55, ease: EASE }}
        >
          <p className="text-[10px] uppercase tracking-widest text-[#9A8E84] mb-3 flex items-center gap-1.5">
            <MessageSquare size={11} /> WhatsApp message · Reports – CFPL
          </p>
          <p className="text-[11px] font-bold text-[#1A8A4A] mb-3">Consumer Activation Report</p>
          <div className="space-y-1">
            {fields.map((f, i) => {
              const s = style[f.color];
              return (
                <motion.div
                  key={f.label}
                  className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 border ${s.row}`}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.35, ease: EASE }}
                >
                  <span className="text-[10px] text-[#7A7068]">{f.label}</span>
                  <span className={`text-[10px] font-semibold ${s.val}`}>{f.value}</span>
                </motion.div>
              );
            })}
          </div>
          <p className="mt-3 text-[9px] text-[#9A8E84] text-right">Dhiraj Kumar · 10:02 AM · forwarded</p>
        </motion.div>

        {/* Right — Excel row */}
        <motion.div
          className="rounded-[26px] border border-[#B9DEC9] bg-gradient-to-br from-[#F5FCF8] to-[#EAF7EF] px-6 py-5 shadow-[0_14px_30px_rgba(26,138,74,0.09)]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55, ease: EASE }}
        >
          <p className="text-[10px] uppercase tracking-widest text-[#1A8A4A]/70 mb-3 flex items-center gap-1.5">
            <Table2 size={11} /> MT Report · auto-updated
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { label: 'Location', bg: 'bg-[#EAF6F0]', text: 'text-[#1A8A4A]' },
              { label: 'Volume',   bg: 'bg-[#EBF2FF]', text: 'text-[#2563EB]' },
              { label: 'Revenue',  bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]' },
            ].map((l) => (
              <span key={l.label} className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${l.bg} ${l.text}`}>
                {l.label}
              </span>
            ))}
          </div>

          {/* Table */}
          <div className="rounded-xl overflow-hidden border border-[#C8E0D2] text-[9px]">
            {/* Header */}
            <div className="grid grid-cols-4 bg-[#D9F0E5] text-[#2A5A3F] font-semibold uppercase tracking-wider">
              {['Outlet', 'City', 'Footfall', 'Sale'].map((col, ci) => (
                <div key={col} className={`px-2 py-1.5 ${ci < 3 ? 'border-r border-[#C8E0D2]' : ''}`}>
                  {col}
                </div>
              ))}
            </div>
            {/* Existing rows */}
            {existingRows.map((row) => (
              <div key={row.outlet} className="grid grid-cols-4 border-t border-[#D4EBDF] bg-white/70 text-[#2A2520]">
                <div className="px-2 py-1.5 border-r border-[#D4EBDF]/60">{row.outlet}</div>
                <div className="px-2 py-1.5 border-r border-[#D4EBDF]/60">{row.city}</div>
                <div className="px-2 py-1.5 border-r border-[#D4EBDF]/60">{row.footfall}</div>
                <div className="px-2 py-1.5">{row.sale}</div>
              </div>
            ))}
            {/* Animated new row */}
            <motion.div
              className="grid grid-cols-4 border-t border-[#C8E0D2] bg-[#EAF6F0] text-[#1A8A4A] font-semibold"
              animate={reducedMotion ? { opacity: 1 } : { opacity: [0.15, 1, 0.15] }}
              transition={reducedMotion ? { duration: 0.01 } : { duration: 2.4, delay: 1.0, repeat: Infinity }}
            >
              <div className="px-2 py-1.5 border-r border-[#C8E0D2]/60">Smart Bazaar</div>
              <div className="px-2 py-1.5 border-r border-[#C8E0D2]/60">Gaya</div>
              <div className="px-2 py-1.5 border-r border-[#C8E0D2]/60">230</div>
              <div className="px-2 py-1.5">₹4,700</div>
            </motion.div>
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-[10px] text-[#1A8A4A]">
            <CheckCircle2 size={11} />
            <span>Row added · 10:02 AM · from Dhiraj Kumar's message</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Slide 4: Output ───────────────────────────────────────────────────────────
function OutputSlide({ reducedMotion }) {
  const reports = [
    {
      name: 'MT Report',
      type: 'Modern Trade',
      note: 'Smart Bazaar · DMart · Big Bazaar',
      rows: [['Big Bazaar', 'Patna', '312', '₹6,200'], ['DMart', 'Lucknow', '278', '₹5,100']],
      newRow: ['Smart Bazaar', 'Gaya', '230', '₹4,700'],
      wrapCls: 'border-[#B9DEC9] from-[#F5FCF8] to-[#EAF7EF]',
      thCls:   'bg-[#D9F0E5] text-[#2A5A3F] border-[#C8E0D2]',
      tdCls:   'border-[#D4EBDF]/60',
      newCls:  'bg-[#EAF6F0] text-[#1A8A4A] border-[#C8E0D2]/60',
      delay: 0.1,
    },
    {
      name: 'SAMT Report',
      type: 'Self-Assisted Modern Trade',
      note: 'Annapurna Supermart · local chains',
      rows: [['Annapurna', 'Ranchi', '195', '₹3,900'], ['More Store', 'Guwahati', '143', '₹2,800']],
      newRow: ['Easy Day', 'Bhopal', '167', '₹3,300'],
      wrapCls: 'border-[#BAC8DE] from-[#F5F8FC] to-[#EAF0F7]',
      thCls:   'bg-[#D7E5F3] text-[#2A3D5A] border-[#C3D5E8]',
      tdCls:   'border-[#C3D5E8]/50',
      newCls:  'bg-[#EBF2FF] text-[#2563EB] border-[#C3D5E8]/50',
      delay: 0.22,
    },
    {
      name: 'GT Report',
      type: 'General Trade',
      note: 'Kirana & local retail outlets',
      rows: [['Ram Kirana', 'Lucknow', '88', '₹1,600'], ['Gupta Store', 'Bhopal', '72', '₹1,200']],
      newRow: ['Sharma Shop', 'Indore', '94', '₹1,800'],
      wrapCls: 'border-[#D9CBBB] from-[#FBF8F5] to-[#F4EEE8]',
      thCls:   'bg-[#EDE4D8] text-[#4A3826] border-[#DDD1C2]',
      tdCls:   'border-[#DDD1C2]/50',
      newCls:  'bg-[#FEF3C7] text-[#B45309] border-[#DDD1C2]/50',
      delay: 0.34,
    },
  ];

  const cols = ['Outlet', 'City', 'Footfall', 'Sale'];

  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <span className="inline-block text-sm font-semibold uppercase tracking-wider text-[#1A8A4A] bg-[#E2F5EB] px-3.5 py-1.5 rounded-full mb-5">
          What you get
        </span>
        <h2 className={HEADING}>Three reports that update themselves.</h2>
        <p className={SUBTEXT}>
          The same MT, SAMT, and GT structure your team already knows — minus the manual work.
        </p>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {reports.map((r) => (
          <motion.div
            key={r.name}
            className={`rounded-[24px] border bg-gradient-to-br px-5 py-5 shadow-[0_8px_24px_rgba(44,38,30,0.07)] ${r.wrapCls}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: r.delay, duration: 0.5, ease: EASE }}
          >
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-sm font-bold text-[#1E1E1E]">{r.name}</p>
                <p className="text-[10px] text-[#7A7068]">{r.type}</p>
              </div>
              <motion.span
                className="text-[9px] font-bold bg-[#25D366] text-white px-2 py-0.5 rounded-full leading-none"
                animate={reducedMotion ? { opacity: 1 } : { opacity: [0.7, 1, 0.7] }}
                transition={reducedMotion ? { duration: 0.01 } : { duration: 2, repeat: Infinity }}
              >
                LIVE
              </motion.span>
            </div>
            <p className="text-[9px] text-[#9A8E84] mb-3">{r.note}</p>

            <div className={`rounded-xl overflow-hidden border text-[9px] ${r.thCls.split(' ')[2]}`}>
              <div className={`grid grid-cols-4 font-semibold uppercase tracking-wider ${r.thCls}`}>
                {cols.map((col, ci) => (
                  <div key={col} className={`px-1.5 py-1.5 ${ci < cols.length - 1 ? `border-r ${r.thCls.split(' ')[2]}` : ''}`}>
                    {col}
                  </div>
                ))}
              </div>
              {r.rows.map((row, ri) => (
                <div key={ri} className={`grid grid-cols-4 border-t ${r.tdCls} bg-white/70 text-[#2A2520]`}>
                  {row.map((cell, ci) => (
                    <div key={ci} className={`px-1.5 py-1.5 ${ci < row.length - 1 ? `border-r ${r.tdCls}` : ''}`}>
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
              <motion.div
                className={`grid grid-cols-4 border-t font-semibold ${r.newCls}`}
                animate={reducedMotion ? { opacity: 1 } : { opacity: [0.15, 1, 0.15] }}
                transition={reducedMotion ? { duration: 0.01 } : { duration: 2.5, delay: r.delay + 0.8, repeat: Infinity }}
              >
                {r.newRow.map((cell, ci) => (
                  <div key={ci} className={`px-1.5 py-1.5 ${ci < r.newRow.length - 1 ? `border-r ${r.newCls.split(' ')[2]}` : ''}`}>
                    {cell}
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="mt-2.5 flex items-center gap-1 text-[9px] text-[#1A8A4A]">
              <CheckCircle2 size={9} />
              <span>Updates as messages arrive</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-4 text-xs text-[#7A7068]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.4 }}
      >
        Zone-wise, state-wise, and city tabs included. Exactly the structure you're used to.
      </motion.p>
    </section>
  );
}

// ── Main deck ────────────────────────────────────────────────────────────────
const SLIDES = [
  { id: 'intro',      title: 'WhatsApp to Excel Reports',      Component: IntroSlide       },
  { id: 'today',      title: 'How your team reports today',    Component: TodayFlowSlide   },
  { id: 'in-group',   title: 'Querygen joins the group',       Component: InTheGroupSlide  },
  { id: 'extraction', title: 'Message → structured row',       Component: ExtractionSlide  },
  { id: 'output',     title: 'What you get',                   Component: OutputSlide      },
];

export default function CFPLDeck() {
  const [index, setIndex]       = useState(0);
  const [showIndex, setShowIndex] = useState(false);
  const reducedMotion            = useReducedMotion();
  const isFirst = index === 0;
  const isLast  = index === SLIDES.length - 1;
  const { Component } = SLIDES[index];

  useEffect(() => {
    const onKey = (e) => {
      if (['ArrowRight', 'PageDown'].includes(e.key)) setIndex((p) => Math.min(p + 1, SLIDES.length - 1));
      if (['ArrowLeft',  'PageUp'  ].includes(e.key)) setIndex((p) => Math.max(p - 1, 0));
      if (e.key === 'Escape')          setShowIndex(false);
      if (e.key.toLowerCase() === 'i') setShowIndex((p) => !p);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // OG meta tags — only for this page
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'WhatsApp to Excel Reports | Querygen';

    const tags = [
      { property: 'og:type',         content: 'website' },
      { property: 'og:url',          content: 'https://querygen-explainer.vercel.app/cfpl-deck' },
      { property: 'og:title',        content: 'WhatsApp to Excel Reports | Querygen' },
      { property: 'og:description',  content: 'Your field team reports on WhatsApp. Querygen turns every message into a live Excel report — automatically.' },
      { property: 'og:image',        content: 'https://querygen-explainer.vercel.app/og-cfpl.png' },
      { property: 'og:image:width',  content: '1512' },
      { property: 'og:image:height', content: '982' },
      { name: 'twitter:card',        content: 'summary_large_image' },
      { name: 'twitter:title',       content: 'WhatsApp to Excel Reports | Querygen' },
      { name: 'twitter:description', content: 'Your field team reports on WhatsApp. Querygen turns every message into a live Excel report — automatically.' },
      { name: 'twitter:image',       content: 'https://querygen-explainer.vercel.app/og-cfpl.png' },
    ];

    const els = tags.map((t) => {
      const el = document.createElement('meta');
      if (t.property) el.setAttribute('property', t.property);
      if (t.name)     el.setAttribute('name', t.name);
      el.setAttribute('content', t.content);
      document.head.appendChild(el);
      return el;
    });

    return () => {
      document.title = prevTitle;
      els.forEach((el) => document.head.removeChild(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1E1E1E]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amaranth:wght@700&display=swap');
      `}</style>

      {/* Logo */}
      <div className="pointer-events-none fixed top-5 left-6 sm:top-7 sm:left-10 z-30 flex items-center gap-2.5">
        <span className="text-[26px] font-bold leading-none text-[#1A8A4A]" style={{ fontFamily: "'Amaranth', sans-serif" }}>
          Q
        </span>
        <div>
          <p className="text-sm font-medium text-[#26221d] leading-none">querygen.ai</p>
          <p className="text-[10px] text-[#9A8E84] mt-0.5 leading-none">WhatsApp → Excel, automatically</p>
        </div>
      </div>

      {/* Slides button */}
      <button
        onClick={() => setShowIndex(true)}
        className="fixed top-5 right-5 sm:top-7 sm:right-7 z-30 text-sm px-3 py-1.5 rounded-lg border border-[#D7D0C8] bg-white/80 text-[#2C2C2C] hover:bg-[#F1EEE9] transition-colors"
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
            <Component reducedMotion={reducedMotion} />
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
            className="w-64 bg-[#F7F5F2] border-l border-[#D7D0C8] h-full overflow-y-auto"
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
