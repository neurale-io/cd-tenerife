import { useState } from 'react'
import { ArrowLeft, Check, CreditCard } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import cdtLogo from '../assets/cdt-logo.jpeg'
import { membershipPlans } from '../data'

type View = 'main' | 'checkout'

const benefits = [
  'Contenido exclusivo',
  'Descuentos en la tienda',
  'Acceso preferente a entradas',
  'Sorteos y promociones',
]

export default function Afiliacion() {
  const navigate = useNavigate()
  const [view, setView] = useState<View>('main')
  const [joined, setJoined] = useState(false)
  const plan = membershipPlans[0]

  if (view === 'checkout') {
    return (
      <CheckoutView
        plan={plan}
        onBack={() => setView('main')}
        onSuccess={() => { setJoined(true); setView('main') }}
      />
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#060f22' }}>

      {/* ── Header ── */}
      <div
        className="safe-top shrink-0"
        style={{
          display: 'flex', alignItems: 'center', position: 'relative',
          padding: '0 16px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(255,255,255,0.07)', border: 'none',
            cursor: 'pointer', color: '#fff', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <span style={{
          position: 'absolute', left: 0, right: 0, textAlign: 'center',
          fontSize: 16, fontWeight: 700, letterSpacing: '0.04em',
          pointerEvents: 'none',
        }}>
          AFILIACIÓN
        </span>
      </div>

      {/* ── Scrollable content ── */}
      <div className="scroll-area flex-1" style={{ padding: '32px 20px 24px' }}>

        {/* Logo + heading */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
          <img
            src={cdtLogo}
            alt="CD Tenerife"
            style={{ width: 96, height: 96, objectFit: 'contain', marginBottom: 18 }}
          />
          <h2 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 800, textAlign: 'center' }}>
            Únete al CD Tenerife
          </h2>
          <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.55)', textAlign: 'center', lineHeight: 1.6 }}>
            Forma parte de nuestra familia<br />y apoya al equipo cada día.
          </p>
        </div>

        {/* Price card */}
        <div style={{
          background: '#0c1b3a', borderRadius: 14,
          border: '1px solid rgba(212,167,38,0.25)',
          padding: '22px 24px 18px', marginBottom: 24, textAlign: 'center',
        }}>
          <p style={{
            margin: '0 0 10px', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)',
            textTransform: 'uppercase',
          }}>
            AFILIACIÓN
          </p>
          <span style={{ fontSize: 68, fontWeight: 900, color: '#fff', lineHeight: 1 }}>5€</span>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>/ mes</p>
        </div>

        {/* Benefits list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 8 }}>
          {benefits.map(b => (
            <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.45)',
                flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Check size={12} strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.82)' }}>{b}</span>
            </div>
          ))}
        </div>

      </div>

      {/* ── CTA ── */}
      <div style={{
        padding: '14px 20px',
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 24px)',
        background: '#060f22',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        flexShrink: 0,
      }}>
        {joined ? (
          <div style={{
            background: 'rgba(76,175,80,0.15)', border: '1px solid rgba(76,175,80,0.3)',
            borderRadius: 12, padding: 14, textAlign: 'center',
          }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#4caf50' }}>
              ¡Ya eres afiliado! Bienvenido al club.
            </span>
          </div>
        ) : (
          <button
            className="btn btn-primary"
            style={{ width: '100%', padding: '16px 0', borderRadius: 12, fontSize: 15, fontWeight: 800, letterSpacing: '0.06em' }}
            onClick={() => setView('checkout')}
          >
            HAZTE AFILIADO
          </button>
        )}
      </div>

    </div>
  )
}

/* ── Checkout screen ─────────────────────────────────────────── */
function CheckoutView({
  plan,
  onBack,
  onSuccess,
}: {
  plan: typeof membershipPlans[0]
  onBack: () => void
  onSuccess: () => void
}) {
  const [loading, setLoading] = useState(false)

  const handlePay = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); onSuccess() }, 1800)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#060f22' }}>

      {/* Header */}
      <div
        className="safe-top shrink-0"
        style={{
          display: 'flex', alignItems: 'center', position: 'relative',
          padding: '0 16px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <button
          onClick={onBack}
          style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(255,255,255,0.07)', border: 'none',
            cursor: 'pointer', color: '#fff', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <span style={{
          position: 'absolute', left: 0, right: 0, textAlign: 'center',
          fontSize: 16, fontWeight: 700, pointerEvents: 'none',
        }}>
          Pago
        </span>
      </div>

      <div className="scroll-area flex-1" style={{ padding: '20px 16px 0' }}>

        {/* Order summary */}
        <div style={{ background: '#0c1b3a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
          <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Resumen del pedido
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 14 }}>{plan.name}</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>€{plan.price}/{plan.period === 'month' ? 'mes' : 'año'}</span>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 10, marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Total hoy</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#d4a726' }}>€{plan.price}</span>
          </div>
        </div>

        {/* Card fields */}
        <div style={{ background: '#0c1b3a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
          <p style={{ margin: '0 0 16px', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Datos de la tarjeta
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 7 }}>Número de tarjeta</label>
              <input className="input" type="text" placeholder="1234 5678 9012 3456" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 7 }}>Caducidad</label>
                <input className="input" type="text" placeholder="MM / AA" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 7 }}>CVC</label>
                <input className="input" type="text" placeholder="•••" />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 7 }}>Nombre en la tarjeta</label>
              <input className="input" type="text" placeholder="Nombre completo" />
            </div>
          </div>
        </div>

      </div>

      {/* Pay button */}
      <div style={{
        padding: '14px 16px',
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 24px)',
        background: '#060f22',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        flexShrink: 0,
      }}>
        <button
          onClick={handlePay}
          disabled={loading}
          className="btn btn-primary"
          style={{ width: '100%', padding: '15px 0', borderRadius: 12, fontSize: 15, opacity: loading ? 0.75 : 1 }}
        >
          {loading ? (
            <>
              <span className="spin" style={{ width: 16, height: 16, border: '2px solid #060f22', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block' }} />
              Procesando…
            </>
          ) : (
            <><CreditCard size={16} /> Pagar €{plan.price} · Comenzar afiliación</>
          )}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12 }}>
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <rect x="1" y="6" width="10" height="7" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
            <path d="M3.5 6V4a2.5 2.5 0 015 0v2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Protegido con SSL de 256 bits</span>
        </div>
      </div>

    </div>
  )
}
