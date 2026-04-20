import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Rocket } from 'lucide-react';
import { testBackend } from './utils/api.js';

import FileTree from './components/FileTree';
import EditorTabs from './components/EditorTabs';
import MonacoEditor from './components/MonacoEditor';

const initialFiles = {
  'index.js': {
    content: '// Welcome to IntentIDE\nconsole.log("Hello from IntentIDE!");',
    language: 'javascript'
  },
  'App.jsx': {
    content: 'export default function App() {\n  return <h1>Hello from IntentIDE</h1>;\n}',
    language: 'javascript'
  },
  'utils.js': {
    content: 'export const add = (a, b) => a + b;\n\nexport const multiply = (a, b) => a * b;',
    language: 'javascript'
  }
};

export default function App() {
  const [files, setFiles] = useState(initialFiles);
  const [activeFile, setActiveFile] = useState('index.js');
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  const handleFileClick = (filename) => setActiveFile(filename);
  const handleTabClick = (filename) => setActiveFile(filename);

  const handleEditorChange = (value) => {
    if (value !== undefined) {
      setFiles(prev => ({
        ...prev,
        [activeFile]: {
          ...prev[activeFile],
          content: value
        }
      }));
    }
  };

  // ================== RUN BUTTON ==================
  const handleRun = () => {
    const currentCode = files[activeFile]?.content || '';
    setConsoleOutput([]);
    
    try {
      const oldLog = console.log;
      const logs = [];

      console.log = (...args) => {
        logs.push(args.join(' '));
        oldLog(...args);
      };

      // eslint-disable-next-line no-eval
      eval(currentCode);

      setConsoleOutput(logs.length > 0 ? logs : ['Code executed successfully (no console output)']);
      setIsConsoleOpen(true);
    } catch (error) {
      setConsoleOutput([`Error: ${error.message}`]);
      setIsConsoleOpen(true);
    } finally {
      console.log = oldLog;
    }
  };

  // ================== INTENT MODE (Backend Test) ==================
  const handleIntentMode = async () => {
    alert("🔄 Testing connection with Backend...");

    try {
      const result = await testBackend();
      console.log("✅ Backend Response:", result);
      alert(`✅ Backend says: ${result.message}`);
    } catch (error) {
      console.error("❌ Backend connection failed:", error);
      alert("❌ Backend is not running!\n\nMake sure you started the backend with:\ncd backend && node index.js");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#0A0A0A] text-white overflow-hidden">
      {/* Top Bar */}
      <div className="h-12 border-b border-[#1F1F1F] bg-[#111111] flex items-center px-4 justify-between">
        <div className="font-bold text-xl tracking-tight">IntentIDE</div>

        <div className="flex items-center gap-3">
          <Button 
            onClick={handleRun}
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Run
          </Button>
          
          <Button 
            onClick={handleIntentMode}
            size="sm" 
            className="bg-violet-600 hover:bg-violet-500 flex items-center gap-2"
          >
            <Rocket className="w-4 h-4" />
            Intent Mode
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-72 border-r border-[#1F1F1F] bg-[#111111] flex flex-col">
          <FileTree 
            files={files} 
            activeFile={activeFile} 
            onFileClick={handleFileClick} 
          />

          <div className="mt-auto p-4 border-t border-[#1F1F1F]">
            <Button 
              onClick={handleIntentMode}
              className="w-full bg-violet-600 hover:bg-violet-500 h-11 text-base"
            >
              🚀 Intent Mode
            </Button>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <EditorTabs 
            files={files} 
            activeFile={activeFile} 
            onTabClick={handleTabClick} 
          />
          <MonacoEditor 
            activeFile={activeFile} 
            files={files} 
            onChange={handleEditorChange} 
          />

          {/* Console Output */}
          {isConsoleOpen && (
            <div className="h-64 border-t border-[#1F1F1F] bg-[#0A0A0A] p-4 font-mono text-sm overflow-auto">
              <div className="flex justify-between mb-2 text-gray-400 text-xs">
                <span>CONSOLE OUTPUT</span>
                <button 
                  onClick={() => setIsConsoleOpen(false)} 
                  className="hover:text-white"
                >
                  ✕ Close
                </button>
              </div>
              {consoleOutput.map((line, i) => (
                <div key={i} className="text-emerald-400 mb-1">{line}</div>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l border-[#1F1F1F] bg-[#111111] p-4 overflow-auto">
          <div className="bg-[#1F1F1F] border border-[#333] rounded-lg p-5">
            <h3 className="font-medium mb-3">Right Panel</h3>
            <p className="text-sm text-gray-400">
              This will later show Decision Memory, explanations, and AI results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}