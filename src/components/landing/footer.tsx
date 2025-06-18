import React, { useState, useEffect } from 'react';
import { ArrowUp, ExternalLink, Mail, Instagram, Facebook, ChevronRight } from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show scroll to top when near bottom
      setShowScrollTop(scrollTop > windowHeight);
      
      // Trigger footer animations when it comes into view
      if (scrollTop + windowHeight > documentHeight - 200) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const restartDemo = () => {
    window.location.reload();
  };

  const footerLinks = {
    terms: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of use', href: '#' }
    ],
    company: [
      { label: 'About', href: '#' },
      { label: 'CCIJ', href: '#' }
    ],
    social: [
      { label: 'Instagram', href: '#', icon: Instagram },
      { label: 'Facebook', href: '#', icon: Facebook }
    ]
  };

  return (
    <footer className="bg-black text-white relative overflow-hidden border-t border-white">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.03) 50%, transparent 55%)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column - Logo & Description */}
          <div className={`space-y-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
          }`}>
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-10 h-10 bg-white rounded transform group-hover:rotate-12 transition-transform duration-300">
                <div className="w-full h-full bg-black rounded-sm m-0.5 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white rounded-full relative">
                    <div className="absolute inset-1 border border-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xl font-bold group-hover:text-gray-300 transition-colors">
                  Election Watch
                </div>
                <div className="text-sm text-gray-500">by CCIJ</div>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="space-y-4 max-w-lg">
              <p className="text-gray-300 leading-relaxed">
                Our focus is to establish and streamline information analysis, mitigate 
                extreme political rhetoric, and detect coordinated online attacks as it 
                applies to election watch.
              </p>
              
              <p className="text-gray-400 text-sm leading-relaxed">
                This product aims to support and improve election monitoring by leveraging 
                data-driven insights to combat misinformation, bolster transparency, and 
                protect press freedom during electoral processes in West Africa and beyond.
              </p>
            </div>
          </div>

          {/* Right Column - Links */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-8 transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}>
            
            {/* Terms Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-6 relative">
                Terms
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-500 group-hover:w-full"></div>
              </h3>
              <ul className="space-y-3">
                {footerLinks.terms.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                        {link.label}
                      </span>
                      <ChevronRight 
                        size={14} 
                        className="ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                        {link.label}
                      </span>
                      <ChevronRight 
                        size={14} 
                        className="ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media & Contact Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-6">Social Media</h3>
                <ul className="space-y-3">
                  {footerLinks.social.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                      >
                        <link.icon size={16} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                        <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                          {link.label}
                        </span>
                        <ExternalLink 
                          size={12} 
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6">Mail</h3>
                <a 
                  href="mailto:info@ccij.io"
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <Mail size={16} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                    ccij.io
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 transform transition-all duration-1000 delay-400 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          
          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            Copyright 2025 ElectionWatch. All rights reserved.
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={restartDemo}
              className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2 group"
            >
              <span className="text-sm">Restart</span>
              <div className="w-4 h-4 border border-gray-400 group-hover:border-white rounded transition-colors duration-200 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gray-400 group-hover:bg-white rounded-full transition-colors duration-200"></div>
              </div>
            </button>
            
            {showScrollTop && (
              <button
                onClick={scrollToTop}
                className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-all duration-200 transform hover:scale-110 animate-bounce"
                aria-label="Scroll to top"
              >
                <ArrowUp size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
        style={{
          width: `${Math.min(100, (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%`
        }}
      ></div>
    </footer>
  );
};



export default Footer;