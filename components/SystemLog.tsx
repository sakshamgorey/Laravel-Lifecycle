import React from 'react';
import { Terminal, Wifi } from 'lucide-react';

interface SystemLogProps {
  message: string;
}

const SystemLog: React.FC<SystemLogProps> = ({ message }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-cyber-black/95 border-t border-cyber-dimRed backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-2 md:py-3 gap-2 md:gap-0">
        
        {/* Left: System Message */}
        <div className="flex items-center gap-4 w-full md:w-auto overflow-hidden">
          <div className="hidden md:flex items-center justify-center w-8 h-8 bg-cyber-dimRed/20 border border-cyber-dimRed">
             <Terminal className="w-4 h-4 text-cyber-red" />
          </div>
          <div className="font-mono text-xs flex-1">
            <span className="text-cyber-dimRed mr-2 text-[10px] font-bold">LOG_OUTPUT:</span>
            <span className="text-cyber-bright typing-effect whitespace-nowrap">{message}</span>
          </div>
        </div>

        {/* Right: Status Indicators */}
        <div className="flex items-center gap-4 text-[10px] font-mono text-gray-500 uppercase">
          <div className="hidden md:flex items-center gap-2">
            <span>NET_STATUS</span>
            <Wifi className="w-3 h-3 text-cyber-red animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <span>UPTIME</span>
            <span className="text-cyber-red">99.9%</span>
          </div>
          <div className="text-gray-700 hidden md:block">
            BUILD_ID: 2077.11.X
          </div>
        </div>
      </div>
      
      {/* Decorative Progress Line */}
      <div className="absolute top-0 left-0 h-[1px] bg-cyber-red w-full animate-[scanline_3s_linear_infinite] opacity-50"></div>
    </div>
  );
};

export default SystemLog;