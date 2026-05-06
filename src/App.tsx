import { HashRouter, Routes, Route } from 'react-router-dom';
import { ModalProvider } from './components/ModalContext';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Layout from './components/Layout';
import MasterclassModal from './pages/MasterclassModal';
import AudioModal from './pages/AudioModal';
import VideoModal from './pages/VideoModal';
import ConciergeModal from './pages/ConciergeModal';
import { useModal } from './components/ModalContext';

function ModalContainer() {
  const { activeModal, closeModal } = useModal();
  return (
    <>
      <MasterclassModal isOpen={activeModal === 'masterclass'} onClose={closeModal} />
      <AudioModal isOpen={activeModal === 'audio'} onClose={closeModal} />
      <VideoModal isOpen={activeModal === 'video'} onClose={closeModal} />
      <ConciergeModal isOpen={activeModal === 'concierge'} onClose={closeModal} />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ModalProvider>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/create" element={<div className="p-8 text-white text-center">Create Content</div>} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
        <ModalContainer />
      </ModalProvider>
    </HashRouter>
  );
}
