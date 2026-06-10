import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Props {
  title?: string
  showBack?: boolean
  right?: React.ReactNode
  border?: boolean
}

export default function TopBar({ title, showBack, right, border = true }: Props) {
  const navigate = useNavigate()

  return (
    <div
      className="safe-top shrink-0"
      style={{
        background: '#060f22',
        borderBottom: border ? '1px solid rgba(255,255,255,0.07)' : 'none',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px 12px',
        gap: 12,
        minHeight: 52,
      }}
    >
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          style={{
            width: 36, height: 36,
            borderRadius: 10,
            background: 'rgba(255,255,255,0.07)',
            border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <ArrowLeft size={18} />
        </button>
      )}

      {title && (
        <span style={{ fontSize: 16, fontWeight: 700, flex: 1 }}>
          {title}
        </span>
      )}

      {right && <div style={{ marginLeft: 'auto' }}>{right}</div>}
    </div>
  )
}
