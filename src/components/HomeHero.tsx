import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Home: React.FC = () => {
  const roles = [
    "I'm a freelance Developer",
    'a Computer Engineering Student',
    'cybersecurity enthusiast',
    'Head Network Engineer at SPHR',
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];

    if (isTyping) {
      if (displayText.length < currentRole.length) {
        const t = setTimeout(() => setDisplayText(currentRole.slice(0, displayText.length + 1)), 100);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setIsTyping(false), 2000);
      return () => clearTimeout(t);
    } else {
      if (displayText.length > 0) {
        const t = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 50);
        return () => clearTimeout(t);
      }
      setCurrentRoleIndex((p) => (p + 1) % roles.length);
      setIsTyping(true);
    }
  }, [displayText, isTyping, currentRoleIndex, roles]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Terminal Window */}
        <div className="bg-black/80 border border-green-500/30 rounded-lg shadow-2xl shadow-green-400/10 overflow-hidden">
          <div className="p-12">
            {/* Greeting + name */}
            <div className="text-2xl md:text-4xl font-bold">
              <span className="text-gray-400">Hi, my name is </span>
              <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                Genesis Polotan
              </span>
            </div>

            {/* Animated Role */}
            <div className="h-16 flex items-center justify-center mt-4">
              <div className="text-xl md:text-2xl text-cyan-400">
                {displayText}
                <span className="animate-pulse text-green-400">|</span>
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-8 flex justify-center">
              <a
                href="#about"
                className="group flex items-center space-x-2 px-6 py-3 border border-green-500/50 rounded-lg hover:border-green-400 hover:bg-green-400/10 transition-all duration-300 text-green-400 hover:text-green-300"
              >
                <span>Explore My Work</span>
                <ChevronDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse opacity-50" />
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-30" />
      </div>
    </section>
  );
};

export default Home;
