import { useState } from 'react'
import { Star, Check, ChevronRight, User, Settings, Bell, HelpCircle, LogOut, CreditCard, Gift, Ticket } from 'lucide-react'
import TopBar from '../components/TopBar'
import { membershipPlans } from '../data'

type View = 'main' | 'join' | 'checkout'

export default function Profile() {
  const [view, setView] = useState<View>('main')
  const [isMember, setIsMember] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('monthly')

  if (view === 'join') {
    return <MembershipJoin
      selected={selectedPlan}
      onSelect={setSelectedPlan}
      onContinue={() => setView('checkout')}
      onBack={() => setView('main')}
    />
  }
  if (view === 'checkout') {
    return <Checkout
      plan={membershipPlans.find(p => p.id === selectedPlan)!}
      onSuccess={() => { setIsMember(true); setView('main') }}
      onBack={() => setView('join')}
    />
  }

  return (
    <div className="flex flex-col h-full">
      <TopBar title="Profile" />
      <div className="scroll-area flex-1 px-4 pt-4 pb-6">

        {/* User card */}
        <div
          className="rounded-2xl p-4 flex items-center gap-4 mb-5"
          style={{ background: '#112248' }}
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #162d60, #1c3a7a)' }}>
            <User size={28} style={{ color: 'rgba(255,255,255,0.7)' }} />
          </div>
          <div className="flex-1">
            <p style={{ fontSize: 17, fontWeight: 800 }}>Tenerife Fan</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>fan@cdtenerife.com</p>
            {isMember && (
              <div className="flex items-center gap-1.5 mt-1">
                <Star size={12} fill="#f5cc50" style={{ color: '#f5cc50' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#f5cc50' }}>Blue Member</span>
              </div>
            )}
          </div>
        </div>

        {/* Membership CTA / badge */}
        {!isMember ? (
          <button
            onClick={() => setView('join')}
            className="w-full rounded-2xl p-5 mb-5 text-left active:opacity-90"
            style={{ background: 'linear-gradient(135deg, #162d60 0%, #1c3a7a 100%)', border: '1px solid rgba(245,204,80,0.3)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Star size={24} style={{ color: '#f5cc50' }} />
              <div>
                <p style={{ fontSize: 16, fontWeight: 800 }}>Become a Blue Member</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>From just $5/month</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {['Live streaming', 'Store discounts', 'Priority tickets', 'Exclusive content'].map(f => (
                <div key={f} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-xs" style={{ background: '#1a7a3c' }}>✓</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{f}</span>
                </div>
              ))}
            </div>
            <div className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl">
              Join Now
              <ChevronRight size={16} />
            </div>
          </button>
        ) : (
          <div
            className="rounded-2xl p-4 mb-5"
            style={{ background: 'linear-gradient(135deg, #1a5c30, #267a43)', border: '1px solid rgba(245,204,80,0.2)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(245,204,80,0.15)' }}>
                <Star size={20} fill="#f5cc50" style={{ color: '#f5cc50' }} />
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 700 }}>Active Blue Membership</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>Renews Jul 10, 2026 · $5.00</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Matches watched', value: isMember ? '12' : '—', icon: Ticket },
            { label: 'Orders', value: '3', icon: CreditCard },
            { label: 'Rewards', value: isMember ? '250 pts' : '—', icon: Gift },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl p-3 flex flex-col items-center text-center gap-1" style={{ background: '#112248' }}>
              <Icon size={18} style={{ color: '#f5cc50' }} />
              <span style={{ fontSize: 16, fontWeight: 800 }}>{value}</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', lineHeight: 1.3 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Menu items */}
        <div className="rounded-2xl overflow-hidden mb-4" style={{ background: '#112248' }}>
          {[
            { icon: Star, label: 'Membership', sub: isMember ? 'Blue Member · Active' : 'Not a member', action: () => !isMember && setView('join') },
            { icon: Bell, label: 'Notifications', sub: 'Push notifications on' },
            { icon: Settings, label: 'Account Settings', sub: 'Language, privacy' },
            { icon: HelpCircle, label: 'Help & Support', sub: 'FAQs and contact' },
          ].map(({ icon: Icon, label, sub, action }, i, arr) => (
            <button
              key={label}
              onClick={action}
              className="w-full flex items-center gap-4 px-4 py-3.5 active:opacity-70 text-left"
              style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#162d60' }}>
                <Icon size={18} style={{ color: '#f5cc50' }} />
              </div>
              <div className="flex-1">
                <p style={{ fontSize: 14, fontWeight: 600 }}>{label}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{sub}</p>
              </div>
              <ChevronRight size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
            </button>
          ))}
        </div>

        <button
          className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl active:opacity-70"
          style={{ background: '#112248' }}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(192,57,43,0.2)' }}>
            <LogOut size={18} style={{ color: '#e74c3c' }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#e74c3c' }}>Sign Out</span>
        </button>
      </div>
    </div>
  )
}

function MembershipJoin({ selected, onSelect, onContinue }: {
  selected: string; onSelect: (id: string) => void; onContinue: () => void; onBack: () => void
}) {
  return (
    <div className="flex flex-col h-full">
      <TopBar title="Choose Plan" showBack />
      <div className="scroll-area flex-1 px-4 pt-4 pb-6">
        <div className="text-center mb-6">
          <Star size={36} fill="#f5cc50" style={{ color: '#f5cc50', margin: '0 auto 12px' }} />
          <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8 }}>Join CD Tenerife</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
            Unlock exclusive content, live streaming, and more
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          {membershipPlans.map(plan => (
            <button
              key={plan.id}
              onClick={() => onSelect(plan.id)}
              className="w-full rounded-2xl p-5 text-left transition-all active:scale-98"
              style={{
                background: selected === plan.id ? 'linear-gradient(135deg, #162d60, #1c3a7a)' : '#112248',
                border: `2px solid ${selected === plan.id ? '#f5cc50' : 'transparent'}`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p style={{ fontSize: 17, fontWeight: 800 }}>{plan.name}</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-gold-gradient" style={{ fontSize: 28, fontWeight: 900 }}>${plan.price}</span>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>/ {plan.period}</span>
                  </div>
                </div>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1"
                  style={{ background: selected === plan.id ? '#f5cc50' : '#162d60', border: `2px solid ${selected === plan.id ? '#f5cc50' : 'rgba(255,255,255,0.2)'}` }}
                >
                  {selected === plan.id && <Check size={14} style={{ color: '#0c1b3a' }} strokeWidth={3} />}
                </div>
              </div>
              <ul className="flex flex-col gap-2">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-xs shrink-0" style={{ background: '#1a7a3c' }}>✓</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{f}</span>
                  </li>
                ))}
              </ul>
              {plan.id === 'annual' && (
                <div className="mt-3 px-3 py-1.5 rounded-full inline-block" style={{ background: 'rgba(245,204,80,0.15)', border: '1px solid rgba(245,204,80,0.3)' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#f5cc50' }}>Save 18% vs monthly</span>
                </div>
              )}
            </button>
          ))}
        </div>

        <button className="btn-gold w-full py-4 font-bold text-base" onClick={onContinue}>
          Continue to Payment
        </button>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: 12 }}>
          Cancel anytime. No hidden fees.
        </p>
      </div>
    </div>
  )
}

function Checkout({ plan, onSuccess }: { plan: typeof membershipPlans[0]; onSuccess: () => void; onBack: () => void }) {
  const [loading, setLoading] = useState(false)

  const handlePay = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onSuccess()
    }, 1800)
  }

  return (
    <div className="flex flex-col h-full">
      <TopBar title="Payment" showBack />
      <div className="scroll-area flex-1 px-4 pt-4 pb-6">
        {/* Order summary */}
        <div className="rounded-2xl p-4 mb-5" style={{ background: '#112248' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Order Summary</p>
          <div className="flex justify-between items-center mb-2">
            <span style={{ fontSize: 15 }}>{plan.name}</span>
            <span style={{ fontSize: 15, fontWeight: 700 }}>${plan.price}/{plan.period}</span>
          </div>
          <div className="flex justify-between items-center pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Total today</span>
            <span className="text-gold-gradient" style={{ fontSize: 20, fontWeight: 900 }}>${plan.price}</span>
          </div>
        </div>

        {/* Payment form */}
        <div className="rounded-2xl p-4 mb-5" style={{ background: '#112248' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Card Details</p>
          <div className="flex flex-col gap-3">
            <div>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>Card number</label>
              <input
                type="text"
                placeholder="•••• •••• •••• ••••"
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{ background: '#162d60', fontSize: 15, color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>Expiry</label>
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="w-full px-4 py-3 rounded-xl outline-none"
                  style={{ background: '#162d60', fontSize: 15, color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>CVC</label>
                <input
                  type="text"
                  placeholder="•••"
                  className="w-full px-4 py-3 rounded-xl outline-none"
                  style={{ background: '#162d60', fontSize: 15, color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>Name on card</label>
              <input
                type="text"
                placeholder="Full name"
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{ background: '#162d60', fontSize: 15, color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
          </div>
        </div>

        <button
          className="btn-gold w-full py-4 font-bold text-base flex items-center justify-center gap-2"
          onClick={handlePay}
          disabled={loading}
          style={{ opacity: loading ? 0.8 : 1 }}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Processing…
            </>
          ) : (
            <>
              <CreditCard size={18} />
              Pay ${plan.price} · Start Membership
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 mt-4" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>
          <span>🔒</span>
          Secured with 256-bit SSL encryption
        </div>
      </div>
    </div>
  )
}
