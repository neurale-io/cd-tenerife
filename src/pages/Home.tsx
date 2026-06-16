import { useNavigate } from 'react-router-dom'
import { User, Newspaper, ShoppingCart } from 'lucide-react'
import cdtLogo from '../assets/cdt-logo.png'
import stadiumImg from '../assets/stadium.jpeg'

const menuItems = [
  { icon: User,         number: 1, title: 'AFILIACIÓN',     subtitle: '5€ / mes',          path: '/afiliacion' },
  { icon: Newspaper,    number: 2, title: 'NOTICIAS',        subtitle: 'Del equipo',         path: '/news' },
  { icon: ShoppingCart, number: 3, title: 'TIENDA & ENTRADAS', subtitle: 'Camisetas y entradas', path: '/store' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden', background: '#060f22' }}>

      {/* ── Full-page stadium background ── */}
      <img
        src={stadiumImg}
        alt=""
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
        }}
      />

      {/* ── Gradient overlay ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: [
          'linear-gradient(to bottom,',
          '  rgba(6,15,34,0.30) 0%,',
          '  rgba(6,15,34,0.05) 30%,',
          '  rgba(6,15,34,0.05) 52%,',
          '  rgba(6,15,34,0.65) 66%,',
          '  rgba(6,15,34,0.95) 80%,',
          '  #060f22 93%',
          ')',
        ].join(''),
      }} />

      {/* ── Content layer ── */}
      <div
        className="safe-top safe-bottom"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Logo + title – sits over the sky portion */}
        <div
          className="fade-up"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 36,
          }}
        >
          <img
            src={cdtLogo}
            alt="CD Tenerife"
            style={{
              width: 130,
              height: 130,
              objectFit: 'contain',
              marginBottom: 14,
              filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.6))',
            }}
          />
          <h1 style={{
            margin: 0,
            fontSize: 32,
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '0.06em',
            textShadow: '0 2px 12px rgba(0,0,0,0.5)',
          }}>
            CD TENERIFE
          </h1>
          <p style={{
            margin: '6px 0 0',
            fontSize: 12,
            fontWeight: 700,
            color: '#d4a726',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            textShadow: '0 1px 6px rgba(0,0,0,0.4)',
          }}>
            LA PASIÓN QUE NOS UNE
          </p>
        </div>

        {/* Spacer – lets stadium show through */}
        <div style={{ flex: 1 }} />

        {/* Menu cards */}
        <div
          className="stagger"
          style={{
            padding: '0 18px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
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
                padding: '18px 20px',
                background: 'rgba(10, 22, 58, 0.88)',
                backdropFilter: 'blur(10px)',
                borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.10)',
                cursor: 'pointer',
                textAlign: 'left',
                color: '#fff',
                transition: 'transform 0.12s',
              }}
              onPointerDown={e => (e.currentTarget.style.transform = 'scale(0.975)')}
              onPointerUp={e => (e.currentTarget.style.transform = 'scale(1)')}
              onPointerLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div style={{
                width: 46,
                height: 46,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.09)',
                borderRadius: 12,
                flexShrink: 0,
              }}>
                <Icon size={22} strokeWidth={1.6} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '0.04em' }}>
                  <span style={{ color: '#d4a726', marginRight: 8, fontWeight: 700 }}>
                    {number}
                  </span>
                  {title}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>
                  {subtitle}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}
