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
import RevenueCalc from './components/RevenueCalc';
import RevenueSimple from './components/RevenueSimple';
import SlideBuilder from './components/SlideBuilder';
import CustomSlideRenderer from './components/CustomSlideRenderer';
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
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Querygen Explainer</h1>
                <p className="text-lg text-gray-600 mb-8">Select a format to view</p>
                <div className="flex flex-col gap-6 justify-center">
                  <div className="flex gap-4 justify-center">
                    <Link to="/front" className="px-6 py-3 bg-querygen-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg">View Front Side</Link>
                    <Link to="/back" className="px-6 py-3 bg-querygen-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg">View Back Side</Link>
                    <Link to="/poster" className="px-6 py-3 bg-querygen-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg">View A3 Poster</Link>
                    <Link to="/poster-a2" className="px-6 py-3 bg-querygen-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg">View A2 Poster</Link>
                    <Link to="/flyer-a5" className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium text-lg">View A5 Flyer</Link>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Link to="/visibility-slide" className="px-6 py-3 bg-querygen-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg">Visibility Slide</Link>
                    <Link to="/charu-slide" className="px-6 py-3 bg-querygen-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg">Charu Slide</Link>
                    <Link to="/attention-slide" className="px-6 py-3 bg-querygen-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg">Attention Slide</Link>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Link to="/closing-slide" className="px-6 py-3 bg-querygen-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg">Closing Slide</Link>
                    <Link to="/business-card-slide" className="px-6 py-3 bg-querygen-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg">Business Card Slide</Link>
                    <Link to="/business-card-slide-v2" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg">Business Card V2 (Visual)</Link>
                    <Link to="/campaigns-slide" className="px-6 py-3 bg-querygen-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg">Campaigns Slide</Link>
                  </div>

                  <div className="mt-8 pt-6 border-t-2 border-gray-300">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Prospect Explainers</h2>
                    <div className="flex gap-4 justify-center mb-6">
                      <Link to="/laaj-explainer" className="px-6 py-3 bg-[#6B1A2B] text-white rounded-lg hover:bg-[#4A0F1E] transition-colors font-medium text-lg">Laaj Creations Explainer</Link>
                      <Link to="/wrapping-store-explainer" className="px-6 py-3 bg-[#4A1942] text-white rounded-lg hover:bg-[#320F2C] transition-colors font-medium text-lg">The Wrapping Store Explainer</Link>
                      <Link to="/charu-constructions-explainer" className="px-6 py-3 bg-[#1E293B] text-white rounded-lg hover:bg-[#0F172A] transition-colors font-medium text-lg">Charu Constructions Explainer</Link>
                    </div>
                  </div>

                  <div className="mt-4 pt-6 border-t-2 border-gray-300">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Internal Tools</h2>
                    <div className="flex gap-4 justify-center mb-6">
                      <Link to="/revenue-calc" className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium text-lg">ARR Calculator</Link>
                      <Link to="/revenue-simple" className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium text-lg">ARR Calculator (Simple)</Link>
                    </div>
                  </div>

                  <div className="mt-4 pt-6 border-t-2 border-gray-300">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Ads (Social Media)</h2>
                    <div className="flex gap-4 justify-center">
                      <Link to="/stories-bc-slide" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-lg">Stories (1080×1920)</Link>
                      <Link to="/feed-bc-slide" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-lg">Feed (1080×1350)</Link>
                    </div>
                  </div>

                  {/* Custom Slides — dynamic, from localStorage */}
                  <div className="mt-4 pt-6 border-t-2 border-gray-300">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Custom Slides</h2>
                    {slides.length > 0 && (
                      <div className="flex flex-wrap gap-3 justify-center mb-5">
                        {slides.map(slide => (
                          <div key={slide.id} className="flex items-center gap-1">
                            <Link
                              to={`/custom-slide/${slide.id}`}
                              className="px-5 py-2.5 bg-[#075E54] text-white rounded-lg hover:bg-[#054d44] transition-colors font-medium text-base"
                            >
                              {slide.name}
                            </Link>
                            <Link
                              to={`/slide-builder/${slide.id}`}
                              className="px-3 py-2.5 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
                              title="Edit slide"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => deleteSlide(slide.id)}
                              className="px-3 py-2.5 bg-red-50 text-red-400 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
                              title="Delete slide"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {slides.length === 0 && (
                      <p className="text-gray-400 text-sm mb-4">No custom slides yet. Create your first one.</p>
                    )}
                    <Link
                      to="/slide-builder"
                      className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg"
                    >
                      + Create New Slide
                    </Link>
                  </div>

                </div>
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
          <Route path="/revenue-calc" element={<RevenueCalc />} />
          <Route path="/revenue-simple" element={<RevenueSimple />} />
          <Route path="/slide-builder" element={<SlideBuilder onSave={addSlide} />} />
          <Route path="/slide-builder/:id" element={<SlideBuilderEdit getSlide={getSlide} updateSlide={updateSlide} />} />
          <Route path="/custom-slide/:id" element={<CustomSlideRoute getSlide={getSlide} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
