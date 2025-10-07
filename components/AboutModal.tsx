/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { CloseIcon } from './icons';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-800/80 border border-gray-700 rounded-2xl p-8 max-w-lg w-full text-white shadow-2xl m-4 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <CloseIcon className="w-6 h-6 text-gray-400" />
        </button>

        <div className="text-center flex flex-col items-center gap-4">
            <h2 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-300 animate-pulse">
                Photronic
            </h2>
            <p className="text-lg font-semibold text-gray-300">Photo Editor</p>
            <p className="mt-4 text-gray-400">
                Version 2.0 - "Excalidraw Edition"
            </p>
            <p className="text-sm text-gray-500">
                A conversational, AI-powered creative canvas.
            </p>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;