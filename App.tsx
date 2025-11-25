import React, { useState } from 'react';
import { Github, Activity } from 'lucide-react';
import { LARAVEL_STAGES } from './constants';
import StageNode from './components/StageNode';
import ParticleBackground from './components/ParticleBackground';
import BootSequence from './components/BootSequence';
import SystemLog from './components/SystemLog';

const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [systemMessage, setSystemMessage] = useState<string>("SYSTEM STATUS: ONLINE. WAITING FOR INTERACTION.");

  const handleNodeHover = (msg: string) => {
    setSystemMessage(msg);
  };

  const handleNodeLeave = () => {
    setSystemMessage("SYSTEM STATUS: SCANNING...");
  };

  // Helper to determine snake layout properties
  const getLayoutProps = (index: number, total: number) => {
    const row = Math.floor(index / 4);
    const isEvenRow = row % 2 === 0; // Row 0, 2 -> Left to Right
    const positionInRow = index % 4;
    const isLastItem = index === total - 1;
    const isEndOfRow = positionInRow === 3;

    // 1. Grid Column Calculation (Tailwind col-start-*)
    // Even rows: 1, 2, 3, 4
    // Odd rows: 4, 3, 2, 1 (Visually reversed)
    let colClass = '';
    if (isEvenRow) {
      if (positionInRow === 0) colClass = 'xl:col-start-1';
      if (positionInRow === 1) colClass = 'xl:col-start-2';
      if (positionInRow === 2) colClass = 'xl:col-start-3';
      if (positionInRow === 3) colClass = 'xl:col-start-4';
    } else {
      if (positionInRow === 0) colClass = 'xl:col-start-4';
      if (positionInRow === 1) colClass = 'xl:col-start-3';
      if (positionInRow === 2) colClass = 'xl:col-start-2';
      if (positionInRow === 3) colClass = 'xl:col-start-1';
    }

    // 2. Explicit Row Calculation (Tailwind row-start-*)
    // Essential to prevent grid auto-placement from collapsing or misplacing items
    let rowClass = '';
    if (row === 0) rowClass = 'xl:row-start-1';
    if (row === 1) rowClass = 'xl:row-start-2';
    if (row === 2) rowClass = 'xl:row-start-3';

    // 3. Arrow Direction Calculation
    let arrowDirection: 'right' | 'left' | 'down' = 'right';

    if (isLastItem) {
      arrowDirection = 'down'; // Hidden by isLast check in component
    } else if (isEndOfRow) {
      // End of any row connects to the one below it
      arrowDirection = 'down'; 
    } else {
      // Middle of row
      arrowDirection = isEvenRow ? 'right' : 'left';
    }

    return { colClass, rowClass, arrowDirection };
  };

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  return (
    <div className="min-h-screen relative font-mono text-gray-200 bg-cyber-black selection:bg-cyber-red selection:text-white flex flex-col overflow-x-hidden">
      
      {/* Background Layers - Moved to Z-0 and Z-10 so they are BEHIND content */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.08] pointer-events-none z-0"></div>
      <ParticleBackground />
      <div className="fixed inset-0 crt-overlay z-10 pointer-events-none"></div>
      <div className="fixed inset-0 vignette z-10 pointer-events-none opacity-50"></div>

      {/* Header - Z-30 to stay above everything */}
      <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-start z-30 bg-gradient-to-b from-cyber-black/95 to-transparent backdrop-blur-[2px]">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic drop-shadow-[0_0_15px_rgba(255,31,85,0.5)]">
            LARAVEL <span className="text-cyber-red">LIFECYCLE</span>
          </h1>
          <div className="flex items-center gap-3 mt-1 text-xs font-bold text-cyber-bright">
            <span className="bg-cyber-red/20 border border-cyber-red px-1 text-[10px] rounded-sm">v11.x</span>
            <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> LIVE TRACE</span>
          </div>
        </div>
        <a 
          href="https://github.com/laravel/laravel" 
          target="_blank" 
          rel="noreferrer"
          className="group relative p-2"
          aria-label="GitHub"
          onMouseEnter={() => setSystemMessage("OUTBOUND LINK DETECTED: GITHUB_REPO")}
          onMouseLeave={handleNodeLeave}
        >
          <div className="absolute inset-0 bg-cyber-red/20 scale-0 group-hover:scale-100 transition-transform duration-200 clip-tech-card"></div>
          <Github className="w-8 h-8 text-gray-400 group-hover:text-cyber-red relative z-10 transition-colors" />
        </a>
      </header>

      {/* Main Grid Content - Z-20 to sit ON TOP of overlays */}
      <main className="flex-1 w-full max-w-[1500px] mx-auto px-6 pt-32 pb-48 flex flex-col items-center relative z-20">
        
        {/* Decorative elements */}
        <div className="absolute top-40 left-10 hidden xl:block opacity-40 text-[10px] border-l border-cyber-red pl-2 space-y-1 text-gray-400">
          <p>KERNEL_HASH: 0x93F2A</p>
          <p>MEM_ALLOC: DYNAMIC</p>
        </div>

        {/* 
          Grid Layout:
          - Mobile/Tablet: 1 col, standard flow
          - Desktop (XL+): 4 cols, manually positioned for Snake Flow
          - Gap-y-28 (7rem/112px) provides ample space for arrows on all devices
        */}
        <div className="w-full grid grid-cols-1 xl:grid-cols-4 gap-y-28 xl:gap-y-28 gap-x-0 xl:gap-x-20 relative min-h-0">
          {LARAVEL_STAGES.map((stage, index) => {
            const { colClass, rowClass, arrowDirection } = getLayoutProps(index, LARAVEL_STAGES.length);
            
            return (
              <div key={stage.id} className={`${colClass} ${rowClass} relative flex justify-center w-full`}>
                <StageNode 
                  stage={stage} 
                  index={index}
                  isLast={index === LARAVEL_STAGES.length - 1}
                  arrowDirection={arrowDirection}
                  onHover={handleNodeHover}
                  onLeave={handleNodeLeave}
                />
              </div>
            );
          })}
        </div>

      </main>

      {/* Footer / System Log Area */}
      <SystemLog message={systemMessage} />

    </div>
  );
};

export default App;