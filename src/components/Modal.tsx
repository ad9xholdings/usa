import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease }}
            className="w-full max-w-[640px] max-h-[85vh] bg-usa-card border border-usa-border rounded-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-usa-border">
                <h2 className="text-white text-xl font-bold">{title}</h2>
                <button
                  onClick={onClose}
                  className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-usa-elevated transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} className="text-white" strokeWidth={2} />
                </button>
              </div>
            )}
            {!title && (
              <div className="flex justify-end p-2">
                <button
                  onClick={onClose}
                  className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-usa-elevated transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} className="text-white" strokeWidth={2} />
                </button>
              </div>
            )}
            <div className="px-6 pb-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
