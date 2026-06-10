import { useState } from 'react'
import { Play, Lock, Calendar, MapPin, ChevronRight, X } from 'lucide-react'
import TopBar from '../components/TopBar'
import { matches } from '../data'
import type { Match } from '../types'

type Tab = 'live' | 'upcoming' | 'results'

export default function Live() {
  const [tab, setTab]             = useState<Tab>('live')
  const [showPaywall, setPaywall] = useState(false)

  const live     = matches.filter(m => m.status === 'live')
  const upcoming = matches.filter(m => m.status === 'upcoming')
  const results  = matches.filter(m => m.status === 'finished')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="Matches" />

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: 6, padding: '0 16px 12px',
        background: '#060f22', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0,
      }}>
        {(['live', 'upcoming', 'results'] as Tab[]).map(t => {
          const labels: Record<Tab, string> = { live: 'Live', upcoming: 'Upcoming', results: 'Results' }
          const isActive = tab === t
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 8,
                border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: isActive ? 700 : 500,
                background: isActive
                  ? (t === 'live' ? '#c0392b' : '#d4a726')
                  : 'transparent',
                color: isActive ? (t === 'live' ? '#fff' : '#060f22') : 'rgba(255,255,255,0.5)',
                transition: 'background 0.15s',
              }}
            >
              {t === 'live' && live.length > 0 && isActive && (
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: isActive ? '#fff' : '#c0392b', flexShrink: 0 }}
                  className="pulse-dot" />
              )}
              {labels[t]}
              {t === 'live' && live.length > 0 && (
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  background: isActive ? 'rgba(255,255,255,0.2)' : '#c0392b',
                  color: '#fff', borderRadius: 10, padding: '1px 6px',
                }}>
                  {live.length}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="scroll-area flex-1" style={{ padding: '16px 16px 20px' }}>
        {tab === 'live' && (
          live.length === 0 ? <EmptyLive /> :
          <div className="stagger">{live.map(m => <LiveCard key={m.id} match={m} onWatch={() => setPaywall(true)} />)}</div>
        )}
        {tab === 'upcoming' && (
          <div className="stagger">{upcoming.map(m => <UpcomingCard key={m.id} match={m} />)}</div>
        )}
        {tab === 'results' && (
          <div className="stagger">{results.map(m => <ResultCard key={m.id} match={m} />)}</div>
        )}
      </div>

      {showPaywall && <PaywallSheet onClose={() => setPaywall(false)} />}
    </div>
  )
}

function LiveCard({ match, onWatch }: { match: Match; onWatch: () => void }) {
  return (
    <div className="card" style={{ overflow: 'hidden', marginBottom: 16 }}>
      {/* Thumbnail with play overlay */}
      <div style={{ position: 'relative', height: 190 }}>
        <img src={match.thumbnail} alt="match" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,15,34,0.5)' }} />
        <button
          onClick={onWatch}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 60, height: 60, borderRadius: '50%',
            background: 'rgba(212,167,38,0.95)',
            border: '3px solid rgba(255,255,255,0.2)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Play size={22} fill="#060f22" style={{ color: '#060f22', marginLeft: 3 }} />
        </button>
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
          <span className="badge badge-live" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff', flexShrink: 0 }} />
            LIVE
          </span>
          <span className="badge" style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', backdropFilter: 'blur(4px)' }}>
            {match.minute}'
          </span>
        </div>
        <div style={{ position: 'absolute', bottom: 12, right: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Lock size={12} style={{ color: '#d4a726' }} />
          <span style={{ fontSize: 11, color: '#d4a726', fontWeight: 600 }}>Members only</span>
        </div>
      </div>

      {/* Score */}
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{match.competition}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
            <MapPin size={11} /> {match.stadium}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{ fontSize: 16, fontWeight: 700 }}>{match.homeTeam}</span>
          <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-1px' }}>{match.homeScore} – {match.awayScore}</span>
          <span style={{ fontSize: 16, fontWeight: 700 }}>{match.awayTeam}</span>
        </div>
        <button
          onClick={onWatch}
          className="btn btn-primary"
          style={{ width: '100%', padding: '12px 0', borderRadius: 10 }}
        >
          <Play size={15} fill="currentColor" /> Watch Live
        </button>
      </div>
    </div>
  )
}

function UpcomingCard({ match }: { match: Match }) {
  return (
    <div className="card" style={{ padding: '14px 16px', marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span className="badge badge-blue">{match.competition}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
          <Calendar size={11} /> {match.date} · {match.time}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 15, fontWeight: 700 }}>{match.homeTeam}</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.3)', padding: '4px 12px', background: '#112248', borderRadius: 6 }}>vs</span>
        <span style={{ fontSize: 15, fontWeight: 700 }}>{match.awayTeam}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>
        <MapPin size={11} /> {match.stadium}
      </div>
    </div>
  )
}

function ResultCard({ match }: { match: Match }) {
  const isTenHome = match.homeTeam === 'CD Tenerife'
  const tScore = isTenHome ? match.homeScore! : match.awayScore!
  const oScore = isTenHome ? match.awayScore! : match.homeScore!
  const outcome = tScore > oScore ? 'W' : tScore < oScore ? 'L' : 'D'
  const outColor = { W: '#1a7a3c', L: '#a93226', D: '#4a4a5a' }[outcome]

  return (
    <button
      className="card"
      style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', width: '100%', cursor: 'pointer', marginBottom: 8 }}
    >
      <div style={{
        width: 34, height: 34, borderRadius: 8, flexShrink: 0,
        background: outColor,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 800, color: '#fff',
      }}>
        {outcome}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>{match.homeTeam}</span>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.5px' }}>{match.homeScore} – {match.awayScore}</span>
          <span style={{ fontSize: 14, fontWeight: 700 }}>{match.awayTeam}</span>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
          {match.competition} · {match.date}
        </div>
      </div>
      <ChevronRight size={15} style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }} />
    </button>
  )
}

function EmptyLive() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', textAlign: 'center' }}>
      <div style={{ width: 56, height: 56, borderRadius: 14, background: '#0c1b3a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <Play size={24} style={{ color: 'rgba(255,255,255,0.25)' }} />
      </div>
      <p style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700 }}>No live matches</p>
      <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Check back on match day</p>
    </div>
  )
}

function PaywallSheet({ onClose }: { onClose: () => void }) {
  const features = [
    'Watch every match live & on-demand',
    'Exclusive behind-the-scenes content',
    'Store discounts & priority ticket access',
  ]
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 50, maxWidth: 430, margin: '0 auto',
        background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-end',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', borderRadius: '20px 20px 0 0',
          background: '#0c1b3a', border: '1px solid rgba(255,255,255,0.1)',
          padding: '0 24px 40px',
        }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '14px 0 20px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }} />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 20,
            width: 30, height: 30, borderRadius: 8,
            background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
          }}
        >
          <X size={16} />
        </button>

        {/* Icon */}
        <div style={{
          width: 56, height: 56, borderRadius: 14, marginBottom: 16,
          background: 'rgba(212,167,38,0.12)', border: '1px solid rgba(212,167,38,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Lock size={24} style={{ color: '#d4a726' }} />
        </div>

        <h3 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 800 }}>Member exclusive</h3>
        <p style={{ margin: '0 0 20px', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
          Live streaming is available to CD Tenerife members. Join today for just $5/month.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {features.map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                background: '#1a4026',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4l3 3 5-6" stroke="#4caf50" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{f}</span>
            </div>
          ))}
        </div>

        <button className="btn btn-primary" style={{ width: '100%', padding: '15px 0', borderRadius: 12, fontSize: 15 }}>
          Become a member — $5 / month
        </button>
        <button onClick={onClose} style={{ width: '100%', padding: '14px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
          Maybe later
        </button>
      </div>
    </div>
  )
}
