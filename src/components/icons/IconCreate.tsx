import { PlusSquare } from 'lucide-react';

export default function IconCreate({ className = '', size = 24, strokeWidth = 2 }: { className?: string; size?: number; strokeWidth?: number }) {
  return <PlusSquare size={size} className={className} strokeWidth={strokeWidth} />;
}
