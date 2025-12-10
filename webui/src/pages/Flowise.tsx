import { useEffect } from 'react'

const Flowise = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js'
    script.onload = () => {
      // @ts-expect-error external
      window.Chatbot && window.Chatbot.initFull({
        chatflowid: 'default',
        apiHost: 'http://localhost:8743',
        chatflowConfig: { 
          theme: {
            primaryColor: '#00ffe5'
          }
        }
      })
    }
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="cyber-card p-4 glow-border">
      <h2 className="text-2xl mb-2">Flowise Chat</h2>
      <p className="opacity-80">Embedded Flowise chat widget without branding.</p>
    </div>
  )
}

export default Flowise
