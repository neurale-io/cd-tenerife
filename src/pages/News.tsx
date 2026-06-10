import { useState } from 'react'
import { Clock } from 'lucide-react'
import TopBar from '../components/TopBar'
import { newsArticles } from '../data'
import type { NewsArticle } from '../types'

const TABS = ['Latest', 'Club', 'First Team'] as const
type Tab = typeof TABS[number]

const tabToCategory: Record<Tab, string> = {
  Latest: 'latest',
  Club: 'club',
  'First Team': 'first-team',
}

export default function News() {
  const [active, setActive] = useState<Tab>('Latest')
  const [selected, setSelected] = useState<NewsArticle | null>(null)

  const filtered = newsArticles.filter(a =>
    active === 'Latest' ? true : a.category === tabToCategory[active]
  )

  if (selected) {
    return <ArticleDetail article={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="flex flex-col h-full">
      <TopBar title="News" showBack={false} />
      {/* Tabs */}
      <div className="shrink-0 flex px-4 gap-1 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: '#060f22' }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className="px-4 py-2 rounded-full transition-all"
            style={{
              fontSize: 13,
              fontWeight: active === tab ? 700 : 500,
              background: active === tab ? 'linear-gradient(135deg, #f5cc50, #c9880a)' : 'transparent',
              color: active === tab ? '#0c1b3a' : 'rgba(255,255,255,0.55)',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="scroll-area flex-1 px-4 pt-4 pb-4">
        {/* Featured */}
        {active === 'Latest' && filtered[0] && (
          <button
            onClick={() => setSelected(filtered[0])}
            className="w-full rounded-2xl overflow-hidden relative mb-4 text-left active:opacity-90"
            style={{ height: 220 }}
          >
            <img src={filtered[0].image} alt={filtered[0].title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,15,34,0.97) 0%, transparent 50%)' }} />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <CategoryBadge category={filtered[0].category} />
              <p style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.3, marginTop: 6 }}>{filtered[0].title}</p>
              <div className="flex items-center gap-3 mt-2">
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{filtered[0].date}</span>
                <span className="flex items-center gap-1" style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
                  <Clock size={11} />
                  {filtered[0].readTime} min
                </span>
              </div>
            </div>
          </button>
        )}

        {/* List */}
        <div className="flex flex-col gap-3 stagger">
          {(active === 'Latest' ? filtered.slice(1) : filtered).map(article => (
            <button
              key={article.id}
              onClick={() => setSelected(article)}
              className="flex gap-3 rounded-xl p-3 text-left active:opacity-80"
              style={{ background: '#112248' }}
            >
              <img src={article.image} alt={article.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div>
                  <CategoryBadge category={article.category} />
                  <p style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.35, marginTop: 5 }} className="line-clamp-2">
                    {article.title}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{article.date}</span>
                  <span className="flex items-center gap-1" style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
                    <Clock size={10} />
                    {article.readTime} min
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function CategoryBadge({ category }: { category: string }) {
  const map: Record<string, { label: string; color: string }> = {
    latest: { label: 'LATEST', color: '#1c3a7a' },
    club: { label: 'CLUB', color: '#2d5016' },
    'first-team': { label: 'FIRST TEAM', color: '#c9880a' },
  }
  const cfg = map[category] || map.latest
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full"
      style={{ fontSize: 9, fontWeight: 700, background: cfg.color, letterSpacing: '0.06em' }}
    >
      {cfg.label}
    </span>
  )
}

function ArticleDetail({ article, onBack }: { article: NewsArticle; onBack: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="relative shrink-0" style={{ height: 260 }}>
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #060f22 0%, transparent 60%)' }} />
        <button
          onClick={onBack}
          className="absolute top-12 left-4 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          ←
        </button>
      </div>
      <div className="scroll-area flex-1 px-4 pb-6" style={{ background: '#060f22' }}>
        <div className="pt-4">
          <CategoryBadge category={article.category} />
          <h1 style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.25, marginTop: 10, marginBottom: 8 }}>{article.title}</h1>
          <div className="flex items-center gap-3 mb-5 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{article.date}</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>·</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{article.readTime} min read</span>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>{article.excerpt}</p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', marginTop: 16 }}>
            The team showed tremendous resilience and quality throughout the match. Supporters at the Estadio Heliodoro Rodríguez López were treated to an exceptional display of attacking football, with the midfield controlling possession for large spells.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', marginTop: 16 }}>
            Manager praised the collective effort: "Every single player gave everything tonight. This is what CD Tenerife is about — passion, commitment, and belief. The fans have been incredible and they deserve nights like this."
          </p>
        </div>
      </div>
    </div>
  )
}
