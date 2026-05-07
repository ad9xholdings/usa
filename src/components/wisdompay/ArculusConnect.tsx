import { useState } from 'react';
import { QrCode, Copy, CheckCircle, ArrowRight, Shield, ExternalLink } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ArculusConnectProps {
  onPaymentComplete: () => void;
  onCancel: () => void;
}

// DAO Treasury — Arculus cold storage wallet mapped to United Series of America Master DAO, LLC
const DAO_TREASURY_ADDRESS = 'rDaoTreasuryUnitedSeriesAmericaMaster7';

export default function ArculusConnect({ onPaymentComplete, onCancel }: ArculusConnectProps) {
  const { items, totalXRP, markPaid } = useCart();
  const [step, setStep] = useState<'connect' | 'scan' | 'processing' | 'complete'>('connect');
  const [_walletAddress, _setWalletAddress] = useState('');
  const [copied, setCopied] = useState(false);

  const paymentUri = `xrpl:${DAO_TREASURY_ADDRESS}?amount=${totalXRP}&dt=1&memo=WisdomPay+Subscription`;

  const copyAddress = () => {
    navigator.clipboard.writeText(DAO_TREASURY_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentSent = () => {
    setStep('processing');
    // Simulate XRPL ledger confirmation (3-5 seconds)
    setTimeout(() => {
      setStep('complete');
      markPaid();
    }, 3000);
  };

  return (
    <div className="w-full">
      {/* Step 1: Connect Arculus */}
      {step === 'connect' && (
        <div className="space-y-5">
          <div className="text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center mb-4">
              <Shield size={24} className="text-white/50" />
            </div>
            <p className="text-[11px] tracking-[0.2em] text-white/40 uppercase mb-1">WisdomPay</p>
            <h3 className="text-[18px] font-bold text-white/90">Connect Arculus</h3>
            <p className="text-[12px] text-white/35 mt-1">Cold storage wallet required</p>
          </div>

          {/* MTA Contract Notice */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="flex items-center gap-2 mb-2">
              <ExternalLink size={12} className="text-white/30" />
              <span className="text-[10px] tracking-[0.15em] text-white/30 uppercase">MTA Contract</span>
            </div>
            <p className="text-[11px] text-white/40 leading-relaxed">
              WisdomPay contracts with the MTA to provide this cart service. 
              All payments route through MTA rails to the DAO Treasury.
            </p>
          </div>

          {/* Payment Summary */}
          <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Payment Summary</p>
            {items.map(item => (
              <div key={item.id} className="flex justify-between py-1.5">
                <span className="text-[13px] text-white/60">{item.name}</span>
                <span className="text-[13px] text-white/60">{item.price}/{item.period}</span>
              </div>
            ))}
            <div className="border-t border-white/[0.06] mt-2 pt-2 flex justify-between">
              <span className="text-[14px] font-semibold text-white/80">Total</span>
              <span className="text-[18px] font-black text-white/90">{totalXRP.toFixed(2)} XRP</span>
            </div>
          </div>

          {/* DAO Treasury */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">DAO Treasury</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-[11px] text-white/50 font-mono truncate">{DAO_TREASURY_ADDRESS}</code>
              <button onClick={copyAddress} className="p-1.5 hover:bg-white/[0.04] rounded-lg transition-colors">
                {copied ? <CheckCircle size={14} className="text-green-400/60" /> : <Copy size={14} className="text-white/30" />}
              </button>
            </div>
            <p className="text-[9px] text-white/25 mt-1">
              United Series of America Master DAO, LLC — Republic of Marshall Islands
            </p>
          </div>

          <button
            onClick={() => setStep('scan')}
            className="w-full h-[52px] rounded-xl text-[14px] font-semibold text-black flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(180deg, #E8ECF0 0%, #BCC6CC 50%, #8A9499 100%)' }}
          >
            Connect Arculus Wallet
            <ArrowRight size={16} />
          </button>

          <button
            onClick={onCancel}
            className="w-full h-[40px] text-[12px] text-white/30 hover:text-white/50 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Step 2: Scan QR */}
      {step === 'scan' && (
        <div className="space-y-5">
          <div className="text-center">
            <p className="text-[11px] text-white/40 mb-1">Arculus Connected</p>
            <p className="text-[24px] font-black text-white/90">{totalXRP.toFixed(2)} <span className="text-[14px] text-white/40">XRP</span></p>
          </div>

          {/* QR */}
          <div className="flex justify-center">
            <div className="w-[180px] h-[180px] rounded-2xl border-2 border-white/[0.1] bg-white flex items-center justify-center p-3">
              <QrCode size={120} className="text-black/80" />
            </div>
          </div>

          <p className="text-[11px] text-white/30 text-center">
            Scan with your Arculus card to sign and send
          </p>

          {/* Payment URI */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <p className="text-[9px] text-white/25 uppercase tracking-wider mb-1">Payment URI</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-[9px] text-white/35 truncate font-mono">{paymentUri}</code>
              <button onClick={() => { navigator.clipboard.writeText(paymentUri); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="p-1">
                {copied ? <CheckCircle size={12} className="text-green-400/60" /> : <Copy size={12} className="text-white/25" />}
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <Shield size={14} className="text-white/30 mt-0.5 shrink-0" />
            <p className="text-[10px] text-white/30 leading-relaxed">
              Your private keys remain on your Arculus card. Only the signed transaction is broadcast. Verify the DAO Treasury address on your card screen before confirming.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep('connect')}
              className="flex-1 h-[44px] rounded-xl border border-white/10 text-[12px] text-white/40 hover:bg-white/[0.03] transition-colors"
            >
              Back
            </button>
            <button
              onClick={handlePaymentSent}
              className="flex-1 h-[44px] rounded-xl text-[12px] font-semibold text-black"
              style={{ background: 'linear-gradient(180deg, #E8ECF0 0%, #BCC6CC 50%, #8A9499 100%)' }}
            >
              I've Signed on Arculus
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Processing */}
      {step === 'processing' && (
        <div className="text-center space-y-6 py-8">
          <div className="w-16 h-16 mx-auto rounded-full border-2 border-white/10 border-t-white/40 animate-spin" />
          <div>
            <p className="text-[16px] font-bold text-white/80">Confirming on XRPL</p>
            <p className="text-[12px] text-white/35 mt-1">Validating transaction on the XRP Ledger...</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] max-w-[280px] mx-auto">
            <p className="text-[10px] text-white/25 font-mono">Tx: {DAO_TREASURY_ADDRESS.slice(0, 12)}...{DAO_TREASURY_ADDRESS.slice(-8)}</p>
            <p className="text-[10px] text-white/25 font-mono mt-1">Amount: {totalXRP.toFixed(2)} XRP</p>
          </div>
        </div>
      )}

      {/* Step 4: Complete */}
      {step === 'complete' && (
        <div className="text-center space-y-6 py-6">
          <div className="w-16 h-16 mx-auto rounded-full border border-green-400/20 bg-green-400/5 flex items-center justify-center">
            <CheckCircle size={32} className="text-green-400/60" />
          </div>
          <div>
            <p className="text-[18px] font-bold text-white/90">Payment Confirmed</p>
            <p className="text-[12px] text-white/40 mt-1">
              {totalXRP.toFixed(2)} XRP received by DAO Treasury
            </p>
          </div>

          {/* SkyIvy Token Notice */}
          <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] max-w-[320px] mx-auto">
            <p className="text-[10px] tracking-[0.15em] text-white/30 uppercase mb-2">SkyIvy Token Allocation</p>
            <p className="text-[22px] font-black text-white/80">
              {(totalXRP * 1000).toLocaleString()}
            </p>
            <p className="text-[11px] text-white/40">SKYIvy tokens allocated</p>
            <p className="text-[9px] text-white/25 mt-2 font-mono">
              21,000,000,000,000 Total Supply &middot; 15 decimals
            </p>
          </div>

          <button
            onClick={onPaymentComplete}
            className="w-full max-w-[280px] mx-auto h-[52px] rounded-xl text-[14px] font-semibold text-black flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(180deg, #E8ECF0 0%, #BCC6CC 50%, #8A9499 100%)' }}
          >
            Continue to Login
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
