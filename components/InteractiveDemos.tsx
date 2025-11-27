import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { ChartDataPoint, OracleType, DeutschJozsaState } from '../types';
import { Play, RotateCcw, CheckCircle, HelpCircle } from 'lucide-react';

// --- Superposition Demo ---

export const SuperpositionDemo: React.FC = () => {
  const [data, setData] = useState<ChartDataPoint[]>([
    { name: '|0⟩', value: 100, fill: '#22d3ee' }, // Start at |0⟩
    { name: '|1⟩', value: 0, fill: '#d946ef' },
  ]);
  const [measured, setMeasured] = useState(false);

  const applyHadamard = () => {
    // Ideally 50/50, adding slight randomness for "simulation" feel
    const noise = (Math.random() - 0.5) * 4; // +/- 2%
    setData([
      { name: '|0⟩', value: 50 + noise, fill: '#22d3ee' },
      { name: '|1⟩', value: 50 - noise, fill: '#d946ef' },
    ]);
    setMeasured(false);
  };

  const measureQubit = () => {
    const outcome = Math.random() > 0.5 ? 1 : 0;
    setData([
      { name: '|0⟩', value: outcome === 0 ? 100 : 0, fill: '#22d3ee' },
      { name: '|1⟩', value: outcome === 1 ? 100 : 0, fill: '#d946ef' },
    ]);
    setMeasured(true);
  };

  return (
    <div className="w-full max-w-2xl bg-slate-800/50 p-6 rounded-xl border border-slate-700">
      <div className="h-64 w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#94a3b8" tick={{fontFamily: 'monospace'}} />
            <YAxis stroke="#94a3b8" domain={[0, 100]} tick={{fontFamily: 'monospace'}} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}
              itemStyle={{ fontFamily: 'monospace' }}
            />
            <Bar dataKey="value" animationDuration={800}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-4">
        <button 
          onClick={applyHadamard}
          className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-mono transition-colors flex items-center gap-2"
        >
          <RotateCcw size={16} /> Terapkan Gerbang H
        </button>
        <button 
          onClick={measureQubit}
          className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-mono transition-colors flex items-center gap-2"
        >
          <Play size={16} /> Ukur
        </button>
      </div>
      {measured && (
        <p className="text-center mt-4 font-mono text-cyan-300 animate-pulse">
          Runtuh (Collapse)! Keadaan kini definitif.
        </p>
      )}
    </div>
  );
};

// --- Deutsch-Jozsa Demo ---

export const DeutschJozsaDemo: React.FC = () => {
  const [state, setState] = useState<DeutschJozsaState>({
    selectedOracle: null,
    result: null,
    isRunning: false
  });

  const runCircuit = () => {
    if (!state.selectedOracle) return;
    
    setState(prev => ({ ...prev, isRunning: true, result: null }));
    
    // Simulate quantum processing delay
    setTimeout(() => {
      const output = state.selectedOracle === OracleType.CONSTANT ? '0' : '1';
      setState(prev => ({ ...prev, isRunning: false, result: output }));
    }, 1000);
  };

  return (
    <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-800/50 p-8 rounded-xl border border-slate-700">
      
      {/* Input Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-600 pb-2">1. Pilih Oracle (Fungsi)</h3>
        <div className="space-y-3">
          <button
            onClick={() => setState({ selectedOracle: OracleType.CONSTANT, result: null, isRunning: false })}
            className={`w-full p-4 rounded-lg border text-left flex items-center justify-between transition-all ${
              state.selectedOracle === OracleType.CONSTANT 
                ? 'bg-cyan-900/30 border-cyan-500 text-cyan-300' 
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
            }`}
          >
            <span>Konstan (f(x) = 0)</span>
            {state.selectedOracle === OracleType.CONSTANT && <CheckCircle size={18} />}
          </button>
          
          <button
            onClick={() => setState({ selectedOracle: OracleType.BALANCED, result: null, isRunning: false })}
            className={`w-full p-4 rounded-lg border text-left flex items-center justify-between transition-all ${
              state.selectedOracle === OracleType.BALANCED 
                ? 'bg-fuchsia-900/30 border-fuchsia-500 text-fuchsia-300' 
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
            }`}
          >
            <span>Seimbang (f(x) = x)</span>
            {state.selectedOracle === OracleType.BALANCED && <CheckCircle size={18} />}
          </button>
        </div>

        <button
          disabled={!state.selectedOracle || state.isRunning}
          onClick={runCircuit}
          className={`w-full py-3 mt-4 rounded-lg font-bold font-mono transition-all flex items-center justify-center gap-2 ${
            !state.selectedOracle || state.isRunning
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-600 to-fuchsia-600 hover:from-cyan-500 hover:to-fuchsia-500 text-white shadow-lg shadow-purple-500/20'
          }`}
        >
          {state.isRunning ? 'Memproses...' : 'Jalankan Sirkuit Kuantum'}
        </button>
      </div>

      {/* Output Section */}
      <div className="flex flex-col items-center justify-center bg-slate-900 rounded-lg border border-slate-800 relative overflow-hidden">
        <div className="absolute top-2 left-2 text-xs font-mono text-slate-500">HASIL PENGUKURAN</div>
        
        {state.isRunning ? (
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-12 h-12 border-4 border-slate-700 border-t-cyan-500 rounded-full"
          />
        ) : state.result ? (
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className={`text-6xl font-black font-mono mb-2 ${state.result === '0' ? 'text-cyan-400' : 'text-fuchsia-400'}`}>
              |{state.result}⟩
            </div>
            <div className="text-sm font-mono text-slate-300">
              Teridentifikasi sebagai: <br/>
              <span className="font-bold text-white text-lg">
                {state.result === '0' ? 'CONSTANT' : 'BALANCED'}
              </span>
            </div>
            <div className="mt-4 px-3 py-1 bg-green-900/30 text-green-400 text-xs rounded-full inline-block border border-green-800">
              Hanya 1 Query
            </div>
          </motion.div>
        ) : (
          <div className="text-slate-600 flex flex-col items-center">
            <HelpCircle size={48} className="mb-2 opacity-20" />
            <p className="text-sm">Siap Menghitung</p>
          </div>
        )}
      </div>
    </div>
  );
};