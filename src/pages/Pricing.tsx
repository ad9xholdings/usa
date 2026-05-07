import { useAuth } from '@/context/AuthContext';
import { Check, Sparkles, Zap, Crown, ArrowRight } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    icon: Sparkles,
    description: 'Start exploring the ecosystem',
    features: [
      'SORME Basic Search',
      'Browse Media Hub',
      'View Academy Catalog',
      'DAO Governance Read-Only',
      'Community Access',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Premium',
    price: '$9.99',
    period: '/month',
    icon: Zap,
    description: 'Full access to everything',
    features: [
      'Everything in Free',
      'Ask 9x AI Concierge',
      'Cotton Brick Road Gateway',
      'Mrs. Cotton\'s Academy',
      'Full Governance Voting',
      'Treasury Analytics',
      'Priority Support',
    ],
    cta: 'Get Access Now',
    popular: true,
  },
  {
    name: 'Custom',
    price: 'Custom',
    period: 'enterprise',
    icon: Crown,
    description: 'Built for your organization',
    features: [
      'Everything in Premium',
      'White-Label Options',
      'Dedicated Infrastructure',
      'Custom Smart Contracts',
      'Ad9x Advisory',
      'SLA Guarantee',
      'Direct Line to DAO',
    ],
    cta: 'Contact Us',
    popular: false,
  },
];

export default function Pricing() {
  const { openAuth } = useAuth();

  return (
    <div className="min-h-[100dvh] bg-black text-white overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col items-center px-5 pt-12 pb-4">
        <p className="text-[10px] tracking-[0.35em] text-white/40 uppercase font-mono mb-3">
          Choose Your Path
        </p>
        <h1
          className="text-[2.5rem] sm:text-[3rem] font-black text-center leading-[0.95]"
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #C8D0D8 50%, #8A9499 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Get Access Now
        </h1>
        <p className="text-[13px] text-white/40 mt-3 text-center max-w-[360px]">
          Join the United Series of America Master DAO ecosystem
        </p>
      </div>

      {/* Tiers */}
      <div className="px-5 py-8">
        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.name}
                className={`
                  relative flex flex-col rounded-2xl border p-5 sm:p-6
                  ${tier.popular
                    ? 'border-white/20 bg-white/[0.04]'
                    : 'border-white/[0.06] bg-white/[0.02]'
                  }
                `}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-black"
                    style={{
                      background: 'linear-gradient(180deg, #E8ECF0 0%, #BCC6CC 100%)',
                    }}
                  >
                    Most Popular
                  </div>
                )}

                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl border border-white/[0.08] flex items-center justify-center">
                    <Icon size={18} className="text-white/50" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-white/90">{tier.name}</h3>
                    <p className="text-[11px] text-white/30">{tier.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <span className="text-[32px] font-black text-white/90">{tier.price}</span>
                  <span className="text-[12px] text-white/35 ml-1">{tier.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check size={14} className="text-white/40 mt-0.5 shrink-0" />
                      <span className="text-[13px] text-white/55">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => openAuth(tier.name === 'Custom' ? 'register' : 'register')}
                  className={`
                    w-full h-[48px] rounded-xl flex items-center justify-center gap-2 text-[14px] font-semibold transition-all active:scale-[0.98]
                    ${tier.popular
                      ? 'text-black hover:opacity-90'
                      : 'text-white/80 border border-white/10 hover:border-white/25 hover:bg-white/[0.03]'
                    }
                  `}
                  style={tier.popular ? {
                    background: 'linear-gradient(180deg, #E8ECF0 0%, #BCC6CC 50%, #8A9499 100%)',
                  } : {}}
                >
                  {tier.cta}
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/[0.04] py-6 mt-4">
        <p className="text-center text-[9px] tracking-[0.2em] text-white/20 uppercase font-mono">
          United Series of America Master DAO, LLC &middot; Republic of Marshall Islands
        </p>
      </div>
    </div>
  );
}
