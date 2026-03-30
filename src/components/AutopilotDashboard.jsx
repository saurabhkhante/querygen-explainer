import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Play, Pause, Pencil, Trash2, Plus, ChevronRight,
  MessageSquare, Users, Clock, Send, Zap, MoreVertical, X, Check,
  Calendar, Search, Hash, User as UserIcon, AlertCircle, Timer,
  Globe, Copy, CheckCheck, ChevronDown,
  Bell, BellRing, Sparkles, Tag, ExternalLink, Smartphone, Monitor, Trash2 as Trash2Icon
} from 'lucide-react';

// ── Mock data: Autopilots ──────────────────────────────────────

const SEED_AUTOPILOTS = [
  {
    id: 'ap-001',
    name: 'Pricing Enquiries',
    trigger: 'pricing, availability, placing an order',
    replyPreview: "Hi! Thanks for reaching out. We've noted your enquiry and will share pricing/availability within 2 hours...",
    status: 'active',
    whatsappNumber: '+91 98765 43210',
    sheetsConnected: true,
    followUpEnabled: true,
    followUpTiming: '1 day later',
    capturedFields: ['Customer name', 'What they want', 'Their budget', 'Location'],
    stats: { repliesSent: 142, leadersCaptured: 89, lastTriggered: '2 minutes ago', followUpsSent: 34 },
    createdAt: '12 Mar 2026',
  },
  {
    id: 'ap-002',
    name: 'Bulk Order Queries',
    trigger: 'bulk order, wholesale price, stock availability',
    replyPreview: "Hi! Thanks for your interest 😊 We'll send you our full catalog and pricing details shortly...",
    status: 'active',
    whatsappNumber: '+91 98765 43210',
    sheetsConnected: true,
    followUpEnabled: true,
    followUpTiming: '2 days later',
    capturedFields: ['Customer name', 'Quantity', 'Their budget'],
    stats: { repliesSent: 58, leadersCaptured: 41, lastTriggered: '1 hour ago', followUpsSent: 12 },
    createdAt: '18 Mar 2026',
  },
  {
    id: 'ap-003',
    name: 'Appointment Booking',
    trigger: 'appointment booking, availability, service rates',
    replyPreview: "Hi! Thanks for reaching out 🙏 We've received your message and will get back to you within 2 hours...",
    status: 'paused',
    whatsappNumber: '+91 98765 43210',
    sheetsConnected: false,
    followUpEnabled: false,
    followUpTiming: null,
    capturedFields: ['Customer name', 'Date they need it by', 'Location'],
    stats: { repliesSent: 23, leadersCaptured: 17, lastTriggered: '3 days ago', followUpsSent: 0 },
    createdAt: '25 Mar 2026',
  },
];

// ── Mock data: Contacts & Groups ───────────────────────────────

const MOCK_CONTACTS = [
  { id: 'c1', type: 'contact', name: 'Rahul Sharma',    number: '+91 98001 11111', avatar: 'RS' },
  { id: 'c2', type: 'contact', name: 'Priya Mehta',     number: '+91 98002 22222', avatar: 'PM' },
  { id: 'c3', type: 'contact', name: 'Amit Joshi',      number: '+91 98003 33333', avatar: 'AJ' },
  { id: 'c4', type: 'contact', name: 'Sneha Kapoor',    number: '+91 98004 44444', avatar: 'SK' },
  { id: 'c5', type: 'contact', name: 'Vikram Nair',     number: '+91 98005 55555', avatar: 'VN' },
  { id: 'c6', type: 'contact', name: 'Deepa Iyer',      number: '+91 98006 66666', avatar: 'DI' },
  { id: 'c7', type: 'contact', name: 'Kiran Reddy',     number: '+91 98007 77777', avatar: 'KR' },
  { id: 'c8', type: 'contact', name: 'Anjali Gupta',    number: '+91 98008 88888', avatar: 'AG' },
  { id: 'g1', type: 'group',   name: 'Diwali Sale Leads',    members: 24, avatar: '🎁' },
  { id: 'g2', type: 'group',   name: 'Wholesale Buyers',     members: 11, avatar: '📦' },
  { id: 'g3', type: 'group',   name: 'VIP Customers',        members: 7,  avatar: '⭐' },
  { id: 'g4', type: 'group',   name: 'March Enquiries',      members: 38, avatar: '📋' },
];

// ── Mock data: Scheduled messages ─────────────────────────────

const now = new Date('2026-03-30T10:00:00');

const SEED_SCHEDULED = [
  {
    id: 'sl-001',
    message: "Hi Rahul, just checking in on the quote we sent over on Monday. Let me know if you have any questions or need anything changed before you decide 🙏",
    recipients: [
      { id: 'c1', type: 'contact', name: 'Rahul Sharma' },
    ],
    scheduledFor: new Date('2026-03-30T11:00:00'),
    status: 'scheduled',
    createdAt: new Date('2026-03-29T09:00:00'),
  },
  {
    id: 'sl-002',
    message: "Team — reminder that the delivery report for this week needs to be updated on the sheet by 6pm today. Tag me once done ✅",
    recipients: [
      { id: 'g4', type: 'group',   name: 'March Enquiries' },
    ],
    scheduledFor: new Date('2026-03-30T14:00:00'),
    status: 'scheduled',
    createdAt: new Date('2026-03-29T11:00:00'),
  },
  {
    id: 'sl-003',
    message: "Hi Sneha, we spoke last week about your requirements. Did you get a chance to discuss internally? Happy to jump on a quick call if that helps.",
    recipients: [
      { id: 'c4', type: 'contact', name: 'Sneha Kapoor' },
    ],
    scheduledFor: new Date('2026-03-28T10:00:00'),
    status: 'sent',
    createdAt: new Date('2026-03-27T15:00:00'),
  },
  {
    id: 'sl-004',
    message: "Vikram, just a heads up — the stock you asked about is back. Wanted to let you know before it moves again.",
    recipients: [
      { id: 'c5', type: 'contact', name: 'Vikram Nair' },
    ],
    scheduledFor: new Date('2026-03-29T09:00:00'),
    status: 'cancelled',
    createdAt: new Date('2026-03-28T10:00:00'),
  },
];

// ── Shared: WA icon ────────────────────────────────────────────

function WAIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

// ── Shared: Toggle pill ────────────────────────────────────────

function Toggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${on ? 'bg-[#25D366]' : 'bg-gray-200'}`}
    >
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

// ── Helpers ────────────────────────────────────────────────────

function formatScheduledTime(date) {
  const d = new Date(date);
  const today = new Date(now);
  const tomorrow = new Date(now); tomorrow.setDate(tomorrow.getDate() + 1);

  const isToday = d.toDateString() === today.toDateString();
  const isTomorrow = d.toDateString() === tomorrow.toDateString();

  const time = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  if (isToday) return `Today, ${time}`;
  if (isTomorrow) return `Tomorrow, ${time}`;
  return `${d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}, ${time}`;
}

function recipientCountLabel(recipients) {
  const contacts = recipients.filter(r => r.type === 'contact').length;
  const groups = recipients.filter(r => r.type === 'group').length;
  const parts = [];
  if (contacts) parts.push(`${contacts} contact${contacts > 1 ? 's' : ''}`);
  if (groups) parts.push(`${groups} group${groups > 1 ? 's' : ''}`);
  return parts.join(' + ');
}

// ── AUTOPILOT TAB COMPONENTS ───────────────────────────────────

function StatPill({ icon: Icon, value, label, color = 'gray' }) {
  const colorMap = {
    green:  'text-[#16a34a]',
    blue:   'text-blue-600',
    orange: 'text-orange-600',
    purple: 'text-purple-600',
    gray:   'text-gray-600',
  };
  return (
    <div className="flex flex-col items-center gap-0.5 px-3 py-2">
      <div className={`flex items-center gap-1 text-sm font-bold ${colorMap[color]}`}>
        <Icon size={13} /><span>{value}</span>
      </div>
      <span className="text-[10px] text-gray-400 text-center leading-tight">{label}</span>
    </div>
  );
}

function DeleteModal({ autopilot, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={22} className="text-red-500" />
        </div>
        <h3 className="text-base font-bold text-gray-900 text-center mb-1">Delete "{autopilot.name}"?</h3>
        <p className="text-sm text-gray-500 text-center mb-6">This autopilot will stop running immediately. This cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}

function DetailDrawer({ autopilot, onClose, onToggleStatus, onDelete }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${autopilot.status === 'active' ? 'bg-[#25D366]' : 'bg-gray-300'}`} />
            <h3 className="text-base font-bold text-gray-900">{autopilot.name}</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X size={16} className="text-gray-600" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-5 py-5 space-y-5">
          <div className="grid grid-cols-4 divide-x divide-gray-100 bg-gray-50 rounded-xl overflow-hidden">
            <StatPill icon={MessageSquare} value={autopilot.stats.repliesSent} label="Replies sent" color="green" />
            <StatPill icon={Users} value={autopilot.stats.leadersCaptured} label="Leads captured" color="blue" />
            <StatPill icon={Send} value={autopilot.stats.followUpsSent} label="Follow-ups" color="purple" />
            <StatPill icon={Clock} value={autopilot.stats.lastTriggered} label="Last fired" color="orange" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Trigger</p>
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl px-4 py-3">
              <p className="text-sm text-gray-700"><span className="font-medium text-[#16a34a]">When someone asks about: </span>{autopilot.trigger}</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Auto-reply</p>
            <div className="bg-[#ECE5DD] rounded-xl p-3">
              <div className="flex justify-end">
                <div className="max-w-[90%] bg-[#DCF8C6] rounded-tl-2xl rounded-tr-sm rounded-bl-2xl rounded-br-2xl px-3 py-2 text-sm text-gray-800 shadow-sm">
                  {autopilot.replyPreview}
                  <div className="text-right text-[9px] text-gray-400 mt-1">Sent instantly ✓✓</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Capturing from messages</p>
            <div className="flex flex-wrap gap-1.5">
              {autopilot.capturedFields.map(f => (
                <span key={f} className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">{f}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Follow-up</p>
            {autopilot.followUpEnabled ? (
              <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-xl px-4 py-3">
                <Check size={14} className="text-[#25D366] flex-shrink-0" />
                Sends <strong className="mx-1">{autopilot.followUpTiming}</strong> if no reply
              </div>
            ) : (
              <p className="text-sm text-gray-400 bg-gray-50 rounded-xl px-4 py-3">No follow-up configured</p>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Google Sheets</p>
            <div className={`flex items-center gap-2 text-sm rounded-xl px-4 py-3 ${autopilot.sheetsConnected ? 'bg-[#F0FDF4] text-[#16a34a]' : 'bg-gray-50 text-gray-400'}`}>
              <span className="w-6 h-6 rounded bg-[#0F9D58] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">GS</span>
              {autopilot.sheetsConnected ? 'Connected — leads auto-logged' : 'Not connected'}
            </div>
          </div>
        </div>
        <div className="flex gap-2 px-5 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={() => onToggleStatus(autopilot.id)}
            className={`flex-1 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors
              ${autopilot.status === 'active' ? 'bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200' : 'bg-[#F0FDF4] text-[#25D366] hover:bg-green-100 border border-[#BBF7D0]'}`}
          >
            {autopilot.status === 'active' ? <><Pause size={15} /> Pause</> : <><Play size={15} /> Resume</>}
          </button>
          <Link to="/autopilot" className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
            <Pencil size={14} /> Edit
          </Link>
          <button onClick={() => onDelete(autopilot.id)} className="w-10 h-10 rounded-xl bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-100 transition-colors flex-shrink-0">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function AutopilotCard({ autopilot, onToggleStatus, onDelete, onOpenDetail }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = autopilot.status === 'active';
  return (
    <div className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${isActive ? 'border-gray-200' : 'border-gray-100 opacity-70'}`}>
      <div className="px-4 pt-4 pb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative flex-shrink-0">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? 'bg-[#F0FDF4]' : 'bg-gray-100'}`}>
              <Zap size={16} className={isActive ? 'text-[#25D366]' : 'text-gray-400'} />
            </div>
            {isActive && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#25D366] rounded-full border-2 border-white" />}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-gray-900 truncate">{autopilot.name}</h3>
            <p className="text-xs text-gray-400 truncate mt-0.5">{autopilot.whatsappNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isActive ? 'bg-[#F0FDF4] text-[#16a34a]' : 'bg-gray-100 text-gray-500'}`}>
            {isActive ? 'Active' : 'Paused'}
          </span>
          <div className="relative">
            <button onClick={() => setMenuOpen(p => !p)} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
              <MoreVertical size={15} />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-8 z-20 bg-white rounded-xl shadow-lg border border-gray-100 py-1 w-36 overflow-hidden">
                  <button onClick={() => { onOpenDetail(autopilot); setMenuOpen(false); }} className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"><ChevronRight size={13} /> View details</button>
                  <button onClick={() => { onToggleStatus(autopilot.id); setMenuOpen(false); }} className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2">{isActive ? <><Pause size={13} /> Pause</> : <><Play size={13} /> Resume</>}</button>
                  <Link to="/autopilot" className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"><Pencil size={13} /> Edit</Link>
                  <button onClick={() => { onDelete(autopilot.id); setMenuOpen(false); }} className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-red-50 flex items-center gap-2"><Trash2 size={13} /> Delete</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="px-4 pb-3">
        <p className="text-xs text-gray-500 truncate"><span className="font-medium text-gray-600">Trigger: </span>{autopilot.trigger}</p>
      </div>
      <div className="grid grid-cols-4 divide-x divide-gray-100 border-t border-gray-100">
        {[
          { v: autopilot.stats.repliesSent,    l: 'Replies' },
          { v: autopilot.stats.leadersCaptured, l: 'Leads' },
          { v: autopilot.stats.followUpsSent,   l: 'Follow-ups' },
          { v: autopilot.stats.lastTriggered,   l: 'Last fired', small: true },
        ].map(({ v, l, small }) => (
          <div key={l} className="flex flex-col items-center py-2.5 px-1">
            <span className={`font-bold text-gray-800 text-center leading-tight ${small ? 'text-[10px]' : 'text-sm'}`}>{v}</span>
            <span className="text-[9px] text-gray-400 mt-0.5">{l}</span>
          </div>
        ))}
      </div>
      <div className="flex border-t border-gray-100">
        <button onClick={() => onToggleStatus(autopilot.id)} className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${isActive ? 'text-amber-500 hover:bg-amber-50' : 'text-[#25D366] hover:bg-[#F0FDF4]'}`}>
          {isActive ? <><Pause size={13} /> Pause</> : <><Play size={13} /> Resume</>}
        </button>
        <div className="w-px bg-gray-100" />
        <Link to="/autopilot" className="flex-1 py-2.5 text-xs font-semibold text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors">
          <Pencil size={13} /> Edit
        </Link>
        <div className="w-px bg-gray-100" />
        <button onClick={() => onOpenDetail(autopilot)} className="flex-1 py-2.5 text-xs font-semibold text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors">
          Details <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}

function SummaryBar({ autopilots }) {
  const active = autopilots.filter(a => a.status === 'active').length;
  const totalReplies = autopilots.reduce((s, a) => s + a.stats.repliesSent, 0);
  const totalLeads = autopilots.reduce((s, a) => s + a.stats.leadersCaptured, 0);
  const totalFollowUps = autopilots.reduce((s, a) => s + a.stats.followUpsSent, 0);
  return (
    <div className="grid grid-cols-4 gap-3 mb-6">
      {[
        { label: 'Active', value: active, icon: Zap, color: 'text-[#25D366]', bg: 'bg-[#F0FDF4]' },
        { label: 'Total replies', value: totalReplies, icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Leads captured', value: totalLeads, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Follow-ups sent', value: totalFollowUps, icon: Send, color: 'text-orange-500', bg: 'bg-orange-50' },
      ].map(({ label, value, icon: Icon, color, bg }) => (
        <div key={label} className="bg-white rounded-2xl border border-gray-200 px-4 py-3 shadow-sm">
          <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center mb-2`}><Icon size={16} className={color} /></div>
          <p className="text-xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-400 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  );
}

// ── SEND LATER COMPONENTS ──────────────────────────────────────

// Recipient picker modal
function RecipientPicker({ selected, onDone, onClose }) {
  const [search, setSearch] = useState('');
  const [localSelected, setLocalSelected] = useState(selected);
  const [manualInput, setManualInput] = useState('');
  const [manualError, setManualError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const filtered = MOCK_CONTACTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.number && c.number.includes(search))
  );

  const isSelected = (id) => localSelected.some(s => s.id === id);

  const toggle = (contact) => {
    setLocalSelected(prev =>
      isSelected(contact.id)
        ? prev.filter(s => s.id !== contact.id)
        : [...prev, { id: contact.id, type: contact.type, name: contact.name }]
    );
  };

  const addManual = () => {
    const raw = manualInput.trim();
    if (!raw) return;
    // basic validation: starts with + or digit, 7+ chars
    if (!/^[\+\d][\d\s\-]{6,}$/.test(raw)) {
      setManualError('Enter a valid phone number (e.g. +91 98765 43210)');
      return;
    }
    const id = `manual-${raw.replace(/\s/g, '')}`;
    if (!localSelected.find(s => s.id === id)) {
      setLocalSelected(prev => [...prev, { id, type: 'contact', name: raw }]);
    }
    setManualInput('');
    setManualError('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <h3 className="text-base font-bold text-gray-900">Add recipients</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pt-3 pb-2 flex-shrink-0">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
            <Search size={14} className="text-gray-400 flex-shrink-0" />
            <input
              ref={inputRef}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search contacts or groups..."
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none"
            />
          </div>
        </div>

        {/* Manual number entry */}
        <div className="px-4 pb-3 flex-shrink-0">
          <div className="flex gap-2">
            <input
              value={manualInput}
              onChange={e => { setManualInput(e.target.value); setManualError(''); }}
              onKeyDown={e => e.key === 'Enter' && addManual()}
              placeholder="Or type a number: +91 98765 43210"
              className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-700 placeholder:text-gray-400 outline-none focus:border-[#25D366]"
            />
            <button
              onClick={addManual}
              className="px-3 py-2 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1ebe5a] transition-colors flex-shrink-0"
            >
              Add
            </button>
          </div>
          {manualError && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={11} />{manualError}</p>}
        </div>

        {/* Selected chips */}
        {localSelected.length > 0 && (
          <div className="px-4 pb-2 flex-shrink-0">
            <div className="flex flex-wrap gap-1.5">
              {localSelected.map(s => (
                <span key={s.id} className="flex items-center gap-1 text-xs bg-[#F0FDF4] text-[#16a34a] border border-[#BBF7D0] px-2 py-1 rounded-full font-medium">
                  {s.type === 'group' ? <Hash size={10} /> : <UserIcon size={10} />}
                  {s.name}
                  <button onClick={() => setLocalSelected(prev => prev.filter(x => x.id !== s.id))} className="ml-0.5 hover:text-red-500">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact list */}
        <div className="overflow-y-auto flex-1 px-2 pb-2">
          {/* Groups section */}
          {filtered.some(c => c.type === 'group') && (
            <div className="px-2 py-1.5">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Groups</p>
              {filtered.filter(c => c.type === 'group').map(c => (
                <button
                  key={c.id}
                  onClick={() => toggle(c)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${isSelected(c.id) ? 'bg-[#F0FDF4]' : 'hover:bg-gray-50'}`}
                >
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-base flex-shrink-0">{c.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.members} members</p>
                  </div>
                  {isSelected(c.id) && <Check size={15} className="text-[#25D366] flex-shrink-0" />}
                </button>
              ))}
            </div>
          )}
          {/* Contacts section */}
          {filtered.some(c => c.type === 'contact') && (
            <div className="px-2 py-1.5">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Contacts</p>
              {filtered.filter(c => c.type === 'contact').map(c => (
                <button
                  key={c.id}
                  onClick={() => toggle(c)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${isSelected(c.id) ? 'bg-[#F0FDF4]' : 'hover:bg-gray-50'}`}
                >
                  <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{c.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.number}</p>
                  </div>
                  {isSelected(c.id) && <Check size={15} className="text-[#25D366] flex-shrink-0" />}
                </button>
              ))}
            </div>
          )}
          {filtered.length === 0 && (
            <p className="text-center text-sm text-gray-400 py-8">No contacts match "{search}"</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            disabled={localSelected.length === 0}
            onClick={() => onDone(localSelected)}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors
              ${localSelected.length > 0 ? 'bg-[#25D366] text-white hover:bg-[#1ebe5a]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            {localSelected.length > 0 ? `Add ${localSelected.length} recipient${localSelected.length > 1 ? 's' : ''}` : 'Select recipients'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Compose modal
function ComposeModal({ onSchedule, onClose }) {
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const MAX = 1000;

  // default date/time to tomorrow 10am
  useEffect(() => {
    const d = new Date(now);
    d.setDate(d.getDate() + 1);
    d.setHours(10, 0, 0, 0);
    setDate(d.toISOString().slice(0, 10));
    setTime('10:00');
  }, []);

  const canSchedule = message.trim() && recipients.length > 0 && date && time;

  const handleSchedule = () => {
    if (!canSchedule) return;
    const scheduledFor = new Date(`${date}T${time}:00`);
    onSchedule({ message, recipients, scheduledFor });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-40">
        <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-xl flex flex-col max-h-[92vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#F0FDF4] flex items-center justify-center">
                <Timer size={15} className="text-[#25D366]" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Schedule a message</h3>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <X size={16} className="text-gray-600" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 px-5 py-5 space-y-5">

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Message</label>
              <div className="relative">
                <textarea
                  rows={5}
                  value={message}
                  onChange={e => { if (e.target.value.length <= MAX) setMessage(e.target.value); }}
                  placeholder="e.g. Just following up on our conversation from last week..."
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] resize-none transition-colors"
                />
                <span className={`absolute bottom-2.5 right-3 text-[10px] ${message.length > MAX * 0.9 ? 'text-orange-400' : 'text-gray-300'}`}>
                  {message.length}/{MAX}
                </span>
              </div>
              {/* WA preview */}
              {message.trim() && (
                <div className="mt-2 rounded-xl bg-[#ECE5DD] p-3">
                  <p className="text-[10px] text-gray-500 font-medium mb-2">Preview</p>
                  <div className="flex justify-end">
                    <div className="max-w-[88%] bg-[#DCF8C6] rounded-tl-2xl rounded-tr-sm rounded-bl-2xl rounded-br-2xl px-3 py-2 text-sm text-gray-800 shadow-sm">
                      {message}
                      <div className="text-right text-[9px] text-gray-400 mt-1">Scheduled ✓✓</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Recipients */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Send to</label>
              {recipients.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {recipients.map(r => (
                    <span key={r.id} className="flex items-center gap-1 text-xs bg-[#F0FDF4] text-[#16a34a] border border-[#BBF7D0] px-2 py-1 rounded-full font-medium">
                      {r.type === 'group' ? <Hash size={10} /> : <UserIcon size={10} />}
                      {r.name}
                      <button onClick={() => setRecipients(prev => prev.filter(x => x.id !== r.id))} className="ml-0.5 hover:text-red-500"><X size={10} /></button>
                    </span>
                  ))}
                </div>
              )}
              <button
                onClick={() => setShowPicker(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-500 hover:border-[#25D366] hover:text-[#25D366] transition-colors"
              >
                <Plus size={15} />
                {recipients.length === 0 ? 'Add contacts or groups' : 'Add more'}
              </button>
            </div>

            {/* Date & Time */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Send at</label>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="date"
                    value={date}
                    min={new Date(now).toISOString().slice(0, 10)}
                    onChange={e => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors"
                  />
                </div>
                <div className="relative">
                  <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0">
            <button
              disabled={!canSchedule}
              onClick={handleSchedule}
              className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors
                ${canSchedule ? 'bg-[#25D366] text-white hover:bg-[#1ebe5a]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
              <Calendar size={16} />
              {canSchedule
                ? `Schedule for ${formatScheduledTime(new Date(`${date}T${time}:00`))}`
                : 'Fill in all fields to schedule'}
            </button>
          </div>
        </div>
      </div>

      {/* Recipient picker nested on top */}
      {showPicker && (
        <RecipientPicker
          selected={recipients}
          onDone={(sel) => { setRecipients(sel); setShowPicker(false); }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </>
  );
}

// Scheduled message row
function ScheduledRow({ item, onCancel, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const statusConfig = {
    scheduled:  { label: 'Scheduled', color: 'bg-blue-50 text-blue-600',   dot: 'bg-blue-400' },
    sent:       { label: 'Sent',      color: 'bg-[#F0FDF4] text-[#16a34a]', dot: 'bg-[#25D366]' },
    cancelled:  { label: 'Cancelled', color: 'bg-gray-100 text-gray-500',   dot: 'bg-gray-300' },
  };
  const cfg = statusConfig[item.status];

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden ${item.status === 'cancelled' ? 'opacity-60' : ''}`}>
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm text-gray-800 leading-snug flex-1 line-clamp-2">{item.message}</p>
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.color}`}>{cfg.label}</span>
            {item.status === 'scheduled' && (
              <div className="relative">
                <button onClick={() => setMenuOpen(p => !p)} className="w-6 h-6 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100">
                  <MoreVertical size={13} />
                </button>
                {menuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                    <div className="absolute right-0 top-7 z-20 bg-white rounded-xl shadow-lg border border-gray-100 py-1 w-32 overflow-hidden">
                      <button onClick={() => { onCancel(item.id); setMenuOpen(false); }} className="w-full text-left px-3 py-2 text-xs text-amber-600 hover:bg-amber-50 flex items-center gap-2"><Pause size={12} /> Cancel</button>
                      <button onClick={() => { onDelete(item.id); setMenuOpen(false); }} className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-red-50 flex items-center gap-2"><Trash2 size={12} /> Delete</button>
                    </div>
                  </>
                )}
              </div>
            )}
            {item.status !== 'scheduled' && (
              <button onClick={() => onDelete(item.id)} className="w-6 h-6 rounded-md flex items-center justify-center text-gray-300 hover:bg-red-50 hover:text-red-400 transition-colors">
                <Trash2 size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Recipients */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {item.recipients.map(r => (
            <span key={r.id} className="flex items-center gap-1 text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {r.type === 'group' ? <Hash size={9} /> : <UserIcon size={9} />}
              {r.name}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: time */}
      <div className={`px-4 py-2.5 border-t border-gray-100 flex items-center gap-2 ${item.status === 'scheduled' ? 'bg-blue-50/40' : 'bg-gray-50/50'}`}>
        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
        <Clock size={11} className="text-gray-400 flex-shrink-0" />
        <span className="text-xs text-gray-500 font-medium">
          {item.status === 'sent' ? `Sent ${formatScheduledTime(item.scheduledFor)}` : formatScheduledTime(item.scheduledFor)}
        </span>
        <span className="ml-auto text-[10px] text-gray-400">{recipientCountLabel(item.recipients)}</span>
      </div>
    </div>
  );
}

// Send Later tab
function SendLaterTab({ openCompose, onOpenHandled }) {
  const [scheduled, setScheduled] = useState(SEED_SCHEDULED);
  const [showCompose, setShowCompose] = useState(false);

  // Allow parent nav CTA to trigger compose
  useEffect(() => {
    if (openCompose) { setShowCompose(true); onOpenHandled(); }
  }, [openCompose]);
  const [filter, setFilter] = useState('all'); // all | scheduled | sent | cancelled

  const handleSchedule = ({ message, recipients, scheduledFor }) => {
    const newItem = {
      id: `sl-${Date.now()}`,
      message,
      recipients,
      scheduledFor,
      status: 'scheduled',
      createdAt: new Date(now),
    };
    setScheduled(prev => [newItem, ...prev]);
    setShowCompose(false);
  };

  const cancelItem = (id) => {
    setScheduled(prev => prev.map(s => s.id === id ? { ...s, status: 'cancelled' } : s));
  };

  const deleteItem = (id) => {
    setScheduled(prev => prev.filter(s => s.id !== id));
  };

  const counts = {
    all: scheduled.length,
    scheduled: scheduled.filter(s => s.status === 'scheduled').length,
    sent: scheduled.filter(s => s.status === 'sent').length,
    cancelled: scheduled.filter(s => s.status === 'cancelled').length,
  };
  const filtered = filter === 'all' ? scheduled : scheduled.filter(s => s.status === filter);

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Scheduled', value: counts.scheduled, icon: Timer,   color: 'text-blue-600',    bg: 'bg-blue-50' },
          { label: 'Sent',      value: counts.sent,      icon: Check,   color: 'text-[#25D366]',   bg: 'bg-[#F0FDF4]' },
          { label: 'Cancelled', value: counts.cancelled, icon: X,       color: 'text-gray-400',    bg: 'bg-gray-100' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-200 px-4 py-3 shadow-sm">
            <div className={`w-7 h-7 rounded-xl ${bg} flex items-center justify-center mb-2`}><Icon size={14} className={color} /></div>
            <p className="text-xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filter + compose button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {['all', 'scheduled', 'sent', 'cancelled'].map(f => (
            counts[f] > 0 || f === 'all' ? (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors
                  ${filter === f ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'}`}
              >
                {f === 'all' ? `All (${counts.all})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${counts[f]})`}
              </button>
            ) : null
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
            <Timer size={26} className="text-blue-400" />
          </div>
          <h3 className="text-base font-bold text-gray-800 mb-1">No {filter !== 'all' ? filter : ''} messages</h3>
          <p className="text-sm text-gray-400 mb-5 max-w-xs">Schedule a WhatsApp message to go out at exactly the right time.</p>
          <button
            onClick={() => setShowCompose(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5a] transition-colors"
          >
            <Calendar size={15} /> Schedule a message
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(item => (
            <ScheduledRow key={item.id} item={item} onCancel={cancelItem} onDelete={deleteItem} />
          ))}
        </div>
      )}

      {showCompose && <ComposeModal onSchedule={handleSchedule} onClose={() => setShowCompose(false)} />}
    </>
  );
}

// ── WEBSITE BOT TAB ────────────────────────────────────────────

const POSITION_OPTIONS = [
  { value: 'bottom-right', label: 'Bottom right' },
  { value: 'bottom-left',  label: 'Bottom left'  },
  { value: 'top-right',    label: 'Top right'    },
  { value: 'top-left',     label: 'Top left'     },
];

function WidgetPreview({ phone, message, position, color }) {
  const [open, setOpen] = useState(false);

  const posClass = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left':  'bottom-4 left-4',
    'top-right':    'top-4 right-4',
    'top-left':     'top-4 left-4',
  }[position] || 'bottom-4 right-4';

  const waUrl = `https://wa.me/${phone.replace(/\D/g, '')}${message.trim() ? `?text=${encodeURIComponent(message.trim())}` : ''}`;

  return (
    <div className="relative w-full bg-gray-100 rounded-2xl border border-gray-200" style={{ minHeight: '320px' }}>
      {/* Browser chrome + page content — clipped separately so popup isn't cut */}
      <div className="rounded-2xl overflow-hidden">
        <div className="bg-white border-b border-gray-200 px-3 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-gray-100 rounded-md px-3 py-1 text-[10px] text-gray-400 truncate">yourwebsite.com</div>
        </div>
        <div className="p-4 space-y-2" style={{ paddingBottom: '200px' }}>
          <div className="h-3 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>
      </div>

      {/* Widget — flex-col-reverse for bottom positions so popup grows upward */}
      <div className={`absolute ${posClass} flex ${position.startsWith('bottom') ? 'flex-col-reverse' : 'flex-col'} items-end gap-2`}>
        {/* Popup */}
        {open && (
          <div className="w-44 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-10">
            <div className="px-3 py-2.5 flex items-center gap-2" style={{ background: color }}>
              <WAIcon className="w-4 h-4 text-white" />
              <span className="text-white text-xs font-semibold truncate">Chat with us</span>
              <button onClick={() => setOpen(false)} className="ml-auto text-white/70 hover:text-white">
                <X size={12} />
              </button>
            </div>
            <div className="bg-[#ECE5DD] p-3">
              <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 text-xs text-gray-700 shadow-sm max-w-[90%]">
                {message.trim() || 'Hi there! How can we help?'}
              </div>
            </div>
            <div className="px-3 py-2.5">
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-white text-xs font-semibold transition-colors"
                style={{ background: color }}
              >
                <WAIcon className="w-3.5 h-3.5" />
                Open WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Floating button */}
        <button
          onClick={() => setOpen(p => !p)}
          className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white transition-transform hover:scale-105"
          style={{ background: color }}
        >
          {open ? <X size={20} /> : <WAIcon className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}

function WebsiteBotTab() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('Hi! I have a question about your services.');
  const [position, setPosition] = useState('bottom-right');
  const [color, setColor] = useState('#25D366');
  const [copied, setCopied] = useState(false);

  const snippet = `<!-- QueryGen WhatsApp Widget -->
<style>
  #qg-wa-widget{position:fixed;z-index:9999;${
    position === 'bottom-right' ? 'bottom:24px;right:24px' :
    position === 'bottom-left'  ? 'bottom:24px;left:24px'  :
    position === 'top-right'    ? 'top:24px;right:24px'    :
                                  'top:24px;left:24px'
  };}
  #qg-wa-btn{width:56px;height:56px;border-radius:50%;background:${color};border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,.25);transition:transform .15s;}
  #qg-wa-btn:hover{transform:scale(1.08);}
  #qg-wa-popup{display:none;position:absolute;${
    position.includes('right') ? 'right:0;' : 'left:0;'
  }${position.includes('bottom') ? 'bottom:68px;' : 'top:68px;'}width:220px;background:#fff;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.15);overflow:hidden;}
  #qg-wa-popup.open{display:block;}
  #qg-wa-head{background:${color};padding:12px;display:flex;align-items:center;gap:8px;color:#fff;font-family:sans-serif;font-size:13px;font-weight:600;}
  #qg-wa-body{background:#ECE5DD;padding:12px;}
  #qg-wa-msg{background:#fff;border-radius:12px 12px 12px 2px;padding:8px 12px;font-size:12px;font-family:sans-serif;color:#333;max-width:90%;}
  #qg-wa-foot{padding:10px 12px;}
  #qg-wa-link{display:flex;align-items:center;justify-content:center;gap:6px;background:${color};color:#fff;text-decoration:none;border-radius:10px;padding:8px;font-family:sans-serif;font-size:12px;font-weight:600;}
</style>
<div id="qg-wa-widget">
  <div id="qg-wa-popup">
    <div id="qg-wa-head">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      Chat with us
    </div>
    <div id="qg-wa-body"><div id="qg-wa-msg">${message.trim() || 'Hi! How can we help?'}</div></div>
    <div id="qg-wa-foot">
      <a id="qg-wa-link" href="https://wa.me/${phone.replace(/\D/g, '')}${message.trim() ? `?text=${encodeURIComponent(message.trim())}` : ''}" target="_blank">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Open WhatsApp
      </a>
    </div>
  </div>
  <button id="qg-wa-btn" onclick="document.getElementById('qg-wa-popup').classList.toggle('open')">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </button>
</div>
<!-- End QueryGen WhatsApp Widget -->`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const isReady = phone.replace(/\D/g, '').length >= 7;

  return (
    <div className="space-y-6">

      {/* Config card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-900">Widget settings</h2>
          <p className="text-xs text-gray-400 mt-0.5">Configure your WhatsApp chat button</p>
        </div>

        <div className="px-5 py-5 space-y-5">
          {/* Phone number */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              WhatsApp number
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-[#25D366] focus-within:ring-1 focus-within:ring-[#25D366] transition-colors bg-white">
              <WAIcon className="w-4 h-4 text-[#25D366] flex-shrink-0" />
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+91 93091 98683"
                className="flex-1 text-sm text-gray-800 placeholder:text-gray-300 outline-none bg-transparent"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1.5">Include country code, e.g. +91 93091 98683</p>
          </div>

          {/* Pre-filled message */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Pre-filled message
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Hi! I have a question about your services."
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] resize-none transition-colors"
            />
            <p className="text-[10px] text-gray-400 mt-1">This text is auto-typed when the visitor opens WhatsApp</p>
          </div>

          {/* Position + Color row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Position
              </label>
              <div className="relative">
                <select
                  value={position}
                  onChange={e => setPosition(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] bg-white transition-colors pr-8"
                >
                  {POSITION_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Button color
              </label>
              <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-[#25D366] transition-colors">
                <input
                  type="color"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  className="w-7 h-7 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                />
                <span className="text-sm text-gray-700 font-mono">{color}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live preview */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Preview</h2>
            <p className="text-xs text-gray-400 mt-0.5">Click the button to see how it behaves</p>
          </div>
          <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-[#F0FDF4] text-[#16a34a]">Live</span>
        </div>
        <div className="p-4">
          <WidgetPreview phone={phone} message={message} position={position} color={color} />
        </div>
      </div>

      {/* Embed snippet */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Embed code</h2>
            <p className="text-xs text-gray-400 mt-0.5">Paste before the closing &lt;/body&gt; tag on your website</p>
          </div>
          <button
            onClick={handleCopy}
            disabled={!isReady}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors
              ${isReady
                ? copied
                  ? 'bg-[#F0FDF4] text-[#16a34a] border border-[#BBF7D0]'
                  : 'bg-gray-900 text-white hover:bg-gray-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            {copied ? <><CheckCheck size={13} /> Copied!</> : <><Copy size={13} /> Copy code</>}
          </button>
        </div>

        {!isReady && (
          <div className="px-5 py-4 bg-amber-50 border-b border-amber-100 flex items-center gap-2">
            <AlertCircle size={14} className="text-amber-500 flex-shrink-0" />
            <p className="text-xs text-amber-700">Enter a WhatsApp number above to generate the embed code</p>
          </div>
        )}

        <div className="p-4">
          <pre className={`text-[10px] leading-relaxed font-mono rounded-xl p-4 overflow-x-auto whitespace-pre-wrap break-all select-all
            ${isReady ? 'bg-gray-950 text-green-300' : 'bg-gray-100 text-gray-300 select-none'}`}>
            {isReady ? snippet : '<!-- Enter your WhatsApp number above to generate the code -->'}
          </pre>
        </div>
      </div>

    </div>
  );
}

// ── ALERTS TAB ─────────────────────────────────────────────────

const SEED_ALERTS = [
  {
    id: 'al-001',
    name: 'Urgent Follow-up Needed',
    type: 'smart',
    condition: 'When a customer explicitly asks for a callback or says they are frustrated',
    status: 'active',
    fired: [
      { id: 'f1', contact: 'Rahul Sharma', number: '+91 98001 11111', preview: "I've been waiting 3 days, please call me back urgently!", firedAt: new Date('2026-03-30T09:15:00'), read: false },
      { id: 'f2', contact: 'Sneha Kapoor', number: '+91 98004 44444', preview: "This is really frustrating. Can someone please get back to me?", firedAt: new Date('2026-03-29T14:42:00'), read: true },
    ],
  },
  {
    id: 'al-002',
    name: 'Bulk Order Mention',
    type: 'keyword',
    condition: 'bulk order, wholesale, large quantity, 100 pieces',
    status: 'active',
    fired: [
      { id: 'f3', contact: 'Vikram Nair', number: '+91 98005 55555', preview: "Hi, we need a bulk order of 500 units. What's the best price?", firedAt: new Date('2026-03-30T08:30:00'), read: false },
    ],
  },
  {
    id: 'al-003',
    name: 'Refund Request',
    type: 'keyword',
    condition: 'refund, money back, cancel order, return',
    status: 'paused',
    fired: [],
  },
];

function timeAgo(date) {
  const diff = Math.floor((new Date('2026-03-30T10:00:00') - new Date(date)) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function AlertForm({ onSave, onCancel }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('smart');
  const [condition, setCondition] = useState('');

  const canSave = name.trim() && condition.trim();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-gray-900">New Alert</h2>
          <p className="text-xs text-gray-400 mt-0.5">Get notified when a conversation matches your condition</p>
        </div>
        {onCancel && (
          <button onClick={onCancel} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X size={15} className="text-gray-500" />
          </button>
        )}
      </div>

      <div className="px-5 py-5 space-y-5">
        {/* Alert name */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Alert name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g., Urgent Follow-up Needed"
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors"
          />
        </div>

        {/* Condition type */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Alert type</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                key: 'smart',
                icon: Sparkles,
                label: 'Smart condition',
                desc: 'Describe what to look for in plain English — AI does the matching',
                iconColor: 'text-purple-500',
                iconBg: 'bg-purple-50',
                activeBorder: 'border-purple-400',
                activeRing: 'ring-purple-100',
              },
              {
                key: 'keyword',
                icon: Tag,
                label: 'Keywords',
                desc: 'Alert fires when a message contains specific words or phrases',
                iconColor: 'text-blue-500',
                iconBg: 'bg-blue-50',
                activeBorder: 'border-blue-400',
                activeRing: 'ring-blue-100',
              },
            ].map(({ key, icon: Icon, label, desc, iconColor, iconBg, activeBorder, activeRing }) => (
              <button
                key={key}
                onClick={() => setType(key)}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  type === key
                    ? `${activeBorder} ring-2 ${activeRing} bg-white`
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center mb-2.5`}>
                  <Icon size={16} className={iconColor} />
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1">{label}</p>
                <p className="text-[11px] text-gray-400 leading-snug">{desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Condition input */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {type === 'smart' ? 'Describe the condition' : 'Keywords (comma-separated)'}
          </label>
          <textarea
            rows={3}
            value={condition}
            onChange={e => setCondition(e.target.value)}
            placeholder={
              type === 'smart'
                ? "e.g., 'when a customer says they are unhappy or asks for a refund'"
                : "e.g., refund, cancel order, money back, not happy"
            }
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] resize-none transition-colors"
          />
          <p className="text-[10px] text-gray-400 mt-1.5">
            {type === 'smart'
              ? 'Write it like you\'d explain it to a person — AI will understand'
              : 'Alert fires if any of these words appear in the message'}
          </p>
        </div>

        {/* Notify via */}
        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl px-4 py-3 space-y-2">
          <div className="flex items-center gap-2">
            <BellRing size={14} className="text-[#16a34a] flex-shrink-0" />
            <p className="text-xs font-semibold text-[#16a34a]">You'll be notified via</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-1.5 text-xs text-gray-600 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5">
              <Monitor size={11} className="text-gray-400" /> Desktop push
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-600 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5">
              <Smartphone size={11} className="text-gray-400" /> Phone notification
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-600 bg-white border border-[#BBF7D0] rounded-lg px-2.5 py-1.5">
              <WAIcon className="w-3 h-3 text-[#25D366]" /> WhatsApp message
            </span>
          </div>
          <p className="text-[10px] text-gray-400">Alert is sent from your QueryGen business number</p>
        </div>
      </div>

      <div className="px-5 py-4 border-t border-gray-100">
        <button
          disabled={!canSave}
          onClick={() => onSave({ name: name.trim(), type, condition: condition.trim() })}
          className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors
            ${canSave ? 'bg-[#25D366] text-white hover:bg-[#1ebe5a]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          <Bell size={15} /> Save Alert
        </button>
      </div>
    </div>
  );
}

function FiredItem({ item }) {
  return (
    <div className={`flex items-start gap-3 px-4 py-3 border-b border-gray-50 last:border-0 ${!item.read ? 'bg-[#F0FDF4]' : ''}`}>
      <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
        {item.contact.split(' ').map(n => n[0]).join('').slice(0, 2)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <p className="text-xs font-semibold text-gray-900 truncate">{item.contact}</p>
          <span className="text-[10px] text-gray-400 flex-shrink-0">{timeAgo(item.firedAt)}</span>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2 leading-snug">{item.preview}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">{item.number}</p>
      </div>
      <button className="flex-shrink-0 flex items-center gap-1 text-[10px] font-semibold text-[#25D366] hover:text-[#1ebe5a] transition-colors mt-0.5">
        <ExternalLink size={11} /> Go
      </button>
    </div>
  );
}

function AlertCard({ alert, onToggle, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const isActive = alert.status === 'active';
  const unread = alert.fired.filter(f => !f.read).length;

  return (
    <div className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${isActive ? 'border-gray-200' : 'border-gray-100 opacity-70'}`}>
      <div className="px-4 py-3.5 flex items-center gap-3">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${isActive ? (alert.type === 'smart' ? 'bg-purple-50' : 'bg-blue-50') : 'bg-gray-100'}`}>
          {alert.type === 'smart'
            ? <Sparkles size={15} className={isActive ? 'text-purple-500' : 'text-gray-400'} />
            : <Tag size={15} className={isActive ? 'text-blue-500' : 'text-gray-400'} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-gray-900 truncate">{alert.name}</p>
            {unread > 0 && (
              <span className="flex-shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white">{unread}</span>
            )}
          </div>
          <p className="text-[11px] text-gray-400 truncate mt-0.5">{alert.condition}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isActive ? 'bg-[#F0FDF4] text-[#16a34a]' : 'bg-gray-100 text-gray-500'}`}>
            {isActive ? 'Active' : 'Paused'}
          </span>
          <button
            onClick={() => onToggle(alert.id)}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isActive ? 'text-amber-500 hover:bg-amber-50' : 'text-[#25D366] hover:bg-[#F0FDF4]'}`}
          >
            {isActive ? <Pause size={13} /> : <Play size={13} />}
          </button>
          <button
            onClick={() => onDelete(alert.id)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:bg-red-50 hover:text-red-400 transition-colors"
          >
            <Trash2Icon size={13} />
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100">
        <div className="flex flex-col items-center py-2.5">
          <span className="text-sm font-bold text-gray-800">{alert.fired.length}</span>
          <span className="text-[9px] text-gray-400 mt-0.5">Times fired</span>
        </div>
        <div className="flex flex-col items-center py-2.5">
          <span className="text-sm font-bold text-gray-800">{unread}</span>
          <span className="text-[9px] text-gray-400 mt-0.5">Unread</span>
        </div>
        <div className="flex flex-col items-center py-2.5">
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${alert.type === 'smart' ? 'bg-purple-50 text-purple-500' : 'bg-blue-50 text-blue-500'}`}>
            {alert.type === 'smart' ? 'Smart' : 'Keyword'}
          </span>
          <span className="text-[9px] text-gray-400 mt-0.5">Type</span>
        </div>
      </div>

      {/* Fired log toggle */}
      {alert.fired.length > 0 && (
        <>
          <button
            onClick={() => setExpanded(p => !p)}
            className="w-full flex items-center justify-between px-4 py-2.5 border-t border-gray-100 text-xs font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <span className="flex items-center gap-1.5"><BellRing size={12} /> Recent triggers</span>
            <ChevronDown size={13} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
          {expanded && (
            <div className="border-t border-gray-100">
              {alert.fired.map(f => <FiredItem key={f.id} item={f} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function AlertsTab({ showForm }) {
  const [alerts, setAlerts] = useState(SEED_ALERTS);
  const [showNewForm, setShowNewForm] = useState(showForm || false);

  useEffect(() => { if (showForm) setShowNewForm(true); }, [showForm]);

  const totalFired = alerts.reduce((s, a) => s + a.fired.length, 0);
  const totalUnread = alerts.reduce((s, a) => s + a.fired.filter(f => !f.read).length, 0);
  const activeCount = alerts.filter(a => a.status === 'active').length;

  const handleSave = ({ name, type, condition }) => {
    setAlerts(prev => [{
      id: `al-${Date.now()}`,
      name, type, condition,
      status: 'active',
      fired: [],
    }, ...prev]);
    setShowNewForm(false);
  };

  const toggleAlert = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'active' ? 'paused' : 'active' } : a));
  };

  const deleteAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Active alerts', value: activeCount,   icon: Bell,    color: 'text-[#25D366]', bg: 'bg-[#F0FDF4]' },
          { label: 'Times fired',   value: totalFired,    icon: BellRing, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'Unread',        value: totalUnread,   icon: AlertCircle, color: 'text-red-500',  bg: 'bg-red-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-200 px-4 py-3 shadow-sm">
            <div className={`w-7 h-7 rounded-xl ${bg} flex items-center justify-center mb-2`}><Icon size={14} className={color} /></div>
            <p className="text-xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* New alert form */}
      {showNewForm && (
        <AlertForm onSave={handleSave} onCancel={() => setShowNewForm(false)} />
      )}

      {/* Alert cards */}
      {alerts.length > 0 ? (
        <div className="space-y-3">
          {alerts.map(a => (
            <AlertCard key={a.id} alert={a} onToggle={toggleAlert} onDelete={deleteAlert} />
          ))}
        </div>
      ) : !showNewForm ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#F0FDF4] flex items-center justify-center mb-4">
            <Bell size={26} className="text-[#25D366]" />
          </div>
          <h3 className="text-base font-bold text-gray-800 mb-1">No alerts yet</h3>
          <p className="text-sm text-gray-400 mb-5 max-w-xs">Create an alert to get notified when a conversation needs your attention.</p>
          <button
            onClick={() => setShowNewForm(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5a] transition-colors"
          >
            <Plus size={15} /> Create your first alert
          </button>
        </div>
      ) : null}
    </div>
  );
}

// ── MAIN DASHBOARD ─────────────────────────────────────────────

export default function AutopilotDashboard() {
  const [activeTab, setActiveTab] = useState('autopilots'); // 'autopilots' | 'send-later' | 'website-bot' | 'alerts'
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [autopilots, setAutopilots] = useState(SEED_AUTOPILOTS);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [detailTarget, setDetailTarget] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showCompose, setShowCompose] = useState(false);

  const toggleStatus = (id) => {
    setAutopilots(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'active' ? 'paused' : 'active' } : a));
    if (detailTarget?.id === id) {
      setDetailTarget(prev => ({ ...prev, status: prev.status === 'active' ? 'paused' : 'active' }));
    }
  };

  const confirmDelete = (id) => { setDeleteTarget(id); setDetailTarget(null); };
  const executeDelete = () => { setAutopilots(prev => prev.filter(a => a.id !== deleteTarget)); setDeleteTarget(null); };

  const filtered = filter === 'all' ? autopilots : autopilots.filter(a => a.status === filter);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">

      {/* Top nav */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white">
              <WAIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900 leading-tight">Autopilot</h1>
              <p className="text-[10px] text-gray-400">by QueryGen</p>
            </div>
          </div>
          {/* Context-sensitive CTA */}
          {activeTab === 'autopilots' ? (
            <Link to="/autopilot" className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366] text-white font-semibold text-xs hover:bg-[#1ebe5a] transition-colors">
              <Plus size={14} /> New Quick Reply
            </Link>
          ) : activeTab === 'send-later' ? (
            <button
              onClick={() => setShowCompose(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366] text-white font-semibold text-xs hover:bg-[#1ebe5a] transition-colors"
            >
              <Calendar size={14} /> Schedule Message
            </button>
          ) : activeTab === 'website-bot' ? (
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F0FDF4] text-[#16a34a] text-xs font-semibold border border-[#BBF7D0]">
              <Globe size={13} /> Embed anywhere
            </div>
          ) : (
            <button
              onClick={() => setShowAlertForm(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366] text-white font-semibold text-xs hover:bg-[#1ebe5a] transition-colors"
            >
              <Plus size={14} /> New Alert
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="max-w-2xl mx-auto px-4 flex gap-1 pb-0">
          {[
            { key: 'autopilots',  label: 'Quick Replies', icon: Zap },
            { key: 'send-later',  label: 'Send Later',    icon: Timer },
            { key: 'website-bot', label: 'Website Bot',   icon: Globe },
            { key: 'alerts',      label: 'Alerts',        icon: Bell },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors
                ${activeTab === key
                  ? 'border-[#25D366] text-[#25D366]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* ── Autopilots tab ── */}
        {activeTab === 'autopilots' && (
          <>
            {autopilots.length > 0 && <SummaryBar autopilots={autopilots} />}
            {autopilots.length > 0 && (
              <div className="flex items-center gap-2 mb-4">
                {['all', 'active', 'paused'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors
                      ${filter === f ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'}`}
                  >
                    {f === 'all' ? `All (${autopilots.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${autopilots.filter(a => a.status === f).length})`}
                  </button>
                ))}
              </div>
            )}
            {filtered.length === 0 && autopilots.length > 0 ? (
              <div className="text-center py-12 text-sm text-gray-400">No {filter} autopilots.</div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#F0FDF4] flex items-center justify-center mb-4"><Zap size={28} className="text-[#25D366]" /></div>
                <h3 className="text-base font-bold text-gray-800 mb-1">No autopilots yet</h3>
                <p className="text-sm text-gray-400 mb-6 max-w-xs">Set up your first autopilot to start auto-replying to WhatsApp messages 24/7.</p>
                <Link to="/autopilot" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5a] transition-colors"><Plus size={16} /> Create your first Autopilot</Link>
              </div>
            ) : (
              <div className="grid gap-3">
                {filtered.map(ap => (
                  <AutopilotCard key={ap.id} autopilot={ap} onToggleStatus={toggleStatus} onDelete={confirmDelete} onOpenDetail={setDetailTarget} />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Send Later tab ── */}
        {activeTab === 'send-later' && (
          <SendLaterTab openCompose={showCompose} onOpenHandled={() => setShowCompose(false)} />
        )}

        {/* ── Website Bot tab ── */}
        {activeTab === 'website-bot' && <WebsiteBotTab />}

        {/* ── Alerts tab ── */}
        {activeTab === 'alerts' && (
          <AlertsTab showForm={showAlertForm} />
        )}
      </div>

      {/* Autopilot modals */}
      {deleteTarget && (
        <DeleteModal
          autopilot={autopilots.find(a => a.id === deleteTarget)}
          onConfirm={executeDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
      {detailTarget && (
        <DetailDrawer
          autopilot={autopilots.find(a => a.id === detailTarget.id) ?? detailTarget}
          onClose={() => setDetailTarget(null)}
          onToggleStatus={toggleStatus}
          onDelete={confirmDelete}
        />
      )}
    </div>
  );
}
