import React, { useState, useEffect, useRef } from 'react';
type Props={end:number, duration?:number, suffix?:string, prefix?:string}
const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }:Props) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }

    let startTime!:number;
    let animationFrame!:number;;

    const animate = (currentTime:number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  return (
    <div 
      ref={counterRef}
      className={`transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <span className="font-bold text-black">
        {prefix}{count.toLocaleString()}{suffix}
      </span>
    </div>
  );
};

const StatsSection = () => {
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      number: 407,
      label: 'VERIFIED ENTRIES',
      delay: 0
    },
    {
      number: 10,
      label: 'ENTRIES VERIFIED',
      suffix: 'TB+',
      delay: 200
    },
    {
      number: 235,
      label: 'DATA CHECKED',
      delay: 400
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="bg-white py-16 md:py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/5 to-transparent"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`text-center transform transition-all duration-1000 hover:scale-105 ${
                sectionVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
              } ${
                index < stats.length - 1 ? 'md:border-r border-gray-200' : ''
              }`}
              style={{ 
                transitionDelay: `${stat.delay}ms` 
              }}
            >
              <div className="px-6 md:px-8 lg:px-12 py-8 group cursor-default">
                {/* Number */}
                <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-black mb-4 group-hover:text-gray-800 transition-colors duration-300">
                  <AnimatedCounter 
                    end={stat.number} 
                    suffix={stat.suffix || ''} 
                    duration={2500}
                  />
                </div>
                
                {/* Label */}
                <div className={`text-gray-500 text-xs sm:text-sm lg:text-base font-medium tracking-wider uppercase transform transition-all duration-500 ${
                  sectionVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-4 opacity-0'
                }`}
                style={{ 
                  transitionDelay: `${stat.delay + 300}ms` 
                }}>
                  {stat.label}
                </div>
                
                {/* Hover underline */}
                <div className="mt-4 mx-auto w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-16"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom accent line */}
        <div className={`mt-16 mx-auto transition-all duration-1000 ${
          sectionVisible 
            ? 'w-32 opacity-100' 
            : 'w-0 opacity-0'
        } h-0.5 bg-gradient-to-r from-transparent via-black to-transparent`}
        style={{ transitionDelay: '800ms' }}></div>
      </div>
    </section>
  );
};



export default StatsSection