import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="relative w-[22em] h-40 p-1 bg-[#1a1a1a] border border-[#333] rounded shadow-md text-green-500 font-mono text-base overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-6 bg-[#333] rounded-t px-2 flex items-center justify-between">
          <span className="text-gray-200">Status</span>
          <div className="flex space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-600" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-600" />
          </div>
        </div>
        <div className="mt-6 ml-2 whitespace-nowrap overflow-hidden border-r-2 border-green-500 animate-typewriter typing-text">
          Welcome to Hack{`{0}`}Lution
        </div>
      </div>
    </div>
  );
};

export default Loader;
