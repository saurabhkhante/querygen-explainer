import { useState } from 'react';
import { Check, ChevronRight, Info, Loader } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

// ── Constants ──────────────────────────────────────────────────

const CONNECTED_PHONE = '+91 98765 43210';

const STEP_LABELS = [
  'Connect WhatsApp',
  'Set Trigger',
  'Write Reply',
  'Capture Info',
  'Follow-up',
  'Google Sheets',
];

const TRIGGER_CHIPS = [
  'pricing, availability, placing an order',
  'product enquiry, how much does it cost',
  'fee structure, admission, enrollment',
  'appointment booking, availability, service rates',
  'bulk order, wholesale price, stock availability',
];

const REPLY_TEMPLATES = [
  {
    label: 'Friendly acknowledgment',
    preview: "Hi! Thanks for reaching out 🙏 We've received your message and will get back to you within 2 hours with all the details.",
    full: "Hi! Thanks for reaching out 🙏 We've received your message and will get back to you within 2 hours with all the details.",
  },
  {
    label: 'With catalog offer',
    preview: "Hi! Thanks for your interest 😊 We'll send you full details shortly. Meanwhile, feel free to check our catalog above. We usually respond within 2 hours!",
    full: "Hi! Thanks for your interest 😊 We'll send you full details shortly. Meanwhile, feel free to check our catalog above. We usually respond within 2 hours!",
  },
  {
    label: 'Service business',
    preview: "Hi! Thanks for reaching out. We've noted your enquiry and will share pricing/availability within 2 hours. Please share your requirements so we can give you an accurate quote!",
    full: "Hi! Thanks for reaching out. We've noted your enquiry and will share pricing/availability within 2 hours. Please share your requirements so we can give you an accurate quote!",
  },
];

const CAPTURE_FIELDS = [
  { key: 'name',         label: 'Customer name',       description: 'The name of the person messaging you',           default: true  },
  { key: 'whatTheyWant', label: 'What they want',       description: "The product or service they're asking about",    default: true  },
  { key: 'budget',       label: 'Their budget',         description: "How much they're willing to spend",              default: true  },
  { key: 'dateNeeded',   label: 'Date they need it by', description: 'When they need the product or service',          default: false },
  { key: 'phoneNumber',  label: 'Their phone number',   description: 'Their contact number (if shared)',               default: false },
  { key: 'location',     label: 'Location',             description: 'Where they\'re located or need delivery',        default: true  },
  { key: 'quantity',     label: 'Quantity',             description: 'How many units or how much they need',           default: false },
];

const FOLLOWUP_TIMINGS = [
  '1 day later',
  '2 days later',
  '3 days later',
  '5 days later',
  '1 week later',
];

// ── Toggle pill component ──────────────────────────────────────

function Toggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${on ? 'bg-[#25D366]' : 'bg-gray-200'}`}
      aria-label="Toggle"
    >
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

// ── Step Indicator ─────────────────────────────────────────────

function StepIndicator({ currentStep, completedSteps }) {
  return (
    <div className="px-4 pt-5 pb-4 border-b border-gray-100">
      <div className="flex items-start justify-between">
        {STEP_LABELS.map((label, i) => {
          const stepNum = i + 1;
          const isCompleted = completedSteps.includes(stepNum);
          const isActive = currentStep === stepNum;
          const isInactive = !isCompleted && !isActive;

          return (
            <div key={stepNum} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                  ${isCompleted ? 'bg-[#4CAF50] text-white' : ''}
                  ${isActive    ? 'bg-[#25D366] text-white' : ''}
                  ${isInactive  ? 'bg-gray-200 text-gray-400' : ''}
                `}>
                  {isCompleted ? <Check size={14} strokeWidth={3} /> : stepNum}
                </div>
                <span className={`text-[8px] mt-1 font-medium text-center leading-tight max-w-[46px] hidden sm:block
                  ${isActive    ? 'text-[#25D366]' : ''}
                  ${isCompleted ? 'text-[#4CAF50]' : ''}
                  ${isInactive  ? 'text-gray-400'  : ''}
                `}>
                  {label}
                </span>
              </div>
              {i < 5 && (
                <div className="flex-1 h-0.5 mx-1 mt-[-8px] sm:mt-[-12px]">
                  <div className={`h-full rounded-full ${isCompleted ? 'bg-[#4CAF50]' : 'bg-gray-200'}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Step 1: Connect WhatsApp ───────────────────────────────────

function Step1ConnectWhatsApp({ connected, phone, onScan, onNext }) {
  if (connected) {
    return (
      <div className="text-center py-4">
        <div className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center mx-auto mb-4">
          <Check size={32} strokeWidth={3} className="text-white" />
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">WhatsApp Connected!</h2>
        <p className="text-sm text-gray-500 mb-1">Connected number</p>
        <p className="text-base font-semibold text-gray-800 mb-6">{phone}</p>
        <button
          onClick={onNext}
          className="w-full py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5a] transition-colors flex items-center justify-center gap-2"
        >
          Next: Set Trigger <ChevronRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-2">
      <div className="flex items-center gap-2 justify-center mb-1">
        <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
        <h2 className="text-lg font-bold text-gray-900">Connect your WhatsApp</h2>
      </div>
      <p className="text-sm text-gray-500 mb-6">Scan this QR code with your WhatsApp app to link it</p>

      <div className="inline-block bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-sm mb-5">
        <QRCodeSVG value="https://web.whatsapp.com/" size={180} level="H" includeMargin={false} />
      </div>

      <div className="text-xs text-gray-400 mb-6 space-y-1">
        <p>Open WhatsApp → tap ⋮ (3 dots) → <strong>Linked Devices</strong></p>
        <p>Tap <strong>"Link a Device"</strong> → scan this QR code</p>
      </div>

      <button
        onClick={onScan}
        className="w-full py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5a] transition-colors"
      >
        I've scanned it ✓
      </button>
    </div>
  );
}

// ── Step 2: Set Trigger ────────────────────────────────────────

function Step2SetTrigger({ triggerText, setTriggerText, onNext }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
        <h2 className="text-base font-bold text-gray-900">When should the auto-reply kick in?</h2>
      </div>
      <p className="text-sm text-gray-500 mb-5 ml-10">
        Describe in plain English what kind of messages should trigger the auto-reply. Our AI will understand.
      </p>

      <label className="block text-sm font-semibold text-gray-700 mb-2">When a customer asks about...</label>
      <textarea
        rows={3}
        value={triggerText}
        onChange={e => setTriggerText(e.target.value)}
        placeholder="e.g. pricing, availability, placing an order"
        className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] resize-none transition-colors"
      />

      <p className="text-xs text-gray-400 mt-1.5 mb-4">Write it like you're explaining it to a friend. The more specific, the better.</p>

      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Quick examples — click to use:</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {TRIGGER_CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => setTriggerText(chip)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors
              ${triggerText === chip
                ? 'bg-[#25D366] text-white border-[#25D366]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#25D366] hover:text-[#25D366]'
              }`}
          >
            {chip}
          </button>
        ))}
      </div>

      {triggerText.trim() && (
        <div className="rounded-xl bg-[#EBF8FF] border border-[#BEE3F8] p-4 mb-5">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Info size={13} className="text-[#3182CE]" />
            <span className="text-xs font-semibold text-[#3182CE] uppercase tracking-wide">How this works</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            When someone sends a message about{' '}
            <strong className="text-gray-800">"{triggerText}"</strong>, your auto-reply will fire instantly — even at 2am.
          </p>
        </div>
      )}

      <button
        disabled={!triggerText.trim()}
        onClick={onNext}
        className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors
          ${triggerText.trim() ? 'bg-[#25D366] text-white hover:bg-[#1ebe5a]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
      >
        Next: Write your reply <ChevronRight size={16} />
      </button>
    </div>
  );
}

// ── Step 3: Write Reply ────────────────────────────────────────

function Step3WriteReply({ selectedTemplate, setSelectedTemplate, replyText, setReplyText, onNext }) {
  const MAX_CHARS = 1000;

  const handleTemplateClick = (idx) => {
    setSelectedTemplate(idx);
    setReplyText(REPLY_TEMPLATES[idx].full);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
        <h2 className="text-base font-bold text-gray-900">What should the auto-reply say?</h2>
      </div>
      <p className="text-sm text-gray-500 mb-5 ml-10">
        This message will be sent instantly when a customer asks about your trigger. Keep it friendly and helpful.
      </p>

      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Start with a template:</p>
      <div className="space-y-2 mb-5">
        {REPLY_TEMPLATES.map((tpl, idx) => (
          <button
            key={idx}
            onClick={() => handleTemplateClick(idx)}
            className={`w-full text-left rounded-xl border p-3 transition-colors
              ${selectedTemplate === idx ? 'border-[#25D366] bg-[#F0FDF4]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
          >
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-sm font-semibold text-gray-800">{tpl.label}</span>
              {selectedTemplate === idx && (
                <span className="w-4 h-4 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                  <Check size={10} strokeWidth={3} className="text-white" />
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 leading-snug">{tpl.preview}</p>
          </button>
        ))}
      </div>

      <label className="block text-sm font-semibold text-gray-700 mb-2">Your reply message:</label>
      <div className="relative">
        <textarea
          rows={4}
          value={replyText}
          onChange={e => { if (e.target.value.length <= MAX_CHARS) setReplyText(e.target.value); }}
          placeholder="Type your reply here..."
          className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] resize-none transition-colors"
        />
        <span className={`absolute bottom-2.5 right-3 text-[10px] ${replyText.length > MAX_CHARS * 0.9 ? 'text-orange-400' : 'text-gray-300'}`}>
          {replyText.length}/{MAX_CHARS}
        </span>
      </div>

      {replyText.trim() && (
        <div className="mt-3 mb-5 rounded-xl bg-[#ECE5DD] p-3">
          <p className="text-[10px] text-gray-500 font-semibold mb-2 uppercase tracking-wide">Preview (how it looks in WhatsApp):</p>
          <div className="flex justify-end">
            <div className="max-w-[88%] bg-[#DCF8C6] rounded-tl-2xl rounded-tr-sm rounded-bl-2xl rounded-br-2xl px-3 py-2 text-sm text-gray-800 shadow-sm">
              {replyText}
              <div className="text-right text-[9px] text-gray-400 mt-1">Now ✓✓</div>
            </div>
          </div>
        </div>
      )}

      <button
        disabled={!replyText.trim()}
        onClick={onNext}
        className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors
          ${replyText.trim() ? 'bg-[#25D366] text-white hover:bg-[#1ebe5a]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
      >
        Next: Choose what info to capture <ChevronRight size={16} />
      </button>
    </div>
  );
}

// ── Step 4: Capture Info ───────────────────────────────────────

function Step4CaptureInfo({ capturedFields, setCapturedFields, onNext }) {
  const toggleField = (key) => {
    setCapturedFields(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const enabledLabels = CAPTURE_FIELDS.filter(f => capturedFields[f.key]).map(f => f.label);

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">4</div>
        <h2 className="text-base font-bold text-gray-900">What details should we save from their message?</h2>
      </div>
      <p className="text-sm text-gray-500 mb-5 ml-10">
        Our AI will read each incoming message and automatically extract these details from the conversation.
      </p>

      <div className="space-y-2 mb-5">
        {CAPTURE_FIELDS.map(({ key, label, description }) => {
          const isOn = capturedFields[key];
          return (
            <button
              key={key}
              onClick={() => toggleField(key)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-colors text-left
                ${isOn ? 'border-[#25D366] bg-[#F0FDF4]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
            >
              <div>
                <p className={`text-sm font-medium ${isOn ? 'text-[#25D366]' : 'text-gray-700'}`}>{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{description}</p>
              </div>
              <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ml-3 border transition-colors
                ${isOn ? 'bg-[#25D366] border-[#25D366]' : 'bg-white border-gray-300'}`}>
                {isOn && <Check size={12} strokeWidth={3} className="text-white" />}
              </div>
            </button>
          );
        })}
      </div>

      {enabledLabels.length > 0 && (
        <div className="rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] p-3 mb-5">
          <p className="text-xs text-gray-600 leading-relaxed">
            <span className="font-semibold text-[#25D366]">We'll capture: </span>
            {enabledLabels.join(', ')} — automatically extracted from each customer message.
          </p>
        </div>
      )}

      <button
        onClick={onNext}
        className="w-full py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5a] transition-colors flex items-center justify-center gap-2"
      >
        Next: Set up follow-up <ChevronRight size={16} />
      </button>
    </div>
  );
}

// ── Step 5: Follow-up ──────────────────────────────────────────

function Step5FollowUp({ followUpEnabled, setFollowUpEnabled, followUpTiming, setFollowUpTiming, followUpMessage, setFollowUpMessage, onSkip, onNext }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">5</div>
        <h2 className="text-base font-bold text-gray-900">Send a gentle follow-up?</h2>
      </div>
      <p className="text-sm text-gray-500 mb-5 ml-10">
        If a customer doesn't reply after your auto-reply, we can nudge them automatically. This is optional.
      </p>

      <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 mb-4 bg-white">
        <div>
          <p className="text-sm font-medium text-gray-800">Send a follow-up if no reply</p>
          <p className="text-xs text-gray-400 mt-0.5">We'll check in automatically so you don't have to remember</p>
        </div>
        <Toggle on={followUpEnabled} onToggle={() => setFollowUpEnabled(p => !p)} />
      </div>

      {followUpEnabled && (
        <>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Send the follow-up:</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {FOLLOWUP_TIMINGS.map(timing => (
              <button
                key={timing}
                onClick={() => setFollowUpTiming(timing)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors
                  ${followUpTiming === timing
                    ? 'bg-[#25D366] text-white border-[#25D366]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#25D366] hover:text-[#25D366]'
                  }`}
              >
                {timing}
              </button>
            ))}
          </div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">Follow-up message:</label>
          <textarea
            rows={3}
            value={followUpMessage}
            onChange={e => setFollowUpMessage(e.target.value)}
            className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-800 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] resize-none transition-colors mb-4"
          />

          <div className="rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] p-3 mb-5">
            <p className="text-xs text-gray-600 leading-relaxed">
              If a customer doesn't reply within{' '}
              <strong className="text-gray-800">{followUpTiming}</strong>, we'll automatically send:{' '}
              <em className="text-gray-700">"{followUpMessage}"</em>
            </p>
          </div>
        </>
      )}

      <div className="flex gap-3">
        <button
          onClick={onSkip}
          className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
        >
          Skip this step
        </button>
        <button
          onClick={onNext}
          className="flex-[2] py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5a] transition-colors flex items-center justify-center gap-1.5"
        >
          Next: Connect Google Sheets <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

// ── Step 6: Google Sheets ──────────────────────────────────────

// Simulated sheet columns fetched after connecting
const MOCK_SHEET_COLUMNS = [
  'Customer Name', 'Phone Number', 'Product Interest', 'Budget', 'Location', 'Quantity', 'Notes', 'Date Added',
];

function Step6GoogleSheets({ onFinish }) {
  const [enabled, setEnabled] = useState(false);
  // 'idle' | 'connecting' | 'fetching' | 'done'
  const [connectState, setConnectState] = useState('idle');
  const [sheetUrl, setSheetUrl] = useState('');
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);

  const handleConnect = () => {
    if (!sheetUrl.trim()) return;
    setConnectState('connecting');
    setTimeout(() => {
      setConnectState('fetching');
      setTimeout(() => {
        setColumns(MOCK_SHEET_COLUMNS);
        // pre-select sensible defaults
        setSelectedColumns(['Customer Name', 'Phone Number', 'Product Interest', 'Budget', 'Date Added']);
        setConnectState('done');
      }, 1200);
    }, 800);
  };

  const toggleColumn = (col) => {
    setSelectedColumns(prev =>
      prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
    );
  };

  const isLoading = connectState === 'connecting' || connectState === 'fetching';
  const loadingLabel = connectState === 'connecting' ? 'Connecting to sheet…' : 'Fetching columns…';

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">6</div>
        <h2 className="text-base font-bold text-gray-900">Log leads to Google Sheets</h2>
      </div>
      <p className="text-sm text-gray-500 mb-5 ml-10">
        Optional — only useful if you want leads saved to a spreadsheet automatically.
      </p>

      {/* Master toggle */}
      <div className={`flex items-center justify-between px-4 py-3 rounded-xl border mb-5 transition-colors ${enabled ? 'border-[#25D366] bg-[#F0FDF4]' : 'border-gray-200 bg-white'}`}>
        <div>
          <p className="text-sm font-semibold text-gray-800">Save leads to Google Sheets</p>
          <p className="text-xs text-gray-400 mt-0.5">Every captured lead gets logged automatically</p>
        </div>
        <Toggle on={enabled} onToggle={() => { setEnabled(p => !p); if (enabled) setConnectState('idle'); }} />
      </div>

      {enabled && (
        <>
          {connectState === 'idle' && (
            <div className="space-y-3 mb-5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Google Sheet URL</label>
              <input
                value={sheetUrl}
                onChange={e => setSheetUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/…"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors"
              />
              <button
                disabled={!sheetUrl.trim()}
                onClick={handleConnect}
                className={`w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors
                  ${sheetUrl.trim() ? 'border-2 border-[#25D366] text-[#25D366] hover:bg-[#F0FDF4]' : 'border-2 border-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                <span className="text-base">📊</span> Connect Sheet
              </button>
              <p className="text-[10px] text-gray-400 text-center">Make sure the sheet is shared with edit access</p>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-8 gap-3 mb-5">
              <Loader size={22} className="text-[#25D366] animate-spin" />
              <p className="text-sm text-gray-500">{loadingLabel}</p>
            </div>
          )}

          {connectState === 'done' && (
            <div className="mb-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                  <Check size={11} strokeWidth={3} className="text-white" />
                </div>
                <p className="text-sm font-semibold text-[#25D366]">Sheet connected</p>
                <button
                  onClick={() => { setConnectState('idle'); setColumns([]); setSheetUrl(''); }}
                  className="ml-auto text-[10px] text-gray-400 hover:text-gray-600 underline"
                >
                  Change
                </button>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Select which columns to fill in
                </p>
                <p className="text-[10px] text-gray-400 mb-3">These are the columns we found in your sheet — pick the ones to map to captured data</p>
                <div className="grid grid-cols-2 gap-2">
                  {columns.map(col => {
                    const on = selectedColumns.includes(col);
                    return (
                      <button
                        key={col}
                        onClick={() => toggleColumn(col)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-colors
                          ${on ? 'border-[#25D366] bg-[#F0FDF4]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-colors
                          ${on ? 'bg-[#25D366] border-[#25D366]' : 'bg-white border-gray-300'}`}>
                          {on && <Check size={10} strokeWidth={3} className="text-white" />}
                        </div>
                        <span className={`text-xs font-medium truncate ${on ? 'text-[#16a34a]' : 'text-gray-700'}`}>{col}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedColumns.length > 0 && (
                <div className="rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] px-4 py-3">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <span className="font-semibold text-[#16a34a]">Will fill: </span>
                    {selectedColumns.join(', ')}
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      <button
        onClick={onFinish}
        className="w-full py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5a] transition-colors flex items-center justify-center gap-2"
      >
        {enabled && connectState === 'done' ? 'Finish Setup ✓' : 'Finish Setup'} <ChevronRight size={16} />
      </button>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────

export default function AutopilotWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Step 1
  const [whatsappConnected, setWhatsappConnected] = useState(false);

  // Step 2
  const [triggerText, setTriggerText] = useState('');

  // Step 3
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Step 4
  const [capturedFields, setCapturedFields] = useState(
    Object.fromEntries(CAPTURE_FIELDS.map(f => [f.key, f.default]))
  );

  // Step 5
  const [followUpEnabled, setFollowUpEnabled] = useState(true);
  const [followUpTiming, setFollowUpTiming] = useState('1 day later');
  const [followUpMessage, setFollowUpMessage] = useState(
    "Hi! Just checking if you had any questions. Happy to help 😊"
  );

  const completeStep = (stepNum) => {
    setCompletedSteps(prev => [...new Set([...prev, stepNum])]);
    if (stepNum < 6) setCurrentStep(stepNum + 1);
  };

  const handleFinish = () => {
    alert('Autopilot is now live! 🎉\n\nYour WhatsApp will now auto-reply to relevant messages 24/7.');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center py-8 px-4">

      {/* Header */}
      <div className="w-full max-w-[500px] mb-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Autopilot</h1>
          <p className="text-xs text-gray-400">by QueryGen</p>
        </div>
      </div>

      {/* Main card */}
      <div className="w-full max-w-[500px] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <StepIndicator currentStep={currentStep} completedSteps={completedSteps} />

        <div className="px-6 py-6">
          {currentStep === 1 && (
            <Step1ConnectWhatsApp
              connected={whatsappConnected}
              phone={CONNECTED_PHONE}
              onScan={() => setWhatsappConnected(true)}
              onNext={() => completeStep(1)}
            />
          )}
          {currentStep === 2 && (
            <Step2SetTrigger
              triggerText={triggerText}
              setTriggerText={setTriggerText}
              onNext={() => completeStep(2)}
            />
          )}
          {currentStep === 3 && (
            <Step3WriteReply
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              replyText={replyText}
              setReplyText={setReplyText}
              onNext={() => completeStep(3)}
            />
          )}
          {currentStep === 4 && (
            <Step4CaptureInfo
              capturedFields={capturedFields}
              setCapturedFields={setCapturedFields}
              onNext={() => completeStep(4)}
            />
          )}
          {currentStep === 5 && (
            <Step5FollowUp
              followUpEnabled={followUpEnabled}
              setFollowUpEnabled={setFollowUpEnabled}
              followUpTiming={followUpTiming}
              setFollowUpTiming={setFollowUpTiming}
              followUpMessage={followUpMessage}
              setFollowUpMessage={setFollowUpMessage}
              onSkip={() => { completeStep(5); }}
              onNext={() => completeStep(5)}
            />
          )}
          {currentStep === 6 && (
            <Step6GoogleSheets onFinish={handleFinish} />
          )}
        </div>
      </div>
    </div>
  );
}
