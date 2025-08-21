import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Zap, Settings, Cog } from 'lucide-react';

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const equipmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{x: number, y: number, vx: number, vy: number, opacity: number}> = [];
    
    // Create floating particles for underwater effect
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (equipmentRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        equipmentRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen pt-20 flex items-center ocean-gradient overflow-hidden">
      {/* Animated canvas background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Dynamic equipment visualization */}
      <div ref={equipmentRef} className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full" style={{ zIndex: 2 }}>
        <div className="relative w-full h-full">
          {/* Simulated LARS system */}
          <div className="absolute top-1/4 right-1/4 w-32 h-48 opacity-20">
            <div className="w-full h-8 bg-white/30 rounded-lg mb-2"></div>
            <div className="w-6 h-full bg-white/40 rounded-full mx-auto relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/60 animate-pulse"></div>
            </div>
          </div>
          
          {/* Simulated winch system */}
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 opacity-25">
            <div className="w-full h-full rounded-full border-4 border-white/40 relative">
              <div className="absolute inset-2 rounded-full bg-white/20"></div>
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/60 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-spin" style={{animationDuration: '3s'}}></div>
            </div>
          </div>

          {/* Technical grid overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 400 400">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 mb-24 text-center">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none text-white"> 
              Bespoke Deck
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r text-white">
                Machinery
              </span>
              <br />
              <span className="text-3xl md:text-4xl font-light opacity-90">
                for Oceanographic Research & Survey
              </span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl mb-10 font-light text-white/90 leading-relaxed max-w-3xl">
            Engineering solutions that unlock the ocean's deepest secrets. 
            <span className="block mt-2 text-white font-medium">
              Where precision meets the power of the ocean.
            </span>
          </p>
        </div>
      </div>

      {/* Credibility bar integrated into hero */}
      <div className="absolute bottom-8 left-0 right-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-between text-white">
              <div className="flex items-center space-x-8 mb-4 md:mb-0">
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6 text-yellow-300" />
                  <div>
                    <div className="font-semibold text-sm">Certified by Leading Bodies</div>
                    <div className="text-xs opacity-75">DNV • Lloyd's Register • Bureau Veritas</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Settings className="w-6 h-6 text-blue-300" />
                  <div>
                    <div className="font-semibold text-sm">35+ Years Experience</div>
                    <div className="text-xs opacity-75">Specialized Deck Machinery</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Cog className="w-5 h-5 text-white/60 animate-spin" style={{animationDuration: '8s'}} />
                <span className="text-sm font-medium">Engineered for Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
