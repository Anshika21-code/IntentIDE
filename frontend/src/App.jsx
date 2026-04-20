import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Folder, File, Play } from 'lucide-react'

const initialFiles = {
  'index.js': { content: '// Welcome to IntentIDE\nconsole.log("Hello from IntentIDE!");', language: 'javascript' },
  'App.jsx': { content: 'export default function App() {\n  return <h1>Hello</h1>\n}', language: 'javascript' },
  'utils.js': { content: 'export const sum = (a, b) => a + b;', language: 'javascript' }
}

export default function App() {
  const [files] = useState(initialFiles)
  const [activeFile, setActiveFile] = useState('index.js')

  const fileList = Object.keys(files)

  return (
    <div className="h-screen flex bg-[#0A0A0A] text-white">
      {/* Left Sidebar - File Tree */}
      <div className="w-72 border-r border-[#1F1F1F] bg-[#111111] flex flex-col">
        <div className="p-4 border-b border-[#1F1F1F] flex items-center gap-2">
          <span className="font-bold text-xl tracking-tight">IntentIDE</span>
        </div>
        
        <div className="p-3">
          <div className="text-xs uppercase tracking-widest text-gray-400 mb-2 px-2">Files</div>
          {fileList.map(file => (
            <button
              key={file}
              onClick={() => setActiveFile(file)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-[#1F1F1F] rounded-md ${
                activeFile === file ? 'bg-[#1F1F1F]' : ''
              }`}
            >
              <File className="w-4 h-4" />
              <span className="text-sm">{file}</span>
            </button>
          ))}
        </div>

        {/* Your future AI buttons will go here */}
        <div className="mt-auto p-4 border-t border-[#1F1F1F]">
          <Button className="w-full bg-indigo-600 hover:bg-indigo-500" size="lg">
            🚀 Intent Mode
          </Button>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="h-12 border-b border-[#1F1F1F] bg-[#111111] flex items-center px-4 gap-2">
          <div className="flex-1 flex items-center gap-2">
            {fileList.map(file => (
              <div
                key={file}
                onClick={() => setActiveFile(file)}
                className={`px-4 py-1 text-sm cursor-pointer border-b-2 ${
                  activeFile === file 
                    ? 'border-white text-white' 
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                {file}
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm">
            <Play className="w-4 h-4 mr-2" /> Run
          </Button>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1">
          <Editor
            height="100%"
            language={files[activeFile].language}
            value={files[activeFile].content}
            path={activeFile}                    // ← This enables multi-file memory!
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 15,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
            }}
          />
        </div>
      </div>

      {/* Right Sidebar (placeholder for future features) */}
      <div className="w-80 border-l border-[#1F1F1F] bg-[#111111] p-4">
        <Card className="bg-[#1F1F1F] p-4">
          <h3 className="text-sm font-medium mb-3">Right Panel</h3>
          <p className="text-xs text-gray-400">
            This will later show Decision Memory, explanations, etc.
          </p>
        </Card>
      </div>
    </div>
  )
}