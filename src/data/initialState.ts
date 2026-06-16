import type { AppState, Course, Team, TeamRound } from '../types'

const HOLE_COUNT = 18

export function makeDefaultCourse(): Course {
  return {
    name: 'Toplice Sveti Martin',
    holes: Array.from({ length: HOLE_COUNT }, (_, i) => ({
      number: i + 1,
      par: 3,
    })),
  }
}

export function makeEmptyRound(teamId: string, holeCount: number): TeamRound {
  return {
    teamId,
    holes: Array.from({ length: holeCount }, (_, i) => ({
      holeNumber: i + 1,
      strokes: null,
      teeThrowerId: null,
    })),
  }
}

function team(name: string, p1: string, p2: string): Team {
  const id = crypto.randomUUID()
  return {
    id,
    name,
    players: [
      { id: crypto.randomUUID(), name: p1 },
      { id: crypto.randomUUID(), name: p2 },
    ],
  }
}

export function makeInitialState(): AppState {
  const course = makeDefaultCourse()
  const teams = [
    team('Aladdinko', 'Dinko Šimenc', 'Antonio Grigić'),
    team('Bato i Đurak - Lolek i Bolek', 'Nino Durak', 'Aleksandar Bato Sudžuković'),
  ]
  const rounds = teams.map((t) => makeEmptyRound(t.id, course.holes.length))
  return { course, teams, rounds }
}
