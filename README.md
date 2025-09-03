
# DrugScan - AI-Powered Prescription Analysis Tool

DrugScan is an intelligent web application designed to enhance medication safety by providing healthcare professionals with advanced AI-driven tools for prescription verification. It analyzes prescriptions to detect potential drug-drug interactions, verify dosages against patient data, and suggest safer alternative medications.

## ✨ Key Features

- **Comprehensive Prescription Analysis**: Parses prescription text to extract medication names, dosages, and frequencies using advanced AI.
- **Real-Time Interaction Checker**: Utilizes Google Search grounding to check for potential drug-drug interactions, ensuring the information is up-to-date and providing verifiable web sources.
- **Age-Specific Dosage Verification**: Automatically verifies if dosages are appropriate for the patient's age.
- **Alternative Medication Suggestions**: Recommends safer and effective alternatives in case of potential interactions or contraindications.
- **AI Medical Assistant Chat**: An interactive chat interface for users to ask questions about medications, health conditions, and treatments, with answers grounded in reliable web data.
- **Modern, Responsive UI**: A clean, intuitive, and fully responsive user interface built with React and Tailwind CSS.

## 🚀 Getting Started

To run this project locally, you will need to have Node.js and npm (or yarn/pnpm) installed.

### Prerequisites

- An API key from Google AI Studio for the Gemini API.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/drugscan.git
    cd drugscan
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Google Gemini API key:
    ```
    API_KEY=your_gemini_api_key_here
    ```
    *Note: In this project's environment, the `API_KEY` is assumed to be pre-configured as `process.env.API_KEY`.*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application should now be running on your local development server.

## 🛠️ Technology Stack

- **Frontend**:
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/) for styling.

- **AI & Backend Services**:
  - **[@google/genai](https://www.npmjs.com/package/@google/genai)**: The official SDK for accessing the Google Gemini family of models.
    - `gemini-2.5-flash`: Used for prescription analysis, interaction checking, and the AI chat functionality.
  - **Google Search Grounding**: Integrated via the Gemini API to provide up-to-date information and source citations.

## ⚠️ Disclaimer

This tool is a demonstration project and is **not intended for clinical use**. It is designed to showcase the capabilities of AI in healthcare. All information and analysis provided by DrugScan should be independently verified by a qualified healthcare professional. **Always consult with a doctor or pharmacist for medical advice, diagnosis, or treatment.**

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
