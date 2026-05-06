import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Layout from './components/Layout';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/masterclass" element={<div className="p-8 text-white text-center">Masterclass</div>} />
                <Route path="/audio" element={<div className="p-8 text-white text-center">Audio</div>} />
                <Route path="/video" element={<div className="p-8 text-white text-center">Video</div>} />
                <Route path="/concierge" element={<div className="p-8 text-white text-center">Concierge</div>} />
                <Route path="/create" element={<div className="p-8 text-white text-center">Create Content</div>} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </HashRouter>
  );
}
