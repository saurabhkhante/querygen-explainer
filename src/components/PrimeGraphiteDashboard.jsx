import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart2, AlertTriangle, Truck, BookOpen, Zap,
  ChevronDown, MessageSquare, Users, Calendar,
  CheckCircle2, Clock, Shield, Sparkles,
  Lock, TrendingDown, Image as ImgIcon, Info
} from 'lucide-react';

/* ─── tokens ────────────────────────────────────── */
const T = {
  navy:   '#0d1427',
  navyMid:'#1a1a2e',
  orange: '#ff6b35',
  green:  '#25d366',
  cream:  '#f8f9fc',
  ink:    '#0f172a',
  muted:  '#64748b',
  border: 'rgba(15,23,42,0.08)',
  card:   '#ffffff',
  shadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
};
const font = { fontFamily: "'DM Sans', ui-sans-serif, sans-serif" };

/* ─── language context ───────────────────────────── */
const LangCtx = createContext('en');
const useLang = () => useContext(LangCtx);

/* ─── animated counter ───────────────────────────── */
function Counter({ to, duration = 1200 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let s = null;
    const tick = (ts) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [to, duration]);
  return val;
}

/* ─── tooltip ────────────────────────────────────── */
function InfoTip({ en, mr }) {
  const lang = useLang();
  const text = lang === 'mr' ? mr : en;
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const btnRef = useRef(null);

  const openTip = (e) => {
    e.stopPropagation();
    const rect = btnRef.current.getBoundingClientRect();
    const tipW = 240;
    let x = rect.left + rect.width / 2 - tipW / 2;
    x = Math.max(10, Math.min(x, window.innerWidth - tipW - 10));
    setPos({ x, y: rect.bottom + 8 });
    setShow(true);
  };

  useEffect(() => {
    if (!show) return;
    const close = () => setShow(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [show]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={openTip}
        className="inline-flex items-center justify-center rounded-full transition-colors"
        style={{ width: 16, height: 16, color: '#94a3b8', background: '#f1f5f9', flexShrink: 0, border: 'none', cursor: 'pointer' }}
        onMouseEnter={openTip}
        onMouseLeave={() => setShow(false)}
      >
        <Info size={9} />
      </button>
      {show && createPortal(
        <motion.div
          initial={{ opacity: 0, y: -4, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'fixed',
            left: pos.x,
            top: pos.y,
            zIndex: 99999,
            width: 240,
            background: '#0f172a',
            color: '#e2e8f0',
            padding: '10px 13px',
            borderRadius: 12,
            fontSize: 12,
            lineHeight: 1.6,
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            pointerEvents: 'none',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <div style={{
            position: 'absolute', top: -5, left: pos.x + 120 - pos.x > pos.x ? 20 : 200,
            width: 10, height: 5,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderBottom: '5px solid #0f172a',
          }} />
          {text}
        </motion.div>,
        document.body
      )}
    </>
  );
}

/* ─── data ───────────────────────────────────────── */
const STAGES = [
  { label: 'General Coordination', count: 140, pct: 56, color: '#6366f1' },
  { label: 'Scorecard Compliance', count: 36,  pct: 14, color: T.orange },
  { label: 'Training & Coaching',  count: 26,  pct: 10, color: T.green },
  { label: 'Dispatch Planning',    count: 20,  pct: 8,  color: '#0ea5e9' },
  { label: 'Leave / Attendance',   count: 15,  pct: 6,  color: '#f59e0b' },
  { label: 'HR & Engagement',      count: 8,   pct: 3,  color: '#a78bfa' },
  { label: 'Audit & Review',       count: 8,   pct: 3,  color: '#f43f5e' },
  { label: 'Power / Utility Risk', count: 3,   pct: 1,  color: '#ef4444' },
];

const TEAM = [
  { name: 'Shivaji Ukhirde',      msgs: 51, role: 'Compliance / Reporting Owner',    initials:'SU', accent:'#ff6b35' },
  { name: 'Chetan Raut',          msgs: 41, role: 'Compliance / Reporting Owner',    initials:'CR', accent:'#6366f1' },
  { name: '~ primefactory Prime', msgs: 39, role: 'Cell Training Lead',              initials:'PP', accent:'#25d366' },
  { name: 'Ashish Boss',          msgs: 24, role: 'Production Dispatch Coordinator', initials:'AB', accent:'#0ea5e9' },
  { name: 'Baban Taware',         msgs: 23, role: 'Production Dispatch Coordinator', initials:'BT', accent:'#0ea5e9' },
  { name: 'Abhijeet Bhave',       msgs: 16, role: 'HR / Admin Coordinator',          initials:'AB', accent:'#a78bfa' },
  { name: 'Nitin Office',         msgs: 15, role: 'HR / Admin Coordinator',          initials:'NO', accent:'#a78bfa' },
  { name: 'Abhijeet Pawar',       msgs: 13, role: 'Production Dispatch Coordinator', initials:'AP', accent:'#f59e0b' },
  { name: 'Devidas Pawar',        msgs: 12, role: 'Production Dispatch Coordinator', initials:'DP', accent:'#f59e0b' },
  { name: 'Atul Sonar',           msgs: 8,  role: 'Operations Participant',          initials:'AS', accent:'#94a3b8' },
];

const FLAGS = [
  { id:'c1',  date:'Mar 11', persons:['Vijay S'],                  issue:'No report fill-up',   card:'PGF Score Card (10-Mar)', excerpt:'*10-03-2026 PGF SCORE CARD FOR GL* @Shivaji Ukhirde kindly check no report fill up by Vijay S.' },
  { id:'c2',  date:'Mar 13', persons:['Vijay S','Abhijeet P'],     issue:'No report fill-up',   card:'PGF Score Card (12-Mar)', excerpt:'@Shivaji Ukhirde kindly check No report fill up by Vijay S & Abhijeet P' },
  { id:'c3',  date:'Mar 24', persons:['Abhijeet Pawar'],           issue:'Low score flagged',   card:'PGF Score Card (23-Mar)', excerpt:'*23-03-2026 PGF SCORE CARD FOR GL* @Shivaji Ukhirde kindly check low score of @Abhijeet Pawar' },
  { id:'c4',  date:'Mar 30', persons:['Vijay S'],                  issue:'No report fill-up',   card:'PGF Score Card (27-Mar)', excerpt:'*27-03-2026 PGF SCORE CARD FOR GL* @Shivaji Ukhirde Bhau, kindly check no report Fill up by vijay S' },
  { id:'c5',  date:'Mar 30', persons:['Raju P','Vijay S'],         issue:'No fill + low score', card:'PGF Score Card (GL)',     excerpt:'*PGF SCORE CARD FOR GL* @Shivaji Ukhirde bhau, kindly check no report fill up by raju p & vijay s & low score of vijay s' },
  { id:'c6',  date:'Mar 31', persons:['Vijay S'],                  issue:'No report fill-up',   card:'PGF Score Card (30-Mar)', excerpt:'*30-03-2026 PGF SCORE CARD FOR GL* @Shivaji Ukhirde bhau, kindly check no report fill up by Vijay S' },
  { id:'c7',  date:'Apr 1',  persons:['Vijay S'],                  issue:'No report fill-up',   card:'PGF Score Card (31-Mar)', excerpt:'*31-03-2026 PGF SCORE CARD FOR GL* @Shivaji Ukhirde bhau, kindly check no report fill up by Vijay S' },
  { id:'c8',  date:'Apr 2',  persons:['Vijay S'],                  issue:'Low score',           card:'PGF Score Card (01-Apr)', excerpt:'*01-04-2026 PGF SCORE CARD FOR GL* @Shivaji Ukhirde bhau, kindly check low score of Vijay S' },
  { id:'c9',  date:'Apr 6',  persons:['Abhijeet Pawar'],           issue:'No report fill-up',   card:'PGF Score Card (05-Apr)', excerpt:'*05-04-2026 PGF SCORE CARD FOR GL* @Shivaji Ukhirde bhau, kindly check no report Fill up by @Abhijeet Pawar' },
  { id:'c10', date:'Apr 10', persons:['Abhijeet Pawar'],           issue:'Low score',           card:'PGF Score Card (09-Apr)', excerpt:'*09-04-2026 PGF SCORE CARD FOR GL* @Shivaji Ukhirde kindly check low score of @Abhijeet Pawar' },
  { id:'c11', date:'Apr 10', persons:['Abhijeet Pawar','Vijay S'], issue:'No report fill-up',   card:'PGF Score Card (10-Apr)', excerpt:'*10-04-2026 .PGF SCORE CARD FOR GL* @Shivaji Ukhirde kindly check no report fill up by @Abhijeet Pawar & vijay S.' },
];

const FLAG_MAP = { '03-11':1,'03-13':1,'03-24':1,'03-30':2,'03-31':1,'04-01':1,'04-02':1,'04-06':1,'04-10':2 };
const CAL_WEEKS = (() => {
  const start = new Date(2026, 2, 9);
  return Array.from({ length: 7 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const dt = new Date(start); dt.setDate(start.getDate() + w*7 + d);
      const mm = String(dt.getMonth()+1).padStart(2,'0'), dd = String(dt.getDate()).padStart(2,'0');
      const key = `${mm}-${dd}`;
      const op = (mm==='03'&&dt.getDate()>=10)||(mm==='04'&&dt.getDate()<=20);
      return { key, dt, flags: FLAG_MAP[key]||0, op, label:`${dt.toLocaleString('en',{month:'short'})} ${dt.getDate()}` };
    })
  );
})();

const DISPATCH = [
  { id:'d1',  date:'Apr 19', actor:'Shivaji Ukhirde', note:'Next-day Machining Order dispatch',                            confirmed:false },
  { id:'d2',  date:'Apr 16', actor:'Shivaji Ukhirde', note:'Next-day order dispatch plan',                                 confirmed:false },
  { id:'d3',  date:'Apr 12', actor:'Shivaji Ukhirde', note:'Next-day Machining Order dispatch',                            confirmed:false },
  { id:'d4',  date:'Apr 10', actor:'Abhijeet Pawar',  note:'Chaudhri Sir gemba — dispatch review context',                 confirmed:false },
  { id:'d5',  date:'Apr 7',  actor:'Shivaji Ukhirde', note:'Next-day: Schneider Ele, Trivikram Gr, Schuld — urgent',       confirmed:false },
  { id:'d6',  date:'Apr 6',  actor:'Baban Taware',    note:'Bin material ~3.5MT to Alisha',                                confirmed:false },
  { id:'d7',  date:'Apr 6',  actor:'Shivaji Ukhirde', note:'Next-day order schedule',                                      confirmed:false },
  { id:'d8',  date:'Apr 5',  actor:'Shivaji Ukhirde', note:'Next-day order dispatch',                                      confirmed:false },
  { id:'d9',  date:'Mar 29', actor:'Shivaji Ukhirde', note:'Same-day + Laxmi Vacuum urgent + next-day plan',               confirmed:false },
  { id:'d10', date:'Mar 26', actor:'Shivaji Ukhirde', note:'Next-day Machining Order dispatch',                            confirmed:false },
  { id:'d11', date:'Mar 23', actor:'Shivaji Ukhirde', note:'Next-day Machining Order dispatch',                            confirmed:false },
  { id:'d12', date:'Mar 22', actor:'Shivaji Ukhirde', note:'Same-day order dispatch',                                      confirmed:false },
  { id:'d13', date:'Mar 20', actor:'Shivaji Ukhirde', note:'Sunday — Lakshmi Vacuum urgent',                               confirmed:false },
  { id:'d14', date:'Mar 16', actor:'Shivaji Ukhirde', note:'Next-day dispatch schedule',                                   confirmed:false },
  { id:'d15', date:'Mar 15', actor:'Shivaji Ukhirde', note:'Next-day order priority',                                      confirmed:false },
  { id:'d16', date:'Mar 12', actor:'Shivaji Ukhirde', note:'Next-day Machining Order',                                     confirmed:false },
  { id:'d17', date:'Mar 12', actor:'Baban Taware',    note:'12MT: Dry Powder 5MT + Wet Powder 6MT + Bin 1MT',              confirmed:true, closure:'12,635 kg dispatched — confirmed same day' },
  { id:'d18', date:'Mar 10', actor:'Shivaji Ukhirde', note:'Next-day Machining Orders',                                    confirmed:false },
];

const TRAINING = [
  { id:'t1',  date:'Apr 17', cell:'Hilti',    topic:'Super degree & chamfer setting',        trainer:'Raju P',    trainees:['Mayur'] },
  { id:'t2',  date:'Apr 16', cell:'Lathe',    topic:'HFCL big job OD turning',               trainer:'Sharad B',  trainees:['Shivam P','Rupesh J'] },
  { id:'t3',  date:'Apr 14', cell:'Lathe',    topic:'Ace nut tapping M24×3mm',               trainer:'Sandip C',  trainees:['Shivam P','Sharad B','Rupesh J','Khusal D','Balu K'] },
  { id:'t4',  date:'Apr 13', cell:'Lathe',    topic:'Hilti job radius machining',             trainer:'Sandip C',  trainees:['Shivam P','Balu K','Sharad B'] },
  { id:'t5',  date:'Apr 13', cell:'Grinding', topic:'Tharmax & NMRL plate sanding',          trainer:'Raju P',    trainees:['New trainee'] },
  { id:'t6',  date:'Apr 10', cell:'Lathe',    topic:'Hilti job radius machining SR8',         trainer:'Sandip C',  trainees:['Shivam P','Sharad K','Bhagwan D'] },
  { id:'t7',  date:'Apr 7',  cell:'Lathe',    topic:'Rotar ID threading M60×4mm',            trainer:'Sandip C',  trainees:['Balu K','Bhagwan D','Sharad K'] },
  { id:'t8',  date:'Apr 6',  cell:'Lathe',    topic:'Trivikram job accent eccentric step',    trainer:'Sandip C',  trainees:['Balu K','Shivam P','Sharad B','Rupesh J'] },
  { id:'t9',  date:'Apr 3',  cell:'Lathe',    topic:'Kenametals Ring step ID machining',      trainer:'Sandip C',  trainees:['Bhagwan D','Khusal D'] },
  { id:'t10', date:'Apr 3',  cell:'Grinding', topic:'Arj 1mm plate clamping & machining',    trainer:'Dhanraj',   trainees:['Sanskar'] },
  { id:'t11', date:'Apr 2',  cell:'Hilti',    topic:'Ware nut flat rough & finish',           trainer:'Raju P',    trainees:['Mayur','Shidart'] },
  { id:'t12', date:'Mar 31', cell:'Lathe',    topic:'Alicon shaft radius machining',          trainer:'Sandip C',  trainees:['Khusal D','Bhagwan D'] },
  { id:'t13', date:'Mar 31', cell:'Hilti',    topic:'Hilti grooving step lot (new trainees)', trainer:'Raju P',    trainees:['Rohit','Nikhil'] },
  { id:'t14', date:'Mar 29', cell:'Lathe',    topic:'Hilti job radius machining',             trainer:'Sandip C',  trainees:['Sharad K','Rupesh J','Bhagwan D'] },
  { id:'t15', date:'Mar 26', cell:'Lathe',    topic:'Ramratan OD degree machining',           trainer:'Sandip C',  trainees:['Khusal D','Bhagwan D'] },
  { id:'t16', date:'Mar 25', cell:'Hilti',    topic:'Hilti thickness grooving rough+finish',  trainer:'Gaurav',    trainees:['Kunal','Ravi'] },
  { id:'t17', date:'Mar 24', cell:'Lathe',    topic:'Trivikram ID polishing',                 trainer:'Sandip C',  trainees:['Shivam P','Rupesh J'] },
  { id:'t18', date:'Mar 18', cell:'Lathe',    topic:'Length machining',                       trainer:'Sandip C',  trainees:['Sharad K','Khushal D'] },
  { id:'t19', date:'Mar 17', cell:'Hilti',    topic:'Hilti grooving + CP-02 reading',         trainer:'Raju P',    trainees:['Shubham','Dipak'] },
  { id:'t20', date:'Mar 17', cell:'Lathe',    topic:'Manu metal step ID machining',           trainer:'SM Shaikh', trainees:['Shivam P','Rupesh J'] },
  { id:'t21', date:'Mar 16', cell:'Cutting',  topic:'Hil Ti plate parting',                   trainer:'Chetan',    trainees:['Rutik W','Ratan B'] },
  { id:'t22', date:'Mar 13', cell:'Lathe',    topic:'DFM pin L/R and F',                      trainer:'Aabed',     trainees:['Ravi','Kantilal'] },
  { id:'t23', date:'Mar 13', cell:'Lathe',    topic:'OD threading machining',                 trainer:'SMS',       trainees:['Balu K','Bhagwan D'] },
  { id:'t24', date:'Mar 10', cell:'Hilti',    topic:'Plate thickness, vacuum table clamping', trainer:'Raju P',    trainees:['Shubham','Ravi'] },
  { id:'t25', date:'Mar 10', cell:'Lathe',    topic:'Drawing reading knowledge',              trainer:'RDD',       trainees:['Sharad B','Khushal D','Rupesh J','Sharad Kadali'] },
];
const TRAINER_MAP = TRAINING.reduce((a,s)=>{ a[s.trainer]=(a[s.trainer]||0)+1; return a; }, {});
const TRAINERS = Object.entries(TRAINER_MAP).sort((a,b)=>b[1]-a[1]);
const TRAINEE_SLOTS = TRAINING.reduce((a,s)=>a+s.trainees.length, 0);

const INCIDENTS = [
  { id:'i1', date:'Mar 18', type:'power', sev:'high',   title:'MSEB Substation Feeder Breakdown', desc:'No power in Palkhed MIDC from 12:45pm.',              reporter:'Shivaji Ukhirde',   status:'resolved', excerpt:'MSEB, Substation Feeder BreakDown si From 12:45pm. No power in Palkhed MIDC.' },
  { id:'i2', date:'Apr 2',  type:'power', sev:'high',   title:'Power Outage — Heavy Rain',         desc:'No power in PGF since 6pm due to heavy rain.',        reporter:'primefactory Prime', status:'resolved', excerpt:'No power in PGF since 6.00Pm due to heavy rain.' },
  { id:'i3', date:'Apr 20', type:'power', sev:'medium', title:'Power Not Available',               desc:'Power unavailable — cause not stated.',               reporter:'primefactory Prime', status:'open',     excerpt:'Power not available' },
  { id:'i4', date:'Mar 13', type:'audit', sev:'medium', title:'Report Filling Issue — GL PE Meeting',desc:'Google Form non-compliance escalated. Scorecard score down.', reporter:'Shivaji Ukhirde', status:'open', excerpt:'Yes Sir, Today Afternoon GL PE Meeting done. Regarding Google Form Report Filling E regular Update Issue. Update Weekly Score Card Score down.' },
  { id:'i5', date:'Mar 20', type:'audit', sev:'high',   title:'ISO External Audit — Mar 24–25',   desc:'ISO Audit 2025-26 at Dindori Plant.',                 reporter:'Abhijeet Bhave',    status:'resolved', excerpt:'On 24th & 25th March 2026 We have planned External Audit ISO AUDIT of 2025-26.' },
  { id:'i6', date:'Mar 27', type:'audit', sev:'high',   title:'Gemba Round — Points Identified',   desc:'Chaudhri Sir gemba walk. PSR/QSR + PE/GL bundles reviewed.', reporter:'Abhijeet Pawar', status:'open', excerpt:"During today's visit by Chaudhri Sir, conducted shop floor gemba round with the entire team. Points identified during today's visit." },
  { id:'i7', date:'Apr 10', type:'audit', sev:'medium', title:'Visit: Only 1 GL Present',          desc:"Review meeting cancelled. Awareness session given instead.", reporter:'Abhijeet Pawar', status:'open', excerpt:"Today only one GL was available, so the review meeting could not be conducted. Therefore, Atul Sir provided awareness." },
  { id:'i8', date:'Apr 11', type:'audit', sev:'medium', title:'Cumulative Small Issues Flagged',   desc:'Ashish Boss: small issues, large collective impact.',  reporter:'Ashish Boss',       status:'open',     excerpt:"These are small issues that can be completed easily but will have a big impact cumulatively." },
];

/* ─── tooltip copy ───────────────────────────────── */
const TIP = {
  kpi_messages:   { en:"Total operational messages extracted from the Prime Reporting Group WhatsApp chat. 2 system messages excluded.", mr:"Prime Reporting Group WhatsApp चॅटमधून काढलेले एकूण संदेश. २ system संदेश वगळले आहेत." },
  kpi_days:       { en:"Days with at least one message posted, between Mar 10 and Apr 20, 2026.", mr:"१० मार्च ते २० एप्रिल २०२६ दरम्यान किमान एक संदेश असलेले दिवस." },
  kpi_team:       { en:"Unique people who sent at least one message. Includes 1 system account.", mr:"किमान एक संदेश पाठवणारे सदस्य. १ system खाते समाविष्ट." },
  kpi_media:      { en:"Photos, videos, and documents shared in the group. Content not extracted — count only.", mr:"गटात शेअर केलेले फोटो, व्हिडिओ आणि कागदपत्रे. आशय नाही — फक्त संख्या." },
  stage_chart:    { en:"Each message was tagged to a workflow category using keyword analysis. 'General Coordination' captures messages that didn't clearly fit other categories.", mr:"प्रत्येक संदेशाला कीवर्ड विश्लेषणाने श्रेणी दिली. 'General Coordination' मध्ये इतर श्रेणीत न बसणारे संदेश आहेत." },
  team_activity:  { en:"Message count per participant. Higher count = more operational involvement. Note: dispatchers and trainers post fewer but more structured messages.", mr:"प्रत्येक सदस्याचे संदेश. जास्त संदेश = जास्त सहभाग. नोंद: काही कमी पण महत्त्वाचे संदेश पाठवतात." },
  compliance_alert:{ en:"Chetan Raut flagged non-compliance 11 times in 41 days — once every 4 days on average. Same 2–3 names keep recurring. This points to a systemic gap, not one-off mistakes.", mr:"चेतन राऊत यांनी ४१ दिवसांत ११ वेळा नियम-पालन न झाल्याचे कळवले — दर ४ दिवसांनी एकदा. त्याच नावांची पुनरावृत्ती आहे. हे यंत्रणेतील त्रुटी आहे, वैयक्तिक चूक नाही." },
  risk_vijay:     { en:"Vijay S appears in 9 of 11 flags — including 6 consecutive days (Mar 30–Apr 2). Likely a systemic barrier to completing the Google Form report, not unwillingness.", mr:"विजय S ११ पैकी ९ तक्रारींमध्ये — सलग ६ दिवस (३० मार्च–२ एप्रिल). Google Form भरण्यात अडथळा असण्याची शक्यता, अनिच्छा नाही." },
  risk_abhijeet:  { en:"Abhijeet Pawar has 5 flags — 2 for 'no fill' and 3 for 'low score'. Three flags came in April alone, suggesting a worsening trend.", mr:"अभिजीत पवार यांना ५ तक्रारी — २ 'fill नाही' आणि ३ 'कमी score'. ३ तक्रारी एप्रिलमध्येच, ट्रेंड वाढत आहे." },
  cal_heatmap:    { en:"Each square = one calendar day in the 41-day window. Orange = 1 compliance flag raised. Red = 2 flags same day. Grey = clean operational day. Empty = outside window.", mr:"प्रत्येक चौकोन = एक दिवस. नारंगी = १ तक्रार. लाल = त्याच दिवशी २ तक्रारी. राखाडी = स्वच्छ दिवस. रिकामे = कामाच्या वेळेबाहेर." },
  dispatch_plans: { en:"20 dispatch planning messages sent — mostly next-day schedules posted by Shivaji Ukhirde in the evening.", mr:"२० डिस्पॅच नियोजन संदेश — बहुतेक शिवाजी उखिर्डे यांनी संध्याकाळी उद्याच्या वेळापत्रकासाठी." },
  dispatch_conf:  { en:"Only 1 dispatch had an explicit closure confirmation in this same chat (Baban Taware, Mar 12 — 12,635 kg). This does NOT mean others failed. They may be tracked in ERP or Sheets.", mr:"फक्त १ डिस्पॅचची पुष्टी या चॅटमध्ये आहे (बाबन तावरे, १२ मार्च — १२,६३५ kg). बाकी अपूर्ण आहेत असे नाही — ERP/Sheets मध्ये नोंद असेल." },
  dispatch_no:    { en:"17 plans show no closure signal in this chat. Actual dispatch likely happened but wasn't confirmed here. ERP or Google Sheets likely has the records.", mr:"१७ योजनांसाठी या चॅटमध्ये पुष्टी नाही. प्रत्यक्ष डिस्पॅच झाले असेल. ERP किंवा Sheets मध्ये नोंद असेल." },
  training_count: { en:"25 sessions over 41 days — roughly one every 1.6 days. Consistently documented by ~ primefactory Prime in a structured trainer/trainee format.", mr:"४१ दिवसांत २५ सत्रे — साधारण दर १.६ दिवसांनी एक. ~ primefactory Prime यांनी प्रशिक्षक/प्रशिक्षणार्थी स्वरूपात सातत्याने नोंद केली." },
  training_slots: { en:"Total individual trainee participations across all 25 sessions. One person in 3 sessions = 3 slots. Unique trainee count would be lower.", mr:"२५ सत्रांतील एकूण प्रशिक्षणार्थी सहभाग. एक व्यक्ती ३ सत्रांत = ३ slots. अद्वितीय प्रशिक्षणार्थी संख्या कमी असेल." },
  trainer_cov:    { en:"Sandip C leads 52% of all sessions — a single point of dependency. If unavailable, session coverage drops sharply. Consider cross-training 1–2 backup trainers.", mr:"सँडिप C ५२% सत्रे घेतात — एकट्यावर अवलंबित्व आहे. ते उपलब्ध नसल्यास सत्रे थांबतात. १-२ backup trainers तयार करण्याचा विचार करा." },
  incidents_open: { en:"5 incidents raised during this period have no documented resolution in the chat — 1 power outage (Apr 20) and 4 audit/review events.", mr:"या कालावधीतील ५ घटनांचे चॅटमध्ये निराकरण दिसत नाही — १ वीज खंडित (२० एप्रिल) आणि ४ ऑडिट/review घटना." },
  incidents_res:  { en:"3 incidents have clear resolution messages in chat — 2 power outage recoveries and the ISO External Audit completed on schedule.", mr:"३ घटनांचे चॅटमध्ये निराकरण दिसते — २ वीज प्रसंग सुटले, ISO External Audit वेळेत पूर्ण झाले." },
  power_section:  { en:"Power outages at PGF / Palkhed MIDC. Reported via WhatsApp. No SLA tracking or escalation protocol visible in this chat.", mr:"PGF / पालखेड MIDC येथे वीज खंडित. WhatsApp वर कळवले. SLA tracking किंवा escalation प्रोटोकॉल चॅटमध्ये दिसत नाही." },
  audit_section:  { en:"Audit and review events — ISO audit, Chaudhri Sir gemba visits, compliance meetings. 4 of 5 have no documented closure in this chat.", mr:"ऑडिट आणि पुनरावलोकन — ISO ऑडिट, चौधरी सर gemba भेट, compliance बैठका. ५ पैकी ४ चे निराकरण चॅटमध्ये दिसत नाही." },
};

/* ─── shared pieces ──────────────────────────────── */
const cardStyle = { background: T.card, borderRadius: 16, border:`1px solid ${T.border}`, boxShadow: T.shadow };

function Pill({ children, bg, color }) {
  return <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background:bg, color }}>{children}</span>;
}
function StatusPill({ status }) {
  return status==='resolved'
    ? <Pill bg="#dcfce7" color="#16a34a"><CheckCircle2 size={9}/> Resolved</Pill>
    : <Pill bg="#fee2e2" color="#dc2626"><Clock size={9}/> Open</Pill>;
}
function WaBubble({ text }) {
  return (
    <motion.div initial={{ opacity:0,y:-6,scale:0.97 }} animate={{ opacity:1,y:0,scale:1 }} exit={{ opacity:0,y:-4 }} transition={{ duration:0.18 }} className="mt-3 mb-1">
      <p className="text-xs font-semibold mb-1.5 flex items-center gap-1.5" style={{ color:T.muted }}>
        <span style={{ display:'inline-block',width:8,height:8,borderRadius:'50%',background:T.green }}/>
        WhatsApp · Source message
      </p>
      <div style={{ background:'#dcf8c6', borderRadius:'12px 12px 2px 12px', padding:'10px 14px', fontSize:13, lineHeight:1.5, fontFamily:"ui-monospace,'SF Mono',monospace", color:'#1a3a1a', maxWidth:500, boxShadow:'0 1px 4px rgba(0,0,0,0.1)' }}>
        {text}
      </div>
    </motion.div>
  );
}
function ExpandRow({ id, expanded, toggle, evidence, children }) {
  const open = expanded===id;
  return (
    <div>
      <button onClick={()=>toggle(open?null:id)} className="w-full text-left flex items-start justify-between gap-3 py-3.5 px-5 transition-colors rounded-sm"
        style={{ background:open?'rgba(255,107,53,0.04)':'transparent' }}
        onMouseEnter={e=>{if(!open)e.currentTarget.style.background='rgba(15,23,42,0.03)';}}
        onMouseLeave={e=>{if(!open)e.currentTarget.style.background='transparent';}}>
        <div className="flex-1 min-w-0">{children}</div>
        <motion.div animate={{ rotate: open?180:0 }} transition={{ duration:0.2 }} style={{ color:T.muted, marginTop:2, flexShrink:0 }}>
          <ChevronDown size={15}/>
        </motion.div>
      </button>
      <AnimatePresence>
        {open && <div className="px-5 pb-4"><WaBubble text={evidence}/></div>}
      </AnimatePresence>
    </div>
  );
}
function SectionLabel({ icon:Icon, children, tip }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      {Icon && <Icon size={13} style={{ color:T.muted }}/>}
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color:T.muted }}>{children}</span>
      {tip && <InfoTip {...tip}/>}
    </div>
  );
}

/* ─── tab components ─────────────────────────────── */
function OverviewTab() {
  const stagger = { hidden:{}, visible:{ transition:{ staggerChildren:0.06 } } };
  const item = { hidden:{ opacity:0,y:14 }, visible:{ opacity:1,y:0,transition:{ duration:0.35 } } };
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-4">
      <motion.div variants={item} style={cardStyle} className="p-5">
        <SectionLabel icon={BarChart2} tip={TIP.stage_chart}>Activity by Stage</SectionLabel>
        <div className="space-y-3">
          {STAGES.map((s,i)=>(
            <div key={s.label} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background:s.color }}/>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium truncate" style={{ color:T.ink }}>{s.label}</span>
                  <span className="text-xs font-bold ml-2 shrink-0" style={{ color:T.ink }}>{s.count}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background:'#f1f5f9' }}>
                  <motion.div initial={{ width:0 }} animate={{ width:`${s.pct}%` }} transition={{ duration:0.7,delay:i*0.05 }} className="h-full rounded-full" style={{ background:s.color }}/>
                </div>
              </div>
              <div className="text-xs w-8 text-right shrink-0" style={{ color:T.muted }}>{s.pct}%</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} style={cardStyle} className="p-5">
        <SectionLabel icon={Users} tip={TIP.team_activity}>Team Activity</SectionLabel>
        <div className="space-y-1">
          {TEAM.map((m,i)=>(
            <div key={m.name} className="flex items-center gap-3 py-2 px-3 rounded-xl transition-colors hover:bg-slate-50">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 text-white" style={{ background:m.accent,fontSize:10 }}>{m.initials}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold leading-tight truncate" style={{ color:T.ink }}>{m.name}</div>
                <div className="text-xs truncate mt-0.5" style={{ color:T.muted }}>{m.role}</div>
              </div>
              <div className="hidden sm:flex items-center gap-2 w-28">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background:'#f1f5f9' }}>
                  <motion.div initial={{ width:0 }} animate={{ width:`${Math.round((m.msgs/51)*100)}%` }} transition={{ duration:0.5,delay:i*0.04 }} className="h-full rounded-full" style={{ background:m.accent }}/>
                </div>
                <span className="text-xs font-bold w-5 text-right shrink-0" style={{ color:T.ink }}>{m.msgs}</span>
              </div>
              <div className="sm:hidden text-sm font-bold" style={{ color:T.ink }}>{m.msgs}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 flex items-center gap-2 text-xs" style={{ borderTop:`1px solid ${T.border}`,color:T.muted }}>
          <span style={{ display:'inline-block',width:8,height:8,borderRadius:2,background:'#f59e0b' }}/>
          25 Devanagari messages detected · Bilingual operations (EN / MR / HI)
        </div>
      </motion.div>
    </motion.div>
  );
}

function ComplianceTab() {
  const [exp, setExp] = useState(null);
  const RISK = [
    { name:'Vijay S',        count:9, badge:'HIGH RISK', bg:'#fee2e2', color:'#dc2626', note:'9 of 11 flags involve this name', tip:TIP.risk_vijay },
    { name:'Abhijeet Pawar', count:5, badge:'WATCH',     bg:'#fff7ed', color:T.orange,  note:'3 flags in April alone',          tip:TIP.risk_abhijeet },
    { name:'Raju P',         count:1, badge:'LOW',       bg:'#fefce8', color:'#ca8a04', note:'1 flag on Mar 30',                tip:null },
  ];
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl flex items-start gap-3" style={{ background:'linear-gradient(135deg,#fff7ed,#fff)',border:`1px solid ${T.orange}30`,boxShadow:`0 0 0 1px ${T.orange}20` }}>
        <AlertTriangle size={18} style={{ color:T.orange,marginTop:1 }} className="shrink-0"/>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-sm" style={{ color:T.orange }}>11 compliance flags · 41 days · same people recurring</span>
            <InfoTip {...TIP.compliance_alert}/>
          </div>
          <div className="text-xs mt-0.5" style={{ color:'#92400e' }}>All raised by <strong>Chetan Raut</strong> → escalated to <strong>Shivaji Ukhirde</strong>. No automated closure tracking.</div>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
        {RISK.map(r=>(
          <div key={r.name} className="shrink-0 rounded-2xl p-4 min-w-[155px]" style={{ ...cardStyle,borderLeft:`3px solid ${r.color}` }}>
            <div className="flex items-start justify-between gap-1 mb-2">
              <div className="text-4xl font-black leading-none" style={{ color:r.color }}>{r.count}</div>
              {r.tip && <InfoTip {...r.tip}/>}
            </div>
            <div className="font-bold text-sm mb-1.5" style={{ color:T.ink }}>{r.name}</div>
            <Pill bg={r.bg} color={r.color}>{r.badge}</Pill>
            <div className="text-xs mt-2" style={{ color:T.muted }}>{r.note}</div>
          </div>
        ))}
      </div>

      <div style={cardStyle} className="p-5">
        <SectionLabel icon={Calendar} tip={TIP.cal_heatmap}>Flag Calendar · Mar–Apr 2026</SectionLabel>
        <div>
          <div className="flex gap-1 mb-1">
            {['M','T','W','T','F','S','S'].map((d,i)=>(
              <div key={i} className="flex-1 text-center" style={{ fontSize:9,color:T.muted,fontWeight:700,letterSpacing:'0.05em' }}>{d}</div>
            ))}
          </div>
          {CAL_WEEKS.map((week,wi)=>(
            <div key={wi} className="flex gap-1 mb-1">
              {week.map(cell=>{
                const bg = !cell.op?'transparent':cell.flags===2?'#dc2626':cell.flags===1?T.orange:'#e2e8f0';
                const op = cell.op?1:0;
                return (
                  <motion.div key={cell.key} title={cell.flags>0?`${cell.label}: ${cell.flags} flag${cell.flags>1?'s':''}`:''}
                    className="flex-1 rounded cursor-default"
                    style={{ background:bg,opacity:op,aspectRatio:'1',minHeight:22 }}
                    initial={{ scale:0.4,opacity:0 }} animate={{ scale:1,opacity:op }} transition={{ delay:wi*0.04+0.05,duration:0.3 }}/>
                );
              })}
            </div>
          ))}
          <div className="flex gap-4 mt-3 items-center">
            {[['No flag','#e2e8f0'],['1 flag',T.orange],['2 flags','#dc2626']].map(([l,c])=>(
              <div key={l} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ background:c }}/>
                <span style={{ fontSize:11,color:T.muted }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={cardStyle} className="overflow-hidden">
        <div className="p-5 pb-2"><SectionLabel icon={TrendingDown}>Flag Timeline · All 11 Events</SectionLabel></div>
        <div style={{ borderTop:`1px solid ${T.border}` }}>
          {FLAGS.map(f=>(
            <div key={f.id} style={{ borderBottom:`1px solid ${T.border}` }}>
              <ExpandRow id={f.id} expanded={exp} toggle={setExp} evidence={f.excerpt}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="text-xs font-bold" style={{ color:T.muted }}>{f.date}</span>
                  <div className="flex gap-1.5 flex-wrap">{f.persons.map(p=><Pill key={p} bg="#fee2e2" color="#b91c1c">{p}</Pill>)}</div>
                  <span className="text-xs" style={{ color:T.muted }}>{f.issue}</span>
                </div>
                <div className="text-xs mt-1" style={{ color:'#94a3b8' }}>{f.card}</div>
              </ExpandRow>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DispatchTab() {
  const [exp, setExp] = useState(null);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label:'Plans Logged',       val:20, color:T.ink,   tip:TIP.dispatch_plans },
          { label:'Confirmed in Chat',  val:1,  color:T.green, tip:TIP.dispatch_conf },
          { label:'No Closure Signal',  val:17, color:'#94a3b8',tip:TIP.dispatch_no, sub:'may exist in ERP/Sheets' },
        ].map(k=>(
          <div key={k.label} style={cardStyle} className="p-4 text-center">
            <div className="text-3xl font-black leading-none" style={{ color:k.color }}>{k.val}</div>
            <div className="flex items-center justify-center gap-1 mt-1.5">
              <span className="text-xs font-semibold leading-tight" style={{ color:T.muted }}>{k.label}</span>
              <InfoTip {...k.tip}/>
            </div>
            {k.sub&&<div className="text-xs mt-1" style={{ color:'#cbd5e1',fontSize:10 }}>{k.sub}</div>}
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 p-3 rounded-xl text-xs" style={{ background:'#f8fafc',border:'1px solid #e2e8f0',color:'#64748b' }}>
        <Shield size={13} className="mt-0.5 shrink-0" style={{ color:'#94a3b8' }}/>
        Closure not visible in chat ≠ incomplete. Actual closures may exist in ERP, Google Sheets, or verbal confirmation.
      </div>

      <div style={cardStyle} className="overflow-hidden">
        <div className="p-5 pb-2"><SectionLabel icon={Truck}>Dispatch Log</SectionLabel></div>
        <div style={{ borderTop:`1px solid ${T.border}` }}>
          {DISPATCH.map(d=>(
            <div key={d.id} style={{ borderBottom:`1px solid ${T.border}`,borderLeft:`3px solid ${d.confirmed?T.green:'#e2e8f0'}` }}>
              <ExpandRow id={d.id} expanded={exp} toggle={setExp}
                evidence={d.confirmed?`Plan: ${d.note}\n\nClosure confirmed in chat:\n${d.closure}`:`Plan posted by ${d.actor}: ${d.note}\n\nNo closure confirmation visible in this chat.`}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="text-xs font-bold" style={{ color:T.muted }}>{d.date}</span>
                  <span className="text-xs font-medium" style={{ color:T.ink }}>{d.actor}</span>
                  {d.confirmed&&<Pill bg="#dcfce7" color="#16a34a"><CheckCircle2 size={9}/> {d.closure}</Pill>}
                </div>
                <div className="text-xs mt-1" style={{ color:T.muted }}>{d.note}</div>
              </ExpandRow>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrainingTab() {
  const [exp, setExp] = useState(null);
  const maxT = TRAINERS[0][1];
  const CELL_COLOR = { Lathe:'#0ea5e9',Hilti:T.orange,Grinding:'#a78bfa',Cutting:'#f59e0b' };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label:'Sessions',      val:25,          color:T.ink,   tip:TIP.training_count },
          { label:'Trainee Slots', val:TRAINEE_SLOTS, color:T.orange, tip:TIP.training_slots },
          { label:'Trainers',      val:TRAINERS.length, color:T.green, tip:null },
        ].map(k=>(
          <div key={k.label} style={cardStyle} className="p-4 text-center">
            <div className="text-3xl font-black leading-none" style={{ color:k.color }}>{k.val}</div>
            <div className="flex items-center justify-center gap-1 mt-1.5">
              <span className="text-xs font-semibold" style={{ color:T.muted }}>{k.label}</span>
              {k.tip&&<InfoTip {...k.tip}/>}
            </div>
          </div>
        ))}
      </div>

      <div style={cardStyle} className="p-5">
        <SectionLabel icon={Users} tip={TIP.trainer_cov}>Trainer Coverage</SectionLabel>
        <div className="space-y-2.5">
          {TRAINERS.map(([name,count])=>(
            <div key={name} className="flex items-center gap-3">
              <div className="w-20 text-xs font-medium truncate shrink-0" style={{ color:T.ink }}>{name}</div>
              <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background:'#f1f5f9' }}>
                <motion.div initial={{ width:0 }} animate={{ width:`${Math.round((count/maxT)*100)}%` }} transition={{ duration:0.6 }} className="h-full rounded-full" style={{ background:name==='Sandip C'?T.navyMid:name==='Raju P'?T.orange:T.green }}/>
              </div>
              <div className="text-xs font-black w-5 text-right shrink-0" style={{ color:T.ink }}>{count}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 text-xs" style={{ borderTop:`1px solid ${T.border}`,color:T.muted }}>
          Sandip C leads <strong>52%</strong> of all sessions · Consistently documented daily
        </div>
      </div>

      <div style={cardStyle} className="overflow-hidden">
        <div className="p-5 pb-2"><SectionLabel icon={BookOpen}>Session Log · 25 sessions</SectionLabel></div>
        <div style={{ borderTop:`1px solid ${T.border}` }}>
          {TRAINING.map(s=>(
            <div key={s.id} style={{ borderBottom:`1px solid ${T.border}`,borderLeft:`3px solid ${CELL_COLOR[s.cell]||'#e2e8f0'}` }}>
              <ExpandRow id={s.id} expanded={exp} toggle={setExp}
                evidence={`Today's training and coaching — ${s.cell} Cell\nTopic: ${s.topic}\nTrainer: ${s.trainer}\nTrainees: ${s.trainees.join(', ')}`}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="text-xs font-bold" style={{ color:T.muted }}>{s.date}</span>
                  <Pill bg={`${CELL_COLOR[s.cell]||'#e2e8f0'}18`} color={CELL_COLOR[s.cell]||T.muted}>{s.cell}</Pill>
                  <span className="text-xs font-medium" style={{ color:T.ink }}>{s.trainer}</span>
                </div>
                <div className="text-xs mt-1 font-medium" style={{ color:T.ink }}>{s.topic}</div>
                <div className="text-xs mt-0.5" style={{ color:'#94a3b8' }}>{s.trainees.join(' · ')}</div>
              </ExpandRow>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IncidentsTab() {
  const [exp, setExp] = useState(null);
  const power = INCIDENTS.filter(i=>i.type==='power');
  const audit = INCIDENTS.filter(i=>i.type==='audit');
  const openCount = INCIDENTS.filter(i=>i.status==='open').length;

  function IncRow({ item }) {
    const sevColor = item.sev==='high'?'#dc2626':'#f59e0b';
    const leftColor = item.type==='power'?'#f59e0b':'#6366f1';
    return (
      <div style={{ borderBottom:`1px solid ${T.border}`,borderLeft:`3px solid ${leftColor}` }}>
        <ExpandRow id={item.id} expanded={exp} toggle={setExp} evidence={item.excerpt}>
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
            <span className="text-xs font-bold" style={{ color:T.muted }}>{item.date}</span>
            <Pill bg={item.sev==='high'?'#fee2e2':'#fff7ed'} color={sevColor}>{item.sev.toUpperCase()}</Pill>
            <StatusPill status={item.status}/>
          </div>
          <div className="text-sm font-bold mt-1" style={{ color:T.ink }}>{item.title}</div>
          <div className="text-xs mt-0.5" style={{ color:T.muted }}>{item.desc}</div>
          <div className="text-xs mt-1" style={{ color:'#94a3b8' }}>Reported by: {item.reporter}</div>
        </ExpandRow>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div style={{ ...cardStyle,borderLeft:'3px solid #dc2626' }} className="p-4 text-center">
          <div className="text-3xl font-black" style={{ color:'#dc2626' }}>{openCount}</div>
          <div className="flex items-center justify-center gap-1 mt-1">
            <span className="text-xs font-semibold" style={{ color:T.muted }}>Open Items</span>
            <InfoTip {...TIP.incidents_open}/>
          </div>
        </div>
        <div style={{ ...cardStyle,borderLeft:`3px solid ${T.green}` }} className="p-4 text-center">
          <div className="text-3xl font-black" style={{ color:T.green }}>{INCIDENTS.length-openCount}</div>
          <div className="flex items-center justify-center gap-1 mt-1">
            <span className="text-xs font-semibold" style={{ color:T.muted }}>Resolved</span>
            <InfoTip {...TIP.incidents_res}/>
          </div>
        </div>
      </div>

      <div style={cardStyle} className="overflow-hidden">
        <div className="p-5 pb-2 flex items-center gap-2">
          <Zap size={14} style={{ color:'#f59e0b' }}/>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color:T.muted }}>Power / Utility · 3 events</span>
          <InfoTip {...TIP.power_section}/>
        </div>
        <div style={{ borderTop:`1px solid ${T.border}` }}>
          {power.map(i=><IncRow key={i.id} item={i}/>)}
        </div>
      </div>

      <div style={cardStyle} className="overflow-hidden">
        <div className="p-5 pb-2 flex items-center gap-2">
          <Shield size={14} style={{ color:'#6366f1' }}/>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color:T.muted }}>Audit & Review · 5 events</span>
          <InfoTip {...TIP.audit_section}/>
        </div>
        <div style={{ borderTop:`1px solid ${T.border}` }}>
          {audit.map(i=><IncRow key={i.id} item={i}/>)}
        </div>
      </div>
    </div>
  );
}

/* ─── main ───────────────────────────────────────── */
const TABS = [
  { id:'overview',   label:'Overview',   Icon:BarChart2,    badge:null },
  { id:'compliance', label:'Compliance', Icon:AlertTriangle, badge:'11' },
  { id:'dispatch',   label:'Dispatch',   Icon:Truck,         badge:null },
  { id:'training',   label:'Training',   Icon:BookOpen,      badge:'25' },
  { id:'incidents',  label:'Incidents',  Icon:Zap,           badge:'5' },
];

const KPI_CONFIG = [
  { label:'Messages',     val:251, sub:'operational signals', Icon:MessageSquare, tip:TIP.kpi_messages },
  { label:'Active Days',  val:41,  sub:'Mar–Apr 2026',        Icon:Calendar,      tip:TIP.kpi_days },
  { label:'Team Members', val:13,  sub:'active participants', Icon:Users,         tip:TIP.kpi_team },
  { label:'Media Items',  val:135, sub:'images + files',      Icon:ImgIcon,       tip:TIP.kpi_media },
];

export default function PrimeGraphiteDashboard() {
  const [tab, setTab] = useState('overview');
  const [lang, setLang] = useState('en');

  return (
    <LangCtx.Provider value={lang}>
      <div style={{ ...font, background:T.cream, minHeight:'100vh' }}>

        {/* ── header ─────────────────────────────── */}
        <header style={{ background:'linear-gradient(155deg,#060b18 0%,#0d1427 30%,#111d38 65%,#182040 100%)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute',inset:0,opacity:0.15,backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.5) 1px,transparent 1px)',backgroundSize:'24px 24px',pointerEvents:'none' }}/>
          <div className="max-w-4xl mx-auto px-4 pt-8 pb-7 relative">
            <div className="flex items-start justify-between gap-4 mb-7">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <motion.div animate={{ opacity:[1,0.4,1] }} transition={{ repeat:Infinity,duration:2 }}
                    style={{ width:7,height:7,borderRadius:'50%',background:T.green,boxShadow:`0 0 8px ${T.green}` }}/>
                  <span className="text-xs font-black uppercase tracking-[0.18em]" style={{ color:T.green }}>Operations · Mar 10 – Apr 20, 2026</span>
                </div>
                <h1 className="font-black text-white leading-none tracking-tight" style={{ fontSize:'clamp(26px,5vw,38px)' }}>Prime Graphite</h1>
                <p className="text-sm mt-2" style={{ color:'rgba(255,255,255,0.5)' }}>Prime Reporting Group · WhatsApp Intelligence</p>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color:'rgba(255,255,255,0.3)' }}>Powered by</div>
                <div className="font-black text-base" style={{ color:T.green }}>QueryGen</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {KPI_CONFIG.map((k,i)=>(
                <motion.div key={k.label} initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*0.08,duration:0.4 }}
                  style={{ background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:14,backdropFilter:'blur(8px)',padding:'12px 14px' }}>
                  <div className="flex items-start justify-between mb-2">
                    <k.Icon size={13} style={{ color:'rgba(255,255,255,0.35)' }}/>
                    <span style={{ opacity:0.6 }}><InfoTip {...k.tip}/></span>
                  </div>
                  <div className="text-2xl font-black text-white leading-none"><Counter to={k.val} duration={1000+i*100}/></div>
                  <div className="text-xs font-semibold text-white mt-1 opacity-75">{k.label}</div>
                  <div className="text-xs mt-0.5" style={{ color:'rgba(255,255,255,0.35)' }}>{k.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </header>

        {/* ── sticky bar: tabs + language toggle ─── */}
        <div className="sticky top-0 z-20 bg-white" style={{ borderBottom:`1px solid ${T.border}`,boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
          <div className="max-w-4xl mx-auto px-2 sm:px-4 flex items-center">
            {/* tabs */}
            <div className="flex overflow-x-auto gap-0 flex-1" style={{ scrollbarWidth:'none' }}>
              {TABS.map(({ id,label,Icon,badge })=>{
                const active = tab===id;
                return (
                  <button key={id} onClick={()=>setTab(id)}
                    className="relative flex items-center gap-1.5 px-3 sm:px-4 py-3.5 text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-colors"
                    style={{ color:active?T.orange:T.muted,background:'none',outline:'none',border:'none' }}>
                    <Icon size={13}/>
                    {label}
                    {badge&&<span className="text-xs font-black px-1.5 py-0.5 rounded-full leading-none" style={{ background:active?T.orange:'#f1f5f9',color:active?'#fff':T.muted,fontSize:10 }}>{badge}</span>}
                    {active&&<motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background:T.orange }} transition={{ type:'spring',stiffness:400,damping:30 }}/>}
                  </button>
                );
              })}
            </div>

            {/* language toggle */}
            <div className="shrink-0 flex items-center gap-2 pl-3 pr-1 border-l" style={{ borderColor:T.border }}>
              <span className="text-xs hidden sm:inline" style={{ color:'#94a3b8' }}>Language:</span>
              {[['en','EN'],['mr','मराठी']].map(([val,lbl])=>(
                <button key={val} onClick={()=>setLang(val)}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all"
                  style={{
                    background: lang===val ? T.navy : 'transparent',
                    color: lang===val ? '#fff' : T.muted,
                    border: `1px solid ${lang===val ? T.navy : T.border}`,
                  }}>
                  {lbl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── tab content ─────────────────────────── */}
        <main className="max-w-4xl mx-auto px-4 py-6">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-6 }} transition={{ duration:0.2 }}>
              {tab==='overview'   && <OverviewTab/>}
              {tab==='compliance' && <ComplianceTab/>}
              {tab==='dispatch'   && <DispatchTab/>}
              {tab==='training'   && <TrainingTab/>}
              {tab==='incidents'  && <IncidentsTab/>}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* ── vision teaser ───────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 pb-4">
          <div className="rounded-2xl p-5 overflow-hidden relative" style={{ background:'linear-gradient(135deg,#0d1427 0%,#1a1a2e 100%)',border:'1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ position:'absolute',inset:0,opacity:0.06,backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.8) 1px,transparent 1px)',backgroundSize:'20px 20px',pointerEvents:'none' }}/>
            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={13} style={{ color:T.green }}/>
                <span className="text-xs font-black uppercase tracking-widest" style={{ color:T.green }}>What's coming</span>
              </div>
              <p className="text-xs mb-4" style={{ color:'rgba(255,255,255,0.4)' }}>
                This preview was built from your WhatsApp data. A live dashboard would update automatically every day.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { label:'Auto-sync from WhatsApp',       sub:'Zero manual work — daily extraction' },
                  { label:'Compliance Alert Notifications', sub:'Ping owners before it escalates' },
                  { label:'Export to Google Sheets / ERP',  sub:'Structured data wherever you need it' },
                ].map(f=>(
                  <div key={f.label} className="flex items-start gap-2.5 p-3 rounded-xl" style={{ background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)' }}>
                    <Lock size={11} style={{ color:'rgba(255,255,255,0.25)',marginTop:2 }} className="shrink-0"/>
                    <div>
                      <div className="text-xs font-bold text-white">{f.label}</div>
                      <div className="text-xs mt-0.5" style={{ color:'rgba(255,255,255,0.35)' }}>{f.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── footer ──────────────────────────────── */}
        <footer className="max-w-4xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="text-xs font-bold" style={{ color:'#94a3b8' }}>
            <span style={{ color:T.green }}>QueryGen</span> · Built for operations teams that run on WhatsApp
          </div>
          <div className="text-xs" style={{ color:'#cbd5e1' }}>Data extracted from WhatsApp · Prototype preview</div>
        </footer>

      </div>
    </LangCtx.Provider>
  );
}
