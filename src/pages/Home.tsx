import { useNavigate } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'
import CrestIcon from '../components/CrestIcon'
import { newsArticles, matches, products } from '../data'
import type { Match } from '../types'

export default function Home() {
  const navigate = useNavigate()
  const liveMatch   = matches.find(m => m.status === 'live')
  const nextMatch   = matches.find(m => m.status === 'upcoming')
  const featuredNews = newsArticles.find(n => n.featured)
  const recentNews   = newsArticles.filter(n => !n.featured).slice(0, 3)
  const featuredProduct = products[0]
  const activeMatch = liveMatch ?? nextMatch

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* ── Status bar spacer + logo bar ── */}
      <div
        className="safe-top shrink-0"
        style={{ background: '#060f22', padding: '0 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <CrestIcon size={36} />
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>CD Tenerife</div>
          <div style={{ fontSize: 10, color: '#d4a726', fontWeight: 500 }}>The Passion That Unites Us</div>
        </div>
      </div>

      <div className="scroll-area flex-1" style={{ paddingBottom: 20 }}>

        {/* ── Hero ── */}
        <div
          className="fade-up"
          style={{ position: 'relative', height: 260, overflow: 'hidden' }}
        >
          <img
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=80"
            alt="Estadio Heliodoro"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #060f22 0%, rgba(6,15,34,0.5) 55%, transparent 100%)' }} />

          {liveMatch && (
            <button
              onClick={() => navigate('/live')}
              style={{
                position: 'absolute', top: 16, left: 16,
                display: 'flex', alignItems: 'center', gap: 6,
                background: '#c0392b', borderRadius: 6,
                padding: '5px 10px', border: 'none', cursor: 'pointer',
                color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
              }}
            >
              <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', flexShrink: 0 }} />
              LIVE NOW
            </button>
          )}

          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 20px 20px' }}>
            <h1 className="t-hero" style={{ margin: 0, marginBottom: 14 }}>
              The Passion<br />That Unites Us
            </h1>
            {activeMatch && (
              <ScorePill match={activeMatch} onClick={() => navigate('/live')} />
            )}
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ padding: '24px 16px 0' }} className="stagger">

          {/* Next / Live match */}
          {activeMatch && (
            <section style={{ marginBottom: 28 }}>
              <div className="section-header">
                <span className="section-title">{liveMatch ? 'Live Match' : 'Next Match'}</span>
                <button className="section-link btn btn-ghost" onClick={() => navigate('/live')} style={{ padding: 0 }}>
                  All matches
                </button>
              </div>
              <MatchCard match={activeMatch} onClick={() => navigate('/live')} />
            </section>
          )}

          {/* News */}
          <section style={{ marginBottom: 28 }}>
            <div className="section-header">
              <span className="section-title">Latest News</span>
              <button className="section-link btn btn-ghost" onClick={() => navigate('/news')} style={{ padding: 0 }}>
                See all
              </button>
            </div>

            {featuredNews && (
              <button
                onClick={() => navigate('/news')}
                style={{
                  display: 'block', width: '100%', position: 'relative',
                  height: 200, borderRadius: 12, overflow: 'hidden',
                  marginBottom: 10, border: 'none', cursor: 'pointer', padding: 0,
                }}
              >
                <img src={featuredNews.image} alt={featuredNews.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,15,34,0.95) 0%, transparent 50%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 16px' }}>
                  <span className="badge badge-blue" style={{ marginBottom: 8, display: 'inline-block' }}>Featured</span>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 700, lineHeight: 1.35, color: '#fff', textAlign: 'left' }}>
                    {featuredNews.title}
                  </p>
                </div>
              </button>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {recentNews.map((article, i) => (
                <button
                  key={article.id}
                  onClick={() => navigate('/news')}
                  style={{
                    display: 'flex', gap: 12, alignItems: 'center',
                    padding: '12px 0',
                    background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                    borderBottom: i < recentNews.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  }}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{ width: 64, height: 64, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p style={{ margin: '0 0 5px', fontSize: 14, fontWeight: 600, lineHeight: 1.35, color: '#fff',
                      overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {article.title}
                    </p>
                    <span className="t-meta">{article.date} · {article.readTime} min read</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Store highlight */}
          <section style={{ marginBottom: 28 }}>
            <div className="section-header">
              <span className="section-title">Club Store</span>
              <button className="section-link btn btn-ghost" onClick={() => navigate('/store')} style={{ padding: 0 }}>
                Shop all
              </button>
            </div>
            <button
              onClick={() => navigate('/store')}
              className="card"
              style={{
                display: 'flex', gap: 16, alignItems: 'center',
                padding: 14, width: '100%', cursor: 'pointer', textAlign: 'left',
              }}
            >
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                style={{ width: 80, height: 80, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <span className="badge badge-gold" style={{ marginBottom: 6, display: 'inline-block' }}>New</span>
                <p style={{ margin: '0 0 3px', fontSize: 15, fontWeight: 700, color: '#fff' }}>{featuredProduct.name}</p>
                <p style={{ margin: '0 0 8px', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{featuredProduct.description}</p>
                <span className="t-price">€{featuredProduct.price}</span>
              </div>
              <ArrowRight size={16} style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }} />
            </button>
          </section>

          {/* Membership */}
          <section>
            <div
              className="card"
              style={{ padding: '20px 16px', borderColor: 'rgba(212,167,38,0.25)' }}
            >
              <p style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 700 }}>Become a Member</p>
              <p style={{ margin: '0 0 16px', fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>
                Live streaming, store discounts, and exclusive content — from $5 / month.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/profile')}
                  style={{ flex: 1, padding: '12px 0', borderRadius: 10, fontSize: 14 }}
                >
                  Join now
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate('/profile')}
                  style={{ flex: 1, padding: '12px 0', borderRadius: 10, fontSize: 14 }}
                >
                  Learn more
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

/* ── ScorePill ── */
function ScorePill({ match, onClick }: { match: Match; onClick: () => void }) {
  const isLive = match.status === 'live'
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        background: 'rgba(12,27,58,0.85)', backdropFilter: 'blur(8px)',
        borderRadius: 10, padding: '9px 14px',
        border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
      }}
    >
      {isLive && (
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, color: '#e74c3c' }}>
          <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#e74c3c', flexShrink: 0 }} />
          {match.minute}'
        </span>
      )}
      <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{match.homeTeam}</span>
      <span style={{ fontSize: 15, fontWeight: 800, color: '#fff', minWidth: 36, textAlign: 'center' }}>
        {match.homeScore !== undefined ? `${match.homeScore}–${match.awayScore}` : 'vs'}
      </span>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{match.awayTeam}</span>
      {isLive && <Play size={13} fill="#d4a726" style={{ color: '#d4a726', marginLeft: 2 }} />}
    </button>
  )
}

/* ── MatchCard ── */
function MatchCard({ match, onClick }: { match: Match; onClick: () => void }) {
  const isLive = match.status === 'live'
  return (
    <button
      onClick={onClick}
      className="card"
      style={{ width: '100%', cursor: 'pointer', overflow: 'hidden', textAlign: 'left', padding: 0 }}
    >
      {/* Thin colored top bar */}
      <div style={{ height: 3, background: isLive ? '#c0392b' : '#d4a726' }} />

      <div style={{ padding: '14px 16px' }}>
        {/* Meta row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{match.competition}</span>
          {isLive ? (
            <span className="badge badge-live" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff', flexShrink: 0 }} />
              LIVE {match.minute}'
            </span>
          ) : (
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{match.date} · {match.time}</span>
          )}
        </div>

        {/* Score row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{ fontSize: 15, fontWeight: 700, flex: 1, textAlign: 'left' }}>{match.homeTeam}</span>
          <span style={{
            fontSize: 26, fontWeight: 800, minWidth: 72, textAlign: 'center', letterSpacing: '-0.5px',
            color: isLive ? '#fff' : 'rgba(255,255,255,0.35)',
          }}>
            {match.homeScore !== undefined ? `${match.homeScore} – ${match.awayScore}` : '—'}
          </span>
          <span style={{ fontSize: 15, fontWeight: 700, flex: 1, textAlign: 'right' }}>{match.awayTeam}</span>
        </div>

        {/* Stadium */}
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
          {match.stadium}
        </div>
      </div>
    </button>
  )
}
