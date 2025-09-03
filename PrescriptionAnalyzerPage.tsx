import React, { useState } from "react";
import { analyzeWithGranite, analyzeWithBioBERT } from "../services/huggingFaceService";
import Card from './common/Card';
import LoadingSpinner from './common/LoadingSpinner';
import Alert from './common/Alert';

const PrescriptionAnalyzerPage: React.FC = () => {
  const [text, setText] = useState("");
  const [graniteResult, setGraniteResult] = useState<any>(null);
  const [biobertResult, setBiobertResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) {
        setError("Please enter prescription text to analyze.");
        return;
    }
    setLoading(true);
    setError(null);
    setGraniteResult(null);
    setBiobertResult(null);

    try {
      // Using Promise.allSettled to call both models concurrently and handle individual errors
      const results = await Promise.allSettled([
          analyzeWithGranite(text),
          analyzeWithBioBERT(text)
      ]);

      let errors: string[] = [];

      const granite = results[0];
      if (granite.status === 'fulfilled') {
          setGraniteResult(granite.value);
      } else {
          errors.push(`Granite Model Error: ${granite.reason.message}`);
      }

      const biobert = results[1];
      if (biobert.status === 'fulfilled') {
          setBiobertResult(biobert.value);
      } else {
          errors.push(`BioBERT Model Error: ${biobert.reason.message}`);
      }

      if (errors.length > 0) {
        setError(errors.join('\n'));
      }

    } catch (err: any) {
      // Fallback for unexpected errors
      setError(err.message || "An unexpected error occurred during analysis.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-3xl font-bold text-brand-dark mb-4">Hugging Face Live Demo</h1>
         <p className="text-gray-600 mb-6">
            This page directly calls two Hugging Face models (IBM Granite and BioBERT) to analyze the prescription text. Results are shown as raw JSON output from the models. Note: Model loading on Hugging Face may take some time on the first request.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter prescription text here..."
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary mb-4 bg-white"
          rows={6}
          aria-label="Prescription text input for Hugging Face models"
        />
        <div className="text-center">
            <button
                onClick={handleAnalyze}
                disabled={loading}
                className="px-8 py-3 bg-brand-primary text-white font-bold rounded-lg shadow-md hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
                aria-busy={loading}
            >
                {loading ? "Analyzing..." : "Analyze with HF Models"}
            </button>
        </div>
      </Card>
      
      {loading && <LoadingSpinner />}
      {error && <Alert message={error} />}

      <div className="grid md:grid-cols-2 gap-6">
          {graniteResult && (
            <Card>
              <h2 className="text-xl font-semibold text-brand-primary mb-2">Granite Model Result</h2>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {JSON.stringify(graniteResult, null, 2)}
              </pre>
            </Card>
          )}

          {biobertResult && (
            <Card>
              <h2 className="text-xl font-semibold text-brand-primary mb-2">BioBERT Model Result</h2>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {JSON.stringify(biobertResult, null, 2)}
              </pre>
            </Card>
          )}
      </div>
    </div>
  );
}

export default PrescriptionAnalyzerPage;