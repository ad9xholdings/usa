import { Home } from 'lucide-react';

export default function IconHome({ className = '', size = 24, strokeWidth = 2 }: { className?: string; size?: number; strokeWidth?: number }) {
  return <Home size={size} className={className} strokeWidth={strokeWidth} />;
}
