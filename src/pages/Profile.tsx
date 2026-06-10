import { useState } from 'react'
import { ChevronRight, Bell, Settings, HelpCircle, LogOut, CreditCard, Check, ArrowLeft } from 'lucide-react'
import TopBar from '../components/TopBar'
import { membershipPlans } from '../data'

type View = 'main' | 'join' | 'checkout'

export default function Profile() {
  const [view, setView]       = useState<View>('main')
  const [isMember, setMember] = useState(false)
  const [plan, setPlan]       = useState('monthly')

  if (view === 'join')     return <JoinScreen selected={plan} onSelect={setPlan} onContinue={() => setView('checkout')} onBack={() => setView('main')} />
  if (view === 'checkout') return <CheckoutScreen plan={membershipPlans.find(p => p.id === plan)!} onSuccess={() => { setMember(true); setView('main') }} onBack={() => setView('join')} />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="Profile" />
      <div className="scroll-area flex-1" style={{ padding: '16px 16px 28px' }}>

        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{
            width: 58, height: 58, borderRadius: 16, flexShrink: 0,
            background: '#112248', border: '2px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 800, color: '#d4a726',
          }}>
            TF
          </div>
          <div>
            <p style={{ margin: '0 0 2px', fontSize: 17, fontWeight: 700 }}>Tenerife Fan</p>
            <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>fan@cdtenerife.com</p>
            {isMember && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 5 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#d4a726' }}>Blue Member</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="6" fill="#d4a726"/>
                  <path d="M3.5 6l2 2 3-3" stroke="#060f22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            )}
          </div>
        </div>

        {/* Membership card */}
        {!isMember ? (
          <button
            onClick={() => setView('join')}
            style={{
              display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer',
              padding: '18px 18px', borderRadius: 14, marginBottom: 20,
              background: '#0c1b3a', border: '1px solid rgba(212,167,38,0.3)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <p style={{ margin: '0 0 3px', fontSize: 17, fontWeight: 700 }}>Become a Member</p>
                <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Unlock the full experience</p>
              </div>
              <span style={{ fontSize: 22, fontWeight: 900, color: '#d4a726' }}>$5</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
              {['Live streaming', 'Store discounts', 'Priority tickets', 'Exclusive content'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 16, height: 16, borderRadius: 5, background: '#1a4026', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3l2 2 4-4" stroke="#4caf50" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#d4a726', borderRadius: 8, padding: '10px 16px', textAlign: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#060f22' }}>Join for $5 / month</span>
            </div>
          </button>
        ) : (
          <div style={{
            padding: '14px 16px', borderRadius: 12, marginBottom: 20,
            background: 'rgba(26,122,60,0.15)', border: '1px solid rgba(76,175,80,0.25)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#1a4026', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="8" stroke="#4caf50" strokeWidth="1.5"/>
                <path d="M5.5 9l2.5 2.5 4-4.5" stroke="#4caf50" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 700 }}>Blue Membership · Active</p>
              <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>Renews Jul 10, 2026 · $5.00/mo</p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 20 }}>
          {[
            { label: 'Matches watched', value: isMember ? '12' : '—' },
            { label: 'Orders placed', value: '3' },
            { label: 'Points earned', value: isMember ? '250' : '—' },
          ].map(s => (
            <div key={s.label} style={{ background: '#0c1b3a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '12px 10px', textAlign: 'center' }}>
              <p style={{ margin: '0 0 3px', fontSize: 20, fontWeight: 800 }}>{s.value}</p>
              <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.35 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Settings list */}
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', marginBottom: 12 }}>
          {[
            { icon: CreditCard, label: 'Membership & Billing', sub: isMember ? 'Blue Member · Active' : 'Not a member', action: () => !isMember && setView('join') },
            { icon: Bell,       label: 'Notifications',        sub: 'Push notifications on' },
            { icon: Settings,   label: 'Account Settings',     sub: 'Language, privacy, security' },
            { icon: HelpCircle, label: 'Help & Support',       sub: 'FAQs and contact us' },
          ].map(({ icon: Icon, label, sub, action }, i, arr) => (
            <button
              key={label}
              onClick={action}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px', width: '100%',
                background: '#0c1b3a', border: 'none', cursor: 'pointer', textAlign: 'left',
                borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 9, background: '#112248', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={16} style={{ color: 'rgba(255,255,255,0.6)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 600, color: '#fff' }}>{label}</p>
                <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{sub}</p>
              </div>
              <ChevronRight size={15} style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
            </button>
          ))}
        </div>

        <button style={{
          display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', width: '100%',
          background: '#0c1b3a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12,
          cursor: 'pointer',
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(192,57,43,0.15)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LogOut size={16} style={{ color: '#e74c3c' }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#e74c3c' }}>Sign Out</span>
        </button>

      </div>
    </div>
  )
}

/* ── Join screen ─────────────────────────────────────────────── */
function JoinScreen({ selected, onSelect, onContinue, onBack }: {
  selected: string; onSelect: (id: string) => void; onContinue: () => void; onBack: () => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        className="safe-top shrink-0"
        style={{ background: '#060f22', padding: '0 16px 14px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <ArrowLeft size={18} />
        </button>
        <span style={{ fontSize: 16, fontWeight: 700 }}>Choose a plan</span>
      </div>

      <div className="scroll-area flex-1" style={{ padding: '24px 16px 20px' }}>
        <p style={{ margin: '0 0 24px', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
          Join CD Tenerife and unlock live streaming, store discounts, and exclusive behind-the-scenes access.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {membershipPlans.map(p => (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              style={{
                display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer',
                padding: '18px 18px', borderRadius: 14,
                background: '#0c1b3a',
                border: selected === p.id ? '2px solid #d4a726' : '1px solid rgba(255,255,255,0.1)',
                transition: 'border-color 0.15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                <div>
                  <p style={{ margin: '0 0 3px', fontSize: 16, fontWeight: 700 }}>{p.name}</p>
                  {p.id === 'annual' && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#d4a726', background: 'rgba(212,167,38,0.12)', borderRadius: 4, padding: '2px 7px' }}>
                      Save 18%
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <div>
                    <span style={{ fontSize: 26, fontWeight: 800, color: '#d4a726' }}>${p.price}</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>/{p.period}</span>
                  </div>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0, marginTop: 3,
                    background: selected === p.id ? '#d4a726' : 'transparent',
                    border: `2px solid ${selected === p.id ? '#d4a726' : 'rgba(255,255,255,0.2)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.15s',
                  }}>
                    {selected === p.id && <Check size={12} style={{ color: '#060f22' }} strokeWidth={3} />}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 16, height: 16, borderRadius: 5, background: '#1a4026', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3l2 2 4-4" stroke="#4caf50" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        <button className="btn btn-primary" style={{ width: '100%', padding: '15px 0', borderRadius: 12, fontSize: 15 }} onClick={onContinue}>
          Continue to payment
        </button>
        <p style={{ margin: '12px 0 0', textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
          Cancel anytime · No hidden fees
        </p>
      </div>
    </div>
  )
}

/* ── Checkout ────────────────────────────────────────────────── */
function CheckoutScreen({ plan, onSuccess, onBack }: { plan: typeof membershipPlans[0]; onSuccess: () => void; onBack: () => void }) {
  const [loading, setLoading] = useState(false)

  const handlePay = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); onSuccess() }, 1800)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        className="safe-top shrink-0"
        style={{ background: '#060f22', padding: '0 16px 14px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <ArrowLeft size={18} />
        </button>
        <span style={{ fontSize: 16, fontWeight: 700 }}>Payment</span>
      </div>

      <div className="scroll-area flex-1" style={{ padding: '20px 16px 0' }}>
        {/* Summary */}
        <div style={{ background: '#0c1b3a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
          <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Order summary</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 14 }}>{plan.name}</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>${plan.price}/{plan.period}</span>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 10, marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Total today</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#d4a726' }}>${plan.price}</span>
          </div>
        </div>

        {/* Card fields */}
        <div style={{ background: '#0c1b3a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
          <p style={{ margin: '0 0 16px', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Card details</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 7 }}>Card number</label>
              <input className="input" type="text" placeholder="1234 5678 9012 3456" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 7 }}>Expiry</label>
                <input className="input" type="text" placeholder="MM / YY" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 7 }}>CVC</label>
                <input className="input" type="text" placeholder="•••" />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 7 }}>Name on card</label>
              <input className="input" type="text" placeholder="Full name" />
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 16px 32px', background: '#060f22', borderTop: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
        <button
          onClick={handlePay}
          disabled={loading}
          className="btn btn-primary"
          style={{ width: '100%', padding: '15px 0', borderRadius: 12, fontSize: 15, opacity: loading ? 0.75 : 1 }}
        >
          {loading ? (
            <>
              <span className="spin" style={{ width: 16, height: 16, border: '2px solid #060f22', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block' }} />
              Processing…
            </>
          ) : (
            <><CreditCard size={16} /> Pay ${plan.price} · Start membership</>
          )}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12 }}>
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <rect x="1" y="6" width="10" height="7" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
            <path d="M3.5 6V4a2.5 2.5 0 015 0v2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Secured with 256-bit SSL</span>
        </div>
      </div>
    </div>
  )
}
