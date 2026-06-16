import type { AppState, Team } from '../types'
import { makeEmptyRound } from '../data/initialState'
import type { Action } from './context'

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TEAM': {
      const team: Team = {
        id: crypto.randomUUID(),
        name: action.name,
        players: [
          { id: crypto.randomUUID(), name: action.player1 },
          { id: crypto.randomUUID(), name: action.player2 },
        ],
      }
      return {
        ...state,
        teams: [...state.teams, team],
        rounds: [...state.rounds, makeEmptyRound(team.id, state.course.holes.length)],
      }
    }
    case 'UPDATE_TEAM': {
      return {
        ...state,
        teams: state.teams.map((t) =>
          t.id === action.teamId
            ? {
                ...t,
                name: action.name,
                players: [
                  { ...t.players[0], name: action.player1 },
                  { ...t.players[1], name: action.player2 },
                ],
              }
            : t,
        ),
      }
    }
    case 'REMOVE_TEAM': {
      return {
        ...state,
        teams: state.teams.filter((t) => t.id !== action.teamId),
        rounds: state.rounds.filter((r) => r.teamId !== action.teamId),
      }
    }
    case 'UPDATE_PAR': {
      return {
        ...state,
        course: {
          ...state.course,
          holes: state.course.holes.map((h) =>
            h.number === action.holeNumber ? { ...h, par: action.par } : h,
          ),
        },
      }
    }
    case 'SET_STROKES': {
      return {
        ...state,
        rounds: state.rounds.map((r) =>
          r.teamId === action.teamId
            ? {
                ...r,
                holes: r.holes.map((h) =>
                  h.holeNumber === action.holeNumber ? { ...h, strokes: action.strokes } : h,
                ),
              }
            : r,
        ),
      }
    }
    case 'SET_TEE_THROWER': {
      return {
        ...state,
        rounds: state.rounds.map((r) =>
          r.teamId === action.teamId
            ? {
                ...r,
                holes: r.holes.map((h) =>
                  h.holeNumber === action.holeNumber
                    ? { ...h, teeThrowerId: action.playerId }
                    : h,
                ),
              }
            : r,
        ),
      }
    }
    case 'RESET_ROUND': {
      return {
        ...state,
        rounds: state.teams.map((t) => makeEmptyRound(t.id, state.course.holes.length)),
      }
    }
    default:
      return state
  }
}
