import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  CalendarClock,
  CheckCircle2,
  ContactRound,
  FileText,
  Globe,
  MessageCircle,
  MessageSquare,
  ScanLine,
  Sparkles,
  Table2,
  Users,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const WORKSHOP_WHATSAPP_NUMBER = '918879901887';
const WORKSHOP_WHATSAPP_MESSAGE =
  'Hi Querygen, I saw the Website WhatsApp Widget example in the workshop. Can we set this up for my business?';
const SLIDE_HEADING_CLASS = 'text-4xl sm:text-5xl font-semibold leading-tight tracking-tight whitespace-nowrap';

const SLIDES = [
  {
    type: 'standard',
    title: 'WhatsApp Automation Workshop',
    subtitle: 'Querygen X How Frameworks',
    bullets: [
      'Practical workflows for MSME teams running daily operations on WhatsApp.',
      'Show-and-tell format focused on usable outputs.',
    ],
  },
  {
    type: 'standard',
    title: 'WhatsApp Workflow Automation for MSME Owners',
    subtitle: 'This session is about practical automation outputs, not technical implementation.',
    bullets: [
      'Most MSMEs already run core work on WhatsApp.',
      'Because work runs in chats, owners lack a clear daily view: invoices, assignments, and pending vs completed work.',
      'Today we focus on workflows you can actually use.',
    ],
  },
  {
    type: 'matrix',
    title: 'What to Automate vs What to Keep Human',
    subtitle: 'Use this first to decide where automation helps most and where human judgment should stay central.',
    quadrants: [
      {
        title: 'Automate now',
        note: 'Set it and forget it',
        examples: [
          'New enquiry -> Sheet row',
          'Payment received reply',
          'Daily stock/admin summary',
        ],
      },
      {
        title: 'Template + human click',
        note: 'Draft, then approve',
        examples: [
          'Custom quotation drafts',
          'Seasonal offer messages',
          'Vendor onboarding docs',
        ],
      },
      {
        title: 'AI-assisted',
        note: 'Pattern + triage support',
        examples: [
          'Sort enquiries by urgency',
          'Follow-up reminder suggestions',
          'Receipt photo -> expense entry',
        ],
      },
      {
        title: 'Keep human',
        note: 'Judgment-heavy work',
        examples: [
          'Price negotiation',
          'Handling angry customers',
          'Credit-term decisions',
        ],
      },
    ],
    axes: {
      xLeft: 'Same every time',
      xRight: 'Different every time',
      yTop: 'Clear inputs/outputs',
      yBottom: 'Messy judgment needed',
    },
  },
  {
    type: 'standard',
    title: 'What MSMEs Already Automate',
    subtitle: 'Most teams already automate repetitive admin and reporting work in small, practical ways.',
    bullets: [
      'Repetitive tasks with fixed steps get automated first.',
      'Human stays in the loop for exceptions and approvals.',
    ],
    flowExamples: [
      {
        title: 'Example 1: New enquiry to owner action',
        steps: [
          { type: 'whatsapp', text: 'New enquiry on WhatsApp' },
          { type: 'sheet', text: 'Auto-create Sheet row' },
          { type: 'task', text: 'Assign owner follow-up' },
        ],
      },
      {
        title: 'Example 2: Invoice details to Google Sheet',
        steps: [
          { type: 'invoice', text: 'Invoice image or PDF' },
          { type: 'extract', text: 'Extract invoice fields' },
          { type: 'sheet', text: 'Append row to Google Sheet' },
        ],
      },
    ],
  },
  {
    type: 'standard',
    title: 'How to Identify Automatable Flows',
    subtitle: 'Automation quality depends on clear process context.',
    bullets: [
      'Write the exact trigger, output, and owner action.',
      'If inputs are clear and repeatable, automation will be reliable.',
      'Use small repeatable examples before scaling automation.',
    ],
    cta: {
      label: 'Free Automation Audit Tool',
      href: 'https://querygen.ai/ai-audit',
    },
  },
  {
    type: 'section',
    title: 'Case Studies',
    subtitle: 'Real MSME workflows already running on Querygen.',
  },
  {
    type: 'standard',
    title: 'Case Study: Charu Construction',
    subtitle: 'Dispatch and fuel details from WhatsApp become structured daily visibility.',
    bullets: [
      'Trip, load, and fuel details are extracted from messages.',
      'Daily dashboard reduces manual reconciliation effort.',
      'Team workflow stays on WhatsApp.',
    ],
    cta: {
      label: 'Open Charu Explainer',
      href: '/charu-constructions-explainer',
    },
  },
  {
    type: 'standard',
    title: 'Case Study: The Wrapping Store',
    subtitle: 'Every conversation becomes a tracked prospect instead of a hidden chat.',
    bullets: [
      'Pipeline stages show where each lead stands.',
      'Stale leads are surfaced before they are lost.',
      'Next-step suggestions reduce guesswork.',
    ],
    cta: {
      label: 'Open Wrapping Store Explainer',
      href: '/wrapping-store-explainer',
    },
  },
  {
    type: 'standard',
    title: 'Case Study: Laaj Creations',
    subtitle: 'Order flow becomes structured from enquiry to dispatch to tracking.',
    bullets: [
      'Catalog and order context stay organized.',
      'Payment and dispatch steps are easier to monitor.',
      'Customers receive clearer status updates.',
    ],
    cta: {
      label: 'Open Laaj Explainer',
      href: '/laaj-explainer',
    },
  },
  {
    type: 'standard',
    title: 'Case Study: Nichem',
    subtitle: 'A context-aware chatbot handles repetitive product/process questions from exhibition, website, and ad traffic.',
    bullets: [
      'Setup is quick: upload product/process context and scrape the website once, then the chatbot is functional.',
      'Chatbot answers common prospect questions with Nichem-specific context.',
      'Useful during exhibition, website, and ad traffic spikes when the team is occupied.',
      'Lead details are captured from conversations for follow-up.',
    ],
    cta: {
      label: 'Open Nichem Explainer',
      href: '/nichem-explainer',
    },
  },
  {
    type: 'section',
    title: 'Low-Hanging Automations to Start With',
    subtitle: 'Practical workflows you can implement quickly.',
  },
  {
    type: 'standard',
    title: '⚡ Business card to Lead',
    subtitle: 'A card photo in WhatsApp can become a usable contact record quickly.',
    bullets: [
      'Useful for events and referrals.',
      'Reduces manual entry and missed leads.',
    ],
  },
  {
    type: 'standard',
    title: '⚡ Invoice and Bill Details to Google Sheet',
    subtitle: 'Forward invoice or receipt images and auto-fill structured expense rows.',
    bullets: [
      'Invoice number, vendor, amount, and date are extracted automatically.',
      'Useful for daily expense tracking and monthly reconciliation.',
      'Cuts copy-paste and reduces missed entries.',
    ],
  },
  {
    type: 'standard',
    title: '⚡ Website WhatsApp Widget',
    subtitle: 'Website visitors can start WhatsApp conversations instantly, even outside business hours.',
    bullets: [
      'Captures intent from ad and website traffic in real time.',
      'Reduces drop-off between interest and first conversation.',
      'Keeps lead capture simple for non-technical teams.',
    ],
  },
  {
    type: 'standard',
    title: '⚡ Follow-ups, Nudges and Scheduled Messages',
    subtitle: 'Reminders and outbound updates run on process, not memory.',
    bullets: [
      'No-response leads trigger timely follow-up nudges.',
      'Scheduled WhatsApp sends handle payment reminders, offers, and updates.',
      'Improves response consistency without manual tracking.',
    ],
  },
  {
    type: 'standard',
    title: '⚡ WhatsApp Group Alerts',
    subtitle: 'Critical messages in internal groups are surfaced before they get buried.',
    bullets: [
      'Flags urgent issues, complaints, and high-priority keywords.',
      'Helps owners respond faster to operational risks.',
      'Improves team accountability on daily actions.',
    ],
  },
  {
    type: 'standard',
    title: 'What Not to Automate Fully',
    subtitle: 'Keep full automation away from relationship and judgment-heavy work.',
    bullets: [
      'Negotiation strategy and exception handling.',
      'Emotion-sensitive customer situations.',
      'Final commercial calls (pricing, credit, risk).',
    ],
  },
  {
    type: 'standard',
    title: 'Common Mistakes to Avoid',
    subtitle: 'Good outcomes come from clear process design, not tool hype.',
    bullets: [
      'Starting with unclear or low-value workflows.',
      'Automating before process steps are stable.',
      'No owner assigned to act on outputs.',
    ],
  },
  {
    type: 'standard',
    title: 'Best First Step + AMA',
    subtitle: 'Pick one workflow and run a 7-day test.',
    bullets: [
      'Define trigger, output, and owner action.',
      'Measure simply: time saved and fewer missed follow-ups.',
      'Then expand to the next workflow.',
    ],
  },
  {
    type: 'thankyou',
    title: 'Thank You',
    toolsHref: 'https://querygen.ai/tools',
    auditHref: 'https://querygen.ai/ai-audit',
    website: 'querygen.ai',
    phones: ['+91 8879901887', '+91 9970375002'],
  },
];

function MatrixSlide({ slide }) {
  const [topLeft, topRight, bottomLeft, bottomRight] = slide.quadrants;
  const bgByIndex = ['bg-[#EAF6F0]', 'bg-[#F8F1E8]', 'bg-[#EAF1FA]', 'bg-[#F8ECEA]'];

  return (
    <section className="w-full">
      <div className="max-w-5xl">
        <h2 className={SLIDE_HEADING_CLASS}>{slide.title}</h2>
        <p className="mt-6 text-xl sm:text-3xl leading-snug text-[#333]">{slide.subtitle}</p>

        <div className="mt-8 sm:mt-10">
          <div
            className="hidden md:grid"
            style={{
              gridTemplateColumns: '240px minmax(0, 1fr)',
              gridTemplateRows: '38px auto',
            }}
          >
            <div />
            <div className="relative px-1">
              <div className="flex items-center justify-between text-sm text-[#555]">
                <span className="whitespace-nowrap">{slide.axes.xLeft}</span>
                <span className="whitespace-nowrap">{slide.axes.xRight}</span>
              </div>
              <div className="absolute left-0 right-0 bottom-0 h-px bg-[#CFC7BE]" />
            </div>

            <div className="relative pr-5">
              <div className="absolute right-0 top-0 bottom-0 w-px bg-[#CFC7BE]" />
              <span className="absolute right-5 top-0 -translate-y-1/2 text-right text-sm text-[#555] whitespace-nowrap">
                {slide.axes.yTop}
              </span>
              <span className="absolute right-5 bottom-0 translate-y-1/2 text-right text-sm text-[#555] whitespace-nowrap">
                {slide.axes.yBottom}
              </span>
            </div>

            <div className="grid grid-cols-2 border border-[#DCD5CC] rounded-2xl overflow-hidden">
              {[topLeft, topRight, bottomLeft, bottomRight].map((q, idx) => (
                <div
                  key={q.title}
                  className={`p-5 sm:p-6 ${bgByIndex[idx]} ${idx < 2 ? 'border-b border-[#DCD5CC]' : ''} ${idx % 2 === 0 ? 'border-r border-[#DCD5CC]' : ''}`}
                >
                  <h3 className="text-2xl sm:text-3xl font-semibold text-[#1F1F1F]">{q.title}</h3>
                  <p className="mt-1 text-base sm:text-lg text-[#4B4B4B]">{q.note}</p>
                  <ul className="mt-3 space-y-2">
                    {q.examples.map((ex) => (
                      <li key={ex} className="text-base sm:text-lg text-[#2B2B2B] flex items-start gap-2">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1E1E1E] shrink-0" />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <div className="flex items-center justify-between text-sm text-[#555] mb-2">
              <span className="whitespace-nowrap">{slide.axes.xLeft}</span>
              <span className="whitespace-nowrap">{slide.axes.xRight}</span>
            </div>
            <div className="h-px bg-[#CFC7BE] mb-3" />
            <div className="grid grid-cols-1 border border-[#DCD5CC] rounded-2xl overflow-hidden">
              {[topLeft, topRight, bottomLeft, bottomRight].map((q, idx) => (
                <div
                  key={q.title}
                  className={`p-5 ${bgByIndex[idx]} ${idx < 3 ? 'border-b border-[#DCD5CC]' : ''}`}
                >
                  <h3 className="text-2xl font-semibold text-[#1F1F1F]">{q.title}</h3>
                  <p className="mt-1 text-base text-[#4B4B4B]">{q.note}</p>
                  <ul className="mt-3 space-y-2">
                    {q.examples.map((ex) => (
                      <li key={ex} className="text-base text-[#2B2B2B] flex items-start gap-2">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1E1E1E] shrink-0" />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-3 text-sm text-[#555]">
              {slide.axes.yTop} {'->'} {slide.axes.yBottom}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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

function SceneStage({ left, center, right, reducedMotion, timingPreset = 'cinematic' }) {
  const speed = timingPreset === 'cinematic' ? 1 : 0.8;
  const stagedTransition = (delay) => ({
    duration: 0.65 * speed,
    delay,
    ease: [0.22, 1, 0.36, 1],
  });

  return (
    <div className="mt-8 sm:mt-10 relative rounded-[30px] border border-[#D9D1C7] overflow-hidden bg-gradient-to-br from-[#FCFBF9] via-[#F6F2EB] to-[#EEE7DD] p-4 sm:p-6">
      <div className="pointer-events-none absolute -top-10 -left-4 w-52 h-52 rounded-full bg-[#1A8A4A]/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-10 w-64 h-64 rounded-full bg-[#E8B84B]/18 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.6),rgba(255,255,255,0)_50%)]" />

      <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-3 md:gap-4 items-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagedTransition(0)}
        >
          {left}
        </motion.div>
        <SceneConnector reducedMotion={reducedMotion} delay={0.1} />
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagedTransition(0.2)}
        >
          {center}
        </motion.div>
        <SceneConnector reducedMotion={reducedMotion} delay={0.45} />
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagedTransition(0.4)}
        >
          {right}
        </motion.div>
      </div>
    </div>
  );
}

function BusinessCardToContactScene({ reducedMotion }) {
  return (
    <SceneStage
      reducedMotion={reducedMotion}
      timingPreset="cinematic"
      left={
        <div className="rounded-3xl border border-[#D6CEC2] bg-white/92 backdrop-blur px-4 py-4 shadow-[0_14px_30px_rgba(44,38,30,0.08)]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#73675B] inline-flex items-center gap-2">
            <MessageSquare size={13} /> WhatsApp
          </p>
          <div className="mt-3 mx-auto w-[168px] h-[256px] rounded-[26px] border-[3px] border-[#151515] bg-[#F6F1E9] shadow-[0_12px_26px_rgba(20,18,14,0.25)] overflow-hidden relative">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-[#292929]" />
            <div className="h-12 bg-[#0E6A59] text-white px-3 pt-4 pb-2 flex items-center text-[10px]">
              <div className="w-5 h-5 rounded-full bg-[#32C46C] mr-2" />
              <div>
                <p className="font-semibold leading-none">Anita Traders</p>
                <p className="opacity-80 text-[9px] mt-0.5">online</p>
              </div>
            </div>
            <div className="p-2.5 space-y-2">
              <div className="ml-auto max-w-[88%] rounded-xl bg-[#DCF8C6] px-2.5 py-2 text-[10px] text-[#263025]">
                Please share your business card.
              </div>
              <div className="max-w-[88%] rounded-xl bg-white border border-[#E3DBCF] p-2">
                <div className="text-[9px] text-[#6A5E50] mb-1">Photo received</div>
                <div className="relative rounded-md border border-[#CFC6B8] bg-gradient-to-br from-[#FFFDF8] to-[#EDE4D8] px-2 py-2 text-[9px] text-[#1D1A16] rotate-[-1.5deg] shadow-[0_7px_14px_rgba(35,30,24,0.18)]">
                  <span className="absolute -top-2 -right-2 text-[12px]">📸</span>
                  <div className="absolute inset-0 rounded-md bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,0.55),rgba(255,255,255,0)_46%)] pointer-events-none" />
                  <p className="font-semibold tracking-wide">ANITA TRADERS</p>
                  <p className="mt-1 text-[#564A3E]">+91 98xxxx 3210</p>
                  <p className="text-[#7A6F63]">Industrial Supplies</p>
                  <p className="text-[#908476] text-[8px] mt-0.5">Captured from camera</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      center={
        <div className="rounded-3xl border border-[#CCE4D6] bg-gradient-to-br from-[#F5FCF8] to-[#EAF7EF] px-4 py-4 shadow-[0_14px_30px_rgba(26,138,74,0.12)] relative overflow-hidden">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#20633C] inline-flex items-center gap-2">
            <ScanLine size={13} /> OCR + Extract
          </p>
          <div className="mt-3 relative rounded-xl border border-[#D8EBDF] bg-white/80 p-2.5">
            <div className="rounded-lg border border-[#D7CEC2] bg-gradient-to-br from-[#FFFBF5] to-[#F2ECE2] px-3 py-3 text-[10px] text-[#2A251F]">
              <p className="font-semibold tracking-wide">ANITA TRADERS</p>
              <p className="mt-1 text-[#5C5043]">+91 98xxxx 3210</p>
              <p className="text-[#7A6F63]">Industrial Supplies</p>
              <p className="text-[#8B8075]">Nagpur</p>
            </div>
            <motion.div
              className="absolute left-2.5 right-2.5 h-7 rounded-md bg-gradient-to-b from-[#1A8A4A]/25 via-[#1A8A4A]/10 to-transparent border border-[#1A8A4A]/35"
              animate={reducedMotion ? { top: 18, opacity: 0.9 } : { top: [18, 86, 18], opacity: [0.4, 0.95, 0.4] }}
              transition={reducedMotion ? { duration: 0.01 } : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <div className="mt-3 space-y-1.5 text-xs text-[#19472C]">
            {['Name -> Anita Traders', 'Phone -> +91 98xxxx 3210', 'Type -> Industrial Supplies'].map((row, idx) => (
              <motion.div
                key={row}
                className="rounded-md bg-white/85 px-2.5 py-1.5 border border-[#D7ECDF]"
                animate={reducedMotion ? { opacity: 1 } : { opacity: [0.35, 1, 0.35] }}
                transition={reducedMotion ? { duration: 0.01 } : { duration: 1.9, delay: idx * 0.24, repeat: Infinity }}
              >
                {row}
              </motion.div>
            ))}
          </div>
        </div>
      }
      right={
        <div className="rounded-3xl border border-[#B9DEC9] bg-gradient-to-br from-[#F2FBF6] to-[#E7F5ED] px-4 py-4 shadow-[0_14px_30px_rgba(26,138,74,0.14)]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#1F6B3E] inline-flex items-center gap-2">
            <Table2 size={13} /> Google Sheet Updated
          </p>
          <div className="mt-3 rounded-lg border border-[#CFE5D8] overflow-hidden bg-white">
            <div className="grid grid-cols-3 text-[10px] bg-[#E8F5EC] text-[#2B5A3A] font-medium">
              <span className="px-2 py-1 border-r border-[#D3EBD9]">Name</span>
              <span className="px-2 py-1 border-r border-[#D3EBD9]">Phone</span>
              <span className="px-2 py-1">Type</span>
            </div>
            <motion.div
              className="grid grid-cols-3 text-[10px] text-[#2B241E] relative"
              animate={reducedMotion ? { opacity: 1 } : { opacity: [0.55, 1, 0.55] }}
              transition={reducedMotion ? { duration: 0.01 } : { duration: 1.8, repeat: Infinity }}
            >
              <span className="px-2 py-1.5 border-r border-t border-[#E6EFE9]">Anita T...</span>
              <span className="px-2 py-1.5 border-r border-t border-[#E6EFE9]">98xxxx...</span>
              <span className="px-2 py-1.5 border-t border-[#E6EFE9]">Supp...</span>
            </motion.div>
            <div className="grid grid-cols-3 text-[10px] text-[#7A7167]">
              <span className="px-2 py-1.5 border-r border-t border-[#EFF5F1]">lorem...</span>
              <span className="px-2 py-1.5 border-r border-t border-[#EFF5F1]">ipsum...</span>
              <span className="px-2 py-1.5 border-t border-[#EFF5F1]">dolor...</span>
            </div>
          </div>
          <div className="mt-2.5 text-xs text-[#20633C] inline-flex items-center gap-1.5">
            <ContactRound size={13} /> Card photo to OCR to sheet row
          </div>
        </div>
      }
    />
  );
}

function InvoiceToSheetScene({ reducedMotion }) {
  return (
    <SceneStage
      reducedMotion={reducedMotion}
      timingPreset="cinematic"
      left={
        <div className="rounded-3xl border border-[#D4CDC2] bg-white px-4 py-4 shadow-[0_14px_28px_rgba(40,34,28,0.1)]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#77695C] inline-flex items-center gap-2">
            <Users size={13} /> Invoice to Google Sheet Group
          </p>
          <div className="mt-3 rounded-2xl border border-[#DDD3C4] bg-[#F6F1E8] overflow-hidden">
            <div className="h-9 bg-[#0E6A59] text-white text-[10px] px-3 flex items-center justify-between">
              <span className="font-medium">Invoice to Google Sheet Group</span>
              <span className="opacity-80">54 members</span>
            </div>
            <div className="p-2.5 space-y-2">
              {[
                { name: 'Ravi', code: 'INV-112', amount: '₹9,071' },
                { name: 'Neha', code: 'BILL-48', amount: '₹2,350' },
                { name: 'Karan', code: 'INV-901', amount: '₹18,440' },
              ].map((msg, idx) => (
                <motion.div
                  key={msg.code}
                  className="rounded-xl bg-white border border-[#E4DBCF] px-2 py-2"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + idx * 0.18, duration: 0.4 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#E5D8C7] text-[9px] text-[#6B5A4A] inline-flex items-center justify-center">
                      {msg.name[0]}
                    </span>
                    <span className="text-[10px] text-[#5F5042]">{msg.name}</span>
                  </div>
                  <div className="mt-1.5 rounded-md border border-[#D8CEBF] bg-gradient-to-br from-[#FFFDF8] to-[#F3ECE1] px-2 py-1.5 text-[9px] text-[#3A3129]">
                    <p className="font-semibold">{msg.code}</p>
                    <p>{msg.amount}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      }
      center={
        <div className="rounded-3xl border border-[#D6CFE4] bg-gradient-to-br from-[#F7F3FF] to-[#EEE6FC] px-4 py-4 shadow-[0_14px_28px_rgba(101,66,187,0.14)] relative overflow-hidden">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#5A3FA8] inline-flex items-center gap-2">
            <Sparkles size={13} /> OCR + AI Extraction
          </p>
          <div className="mt-3 relative rounded-xl border border-[#E2D8F5] bg-white/85 p-2.5">
            <div className="rounded-lg border border-[#DCCFEF] bg-[#FBF9FF] px-2.5 py-2 text-[10px] text-[#3A2F62] leading-relaxed">
              Vendor: Sharma Fuel
              <br />
              Date: 14 Feb 2026
              <br />
              Amount: 9,071
            </div>
            <motion.div
              className="absolute left-2.5 right-2.5 h-6 rounded bg-gradient-to-b from-[#7D59D1]/22 via-[#7D59D1]/9 to-transparent border border-[#7D59D1]/30"
              animate={reducedMotion ? { top: 16, opacity: 0.8 } : { top: [16, 74, 16], opacity: [0.3, 0.9, 0.3] }}
              transition={reducedMotion ? { duration: 0.01 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <div className="mt-3 space-y-1.5 text-xs text-[#34295E]">
            {['Vendor', 'Invoice No', 'Amount', 'Date'].map((row, idx) => (
              <motion.div
                key={row}
                className="h-6 rounded-md bg-white/85 border border-[#E2D8F5] px-2.5 flex items-center"
                animate={reducedMotion ? { opacity: 1 } : { opacity: [0.35, 1, 0.35] }}
                transition={reducedMotion ? { duration: 0.01 } : { duration: 1.6, delay: idx * 0.2, repeat: Infinity }}
              >
                {row} captured
              </motion.div>
            ))}
          </div>
        </div>
      }
      right={
        <div className="rounded-3xl border border-[#B9DEC9] bg-gradient-to-br from-[#F2FBF6] to-[#E7F5ED] px-4 py-4 shadow-[0_14px_28px_rgba(26,138,74,0.16)]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#1F6B3E] inline-flex items-center gap-2">
            <Table2 size={13} /> Google Sheet Updated
          </p>
          <div className="mt-3 rounded-lg border border-[#CFE5D8] overflow-hidden bg-white">
            <div className="grid grid-cols-4 text-[10px] bg-[#E8F5EC] text-[#2B5A3A] font-medium">
              <span className="px-2 py-1 border-r border-[#D3EBD9]">Vendor</span>
              <span className="px-2 py-1 border-r border-[#D3EBD9]">Inv#</span>
              <span className="px-2 py-1 border-r border-[#D3EBD9]">Date</span>
              <span className="px-2 py-1">Amount</span>
            </div>
            {[
              ['Sharma...', '112', '14 Feb', '₹9,071'],
              ['Prakash...', '48', '15 Feb', '₹2,350'],
              ['Kohli...', '901', '15 Feb', '₹18,440'],
            ].map((row, rowIndex) => (
              <motion.div
                key={row.join('-')}
                className="grid grid-cols-4 text-[10px] text-[#2B241E]"
                initial={{ opacity: 0.4, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + rowIndex * 0.18, duration: 0.35 }}
              >
                {row.map((cell, i) => (
                  <span key={cell + i} className={`px-2 py-1.5 border-t border-[#EFF5F1] ${i < 3 ? 'border-r border-[#EFF5F1]' : ''}`}>
                    {cell}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>
          <div className="mt-3 text-xs text-[#20633C] inline-flex items-center gap-1.5">
            <CheckCircle2 size={13} /> Multiple invoices auto-logged from group
          </div>
        </div>
      }
    />
  );
}

function WebsiteWidgetScene({ reducedMotion }) {
  return (
    <div className="mt-8 sm:mt-10 relative rounded-[30px] border border-[#D9D1C7] overflow-hidden bg-gradient-to-br from-[#FCFBF9] via-[#F6F2EB] to-[#EEE7DD] p-4 sm:p-6">
      <div className="pointer-events-none absolute -top-10 -left-4 w-52 h-52 rounded-full bg-[#1A8A4A]/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-10 w-64 h-64 rounded-full bg-[#E8B84B]/18 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.6),rgba(255,255,255,0)_50%)]" />

      <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-center">
        <div className="rounded-3xl border border-[#D6CEC2] bg-white px-4 py-4 shadow-[0_14px_28px_rgba(45,40,32,0.1)] relative overflow-hidden h-[330px]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#746658] inline-flex items-center gap-2">
            <Globe size={13} /> Website
          </p>
          <div className="mt-3 rounded-xl bg-[#F7F2E8] overflow-hidden">
            <div className="h-7 bg-white px-2.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#EA7A69]" />
              <span className="w-2 h-2 rounded-full bg-[#EABF5A]" />
              <span className="w-2 h-2 rounded-full bg-[#6FCB75]" />
            </div>
            <div className="h-[236px] p-2.5 relative">
              <div className="rounded-lg h-full bg-gradient-to-br from-[#F4EFE4] to-[#ECE2D3] overflow-hidden p-3 relative">
                <p className="text-[12px] font-semibold text-[#4E443A]">Manufacturer&apos;s website</p>
                <p className="text-[10px] text-[#7A6F63] mt-1">Product details, catalogs, and enquiries</p>
                <div className="absolute left-3 right-3 bottom-3 h-10 rounded-md bg-[#F8F2E8]" />
              </div>
              <motion.div
                className="absolute right-2.5 bottom-2.5 w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_0_18px_rgba(37,211,102,0.55)]"
                animate={reducedMotion ? { scale: 1 } : { scale: [1, 1.1, 1] }}
                transition={reducedMotion ? { duration: 0.01 } : { duration: 1.8, repeat: Infinity }}
              >
                <MessageCircle size={18} />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="hidden md:block relative w-20 h-px bg-[#B8AB9B]/70">
          <motion.span
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#1A8A4A] shadow-[0_0_18px_rgba(26,138,74,0.75)]"
            initial={{ x: -12, opacity: 0 }}
            animate={reducedMotion ? { x: 30, opacity: 0.9 } : { x: [0, 56], opacity: [0, 1, 1, 0] }}
            transition={reducedMotion ? { duration: 0.01 } : { duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          {!reducedMotion && (
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1A8A4A]/45 to-transparent"
              animate={{ opacity: [0.2, 0.9, 0.2] }}
              transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </div>

        <div className="rounded-3xl border border-[#D6CEC2] bg-white px-3 py-2.5 shadow-[0_14px_28px_rgba(45,40,32,0.1)] h-[330px] flex flex-col">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#746658] inline-flex items-center gap-2">
            <MessageSquare size={13} /> WhatsApp Chat (Business View)
          </p>
          <div className="mt-1.5 mx-auto w-[236px] h-[286px] rounded-[24px] border-[3px] border-[#1F1F1F] bg-[#F1ECE3] overflow-hidden relative shadow-[0_14px_24px_rgba(20,18,14,0.2)]">
            <div className="h-12 bg-[#13755F] text-white px-2.5 pt-2.5 pb-2 flex items-center text-[9px] relative">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-[#2E3B37]/85" />
              <div className="w-5 h-5 rounded-full bg-[#5ED67D] mr-2.5" />
              <div className="leading-tight">
                <p className="font-semibold text-[8.8px]">Potential Lead</p>
                <p className="opacity-90 text-[7.9px] mt-0.5">online</p>
              </div>
            </div>
            <div className="p-2.5 space-y-2.5">
              <div className="mx-auto w-fit text-[7px] px-2 py-0.5 rounded-full bg-[#DDE8CF] text-[#5D6A54]">
                Today
              </div>
              <motion.div
                className="max-w-[88%] rounded-[14px] bg-white border border-[#E0D5C7] px-2.5 py-1.5 text-[8.7px] text-[#2E2721] shadow-[0_1px_0_rgba(0,0,0,0.04)]"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.35 }}
              >
                Hi, can you share product pricing?
              </motion.div>
              <motion.div
                className="ml-auto max-w-[86%] rounded-[14px] bg-[#CFF0BA] px-2.5 py-1.5 text-[8.7px] text-[#2A3327]"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.35 }}
              >
                Yes, sending details now.
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FollowupNudgesScene({ reducedMotion }) {
  return (
    <div className="mt-8 sm:mt-10 rounded-[30px] border border-[#D9D1C7] bg-gradient-to-br from-[#FCFBF9] via-[#F6F2EB] to-[#EEE7DD] p-5 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="rounded-3xl border border-[#D6CEC2] bg-white px-4 py-4 shadow-[0_14px_28px_rgba(45,40,32,0.1)]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#746658] inline-flex items-center gap-2">
            <CalendarClock size={13} /> Scheduler
          </p>
          <div className="mt-3 rounded-2xl border border-[#E2D8CB] bg-[#F6F1E8] p-3 space-y-2">
            <div className="rounded-lg bg-white border border-[#E5DBCF] px-2.5 py-1.5 text-[10px] text-[#2E2721]">
              Follow-up Rule: New lead pending
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-white border border-[#E5DBCF] px-2 py-1.5 text-[10px] text-[#2E2721]">
                Day 2: Reminder
              </div>
              <div className="rounded-lg bg-white border border-[#E5DBCF] px-2 py-1.5 text-[10px] text-[#2E2721]">
                10:00 AM
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#DCF8C6] text-[#2A3A27] text-[10px] px-2.5 py-1">
              <CheckCircle2 size={11} /> Schedule active
            </div>
          </div>
        </div>

        <div className="hidden md:block relative w-20 h-px bg-[#B8AB9B]/70">
          <motion.span
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#1A8A4A] shadow-[0_0_18px_rgba(26,138,74,0.75)]"
            initial={{ x: -12, opacity: 0 }}
            animate={reducedMotion ? { x: 30, opacity: 0.9 } : { x: [0, 56], opacity: [0, 1, 1, 0] }}
            transition={reducedMotion ? { duration: 0.01 } : { duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="rounded-3xl border border-[#D6CEC2] bg-white px-4 py-4 shadow-[0_14px_28px_rgba(45,40,32,0.1)] w-full max-w-[380px]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#746658] inline-flex items-center gap-2">
            <MessageSquare size={13} /> Scheduled WhatsApp Message
          </p>
          <div className="mt-3 mx-auto w-[220px] h-[286px] rounded-[24px] border-[3px] border-[#1F1F1F] bg-[#F1ECE3] overflow-hidden relative shadow-[0_14px_24px_rgba(20,18,14,0.2)]">
            <div className="h-12 bg-[#13755F] text-white px-2.5 pt-2.5 pb-2 flex items-center text-[9px] relative">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-[#2E3B37]/85" />
              <div className="w-5 h-5 rounded-full bg-[#5ED67D] mr-2.5" />
              <div className="leading-tight">
                <p className="font-semibold text-[8.8px]">Potential Lead</p>
                <p className="opacity-90 text-[7.9px] mt-0.5">online</p>
              </div>
            </div>
            <div className="p-2.5 space-y-2.5">
              <motion.div
                className="inline-flex items-center gap-1.5 text-[8.5px] px-2 py-1 rounded-full bg-[#ECF5EE] text-[#356749]"
                animate={reducedMotion ? { opacity: 1 } : { opacity: [0.75, 1, 0.75] }}
                transition={reducedMotion ? { duration: 0.01 } : { duration: 1.8, repeat: Infinity }}
              >
                <CalendarClock size={11} />
                Scheduled for 10:00 AM
              </motion.div>
              <motion.div
                className="ml-auto max-w-[90%] rounded-[14px] bg-[#CFF0BA] px-2.5 py-1.5 text-[8.7px] text-[#2A3327]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.35 }}
              >
                Hi! Following up on your enquiry. Need any help?
              </motion.div>
              <div className="text-[8px] text-[#6B7D70]">Sent automatically at 10:00 AM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GroupAlertsScene({ reducedMotion }) {
  return (
    <SceneStage
      reducedMotion={reducedMotion}
      timingPreset="cinematic"
      left={
        <div className="rounded-3xl border border-[#D6CEC2] bg-white px-4 py-4 shadow-[0_14px_28px_rgba(45,40,32,0.1)]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#746658] inline-flex items-center gap-2">
            <Users size={13} /> WhatsApp Group
          </p>
          <div className="mt-3 mx-auto w-[208px] h-[280px] rounded-[24px] border-[3px] border-[#1F1F1F] bg-[#F1ECE3] overflow-hidden relative shadow-[0_14px_24px_rgba(20,18,14,0.2)]">
            <div className="h-12 bg-[#13755F] text-white px-2.5 pt-2.5 pb-2 flex items-center text-[9px] relative">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-[#2E3B37]/85" />
              <div className="w-5 h-5 rounded-full bg-[#5ED67D] mr-2.5" />
              <div className="leading-tight">
                <p className="font-semibold text-[8.8px]">Ops Group</p>
                <p className="opacity-90 text-[7.9px] mt-0.5">28 participants</p>
              </div>
            </div>
            <div className="p-2.5 space-y-1.5 text-[8.8px]">
              <div className="rounded-[12px] bg-white border border-[#E0D5C7] px-2 py-1.5 text-[#574B3F] w-fit max-w-[88%]">Update shared by Rahul</div>
              <div className="rounded-[12px] bg-white border border-[#E0D5C7] px-2 py-1.5 text-[#574B3F] w-fit max-w-[88%]">Material reached site</div>
              <div className="rounded-[12px] bg-white border border-[#E0D5C7] px-2 py-1.5 text-[#574B3F] w-fit max-w-[88%]">Payment screenshot posted</div>
              <motion.div
                className="rounded-[12px] px-2 py-1.5 bg-[#FCEAE7] border border-[#F3C8BF] text-[#8A2618] font-medium w-fit max-w-[92%]"
                animate={reducedMotion ? { opacity: 1 } : { opacity: [0.55, 1, 0.55] }}
                transition={reducedMotion ? { duration: 0.01 } : { duration: 1.4, repeat: Infinity }}
              >
                IMPORTANT MESSAGE: Dispatch delay at Nagpur site
              </motion.div>
              <div className="rounded-[12px] bg-white border border-[#E0D5C7] px-2 py-1.5 text-[#574B3F] w-fit max-w-[88%]">Tomorrow loading plan sent</div>
            </div>
          </div>
        </div>
      }
      center={
        <div className="rounded-3xl border border-[#E2D4BD] bg-gradient-to-br from-[#FFF9F0] to-[#F9EED7] px-4 py-4 shadow-[0_14px_28px_rgba(200,138,16,0.16)] text-center">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#866014] inline-flex items-center gap-2">
            <Sparkles size={13} /> Alerting Engine
          </p>
          <motion.div
            className="mt-3 mx-auto w-12 h-12 rounded-full bg-white/90 border border-[#F1DFC0] flex items-center justify-center text-[#A76E10]"
            animate={reducedMotion ? { rotate: 0 } : { rotate: [0, 8, -8, 0] }}
            transition={reducedMotion ? { duration: 0.01 } : { duration: 1.6, repeat: Infinity }}
          >
            <BellRing size={19} />
          </motion.div>
          <p className="mt-2 text-[10px] text-[#8B6E38]">Filters noise, picks important message</p>
        </div>
      }
      right={
        <div className="rounded-3xl border border-[#B9DEC9] bg-gradient-to-br from-[#F2FBF6] to-[#E8F6EE] px-4 py-4 shadow-[0_14px_28px_rgba(26,138,74,0.16)]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#1F6B3E] inline-flex items-center gap-2">
            <MessageCircle size={13} /> Important Message
          </p>
          <motion.div
            className="mt-3 rounded-lg bg-white border border-[#D0E9DA] px-2.5 py-2 text-[11px] text-[#24553A]"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.45 }}
          >
            IMPORTANT MESSAGE: Dispatch delay at Nagpur site
          </motion.div>
          <div className="mt-2 text-[10px] text-[#2B6B47]">Sent to you instantly</div>
        </div>
      }
    />
  );
}

const LOW_HANGING_SCENES = [
  {
    id: 'business-card-to-contact',
    title: '⚡ Business card to Lead',
    subtitleMode: 'one-line',
    component: BusinessCardToContactScene,
    timingPreset: 'cinematic',
  },
  {
    id: 'invoice-to-sheet',
    title: '⚡ Invoice and Bill Details to Google Sheet',
    subtitleMode: 'one-line',
    component: InvoiceToSheetScene,
    timingPreset: 'cinematic',
  },
  {
    id: 'website-widget',
    title: '⚡ Website WhatsApp Widget',
    subtitleMode: 'one-line',
    component: WebsiteWidgetScene,
    timingPreset: 'cinematic',
  },
  {
    id: 'followup-nudges',
    title: '⚡ Follow-ups, Nudges and Scheduled Messages',
    subtitleMode: 'one-line',
    component: FollowupNudgesScene,
    timingPreset: 'cinematic',
  },
  {
    id: 'group-alerts',
    title: '⚡ WhatsApp Group Alerts',
    subtitleMode: 'one-line',
    component: GroupAlertsScene,
    timingPreset: 'cinematic',
  },
];

function LowHangingSceneRenderer({ title }) {
  const reducedMotion = useReducedMotion();
  const scene = LOW_HANGING_SCENES.find((item) => item.title === title);
  if (!scene) return null;
  const SceneComponent = scene.component;
  return <SceneComponent reducedMotion={Boolean(reducedMotion)} timingPreset={scene.timingPreset} />;
}

function StandardSlide({ slide }) {
  const isLowHangingSlide = slide.title.startsWith('⚡');

  const getStepStyle = (type) => {
    if (type === 'whatsapp') {
      return {
        badge: 'WhatsApp',
        card: 'border-[#A7F3D0] bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7]',
        badgeBg: 'bg-[#16A34A]/15 text-[#166534]',
        Icon: MessageSquare,
      };
    }
    if (type === 'sheet') {
      return {
        badge: 'Google Sheet',
        card: 'border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE]',
        badgeBg: 'bg-[#2563EB]/15 text-[#1D4ED8]',
        Icon: Table2,
      };
    }
    if (type === 'invoice') {
      return {
        badge: 'Invoice',
        card: 'border-[#FED7AA] bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5]',
        badgeBg: 'bg-[#C2410C]/15 text-[#9A3412]',
        Icon: FileText,
      };
    }
    if (type === 'extract') {
      return {
        badge: 'Extract',
        card: 'border-[#DDD6FE] bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE]',
        badgeBg: 'bg-[#7C3AED]/15 text-[#6D28D9]',
        Icon: Sparkles,
      };
    }
    return {
      badge: 'Step',
      card: 'border-[#D7D0C8] bg-white',
      badgeBg: 'bg-[#444]/10 text-[#333]',
      Icon: CheckCircle2,
    };
  };

  return (
    <section className="w-full">
      <div className="max-w-5xl">
        {slide.type === 'thankyou' ? (
          <div className="min-h-[62vh] flex flex-col justify-center">
            <h2 className={SLIDE_HEADING_CLASS}>{slide.title}</h2>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={slide.toolsHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm sm:text-base font-medium bg-[#1A8A4A] text-white hover:bg-[#156F3B] transition-colors"
              >
                Open Free Tools
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={slide.auditHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm sm:text-base font-medium border border-[#1A8A4A] text-[#1A8A4A] hover:bg-[#EFF9F2] transition-colors"
              >
                Open AI Audit
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="mt-8 rounded-2xl border border-[#D7D0C8] bg-white/80 p-4 sm:p-5 max-w-3xl">
              <p className="text-sm sm:text-base text-[#2B2B2B]">
                Website: <a href={`https://${slide.website}`} target="_blank" rel="noreferrer" className="text-[#1A8A4A] font-medium hover:underline">{slide.website}</a>
              </p>
              <p className="mt-2 text-sm sm:text-base text-[#2B2B2B]">
                Call us: <a href="tel:+918879901887" className="text-[#1A8A4A] font-medium hover:underline">{slide.phones[0]}</a> / <a href="tel:+919970375002" className="text-[#1A8A4A] font-medium hover:underline">{slide.phones[1]}</a>
              </p>
            </div>
          </div>
        ) : slide.type === 'section' ? (
          <div className="min-h-[62vh] flex flex-col items-center justify-center text-center">
            <h2 className={SLIDE_HEADING_CLASS}>{slide.title}</h2>
            <p className="mt-6 text-xl sm:text-3xl leading-snug text-[#333]">{slide.subtitle}</p>
          </div>
        ) : slide.title === 'WhatsApp Automation Workshop' ? (
          <div className="min-h-[62vh] flex flex-col items-center justify-center text-center">
            <h2 className={SLIDE_HEADING_CLASS}>{slide.title}</h2>
            <p className="mt-6 text-xl sm:text-4xl leading-snug text-[#333]">{slide.subtitle}</p>
          </div>
        ) : (
          <>
            <h2 className={SLIDE_HEADING_CLASS}>{slide.title}</h2>
            <p className="mt-6 text-xl sm:text-3xl leading-snug text-[#333]">{slide.subtitle}</p>

            {isLowHangingSlide ? (
              <LowHangingSceneRenderer title={slide.title} />
            ) : (
              <ul className="mt-10 sm:mt-12 space-y-4 sm:space-y-5 max-w-4xl">
                {slide.bullets.map((bullet) => (
                  <li key={bullet} className="text-lg sm:text-2xl leading-relaxed text-[#2B2B2B] flex items-start gap-3">
                    <span className="mt-3 w-2 h-2 rounded-full bg-[#1E1E1E] shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {slide.flowExamples && (
              <div className="mt-8 sm:mt-10">
                <div className="space-y-5">
                  {slide.flowExamples.map((flow) => (
                    <div key={flow.title}>
                      <p className="text-sm sm:text-base text-[#666] mb-2">{flow.title}</p>
                      <div className="rounded-2xl border border-[#D7D0C8] bg-gradient-to-r from-white/90 to-[#F8F6F3] p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-stretch gap-2 sm:gap-3 max-w-5xl">
                        {flow.steps.map((step, idx) => {
                          const style = getStepStyle(step.type);
                          const Icon = style.Icon;
                          return (
                            <div key={step.text} className="flex items-center gap-2 sm:gap-3 sm:flex-1">
                              <div className={`px-4 py-3 rounded-xl border shadow-sm ${style.card} min-w-[230px] sm:min-w-0 sm:w-full`}>
                                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wide mb-1.5 font-medium ${style.badgeBg}`}>
                                  <Icon size={12} />
                                  {style.badge}
                                </span>
                                <div className="text-sm sm:text-base text-[#2C2C2C]">{step.text}</div>
                              </div>
                              {idx < flow.steps.length - 1 && (
                                <div className="hidden sm:flex items-center gap-1 w-10">
                                  <div className="h-px flex-1 bg-[#BFAFA0]" />
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#8A7C70]" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {slide.cta && (
              <div className="mt-8">
                <a
                  href={slide.cta.href}
                  onClick={(e) => {
                    if (slide.cta.pending) e.preventDefault();
                  }}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm sm:text-base font-medium transition-colors ${
                    slide.cta.pending
                      ? 'bg-[#D1CBC4] text-[#5F5A54] cursor-not-allowed'
                      : 'bg-[#1A8A4A] text-white hover:bg-[#156F3B]'
                  }`}
                >
                  {slide.cta.label}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default function MSMEAutomationSessionDeck() {
  const [index, setIndex] = useState(0);
  const [showIndex, setShowIndex] = useState(false);
  const slide = SLIDES[index];
  const isFirst = index === 0;
  const isLast = index === SLIDES.length - 1;
  const showWorkshopWhatsAppCta = slide.title === '⚡ Website WhatsApp Widget';
  const workshopWhatsAppHref = `https://wa.me/${WORKSHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent(WORKSHOP_WHATSAPP_MESSAGE)}`;

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') setIndex((prev) => Math.min(prev + 1, SLIDES.length - 1));
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') setIndex((prev) => Math.max(prev - 1, 0));
      if (e.key.toLowerCase() === 'home') setIndex(0);
      if (e.key.toLowerCase() === 'end') setIndex(SLIDES.length - 1);
      if (e.key.toLowerCase() === 'i') setShowIndex((prev) => !prev);
      if (e.key === 'Escape') setShowIndex(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1E1E1E]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Amaranth:wght@700&display=swap');
          @keyframes qgMoveX {
            0% { transform: translate(-14px, -50%); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translate(40px, -50%); opacity: 0; }
          }
          @keyframes qgFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          @keyframes qgPulseSoft {
            0%, 100% { box-shadow: 0 8px 20px rgba(28, 24, 20, 0.05); }
            50% { box-shadow: 0 10px 24px rgba(26, 138, 74, 0.18); }
          }
          @keyframes qgRise {
            0%, 100% { transform: translateY(0px); }
            40% { transform: translateY(-4px); }
          }
          @keyframes qgSweep {
            0%, 100% { transform: translateX(-60%); opacity: 0.25; }
            50% { transform: translateX(60%); opacity: 1; }
          }
          @keyframes qgPulseGlow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.45); transform: scale(1); }
            60% { box-shadow: 0 0 0 9px rgba(37, 211, 102, 0); transform: scale(1.04); }
          }
          @keyframes qgPop {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            45% { transform: scale(1.05); opacity: 1; }
          }
          @keyframes qgAlert {
            0%, 100% { background-color: #FCEBE7; }
            50% { background-color: #FAD5CD; }
          }
          @keyframes qgShake {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-10deg); }
            50% { transform: rotate(9deg); }
            75% { transform: rotate(-8deg); }
          }
        `}
      </style>
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10 sm:py-14 min-h-screen flex flex-col relative">
        <div className="pointer-events-none absolute top-4 left-6 right-6 sm:top-6 sm:left-10 sm:right-10 z-30 flex items-center justify-between">
          <div className="inline-flex items-center gap-2.5 text-sm sm:text-base text-[#26221d] tracking-wide">
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center text-[26px] sm:text-[28px] font-bold leading-none text-[#1A8A4A]"
              style={{ fontFamily: "'Amaranth', sans-serif" }}
            >
              Q
            </span>
            <span className="font-medium">querygen.ai</span>
          </div>
          <div className="inline-flex items-center">
            <img
              src="/howframeworks-logo.svg"
              alt="How Frameworks logo"
              className="h-6 sm:h-7 w-auto object-contain"
            />
          </div>
        </div>

        <main className="flex-1 flex items-center">
          {slide.type === 'matrix' ? <MatrixSlide slide={slide} /> : <StandardSlide slide={slide} />}
        </main>

        <footer className="pt-6 flex items-center justify-end">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
              disabled={isFirst}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#D7D0C8] text-[#2C2C2C] hover:bg-[#F1EEE9] disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            <button
              onClick={() => setIndex((prev) => Math.min(prev + 1, SLIDES.length - 1))}
              disabled={isLast}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1F1F1F] text-white hover:bg-black disabled:opacity-40 disabled:hover:bg-[#1F1F1F] transition-colors"
            >
              Next
              <ArrowRight size={16} />
            </button>
          </div>
        </footer>
      </div>

      <button
        onClick={() => setShowIndex(true)}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-30 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#D7D0C8] bg-white text-[#2C2C2C] hover:bg-[#F1EEE9] transition-colors text-sm"
      >
        Slides
      </button>

      {showIndex && (
        <div className="fixed inset-0 z-40 bg-black/20 flex justify-end" role="dialog" aria-modal="true">
          <div className="w-full max-w-md bg-[#F7F5F2] border-l border-[#D7D0C8] h-full overflow-y-auto">
            <div className="sticky top-0 bg-[#F7F5F2] border-b border-[#DDD6CE] px-5 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#1E1E1E]">Slide Index</h3>
              <button
                onClick={() => setShowIndex(false)}
                className="px-3 py-1.5 rounded-md border border-[#D7D0C8] text-sm hover:bg-[#F1EEE9] transition-colors"
              >
                Close
              </button>
            </div>

            <div className="p-3">
              {SLIDES.map((item, idx) => (
                <button
                  key={item.title}
                  onClick={() => {
                    setIndex(idx);
                    setShowIndex(false);
                  }}
                  className={`w-full text-left px-3 py-3 rounded-lg mb-2 border transition-colors ${
                    idx === index
                      ? 'bg-white border-[#1F1F1F] text-[#1F1F1F]'
                      : 'bg-[#F7F5F2] border-[#DDD6CE] text-[#3A3A3A] hover:bg-white'
                  }`}
                >
                  <p className="text-xs uppercase tracking-wide text-[#666]">Slide {idx + 1}</p>
                  <p className="text-sm font-medium mt-0.5">{item.title}</p>
                </button>
              ))}
            </div>
          </div>
          <button
            aria-label="Close slide index"
            onClick={() => setShowIndex(false)}
            className="flex-1"
          />
        </div>
      )}

      {showWorkshopWhatsAppCta && (
        <a
          href={workshopWhatsAppHref}
          target="_blank"
          rel="noreferrer"
          aria-label="Open WhatsApp chat"
          className="fixed right-5 bottom-5 sm:right-8 sm:bottom-7 z-30 w-16 h-16 rounded-full bg-[#25D366] text-white border-2 border-white shadow-[0_14px_34px_rgba(37,211,102,0.45),0_6px_14px_rgba(0,0,0,0.2)] hover:brightness-95 hover:scale-105 transition-all flex items-center justify-center"
          title="Chat on WhatsApp"
        >
          <span className="absolute inset-0 rounded-full ring-4 ring-[#25D366]/25 pointer-events-none" />
          <MessageCircle size={28} strokeWidth={2.2} />
        </a>
      )}
    </div>
  );
}
