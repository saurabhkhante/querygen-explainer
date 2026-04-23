import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import FrontSide from './components/FrontSide';
import BackSide from './components/BackSide';
import A3Poster from './components/A3Poster';
import A2Poster from './components/A2Poster';
import A5Flyer from './components/A5Flyer';
import VisibilitySlide from './components/VisibilitySlide';
import CharuSlide from './components/CharuSlide';
import AttentionSlide from './components/AttentionSlide';
import ClosingSlide from './components/ClosingSlide';
import BusinessCardSlide from './components/BusinessCardSlide';
import BusinessCardSlideV2 from './components/BusinessCardSlideV2';
import CampaignsSlide from './components/CampaignsSlide';
import StoriesBCSlide from './components/StoriesBCSlide';
import FeedBCSlide from './components/FeedBCSlide';
import LaajExplainer from './components/LaajExplainer';
import WrappingStoreExplainer from './components/WrappingStoreExplainer';
import CharuConstructionsExplainer from './components/CharuConstructionsExplainer';
import NichemExplainer from './components/NichemExplainer';
import RevenueCalc from './components/RevenueCalc';
import RevenueSimple from './components/RevenueSimple';
import SlideBuilder from './components/SlideBuilder';
import CustomSlideRenderer from './components/CustomSlideRenderer';
import AutopilotWizard from './components/AutopilotWizard';
import AutopilotDashboard from './components/AutopilotDashboard';
import MSMEAutomationSessionDeck from './components/MSMEAutomationSessionDeck';
import CFPLDeck from './components/CFPLDeck';
import { useCustomSlides } from './hooks/useCustomSlides';

// Wrapper: renders a custom slide by :id
function CustomSlideRoute({ getSlide }) {
  const { id } = useParams();
  const slide = getSlide(id);
  if (!slide) return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      Slide not found.
    </div>
  );
  return <CustomSlideRenderer slide={slide} />;
}

// Wrapper: opens builder pre-loaded with existing slide
function SlideBuilderEdit({ getSlide, updateSlide }) {
  const { id } = useParams();
  const slide = getSlide(id);
  if (!slide) return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      Slide not found.
    </div>
  );
  return (
    <SlideBuilder
      existingSlide={slide}
      onSave={(updates) => updateSlide(id, updates)}
    />
  );
}

function App() {
  const { slides, addSlide, updateSlide, deleteSlide, getSlide } = useCustomSlides();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen bg-gray-100 py-10 px-4 text-left">
              <div className="max-w-3xl mx-auto flex flex-col gap-6">

                <header className="text-center pb-2">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Querygen Explainer</h1>
                  <p className="mt-2 text-base text-gray-500">Select a format to preview or print</p>
                </header>

                {/* Autopilot */}
                <section className="bg-white rounded-2xl shadow-sm border border-[#BBF7D0] p-5 sm:p-6">
                  <div className="mb-4">
                    <h2 className="text-xs font-semibold text-[#25D366] uppercase tracking-widest">Autopilot</h2>
                    <p className="mt-1 text-sm text-gray-500">WhatsApp auto-reply setup wizard</p>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <Link to="/autopilot-dashboard" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-[#25D366] hover:bg-[#1ebe5a] transition-colors text-center leading-snug gap-2">
                      <span>Autopilot Dashboard</span>
                      <span className="text-xs opacity-80">→</span>
                    </Link>
                    <Link to="/autopilot" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-[#25D366] border border-[#25D366] hover:bg-[#F0FDF4] transition-colors text-center leading-snug gap-2">
                      <span>+ New Autopilot Setup Wizard</span>
                    </Link>
                  </div>
                </section>

                {/* Print Materials */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6">
                  <div className="mb-4">
                    <h2 className="text-xs font-semibold text-querygen-green uppercase tracking-widest">Print Materials</h2>
                    <p className="mt-1 text-sm text-gray-500">A4 double-sided sheets, posters, and flyers</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <Link to="/front" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-querygen-green hover:bg-green-700 transition-colors text-center leading-snug">Front Side</Link>
                    <Link to="/back" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-querygen-green hover:bg-green-700 transition-colors text-center leading-snug">Back Side</Link>
                    <Link to="/poster" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-querygen-green hover:bg-green-700 transition-colors text-center leading-snug">A3 Poster</Link>
                    <Link to="/poster-a2" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-querygen-green hover:bg-green-700 transition-colors text-center leading-snug">A2 Poster</Link>
                    <Link to="/flyer-a5" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 transition-colors text-center leading-snug">A5 Flyer</Link>
                  </div>
                </section>

                {/* Presentation Slides */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6">
                  <div className="mb-4">
                    <h2 className="text-xs font-semibold text-querygen-green uppercase tracking-widest">Presentation Slides</h2>
                    <p className="mt-1 text-sm text-gray-500">Pitch deck slides for demos and prospect meetings</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <Link to="/msme-session-deck" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-[#075E54] hover:bg-[#054d44] transition-colors text-center leading-snug">MSME Session Deck</Link>
                    <Link to="/visibility-slide" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-querygen-green hover:bg-green-700 transition-colors text-center leading-snug">Visibility Slide</Link>
                    <Link to="/charu-slide" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-querygen-green hover:bg-green-700 transition-colors text-center leading-snug">Charu Slide</Link>
                    <Link to="/attention-slide" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-querygen-green hover:bg-green-700 transition-colors text-center leading-snug">Attention Slide</Link>
                    <Link to="/closing-slide" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-querygen-green hover:bg-green-700 transition-colors text-center leading-snug">Closing Slide</Link>
                    <Link to="/business-card-slide" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-querygen-green hover:bg-green-700 transition-colors text-center leading-snug">Business Card Slide</Link>
                    <Link to="/business-card-slide-v2" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors text-center leading-snug">Business Card V2 (Visual)</Link>
                    <Link to="/campaigns-slide" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-querygen-green hover:bg-green-700 transition-colors text-center leading-snug">Campaigns Slide</Link>
                  </div>
                </section>

                {/* Prospect Explainers */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6">
                  <div className="mb-4">
                    <h2 className="text-xs font-semibold text-rose-700 uppercase tracking-widest">Prospect Explainers</h2>
                    <p className="mt-1 text-sm text-gray-500">Tailored one-pagers for specific prospects</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Link to="/laaj-explainer" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-[#6B1A2B] hover:bg-[#4A0F1E] transition-colors text-center leading-snug">Laaj Creations</Link>
                    <Link to="/wrapping-store-explainer" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-[#4A1942] hover:bg-[#320F2C] transition-colors text-center leading-snug">The Wrapping Store</Link>
                    <Link to="/charu-constructions-explainer" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-[#1E293B] hover:bg-[#0F172A] transition-colors text-center leading-snug">Charu Constructions</Link>
                    <Link to="/nichem-explainer" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-[#0D6E6E] hover:bg-[#0A5252] transition-colors text-center leading-snug">Nichem Chemicals</Link>
                    <Link to="/cfpl-deck" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-[#1A5C3A] hover:bg-[#124028] transition-colors text-center leading-snug">CFPL · WhatsApp → Excel</Link>
                  </div>
                </section>

                {/* Internal Tools */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6">
                  <div className="mb-4">
                    <h2 className="text-xs font-semibold text-amber-600 uppercase tracking-widest">Internal Tools</h2>
                    <p className="mt-1 text-sm text-gray-500">Revenue and ARR modeling calculators</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link to="/revenue-calc" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 transition-colors text-center leading-snug">ARR Calculator</Link>
                    <Link to="/revenue-simple" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 transition-colors text-center leading-snug">ARR Calculator (Simple)</Link>
                  </div>
                </section>

                {/* Ads — Social Media */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6">
                  <div className="mb-4">
                    <h2 className="text-xs font-semibold text-purple-600 uppercase tracking-widest">Ads — Social Media</h2>
                    <p className="mt-1 text-sm text-gray-500">Sized for Instagram Stories and Feed placements</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link to="/stories-bc-slide" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors text-center leading-snug">Stories (1080×1920)</Link>
                    <Link to="/feed-bc-slide" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors text-center leading-snug">Feed (1080×1350)</Link>
                  </div>
                </section>

                {/* Custom Slides */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6">
                  <div className="mb-4">
                    <h2 className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">Custom Slides</h2>
                    <p className="mt-1 text-sm text-gray-500">Slides you have built and saved locally</p>
                  </div>
                  {slides.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {slides.map(slide => (
                        <div key={slide.id} className="flex items-stretch gap-1.5">
                          <Link
                            to={`/custom-slide/${slide.id}`}
                            className="flex-1 flex items-center justify-center px-4 py-3 bg-[#075E54] text-white rounded-xl hover:bg-[#054d44] transition-colors font-medium text-sm text-center leading-snug"
                          >
                            {slide.name}
                          </Link>
                          <Link
                            to={`/slide-builder/${slide.id}`}
                            className="flex items-center px-3 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm"
                            title="Edit slide"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteSlide(slide.id)}
                            className="flex items-center px-3 py-3 bg-red-50 text-red-400 rounded-xl hover:bg-red-100 transition-colors font-medium text-sm"
                            title="Delete slide"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {slides.length === 0 && (
                    <p className="text-sm text-gray-400 mb-4">No custom slides yet. Create your first one below.</p>
                  )}
                  <Link
                    to="/slide-builder"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium text-sm"
                  >
                    + Create New Slide
                  </Link>
                </section>

              </div>
            </div>
          } />

          <Route path="/front" element={<FrontSide />} />
          <Route path="/back" element={<BackSide />} />
          <Route path="/poster" element={<A3Poster />} />
          <Route path="/poster-a2" element={<A2Poster />} />
          <Route path="/flyer-a5" element={<A5Flyer />} />
          <Route path="/visibility-slide" element={<VisibilitySlide />} />
          <Route path="/charu-slide" element={<CharuSlide />} />
          <Route path="/attention-slide" element={<AttentionSlide />} />
          <Route path="/closing-slide" element={<ClosingSlide />} />
          <Route path="/business-card-slide" element={<BusinessCardSlide />} />
          <Route path="/business-card-slide-v2" element={<BusinessCardSlideV2 />} />
          <Route path="/campaigns-slide" element={<CampaignsSlide />} />
          <Route path="/stories-bc-slide" element={<StoriesBCSlide />} />
          <Route path="/feed-bc-slide" element={<FeedBCSlide />} />
          <Route path="/laaj-explainer" element={<LaajExplainer />} />
          <Route path="/wrapping-store-explainer" element={<WrappingStoreExplainer />} />
          <Route path="/charu-constructions-explainer" element={<CharuConstructionsExplainer />} />
          <Route path="/nichem-explainer" element={<NichemExplainer />} />
          <Route path="/revenue-calc" element={<RevenueCalc />} />
          <Route path="/revenue-simple" element={<RevenueSimple />} />
          <Route path="/slide-builder" element={<SlideBuilder onSave={addSlide} />} />
          <Route path="/slide-builder/:id" element={<SlideBuilderEdit getSlide={getSlide} updateSlide={updateSlide} />} />
          <Route path="/custom-slide/:id" element={<CustomSlideRoute getSlide={getSlide} />} />
          <Route path="/autopilot" element={<AutopilotWizard />} />
          <Route path="/autopilot-dashboard" element={<AutopilotDashboard />} />
          <Route path="/msme-session-deck" element={<MSMEAutomationSessionDeck />} />
          <Route path="/cfpl-deck" element={<CFPLDeck />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
