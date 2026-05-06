import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BottomNav from './BottomNav';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-[100dvh] bg-usa-black text-white font-inter">
      <Navbar />
      <main className="pt-14 pb-16">{children}</main>
      <Footer />
      <BottomNav />
    </div>
  );
}
