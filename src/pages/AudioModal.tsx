import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Headphones, SkipBack, Play, Pause, SkipForward } from 'lucide-react';
import { Modal } from '@/components/Modal';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const playlist = [
  { id: 1, title: 'USA Intelligence Briefing', artist: 'Ad9x Holdings Network', duration: '45:00' },
  { id: 2, title: 'DAO Governance Call Recording', artist: 'Ad9x Holdings Network', duration: '38:24' },
  { id: 3, title: 'SubDAO Structure Explained', artist: 'Ad9x Holdings Network', duration: '52:15' },
  { id: 4, title: 'SORME Engine Deep Dive', artist: 'Ad9x Holdings Network', duration: '41:30' },
  { id: 5, title: 'Revenue Share Overview', artist: 'Ad9x Holdings Network', duration: '33:45' },
  { id: 6, title: 'Legal Framework Walkthrough', artist: 'Ad9x Holdings Network', duration: '55:10' },
  { id: 7, title: 'Launch Gate Checklist', artist: 'Ad9x Holdings Network', duration: '28:00' },
  { id: 8, title: 'RMI DAO Introduction', artist: 'Ad9x Holdings Network', duration: '22:15' },
];

interface AudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AudioModal({ isOpen, onClose }: AudioModalProps) {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress] = useState(35); // Mock progress percentage

  const track = playlist[currentTrack];

  const handlePrev = () => {
    setCurrentTrack((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev === playlist.length - 1 ? 0 : prev + 1));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="480px">
      <div className="flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-usa-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <Headphones size={20} className="text-usa-blue" strokeWidth={2} />
            <h2 className="text-white text-xl font-bold tracking-tight">Audio</h2>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-usa-elevated transition-colors"
            aria-label="Close modal"
          >
            <X size={20} className="text-usa-silver hover:text-white" strokeWidth={2} />
          </button>
        </div>

        {/* Now Playing Section */}
        <div className="flex flex-col items-center px-4 py-6 border-b border-usa-border flex-shrink-0">
          {/* Album art */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1, ease }}
            className="w-[120px] h-[120px] bg-usa-elevated border border-usa-border rounded-xl flex items-center justify-center"
          >
            <Headphones size={48} className="text-usa-blue" strokeWidth={1.5} />
          </motion.div>

          {/* Track info */}
          <h3 className="text-white text-lg font-semibold text-center mt-4">{track.title}</h3>
          <p className="text-usa-silver text-sm text-center mt-1">{track.artist}</p>

          {/* Playback Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex items-center gap-6 mt-4"
          >
            <button
              onClick={handlePrev}
              className="text-usa-silver hover:text-white transition-colors"
              aria-label="Previous track"
            >
              <SkipBack size={24} strokeWidth={2} />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-usa-blue flex items-center justify-center hover:brightness-115 transition-all active:scale-95"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={20} className="text-white" fill="white" />
              ) : (
                <Play size={20} className="text-white ml-0.5" fill="white" />
              )}
            </button>

            <button
              onClick={handleNext}
              className="text-usa-silver hover:text-white transition-colors"
              aria-label="Next track"
            >
              <SkipForward size={24} strokeWidth={2} />
            </button>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-full mt-4">
            <div className="relative h-1 bg-usa-border rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-usa-blue rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-usa-muted text-[11px]">12:34</span>
              <span className="text-usa-muted text-[11px]">{track.duration}</span>
            </div>
          </div>
        </div>

        {/* Playlist Header */}
        <div className="px-4 py-3 flex-shrink-0">
          <span className="text-usa-silver text-xs font-semibold tracking-[0.12em] uppercase">
            PLAYLIST
          </span>
        </div>

        {/* Playlist */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="flex flex-col">
            {playlist.map((item, i) => {
              const isActive = i === currentTrack;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.25 + i * 0.04, ease }}
                  onClick={() => {
                    setCurrentTrack(i);
                    setIsPlaying(true);
                  }}
                  className={`flex items-center gap-3 h-14 px-3 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-usa-blue/10 border-l-2 border-usa-blue'
                      : 'hover:bg-usa-elevated border-l-2 border-transparent'
                  }`}
                >
                  {/* Track number or playing indicator */}
                  <div className="w-6 flex-shrink-0">
                    {isActive && isPlaying ? (
                      <div className="flex items-end gap-0.5 h-3">
                        <span className="w-0.5 h-3 bg-usa-blue rounded-full animate-[bounce_1s_ease-in-out_infinite]" />
                        <span className="w-0.5 h-2 bg-usa-blue rounded-full animate-[bounce_1s_ease-in-out_infinite_0.1s]" />
                        <span className="w-0.5 h-1.5 bg-usa-blue rounded-full animate-[bounce_1s_ease-in-out_infinite_0.2s]" />
                      </div>
                    ) : (
                      <span className="text-usa-muted text-xs">{item.id}</span>
                    )}
                  </div>

                  {/* Track info */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isActive ? 'text-usa-blue' : 'text-white'}`}>
                      {item.title}
                    </p>
                    <p className="text-usa-muted text-xs truncate">{item.artist}</p>
                  </div>

                  {/* Duration */}
                  <span className="text-usa-muted text-xs flex-shrink-0">{item.duration}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
}
