import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  ShieldCheck,
  Flag,
  Users,
  Lock,
  DollarSign,
  FileSignature,
  BarChart3,
  Rocket,
  Settings,
  X,
} from 'lucide-react';

export type AdminView =
  | 'dashboard'
  | 'documents'
  | 'compliance'
  | 'phase-gates'
  | 'governance'
  | 'security'
  | 'finance'
  | 'agreements'
  | 'exhibits'
  | 'launch-gates'
  | 'settings';

const navItems: { icon: React.ElementType; label: string; view: AdminView }[] = [
  { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard' },
  { icon: FileText, label: 'Documents', view: 'documents' },
  { icon: ShieldCheck, label: 'Compliance', view: 'compliance' },
  { icon: Flag, label: 'Phase Gates', view: 'phase-gates' },
  { icon: Users, label: 'Governance', view: 'governance' },
  { icon: Lock, label: 'Security', view: 'security' },
  { icon: DollarSign, label: 'Finance', view: 'finance' },
  { icon: FileSignature, label: 'Agreements', view: 'agreements' },
  { icon: BarChart3, label: 'Exhibits', view: 'exhibits' },
  { icon: Rocket, label: 'Launch Gates', view: 'launch-gates' },
  { icon: Settings, label: 'Settings', view: 'settings' },
];

interface SidebarProps {
  activeView: AdminView;
  onViewChange: (view: AdminView) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ activeView, onViewChange, isOpen, onToggle }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={onToggle}
            />
          )}
        </AnimatePresence>
      )}

      {/* Sidebar */}
      <aside
        className={
          isMobile
            ? `fixed top-0 left-0 bottom-0 w-[280px] z-50 bg-usa-card border-r border-usa-border transform transition-transform duration-300 ease-out ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'fixed top-0 left-0 bottom-0 w-[260px] z-50 bg-usa-card border-r border-usa-border'
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-usa-border">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-base tracking-tight">USA&trade;</span>
            <span className="text-[10px] font-semibold bg-usa-blue text-white px-1.5 py-0.5 rounded">Admin</span>
          </div>
          {isMobile && (
            <button
              onClick={onToggle}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-usa-elevated transition-colors"
              aria-label="Close sidebar"
            >
              <X size={20} className="text-usa-silver" strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="py-2 flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => {
                  onViewChange(item.view);
                  if (isMobile) onToggle();
                }}
                className={`w-full flex items-center gap-3 h-11 px-4 text-left transition-colors relative ${
                  isActive
                    ? 'bg-[rgba(0,53,148,0.1)] text-white'
                    : 'text-usa-silver hover:bg-usa-elevated'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-usa-blue" />
                )}
                <Icon
                  size={20}
                  className={isActive ? 'text-white' : 'text-usa-silver'}
                  strokeWidth={isActive ? 2 : 1.5}
                />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-usa-border bg-usa-card">
          <div className="px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-usa-border flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-white">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin User</p>
                <p className="text-[11px] text-usa-muted truncate">admin@ad9xholdings.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
