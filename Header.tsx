
import React from 'react';
import { Page } from '../types';

interface HeaderProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const NavButton: React.FC<{
  label: string;
  page: Page;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 text-sm sm:text-base font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-brand-primary text-white shadow'
        : 'text-gray-600 hover:bg-brand-secondary hover:text-brand-dark'
    }`}
  >
    {label}
  </button>
);

const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
  const navItems = [
    { label: 'Home', page: Page.HOME },
    { label: 'Features', page: Page.FEATURES },
    { label: 'Demo', page: Page.DEMO },
    { label: 'Interactions', page: Page.INTERACTION_CHECKER },
    { label: 'AI Chat', page: Page.AI_CHAT },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => setActivePage(Page.HOME)}>
             <svg className="h-10 w-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h1 className="text-xl sm:text-2xl font-bold text-brand-dark ml-3">
                DrugScan
            </h1>
          </div>
          <nav className="bg-gray-100 p-1 rounded-lg">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <NavButton
                  key={item.page}
                  label={item.label}
                  page={item.page}
                  isActive={activePage === item.page}
                  onClick={() => setActivePage(item.page)}
                />
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;