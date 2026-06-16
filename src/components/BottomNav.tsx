import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Newspaper, ShoppingCart, Ticket, User } from 'lucide-react'

const tabs = [
  { label: 'Inicio',    icon: Home,         path: '/' },
  { label: 'Noticias',  icon: Newspaper,    path: '/news' },
  { label: 'Tienda',    icon: ShoppingCart, path: '/store' },
  { label: 'Entradas',  icon: Ticket,       path: '/entradas' },
  { label: 'Perfil',    icon: User,         path: '/profile' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname === path
  }

  return (
    <nav
      className="shrink-0 safe-bottom"
      style={{
        background: '#060f22',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div style={{ display: 'flex', paddingTop: 4 }}>
        {tabs.map(({ label, icon: Icon, path }) => {
          const active = isActive(path)
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                padding: '8px 0 4px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: active ? '#d4a726' : 'rgba(255,255,255,0.38)',
                transition: 'color 0.15s',
              }}
            >
              <Icon size={21} strokeWidth={active ? 2.2 : 1.7} />
              <span style={{
                fontSize: 10,
                fontWeight: active ? 600 : 400,
                letterSpacing: '0.01em',
              }}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
