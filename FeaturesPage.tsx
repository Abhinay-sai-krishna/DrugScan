import React from 'react';
import Card from './common/Card';

// Define the structure for a feature
interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

// Array of features with professional icons and descriptions
const features: Feature[] = [
  {
    icon: (
      <svg className="w-12 h-12 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Comprehensive Prescription Analysis',
    description: 'Utilizes advanced AI to perform a full analysis of prescription text, extracting drug names, dosages, and frequencies while verifying correctness.',
  },
  {
    icon: (
      <svg className="w-12 h-12 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    title: 'Real-Time Interaction Checker',
    description: 'Checks for potential drug-drug interactions using Google Search for the most current information, ensuring patient safety with verifiable sources.',
  },
  {
    icon: (
      <svg className="w-12 h-12 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'AI Medical Assistant Chat',
    description: 'A conversational AI chat for users to ask questions about medications and health conditions, with answers grounded in reliable web data.',
  },
  {
    icon: (
      <svg className="w-12 h-12 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: 'Age-Specific Dosage Verification',
    description: 'Automatically cross-references patient age with medication databases to ensure dosages are safe and appropriate for all age groups.',
  },
  {
    icon: (
      <svg className="w-12 h-12 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 11a8 8 0 1014.2-4.2L20 4M4 20l5.8-2.8A8 8 0 0013 4" />
      </svg>
    ),
    title: 'Alternative Medication Suggestions',
    description: 'Recommends safer and equally effective alternative medications in cases of potential allergies, adverse interactions, or other contraindications.',
  },
  {
    icon: (
      <svg className="w-12 h-12 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9M3 12a9 9 0 019-9m-9 9h18" />
      </svg>
    ),
    title: 'Up-to-Date Information',
    description: 'Integrates Google Search to ensure all analyses and chat responses are based on the latest medical guidelines and research.',
  },
];

const FeaturesPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center animate-fadeIn">
        <h1 className="text-4xl font-extrabold text-brand-dark sm:text-5xl">
          Our Powerful Features
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
          DrugScan is equipped with a suite of AI-powered tools designed to enhance medication safety and provide reliable health information.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card 
            key={feature.title} 
            className="text-center transform hover:scale-105 hover:shadow-xl animate-fadeInUp flex flex-col items-center p-8"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center">
                {feature.icon}
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold text-brand-primary mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-base">{feature.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;
