export default function EditorTabs({ files, activeFile, onTabClick }) {
  const fileList = Object.keys(files);

  return (
    <div className="h-11 border-b border-[#1F1F1F] bg-[#111111] flex items-center px-2 overflow-x-auto">
      {fileList.map((filename) => (
        <div
          key={filename}
          onClick={() => onTabClick(filename)}
          className={`px-5 py-2 text-sm cursor-pointer border-b-2 flex-shrink-0 transition-colors ${
            activeFile === filename 
              ? 'border-violet-500 text-white' 
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          {filename}
        </div>
      ))}
    </div>
  );
}