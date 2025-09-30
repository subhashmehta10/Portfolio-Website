function AdminChart({ seriesA = [], seriesB = [], labels = [] }) {
  const width = 600
  const height = 220
  const pad = 30
  const maxVal = Math.max(1, ...seriesA, ...seriesB)
  const points = (arr) => arr.map((v, i) => {
    const x = pad + (i * (width - 2 * pad)) / Math.max(1, labels.length - 1)
    const y = pad + (height - 2 * pad) * (1 - v / maxVal)
    return `${x},${y}`
  }).join(' ')

  return (
    <div style={{ overflow: 'auto' }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="220">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width={width} height={height} fill="#ffffff" stroke="#e5e7eb" />

        {[0.25, 0.5, 0.75].map((t) => (
          <line key={t} x1={pad} y1={pad + (height - 2 * pad) * t} x2={width - pad} y2={pad + (height - 2 * pad) * t} stroke="#e5e7eb" />
        ))}

        {labels.map((l, i) => {
          const x = pad + (i * (width - 2 * pad)) / Math.max(1, labels.length - 1)
          return <text key={l} x={x} y={height - 6} fontSize="10" textAnchor="middle" fill="#475569">{l}</text>
        })}

        {seriesA.length > 0 && (
          <>
            <polyline fill="none" stroke="#2563eb" strokeWidth="2" points={points(seriesA)} />
            <polygon fill="url(#g1)" points={`${points(seriesA)} ${width - pad},${height - pad} ${pad},${height - pad}`} />
          </>
        )}
        {seriesB.length > 0 && (
          <>
            <polyline fill="none" stroke="#f59e0b" strokeWidth="2" points={points(seriesB)} />
            <polygon fill="url(#g2)" points={`${points(seriesB)} ${width - pad},${height - pad} ${pad},${height - pad}`} />
          </>
        )}
      </svg>
    </div>
  )
}

export default AdminChart


