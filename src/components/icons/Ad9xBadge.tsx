export default function Ad9xBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 bg-usa-card border border-usa-border rounded-full px-4 py-1.5 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-usa-blue" />
      <span className="text-usa-silver text-[13px] font-medium tracking-wide">
        Powered by Ad9x Holdings&#8482;
      </span>
    </div>
  );
}
