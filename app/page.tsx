import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import EvolutionSection from './components/EvolutionSection';
import Footer from './components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Background Grid Pattern - Implemented via inline style for simplicity in this demo */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: 'linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)',
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
        }}
      />
      
      {/* Ambient Glows */}
      <div 
        className="fixed top-[-400px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none z-0 blur-[80px]"
        style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(255,255,255,0) 70%)' }}
      />
      <div 
        className="fixed top-[200px] -right-[300px] w-[800px] h-[800px] rounded-full pointer-events-none z-0 blur-[80px]"
        style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(255,255,255,0) 70%)' }}
      />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <HowItWorks />
          <EvolutionSection />
        </main>
        <Footer />
      </div>
      
      {/* Global styles for generic resets if needed */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  );
};
