import React from 'react';

export default function Home() {
  const svgStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-8 mt-20 relative overflow-hidden">
      <div className="bg-gradient-to-br from-[#04619F] to-[#000000] rounded-full w-96 h-96 flex flex-col items-center justify-center mb-8 border-4 border-green-600" >
        <h1 className="text-4xl font-bold text-white text-center mb-2 max-w-md mx-auto p-4 pb-2 flex items-center justify-center">
          Welcome to the Freshwater Health Assessment App
        </h1>
        <p className="text-sm opacity-75 text-white text-center max-w-md mx-auto p-4 pt-2">
          Designed to automate water sample analysis, simplify data interpretation, and empower communities to interpret their collected data.
        </p>
      </div>
      <a
        href="/file-upload"
        className="bg-gradient-to-br from-[#04619F] to-[#033c5a] text-white py-3 px-6 rounded-md transition-colors mt-4 hover:from-[#033c5a] hover:to-[#02253b] relative z-10"
      >
        Analyze Your Data
      </a>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={svgStyle}>
        <path fill="#04619F" fillOpacity="1" d="M0,224L48,224C96,224,192,224,288,208C384,192,480,160,576,160C672,160,768,192,864,197.3C960,203,1056,181,1152,160C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>
  );
}
