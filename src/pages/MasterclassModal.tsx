import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, GraduationCap, Play } from 'lucide-react';
import { Modal } from '@/components/Modal';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const filters = ['All', 'Business', 'Technology', 'Creative', 'Leadership'];

const episodes = [
  { ep: 1, title: 'Building the USA Foundation', duration: '45 min', views: '12K', category: 'Business' },
  { ep: 2, title: 'DAO Governance Essentials', duration: '38 min', views: '9.2K', category: 'Business' },
  { ep: 3, title: 'SORME Search Mastery', duration: '52 min', views: '15K', category: 'Technology' },
  { ep: 4, title: 'SubDAO Architecture', duration: '41 min', views: '8.7K', category: 'Technology' },
  { ep: 5, title: 'AI-Powered Analytics', duration: '48 min', views: '11K', category: 'Technology' },
  { ep: 6, title: 'Legal Framework Deep Dive', duration: '55 min', views: '6.3K', category: 'Leadership' },
  { ep: 7, title: 'Revenue Share Models', duration: '33 min', views: '7.8K', category: 'Business' },
  { ep: 8, title: 'Launch Gate Strategies', duration: '60 min', views: '10K', category: 'Leadership' },
];

interface MasterclassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MasterclassModal({ isOpen, onClose }: MasterclassModalProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredEpisodes = activeFilter === 'All'
    ? episodes
    : episodes.filter((e) => e.category === activeFilter);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="640px">
      <div className="flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-usa-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <GraduationCap size={20} className="text-usa-blue" strokeWidth={2} />
            <h2 className="text-white text-xl font-bold tracking-tight">Masterclass</h2>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-usa-elevated transition-colors"
            aria-label="Close modal"
          >
            <X size={20} className="text-usa-silver hover:text-white" strokeWidth={2} />
          </button>
        </div>

        {/* Subtitle */}
        <p className="text-usa-silver text-sm text-center px-4 py-3">
          Premium education series powered by 9x AI
        </p>

        {/* Filter Pills */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto flex-shrink-0">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`h-9 px-4 rounded-full border text-[13px] font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-usa-blue border-usa-blue text-white'
                  : 'bg-transparent border-usa-border text-usa-silver hover:border-usa-blue hover:bg-usa-blue/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Episode Grid */}
        <div className="grid grid-cols-2 gap-3 px-4 pb-4 overflow-y-auto flex-1">
          {filteredEpisodes.map((episode, i) => (
            <motion.button
              key={episode.ep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.2 + i * 0.05, ease }}
              className="bg-usa-elevated border border-usa-border rounded-xl overflow-hidden text-left transition-all duration-200 hover:border-usa-blue hover:-translate-y-0.5"
            >
              {/* Thumbnail area */}
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-usa-blue/80 flex items-center justify-center">
                  <Play size={14} className="text-white ml-0.5" fill="white" />
                </div>
              </div>
              {/* Info area */}
              <div className="p-3">
                <span className="inline-block bg-usa-blue text-white text-[10px] font-bold tracking-[0.06em] px-1.5 py-0.5 rounded mb-1.5">
                  EP. {episode.ep}
                </span>
                <h3 className="text-white text-sm font-semibold leading-tight">
                  {episode.title}
                </h3>
                <p className="text-usa-muted text-xs mt-1 tracking-wide">
                  {episode.duration} · {episode.views} views
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="px-4 py-4 border-t border-usa-border flex-shrink-0">
          <button className="w-full h-12 bg-usa-blue text-white rounded-full font-semibold text-sm hover:brightness-115 transition-all">
            View Full Curriculum
          </button>
        </div>
      </div>
    </Modal>
  );
}
