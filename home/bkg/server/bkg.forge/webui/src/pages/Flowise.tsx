import { useEffect } from 'react';

declare global {
  interface Window {
    mountFlowiseChat?: (containerId: string, flowId: string, host: string) => void;
  }
}

export default function FlowisePage() {
  useEffect(() => {
    if (window.mountFlowiseChat) {
      window.mountFlowiseChat('flowise-chat', 'default', 'http://localhost:8610');
    }
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl glow">Flowise Chat Embed</h2>
      <div id="flowise-chat" className="panel" style={{ height: '640px' }} />
    </div>
  );
}
