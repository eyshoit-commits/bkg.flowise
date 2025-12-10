import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Editor from './pages/Editor';
import Agents from './pages/Agents';
import Flowise from './pages/Flowise';
import Simulation from './pages/Simulation';

const Nav = () => (
  <nav className="flex gap-4 p-4 bg-slate/80 text-neon">
    <Link to="/" className="hover:text-magenta">Onboarding</Link>
    <Link to="/editor" className="hover:text-magenta">IDE</Link>
    <Link to="/agents" className="hover:text-magenta">Agents</Link>
    <Link to="/flowise" className="hover:text-magenta">Flowise</Link>
    <Link to="/sim" className="hover:text-magenta">Simulation</Link>
  </nav>
);

export default function App() {
  return (
    <BrowserRouter>
      <div className="scanlines min-h-screen">
        <Nav />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/flowise" element={<Flowise />} />
            <Route path="/sim" element={<Simulation />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
