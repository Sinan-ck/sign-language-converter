import { useLocation } from 'react-router-dom'

function SignPlayerPage() {
  const location = useLocation()
  const signs = location.state?.signs || []
  const transcript = location.state?.transcript || ''

  return (
    <div style={{ minHeight: '100vh', background: '#f5f4ff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <h2 style={{ color: '#6C63FF', marginBottom: '0.5rem' }}>Sign Language Player</h2>
      <p style={{ color: '#888', marginBottom: '1rem' }}>Transcript: {transcript}</p>

      <div style={{ width: '300px', height: '300px', background: '#fff', borderRadius: '20px', border: '2px solid #6C63FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', fontSize: '6rem' }}>
        {signs[0]?.sign || '👋'}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '700px' }}>
        {signs.map((item, i) => (
          <div key={i} style={{ background: '#fff', border: '1.5px solid #6C63FF', borderRadius: '10px', padding: '0.5rem 1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem' }}>{item.sign}</div>
            <div style={{ color: '#6C63FF', fontSize: '0.85rem', fontWeight: '600' }}>{item.word}</div>
          </div>
        ))}
      </div>

      <a href="/" style={{ marginTop: '2rem', color: '#6C63FF', textDecoration: 'none', fontWeight: '500' }}>← Convert another video</a>
    </div>
  )
}

export default SignPlayerPage