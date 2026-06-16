import { useNavigate } from 'react-router-dom'
import { User, Newspaper, ShoppingCart } from 'lucide-react'
import cdtLogo from '../assets/cdt-logo.png'
import stadiumImg from '../assets/stadium.jpeg'

const menuItems = [
  { icon: User,         number: 1, title: 'AFILIACIÓN',       subtitle: '5€ / mes',             path: '/afiliacion' },
  { icon: Newspaper,    number: 2, title: 'NOTICIAS',          subtitle: 'Del equipo',            path: '/news' },
  { icon: ShoppingCart, number: 3, title: 'TIENDA & ENTRADAS', subtitle: 'Camisetas y entradas',  path: '/store' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#060f22' }}>

      {/* ── Stadium section – full image, no cropping ── */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <img
          src={stadiumImg}
          alt="Estadio Heliodoro Rodríguez López"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />

        {/* Subtle top dark vignette + hard fade to background at bottom */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(6,15,34,0.28) 0%, transparent 22%, transparent 62%, #060f22 100%)',
        }} />

        {/* Logo + title float over the sky portion */}
        <div
          className="safe-top fade-up"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 32,
          }}
        >
          <img
            src={cdtLogo}
            alt="CD Tenerife"
            style={{
              width: 120,
              height: 120,
              objectFit: 'contain',
              marginBottom: 12,
              filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.55))',
            }}
          />
          <h1 style={{
            margin: 0,
            fontSize: 30,
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '0.06em',
            textShadow: '0 2px 12px rgba(0,0,0,0.5)',
          }}>
            CD TENERIFE
          </h1>
          <p style={{
            margin: '5px 0 0',
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
      </div>

      {/* ── Menu cards ── */}
      <div
        className="safe-bottom stagger"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 12,
          padding: '8px 18px 20px',
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
              padding: '17px 20px',
              background: 'rgba(10, 22, 58, 0.90)',
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
                <span style={{ color: '#d4a726', marginRight: 8, fontWeight: 700 }}>{number}</span>
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
  )
}
