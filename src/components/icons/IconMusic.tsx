import { Headphones } from 'lucide-react';

export default function IconMusic({ className = '', size = 40 }: { className?: string; size?: number }) {
  return <Headphones size={size} className={`text-usa-silver ${className}`} strokeWidth={1.5} />;
}
