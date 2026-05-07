import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthModal from './components/auth/AuthModal';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Sorme from './pages/Sorme';
import Ask9x from './pages/Ask9x';
import CottonBrickRoad from './pages/CottonBrickRoad';
import MediaHub from './pages/MediaHub';
import Academy from './pages/Academy';
import Pricing from './pages/Pricing';
import CollectiveGeneral from './pages/CollectiveGeneral';
import RockNext from './pages/RockNext';
import BlackDiamond from './pages/BlackDiamond';
import ConduitIntelligence from './pages/ConduitIntelligence';
import RiverShyre from './pages/RiverShyre';
import WisdomPay from './pages/WisdomPay';
import Governance from './pages/Governance';
import Organization from './pages/Organization';
import Treasury from './pages/Treasury';
import Members from './pages/Members';

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/sorme" element={<Sorme />} />
          <Route path="/ask9x" element={<Ask9x />} />
          <Route path="/cotton-brick-road" element={<CottonBrickRoad />} />
          <Route path="/media" element={<MediaHub />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/collective-general" element={<CollectiveGeneral />} />
          <Route path="/rocknext" element={<RockNext />} />
          <Route path="/blackdiamond" element={<BlackDiamond />} />
          <Route path="/conduit-intelligence" element={<ConduitIntelligence />} />
          <Route path="/rivershyre" element={<RiverShyre />} />
          <Route path="/wisdompay" element={<WisdomPay />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/treasury" element={<Treasury />} />
          <Route path="/members" element={<Members />} />
        </Routes>
        <AuthModal />
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
