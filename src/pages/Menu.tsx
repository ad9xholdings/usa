import { useNavigate } from 'react-router-dom';
import { Search, Globe, Play, GraduationCap, Users, Mountain, Diamond, Brain, CreditCard, BookOpen, Landmark, MessageCircle, ArrowLeft } from 'lucide-react';

const items = [
  { icon: Search, title: 'SORME\u2122', subtitle: 'The Everything Search', path: '/sorme' },
  { icon: Globe, title: 'Cotton Brick Road', subtitle: 'Gateway Explorer', path: '/cotton-brick-road' },
  { icon: Play, title: 'Media Hub', subtitle: 'Audio \u00b7 Video \u00b7 Games', path: '/media' },
  { icon: GraduationCap, title: "Mrs. Cotton's Academy", subtitle: 'MasterClass Series', path: '/academy' },
  { icon: Users, title: 'Collective General', subtitle: 'Community Governance', path: '/collective-general' },
  { icon: Mountain, title: 'RockNext', subtitle: 'Next-Gen Infrastructure', path: '/rocknext' },
  { icon: Diamond, title: 'BlackDiamond', subtitle: 'Premium Access', path: '/blackdiamond' },
  { icon: Brain, title: 'Conduit Intelligence', subtitle: 'Advisory & Intel', path: '/conduit-intelligence' },
  { icon: CreditCard, title: 'WisdomPay', subtitle: 'Decentralized Payments', path: '/wisdompay' },
  { icon: BookOpen, title: 'EduTech', subtitle: 'Education Technology', path: '/academy' },
  { icon: Landmark, title: 'DAO Portal', subtitle: 'Governance \u00b7 Treasury \u00b7 Members', path: '/governance' },
  { icon: MessageCircle, title: 'Ask 9x Concierge', subtitle: 'AI Concierge', path: '/ask9x' },
];

export default function Menu() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100dvh] bg-black text-white overflow-y-auto">
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <button onClick={() => navigate('/')} className="p-2 -ml-2">
          <ArrowLeft size={20} className="text-white/50" />
        </button>
        <span className="text-[11px] tracking-[0.2em] text-white/40 uppercase">Menu</span>
      </div>

      <div className="grid grid-cols-3 gap-[1px] bg-white/[0.04] mx-4 rounded-2xl overflow-hidden border border-white/[0.06]">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.title}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center py-6 px-2 bg-black hover:bg-white/[0.03] transition-all"
            >
              <Icon size={22} className="text-white/40 mb-3" strokeWidth={1.2} />
              <span className="text-[10px] text-white/60 text-center leading-tight">{item.title}</span>
              <span className="text-[8px] text-white/25 text-center mt-1 leading-tight">{item.subtitle}</span>
            </button>
          );
        })}
      </div>

      <p className="text-center text-[9px] text-white/20 tracking-[0.15em] uppercase mt-8 pb-8">
        United Series of America Master DAO, LLC &middot; Republic of Marshall Islands
      </p>
    </div>
  );
}
