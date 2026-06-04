import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function HomePage() {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const navigate = useNavigate()

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) setFile(dropped)
  }

  const handleSubmit = async () => {
    if (!file && !youtubeUrl) return alert('Please upload a video or paste a YouTube link')

    try {
      let signs = []
      let transcript = ''

      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        alert('Uploading... please wait 1-2 minutes')
        const res = await axios.post('http://localhost:8000/upload', formData)
        signs = res.data.signs
        transcript = res.data.transcript
      } else {
        const res = await axios.post('http://localhost:8000/youtube', { url: youtubeUrl })
        signs = res.data.signs
        transcript = res.data.transcript
      }
      navigate('/player', { state: { signs, transcript } })
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f4ff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '2.2rem', color: '#6C63FF', marginBottom: '0.5rem' }}>Sign Language Converter</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Upload a video or paste a YouTube link to convert to sign language</p>

      {/* Drag & Drop Upload */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onClick={() => document.getElementById('fileInput').click()}
        style={{
          width: '100%', maxWidth: '500px', border: `2px dashed ${dragging ? '#6C63FF' : '#bbb'}`,
          borderRadius: '16px', padding: '3rem', textAlign: 'center',
          background: dragging ? '#eeedfe' : '#fff', cursor: 'pointer', marginBottom: '1.5rem'
        }}
      >
        <p style={{ fontSize: '2rem', margin: 0 }}>📁</p>
        <p style={{ color: '#555', margin: '0.5rem 0 0' }}>
          {file ? `✅ ${file.name}` : 'Drag & drop a video file here or click to browse'}
        </p>
        <input id="fileInput" type="file" accept="video/*" style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])} />
      </div>

      {/* YouTube Input */}
      <p style={{ color: '#999', marginBottom: '0.75rem' }}>— or paste a YouTube link —</p>
      <input
        type="text"
        placeholder="https://www.youtube.com/watch?v=..."
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        style={{
          width: '100%', maxWidth: '500px', padding: '0.75rem 1rem',
          borderRadius: '10px', border: '1.5px solid #ddd', fontSize: '1rem',
          marginBottom: '1.5rem', outline: 'none'
        }}
      />

      {/* Submit Button */}
      <button onClick={handleSubmit} style={{
        background: '#6C63FF', color: '#fff', border: 'none',
        padding: '0.85rem 2.5rem', borderRadius: '10px', fontSize: '1rem',
        cursor: 'pointer', fontWeight: '600'
      }}>
        Convert to Sign Language →
      </button>
    </div>
  )
}

export default HomePage