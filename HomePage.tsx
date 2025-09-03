import React from 'react';
import { Page } from '../types';

interface HomePageProps {
  setActivePage: (page: Page) => void;
}

// A new component for feature cards on the homepage
const HomeFeatureCard: React.FC<{
  icon: JSX.Element;
  title: string;
  description: string;
  onClick: () => void;
}> = ({ icon, title, description, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl shadow-md p-6 text-center cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl border border-gray-200"
  >
    <div className="flex justify-center items-center h-16 w-16 mx-auto bg-brand-secondary rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-brand-primary mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);


const HomePage: React.FC<HomePageProps> = ({ setActivePage }) => {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-8">
        <div className="md:w-1/2 space-y-5 animate-fadeInUp">
          <h1 className="text-4xl md:text-6xl font-extrabold text-brand-dark leading-tight">
            Intelligent Prescription Analysis for Enhanced Safety.
          </h1>
          <p className="text-lg text-gray-700 max-w-xl mx-auto md:mx-0">
            DrugScan uses advanced AI to analyze prescriptions, detect potential drug interactions, and verify dosages, helping healthcare professionals make safer decisions.
          </p>
          <button
            onClick={() => setActivePage(Page.DEMO)}
            className="px-8 py-4 bg-brand-primary text-white font-bold text-lg rounded-lg shadow-md hover:bg-teal-700 transition-transform transform hover:scale-105"
          >
            Try the Demo
          </button>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center animate-fadeIn">
           {/* Animated SVG Graphic */}
           <div className="animate-float">
            <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: 'rgba(0, 122, 122, 0.2)'}} />
                    <stop offset="100%" style={{stopColor: '#007A7A', stopOpacity:1}} />
                    </linearGradient>
                    <filter id="dropshadow" height="130%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                        <feOffset dx="2" dy="2" result="offsetblur"/>
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.5"/>
                        </feComponentTransfer>
                        <feMerge> 
                            <feMergeNode/>
                            <feMergeNode in="SourceGraphic"/> 
                        </feMerge>
                    </filter>
                </defs>
                <g style={{filter: 'url(#dropshadow)'}}>
                    <path fill="url(#grad1)" d="M163.5,100c0,35.07-28.43,63.5-63.5,63.5S36.5,135.07,36.5,100,64.93,36.5,100,36.5,163.5,64.93,163.5,100Z" />
                    <path fill="#FFFFFF" d="M100,50a50,50,0,1,0,50,50A50.06,50.06,0,0,0,100,50Zm0,90a40,40,0,1,1,40-40A40.05,40.05,0,0,1,100,140Z" />
                    <path fill="#007A7A" d="M115,95h-10V85a5,5,0,0,0-10,0v10H85a5,5,0,0,0,0,10h10v10a5,5,0,0,0,10,0V105h10a5,5,0,0,0,0-10Z"/>
                    {/* Little dots for tech feel */}
                    <circle cx="70" cy="70" r="3" fill="#007A7A" />
                    <circle cx="130" cy="70" r="3" fill="#007A7A" />
                    <circle cx="70" cy="130" r="3" fill="#007A7A" />
                    <circle cx="130" cy="130" r="3" fill="#007A7A" />
                    <circle cx="100" cy="60" r="2" fill="#FFFFFF" />
                    <circle cx="60" cy="100" r="2" fill="#FFFFFF" />
                    <circle cx="140" cy="100" r="2" fill="#FFFFFF" />
                    <circle cx="100" cy="140" r="2" fill="#FFFFFF" />
                </g>
            </svg>
           </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-brand-dark mb-4">How It Works</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">Get comprehensive prescription insights in three simple steps.</p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            <div className="flex justify-center items-center h-20 w-20 mx-auto bg-brand-secondary rounded-full border-4 border-white shadow-lg">
                <svg className="w-10 h-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h3 className="text-xl font-semibold text-brand-dark">1. Input Prescription</h3>
            <p className="text-gray-600">Simply type or paste the prescription text into the analysis tool.</p>
          </div>
          <div className="space-y-4 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            <div className="flex justify-center items-center h-20 w-20 mx-auto bg-brand-secondary rounded-full border-4 border-white shadow-lg">
               <svg className="w-10 h-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <h3 className="text-xl font-semibold text-brand-dark">2. AI-Powered Analysis</h3>
            <p className="text-gray-600">Our advanced AI models scan for interactions, dosage issues, and more.</p>
          </div>
          <div className="space-y-4 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
            <div className="flex justify-center items-center h-20 w-20 mx-auto bg-brand-secondary rounded-full border-4 border-white shadow-lg">
               <svg className="w-10 h-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-semibold text-brand-dark">3. Review Results</h3>
            <p className="text-gray-600">Receive a clear, actionable report with insights and recommendations.</p>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-brand-dark mb-4">Explore Our Core Features</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">Dive into our powerful tools designed to enhance medication safety and efficiency.</p>
        <div className="grid md:grid-cols-3 gap-8">
            <HomeFeatureCard 
                icon={<svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
                title="Full Analysis Demo"
                description="Get a comprehensive breakdown of a prescription, including dosage checks and alternative suggestions."
                onClick={() => setActivePage(Page.DEMO)}
            />
             <HomeFeatureCard 
                icon={<svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>}
                title="AI Medical Chat"
                description="Ask our AI assistant questions about medications, health conditions, and more."
                onClick={() => setActivePage(Page.AI_CHAT)}
            />
             <HomeFeatureCard 
                icon={<svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>}
                title="Interaction Checker"
                description="Quickly check for potentially harmful interactions between multiple drugs."
                onClick={() => setActivePage(Page.INTERACTION_CHECKER)}
            />
        </div>
      </section>

    </div>
  );
};

export default HomePage;