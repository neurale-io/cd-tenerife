import { useState } from 'react'
import { ArrowLeft, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { newsArticles } from '../data'
import type { NewsArticle } from '../types'

const TABS = ['ÚLTIMAS', 'CLUB', 'PRIMER EQUIPO'] as const
type Tab = typeof TABS[number]

export default function News() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('ÚLTIMAS')
  const [selected, setSelected] = useState<NewsArticle | null>(null)

  if (selected) {
    return <ArticleDetail article={selected} onBack={() => setSelected(null)} />
  }

  const filtered =
    activeTab === 'ÚLTIMAS' ? newsArticles :
    activeTab === 'CLUB'    ? newsArticles.filter(a => a.category === 'club') :
                              newsArticles.filter(a => a.category === 'first-team')

  const hero = filtered[0] ?? null
  const list = filtered.slice(1)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#060f22' }}>

      {/* ── Header ── */}
      <div
        className="safe-top shrink-0"
        style={{
          display: 'flex', alignItems: 'center', position: 'relative',
          padding: '0 16px 0',
          background: '#060f22',
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
          NOTICIAS
        </span>
      </div>

      {/* ── Tab bar ── */}
      <div style={{
        display: 'flex',
        padding: '12px 16px 0',
        background: '#060f22',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        flexShrink: 0,
      }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              paddingBottom: 12,
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid #d4a726' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: activeTab === tab ? 700 : 500,
              color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.45)',
              letterSpacing: '0.04em',
              transition: 'color 0.15s, border-color 0.15s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="scroll-area flex-1" style={{ padding: '16px 16px 20px' }}>

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', marginTop: 40, fontSize: 14 }}>
            No hay noticias en esta categoría.
          </p>
        )}

        {/* Featured article */}
        {hero && (
          <button
            onClick={() => setSelected(hero)}
            style={{
              display: 'block', width: '100%', position: 'relative',
              borderRadius: 12, overflow: 'hidden',
              marginBottom: 6, border: 'none', cursor: 'pointer', padding: 0,
            }}
          >
            <img
              src={hero.image}
              alt={hero.title}
              style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,15,34,0.96) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, textAlign: 'left' }}>
              <p style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, lineHeight: 1.3, color: '#fff' }}>
                {hero.title}
              </p>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{hero.date}</span>
            </div>
          </button>
        )}

        {/* Article list */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {list.map((article, i) => (
            <button
              key={article.id}
              onClick={() => setSelected(article)}
              style={{
                display: 'flex', gap: 14, alignItems: 'center',
                padding: '14px 0',
                background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                borderBottom: i < list.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}
            >
              <img
                src={article.image}
                alt={article.title}
                style={{ width: 76, height: 58, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  margin: '0 0 5px', fontSize: 14, fontWeight: 600, lineHeight: 1.4, color: '#fff',
                  overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                }}>
                  {article.title}
                </p>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{article.date}</span>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}

/* ── Article detail ── */
function ArticleDetail({ article, onBack }: { article: NewsArticle; onBack: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ position: 'relative', height: 280, flexShrink: 0 }}>
        <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #060f22 0%, rgba(6,15,34,0.2) 60%, transparent 100%)' }} />
        <button
          onClick={onBack}
          className="safe-top"
          style={{
            position: 'absolute', top: 0, left: 16,
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff',
          }}
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      <div className="scroll-area flex-1" style={{ background: '#060f22', padding: '20px 20px 32px' }}>
        <h1 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 800, lineHeight: 1.25, letterSpacing: '-0.3px' }}>
          {article.title}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{article.date}</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={11} /> {article.readTime} min
          </span>
        </div>
        <p style={{ margin: '0 0 18px', fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.78)' }}>
          {article.excerpt}
        </p>
        <p style={{ margin: '0 0 18px', fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.78)' }}>
          El equipo mostró una gran solidez durante todo el partido. Los aficionados en el Estadio Heliodoro Rodríguez López disfrutaron de un espectáculo de fútbol de ataque, con el centro del campo controlando la posesión durante grandes periodos.
        </p>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.78)' }}>
          "Cada jugador lo dio todo esta noche. Esto es lo que significa el CD Tenerife: pasión, compromiso y creer. Los aficionados han sido increíbles y se merecen noches como esta."
        </p>
      </div>
    </div>
  )
}
