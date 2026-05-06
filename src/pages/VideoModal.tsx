import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Video, Play } from 'lucide-react';
import { Modal } from '@/components/Modal';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const filters = ['All', 'Music', 'Movies', 'Education', 'Masterclass'];

const videos = [
  { id: 1, title: 'USA Platform Overview 2025', duration: '45:00', views: '15K', category: 'Education' },
  { id: 2, title: 'SORME Search Tutorial', duration: '22:30', views: '8.5K', category: 'Education' },
  { id: 3, title: 'DAO Governance Live', duration: '1:12:00', views: '22K', category: 'Masterclass' },
  { id: 4, title: 'SubDAO Launch Event', duration: '35:45', views: '11K', category: 'Education' },
  { id: 5, title: 'Revenue Share Explained', duration: '18:20', views: '6.2K', category: 'Movies' },
  { id: 6, title: 'Ask Concierge Demo', duration: '28:15', views: '9.8K', category: 'Education' },
];

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [descExpanded, setDescExpanded] = useState(false);

  const filteredVideos = activeFilter === 'All'
    ? videos
    : videos.filter((v) => v.category === activeFilter);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="640px">
      <div className="flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-usa-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <Video size={20} className="text-usa-blue" strokeWidth={2} />
            <h2 className="text-white text-xl font-bold tracking-tight">Video</h2>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-usa-elevated transition-colors"
            aria-label="Close modal"
          >
            <X size={20} className="text-usa-silver hover:text-white" strokeWidth={2} />
          </button>
        </div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.1, ease }}
          className="relative aspect-video bg-black mx-4 mt-4 rounded-xl overflow-hidden flex-shrink-0"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 rounded-full bg-usa-blue/80 flex items-center justify-center hover:bg-usa-blue transition-colors active:scale-95">
              <Play size={24} className="text-white ml-1" fill="white" />
            </button>
          </div>
          {/* Controls bar */}
          <div className="absolute bottom-0 left-0 right-0 h-10 px-3 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-2 flex-1">
              <Play size={14} className="text-white" fill="white" />
              <div className="flex-1 h-[3px] bg-usa-border rounded-full overflow-hidden">
                <div className="h-full bg-usa-blue rounded-full" style={{ width: '35%' }} />
              </div>
              <span className="text-white text-[11px] whitespace-nowrap">12:34 / {selectedVideo.duration}</span>
            </div>
          </div>
        </motion.div>

        {/* Video Info */}
        <div className="px-4 py-4 border-b border-usa-border flex-shrink-0">
          <h3 className="text-white text-lg font-semibold">{selectedVideo.title}</h3>
          <p className="text-usa-muted text-xs mt-1">
            Ad9x Holdings · {selectedVideo.views} views · Uploaded June 2025
          </p>
          <p className={`text-usa-silver text-sm mt-2 leading-relaxed ${descExpanded ? '' : 'line-clamp-2'}`}>
            Comprehensive overview of the USA intelligence platform, SORME search capabilities, and the complete document ecosystem. Explore how the platform connects documents, binders, and governance structures into a unified experience.
          </p>
          {!descExpanded && (
            <button
              onClick={() => setDescExpanded(true)}
              className="text-usa-blue text-xs font-medium mt-1 hover:underline"
            >
              ...more
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 px-4 py-3 overflow-x-auto flex-shrink-0">
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

        {/* Video Grid */}
        <div className="grid grid-cols-2 gap-3 px-4 pb-4 overflow-y-auto flex-1">
          {filteredVideos.map((video, i) => (
            <motion.button
              key={video.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.25 + i * 0.05, ease }}
              onClick={() => setSelectedVideo(video)}
              className="text-left"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-black/60 flex items-center justify-center">
                  <Play size={10} className="text-white ml-0.5" fill="white" />
                </div>
                {/* Duration badge */}
                <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>
              {/* Title */}
              <h4 className="text-white text-[13px] font-medium truncate mt-1.5">
                {video.title}
              </h4>
              <p className="text-usa-muted text-[11px] mt-0.5">{video.views} views</p>
            </motion.button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
