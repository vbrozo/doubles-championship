import type { AppState } from './types'
import { makeInitialState } from './data/initialState'

const STORAGE_KEY = 'doubles-championship-state-v1'

export function loadState(): AppState {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return makeInitialState()
  try {
    return JSON.parse(raw) as AppState
  } catch {
    return makeInitialState()
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
