import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import ArculusConnect from './ArculusConnect';
import { X, Minus, Plus, ArrowRight, ShoppingCart } from 'lucide-react';

interface WisdomPayCartProps {
  onPaymentComplete: () => void;
}

export default function WisdomPayCart({ onPaymentComplete }: WisdomPayCartProps) {
  const { items, showCart, closeCart, removeItem, totalXRP, itemCount } = useCart();
  const [showPayment, setShowPayment] = useState(false);

  if (!showCart) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeCart} />

      {/* Cart Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-[420px] bg-[#0A0A0A] border-l border-white/[0.06] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-white/[0.04] shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart size={16} className="text-white/40" />
            <span className="text-[13px] font-semibold text-white/80">WisdomPay Cart</span>
            {itemCount > 0 && (
              <span className="text-[10px] text-white/30 font-mono">({itemCount})</span>
            )}
          </div>
          <button onClick={closeCart} className="p-2 hover:bg-white/[0.04] rounded-lg transition-colors">
            <X size={18} className="text-white/40" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart size={40} className="text-white/15 mb-4" />
              <p className="text-[13px] text-white/30">Your cart is empty</p>
              <p className="text-[11px] text-white/20 mt-1">Select a plan to begin</p>
            </div>
          ) : showPayment ? (
            <ArculusConnect
              onPaymentComplete={() => {
                setShowPayment(false);
                onPaymentComplete();
              }}
              onCancel={() => setShowPayment(false)}
            />
          ) : (
            <div className="space-y-4">
              {/* MTA Contract Badge */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[9px] tracking-[0.15em] text-white/25 uppercase">MTA Cart Provider</span>
              </div>

              {/* Items */}
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-[14px] font-semibold text-white/80">{item.name}</p>
                      <p className="text-[11px] text-white/30 mt-0.5">{item.description}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 hover:bg-white/[0.04] rounded transition-colors"
                    >
                      <X size={14} className="text-white/25" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button className="w-7 h-7 rounded-lg border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.04]">
                        <Minus size={12} className="text-white/30" />
                      </button>
                      <span className="text-[13px] text-white/50 font-mono w-6 text-center">{item.quantity}</span>
                      <button className="w-7 h-7 rounded-lg border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.04]">
                        <Plus size={12} className="text-white/30" />
                      </button>
                    </div>
                    <p className="text-[16px] font-bold text-white/70">{item.price}<span className="text-[11px] text-white/30">/{item.period}</span></p>
                  </div>
                </div>
              ))}

              {/* Summary */}
              <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-2">
                <div className="flex justify-between text-[12px]">
                  <span className="text-white/40">Subtotal</span>
                  <span className="text-white/60 font-mono">{totalXRP.toFixed(2)} XRP</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-white/40">Network Fee</span>
                  <span className="text-white/60 font-mono">0.000012 XRP</span>
                </div>
                <div className="border-t border-white/[0.06] pt-2 flex justify-between">
                  <span className="text-[13px] font-semibold text-white/70">Total</span>
                  <span className="text-[18px] font-black text-white/90 font-mono">{(totalXRP + 0.000012).toFixed(6)} XRP</span>
                </div>
              </div>

              {/* Treasury Destination */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <p className="text-[9px] tracking-[0.15em] text-white/25 uppercase mb-1">Receiving Address</p>
                <p className="text-[10px] text-white/40 font-mono truncate">
                  rDaoTreasuryUnitedSeriesAmericaMaster7
                </p>
                <p className="text-[9px] text-white/20 mt-0.5">
                  United Series of America Master DAO, LLC Treasury
                </p>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setShowPayment(true)}
                className="w-full h-[52px] rounded-xl text-[14px] font-semibold text-black flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(180deg, #E8ECF0 0%, #BCC6CC 50%, #8A9499 100%)' }}
              >
                Pay with Arculus
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
