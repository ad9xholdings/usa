import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-[100dvh] bg-black text-white">
      <Outlet />
    </div>
  );
}
