import { Mic } from 'lucide-react';

export default function IconAudio({ className = '', size = 40 }: { className?: string; size?: number }) {
  return <Mic size={size} className={`text-usa-silver ${className}`} strokeWidth={1.5} />;
}
