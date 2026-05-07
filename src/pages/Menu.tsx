import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Search, Globe, Play, GraduationCap, Users, Mountain,
  Diamond, Brain, CreditCard, BookOpen, Landmark,
  MessageCircle, ArrowLeft, X
} from 'lucide-react';
import { useState } from 'react';

const items = [
  { icon: Search, title: 'SORME', subtitle: 'The Everything Search', path: '/sorme' },
  { icon: Globe, title: 'Cotton Brick Road', subtitle: 'Gateway Explorer', path: '/cotton-brick-road' },
  { icon: Play, title: 'Media Hub', subtitle: 'Audio \u00b7 Video \u00b7 Games', path: '/media' },
  { icon: GraduationCap, title: "Mrs. Cotton's Academy", subtitle: 'MasterClass Series', path: '/academy' },
  { icon: Users, title: 'Collective General', subtitle: 'Community Governance', path: '/collective-general' },
  { icon: Mountain, title: 'RockNext', subtitle: 'Next-Gen Infrastructure', path: '/rocknext' },
  { icon: Diamond, title: 'BlackDiamond', subtitle: 'Premium Access', path: '/blackdiamond' },
  { icon: Brain, title: 'Conduit Intelligence', subtitle: 'Advisory & Intel', path: '/conduit-intelligence' },
  { icon: CreditCard, title: 'WisdomPay', subtitle: 'Decentralized Payments', path: '/wisdompay' },
  { icon: BookOpen, title: 'Battle', subtitle: 'Challenge', path: '/academy' },
  { icon: Landmark, title: 'DAO Portal', subtitle: 'Governance \u00b7 Treasury \u00b7 Members', path: '/governance' },
  { icon: MessageCircle, title: 'Ask 9x Concierge', subtitle: 'AI Concierge', path: '/ask9x' },
];

export default function Menu() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => navigate('/'), 200);
  };

  const handleNav = (path: string) => {
    if (!isAuthenticated && path !== '/pricing') {
      setClosing(true);
      setTimeout(() => navigate('/pricing'), 200);
    } else {
      setClosing(true);
      setTimeout(() => navigate(path), 200);
    }
  };

  return (
    <div className={`min-h-[100dvh] bg-black text-white overflow-y-auto transition-opacity duration-200 ${closing ? 'opacity-0' : 'opacity-100'}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 h-14 md:h-16 border-b border-white/[0.04]">
        <button onClick={handleClose} className="flex items-center gap-2 p-2 -ml-2 hover:bg-white/[0.04] rounded-lg transition-colors">
          <ArrowLeft size={18} className="text-white/50" />
          <span className="text-[11px] tracking-[0.2em] text-white/40 uppercase hidden sm:inline">Back</span>
        </button>
        <span className="text-[11px] tracking-[0.25em] text-white/30 uppercase font-mono">USA Master Menu</span>
        <button onClick={handleClose} className="p-2 -mr-2 hover:bg-white/[0.04] rounded-lg transition-colors">
          <X size={18} className="text-white/50" />
        </button>
      </div>

      {/* Menu Grid */}
      <div className="px-4 sm:px-6 md:px-8 py-6 md:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3 max-w-[1400px] mx-auto">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.title}
                onClick={() => handleNav(item.path)}
                className="flex flex-col items-center justify-center py-6 sm:py-8 px-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all active:scale-[0.97]"
              >
                <Icon size={24} className="text-white/40 mb-4 sm:mb-5" strokeWidth={1.2} />
                <span className="text-[11px] sm:text-[12px] text-white/70 text-center leading-tight font-medium">{item.title}</span>
                <span className="text-[9px] sm:text-[10px] text-white/25 text-center mt-1.5 leading-tight">{item.subtitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Get Access Now Banner */}
      <div className="px-4 sm:px-6 md:px-8 pb-6">
        <button
          onClick={() => navigate('/pricing')}
          className="w-full h-[56px] rounded-2xl text-[15px] font-bold text-black tracking-wide transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: 'linear-gradient(180deg, #E8ECF0 0%, #BCC6CC 50%, #8A9499 100%)' }}
        >
          Get Access Now
        </button>
      </div>

      {/* Footer */}
      <div className="border-t border-white/[0.04] py-6 md:py-8">
        <p className="text-center text-[9px] sm:text-[10px] tracking-[0.15em] text-white/20 uppercase font-mono">
          United Series of America Master DAO, LLC &middot; Republic of Marshall Islands
        </p>
      </div>
    </div>
  );
}
