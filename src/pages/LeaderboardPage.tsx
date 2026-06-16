import { useApp } from '../context/useApp'

export function LeaderboardPage() {
  const { state } = useApp()
  const { teams, rounds, course } = state
  const totalPar = course.holes.reduce((sum, h) => sum + h.par, 0)

  const rows = teams
    .map((team) => {
      const round = rounds.find((r) => r.teamId === team.id)
      const played = round?.holes.filter((h) => h.strokes != null) ?? []
      const strokes = played.reduce((sum, h) => sum + (h.strokes ?? 0), 0)
      const parPlayed = played.reduce((sum, h) => {
        const hole = course.holes.find((c) => c.number === h.holeNumber)
        return sum + (hole?.par ?? 0)
      }, 0)
      const diff = strokes - parPlayed
      return {
        team,
        strokes,
        holesPlayed: played.length,
        diff,
      }
    })
    .sort((a, b) => {
      if (a.holesPlayed === 0 && b.holesPlayed === 0) return 0
      if (a.holesPlayed === 0) return 1
      if (b.holesPlayed === 0) return -1
      return a.diff - b.diff
    })

  return (
    <div className="page leaderboard-page">
      <p className="course-summary">
        {course.name} · {course.holes.length} rupa · par {totalPar}
      </p>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Par</th>
            <th>Rupe</th>
            <th>Udarci</th>
            <th>+/-</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.team.id}>
              <td>{i + 1}</td>
              <td>
                <div className="team-name">{row.team.name}</div>
                <div className="team-players">
                  {row.team.players.map((p) => p.name).join(' · ')}
                </div>
              </td>
              <td>{row.holesPlayed}/{course.holes.length}</td>
              <td>{row.holesPlayed > 0 ? row.strokes : '–'}</td>
              <td className={row.diff < 0 ? 'under-par' : row.diff > 0 ? 'over-par' : ''}>
                {row.holesPlayed > 0 ? (row.diff > 0 ? `+${row.diff}` : row.diff) : '–'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
