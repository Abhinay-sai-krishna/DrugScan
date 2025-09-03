// services/huggingFaceService.ts

export async function callHuggingFaceModel(
  model: string,
  inputText: string,
  token: string
) {
  const response = await fetch(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: inputText }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`HF API error for model ${model}: ${response.status} - ${errorText}`);
    // Check for specific HF errors like model loading
    if (response.status === 503 && errorText.includes("currently loading")) {
         throw new Error(`The model (${model}) is currently loading, please try again in a moment.`);
    }
    throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

// Wrappers for the two models with their respective tokens
export async function analyzeWithGranite(text: string) {
  // Using a public IBM Granite model as requested.
  const model = "ibm-granite/granite-8b-code-instruct";
  // This token is publicly visible and should be treated as such.
  // For a production app, this should be handled via a secure backend.
  const token = "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"; 
  return await callHuggingFaceModel(model, text, token);
}

export async function analyzeWithBioBERT(text: string) {
  // A public NER model to simulate BioBERT's function.
  const model = "Jean-Baptiste/roberta-large-ner-english";
  // This token is publicly visible and should be treated as such.
  // For a production app, this should be handled via a secure backend.
  const token = "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";
  return await callHuggingFaceModel(model, text, token);
}
