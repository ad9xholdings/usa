import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import IconHome from './icons/IconHome';
import IconCreate from './icons/IconCreate';
import IconAsk from './icons/IconAsk';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const navItems = [
  { label: 'HOME', Icon: IconHome, path: '/' },
  { label: 'CREATE', Icon: IconCreate, path: '/create' },
  { label: 'ASK 9X', Icon: IconAsk, path: '/concierge' },
];

export default function BottomNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 1.0, ease }}
      className="fixed bottom-0 left-0 right-0 h-16 bg-usa-card border-t border-usa-border z-50 flex justify-around items-center"
    >
      {navItems.map((item) => {
        const { Icon, label, path } = item;
        return (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors active:scale-95 ${
                isActive ? 'text-white' : 'text-usa-muted'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="text-[10px] font-semibold tracking-[0.08em]">{label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </motion.nav>
  );
}
