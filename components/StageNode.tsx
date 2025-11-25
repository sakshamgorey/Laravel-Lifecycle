import React, { useState } from 'react';
import { Stage } from '../types';
import { ExternalLink } from 'lucide-react';

interface StageNodeProps {
  stage: Stage;
  index: number;
  isLast: boolean;
  arrowDirection: 'right' | 'left' | 'down';
  onHover: (message: string) => void;
  onLeave: () => void;
}

const StageNode: React.FC<StageNodeProps> = ({ 
  stage, 
  index, 
  isLast, 
  arrowDirection,
  onHover, 
  onLeave 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(`[DETECTED] NODE_${String(stage.id).padStart(2, '0')} :: ${stage.title.toUpperCase()}`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onLeave();
  };

  const drawDelay = { animationDelay: `${0.8 + (index * 0.15)}s` };

  return (
    <div className="relative group flex flex-col items-center xl:flex-row xl:w-full xl:justify-center h-auto w-full">
      
      {/* MOBILE CONNECTOR (Always Down Arrow) */}
      {/* Positioned to bridge the gap-y-28. Ensure z-0 is behind card but visible against black bg */}
      {!isLast && (
        <div className="xl:hidden absolute -bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center z-0 opacity-100 h-28 w-8 overflow-visible pointer-events-none">
           <svg className="w-full h-full overflow-visible">
              <defs>
                 <marker id={`arrow-down-mobile-${index}`} markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L3,3 L6,0" fill="none" stroke="#ff1f55" strokeWidth="1" />
                 </marker>
              </defs>
              <line 
                x1="16" y1="0" x2="16" y2="108" 
                stroke="#ff1f55" strokeWidth="1" strokeDasharray="4 2"
                className="animate-flow"
              />
              <path d="M 16 108 L 13 105 M 16 108 L 19 105" stroke="#ff1f55" strokeWidth="1" fill="none" />
           </svg>
        </div>
      )}

      {/* TECH CARD CONTAINER */}
      {/* Fixed height ensures consistency, max-w logic ensures responsiveness */}
      <div 
        className={`
          relative z-20 w-full max-w-sm xl:max-w-none h-32 min-h-[8rem]
          transition-all duration-300 cursor-pointer
          transform hover:-translate-y-1
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsHovered(!isHovered)}
      >
        {/* Border / Glow Layer (Outer Div) */}
        {/* Increased opacity (bg-cyber-red/40) to be visible against black background */}
        <div className={`
          absolute inset-0 clip-tech-card
          ${isHovered ? 'bg-cyber-red animate-pulse shadow-[0_0_20px_rgba(255,31,85,0.6)]' : 'bg-cyber-dimRed/40'}
          transition-all duration-300
        `}></div>

        {/* Inner Card (Dark Grey instead of Black for contrast) */}
        {/* Increased inset to 2px for thicker border */}
        <div className="absolute inset-[2px] bg-[#171717] clip-tech-card-border flex flex-col">
          
          {/* Header Bar */}
          <div className={`
             h-6 px-3 flex justify-between items-center border-b border-cyber-dimRed/50
             ${isHovered ? 'bg-cyber-red/20' : 'bg-cyber-gray'}
             transition-colors
          `}>
             <span className="text-[10px] font-mono text-cyber-red font-bold tracking-widest">
               L-{String(stage.id).padStart(2, '0')}
             </span>
             <div className="flex gap-1">
               <div className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-cyber-red' : 'bg-cyber-dimRed'}`}></div>
               <div className="w-1.5 h-1.5 rounded-full bg-cyber-dimRed/50"></div>
             </div>
          </div>

          {/* Main Body */}
          <div className="flex-1 p-4 flex flex-col justify-center relative overflow-hidden">
             {/* Background Grid inside card */}
             <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]"></div>

             <h3 className={`
               relative z-10 font-mono font-bold text-sm leading-tight
               ${isHovered ? 'text-white' : 'text-white'} 
               transition-colors
             `}>
               {stage.title}
             </h3>

             {/* Decorative small text */}
             <div className="mt-2 text-[9px] text-gray-400 font-mono flex items-center gap-2">
                <span>MEM: {(Math.random() * 10).toFixed(2)}MB</span>
             </div>
          </div>

          {/* Bottom Angled Corner Deco */}
          <div className="absolute bottom-0 right-0 w-6 h-6 border-l border-t border-cyber-dimRed/50 bg-transparent"></div>
        </div>
      </div>

      {/* DESKTOP FLOW CONNECTORS (Visible only on XL+) */}
      {!isLast && (
        <div className="hidden xl:block absolute inset-0 pointer-events-none z-10 overflow-visible">
          
          {/* FILTER DEFS */}
          <svg className="w-0 h-0 absolute">
            <defs>
               <marker id={`arrowhead-${index}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#ff1f55" />
               </marker>
               <filter id={`glow-${index}`}>
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                  <feMerge>
                     <feMergeNode in="coloredBlur"/>
                     <feMergeNode in="SourceGraphic"/>
                  </feMerge>
               </filter>
            </defs>
          </svg>

          {/* RIGHT ARROW (Standard) */}
          {/* Positioned to bridge gap-x-20 (5rem/80px). Arrow width is 80px. */}
          {arrowDirection === 'right' && (
            <div className="absolute top-1/2 -translate-y-1/2 -right-20 w-20 h-8 flex items-center overflow-visible">
               <svg width="80" height="20" className="overflow-visible w-full">
                 <path d="M 0 10 L 80 10" stroke="#800020" strokeWidth="1" fill="none" opacity="0.6" />
                 <path 
                    d="M 0 10 L 76 10" 
                    stroke="#ff1f55" 
                    strokeWidth="1.5" 
                    fill="none" 
                    markerEnd={`url(#arrowhead-${index})`}
                    filter={`url(#glow-${index})`}
                    className="animate-draw opacity-0"
                    style={{...drawDelay, strokeDasharray: '80'}}
                 />
                 <line x1="0" y1="10" x2="80" y2="10" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1" strokeDasharray="4 8" className="animate-flow" />
               </svg>
            </div>
          )}

          {/* LEFT ARROW (Reverse Flow) */}
          {arrowDirection === 'left' && (
            <div className="absolute top-1/2 -translate-y-1/2 -left-20 w-20 h-8 flex items-center overflow-visible">
               <svg width="80" height="20" className="overflow-visible w-full rotate-180">
                 <path d="M 0 10 L 80 10" stroke="#800020" strokeWidth="1" fill="none" opacity="0.6" />
                 <path 
                    d="M 0 10 L 76 10" 
                    stroke="#ff1f55" 
                    strokeWidth="1.5" 
                    fill="none" 
                    markerEnd={`url(#arrowhead-${index})`}
                    filter={`url(#glow-${index})`}
                    className="animate-draw opacity-0"
                    style={{...drawDelay, strokeDasharray: '80'}}
                 />
                 <line x1="0" y1="10" x2="80" y2="10" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1" strokeDasharray="4 8" className="animate-flow" />
               </svg>
            </div>
          )}

          {/* DOWN ARROW (Vertical Connectors for Snake) */}
          {/* Positioned to bridge gap-y-28 (7rem/112px). Arrow height is 112px. */}
          {arrowDirection === 'down' && (
             <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center w-8 h-28 overflow-visible">
                <svg width="40" height="112" className="overflow-visible">
                  {/* Decorative faint path */}
                  <path d="M 20 0 L 20 112" stroke="#800020" strokeWidth="1" fill="none" opacity="0.6" />
                  
                  {/* Animated Path */}
                  <path 
                    d="M 20 0 L 20 108" 
                    stroke="#ff1f55" 
                    strokeWidth="1.5" 
                    fill="none" 
                    markerEnd={`url(#arrowhead-${index})`}
                    filter={`url(#glow-${index})`}
                    className="animate-draw opacity-0"
                    style={{...drawDelay, strokeDasharray: '112'}}
                  />
                  {/* Flowing dashes */}
                   <line 
                     x1="20" y1="0" x2="20" y2="112" 
                     stroke="rgba(255, 255, 255, 0.7)" 
                     strokeWidth="1" 
                     strokeDasharray="4 8" 
                     className="animate-flow" 
                    />
                </svg>
             </div>
          )}
        </div>
      )}

      {/* HOVER DETAILS / TOOLTIP */}
      <div 
        className={`
          absolute z-50 w-64 bg-cyber-black border border-cyber-red p-0
          transition-all duration-200 pointer-events-none md:pointer-events-auto
          ${isHovered ? 'opacity-100 translate-y-2 visible' : 'opacity-0 -translate-y-2 invisible'}
          top-full left-1/2 -translate-x-1/2 mt-2 shadow-[0_0_30px_rgba(255,31,85,0.4)]
        `}
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={handleMouseLeave}
      >
        <div className="bg-cyber-red text-black text-[10px] font-bold px-2 py-1 flex justify-between">
          <span>INFO_PACKET</span>
          <span>SECURE</span>
        </div>
        <div className="p-3">
          <p className="text-xs text-gray-200 font-mono mb-3 leading-relaxed">
            {stage.description}
          </p>
          
          <div className="flex gap-2 pt-2 border-t border-cyber-dimRed/50 pointer-events-auto">
            <a 
              href={stage.docLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-cyber-gray border border-cyber-dimRed hover:border-cyber-red text-[10px] text-cyber-red transition-all hover:bg-cyber-dimRed/20"
            >
              DOCS <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StageNode;