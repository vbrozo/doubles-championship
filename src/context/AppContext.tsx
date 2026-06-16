import { useEffect, useReducer, type ReactNode } from 'react'
import { loadState, saveState } from '../storage'
import { AppContext, type AppContextValue } from './context'
import { reducer } from './reducer'

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  const value: AppContextValue = {
    state,
    addTeam: (name, player1, player2) => dispatch({ type: 'ADD_TEAM', name, player1, player2 }),
    updateTeam: (teamId, name, player1, player2) =>
      dispatch({ type: 'UPDATE_TEAM', teamId, name, player1, player2 }),
    removeTeam: (teamId) => dispatch({ type: 'REMOVE_TEAM', teamId }),
    updatePar: (holeNumber, par) => dispatch({ type: 'UPDATE_PAR', holeNumber, par }),
    setStrokes: (teamId, holeNumber, strokes) =>
      dispatch({ type: 'SET_STROKES', teamId, holeNumber, strokes }),
    setTeeThrower: (teamId, holeNumber, playerId) =>
      dispatch({ type: 'SET_TEE_THROWER', teamId, holeNumber, playerId }),
    resetRound: () => dispatch({ type: 'RESET_ROUND' }),
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
