import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Eye, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
const navigate=useNavigate()
  useEffect(() => {
    const handleMouseMove = (e:any) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen bg-black-900 relative overflow-hidden flex items-center ">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        {/** */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Interactive mouse follower */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 ">
        <div className="grid lg:grid-cols-2 gap-12 items-center ">
          {/* Left Content */}
          <div className="space-y-8 ">
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl py-4 font-bold text-white leading-tight">
                <span className="block animate-fade-in-up">Verify Information with</span>
                <span className="block  animate-fade-in-up text-white delay-200">
                  our secure{' '}
                  <span className=" text-gray-400">
                    platform
                  </span>
                  .
                </span>
              </h1>
              
              <p className="text-gray-300 text-lg lg:text-lg leading-relaxed animate-fade-in-up delay-300 max-w-2xl">
                Our focus is to establish and streamline information analysis, mitigate 
                extreme political rhetoric, and detect coordinated online attacks as it 
                applies to election watch.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-500">
              <button onClick={()=>navigate("/sign-up")} className="group px-8 py-4 bg-white hover:bg-white/50 text-black  font-semibold rounded-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2">
                <span>Sign up</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              
              <button className="px-8 hidden py-4 border border-gray-600 hover:border-gray-500 text-white font-semibold rounded-lg hover:bg-black-800 transition-all duration-200">
                Learn More
              </button>
            </div>

            {/* Feature Icons */}
            <div className="flex space-x-8 pt-8 animate-fade-in-up delay-700 invisible">
              <div className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Shield className="group-hover:text-blue-400 transition-colors" size={24} />
                <span className="text-sm font-medium">Secure</span>
              </div>
              <div className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Eye className="group-hover:text-purple-400 transition-colors" size={24} />
                <span className="text-sm font-medium">Verified</span>
              </div>
              <div className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Users className="group-hover:text-green-400 transition-colors" size={24} />
                <span className="text-sm font-medium">Trusted</span>
              </div>
            </div>
          </div>

          {/* Right Content - Logo */}
          <div className="flex justify-center lg:justify-end animate-fade-in-up delay-400 ">
            <div className="relative group">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
              
              {/* Main logo container */}
              <div className="relative  bg-white rounded-2xl p-8 transform group-hover:scale-105 transition-all duration-300">
                {/* Fingerprint icon background */}
                <div className="absolute hidden inset-4 bg-black-900 rounded-xl flexy items-center justify-center">
                  <div className="w-16 h-16 border-4 border-white rounded-full relative">
                    <div className="absolute inset-2 border-2 border-white rounded-full"></div>
                    <div className="absolute inset-4 border border-white rounded-full"></div>
                  </div>
                </div>
                
                {/* Text overlay */}
                <div className="relative z-10 pt-24">
                  <div className="text-right">
                    <div className="relative">
                      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-none">
                        Election
                      </h2>
                      {/* Colorful background for Election text */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 rounded-lg transform -skew-x-12"></div>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-1">
                      Watch
                    </h3>
                    <p className="text-gray-600 font-medium mt-2">by CCIJ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-black-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      
    </section>
  );
};



export default Hero ;