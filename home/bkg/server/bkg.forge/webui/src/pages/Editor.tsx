import { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

const files = [
  { path: 'backend/src/server.ts', language: 'typescript' },
  { path: 'docs/architecture.md', language: 'markdown' },
  { path: 'webui/src/App.tsx', language: 'typescript' }
];

export default function CyberEditor() {
  const [file, setFile] = useState(files[0]);
  const [content, setContent] = useState('// select file');

  const loadFile = async (path: string) => {
    const response = await axios.get(`/api/rag/query`, {
      params: { projectId: 'local', query: `Load file ${path}` }
    });
    setContent(response.data.answer ?? '// response placeholder');
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-6">
      <div className="panel p-3 space-y-3">
        <h2 className="text-xl glow">File Tree</h2>
        {files.map((f) => (
          <button
            key={f.path}
            onClick={() => {
              setFile(f);
              loadFile(f.path).catch(() => setContent('// offline preview'));
            }}
            className="block w-full text-left button-neon"
          >
            {f.path}
          </button>
        ))}
      </div>
      <div className="col-span-3 panel">
        <Editor height="70vh" defaultLanguage={file.language} value={content} onChange={(v) => setContent(v ?? '')} />
      </div>
    </div>
  );
}
