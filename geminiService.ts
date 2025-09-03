import { GoogleGenAI, Type, Chat, GenerateContentResponse } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        summary: {
            type: Type.STRING,
            description: "A high-level summary of the prescription analysis."
        },
        interactions: {
            type: Type.ARRAY,
            description: "A list of potential drug-drug interactions found in the prescription.",
            items: {
                type: Type.OBJECT,
                properties: {
                    drugs: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "The drugs involved in the interaction."
                    },
                    severity: {
                        type: Type.STRING,
                        description: "The severity of the interaction (e.g., 'High', 'Moderate', 'Low')."
                    },
                    description: {
                        type: Type.STRING,
                        description: "A description of the potential interaction."
                    }
                },
                required: ["drugs", "severity", "description"]
            }
        },
        medications: {
            type: Type.ARRAY,
            description: "A detailed analysis of each medication found in the prescription text.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: {
                        type: Type.STRING,
                        description: "The extracted name of the drug."
                    },
                    dosage: {
                        type: Type.STRING,
                        description: "The extracted dosage information (e.g., '500mg')."
                    },
                    frequency: {
                        type: Type.STRING,
                        description: "The extracted frequency of administration (e.g., 'twice daily')."
                    },
                    dosageAnalysis: {
                        type: Type.OBJECT,
                        properties: {
                            status: {
                                type: Type.STRING,
                                description: "The status of the dosage verification ('Correct', 'Warning', 'Incorrect')."
                            },
                            recommendation: {
                                type: Type.STRING,
                                description: "A detailed recommendation or note regarding the dosage, especially if not 'Correct'."
                            }
                        },
                        required: ["status", "recommendation"]
                    },
                    alternatives: {
                        type: Type.ARRAY,
                        description: "A list of suggested safer alternative medications.",
                        items: {
                            type: Type.STRING
                        }
                    }
                },
                required: ["name", "dosage", "frequency", "dosageAnalysis", "alternatives"]
            }
        }
    },
    required: ["summary", "interactions", "medications"]
};

export const analyzePrescriptionText = async (text: string): Promise<any> => {
    const prompt = `You are an advanced AI medical assistant. A user has provided medical prescription text. Your task is to perform a detailed analysis and generate a JSON object based on the provided schema.

The analysis must include:
1.  **NLP-Based Drug Information Extraction:** For each drug, extract its name, dosage, and frequency.
2.  **Dosage Verification:** Based on the patient's age and the drug details, verify if the dosage is correct. Provide a status ('Correct', 'Warning', 'Incorrect') and a recommendation. For example, if the age is very young or old, the dosage might need adjustment.
3.  **Alternative Medication Suggestions:** Provide a list of safe alternative medication options for each drug.
4.  **Interaction Check:** Identify and describe any potential drug-drug interactions.

The input text is: "${text}".
Respond ONLY with the valid JSON object matching the provided schema.`;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: analysisSchema,
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error analyzing prescription text:", error);
        throw new Error("Failed to analyze the prescription. The AI model could not process the request. Please check the input text and try again.");
    }
};


export const checkDrugInteractions = async (drugList: string): Promise<GenerateContentResponse> => {
    const prompt = `You are an expert pharmacologist AI. Analyze the following list of drugs for potential interactions using up-to-date information. The list is: "${drugList}".
    
    Identify all potential drug-drug interactions. For each interaction, provide the names of the interacting drugs, the severity level (High, Moderate, or Low), and a clear, concise description of the interaction and clinical advice.
    
    If no interactions are found, return an empty array.
    
    Respond ONLY with a valid JSON array matching this structure: [{ "drugs": ["drug1", "drug2"], "severity": "High|Moderate|Low", "description": "..." }]. Do not include any other text or markdown formatting.`;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                tools: [{googleSearch: {}}],
            },
        });
        return response;
    } catch (error) {
        console.error("Error checking drug interactions:", error);
        throw new Error("Failed to check for interactions. The AI model could not process the request.");
    }
};


let chat: Chat | null = null;

export const startChat = (): Chat => {
    if (!chat) {
        chat = ai.chats.create({
            model,
            config: {
                systemInstruction: "You are a helpful and knowledgeable medical AI assistant. Your purpose is to provide clear, accurate, and easy-to-understand information about medical topics, drugs, and health conditions using the most up-to-date information available. You are not a doctor and you must always remind the user to consult a healthcare professional for medical advice. Do not provide diagnoses or treatment plans.",
                tools: [{googleSearch: {}}]
            },
        });
    }
    return chat;
};

export const sendMessage = async (chatSession: Chat, message: string) => {
    const result = await chatSession.sendMessageStream({ message });
    return result;
};