import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useModal } from './ModalContext';
import IconHome from './icons/IconHome';
import IconCreate from './icons/IconCreate';
import IconAsk from './icons/IconAsk';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function BottomNav() {
  const location = useLocation();
  const { openModal } = useModal();

  const navItems = [
    { label: 'HOME', Icon: IconHome, action: () => window.location.hash = '/' },
    { label: 'CREATE', Icon: IconCreate, action: () => window.location.hash = '/create' },
    { label: 'ASK 9X', Icon: IconAsk, action: () => openModal('concierge') },
  ];

  const isActive = (label: string) => {
    if (label === 'HOME') return location.pathname === '/';
    if (label === 'CREATE') return location.pathname === '/create';
    return false;
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 1.0, ease }}
      className="fixed bottom-0 left-0 right-0 h-16 bg-usa-card border-t border-usa-border z-50 flex justify-around items-center"
    >
      {navItems.map((item) => {
        const { Icon, label, action } = item;
        const active = isActive(label);
        return (
          <button
            key={label}
            onClick={action}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors active:scale-95 ${
              active ? 'text-white' : 'text-usa-muted'
            }`}
          >
            <Icon size={24} strokeWidth={active ? 2.5 : 1.5} />
            <span className="text-[10px] font-semibold tracking-[0.08em]">{label}</span>
          </button>
        );
      })}
    </motion.nav>
  );
}
