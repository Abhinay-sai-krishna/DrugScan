import React from 'react';
import Card from './common/Card';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <h2 className="text-3xl font-bold text-brand-dark mb-4">About the Project</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          This project is an initiative to build AI-driven healthcare support tools. Our primary goal is to enhance patient safety by providing healthcare professionals with intelligent, data-driven insights for prescription verification. By leveraging state-of-the-art AI models for Natural Language Processing and medical data analysis, we aim to reduce medication errors, flag adverse drug interactions, and ensure optimal dosage for all patients.
        </p>
      </Card>
       <Card>
        <h2 className="text-3xl font-bold text-brand-dark mb-4">Contact & Source Code</h2>
        <p className="text-lg text-gray-700 mb-4">
          The project is open-source and we welcome collaboration. You can find the complete source code, documentation, and contribute to the project on our GitHub repository.
        </p>
        <a
          href="https://github.com/example/ai-prescription-verifier"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-gray-800 text-white font-bold rounded-lg shadow-md hover:bg-gray-900 transition-colors"
        >
          View on GitHub
        </a>
      </Card>
    </div>
  );
};

export default AboutPage;
