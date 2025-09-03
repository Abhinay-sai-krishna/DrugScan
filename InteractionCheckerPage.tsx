

import React, { useState, useCallback } from 'react';
import { checkDrugInteractions } from '../services/geminiService';
import Card from './common/Card';
import LoadingSpinner from './common/LoadingSpinner';
import Alert from './common/Alert';

type Interaction = {
    drugs: string[];
    severity: 'High' | 'Moderate' | 'Low';
    description: string;
};

// Fix: Updated GroundingChunk type to align with @google/genai, making web and its properties optional.
type GroundingChunk = {
    web?: {
        uri?: string;
        title?: string;
    }
}

const severityStyles = {
    High: 'border-accent-red',
    Moderate: 'border-yellow-500',
    Low: 'border-blue-500',
};

const InteractionCheckerPage: React.FC = () => {
    const [drugInput, setDrugInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<Interaction[] | null>(null);
    const [sources, setSources] = useState<GroundingChunk[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleCheckInteractions = useCallback(async () => {
        if (!drugInput.trim()) {
            setError('Please enter at least two drug names to check for interactions.');
            return;
        }
        setError(null);
        setIsLoading(true);
        setResults(null);
        setSources([]);

        try {
            const response = await checkDrugInteractions(drugInput);
            
            // Extract and parse text, attempting to clean up potential markdown
            const jsonText = response.text.trim().replace(/^```json\n?/, '').replace(/\n?```$/, '');
            const parsedResults = JSON.parse(jsonText);
            setResults(parsedResults);

            // Extract grounding metadata for sources
            const metadata = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
            if (metadata) {
                setSources(metadata);
            }

        } catch (err: any) {
            let errorMessage = 'An unknown error occurred.';
            if (err instanceof SyntaxError) {
                errorMessage = 'Failed to interpret the AI response. The format may be invalid.';
            } else if (err.message) {
                errorMessage = err.message;
            }
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [drugInput]);

    return (
        <div className="space-y-6">
            <Card>
                <h2 className="text-3xl font-bold text-brand-dark mb-4">Drug Interaction Checker</h2>
                <p className="text-gray-600 mb-6">
                    Enter multiple drug names, separated by commas, to check for potential interactions. This checker uses Google Search for up-to-date information.
                </p>
                <div className="mb-4">
                    <label htmlFor="drug-input" className="block text-sm font-medium text-gray-700 mb-1">
                        Drug Names
                    </label>
                    <textarea
                        id="drug-input"
                        value={drugInput}
                        onChange={(e) => setDrugInput(e.target.value)}
                        placeholder="e.g., Lisinopril, Aspirin, Metformin"
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary bg-white"
                        aria-label="Drug Names Input"
                    />
                </div>
                <div className="text-center">
                    <button
                        onClick={handleCheckInteractions}
                        disabled={isLoading}
                        className="px-8 py-3 bg-brand-primary text-white font-bold rounded-lg shadow-md hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
                        aria-busy={isLoading}
                    >
                        {isLoading ? 'Checking...' : 'Check Interactions'}
                    </button>
                </div>
            </Card>

            {isLoading && <LoadingSpinner />}
            {error && <Alert message={error} />}

            {results && (
                 <div className="animate-fadeInUp space-y-6">
                    <h3 className="text-2xl font-bold text-brand-dark">Results</h3>
                    {results.length === 0 ? (
                        <Card>
                            <p className="text-center text-gray-700">✅ No potential interactions were found among the specified drugs.</p>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {results.map((interaction, index) => (
                                <Card key={index} className={`border-l-4 ${severityStyles[interaction.severity]}`}>
                                    <h4 className="text-lg font-semibold text-brand-dark">Interaction Found</h4>
                                    <p className="mt-2"><strong>Drugs:</strong> {interaction.drugs.join(', ')}</p>
                                    <p><strong>Severity:</strong> <span className="font-medium">{interaction.severity}</span></p>
                                    <p className="mt-1"><strong>Description:</strong> {interaction.description}</p>
                                </Card>
                            ))}
                        </div>
                    )}
                    {sources.length > 0 && (
                        <Card>
                            <h4 className="text-lg font-semibold text-brand-dark mb-3">Sources</h4>
                            <ul className="space-y-2 list-disc list-inside">
                                {/* Fix: Added check for source.web.uri before rendering the link to avoid runtime errors. */}
                                {sources.map((source, index) => (
                                    source.web?.uri && (
                                    <li key={index} className="text-sm">
                                        <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">
                                           {source.web.title || source.web.uri}
                                        </a>
                                    </li>
                                    )
                                ))}
                            </ul>
                        </Card>
                    )}
                </div>
            )}
        </div>
    );
};

export default InteractionCheckerPage;