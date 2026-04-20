import Editor from '@monaco-editor/react';

export default function MonacoEditor({ 
  activeFile, 
  files, 
  onChange 
}) {
  const currentFile = files[activeFile];

  return (
    <div className="flex-1 overflow-hidden">
      <Editor
        height="100%"
        language={currentFile?.language || 'javascript'}
        value={currentFile?.content || ''}
        path={activeFile}
        theme="vs-dark"
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 15,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
}