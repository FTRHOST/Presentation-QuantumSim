import React from 'react';
import { motion } from 'framer-motion';

export const AtomAnimation: React.FC = () => {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Nucleus */}
      <motion.div 
        className="absolute w-8 h-8 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.8)]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Electrons */}
      {[0, 60, 120].map((rotation, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-full border border-fuchsia-500/30 rounded-full"
          style={{ rotate: rotation }}
          animate={{ rotate: rotation + 360 }}
          transition={{ duration: 8 + i, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-3 h-3 bg-fuchsia-400 rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(232,121,249,0.8)]" />
        </motion.div>
      ))}
    </div>
  );
};

export const BlochSphere2D: React.FC<{ label?: string, vectorRotation?: number, color?: string }> = ({ 
  label = "Superposition", 
  vectorRotation = 45,
  color = "#22d3ee"
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48 border-2 border-slate-600 rounded-full flex items-center justify-center bg-slate-900/50">
        {/* Axes */}
        <div className="absolute w-full h-[1px] bg-slate-700" />
        <div className="absolute h-full w-[1px] bg-slate-700" />
        
        {/* Vector */}
        <motion.div 
          className="absolute w-1/2 h-[2px] origin-left left-1/2"
          style={{ backgroundColor: color }}
          initial={{ rotate: 0 }}
          animate={{ rotate: -vectorRotation }} // Negative for typical coordinate system visual
          transition={{ type: "spring", stiffness: 60 }}
        >
           <div className="absolute right-0 -top-1 w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
        </motion.div>

        {/* Labels */}
        <span className="absolute top-2 text-xs font-mono text-cyan-400">|0⟩</span>
        <span className="absolute bottom-2 text-xs font-mono text-fuchsia-400">|1⟩</span>
      </div>
      <p className="mt-4 text-sm font-mono text-slate-400">{label}</p>
    </div>
  );
};

export const CircuitDiagram: React.FC = () => {
  return (
    <div className="flex items-center gap-2 p-4 border border-slate-700 rounded-lg bg-slate-800/50 font-mono text-sm overflow-x-auto">
      <div className="text-slate-400 pr-2">|0⟩</div>
      <div className="w-8 h-[1px] bg-slate-500"></div>
      <div className="w-10 h-10 border border-cyan-500 text-cyan-400 flex items-center justify-center bg-slate-900">H</div>
      <div className="w-8 h-[1px] bg-slate-500"></div>
      <div className="w-10 h-10 border border-fuchsia-500 text-fuchsia-400 flex items-center justify-center bg-slate-900">Uf</div>
      <div className="w-8 h-[1px] bg-slate-500"></div>
      <div className="w-10 h-10 border border-cyan-500 text-cyan-400 flex items-center justify-center bg-slate-900">H</div>
      <div className="w-8 h-[1px] bg-slate-500"></div>
      <div className="w-10 h-10 bg-slate-700 text-white rounded-full flex items-center justify-center">M</div>
    </div>
  );
};
