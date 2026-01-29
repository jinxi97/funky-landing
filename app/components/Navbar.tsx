"use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import posthog from 'posthog-js';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavLinkClick = (linkName: string) => {
    posthog.capture('nav_link_clicked', {
      link_name: linkName,
      location: 'navbar'
    });
  };

  const handleDemoRequest = () => {
    posthog.capture('demo_requested', {
      location: 'navbar'
    });
  };

  const handleRequestInvitation = () => {
    posthog.capture('cta_clicked', {
      cta_type: 'request_invitation',
      location: 'navbar'
    });
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

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-500 font-medium">
          <a href="#" onClick={() => handleNavLinkClick('features')} className="hover:text-slate-900 transition-colors">Features</a>
          <a href="#" onClick={() => handleNavLinkClick('methodology')} className="hover:text-slate-900 transition-colors">Methodology</a>
          <a href="#" onClick={() => handleNavLinkClick('docs')} className="hover:text-slate-900 transition-colors">Docs</a>
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-4">
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
            <a href="#" onClick={() => handleNavLinkClick('features')} className="text-sm font-medium text-slate-600">Features</a>
            <a href="#" onClick={() => handleNavLinkClick('methodology')} className="text-sm font-medium text-slate-600">Methodology</a>
            <a href="#" onClick={() => handleNavLinkClick('docs')} className="text-sm font-medium text-slate-600">Docs</a>
            <div className="h-px bg-slate-100 my-2"></div>
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
