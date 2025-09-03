import React, { useState, useCallback } from 'react';
import { analyzePrescriptionText } from '../services/geminiService';
import Card from './common/Card';
import LoadingSpinner from './common/LoadingSpinner';
import Alert from './common/Alert';
import AnalysisResults from './AnalysisResults';

const DemoPage: React.FC = () => {
    const [textInput, setTextInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const sampleText = "Patient Name: John Doe, Age: 72\nRx:\n1. Metformin 1000mg, take one tablet twice daily.\n2. Lisinopril 40mg, take one tablet daily.\n3. Warfarin 5mg, take one tablet daily.";

    const handleAnalyze = useCallback(async () => {
        if (!textInput.trim()) {
            setError('Please enter prescription text to analyze.');
            return;
        }
        setError(null);
        setIsLoading(true);
        setResult(null);

        try {
            const response = await analyzePrescriptionText(textInput);
            setResult(response);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [textInput]);

    return (
        <div className="space-y-6">
            <Card>
                <h2 className="text-3xl font-bold text-brand-dark mb-4">Demo & Prototype</h2>
                <p className="text-gray-600 mb-6">
                    Enter prescription text below to see a simulated analysis from our AI models. The analysis will verify dosages, suggest alternatives, and check for interactions.
                </p>
                <div className="mb-4">
                    <label htmlFor="prescription-input" className="block text-sm font-medium text-gray-700 mb-1">
                        Prescription Text
                    </label>
                    <textarea
                        id="prescription-input"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Enter prescription details here..."
                        rows={6}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary bg-white"
                        aria-label="Prescription Input"
                    />
                     <button onClick={() => setTextInput(sampleText)} className="text-sm text-brand-primary hover:underline mt-1">
                        Use sample text
                    </button>
                </div>
                <div className="text-center">
                    <button
                        onClick={handleAnalyze}
                        disabled={isLoading || !textInput.trim()}
                        className="px-8 py-3 bg-brand-primary text-white font-bold rounded-lg shadow-md hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
                        aria-busy={isLoading}
                    >
                        {isLoading ? 'Analyzing...' : 'Analyze'}
                    </button>
                </div>
            </Card>

            {isLoading && <LoadingSpinner />}
            {error && <Alert message={error} />}

            {result && <AnalysisResults result={result} />}
        </div>
    );
};

export default DemoPage;