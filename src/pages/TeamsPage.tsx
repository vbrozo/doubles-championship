import { useState } from 'react'
import { useApp } from '../context/useApp'

export function TeamsPage() {
  const { state, addTeam, updateTeam, removeTeam } = useApp()
  const [name, setName] = useState('')
  const [player1, setPlayer1] = useState('')
  const [player2, setPlayer2] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  const resetForm = () => {
    setName('')
    setPlayer1('')
    setPlayer2('')
    setEditingId(null)
  }

  const startEdit = (teamId: string) => {
    const team = state.teams.find((t) => t.id === teamId)
    if (!team) return
    setEditingId(teamId)
    setName(team.name)
    setPlayer1(team.players[0].name)
    setPlayer2(team.players[1].name)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !player1.trim() || !player2.trim()) return
    if (editingId) {
      updateTeam(editingId, name.trim(), player1.trim(), player2.trim())
    } else {
      addTeam(name.trim(), player1.trim(), player2.trim())
    }
    resetForm()
  }

  return (
    <div className="page teams-page">
      <ul className="team-list">
        {state.teams.map((team) => (
          <li key={team.id} className="team-list-item">
            <div>
              <div className="team-name">{team.name}</div>
              <div className="team-players">
                {team.players.map((p) => p.name).join(' · ')}
              </div>
            </div>
            <div className="team-actions">
              <button className="link-btn" onClick={() => startEdit(team.id)}>
                Uredi
              </button>
              <button
                className="link-btn danger"
                onClick={() => {
                  if (confirm(`Obrisati par "${team.name}"?`)) removeTeam(team.id)
                }}
              >
                Obriši
              </button>
            </div>
          </li>
        ))}
      </ul>

      <form className="team-form" onSubmit={submit}>
        <h2>{editingId ? 'Uredi par' : 'Dodaj novi par'}</h2>
        <label>
          Naziv para
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="npr. Diskolovci" />
        </label>
        <label>
          Igrač 1
          <input value={player1} onChange={(e) => setPlayer1(e.target.value)} placeholder="Ime i prezime" />
        </label>
        <label>
          Igrač 2
          <input value={player2} onChange={(e) => setPlayer2(e.target.value)} placeholder="Ime i prezime" />
        </label>
        <div className="form-actions">
          <button type="submit" className="primary-btn">
            {editingId ? 'Spremi' : 'Dodaj par'}
          </button>
          {editingId && (
            <button type="button" className="link-btn" onClick={resetForm}>
              Odustani
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
