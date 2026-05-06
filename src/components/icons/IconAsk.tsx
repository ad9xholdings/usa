import { MessageCircle } from 'lucide-react';

export default function IconAsk({ className = '', size = 24, strokeWidth = 2 }: { className?: string; size?: number; strokeWidth?: number }) {
  return <MessageCircle size={size} className={className} strokeWidth={strokeWidth} />;
}
