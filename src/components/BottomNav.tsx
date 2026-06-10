import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Newspaper, ShoppingBag, PlayCircle, User } from 'lucide-react'

const tabs = [
  { label: 'Home',    icon: Home,        path: '/' },
  { label: 'News',    icon: Newspaper,   path: '/news' },
  { label: 'Live',    icon: PlayCircle,  path: '/live' },
  { label: 'Store',   icon: ShoppingBag, path: '/store' },
  { label: 'Profile', icon: User,        path: '/profile' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

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
          const active = path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(path)
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
