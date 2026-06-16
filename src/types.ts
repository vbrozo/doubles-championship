export interface Player {
  id: string
  name: string
}

export interface Team {
  id: string
  name: string
  players: [Player, Player]
}

export interface Hole {
  number: number
  par: number
}

export interface Course {
  name: string
  holes: Hole[]
}

export interface HoleResult {
  holeNumber: number
  strokes: number | null
  teeThrowerId: string | null
}

export interface TeamRound {
  teamId: string
  holes: HoleResult[]
}

export interface AppState {
  course: Course
  teams: Team[]
  rounds: TeamRound[]
}
