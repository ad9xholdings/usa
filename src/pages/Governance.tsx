import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Governance() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100dvh] bg-black text-white flex flex-col">
      <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-white/[0.06]">
        <button onClick={() => navigate('/')} className="p-2 -ml-2">
          <ArrowLeft size={20} className="text-white/50" />
        </button>
        <span className="text-[11px] tracking-[0.2em] text-white/40 uppercase">Governance</span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <p className="text-[12px] text-white/30 tracking-[0.15em] uppercase">Coming Soon</p>
      </div>
    </div>
  );
}
