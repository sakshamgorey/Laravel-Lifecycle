import React, { useEffect, useState } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);

  const sequence = [
    "INITIALIZING KERNEL...",
    "LOADING COMPOSER DEPENDENCIES...",
    "BOOTSTRAPPING APPLICATION...",
    "REGISTERING SERVICE PROVIDERS...",
    "MOUNTING ROUTER...",
    "ESTABLISHING UPLINK...",
    "SYSTEM READY."
  ];

  useEffect(() => {
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex >= sequence.length) {
        clearInterval(interval);
        setTimeout(onComplete, 800);
        return;
      }
      
      setLines(prev => [...prev, sequence[currentIndex]]);
      currentIndex++;
    }, 400);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-cyber-black flex flex-col items-start justify-center p-8 font-mono text-cyber-red text-sm md:text-base">
      <div className="max-w-md w-full">
        {lines.map((line, i) => (
          <div key={i} className="mb-2 flex items-center">
            <span className="mr-2 text-cyber-dimRed">{`>`}</span>
            <span className="animate-[pulse_0.2s_ease-in-out]">{line}</span>
          </div>
        ))}
        <div className="animate-blink w-2 h-4 bg-cyber-red mt-2 inline-block"></div>
      </div>
      
      {/* Decorative Loading Bar */}
      <div className="absolute bottom-10 left-0 w-full px-8">
        <div className="w-full h-1 bg-cyber-dimRed overflow-hidden">
          <div className="h-full bg-cyber-red animate-[scanline_2s_linear_infinite] w-1/3"></div>
        </div>
        <p className="text-xs text-cyber-dimRed mt-2 text-right">v11.x KERNEL LOADER</p>
      </div>
    </div>
  );
};

export default BootSequence;