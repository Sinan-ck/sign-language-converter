import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProcessingPage from './pages/ProcessingPage'
import SignPlayerPage from './pages/SignPlayerPage'
import SignChartPage from './pages/SignChartPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/processing" element={<ProcessingPage />} />
        <Route path="/player"     element={<SignPlayerPage />} />
        <Route path="/chart"      element={<SignChartPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App