import { NavLink, Route, Routes } from 'react-router-dom'
import { ScorecardPage } from './pages/ScorecardPage'
import { LeaderboardPage } from './pages/LeaderboardPage'
import { TeamsPage } from './pages/TeamsPage'
import { CoursePage } from './pages/CoursePage'
import './App.css'

const tabs = [
  { to: '/', label: 'Scoring', icon: '🎯' },
  { to: '/leaderboard', label: 'Ljestvica', icon: '🏆' },
  { to: '/teams', label: 'Parovi', icon: '👥' },
  { to: '/course', label: 'Teren', icon: '🌲' },
]

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Doubles Championship</h1>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<ScorecardPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/course" element={<CoursePage />} />
        </Routes>
      </main>

      <nav className="bottom-nav">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            end={tab.to === '/'}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default App
