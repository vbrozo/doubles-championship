import { createContext } from 'react'
import type { AppState } from '../types'

export type Action =
  | { type: 'ADD_TEAM'; name: string; player1: string; player2: string }
  | { type: 'UPDATE_TEAM'; teamId: string; name: string; player1: string; player2: string }
  | { type: 'REMOVE_TEAM'; teamId: string }
  | { type: 'UPDATE_PAR'; holeNumber: number; par: number }
  | { type: 'SET_STROKES'; teamId: string; holeNumber: number; strokes: number | null }
  | { type: 'SET_TEE_THROWER'; teamId: string; holeNumber: number; playerId: string | null }
  | { type: 'RESET_ROUND' }

export interface AppContextValue {
  state: AppState
  addTeam: (name: string, player1: string, player2: string) => void
  updateTeam: (teamId: string, name: string, player1: string, player2: string) => void
  removeTeam: (teamId: string) => void
  updatePar: (holeNumber: number, par: number) => void
  setStrokes: (teamId: string, holeNumber: number, strokes: number | null) => void
  setTeeThrower: (teamId: string, holeNumber: number, playerId: string | null) => void
  resetRound: () => void
}

export const AppContext = createContext<AppContextValue | null>(null)
