import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Newspaper, ShoppingBag, PlayCircle, User } from 'lucide-react'

const tabs = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'News', icon: Newspaper, path: '/news' },
  { label: 'Store', icon: ShoppingBag, path: '/store' },
  { label: 'Live', icon: PlayCircle, path: '/live' },
  { label: 'Profile', icon: User, path: '/profile' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="shrink-0 safe-bottom" style={{ background: '#060f22', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex">
        {tabs.map(({ label, icon: Icon, path }) => {
          const active = location.pathname === path || (path !== '/' && location.pathname.startsWith(path))
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-all"
              style={{ color: active ? '#f5cc50' : 'rgba(255,255,255,0.45)' }}
            >
              <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 400, letterSpacing: '0.02em' }}>
                {label}
              </span>
              {active && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: 32,
                    height: 2,
                    background: 'linear-gradient(90deg, #f5cc50, #c9880a)',
                    borderRadius: '2px 2px 0 0',
                  }}
                />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
