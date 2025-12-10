import { Routes, Route, Link } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Editor from './pages/Editor';
import Agents from './pages/Agents';
import Flowise from './pages/Flowise';
import Simulation from './pages/Simulation';

const Nav = () => (
  <nav className="flex gap-4 p-4 border-b border-neon-cyan panel">
    <Link to="/" className="button-neon">Onboarding</Link>
    <Link to="/editor" className="button-neon">IDE</Link>
    <Link to="/agents" className="button-neon">Agents</Link>
    <Link to="/flowise" className="button-neon">Flowise</Link>
    <Link to="/simulation" className="button-neon">Simulation</Link>
  </nav>
);

export default function App() {
  return (
    <div className="min-h-screen text-white">
      <Nav />
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/flowise" element={<Flowise />} />
        <Route path="/simulation" element={<Simulation />} />
      </Routes>
    </div>
  );
}
