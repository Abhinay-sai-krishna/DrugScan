

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { startChat, sendMessage } from '../services/geminiService';
import type { Chat } from '@google/genai';
import Card from './common/Card';
import TypingIndicator from './common/TypingIndicator';

type Message = {
    role: 'user' | 'model';
    text: string;
};

const ChatPage: React.FC = () => {
    const [chatSession, setChatSession] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setChatSession(startChat());
        setMessages([
            { role: 'model', text: 'Hello! How can I help you today? Ask me about medications, conditions, or general health topics.' }
        ]);
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || !chatSession || isLoading) return;
        
        const userMessage: Message = { role: 'user', text: userInput };
        setMessages(prev => [...prev, userMessage]);
        setUserInput('');
        setIsLoading(true);
        setError(null);
        
        try {
            const stream = await sendMessage(chatSession, userInput);
            setIsLoading(false);
            
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', text: '' }]);

            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { role: 'model', text: modelResponse };
                    return newMessages;
                });
            }

        } catch (err: any) {
            setError('Sorry, I encountered an error. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <Card className="flex flex-col h-[75vh]">
             <h2 className="text-3xl font-bold text-brand-dark mb-4 text-center border-b pb-3">AI Medical Chat</h2>
            <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-lg p-3 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-brand-primary text-white' : 'bg-brand-secondary text-brand-dark'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex justify-start">
                        <div className="max-w-lg p-3 rounded-2xl bg-brand-secondary text-brand-dark shadow-sm">
                           <TypingIndicator />
                        </div>
                    </div>
                )}
                {error && <div className="text-accent-red">{error}</div>}
            </div>
            <div className="border-t pt-4">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow p-3 border border-gray-300 rounded-full focus:ring-brand-primary focus:border-brand-primary bg-white"
                        aria-label="Chat input"
                        disabled={isLoading}
                    />
                    <button type="submit" className="bg-brand-primary text-white p-3 rounded-full hover:bg-teal-700 disabled:bg-gray-400 transition-transform transform hover:scale-110" disabled={isLoading || !userInput.trim()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </form>
            </div>
        </Card>
    );
};

export default ChatPage;