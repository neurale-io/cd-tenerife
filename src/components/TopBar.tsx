import { ArrowLeft, Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import CrestIcon from './CrestIcon'

interface Props {
  title?: string
  showBack?: boolean
  showLogo?: boolean
  transparent?: boolean
}

export default function TopBar({ title, showBack, showLogo, transparent }: Props) {
  const navigate = useNavigate()

  return (
    <div
      className="safe-top shrink-0 flex items-center px-4 pb-3"
      style={{
        background: transparent ? 'transparent' : '#060f22',
        borderBottom: transparent ? 'none' : '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {showBack ? (
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <ArrowLeft size={20} />
        </button>
      ) : showLogo ? (
        <CrestIcon size={34} />
      ) : (
        <div className="w-9" />
      )}

      <div className="flex-1 text-center">
        {title && (
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            {title}
          </span>
        )}
      </div>

      <button
        className="w-9 h-9 rounded-full flex items-center justify-center relative"
        style={{ background: 'rgba(255,255,255,0.08)' }}
      >
        <Bell size={18} />
        <span
          className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full pulse-dot"
          style={{ background: '#f5cc50' }}
        />
      </button>
    </div>
  )
}
