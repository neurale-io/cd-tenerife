import { useNavigate } from 'react-router-dom'
import { ArrowRight, Star, ShoppingBag, PlayCircle, Newspaper } from 'lucide-react'
import TopBar from '../components/TopBar'
import CrestIcon from '../components/CrestIcon'
import { newsArticles, matches, products } from '../data'

export default function Home() {
  const navigate = useNavigate()
  const liveMatch = matches.find(m => m.status === 'live')
  const nextMatch = matches.find(m => m.status === 'upcoming')
  const featuredNews = newsArticles.find(n => n.featured)
  const recentNews = newsArticles.filter(n => !n.featured).slice(0, 3)
  const featuredProduct = products[0]

  return (
    <div className="flex flex-col h-full">
      <TopBar showLogo transparent />
      <div className="scroll-area flex-1 px-4 pb-4 stagger">

        {/* Hero */}
        <div className="fade-in-up mb-5 rounded-2xl overflow-hidden relative" style={{ minHeight: 220 }}>
          <img
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=80"
            alt="Stadium"
            className="w-full h-full object-cover absolute inset-0"
            style={{ minHeight: 220 }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, #0c1b3a 0%, rgba(12,27,58,0.7) 50%, transparent 100%)' }}
          />
          <div className="relative p-5 flex flex-col justify-end" style={{ minHeight: 220 }}>
            <div className="flex items-center gap-2 mb-2">
              <CrestIcon size={28} />
              <span className="text-gold-gradient font-black tracking-widest text-xs uppercase">CD Tenerife</span>
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 900, lineHeight: 1.15, margin: 0 }}>
              The Passion<br />That Unites Us
            </h1>
            {liveMatch && (
              <div
                className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full self-start"
                style={{ background: 'rgba(229,57,53,0.9)', fontSize: 12, fontWeight: 700 }}
                onClick={() => navigate('/live')}
              >
                <span className="w-2 h-2 rounded-full bg-white pulse-dot" />
                LIVE — {liveMatch.homeTeam} {liveMatch.homeScore}:{liveMatch.awayScore} {liveMatch.awayTeam}
              </div>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-4 gap-2 mb-6 fade-in-up">
          {[
            { icon: Newspaper, label: 'News', path: '/news', color: '#1c3a7a' },
            { icon: ShoppingBag, label: 'Store', path: '/store', color: '#1c3a7a' },
            { icon: PlayCircle, label: 'Live', path: '/live', color: '#c0392b' },
            { icon: Star, label: 'Join', path: '/profile', color: '#c9880a' },
          ].map(({ icon: Icon, label, path, color }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl transition-transform active:scale-95"
              style={{ background: color + '33', border: `1px solid ${color}55` }}
            >
              <Icon size={22} style={{ color }} strokeWidth={2} />
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{label}</span>
            </button>
          ))}
        </div>

        {/* Live / Next match */}
        {(liveMatch || nextMatch) && (
          <div className="mb-5 fade-in-up">
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {liveMatch ? 'Live Now' : 'Next Match'}
              </span>
              <button onClick={() => navigate('/live')} style={{ color: '#f5cc50', fontSize: 12, fontWeight: 600 }}>
                See all
              </button>
            </div>
            <MatchCard match={liveMatch || nextMatch!} onClick={() => navigate('/live')} />
          </div>
        )}

        {/* Featured news */}
        {featuredNews && (
          <div className="mb-5 fade-in-up">
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Latest News</span>
              <button onClick={() => navigate('/news')} style={{ color: '#f5cc50', fontSize: 12, fontWeight: 600 }}>See all</button>
            </div>
            <button
              onClick={() => navigate('/news')}
              className="w-full rounded-2xl overflow-hidden relative text-left mb-2.5 active:opacity-90"
              style={{ height: 180 }}
            >
              <img src={featuredNews.image} alt={featuredNews.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,15,34,0.95) 0%, transparent 55%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded-full text-xs font-700" style={{ background: '#c9880a', fontSize: 10, fontWeight: 700 }}>FEATURED</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{featuredNews.date}</span>
                </div>
                <p style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>{featuredNews.title}</p>
              </div>
            </button>
            <div className="flex flex-col gap-2">
              {recentNews.map(article => (
                <button
                  key={article.id}
                  onClick={() => navigate('/news')}
                  className="flex gap-3 rounded-xl p-2.5 active:opacity-80 text-left"
                  style={{ background: '#112248' }}
                >
                  <img src={article.image} alt={article.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0">
                    <p style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.35, marginBottom: 4 }} className="line-clamp-2">{article.title}</p>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{article.date} · {article.readTime} min read</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Featured product */}
        <div className="fade-in-up mb-4">
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Club Store</span>
            <button onClick={() => navigate('/store')} style={{ color: '#f5cc50', fontSize: 12, fontWeight: 600 }}>See all</button>
          </div>
          <button
            onClick={() => navigate('/store')}
            className="w-full rounded-2xl p-4 flex gap-4 items-center active:opacity-90 text-left"
            style={{ background: '#112248', border: '1px solid rgba(245,204,80,0.15)' }}
          >
            <img src={featuredProduct.image} alt={featuredProduct.name} className="w-20 h-20 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-xs font-700" style={{ background: '#c9880a', fontSize: 10, fontWeight: 700 }}>NEW</span>
              </div>
              <p style={{ fontSize: 15, fontWeight: 700 }}>{featuredProduct.name}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>{featuredProduct.description}</p>
              <p className="text-gold-gradient" style={{ fontSize: 18, fontWeight: 900 }}>€{featuredProduct.price}</p>
            </div>
            <ArrowRight size={18} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
          </button>
        </div>

        {/* Membership CTA */}
        <div
          className="fade-in-up rounded-2xl p-5 mb-2"
          style={{ background: 'linear-gradient(135deg, #162d60 0%, #1c3a7a 100%)', border: '1px solid rgba(245,204,80,0.25)' }}
        >
          <div className="flex items-start gap-3">
            <Star size={28} style={{ color: '#f5cc50', flexShrink: 0, marginTop: 2 }} />
            <div className="flex-1">
              <p style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>Become a Blue Member</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 14 }}>
                Exclusive content, store discounts, priority tickets & more.
              </p>
              <button
                onClick={() => navigate('/profile')}
                className="btn-gold px-5 py-2.5 text-sm font-bold"
              >
                Join for $5 / month
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MatchCard({ match, onClick }: { match: typeof matches[0]; onClick: () => void }) {
  const isLive = match.status === 'live'
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl overflow-hidden relative text-left active:opacity-90"
      style={{ background: '#112248' }}
    >
      <img src={match.thumbnail} alt="match" className="w-full h-28 object-cover opacity-40" />
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{match.competition}</span>
          {isLive && (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-700" style={{ background: 'rgba(229,57,53,0.9)', fontSize: 11, fontWeight: 700 }}>
              <span className="w-1.5 h-1.5 bg-white rounded-full pulse-dot" />
              LIVE {match.minute}'
            </span>
          )}
        </div>
        <div className="flex items-center justify-center gap-4">
          <span style={{ fontSize: 14, fontWeight: 700, flex: 1, textAlign: 'right' }}>{match.homeTeam}</span>
          <span style={{ fontSize: 22, fontWeight: 900, minWidth: 56, textAlign: 'center' }}>
            {match.homeScore !== undefined ? `${match.homeScore} : ${match.awayScore}` : 'vs'}
          </span>
          <span style={{ fontSize: 14, fontWeight: 700, flex: 1, textAlign: 'left' }}>{match.awayTeam}</span>
        </div>
        <div className="text-center" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
          {match.date} · {match.time} · {match.stadium}
        </div>
      </div>
    </button>
  )
}
