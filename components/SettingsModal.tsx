/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { CloseIcon } from './icons';
import { type LLMConfig } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: LLMConfig;
  onConfigChange: (config: LLMConfig) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, config, onConfigChange }) => {
  if (!isOpen) {
    return null;
  }

  const handleProviderChange = (provider: 'gemini' | 'openai') => {
    onConfigChange({ ...config, provider });
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-800/80 border border-gray-700 rounded-2xl p-8 max-w-2xl w-full text-white shadow-2xl m-4 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <CloseIcon className="w-6 h-6 text-gray-400" />
        </button>

        <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-100">AI Model Settings</h2>
            <p className="mt-2 text-gray-400">Configure your preferred Large Language Model provider.</p>
        </div>
        
        <div className="flex justify-center border-b border-gray-600 mb-6">
            <button onClick={() => handleProviderChange('gemini')} className={`px-4 py-2 text-lg font-semibold transition-colors ${config.provider === 'gemini' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}>Google Gemini</button>
            <button onClick={() => handleProviderChange('openai')} className={`px-4 py-2 text-lg font-semibold transition-colors ${config.provider === 'openai' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}>OpenAI Compatible</button>
        </div>

        {config.provider === 'gemini' && (
            <div className="flex flex-col gap-4 animate-fade-in">
                <label className="flex flex-col gap-2">
                    <span className="font-semibold text-gray-300">Gemini API Key</span>
                    <input 
                        type="password"
                        value={config.gemini.apiKey}
                        onChange={e => onConfigChange({ ...config, gemini: { ...config.gemini, apiKey: e.target.value }})}
                        placeholder="Enter your Google AI Studio API Key"
                        className="bg-gray-900 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </label>
            </div>
        )}

        {config.provider === 'openai' && (
            <div className="flex flex-col gap-4 animate-fade-in">
                <label className="flex flex-col gap-2">
                    <span className="font-semibold text-gray-300">API Endpoint</span>
                     <input 
                        type="text"
                        value={config.openAI.endpoint}
                        onChange={e => onConfigChange({ ...config, openAI: { ...config.openAI, endpoint: e.target.value }})}
                        placeholder="e.g., https://openrouter.ai/api/v1"
                        className="bg-gray-900 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </label>
                 <label className="flex flex-col gap-2">
                    <span className="font-semibold text-gray-300">Model Name</span>
                     <input 
                        type="text"
                        value={config.openAI.model}
                        onChange={e => onConfigChange({ ...config, openAI: { ...config.openAI, model: e.target.value }})}
                        placeholder="e.g., gpt-3.5-turbo"
                        className="bg-gray-900 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </label>
                <label className="flex flex-col gap-2">
                    <span className="font-semibold text-gray-300">API Key</span>
                    <input 
                        type="password"
                        value={config.openAI.apiKey}
                        onChange={e => onConfigChange({ ...config, openAI: { ...config.openAI, apiKey: e.target.value }})}
                        placeholder="Enter your API Key"
                        className="bg-gray-900 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </label>
            </div>
        )}
        
        <div className="mt-8 flex justify-end">
            <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
                Done
            </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;