import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, BookOpen, MessageCircle } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const onScroll = () => {};
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const chips = [
    { label: 'Governance', path: '/governance' },
    { label: 'Treasury', path: '/treasury' },
    { label: 'Media', path: '/media' },
    { label: 'Academy', path: '/academy' },
  ];

  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="min-h-[100dvh] bg-black text-white overflow-x-hidden">
      {/* Starfield */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 55%, rgba(255,255,255,0.06) 0%, transparent 50%)',
          }}
        />
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              opacity: 0.3,
              animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Hamburger */}
      <button
        onClick={() => navigate('/menu')}
        className="fixed top-4 right-4 z-50 flex flex-col gap-[5px] p-2"
        aria-label="Menu"
      >
        <span className="block w-5 h-[1.5px] bg-white/80" />
        <span className="block w-5 h-[1.5px] bg-white/80" />
      </button>

      {/* Hero */}
      <section className="relative flex flex-col items-center px-5 pt-16 pb-6">
        {/* Hex Logo */}
        <div className="mb-5">
          <svg width="52" height="60" viewBox="0 0 52 60" fill="none" className="opacity-90">
            <path
              d="M26 0L51.98 15V45L26 60L0.02 45V15L26 0Z"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M26 8L44 18.5V39.5L26 50L8 39.5V18.5L26 8Z"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="0.8"
              fill="none"
            />
            <circle cx="26" cy="30" r="6" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none" />
            <circle cx="26" cy="30" r="2.5" fill="rgba(255,255,255,0.5)" />
          </svg>
        </div>

        {/* Entity */}
        <p
          className="text-[10px] font-medium tracking-[0.35em] text-white/50 uppercase mb-2 text-center"
          style={{ fontFamily: 'monospace' }}
        >
          United Series of America Master DAO, LLC
        </p>

        {/* Subtitle */}
        <p className="text-[10px] tracking-[0.15em] text-white/35 text-center leading-relaxed">
          Republic of Marshall Islands &middot; Forming July 4, 2026 &middot;<br />
          Algorithmically Governed
        </p>

        {/* Title */}
        <div className="mt-8 text-center">
          <h1
            className="text-[3.2rem] font-black leading-[0.95] tracking-tight"
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

          <p className="mt-2 text-[1.15rem] font-semibold text-white/70 tracking-tight">
            The Everything App
          </p>

          {/* Diamond dots */}
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="text-[8px] text-white/30">&#9670;</span>
            <span className="text-[8px] text-white/20">&#9670;</span>
          </div>

          {/* Tagline */}
          <p className="text-[13px] text-white/45 leading-relaxed max-w-[340px] mx-auto">
            Music, Movies and MasterClasses while you match in the Creators Ecosystem
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="relative px-5 mt-6">
        <div
          className={`
            flex items-center gap-3 px-4 h-[52px] rounded-full border
            transition-all duration-300
            ${searchFocused ? 'border-white/30 bg-white/[0.04]' : 'border-white/10 bg-white/[0.02]'}
          `}
        >
          <Search size={18} className="text-white/30 shrink-0" />
          <input
            type="text"
            placeholder="Search everything with SORME\u2122"
            className="flex-1 bg-transparent text-[14px] text-white/60 placeholder:text-white/25 outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onKeyDown={(e) => { if (e.key === 'Enter') navigate('/sorme'); }}
          />
          <button className="p-1">
            <Mic size={18} className="text-white/30" />
          </button>
        </div>

        {/* Chips */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar">
          {chips.map((chip) => (
            <button
              key={chip.label}
              onClick={() => navigate(chip.path)}
              className="shrink-0 px-4 h-[36px] rounded-full border border-white/10 text-[12px] text-white/50 hover:border-white/25 hover:text-white/70 transition-all"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </section>

      {/* Bottom Cards */}
      <section className="relative px-5 mt-6 pb-10">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/academy')}
            className="flex flex-col items-start p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all text-left"
          >
            <BookOpen size={28} className="text-white/40 mb-6" strokeWidth={1.2} />
            <span className="text-[16px] font-bold text-white/90">EduTech</span>
            <span className="text-[10px] tracking-[0.15em] text-white/30 uppercase mt-1">Education</span>
            <span className="text-[10px] tracking-[0.15em] text-white/30 uppercase">Technology</span>
          </button>

          <button
            onClick={() => navigate('/ask9x')}
            className="flex flex-col items-start p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all text-left"
          >
            <MessageCircle size={28} className="text-white/40 mb-6" strokeWidth={1.2} />
            <span className="text-[16px] font-bold text-white/90">Ask 9x</span>
            <span className="text-[10px] tracking-[0.15em] text-white/30 uppercase mt-1">AI Concierge</span>
          </button>
        </div>
      </section>

      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.15; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
