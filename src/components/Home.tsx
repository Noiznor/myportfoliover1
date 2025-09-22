import React, { useState, useEffect, useRef } from 'react';

const Home: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: string; type: 'command' | 'output' | 'error' }>>([
    { command: '', output: 'Welcome to Genesis Polotan\'s Portfolio Terminal', type: 'output' },
    { command: '', output: 'Type "help" to see available commands', type: 'output' },
    { command: '', output: '', type: 'output' }
  ]);
  const [currentPath] = useState('~/portfolio');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: {
      output: `Available commands:
  whoami          - Display user information
  about           - Learn more about me
  projects        - View my projects
  contact         - Get contact information
  skills          - List technical skills
  experience      - Show work experience
  clear           - Clear terminal
  ls              - List directory contents
  pwd             - Show current directory`,
      action: null
    },
    whoami: {
      output: `Hi, my name is Genesis Polotan

I'm a freelance Developer
Computer Engineering Student
Cybersecurity enthusiast
Head Network Engineer at SPHR

"Securing the digital world, one line of code at a time"`,
      action: null
    },
    about: {
      output: 'Redirecting to About section...',
      action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    },
    projects: {
      output: 'Loading projects...',
      action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    },
    contact: {
      output: 'Opening contact information...',
      action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    },
    skills: {
      output: `Technical Skills:
  
  Security:        Penetration Testing, Vulnerability Assessment, 
                   Network Security, Malware Analysis
  
  Programming:     Python, JavaScript, TypeScript, Java, C++
  
  Networking:      Cisco, Routing & Switching, Firewall Management,
                   Network Monitoring, Protocol Analysis
  
  Tools:           Wireshark, Nmap, Burp Suite, Metasploit,
                   Docker, Kubernetes, Git
  
  Frameworks:      React, Node.js, Django, Flask, Spring Boot`,
      action: null
    },
    experience: {
      output: `Work Experience:
  
  Head Network Engineer @ SPHR
  • Network infrastructure management
  • Security implementation and monitoring
  • Team leadership and technical guidance
  
  Freelance Developer
  • Custom web application development
  • Security consulting and assessments
  • Client project management`,
      action: null
    },
    ls: {
      output: `total 6
drwxr-xr-x  2 genesis genesis 4096 Dec 2024 about/
drwxr-xr-x  2 genesis genesis 4096 Dec 2024 projects/
drwxr-xr-x  2 genesis genesis 4096 Dec 2024 skills/
-rw-r--r--  1 genesis genesis 1337 Dec 2024 README.md
-rw-r--r--  1 genesis genesis  256 Dec 2024 contact.txt`,
      action: null
    },
    pwd: {
      output: '/home/genesis/portfolio',
      action: null
    },
    clear: {
      output: '',
      action: 'clear'
    }
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === '') return;

    const newHistory = [...history, { command: `genesis@portfolio:${currentPath}$ ${cmd}`, output: '', type: 'command' as const }];

    if (trimmedCmd === 'clear') {
      setHistory([
        { command: '', output: 'Terminal cleared', type: 'output' },
        { command: '', output: '', type: 'output' }
      ]);
      return;
    }

    if (commands[trimmedCmd as keyof typeof commands]) {
      const command = commands[trimmedCmd as keyof typeof commands];
      newHistory.push({ command: '', output: command.output, type: 'output' });
      
      if (command.action && command.action !== 'clear') {
        setTimeout(() => command.action!(), 1000);
      }
    } else {
      newHistory.push({ 
        command: '', 
        output: `Command not found: ${trimmedCmd}. Type "help" for available commands.`, 
        type: 'error' 
      });
    }

    newHistory.push({ command: '', output: '', type: 'output' });
    setHistory(newHistory);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus();
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="container mx-auto max-w-5xl">
        {/* Terminal Window */}
        <div className="bg-black/95 border border-green-500/30 rounded-lg shadow-2xl shadow-green-400/20 overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-gray-900/80 border-b border-green-500/30 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-400 text-sm ml-4">genesis@portfolio: ~/portfolio</span>
            </div>
            <div className="text-gray-500 text-xs">Terminal v2.1.0</div>
          </div>
          
          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="h-96 overflow-y-auto p-4 font-mono text-sm bg-black/50"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#10b981 #1f2937' }}
          >
            {history.map((entry, index) => (
              <div key={index} className="mb-1">
                {entry.command && (
                  <div className="text-green-400">{entry.command}</div>
                )}
                {entry.output && (
                  <div className={`whitespace-pre-line ${
                    entry.type === 'error' ? 'text-red-400' : 'text-gray-300'
                  }`}>
                    {entry.output}
                  </div>
                )}
              </div>
            ))}
            
            {/* Current Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-green-400 mr-2">genesis@portfolio:{currentPath}$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none caret-green-400"
                autoFocus
                spellCheck={false}
              />
              <span className="text-green-400 animate-pulse">|</span>
            </form>
          </div>
          
          {/* Command Hints */}
          <div className="bg-gray-900/50 border-t border-green-500/20 px-4 py-2">
            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
              <span className="hover:text-green-400 cursor-default">help</span>
              <span className="hover:text-green-400 cursor-default">whoami</span>
              <span className="hover:text-green-400 cursor-default">about</span>
              <span className="hover:text-green-400 cursor-default">projects</span>
              <span className="hover:text-green-400 cursor-default">skills</span>
              <span className="hover:text-green-400 cursor-default">contact</span>
              <span className="hover:text-green-400 cursor-default">clear</span>
            </div>
          </div>
        </div>
        
        {/* Floating Terminal Elements */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-30"></div>
      </div>
    </section>
  );
};

export default Home;