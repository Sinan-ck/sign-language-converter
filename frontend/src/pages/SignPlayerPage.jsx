function SignPlayerPage() {
  const signs = ['Hello', 'My', 'Name', 'Is', 'Sign', 'Language']

  return (
    <div style={{ minHeight: '100vh', background: '#f5f4ff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <h2 style={{ color: '#6C63FF', marginBottom: '0.5rem' }}>Sign Language Player</h2>
      <p style={{ color: '#888', marginBottom: '2rem' }}>Showing signs word by word</p>

      {/* Avatar Box */}
      <div style={{ width: '300px', height: '300px', background: '#fff', borderRadius: '20px', border: '2px solid #6C63FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', fontSize: '6rem' }}>
        👋
      </div>

      {/* Word Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '600px' }}>
        {signs.map((word, i) => (
          <div key={i} style={{ background: '#fff', border: '1.5px solid #6C63FF', borderRadius: '10px', padding: '0.5rem 1.2rem', color: '#6C63FF', fontWeight: '600', fontSize: '1rem' }}>
            {word}
          </div>
        ))}
      </div>

      <a href="/" style={{ marginTop: '2rem', color: '#6C63FF', textDecoration: 'none', fontWeight: '500' }}>← Convert another video</a>
    </div>
  )
}

export default SignPlayerPage