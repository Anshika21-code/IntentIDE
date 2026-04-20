import { File } from 'lucide-react';

export default function FileTree({ files, activeFile, onFileClick }) {
  const fileList = Object.keys(files);

  return (
    <div className="p-4 border-b border-[#1F1F1F]">
      <div className="text-xs uppercase tracking-widest text-gray-400 mb-3">FILES</div>
      
      {fileList.map((filename) => (
        <button
          key={filename}
          onClick={() => onFileClick(filename)}
          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#1F1F1F] rounded-md transition-colors ${
            activeFile === filename ? 'bg-[#1F1F1F] text-white' : 'text-gray-300'
          }`}
        >
          <File className="w-4 h-4 text-gray-400" />
          <span className="text-sm">{filename}</span>
        </button>
      ))}
    </div>
  );
}