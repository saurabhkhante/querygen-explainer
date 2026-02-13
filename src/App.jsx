import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FrontSide from './components/FrontSide';
import BackSide from './components/BackSide';
import A3Poster from './components/A3Poster';
import A2Poster from './components/A2Poster';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Routes */}
        <Routes>
          <Route path="/" element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Querygen A4 Explainer</h1>
                <p className="text-lg text-gray-600 mb-8">Select a page to view</p>
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
                </div>
              </div>
            </div>
          } />
          <Route path="/front" element={<FrontSide />} />
          <Route path="/back" element={<BackSide />} />
          <Route path="/poster" element={<A3Poster />} />
          <Route path="/poster-a2" element={<A2Poster />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
