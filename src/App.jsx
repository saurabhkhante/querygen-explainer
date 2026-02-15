import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Routes */}
        <Routes>
          <Route path="/" element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Querygen Explainer</h1>
                <p className="text-lg text-gray-600 mb-8">Select a format to view</p>
                <div className="flex flex-col gap-6 justify-center">
                  <div className="flex gap-4 justify-center">
                    <Link
                      to="/front"
                      className="px-6 py-3 bg-querygen-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
                    >
                      View Front Side
                    </Link>
                    <Link
                      to="/back"
                      className="px-6 py-3 bg-querygen-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
                    >
                      View Back Side
                    </Link>
                    <Link
                      to="/poster"
                      className="px-6 py-3 bg-querygen-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
                    >
                      View A3 Poster
                    </Link>
                    <Link
                      to="/poster-a2"
                      className="px-6 py-3 bg-querygen-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
                    >
                      View A2 Poster
                    </Link>
                    <Link
                      to="/flyer-a5"
                      className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium text-lg"
                    >
                      View A5 Flyer
                    </Link>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Link
                      to="/visibility-slide"
                      className="px-6 py-3 bg-querygen-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
                    >
                      Visibility Slide
                    </Link>
                    <Link
                      to="/charu-slide"
                      className="px-6 py-3 bg-querygen-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
                    >
                      Charu Slide
                    </Link>
                    <Link
                      to="/attention-slide"
                      className="px-6 py-3 bg-querygen-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
                    >
                      Attention Slide
                    </Link>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Link
                      to="/closing-slide"
                      className="px-6 py-3 bg-querygen-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
                    >
                      Closing Slide
                    </Link>
                    <Link
                      to="/business-card-slide"
                      className="px-6 py-3 bg-querygen-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
                    >
                      Business Card Slide
                    </Link>
                    <Link
                      to="/business-card-slide-v2"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
                    >
                      Business Card V2 (Visual)
                    </Link>
                    <Link
                      to="/campaigns-slide"
                      className="px-6 py-3 bg-querygen-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
                    >
                      Campaigns Slide
                    </Link>
                  </div>
                  <div className="mt-8 pt-6 border-t-2 border-gray-300">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Ads (Social Media)</h2>
                    <div className="flex gap-4 justify-center">
                      <Link
                        to="/stories-bc-slide"
                        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-lg"
                      >
                        Stories (1080×1920)
                      </Link>
                      <Link
                        to="/feed-bc-slide"
                        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-lg"
                      >
                        Feed (1080×1350)
                      </Link>
                    </div>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
