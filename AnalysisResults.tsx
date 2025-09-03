
import React from 'react';
import Card from './common/Card';

interface AnalysisResultsProps {
    result: {
        summary: string;
        interactions: Array<{
            drugs: string[];
            severity: string;
            description: string;
        }>;
        medications: Array<{
            name: string;
            dosage: string;
            frequency: string;
            dosageAnalysis: {
                status: 'Correct' | 'Warning' | 'Incorrect';
                recommendation: string;
            };
            alternatives: string[];
        }>;
    };
}

const statusStyles = {
    Correct: {
        icon: '✅',
        textColor: 'text-accent-green',
        bgColor: 'bg-green-50',
    },
    Warning: {
        icon: '⚠️',
        textColor: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
    },
    Incorrect: {
        icon: '❌',
        textColor: 'text-accent-red',
        bgColor: 'bg-red-50',
    },
};

const DosageStatusBadge: React.FC<{ status: 'Correct' | 'Warning' | 'Incorrect' }> = ({ status }) => {
    const { icon, textColor } = statusStyles[status] || statusStyles.Warning;
    return (
        <span className={`font-semibold ${textColor}`}>
            {icon} {status}
        </span>
    );
};

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
    return (
        <div className="space-y-6 animate-fadeInUp">
            <h3 className="text-2xl font-bold text-brand-dark">Analysis Results</h3>

            {/* Summary Card */}
            <Card>
                <h4 className="text-xl font-semibold text-brand-primary mb-2">Summary</h4>
                <p className="text-gray-700">{result.summary}</p>
            </Card>

            {/* Interactions Card */}
            {result.interactions && result.interactions.length > 0 && (
                <Card className="border-l-4 border-accent-red">
                    <h4 className="text-xl font-semibold text-accent-red mb-2">Interaction Alert!</h4>
                    {result.interactions.map((interaction, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                            <p><strong>Drugs:</strong> {interaction.drugs.join(', ')}</p>
                            <p><strong>Severity:</strong> {interaction.severity}</p>
                            <p><strong>Description:</strong> {interaction.description}</p>
                        </div>
                    ))}
                </Card>
            )}

            {/* Medications List */}
            {result.medications && result.medications.map((med, index) => (
                <Card key={index}>
                    <h4 className="text-xl font-semibold text-brand-dark mb-3">{med.name}</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Extracted Information</p>
                            <ul className="list-disc list-inside text-gray-700">
                                <li><strong>Dosage:</strong> {med.dosage}</li>
                                <li><strong>Frequency:</strong> {med.frequency}</li>
                            </ul>
                        </div>
                        <div className={`${statusStyles[med.dosageAnalysis.status].bgColor} p-3 rounded-lg`}>
                            <p className="text-sm text-gray-500">Dosage Analysis</p>
                            <p><DosageStatusBadge status={med.dosageAnalysis.status} /></p>
                            <p className="text-sm text-gray-600 mt-1">{med.dosageAnalysis.recommendation}</p>
                        </div>
                    </div>
                    {med.alternatives && med.alternatives.length > 0 && (
                         <div className="mt-4">
                             <p className="text-sm text-gray-500">Suggested Alternatives</p>
                             <div className="flex flex-wrap gap-2 mt-1">
                                {med.alternatives.map((alt, i) => (
                                    <span key={i} className="px-2 py-1 bg-brand-secondary text-brand-dark text-sm rounded-full">{alt}</span>
                                ))}
                             </div>
                         </div>
                    )}
                </Card>
            ))}
        </div>
    );
};

export default AnalysisResults;