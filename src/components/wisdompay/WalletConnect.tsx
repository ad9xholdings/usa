import { useState } from 'react';
import { Wallet, QrCode, ArrowRight, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface WalletConnectProps {
  onConnected: (address: string) => void;
  onCancel: () => void;
}

const WALLET_OPTIONS = [
  { name: 'Xaman', type: 'software', desc: 'Mobile app wallet' },
  { name: 'Ledger', type: 'hardware', desc: 'Hardware cold storage' },
  { name: 'Trezor', type: 'hardware', desc: 'Hardware cold storage' },
  { name: 'WalletConnect', type: 'protocol', desc: 'Connect any wallet' },
];

export default function WalletConnect({ onConnected, onCancel }: WalletConnectProps) {
  const { totalXRP } = useCart();
  const [step, setStep] = useState<'select' | 'qr' | 'confirm'>('select');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [copied, setCopied] = useState(false);

  // Mock XRP Ledger testnet address
  const paymentUri = `xrpl:${walletAddress || 'rN7n7otQDd6FczFgLdlqtyMVrn3HMfHgFj'}?amount=${totalXRP}&dt=1`;

  const handleSelect = (name: string) => {
    setSelectedWallet(name);
    setStep('qr');
  };

  const handleManualAddress = () => {
    if (addressInput.length > 25 && addressInput.startsWith('r')) {
      setWalletAddress(addressInput);
      onConnected(addressInput);
    }
  };

  const copyUri = () => {
    navigator.clipboard.writeText(paymentUri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      {step === 'select' && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <p className="text-[12px] text-white/40 mb-1">Payment Amount</p>
            <p className="text-[28px] font-black text-white/90">{totalXRP.toFixed(2)} <span className="text-[16px] font-medium text-white/50">XRP</span></p>
          </div>

          <p className="text-[11px] text-white/40 text-center mb-4">
            Connect your cold storage wallet containing XRP
          </p>

          {WALLET_OPTIONS.map((w) => (
            <button
              key={w.name}
              onClick={() => handleSelect(w.name)}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all text-left"
            >
              <div className="w-10 h-10 rounded-lg border border-white/[0.08] flex items-center justify-center shrink-0">
                <Wallet size={18} className="text-white/40" />
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-semibold text-white/80">{w.name}</p>
                <p className="text-[11px] text-white/30">{w.desc}</p>
              </div>
              <ArrowRight size={16} className="text-white/20" />
            </button>
          ))}

          {/* Manual address entry */}
          <div className="pt-4 border-t border-white/[0.04]">
            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Or enter wallet address</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                placeholder="r... (XRP Ledger address)"
                className="flex-1 h-[44px] px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[13px] text-white/60 placeholder:text-white/20 outline-none focus:border-white/20"
              />
              <button
                onClick={handleManualAddress}
                className="h-[44px] px-4 rounded-xl border border-white/10 text-[12px] text-white/50 hover:bg-white/[0.04] transition-colors shrink-0"
              >
                Connect
              </button>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="w-full h-[44px] text-[12px] text-white/30 hover:text-white/50 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {step === 'qr' && (
        <div className="space-y-5">
          <div className="text-center">
            <p className="text-[12px] text-white/50 mb-1">Connected via {selectedWallet}</p>
            <p className="text-[24px] font-black text-white/90">{totalXRP.toFixed(2)} <span className="text-[14px] text-white/40">XRP</span></p>
          </div>

          {/* QR Code placeholder */}
          <div className="flex justify-center">
            <div className="w-[200px] h-[200px] rounded-2xl border border-white/[0.08] bg-white flex items-center justify-center">
              <QrCode size={80} className="text-black/80" />
            </div>
          </div>

          <p className="text-[11px] text-white/30 text-center">
            Scan with {selectedWallet} to sign transaction
          </p>

          {/* Payment URI */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <code className="flex-1 text-[10px] text-white/40 truncate font-mono">{paymentUri}</code>
            <button onClick={copyUri} className="p-1.5 hover:bg-white/[0.04] rounded-lg transition-colors shrink-0">
              {copied ? <CheckCircle size={14} className="text-green-400/60" /> : <Copy size={14} className="text-white/30" />}
            </button>
          </div>

          {/* Security notice */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <AlertCircle size={14} className="text-white/30 mt-0.5 shrink-0" />
            <p className="text-[10px] text-white/30 leading-relaxed">
              Your private keys never leave your device. This app only requests a signature. Verify all transaction details on your wallet before confirming.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep('select')}
              className="flex-1 h-[44px] rounded-xl border border-white/10 text-[12px] text-white/40 hover:bg-white/[0.03] transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => {
                setWalletAddress('rN7n7otQDd6FczFgLdlqtyMVrn3HMfHgFj');
                onConnected('rN7n7otQDd6FczFgLdlqtyMVrn3HMfHgFj');
              }}
              className="flex-1 h-[44px] rounded-xl text-[12px] font-semibold text-black"
              style={{ background: 'linear-gradient(180deg, #E8ECF0 0%, #BCC6CC 50%, #8A9499 100%)' }}
            >
              I've Signed
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
