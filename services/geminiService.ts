/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI } from "@google/genai";
import { type ChatMessage, type LLMConfig } from '../types';

/**
 * Generates a chat response from an AI model.
 * This function is a placeholder for a more complex implementation that would handle
 * different providers (Gemini, OpenAI, etc.) and model capabilities.
 * 
 * @param messages The history of chat messages.
 * @param config The LLM configuration, including provider and API keys.
 * @returns A promise that resolves to the AI's text response.
 */
export const generateChatResponse = async (
    messages: ChatMessage[],
    config: LLMConfig
): Promise<string> => {
    
    // For now, we'll use Gemini as the default. A more robust implementation
    // would use the provider specified in the config.
    const { provider, gemini, openAI } = config;

    console.log(`Generating chat response using ${provider}...`);

    if (provider === 'gemini') {
        if (!gemini.apiKey) {
            throw new Error("Gemini API key is not set. Please configure it in the settings.");
        }
        // Placeholder for Gemini implementation
        const ai = new GoogleGenAI({ apiKey: gemini.apiKey });
        // NOTE: This is a simplified implementation. A real one would map the chat history
        // to the format Gemini expects.
        const lastUserMessage = messages.findLast(m => m.role === 'user');

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: lastUserMessage?.content || "Hello",
        });

        return response.text;
    } else if (provider === 'openai') {
        if (!openAI.apiKey || !openAI.endpoint) {
            throw new Error("OpenAI-compatible API key or endpoint is not set. Please configure it in the settings.");
        }
        // Placeholder for OpenAI-compatible implementation
        // This is where you would make a fetch call to the OpenAI endpoint.
        console.log(`Making a call to ${openAI.endpoint} with model ${openAI.model}`);
        
        // Mock response for demonstration
        await new Promise(res => setTimeout(res, 1000));
        return `This is a mock response from the ${openAI.model} model. In a real app, I would process the Excalidraw scene and your request.`;
    }

    throw new Error(`Unsupported LLM provider: ${provider}`);
};