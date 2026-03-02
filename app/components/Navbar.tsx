"use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import posthog from 'posthog-js';

const DiscordIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleDemoRequest = () => {
    posthog.capture('demo_requested', {
      location: 'navbar'
    });
    window.open('https://cal.com/jason-jin-wmgvju', '_blank', 'noopener,noreferrer');
  };

  const handleRequestInvitation = () => {
    posthog.capture('cta_clicked', {
      cta_type: 'request_invitation',
      location: 'navbar'
    });
    router.push('/request-invitation');
  };

  const handleDiscordClick = () => {
    posthog.capture('discord_clicked', {
      location: 'navbar'
    });
    window.open('https://discord.gg/vNrUwh2XXq', '_blank', 'noopener,noreferrer');
  };

  const handleMobileMenuToggle = () => {
    posthog.capture('mobile_menu_toggled', {
      action: isMenuOpen ? 'closed' : 'opened'
    });
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Custom Logo */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 17L10 11L4 5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19H20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-semibold text-lg tracking-tight text-slate-900">funky</span>
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={handleDiscordClick} className="text-slate-400 hover:text-slate-700 transition-colors" aria-label="Join our Discord">
            <DiscordIcon size={18} />
          </button>
          <button onClick={handleDemoRequest} className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm">
            Schedule a Demo
          </button>
          <button onClick={handleRequestInvitation} className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-px">
            Request Invitation
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-500"
          onClick={handleMobileMenuToggle}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 p-4 shadow-xl">
          <div className="flex flex-col gap-4">
            <button onClick={handleDiscordClick} className="w-full px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 text-slate-600 text-center flex items-center justify-center gap-2">
              <DiscordIcon size={16} />
              Join Discord
            </button>
            <button onClick={handleDemoRequest} className="w-full px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 text-slate-600 text-center">
              Schedule a Demo
            </button>
            <button onClick={handleRequestInvitation} className="w-full px-4 py-2 rounded-lg text-sm font-medium bg-slate-900 text-white text-center">
              Request Invitation
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
