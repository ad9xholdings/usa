import { FileText } from 'lucide-react';

export default function IconDocs({ className = '', size = 40 }: { className?: string; size?: number }) {
  return <FileText size={size} className={`text-usa-silver ${className}`} strokeWidth={1.5} />;
}
