import { useState } from 'react'

const steps = [
  'Install local LLM runtimes (LMStudio / Ollama / LlamaEdge)',
  'Start backend server',
  'Launch Flowise stack',
  'Configure SIMStudio endpoint',
  'Run onboarding diagnostics'
]

const Onboarding = () => {
  const [completed, setCompleted] = useState<string[]>([])

  const toggleStep = (step: string) => {
    setCompleted((prev) => prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step])
  }

  return (
    <section className="grid gap-4 md:grid-cols-2">
      <div className="cyber-card p-4 glow-border">
        <h2 className="text-2xl mb-2">Replit-style Onboarding</h2>
        <p className="opacity-80">Mark every checklist item to unlock self-forge mode.</p>
        <ul className="mt-4 space-y-2">
          {steps.map((step) => (
            <li key={step} className="flex items-center gap-2">
              <input type="checkbox" checked={completed.includes(step)} onChange={() => toggleStep(step)} />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="cyber-card p-4 glow-border">
        <h2 className="text-2xl mb-2">Status</h2>
        <p className="mb-2">{completed.length === steps.length ? 'All systems primed.' : 'Complete the checklist.'}</p>
        <progress max={steps.length} value={completed.length} className="w-full" />
      </div>
    </section>
  )
}

export default Onboarding
