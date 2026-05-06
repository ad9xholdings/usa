import { GraduationCap } from 'lucide-react';

export default function IconMasterclass({ className = '', size = 40 }: { className?: string; size?: number }) {
  return <GraduationCap size={size} className={`text-usa-silver ${className}`} strokeWidth={1.5} />;
}
