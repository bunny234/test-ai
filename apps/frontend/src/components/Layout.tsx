import React from 'react';
import { Link } from 'react-router-dom';
import { ModeToggle } from './ModeToggle';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">
                Trading Platform
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link
                to="/dashboard"
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                Dashboard
              </Link>
              <Link
                to="/strategies"
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                Strategies
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <ModeToggle />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
