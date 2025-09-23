import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type HistoryEntry = { command: string; output: string; type: 'command' | 'output' | 'error' };

const Home: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    { command: '', output: "Welcome to Genesis Polotan's Portfolio Terminal", type: 'output' },
    { command: '', output: 'Type "help" to see available commands', type: 'output' },
    { command: '', output: '', type: 'output' }
  ]);
  const [currentPath] = useState('~/portfolio');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [fontSize, setFontSize] = useState<number>(14);
  const [terminalHeight, setTerminalHeight] = useState<number>(384);
  const [bgOpacity, setBgOpacity] = useState<number>(0.95);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  const commands: Record<string, { output: string; action: null | (() => void) | string }> = {
    help: { output: `Available commands:\nwhoami - Display user information\naboutme - Learn more about me\nmyproject - View my projects\ncontact - Get contact information\nexperience - Show work experience\nclear - Clear terminal\nls - List directory contents\npwd - Show current directory`, action: null },
    whoami: { output: 'Loading...Welcome!!!', action: () => navigate('/home') },
    aboutme: { output: 'Redirecting to About section...', action: () => navigate('/about') },
    myproject: { output: 'Loading projects...', action: () => navigate('/portfolio') },
    contact: { output: 'Opening contact information...', action: () => navigate('/contact') },
    experience: { output: 'See experience', action: null },
    ls: { output: 'home/ about/ projects/ experience/ contacts/ easter-egg/', action: null },
    pwd: { output: '/home/genesis/portfolio', action: null },
    clear: { output: '', action: 'clear' }
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (!trimmedCmd) return;

  const newHistory: HistoryEntry[] = [...history, { command: `genesis@portfolio:${currentPath}$ ${cmd}`, output: '', type: 'command' }];

    if (trimmedCmd === 'clear') {
      setHistory([
        { command: '', output: 'Terminal cleared', type: 'output' },
        { command: '', output: '', type: 'output' }
      ]);
      return;
    }

    if (commands[trimmedCmd]) {
      const command = commands[trimmedCmd];
  newHistory.push({ command: '', output: command.output, type: 'output' });
      if (command.action && typeof command.action === 'function') {
        setTimeout(() => (command.action as () => void)(), 600);
      }
    } else {
      newHistory.push({ command: '', output: `Command not found: ${trimmedCmd}. Type \"help\" for available commands.`, type: 'error' });
    }

    newHistory.push({ command: '', output: '', type: 'output' });
    setHistory(newHistory);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  useEffect(() => { if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight; }, [history]);

  useEffect(() => {
    const handleClick = () => inputRef.current?.focus();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Load settings
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('terminalSettings');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.fontSize) setFontSize(parsed.fontSize);
        if (parsed.terminalHeight) setTerminalHeight(parsed.terminalHeight);
        if (parsed.bgOpacity) setBgOpacity(parsed.bgOpacity);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    const toSave = { fontSize, terminalHeight, bgOpacity };
    try { window.localStorage.setItem('terminalSettings', JSON.stringify(toSave)); } catch (e) {}
  }, [fontSize, terminalHeight, bgOpacity]);

  useEffect(() => {
    const listener = (e: Event) => {
      const ev = e as CustomEvent<{ command: string }>;
      if (ev?.detail?.command) handleCommand(ev.detail.command);
    };
    window.addEventListener('run-terminal-command', listener as EventListener);
    return () => window.removeEventListener('run-terminal-command', listener as EventListener);
  }, [history]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-black/95 border border-green-500/30 rounded-lg shadow-2xl shadow-green-400/20 overflow-hidden">
          <div className="bg-gray-900/80 border-b border-green-500/30 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <span className="text-gray-400 text-sm ml-4">genesis@portfolio: ~/portfolio</span>
            </div>
            <div className="text-gray-500 text-xs">Terminal v2.1.0</div>
          </div>

          <div
            ref={terminalRef}
            className="overflow-y-auto p-6 font-mono text-base"
            style={{ height: `${terminalHeight}px`, fontSize: `${fontSize}px`, backgroundColor: `rgba(0,0,0,${Math.max(0, Math.min(1, bgOpacity))})`, scrollbarWidth: 'thin', scrollbarColor: '#10b981 #1f2937' }}
          >
            {history.map((entry, index) => (
              <div key={index} className="mb-1">
                {entry.command && <div className="text-green-400">{entry.command}</div>}
                {entry.output && <div className={`whitespace-pre-line ${entry.type === 'error' ? 'text-red-400' : 'text-gray-300'}`}>{entry.output}</div>}
              </div>
            ))}

            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-green-400 mr-2">genesis@portfolio:{currentPath}$</span>
              <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 bg-transparent text-white outline-none caret-green-400" autoFocus spellCheck={false} />
              <span className="text-green-400 animate-pulse">|</span>
            </form>
          </div>

          <div className="bg-gray-900/50 border-t border-green-500/20 px-4 py-2">
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="hover:text-green-400 cursor-default">help</span>
              <span className="hover:text-green-400 cursor-default">whoami</span>
              <span className="hover:text-green-400 cursor-default">about</span>
              <span className="hover:text-green-400 cursor-default">portfolio</span>
              <span className="hover:text-green-400 cursor-default">skills</span>
              <span className="hover:text-green-400 cursor-default">contact</span>
              <span className="hover:text-green-400 cursor-default">clear</span>
            </div>
          </div>
        </div>

        <div className="absolute top-1/4 left-10 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-30"></div>

        <div className="fixed left-6 bottom-20 z-50">
          <button className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-black/60 border border-green-500/30 text-green-400 hover:bg-black/70" aria-label="Terminal settings" onClick={() => setSettingsOpen((s) => !s)}>⚙</button>
        </div>

        {settingsOpen && (
          <div className="fixed left-6 bottom-36 z-50 w-72 bg-black/80 border border-green-500/30 rounded-md p-4 shadow-lg">
            <h3 className="text-sm text-gray-300 mb-2">Terminal settings</h3>
            <label className="block text-xs text-gray-400">Font size: {fontSize}px</label>
            <input type="range" min={12} max={24} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full mb-3" />

            <label className="block text-xs text-gray-400">Height: {terminalHeight}px</label>
            <input type="range" min={200} max={800} value={terminalHeight} onChange={(e) => setTerminalHeight(Number(e.target.value))} className="w-full mb-3" />

            <label className="block text-xs text-gray-400">Background opacity: {bgOpacity.toFixed(2)}</label>
            <input type="range" min={0.2} max={1} step={0.05} value={bgOpacity} onChange={(e) => setBgOpacity(Number(e.target.value))} className="w-full mb-3" />

            <div className="flex justify-between">
              <button className="text-xs text-gray-400 hover:text-green-400" onClick={() => { setFontSize(14); setTerminalHeight(384); setBgOpacity(0.95); }}>Reset</button>
              <button className="text-xs text-green-400" onClick={() => setSettingsOpen(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;

