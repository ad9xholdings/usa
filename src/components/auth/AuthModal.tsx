import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { X, Mail, Lock, User, ArrowRight, CheckCircle, Wallet } from 'lucide-react';

export default function AuthModal() {
  const { showAuth, closeAuth, authMode, login } = useAuth();
  const { hasPaid } = useCart();
  const [mode, setMode] = useState<'register' | 'login'>(authMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [autoLoggingIn, setAutoLoggingIn] = useState(false);
  const navigate = useNavigate();

  // Auto-login after payment
  useEffect(() => {
    if (showAuth && hasPaid && !autoLoggingIn) {
      setAutoLoggingIn(true);
      setTimeout(() => {
        login();
        setAutoLoggingIn(false);
      }, 2000);
    }
  }, [showAuth, hasPaid, autoLoggingIn, login]);

  // Sync mode when authMode changes
  useEffect(() => {
    setMode(authMode);
  }, [authMode]);

  if (!showAuth) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  // Auto-login state (after payment)
  if (hasPaid && autoLoggingIn) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => { closeAuth(); navigate('/pricing'); }} />
        <div className="relative w-full max-w-[420px] bg-[#0A0A0A] border border-white/[0.08] rounded-2xl p-10 text-center">
          <div className="w-16 h-16 mx-auto rounded-full border border-green-400/20 bg-green-400/5 flex items-center justify-center mb-5">
            <CheckCircle size={32} className="text-green-400/60" />
          </div>
          <h3 className="text-[18px] font-bold text-white/90 mb-2">Payment Confirmed</h3>
          <p className="text-[13px] text-white/40 mb-6">Logging you in automatically...</p>
          <div className="w-10 h-10 mx-auto rounded-full border-2 border-white/10 border-t-white/40 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeAuth} />

      {/* Modal */}
      <div className="relative w-full max-w-[420px] bg-[#0A0A0A] border border-white/[0.08] rounded-2xl overflow-hidden">
        <button
          onClick={closeAuth}
          className="absolute top-4 right-4 p-2 hover:bg-white/[0.04] rounded-lg transition-colors z-10"
        >
          <X size={18} className="text-white/40" />
        </button>

        {/* Header */}
        <div className="px-6 pt-8 pb-4 text-center">
          <svg width="40" height="46" viewBox="0 0 52 60" fill="none" className="mx-auto opacity-70 mb-4">
            <path d="M26 0L51.98 15V45L26 60L0.02 45V15L26 0Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none" />
            <circle cx="26" cy="30" r="6" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none" />
          </svg>
          <h2 className="text-[22px] font-bold text-white/90">
            {mode === 'register' ? 'Get Access Now' : 'Welcome Back'}
          </h2>
          <p className="text-[12px] text-white/40 mt-1">
            {mode === 'register'
              ? 'Join the United Series of America ecosystem'
              : 'Sign in to your USA Master account'}
          </p>
        </div>

        {/* Wallet Payment Option */}
        <div className="px-6 pb-4">
          <button
            onClick={closeAuth}
            className="w-full h-[48px] rounded-xl flex items-center justify-center gap-2 text-[13px] text-white/60 border border-white/10 hover:bg-white/[0.03] transition-colors"
          >
            <Wallet size={16} className="text-white/40" />
            Pay with Arculus via WisdomPay
            <ArrowRight size={14} className="text-white/30" />
          </button>
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-[10px] text-white/25 uppercase">or</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          {mode === 'register' && (
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full h-[48px] pl-11 pr-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[14px] text-white/70 placeholder:text-white/25 outline-none focus:border-white/20 transition-colors"
              />
            </div>
          )}

          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full h-[48px] pl-11 pr-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[14px] text-white/70 placeholder:text-white/25 outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full h-[48px] pl-11 pr-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[14px] text-white/70 placeholder:text-white/25 outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full h-[48px] rounded-xl flex items-center justify-center gap-2 text-[14px] font-semibold text-black transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              background: 'linear-gradient(180deg, #E8ECF0 0%, #BCC6CC 50%, #8A9499 100%)',
            }}
          >
            {mode === 'register' ? 'Get Access Now' : 'Sign In'}
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Toggle */}
        <div className="px-6 pb-8 text-center">
          <p className="text-[12px] text-white/30">
            {mode === 'register' ? 'Already have an account? ' : "Don't have an account? "}
            <button
              onClick={() => setMode(mode === 'register' ? 'login' : 'register')}
              className="text-white/60 hover:text-white/80 underline underline-offset-2 transition-colors"
            >
              {mode === 'register' ? 'Sign In' : 'Get Access Now'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
