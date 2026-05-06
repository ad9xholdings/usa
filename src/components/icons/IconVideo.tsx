import { Video } from 'lucide-react';

export default function IconVideo({ className = '', size = 40 }: { className?: string; size?: number }) {
  return <Video size={size} className={`text-usa-silver ${className}`} strokeWidth={1.5} />;
}
