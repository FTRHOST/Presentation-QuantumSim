import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Github, Box, Cpu, ArrowRight, CheckCircle } from 'lucide-react';
import { AtomAnimation, BlochSphere2D, CircuitDiagram } from './components/Visuals';
import { SuperpositionDemo, DeutschJozsaDemo } from './components/InteractiveDemos';

const TOTAL_SLIDES = 11;

const App: React.FC = () => {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    if (slide < TOTAL_SLIDES - 1) {
      setDirection(1);
      setSlide(s => s + 1);
    }
  }, [slide]);

  const prevSlide = useCallback(() => {
    if (slide > 0) {
      setDirection(-1);
      setSlide(s => s - 1);
    }
  }, [slide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  const SlideWrapper: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
    <motion.div
      key={slide}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 md:p-16 ${className}`}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="relative w-screen h-screen bg-slate-900 overflow-hidden font-sans text-slate-100 selection:bg-cyan-500/30">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950 -z-10" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500" />

      {/* Main Content Area */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        
        {/* Slide 1: Title */}
        {slide === 0 && (
          <SlideWrapper>
            <AtomAnimation />
            <h1 className="text-4xl md:text-6xl font-black text-center mt-8 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300">
              Deutsch-Jozsa & QFT <br/> on High-Performance Simulators
            </h1>
            <p className="text-slate-400 text-lg md:text-xl text-center max-w-2xl">
              Muhammad Fathir Al Faruq & Juwita Artanti Kusumaningtyas
            </p>
            
            <div className="flex flex-col items-center mt-6 gap-3">
              <div className="p-3 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <img 
                  src="./uinlogo.png" 
                  alt="Logo UIN Salatiga" 
                  className="w-20 h-20 object-contain"
                />
              </div>
              <p className="text-cyan-500/80 font-mono tracking-wide">Universitas Islam Negeri Salatiga</p>
            </div>

            <div className="mt-12 animate-bounce">
              <span className="text-xs font-mono text-slate-500">TEKAN SPASI UNTUK MULAI</span>
            </div>
          </SlideWrapper>
        )}

        {/* Slide 2: Motivation */}
        {slide === 1 && (
          <SlideWrapper>
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-white">Why Should We Care?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
              <div className="p-8 border border-slate-700 rounded-2xl bg-slate-800/30 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-fuchsia-400 mb-4 flex items-center gap-2">
                  <Box /> The Problem
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Komputasi kuantum seringkali terlalu abstrak. Terdapat kesenjangan antara fisika teoritis dan 
                  <span className="text-white font-bold"> kode yang dapat direproduksi</span>.
                  Perangkat keras langka; simulasi sangat penting.
                </p>
              </div>
              <div className="p-8 border border-slate-700 rounded-2xl bg-slate-800/30 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                  <ArrowRight /> The Agenda
                </h3>
                <ul className="space-y-4 font-mono text-slate-300">
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs">1</span>
                    Fundamentals & Tools
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs">2</span>
                    Superposition & Entanglement
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-900 text-cyan-400 flex items-center justify-center text-xs">3</span>
                    Deutsch-Jozsa Algorithm
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs">4</span>
                    Quantum Fourier Transform
                  </li>
                </ul>
              </div>
            </div>
          </SlideWrapper>
        )}

        {/* Slide 3: Toolbox */}
        {slide === 2 && (
          <SlideWrapper>
            <h2 className="text-4xl font-bold mb-12">The Toolbox</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-cyan-500">
                <h3 className="text-xl font-bold mb-2">Cirq</h3>
                <p className="text-slate-400 text-sm">Pustaka Python dari Google untuk sirkuit NISQ.</p>
              </div>
              <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-fuchsia-500">
                <h3 className="text-xl font-bold mb-2">Qsim</h3>
                <p className="text-slate-400 text-sm">Simulator vektor keadaan berkinerja tinggi.</p>
              </div>
            </div>
            
            <div className="flex gap-16 items-center">
               <div className="text-center">
                 <div className="text-6xl font-mono mb-2">0</div>
                 <div className="text-slate-500 text-sm">Bit Klasik</div>
               </div>
               <div className="h-16 w-[1px] bg-slate-700"></div>
               <BlochSphere2D label="Qubit |ψ⟩ = α|0⟩ + β|1⟩" color="#e879f9" />
            </div>
          </SlideWrapper>
        )}

        {/* Slide 4: Superposition Demo */}
        {slide === 3 && (
          <SlideWrapper>
             <h2 className="text-3xl md:text-4xl font-bold mb-4">Validating Superposition</h2>
             <p className="text-slate-400 mb-8 max-w-2xl text-center">
               Menerapkan Gerbang Hadamard (H) mengubah keadaan basis menjadi superposisi sempurna.
               <br/> <code className="text-cyan-400 bg-slate-800 px-2 py-1 rounded text-sm mt-2 inline-block">H|0⟩ = (|0⟩ + |1⟩)/√2</code>
             </p>
             <SuperpositionDemo />
          </SlideWrapper>
        )}

        {/* Slide 5: Entanglement */}
        {slide === 4 && (
          <SlideWrapper>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Creating the Bell State</h2>
            <p className="mb-6 font-mono text-fuchsia-300">|Φ⁺⟩ = (|00⟩ + |11⟩)/√2</p>
            
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 w-full max-w-2xl">
              <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Hasil Eksperimen (N=1000)</h3>
              <div className="grid grid-cols-3 gap-4 font-mono text-center">
                <div className="col-span-1 text-slate-500 text-xs text-left py-2">KEADAAN</div>
                <div className="col-span-1 text-slate-500 text-xs py-2">TEORI</div>
                <div className="col-span-1 text-slate-500 text-xs py-2">PENGAMATAN</div>
                
                <div className="col-span-3 h-[1px] bg-slate-700 my-1"></div>

                <div className="col-span-1 text-left text-cyan-400">|00⟩</div>
                <div className="col-span-1 text-slate-300">~50%</div>
                <div className="col-span-1 text-cyan-400 font-bold bg-cyan-900/20 rounded">513</div>

                <div className="col-span-1 text-left text-slate-600">|01⟩</div>
                <div className="col-span-1 text-slate-600">0%</div>
                <div className="col-span-1 text-slate-600">0</div>

                <div className="col-span-1 text-left text-slate-600">|10⟩</div>
                <div className="col-span-1 text-slate-600">0%</div>
                <div className="col-span-1 text-slate-600">0</div>

                <div className="col-span-1 text-left text-fuchsia-400">|11⟩</div>
                <div className="col-span-1 text-slate-300">~50%</div>
                <div className="col-span-1 text-fuchsia-400 font-bold bg-fuchsia-900/20 rounded">487</div>
              </div>
            </div>
            <p className="mt-6 text-green-400 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              Korelasi kuat tervalidasi.
            </p>
          </SlideWrapper>
        )}

        {/* Slide 6: Paradox */}
        {slide === 5 && (
          <SlideWrapper>
            <h2 className="text-3xl font-bold mb-12">The Entanglement Paradox</h2>
            <div className="flex justify-center gap-16 md:gap-32">
              <div className="text-center relative">
                 <BlochSphere2D label="Qubit A" vectorRotation={Math.random() * 360} color="#22d3ee" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-black text-white/10">?</div>
              </div>
              <div className="text-center relative">
                 <BlochSphere2D label="Qubit B" vectorRotation={Math.random() * 360} color="#e879f9" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-black text-white/10">?</div>
              </div>
            </div>
            <div className="mt-12 text-center max-w-2xl bg-slate-800/50 p-6 rounded-lg border border-slate-700">
               <p className="text-xl italic font-serif text-slate-200">"Secara individu acak, secara kolektif tersinkronisasi."</p>
               <p className="text-sm text-slate-400 mt-2">
                 Melihat Qubit A saja tidak memberi informasi. <br/>
                 Namun mengukur A secara instan menentukan B.
               </p>
            </div>
          </SlideWrapper>
        )}

        {/* Slide 7: Deutsch-Jozsa Interactive */}
        {slide === 6 && (
          <SlideWrapper>
            <div className="text-center mb-8">
               <h2 className="text-3xl font-bold mb-2">Quantum Advantage: Deutsch-Jozsa</h2>
               <p className="text-slate-400">Menentukan sifat global suatu fungsi dalam satu langkah.</p>
            </div>
            <DeutschJozsaDemo />
            <div className="mt-8 text-center text-sm text-slate-500 font-mono">
              Pendekatan Klasik: Butuh 2 Query (f(0) DAN f(1)) <br/>
              Pendekatan Kuantum: Butuh 1 Query (Phase Kickback)
            </div>
          </SlideWrapper>
        )}

        {/* Slide 8: QFT */}
        {slide === 7 && (
          <SlideWrapper>
            <h2 className="text-3xl font-bold mb-8">Quantum Fourier Transform (QFT)</h2>
            <CircuitDiagram />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-5xl">
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center text-center">
                <div className="text-cyan-400 font-mono text-xl mb-2">|101⟩</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">Basis Komputasi</div>
                <p className="mt-4 text-sm text-slate-300">Keadaan input (Desimal 5)</p>
              </div>

              <div className="flex items-center justify-center">
                 <ArrowRight className="text-slate-600 w-8 h-8" />
                 <div className="mx-2 px-3 py-1 bg-fuchsia-900/50 text-fuchsia-300 rounded font-mono border border-fuchsia-500/50">QFT</div>
                 <div className="mx-2 px-3 py-1 bg-cyan-900/50 text-cyan-300 rounded font-mono border border-cyan-500/50">IQFT</div>
                 <ArrowRight className="text-slate-600 w-8 h-8" />
              </div>

              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center text-center">
                <div className="text-cyan-400 font-mono text-xl mb-2">|101⟩</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">Keadaan Pulih</div>
                <p className="mt-4 text-sm text-slate-300">Rekonstruksi Sempurna</p>
              </div>
            </div>
            
            <p className="mt-12 text-center max-w-2xl text-slate-400">
              "Kami memverifikasi reversibilitas. Menerapkan QFT kemudian Inverse-QFT mengembalikan sistem secara sempurna ke keadaan awal."
            </p>
          </SlideWrapper>
        )}

        {/* Slide 9: Conclusion */}
        {slide === 8 && (
          <SlideWrapper>
            <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-400">Conclusion</h2>
            <div className="space-y-6 max-w-3xl">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0"><CheckCircle size={18}/></div>
                <div>
                  <h4 className="font-bold text-xl text-slate-200">Theory Validated</h4>
                  <p className="text-slate-400">Berhasil menjembatani mekanika kuantum abstrak dengan kode Cirq yang dapat dieksekusi.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0"><Cpu size={18}/></div>
                <div>
                  <h4 className="font-bold text-xl text-slate-200">Tool Efficacy</h4>
                  <p className="text-slate-400">Qsim terbukti mampu menangani simulasi vektor keadaan secara efisien.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 flex-shrink-0"><Box size={18}/></div>
                <div>
                  <h4 className="font-bold text-xl text-slate-200">Limitation</h4>
                  <p className="text-slate-400">Simulasi dilakukan dalam lingkungan ideal yang bebas noise.</p>
                </div>
              </div>
            </div>
          </SlideWrapper>
        )}

        {/* Slide 10: Future */}
        {slide === 9 && (
          <SlideWrapper>
            <h2 className="text-3xl font-bold mb-12">Future Directions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
               <div className="p-6 border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-colors rounded-xl cursor-default group">
                 <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔍</div>
                 <h3 className="font-bold mb-2">Grover's Algorithm</h3>
                 <p className="text-sm text-slate-400">Bergerak melampaui Deutsch-Jozsa untuk mencari database tidak terstruktur.</p>
               </div>
               <div className="p-6 border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-colors rounded-xl cursor-default group">
                 <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📉</div>
                 <h3 className="font-bold mb-2">Noise Models</h3>
                 <p className="text-sm text-slate-400">Memperkenalkan dekoherensi untuk mensimulasikan kondisi perangkat keras NISQ yang nyata.</p>
               </div>
               <div className="p-6 border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-colors rounded-xl cursor-default group">
                 <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
                 <h3 className="font-bold mb-2">Real Hardware</h3>
                 <p className="text-sm text-slate-400">Menyebarkan sirkuit yang telah divalidasi ke Prosesor Kuantum nyata melalui Cloud.</p>
               </div>
            </div>
          </SlideWrapper>
        )}

        {/* Slide 11: End */}
        {slide === 10 && (
          <SlideWrapper>
            <AtomAnimation />
            <h1 className="text-5xl font-black mt-8 mb-4">Thank You</h1>
            
            <div className="text-center space-y-2 mb-12">
               <p className="text-xl">Muhammad Fathir Al Faruq</p>
               <a href="mailto:fathironmy4@gmail.com" className="text-cyan-400 hover:underline">fathironmy4@gmail.com</a>
            </div>

            <a 
              href="https://github.com/FTRHOST/paper-quantum-simulation.git" 
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-full flex items-center gap-3 transition-all hover:scale-105"
            >
              <Github size={20} />
              <span>Lihat Repositori</span>
            </a>
          </SlideWrapper>
        )}

      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-8 flex gap-4 z-50">
        <button 
          onClick={prevSlide}
          disabled={slide === 0}
          className="p-3 bg-slate-800 rounded-full text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft />
        </button>
        <button 
          onClick={nextSlide}
          disabled={slide === TOTAL_SLIDES - 1}
          className="p-3 bg-cyan-600 rounded-full text-white hover:bg-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-cyan-600 transition-all duration-500 ease-out" style={{ width: `${((slide + 1) / TOTAL_SLIDES) * 100}%` }} />
      
      {/* Slide Counter */}
      <div className="absolute bottom-8 left-8 font-mono text-slate-500">
        {slide + 1} <span className="text-slate-700">/</span> {TOTAL_SLIDES}
      </div>

    </div>
  );
};

export default App;