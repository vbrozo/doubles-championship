import { useApp } from '../context/useApp'

export function CoursePage() {
  const { state, updatePar, resetRound } = useApp()
  const { course } = state
  const totalPar = course.holes.reduce((sum, h) => sum + h.par, 0)

  return (
    <div className="page course-page">
      <h2>{course.name}</h2>
      <p className="course-summary">{course.holes.length} rupa · par {totalPar}</p>

      <ul className="hole-par-list">
        {course.holes.map((hole) => (
          <li key={hole.number} className="hole-par-row">
            <span className="hole-par-number">Rupa {hole.number}</span>
            <div className="hole-par-stepper">
              <button
                onClick={() => updatePar(hole.number, Math.max(1, hole.par - 1))}
              >
                −
              </button>
              <span>par {hole.par}</span>
              <button onClick={() => updatePar(hole.number, hole.par + 1)}>+</button>
            </div>
          </li>
        ))}
      </ul>

      <button
        className="primary-btn danger-btn"
        onClick={() => {
          if (confirm('Resetirati sve rezultate runde? Ova radnja se ne može poništiti.')) {
            resetRound()
          }
        }}
      >
        Resetiraj rundu
      </button>
    </div>
  )
}
