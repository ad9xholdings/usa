import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Search, Mic, BookOpen, MessageCircle, Menu } from 'lucide-react';

const STAR_DATA = [
  { left: 12, top: 8, size: 1.2, delay: 0.3, dur: 2.5 },
  { left: 28, top: 15, size: 0.8, delay: 1.1, dur: 3.2 },
  { left: 45, top: 5, size: 1.5, delay: 0.7, dur: 2.8 },
  { left: 62, top: 22, size: 0.6, delay: 1.8, dur: 3.5 },
  { left: 78, top: 10, size: 1.0, delay: 0.5, dur: 2.2 },
  { left: 88, top: 30, size: 1.3, delay: 2.1, dur: 3.0 },
  { left: 5, top: 35, size: 0.7, delay: 1.4, dur: 2.7 },
  { left: 35, top: 40, size: 1.1, delay: 0.9, dur: 3.3 },
  { left: 55, top: 45, size: 0.9, delay: 1.6, dur: 2.4 },
  { left: 72, top: 50, size: 1.4, delay: 0.2, dur: 3.1 },
  { left: 15, top: 55, size: 0.5, delay: 2.3, dur: 2.9 },
  { left: 42, top: 60, size: 1.0, delay: 0.8, dur: 2.6 },
  { left: 68, top: 65, size: 0.8, delay: 1.2, dur: 3.4 },
  { left: 82, top: 70, size: 1.2, delay: 1.9, dur: 2.3 },
  { left: 22, top: 72, size: 0.6, delay: 0.4, dur: 3.0 },
  { left: 48, top: 78, size: 1.3, delay: 1.5, dur: 2.8 },
  { left: 8, top: 85, size: 0.9, delay: 2.0, dur: 3.2 },
  { left: 58, top: 88, size: 0.7, delay: 0.6, dur: 2.5 },
  { left: 75, top: 82, size: 1.1, delay: 1.0, dur: 2.7 },
  { left: 92, top: 92, size: 0.8, delay: 1.7, dur: 3.3 },
  { left: 18, top: 95, size: 1.0, delay: 0.1, dur: 2.4 },
  { left: 38, top: 92, size: 0.5, delay: 2.2, dur: 3.1 },
  { left: 65, top: 12, size: 0.7, delay: 1.3, dur: 2.6 },
  { left: 85, top: 48, size: 1.2, delay: 0.8, dur: 3.0 },
  { left: 3, top: 62, size: 0.9, delay: 1.6, dur: 2.9 },
  { left: 25, top: 25, size: 0.6, delay: 0.4, dur: 3.4 },
  { left: 50, top: 32, size: 1.4, delay: 2.1, dur: 2.3 },
  { left: 95, top: 18, size: 0.8, delay: 0.9, dur: 2.8 },
  { left: 33, top: 75, size: 1.1, delay: 1.4, dur: 3.2 },
  { left: 60, top: 55, size: 0.5, delay: 0.2, dur: 2.6 },
];

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, openAuth, logout } = useAuth();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const gatedNav = (path: string) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate('/pricing');
    }
  };

  return (
    <div className="min-h-[100dvh] bg-black text-white overflow-x-hidden relative">
      {/* Starfield */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 55%, rgba(255,255,255,0.06) 0%, transparent 50%)',
          }}
        />
        {STAR_DATA.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size,
              opacity: 0.25,
              animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Nav */}
      <nav className="relative z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 h-14 md:h-16">
        <div className="hidden xs:flex items-center gap-2">
          <svg width="28" height="32" viewBox="0 0 52 60" fill="none" className="opacity-70">
            <path d="M26 0L51.98 15V45L26 60L0.02 45V15L26 0Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none" />
            <circle cx="26" cy="30" r="6" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none" />
          </svg>
          <span className="text-[11px] tracking-[0.2em] text-white/50 uppercase font-mono hidden sm:inline">USA Master</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <button onClick={() => gatedNav('/sorme')} className="text-[13px] text-white/40 hover:text-white/70 transition-colors">SORME</button>
          <button onClick={() => gatedNav('/media')} className="text-[13px] text-white/40 hover:text-white/70 transition-colors">Media</button>
          <button onClick={() => gatedNav('/academy')} className="text-[13px] text-white/40 hover:text-white/70 transition-colors">Academy</button>
          <button onClick={() => navigate('/pricing')} className="text-[13px] text-white/40 hover:text-white/70 transition-colors">Pricing</button>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="text-[11px] tracking-[0.15em] text-white/40 hover:text-white/70 transition-colors uppercase"
            >
              Log Out
            </button>
          ) : (
            <>
              <button
                onClick={() => openAuth('login')}
                className="h-[32px] px-4 rounded-full text-[11px] font-medium text-white/60 tracking-wide border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all"
              >
                Log In
              </button>
            </>
          )}
          <button onClick={() => navigate('/menu')} className="p-2 hover:bg-white/[0.04] rounded-lg transition-colors">
            <Menu size={20} className="text-white/70" />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center px-5 sm:px-8 md:px-12 pt-6 sm:pt-8 md:pt-12">
        <section className="flex flex-col items-center w-full max-w-[680px] lg:max-w-[800px]">
          {/* Logo */}
          <div className="mb-5 md:mb-6">
            <svg className="w-[52px] h-[60px] md:w-[64px] md:h-[74px] opacity-90" viewBox="0 0 52 60" fill="none">
              <path d="M26 0L51.98 15V45L26 60L0.02 45V15L26 0Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none" />
              <path d="M26 8L44 18.5V39.5L26 50L8 39.5V18.5L26 8Z" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" fill="none" />
              <circle cx="26" cy="30" r="6" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none" />
              <circle cx="26" cy="30" r="2.5" fill="rgba(255,255,255,0.5)" />
            </svg>
          </div>

          {/* Entity */}
          <p className="text-[10px] md:text-[11px] font-medium tracking-[0.35em] text-white/50 uppercase mb-2 text-center font-mono">
            United Series of America Master DAO, LLC
          </p>
          <p className="text-[10px] tracking-[0.15em] text-white/35 text-center leading-relaxed">
            Republic of Marshall Islands &middot; Forming July 4, 2026 &middot;<br className="hidden xs:block" />
            Algorithmically Governed
          </p>

          {/* Title */}
          <div className="mt-8 md:mt-10 text-center">
            <h1
              className="text-[3.2rem] sm:text-[4rem] md:text-[5rem] font-black leading-[0.95]"
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #C8D0D8 50%, #8A9499 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.03em',
              }}
            >
              USA Master
            </h1>
            <p className="mt-2 text-[1.15rem] sm:text-[1.35rem] md:text-[1.6rem] font-semibold text-white/70 tracking-tight">
              The Everything App
            </p>
            <div className="flex items-center justify-center gap-3 my-4 md:my-5">
              <span className="text-[8px] md:text-[10px] text-white/30">&#9670;</span>
              <span className="text-[8px] md:text-[10px] text-white/20">&#9670;</span>
            </div>
            <p className="text-[13px] sm:text-[14px] md:text-[15px] text-white/45 leading-relaxed max-w-[340px] sm:max-w-[420px] mx-auto">
              Music, Movies, Masterclasses & Monetization
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="w-full max-w-[640px] lg:max-w-[720px] mt-8 md:mt-10">
          <div
            className={`
              flex items-center gap-3 px-5 h-[52px] sm:h-[56px] md:h-[60px] rounded-full border
              transition-all duration-300 cursor-pointer
              ${searchFocused ? 'border-white/30 bg-white/[0.04]' : 'border-white/10 bg-white/[0.02]'}
            `}
            onClick={() => gatedNav('/sorme')}
          >
            <Search size={18} className="text-white/30 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search everything with SORME"
              className="flex-1 bg-transparent text-[14px] sm:text-[15px] text-white/60 placeholder:text-white/25 outline-none cursor-pointer"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              readOnly
            />
            <button className="p-1.5">
              <Mic size={18} className="text-white/30" />
            </button>
          </div>

          {/* Search / Offer / Request / Match */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-5">
            {['Search', 'Offer', 'Request', 'Match'].map((label) => (
              <button
                key={label}
                onClick={() => gatedNav('/sorme')}
                className="shrink-0 px-4 sm:px-5 md:px-6 h-[36px] sm:h-[40px] rounded-full border border-white/10 text-[12px] sm:text-[13px] text-white/50 hover:border-white/25 hover:text-white/70 hover:bg-white/[0.03] transition-all"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Governance / Access / Utility */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
            {[
              { label: 'Governance', path: '/governance' },
              { label: 'Access', path: '/blackdiamond' },
              { label: 'Utility', path: '/wisdompay' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => gatedNav(item.path)}
                className="shrink-0 px-4 sm:px-5 md:px-6 h-[36px] sm:h-[40px] rounded-full border border-white/10 text-[12px] sm:text-[13px] text-white/50 hover:border-white/25 hover:text-white/70 hover:bg-white/[0.03] transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>


        </section>

        {/* Bottom Cards */}
        <section className="w-full max-w-[640px] lg:max-w-[720px] mt-8 md:mt-10 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <button
              onClick={() => gatedNav('/academy')}
              className="flex flex-col items-start p-4 sm:p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all text-left active:scale-[0.98]"
            >
              <BookOpen size={28} className="text-white/40 mb-6 sm:mb-8" strokeWidth={1.2} />
              <span className="text-[16px] sm:text-[18px] font-bold text-white/90">Battle</span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.15em] text-white/30 uppercase mt-1">Challenge</span>
            </button>

            <button
              onClick={() => gatedNav('/ask9x')}
              className="flex flex-col items-start p-4 sm:p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all text-left active:scale-[0.98]"
            >
              <MessageCircle size={28} className="text-white/40 mb-6 sm:mb-8" strokeWidth={1.2} />
              <span className="text-[16px] sm:text-[18px] font-bold text-white/90">Ask 9x</span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.15em] text-white/30 uppercase mt-1">AI Concierge</span>
            </button>

            <button
              onClick={() => gatedNav('/sorme')}
              className="hidden md:flex flex-col items-start p-4 sm:p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all text-left active:scale-[0.98]"
            >
              <Search size={28} className="text-white/40 mb-6 sm:mb-8" strokeWidth={1.2} />
              <span className="text-[16px] sm:text-[18px] font-bold text-white/90">SORME</span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.15em] text-white/30 uppercase mt-1">Search Engine</span>
            </button>

            <button
              onClick={() => navigate('/pricing')}
              className="hidden md:flex flex-col items-start p-4 sm:p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all text-left active:scale-[0.98]"
            >
              <span className="text-[28px] text-white/40 mb-6 sm:mb-8 font-serif">$</span>
              <span className="text-[16px] sm:text-[18px] font-bold text-white/90">Pricing</span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.15em] text-white/30 uppercase mt-1">Free &middot; Premium &middot; Custom</span>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-white/[0.04] py-6 md:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-4">
          <p className="text-[9px] sm:text-[10px] tracking-[0.2em] text-white/20 uppercase font-mono text-center">
            United Series of America Master DAO, LLC
          </p>
          <span className="hidden sm:inline text-white/10">&middot;</span>
          <p className="text-[9px] sm:text-[10px] tracking-[0.15em] text-white/20 uppercase text-center">
            Republic of Marshall Islands &middot; Forming July 4, 2026
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.12; }
          100% { opacity: 0.42; }
        }
      `}</style>
    </div>
  );
}
