import { Menu, Search, Bell } from 'lucide-react';

interface TopBarProps {
  onMenuToggle: () => void;
}

export default function TopBar({ onMenuToggle }: TopBarProps) {
  return (
    <header className="h-14 bg-usa-card border-b border-usa-border flex items-center justify-between px-4 sticky top-0 z-40">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-usa-elevated transition-colors lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu size={20} className="text-usa-silver" strokeWidth={2} />
        </button>
        <h1 className="text-base font-semibold text-white hidden lg:block">Admin Panel</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        <button
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-usa-elevated transition-colors"
          aria-label="Search"
        >
          <Search size={20} className="text-usa-silver" strokeWidth={1.5} />
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-usa-elevated transition-colors relative"
          aria-label="Notifications"
        >
          <Bell size={20} className="text-usa-silver" strokeWidth={1.5} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#EF4444] rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-usa-border flex items-center justify-center ml-1">
          <span className="text-xs font-semibold text-white">A</span>
        </div>
      </div>
    </header>
  );
}
