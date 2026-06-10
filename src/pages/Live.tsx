import { useState } from 'react'
import { Play, Lock, Calendar, MapPin, ChevronRight } from 'lucide-react'
import TopBar from '../components/TopBar'
import { matches } from '../data'
import type { Match } from '../types'

export default function Live() {
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'results'>('live')
  const [showPaywall, setShowPaywall] = useState(false)

  const liveMatches = matches.filter(m => m.status === 'live')
  const upcomingMatches = matches.filter(m => m.status === 'upcoming')
  const results = matches.filter(m => m.status === 'finished')

  return (
    <div className="flex flex-col h-full">
      <TopBar title="Matches & Live" />

      {/* Tabs */}
      <div className="shrink-0 flex px-4 gap-2 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: '#060f22' }}>
        {(['live', 'upcoming', 'results'] as const).map(tab => {
          const labels = { live: 'Live', upcoming: 'Upcoming', results: 'Results' }
          const isLive = tab === 'live'
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all"
              style={{
                fontSize: 13,
                fontWeight: activeTab === tab ? 700 : 500,
                background: activeTab === tab
                  ? (isLive ? 'rgba(229,57,53,0.9)' : 'linear-gradient(135deg, #f5cc50, #c9880a)')
                  : '#112248',
                color: activeTab === tab ? (isLive ? 'white' : '#0c1b3a') : 'rgba(255,255,255,0.6)',
              }}
            >
              {isLive && liveMatches.length > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-white pulse-dot" />
              )}
              {labels[tab]}
              {isLive && liveMatches.length > 0 && (
                <span className="w-4 h-4 rounded-full text-xs flex items-center justify-center font-800" style={{ background: 'rgba(255,255,255,0.25)' }}>
                  {liveMatches.length}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="scroll-area flex-1 px-4 pt-4 pb-4">
        {activeTab === 'live' && (
          <div className="stagger">
            {liveMatches.length === 0 ? (
              <EmptyState message="No live matches right now" sub="Check upcoming matches or come back later" />
            ) : (
              liveMatches.map(match => (
                <LiveMatchCard key={match.id} match={match} onWatch={() => setShowPaywall(true)} />
              ))
            )}
          </div>
        )}

        {activeTab === 'upcoming' && (
          <div className="flex flex-col gap-3 stagger">
            {upcomingMatches.map(match => (
              <UpcomingCard key={match.id} match={match} />
            ))}
          </div>
        )}

        {activeTab === 'results' && (
          <div className="flex flex-col gap-3 stagger">
            {results.map(match => (
              <ResultCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>

      {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} />}
    </div>
  )
}

function LiveMatchCard({ match, onWatch }: { match: Match; onWatch: () => void }) {
  return (
    <div className="rounded-2xl overflow-hidden mb-4" style={{ background: '#112248' }}>
      <div className="relative" style={{ height: 200 }}>
        <img src={match.thumbnail} alt="match" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'rgba(6,15,34,0.55)' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={onWatch}
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(245,204,80,0.9)', boxShadow: '0 0 0 8px rgba(245,204,80,0.2)' }}
          >
            <Play size={24} fill="#0c1b3a" style={{ color: '#0c1b3a', marginLeft: 3 }} />
          </button>
        </div>
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full font-700" style={{ background: 'rgba(229,57,53,0.9)', fontSize: 12, fontWeight: 700 }}>
            <span className="w-1.5 h-1.5 bg-white rounded-full pulse-dot" />
            LIVE
          </span>
          <span className="px-3 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.6)', fontSize: 12, fontWeight: 600 }}>
            {match.minute}'
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>{match.competition}</span>
          <Lock size={14} style={{ color: '#f5cc50' }} />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span style={{ fontSize: 16, fontWeight: 700 }}>{match.homeTeam}</span>
          <span style={{ fontSize: 28, fontWeight: 900 }}>{match.homeScore} : {match.awayScore}</span>
          <span style={{ fontSize: 16, fontWeight: 700 }}>{match.awayTeam}</span>
        </div>
        <div className="flex items-center gap-2 mt-2" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
          <MapPin size={12} />
          {match.stadium}
        </div>
        <button
          onClick={onWatch}
          className="btn-gold w-full py-3 mt-4 font-bold flex items-center justify-center gap-2"
        >
          <Play size={16} fill="currentColor" />
          Watch Live
        </button>
      </div>
    </div>
  )
}

function UpcomingCard({ match }: { match: Match }) {
  return (
    <div className="rounded-xl p-4" style={{ background: '#112248' }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-0.5 rounded-full text-xs font-700" style={{ background: '#162d60', fontSize: 11, fontWeight: 700 }}>{match.competition}</span>
        <div className="flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
          <Calendar size={11} />
          {match.date} · {match.time}
        </div>
      </div>
      <div className="flex items-center justify-between mb-3">
        <span style={{ fontSize: 15, fontWeight: 700 }}>{match.homeTeam}</span>
        <span style={{ fontSize: 18, fontWeight: 900, color: 'rgba(255,255,255,0.4)' }}>vs</span>
        <span style={{ fontSize: 15, fontWeight: 700 }}>{match.awayTeam}</span>
      </div>
      <div className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>
        <MapPin size={11} />
        {match.stadium}
      </div>
    </div>
  )
}

function ResultCard({ match }: { match: Match }) {
  const tenerife = match.homeTeam === 'CD Tenerife' ? 'home' : 'away'
  const tScore = tenerife === 'home' ? match.homeScore! : match.awayScore!
  const oScore = tenerife === 'home' ? match.awayScore! : match.homeScore!
  const outcome = tScore > oScore ? 'W' : tScore < oScore ? 'L' : 'D'
  const colors = { W: '#1a7a3c', L: '#c0392b', D: '#5a5a5a' }

  return (
    <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: '#112248' }}>
      <div className="w-8 h-8 rounded-full flex items-center justify-center font-900 text-sm shrink-0" style={{ background: colors[outcome] }}>
        {outcome}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span style={{ fontSize: 14, fontWeight: 700 }}>{match.homeTeam}</span>
          <span style={{ fontSize: 18, fontWeight: 900 }}>{match.homeScore} : {match.awayScore}</span>
          <span style={{ fontSize: 14, fontWeight: 700 }}>{match.awayTeam}</span>
        </div>
        <div className="flex items-center gap-3" style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
          <span>{match.competition}</span>
          <span>·</span>
          <span>{match.date}</span>
        </div>
      </div>
      <ChevronRight size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
    </div>
  )
}

function EmptyState({ message, sub }: { message: string; sub: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: '#112248' }}>
        <Play size={28} style={{ color: 'rgba(255,255,255,0.3)' }} />
      </div>
      <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{message}</p>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{sub}</p>
    </div>
  )
}

function PaywallModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 flex items-end justify-center z-50"
      style={{ background: 'rgba(0,0,0,0.75)', maxWidth: 430, margin: '0 auto' }}
      onClick={onClose}
    >
      <div
        className="w-full rounded-t-3xl p-6 pb-10"
        style={{ background: '#0c1b3a', border: '1px solid rgba(255,255,255,0.1)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full mx-auto mb-6" style={{ background: 'rgba(255,255,255,0.2)' }} />
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, #f5cc50, #c9880a)' }}>
            <Lock size={28} style={{ color: '#0c1b3a' }} />
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8 }}>Members Only</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
            Live match streaming is exclusive to CD Tenerife members. Join for just $5/month.
          </p>
        </div>
        <ul className="mb-6 flex flex-col gap-2">
          {['Watch every match live & on-demand', 'Exclusive behind-the-scenes content', 'Store discounts & priority tickets'].map(f => (
            <li key={f} className="flex items-center gap-3" style={{ fontSize: 14 }}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: '#1a7a3c' }}>✓</span>
              {f}
            </li>
          ))}
        </ul>
        <button className="btn-gold w-full py-4 font-bold text-base mb-3">
          Become a Member — $5/mo
        </button>
        <button onClick={onClose} style={{ width: '100%', padding: '12px 0', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
          Maybe later
        </button>
      </div>
    </div>
  )
}
