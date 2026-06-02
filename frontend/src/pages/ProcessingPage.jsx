import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function ProcessingPage() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  const steps = [
    "Extracting audio from video...",
    "Transcribing speech to text...",
    "Mapping words to signs...",
    "Preparing sign player...",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval)
          setTimeout(() => navigate("/player"), 1000)
          return prev
        }
        return prev + 1
      })
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ minHeight: "100vh", background: "#f5f4ff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <h2 style={{ color: "#6C63FF", marginBottom: "2rem" }}>Processing your video...</h2>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0.75rem 1rem", marginBottom: "0.75rem", borderRadius: "10px", background: "#fff", border: i <= step ? "1.5px solid #6C63FF" : "1.5px solid #eee", opacity: i <= step ? 1 : 0.4 }}>
            <span style={{ fontSize: "1.2rem" }}>{i < step ? "✅" : i === step ? "⏳" : "⬜"}</span>
            <span style={{ color: i <= step ? "#333" : "#aaa", fontSize: "0.95rem" }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProcessingPage