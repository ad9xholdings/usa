import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Organization() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100dvh] bg-black text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center px-4 sm:px-6 md:px-8 h-14 md:h-16 border-b border-white/[0.04] shrink-0">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 p-2 -ml-2 hover:bg-white/[0.04] rounded-lg transition-colors"
        >
          <ArrowLeft size={18} className="text-white/50" />
          <span className="text-[11px] tracking-[0.2em] text-white/40 uppercase hidden sm:inline">Back</span>
        </button>
        <span className="text-[11px] tracking-[0.25em] text-white/30 uppercase font-mono ml-auto mr-auto pr-8 sm:pr-12">
          Organization
        </span>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="text-center">
          <p className="text-[12px] sm:text-[13px] md:text-[14px] text-white/30 tracking-[0.15em] uppercase">
            Coming Soon
          </p>
          <p className="text-[10px] sm:text-[11px] text-white/20 tracking-[0.1em] uppercase mt-3 font-mono">
            United Series of America Master DAO, LLC
          </p>
        </div>
      </main>
    </div>
  );
}
