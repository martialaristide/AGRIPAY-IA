
import React, { useState, useRef, useEffect } from 'react';
import { getAgriculturalAdvice } from '../services/geminiService';
import type { Message } from '../types';
import { SendIcon, UploadIcon, AssistantIcon } from './IconComponents';
import ReactMarkdown from 'react-markdown';

// Helper to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = (error) => reject(error);
    });
};

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', parts: [{ text: "Hello! How can I help you with your farm today? You can ask me a question or upload a photo of a plant for diagnosis." }] },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() && !imageFile) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }], image: imagePreview || undefined };
    setMessages((prev) => [...prev, userMessage]);
    
    setIsLoading(true);
    setInput('');
    setImageFile(null);
    setImagePreview(null);
    if(fileInputRef.current) fileInputRef.current.value = "";


    let imagePayload: { mimeType: string; data: string } | undefined;
    if (imageFile) {
      try {
        const base64Data = await fileToBase64(imageFile);
        imagePayload = { mimeType: imageFile.type, data: base64Data };
      } catch (error) {
        console.error("Error converting image to base64:", error);
        setMessages(prev => [...prev, { role: 'model', parts: [{ text: "Sorry, there was an error processing your image." }] }]);
        setIsLoading(false);
        return;
      }
    }
    
    const prompt = imageFile && !input.trim() ? "Please analyze this image." : input;
    const responseText = await getAgriculturalAdvice(prompt, imagePayload);

    setMessages((prev) => [...prev, { role: 'model', parts: [{ text: responseText }] }]);
    setIsLoading(false);
  };
  
  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-white rounded-2xl shadow-md">
      {/* Chat messages */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-4 items-start ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'model' && (
                <div className="w-10 h-10 rounded-full bg-[#1F7A6B] flex items-center justify-center flex-shrink-0">
                  <AssistantIcon className="w-6 h-6 text-white" />
                </div>
              )}
              <div className={`p-4 rounded-2xl max-w-lg ${msg.role === 'user' ? 'bg-[#F7FAFC] text-[#0F172A] rounded-br-none' : 'bg-[#1F7A6B] text-white rounded-bl-none'}`}>
                 {msg.image && <img src={msg.image} alt="Upload preview" className="rounded-lg mb-2 max-h-48" />}
                 <div className="prose prose-sm text-white prose-headings:text-white prose-strong:text-white">
                  <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#1F7A6B] flex items-center justify-center flex-shrink-0">
                <AssistantIcon className="w-6 h-6 text-white" />
              </div>
              <div className="p-4 rounded-2xl bg-[#1F7A6B] text-white rounded-bl-none">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-gray-200">
        {imagePreview && (
            <div className="relative w-24 h-24 mb-2">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg"/>
                <button onClick={() => {setImagePreview(null); setImageFile(null); if(fileInputRef.current) fileInputRef.current.value = "";}} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs">&times;</button>
            </div>
        )}
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
            placeholder="Ask about your crops or upload an image..."
            className="w-full py-3 pl-12 pr-24 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1F7A6B]"
            disabled={isLoading}
          />
          <div className="absolute left-4">
            <button onClick={() => fileInputRef.current?.click()} className="text-gray-500 hover:text-[#1F7A6B]">
                <UploadIcon />
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="absolute right-3 bg-[#1F7A6B] text-white rounded-full p-2.5 hover:bg-teal-800 disabled:bg-gray-400 transition-colors"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
