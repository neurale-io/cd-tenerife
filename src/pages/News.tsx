import { useState } from 'react'
import { Clock, ArrowLeft } from 'lucide-react'
import TopBar from '../components/TopBar'
import { newsArticles } from '../data'
import type { NewsArticle } from '../types'

const TABS = ['Latest', 'Club', 'First Team'] as const
type Tab = typeof TABS[number]

const tabToCategory: Record<Tab, string> = {
  'Latest':     'latest',
  'Club':       'club',
  'First Team': 'first-team',
}

export default function News() {
  const [active, setActive] = useState<Tab>('Latest')
  const [selected, setSelected] = useState<NewsArticle | null>(null)

  if (selected) {
    return <ArticleDetail article={selected} onBack={() => setSelected(null)} />
  }

  const filtered = active === 'Latest'
    ? newsArticles
    : newsArticles.filter(a => a.category === tabToCategory[active])

  const hero = active === 'Latest' ? filtered[0] : null
  const list = hero ? filtered.slice(1) : filtered

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="News" />

      {/* Tab bar */}
      <div style={{
        display: 'flex', gap: 6, padding: '0 16px 12px',
        background: '#060f22', borderBottom: '1px solid rgba(255,255,255,0.07)',
        flexShrink: 0,
      }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            style={{
              padding: '7px 16px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: active === tab ? 700 : 500,
              background: active === tab ? '#d4a726' : 'transparent',
              color:      active === tab ? '#060f22' : 'rgba(255,255,255,0.5)',
              transition: 'background 0.15s, color 0.15s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="scroll-area flex-1" style={{ padding: '16px 16px 20px' }}>

        {/* Hero article */}
        {hero && (
          <button
            onClick={() => setSelected(hero)}
            style={{
              display: 'block', width: '100%', position: 'relative',
              height: 220, borderRadius: 12, overflow: 'hidden',
              marginBottom: 16, border: 'none', cursor: 'pointer', padding: 0,
            }}
          >
            <img src={hero.image} alt={hero.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,15,34,0.96) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, textAlign: 'left' }}>
              <CategoryBadge category={hero.category} />
              <p style={{ margin: '8px 0 6px', fontSize: 16, fontWeight: 700, lineHeight: 1.3, color: '#fff' }}>
                {hero.title}
              </p>
              <span className="t-meta" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {hero.date}
                <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                <Clock size={11} />
                {hero.readTime} min
              </span>
            </div>
          </button>
        )}

        {/* Article list */}
        <div className="stagger" style={{ display: 'flex', flexDirection: 'column' }}>
          {list.map((article, i) => (
            <button
              key={article.id}
              onClick={() => setSelected(article)}
              style={{
                display: 'flex', gap: 14, alignItems: 'center',
                padding: '13px 0',
                background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                borderBottom: i < list.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}
            >
              <img
                src={article.image}
                alt={article.title}
                style={{ width: 72, height: 72, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ marginBottom: 6 }}>
                  <CategoryBadge category={article.category} />
                </div>
                <p style={{
                  margin: '0 0 6px', fontSize: 14, fontWeight: 600, lineHeight: 1.4, color: '#fff',
                  overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                }}>
                  {article.title}
                </p>
                <span className="t-meta" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  {article.date}
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                  {article.readTime} min read
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function CategoryBadge({ category }: { category: string }) {
  const styles: Record<string, { label: string; bg: string; color: string }> = {
    latest:       { label: 'Latest',     bg: '#162d60',  color: 'rgba(255,255,255,0.75)' },
    club:         { label: 'Club',       bg: '#1a4026',  color: 'rgba(255,255,255,0.75)' },
    'first-team': { label: 'First Team', bg: '#3d2010',  color: '#d4a726' },
  }
  const s = styles[category] ?? styles.latest
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 7px',
      borderRadius: 4,
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      background: s.bg,
      color: s.color,
    }}>
      {s.label}
    </span>
  )
}

function ArticleDetail({ article, onBack }: { article: NewsArticle; onBack: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Hero image */}
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
        <CategoryBadge category={article.category} />
        <h1 style={{ margin: '12px 0 10px', fontSize: 22, fontWeight: 800, lineHeight: 1.25, letterSpacing: '-0.3px' }}>
          {article.title}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <span className="t-meta">{article.date}</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
          <span className="t-meta" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={11} /> {article.readTime} min read
          </span>
        </div>
        <p style={{ margin: '0 0 18px', fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.78)' }}>
          {article.excerpt}
        </p>
        <p style={{ margin: '0 0 18px', fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.78)' }}>
          The team showed tremendous resilience and quality throughout the match. Supporters at the Estadio Heliodoro Rodríguez López were treated to an exceptional display of attacking football, with the midfield controlling possession for large spells.
        </p>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.78)' }}>
          "Every single player gave everything tonight. This is what CD Tenerife is about — passion, commitment, and belief. The fans have been incredible and they deserve nights like this."
        </p>
      </div>
    </div>
  )
}
