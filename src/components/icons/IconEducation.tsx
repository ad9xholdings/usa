import { BookOpen } from 'lucide-react';

export default function IconEducation({ className = '', size = 40 }: { className?: string; size?: number }) {
  return <BookOpen size={size} className={`text-usa-silver ${className}`} strokeWidth={1.5} />;
}
