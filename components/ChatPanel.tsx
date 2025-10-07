/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { type ChatMessage } from '../types';

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ messages, onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const [width, setWidth] = useState(400); // Initial width
  const isResizing = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing.current) {
      // Calculate new width based on mouse position from the right edge
      const newWidth = window.innerWidth - e.clientX;
      // Set constraints for width
      if (newWidth > 300 && newWidth < 800) {
        setWidth(newWidth);
      }
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex" style={{ width: `${width}px` }}>
      <div
        className="w-2 cursor-col-resize bg-gray-700 hover:bg-blue-500 transition-colors"
        onMouseDown={handleMouseDown}
      />
      <div className="flex-grow bg-gray-800 flex flex-col h-[calc(100vh-100px)] border-l border-gray-700">
        <div className="flex-grow p-4 overflow-y-auto">
          <div className="flex flex-col gap-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex flex-col p-3 rounded-lg max-w-xs text-white ${msg.role === 'user' ? 'bg-blue-600 self-end' : 'bg-gray-600 self-start'}`}>
                <p>{msg.content}</p>
              </div>
            ))}
            {isLoading && (
              <div className="p-3 rounded-lg max-w-xs text-white bg-gray-600 self-start animate-pulse">
                <p>Thinking...</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="p-4 border-t border-gray-700">
          <form onSubmit={handleSubmit}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                }
              }}
              placeholder="Describe your edit..."
              disabled={isLoading}
              className="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
              rows={3}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-full mt-2 bg-gradient-to-br from-blue-600 to-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all disabled:from-gray-600 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;