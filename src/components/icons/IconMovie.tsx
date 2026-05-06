import { Film } from 'lucide-react';

export default function IconMovie({ className = '', size = 40 }: { className?: string; size?: number }) {
  return <Film size={size} className={`text-usa-silver ${className}`} strokeWidth={1.5} />;
}
