import { Routes, Route, Link } from 'react-router-dom'
import Onboarding from './pages/Onboarding'
import Editor from './pages/Editor'
import Agents from './pages/Agents'
import Flowise from './pages/Flowise'
import Simulation from './pages/Simulation'

const App = () => {
  return (
    <div className="min-h-screen p-6 text-neon-cyan scanlines">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">bkg.forge</h1>
        <nav className="flex gap-4">
          <Link to="/" className="neon-button">Onboarding</Link>
          <Link to="/editor" className="neon-button">IDE</Link>
          <Link to="/agents" className="neon-button">Agents</Link>
          <Link to="/flowise" className="neon-button">Flowise</Link>
          <Link to="/simulation" className="neon-button">SIM</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/flowise" element={<Flowise />} />
        <Route path="/simulation" element={<Simulation />} />
      </Routes>
    </div>
  )
}

export default App
