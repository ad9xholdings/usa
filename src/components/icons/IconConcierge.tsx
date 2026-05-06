import { Sparkles } from 'lucide-react';

export default function IconConcierge({ className = '', size = 48 }: { className?: string; size?: number }) {
  return <Sparkles size={size} className={`text-usa-silver ${className}`} strokeWidth={1.5} />;
}
