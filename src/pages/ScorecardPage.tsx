import { useState } from 'react'
import { useApp } from '../context/useApp'

export function ScorecardPage() {
  const { state, setStrokes, setTeeThrower } = useApp()
  const { teams, rounds, course } = state
  const [teamId, setTeamId] = useState(teams[0]?.id ?? '')
  const [holeNumber, setHoleNumber] = useState(1)

  if (teams.length === 0) {
    return <p className="empty-state">Nema timova. Dodajte parove na stranici "Parovi".</p>
  }

  const team = teams.find((t) => t.id === teamId) ?? teams[0]
  const round = rounds.find((r) => r.teamId === team.id)
  const hole = course.holes.find((h) => h.number === holeNumber)
  const holeResult = round?.holes.find((h) => h.holeNumber === holeNumber)

  const adjustStrokes = (delta: number) => {
    const current = holeResult?.strokes ?? hole?.par ?? 3
    const next = Math.max(1, current + delta)
    setStrokes(team.id, holeNumber, next)
  }

  return (
    <div className="page scorecard-page">
      <div className="field-row">
        <label htmlFor="team-select">Par</label>
        <select
          id="team-select"
          value={team.id}
          onChange={(e) => setTeamId(e.target.value)}
        >
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="hole-nav">
        <button
          className="hole-nav-btn"
          disabled={holeNumber <= 1}
          onClick={() => setHoleNumber((n) => n - 1)}
        >
          ←
        </button>
        <div className="hole-nav-label">
          <span className="hole-number">Rupa {holeNumber}</span>
          <span className="hole-par">par {hole?.par}</span>
        </div>
        <button
          className="hole-nav-btn"
          disabled={holeNumber >= course.holes.length}
          onClick={() => setHoleNumber((n) => n + 1)}
        >
          →
        </button>
      </div>

      <div className="stroke-counter">
        <button className="stroke-btn" onClick={() => adjustStrokes(-1)}>
          −
        </button>
        <span className="stroke-value">{holeResult?.strokes ?? '–'}</span>
        <button className="stroke-btn" onClick={() => adjustStrokes(1)}>
          +
        </button>
      </div>

      <div className="tee-thrower">
        <p className="section-label">Tko je bacio tee shot?</p>
        <div className="tee-thrower-options">
          {team.players.map((p) => (
            <button
              key={p.id}
              className={`tee-thrower-btn ${holeResult?.teeThrowerId === p.id ? 'active' : ''}`}
              onClick={() => setTeeThrower(team.id, holeNumber, p.id)}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="hole-grid">
        {course.holes.map((h) => {
          const r = round?.holes.find((hr) => hr.holeNumber === h.number)
          const played = r?.strokes != null
          return (
            <button
              key={h.number}
              className={`hole-chip ${played ? 'played' : ''} ${h.number === holeNumber ? 'current' : ''}`}
              onClick={() => setHoleNumber(h.number)}
            >
              {h.number}
            </button>
          )
        })}
      </div>
    </div>
  )
}
