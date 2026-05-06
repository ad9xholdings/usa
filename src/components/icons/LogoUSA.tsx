export default function LogoUSA({ className = '' }: { className?: string }) {
  return (
    <span className={`font-inter font-extrabold text-white tracking-tight ${className}`}>
      USA<span className="text-usa-silver text-sm font-normal align-super">&#8482;</span>
    </span>
  );
}
