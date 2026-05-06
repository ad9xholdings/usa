import { Globe } from 'lucide-react';

export default function GlobeIcon({ className = '', size = 20 }: { className?: string; size?: number }) {
  return <Globe size={size} className={`text-usa-silver ${className}`} strokeWidth={2} />;
}
