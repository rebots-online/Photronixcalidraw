/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { type TextOptions } from '../types';

interface TextPanelProps {
  options: TextOptions;
  onTextOptionsChange: (options: TextOptions) => void;
  onApplyText: () => void;
  isLoading: boolean;
  isSelectionActive: boolean;
  credits: number;
}

const TextPanel: React.FC<TextPanelProps> = ({ options, onTextOptionsChange, onApplyText, isLoading, isSelectionActive, credits }) => {
  return (
    <div className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col items-center gap-4 animate-fade-in backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-gray-300">Add Text</h3>
      <p className="text-sm text-gray-400 -mt-2">Click and drag on the image to select a text area.</p>
      
      <div className="w-full flex flex-col sm:flex-row items-center gap-4">
        <input
            type="text"
            value={options.content}
            onChange={(e) => onTextOptionsChange({ ...options, content: e.target.value })}
            placeholder="Enter your text here"
            className="flex-grow bg-gray-800 border border-gray-600 text-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition w-full disabled:cursor-not-allowed disabled:opacity-60 text-base"
            disabled={isLoading}
        />
        <div className="flex items-center gap-2">
            <label htmlFor="font-size" className="text-sm font-medium text-gray-400">Size:</label>
            <input
                id="font-size"
                type="number"
                value={options.fontSize}
                onChange={(e) => onTextOptionsChange({ ...options, fontSize: parseInt(e.target.value, 10) || 12 })}
                className="w-20 bg-gray-800 border border-gray-600 text-gray-200 rounded-lg p-2 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none transition disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isLoading}
            />
        </div>
        <div className="flex items-center gap-2">
             <label htmlFor="color" className="text-sm font-medium text-gray-400">Color:</label>
            <input
                id="color"
                type="color"
                value={options.color}
                onChange={(e) => onTextOptionsChange({ ...options, color: e.target.value })}
                className="w-10 h-10 p-1 bg-gray-800 border border-gray-600 rounded-lg cursor-pointer disabled:cursor-not-allowed"
                disabled={isLoading}
            />
        </div>
      </div>

      <button
        onClick={onApplyText}
        disabled={isLoading || !isSelectionActive || !options.content.trim() || credits < 1}
        className="w-full max-w-xs mt-2 bg-gradient-to-br from-blue-600 to-blue-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-base disabled:from-gray-600 disabled:to-gray-500 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
      >
        {credits < 1 ? 'Insufficient Credits' : 'Apply Text | 1 Credit'}
      </button>
    </div>
  );
};

export default TextPanel;
