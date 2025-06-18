
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0  border-b border-white left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/95 backdrop-blur-sm border-b border-gray-800' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="w-8 h-8 bg-white rounded transform group-hover:rotate-12 transition-transform duration-300">
              <div className="w-full h-full bg-gray-900 rounded-sm m-0.5 flex items-center justify-center">
                <div className="w-3 h-3 border-2 border-white rounded-full"></div>
              </div>
            </div>
            <span className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">
              CCIJ
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 invisible">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </nav>

          {/* Login Button */}
          <div className="hidden md:flex gap-x-2">
            <Link to="/sign-up" className="text-black bg-white font-medium px-6 py-2 rounded-lg hover:bg-white/50 transform hover:scale-105 transition-all duration-200">
              SIGN UP
            </Link>
             <Link to="/login" className="text-white bg-none border-2 border-white font-medium px-6 py-2 rounded-lg hover:bg-white hover:text-black transform hover:scale-105 transition-all duration-200">
              LOG IN
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
            <div className="px-4 py-4  space-y-4">
              <a href="#" className="blocked hidden text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#" className="blocked hidden text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#" className="blocked hidden text-gray-300 hover:text-white transition-colors">Contact</a>
              <button className="w-full text-white bg-black font-medium px-6 py-2 rounded-lg 0">
                LOG IN
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;