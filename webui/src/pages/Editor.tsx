import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

export default function Ide() {
  const [code, setCode] = useState('// Willkommen in bkg.forge');
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!code) return;
      const { data } = await axios.post('/api/llm/chat', {
        messages: [
          { role: 'system', content: 'Du bist ein Pair-Programmer.' },
          { role: 'user', content: code.slice(0, 500) }
        ]
      });
      setSuggestion(data.reply);
    }, 800);
    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-slate/70 p-3 rounded-lg">
        <Editor height="70vh" language="typescript" theme="vs-dark" value={code} onChange={(v) => setCode(v ?? '')} />
      </div>
      <div className="bg-slate/70 p-3 rounded-lg">
        <h2 className="text-xl text-neon mb-2">Live AI Vorschläge</h2>
        <pre className="whitespace-pre-wrap text-sm text-gray-200">{suggestion}</pre>
      </div>
    </div>
  );
}
