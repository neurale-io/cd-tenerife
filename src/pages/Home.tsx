import { useNavigate } from 'react-router-dom'
import { User, Newspaper, ShoppingCart } from 'lucide-react'
import cdtLogo from '../assets/cdt-logo.png'
import stadiumImg from '../assets/stadium.jpeg'

const menuItems = [
  {
    icon: User,
    number: 1,
    title: 'AFILIACIÓN',
    subtitle: '5€ / mes',
    path: '/afiliacion',
  },
  {
    icon: Newspaper,
    number: 2,
    title: 'NOTICIAS',
    subtitle: 'Del equipo',
    path: '/news',
  },
  {
    icon: ShoppingCart,
    number: 3,
    title: 'TIENDA & ENTRADAS',
    subtitle: 'Camisetas y entradas',
    path: '/store',
  },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'linear-gradient(175deg, #0e2265 0%, #071535 100%)',
      overflow: 'hidden',
    }}>

      {/* ── Logo + title ── */}
      <div
        className="safe-top fade-up"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '28px 20px 16px',
        }}
      >
        <img
          src={cdtLogo}
          alt="CD Tenerife"
          style={{
            width: 120,
            height: 120,
            objectFit: 'contain',
            marginBottom: 16,
            filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
          }}
        />
        <h1 style={{
          margin: 0,
          fontSize: 30,
          fontWeight: 900,
          color: '#fff',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}>
          CD TENERIFE
        </h1>
        <p style={{
          margin: '6px 0 0',
          fontSize: 12,
          fontWeight: 600,
          color: '#d4a726',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}>
          LA PASIÓN QUE NOS UNE
        </p>
      </div>

      {/* ── Stadium image ── */}
      <div style={{ flex: 1, position: 'relative', minHeight: 0, overflow: 'hidden' }}>
        <img
          src={stadiumImg}
          alt="Estadio Heliodoro Rodríguez López"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
        />
        {/* Blend top into background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, #0e2265 0%, transparent 28%, transparent 65%, #071535 100%)',
        }} />
      </div>

      {/* ── Menu items ── */}
      <div
        className="safe-bottom stagger"
        style={{
          padding: '12px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {menuItems.map(({ icon: Icon, number, title, subtitle, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              padding: '16px 20px',
              background: 'rgba(14, 40, 100, 0.82)',
              backdropFilter: 'blur(6px)',
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer',
              textAlign: 'left',
              color: '#fff',
              transition: 'background 0.15s, transform 0.12s',
            }}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {/* Icon */}
            <div style={{
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.07)',
              borderRadius: 10,
              flexShrink: 0,
            }}>
              <Icon size={24} strokeWidth={1.6} />
            </div>

            {/* Text */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '0.05em' }}>
                <span style={{ color: 'rgba(255,255,255,0.45)', marginRight: 8, fontWeight: 600 }}>
                  {number}
                </span>
                {title}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 3 }}>
                {subtitle}
              </div>
            </div>
          </button>
        ))}
      </div>

    </div>
  )
}
