import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Headphones, Play, Database, Layers, Grid3X3, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LogoUSA from '@/components/icons/LogoUSA';
import Ad9xBadge from '@/components/icons/Ad9xBadge';
import IconMusic from '@/components/icons/IconMusic';
import IconMovie from '@/components/icons/IconMovie';
import IconMasterclass from '@/components/icons/IconMasterclass';
import IconEducation from '@/components/icons/IconEducation';
import IconVideo from '@/components/icons/IconVideo';
import IconAudio from '@/components/icons/IconAudio';
import IconDocs from '@/components/icons/IconDocs';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const engines = ['AskLight', 'AskHeavy', 'AskDeep', 'AskMAX'];

const metadataItems = [
  { icon: Database, label: '131+ Documents' },
  { icon: Grid3X3, label: '10 AI Engines' },
  { icon: Layers, label: 'Backend Ops' },
  { icon: Globe, label: '50+ Platforms' },
];

const stats = [
  { number: '131+', label: 'DOCUMENTS' },
  { number: '10', label: 'BINDERS' },
  { number: '8', label: 'PHASES' },
  { number: null, label: 'GLOBAL', isGlobe: true },
];

const contentCards = [
  { badge: 'AUDIO', Icon: IconMusic, title: 'Music Catalog', meta: '1,200+ tracks \u00B7 Updated daily' },
  { badge: 'VIDEO', Icon: IconMovie, title: 'Film Collection', meta: '500+ titles \u00B7 HD streaming' },
  { badge: 'VIDEO', Icon: IconMasterclass, title: 'Masterclass Series', meta: 'Premium \u00B7 24 episodes', gold: true },
  { badge: 'DOC', Icon: IconEducation, title: 'Education Hub', meta: '131+ modules \u00B7 Self-paced' },
  { badge: 'VIDEO', Icon: IconVideo, title: 'Video Library', meta: 'Curated playlists \u00B7 50+ hrs' },
  { badge: 'AUDIO', Icon: IconAudio, title: 'Audio Collection', meta: 'Podcasts \u00B7 Interviews \u00B7 Guides' },
  { badge: 'DOC', Icon: IconDocs, title: 'USA Purse Docs', meta: 'Legal \u00B7 Governance \u00B7 Finance' },
];

const globalCards = [
  { badge: 'DOC', Icon: IconDocs, title: 'USA Purse Documents', meta: 'Treasury \u00B7 Allocations \u00B7 Q2 2025' },
  { badge: 'DOC', Icon: IconDocs, title: 'DAO Governance', meta: 'Proposals \u00B7 Votes \u00B7 Records' },
  { badge: 'IMAGE', Icon: IconDocs, title: 'SubDAO Structures', meta: 'Org charts \u00B7 10 binders' },
  { badge: 'DOC', Icon: IconDocs, title: 'Legal Agreements', meta: 'Contracts \u00B7 Exhibits \u00B7 v2.4' },
];

export default function Home() {
  const [activeEngine, setActiveEngine] = useState('AskLight');
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* === HERO SECTION === */}
      <section className="flex flex-col items-center pt-20 pb-4">
        {/* Brand Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
        >
          <LogoUSA className="text-[clamp(2rem,8vw,3rem)]" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="text-usa-silver text-lg font-normal mt-2 text-center tracking-wide"
        >
          AI powered Intelligence Platform
        </motion.p>

        {/* Ad9x Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3, ease }}
          className="mt-4"
        >
          <Ad9xBadge />
        </motion.div>

        {/* SORME Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease }}
          className="w-[90%] max-w-[640px] mt-6"
        >
          <div
            className={`flex items-center h-14 sm:h-16 bg-usa-card rounded-full border transition-all duration-200 ${
              searchFocused
                ? 'border-usa-blue shadow-[0_0_0_3px_rgba(0,53,148,0.25)]'
                : 'border-usa-border'
            }`}
          >
            <Search size={20} className="text-usa-muted ml-5 flex-shrink-0" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search SORME&#8482; \u2014 9x AI powered"
              className="flex-1 bg-transparent border-none outline-none text-white text-base font-medium placeholder:text-usa-muted px-3"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <button className="hidden sm:flex items-center justify-center h-10 px-5 bg-usa-blue text-white text-sm font-semibold rounded-full mr-2 hover:brightness-115 transition-all">
              Search
            </button>
            <button className="sm:hidden flex items-center justify-center w-10 h-10 mr-2">
              <Search size={20} className="text-usa-muted" strokeWidth={2} />
            </button>
          </div>
        </motion.div>

        {/* Engine Selector Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-2 mt-4"
        >
          {engines.map((engine, i) => (
            <motion.button
              key={engine}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.45 + i * 0.05, ease }}
              onClick={() => setActiveEngine(engine)}
              className={`h-9 px-4 rounded-full border text-[13px] font-medium tracking-wide transition-all duration-200 ${
                activeEngine === engine
                  ? 'bg-usa-blue border-usa-blue text-white'
                  : 'bg-transparent border-usa-border text-usa-silver hover:border-usa-blue hover:bg-usa-blue/12'
              }`}
            >
              {engine}
            </motion.button>
          ))}
        </motion.div>

        {/* Metadata Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-5 mt-5"
        >
          {metadataItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.6 + i * 0.08, ease }}
                className="flex items-center gap-1.5 text-xs text-usa-silver"
              >
                <Icon size={14} strokeWidth={1.5} />
                <span>{item.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* === STATS ROW === */}
      <section className="py-5 border-t border-b border-usa-border mt-2">
        <div className="flex justify-around items-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.65 + i * 0.08, ease }}
              className="flex flex-col items-center text-center"
            >
              {stat.isGlobe ? (
                <Globe size={20} className="text-usa-silver mb-1" strokeWidth={1.5} />
              ) : (
                <span className="text-white text-[clamp(1.5rem,6vw,2.25rem)] font-bold tracking-tight">
                  {stat.number}
                </span>
              )}
              <span className="text-usa-silver text-[11px] font-semibold tracking-[0.1em] uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === CONTENT GRID === */}
      <section className="mt-4 px-0">
        <div className="flex items-center gap-2 px-4 pb-2">
          <Grid3X3 size={14} className="text-usa-silver" strokeWidth={1.5} />
          <span className="text-usa-silver text-xs font-semibold tracking-[0.12em] uppercase">
            Content Library
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 px-0">
          {contentCards.map((card, i) => {
            const { badge, Icon, title, meta, gold } = card;
            return (
              <motion.button
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.75 + i * 0.06, ease }}
                onClick={() => {
                  if (title === 'Masterclass Series') navigate('/masterclass');
                  else if (title === 'Music Catalog' || title === 'Audio Collection') navigate('/audio');
                  else if (title === 'Film Collection' || title === 'Video Library') navigate('/video');
                }}
                className={`bg-usa-card border border-usa-border rounded-xl overflow-hidden text-left transition-all duration-200 hover:border-usa-blue hover:-translate-y-0.5 ${
                  i === 6 ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                {/* Media area */}
                <div className="relative aspect-[16/10] flex items-center justify-center">
                  <Icon size={40} />
                  <span
                    className={`absolute top-2 right-2 text-[10px] font-bold tracking-[0.06em] px-2 py-1 rounded-md border ${
                      gold
                        ? 'bg-usa-gold text-black border-usa-gold'
                        : 'bg-black text-white border-usa-border'
                    }`}
                  >
                    {badge}
                  </span>
                </div>
                {/* Text area */}
                <div className="p-3">
                  <h3 className="text-white text-base font-semibold leading-tight flex items-center gap-1.5">
                    {title}
                    {gold && <span className="w-1.5 h-1.5 rounded-full bg-usa-gold inline-block" />}
                  </h3>
                  <p className="text-usa-muted text-xs mt-1 tracking-wide">{meta}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* === GLOBAL DISTRIBUTION === */}
      <section className="mt-4 px-0">
        <div className="flex items-center gap-2 px-4 pb-2">
          <Globe size={14} className="text-usa-silver" strokeWidth={1.5} />
          <span className="text-usa-silver text-xs font-semibold tracking-[0.12em] uppercase">
            Global Distribution
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 px-0">
          {globalCards.map((card, i) => {
            const { badge, Icon, title, meta } = card;
            return (
              <motion.button
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 1.0 + i * 0.06, ease }}
                onClick={() => navigate('/admin')}
                className="bg-usa-card border border-usa-border rounded-xl overflow-hidden text-left transition-all duration-200 hover:border-usa-blue hover:-translate-y-0.5"
              >
                <div className="relative aspect-[16/10] flex items-center justify-center">
                  <Icon size={40} />
                  <span className="absolute top-2 right-2 text-[10px] font-bold tracking-[0.06em] px-2 py-1 rounded-md border bg-black text-white border-usa-border">
                    {badge}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-white text-base font-semibold leading-tight">{title}</h3>
                  <p className="text-usa-muted text-xs mt-1 tracking-wide">{meta}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* === CTA BUTTONS === */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.1 }}
        className="flex justify-center gap-3 mt-5 pb-20"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/audio')}
          className="h-11 px-6 border border-usa-border bg-transparent text-white rounded-full flex items-center gap-2 text-sm font-semibold hover:border-usa-blue hover:bg-usa-blue/10 transition-all"
        >
          <Headphones size={16} strokeWidth={1.5} />
          Listen
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/video')}
          className="h-11 px-6 border border-usa-border bg-transparent text-white rounded-full flex items-center gap-2 text-sm font-semibold hover:border-usa-blue hover:bg-usa-blue/10 transition-all"
        >
          <Play size={16} strokeWidth={1.5} />
          Watch
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="h-12 px-8 bg-white text-black rounded-full text-sm font-bold hover:brightness-95 transition-all"
        >
          Get Access Now
        </motion.button>
      </motion.section>
    </div>
  );
}
