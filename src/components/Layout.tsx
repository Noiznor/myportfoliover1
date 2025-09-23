import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <Header />
      <main className="pt-20">{children}</main>
      <footer className="fixed bottom-0 w-full bg-black/90 p-4 text-center border-t border-green-500/30">
        <Link to="/" className="hover:text-cyan-400 transition-colors duration-200">
          &gt; Back to CMD
        </Link>
      </footer>
    </div>
  );
};

export default Layout;
