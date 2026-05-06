import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap, Headphones, Video, MessageCircle, Search, LayoutGrid, BookOpen, Shield, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useModal } from './ModalContext';
import type { ModalType } from './ModalContext';
import LogoUSA from './icons/LogoUSA';

type MenuItem =
  | { icon: typeof GraduationCap; label: string; modal: ModalType }
  | { icon: typeof GraduationCap; label: string; path: string };

const menuItems: MenuItem[] = [
  { icon: GraduationCap, label: 'Masterclass', modal: 'masterclass' },
  { icon: Headphones, label: 'Audio', modal: 'audio' },
  { icon: Video, label: 'Video', modal: 'video' },
  { icon: MessageCircle, label: 'Ask Concierge', modal: 'concierge' },
  { icon: Search, label: 'Ask SORME', path: '/' },
  { icon: LayoutGrid, label: "SubDAO's", path: '/' },
  { icon: BookOpen, label: 'EduTech', path: '/' },
  { icon: Shield, label: 'Admin Panel', path: '/admin' },
  { icon: Settings, label: 'Settings', path: '/' },
];

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { openModal } = useModal();

  const handleMenuClick = (item: MenuItem) => {
    setMenuOpen(false);
    if ('modal' in item) {
      openModal(item.modal);
    } else {
      navigate(item.path);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4 z-50 bg-black/90 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <LogoUSA className="text-2xl" />
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease }}
          onClick={() => setMenuOpen(true)}
          className="w-11 h-11 bg-usa-card border border-usa-border rounded-lg flex items-center justify-center hover:border-usa-blue transition-colors active:scale-95"
          aria-label="Open menu"
        >
          <Menu size={20} className="text-white" strokeWidth={2} />
        </motion.button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/92 z-[100]"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease }}
              className="absolute right-0 top-0 bottom-0 w-[280px] max-w-[80%] bg-usa-card border-l border-usa-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 h-14 border-b border-usa-border">
                <span className="text-white font-semibold text-lg">Menu</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-usa-elevated transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} className="text-white" strokeWidth={2} />
                </button>
              </div>

              <nav className="flex flex-col gap-1 p-4">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleMenuClick(item)}
                      className="flex items-center gap-3 h-12 px-4 rounded-lg hover:bg-usa-elevated transition-colors text-left"
                    >
                      <Icon size={20} className="text-usa-silver" strokeWidth={1.5} />
                      <span className="text-white text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
