import { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import axios from 'axios'

const FileTree = ({ files, onSelect }: { files: string[], onSelect: (file: string) => void }) => (
  <div className="cyber-card p-3 glow-border h-full">
    <h3 className="text-xl mb-2">Files</h3>
    <ul className="space-y-1">
      {files.map((file) => (
        <li key={file}>
          <button className="underline" onClick={() => onSelect(file)}>{file}</button>
        </li>
      ))}
    </ul>
  </div>
)

const EditorPage = () => {
  const [files] = useState(['backend/src/server.ts', 'backend/src/services/RAGService.ts'])
  const [content, setContent] = useState('// select a file')
  const [path, setPath] = useState('')

  useEffect(() => {
    if (path) {
      axios.get(`/api/rag/query?path=${encodeURIComponent(path)}`).catch(() => {})
    }
  }, [path])

  const save = async () => {
    await axios.post('/api/agents/code', { path, instruction: content })
  }

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <FileTree files={files} onSelect={setPath} />
      <div className="md:col-span-3 cyber-card p-3 glow-border">
        <div className="flex justify-between mb-2">
          <span>{path || 'Pick a file'}</span>
          <button onClick={save} className="neon-button">Save via Agent</button>
        </div>
        <Editor
          height="60vh"
          defaultLanguage="typescript"
          value={content}
          onChange={(value) => setContent(value ?? '')}
          theme="vs-dark"
        />
      </div>
    </div>
  )
}

export default EditorPage
