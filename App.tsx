
import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import FeaturesPage from './components/FeaturesPage';
import DemoPage from './components/DemoPage';
import InteractionCheckerPage from './components/InteractionCheckerPage';
import ChatPage from './components/ChatPage';
import { Page } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.HOME);

  const renderActivePage = () => {
    switch (activePage) {
      case Page.HOME:
        return <HomePage setActivePage={setActivePage} />;
      case Page.FEATURES:
        return <FeaturesPage />;
      case Page.DEMO:
        return <DemoPage />;
      case Page.INTERACTION_CHECKER:
        return <InteractionCheckerPage />;
      case Page.AI_CHAT:
        return <ChatPage />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-dark">
      <Header activePage={activePage} setActivePage={setActivePage} />
      <main className="p-4 sm:p-6 lg:p-8">
        <div key={activePage} className="max-w-7xl mx-auto animate-fadeIn">
          {renderActivePage()}
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm border-t border-gray-200 mt-8">
        <p>Disclaimer: This tool is a demonstration and is not intended for clinical use. Always consult with a qualified healthcare provider for medical advice.</p>
        <p>&copy; 2024 DrugScan. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;