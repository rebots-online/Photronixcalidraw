/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export type LLMProvider = 'gemini' | 'openai';

export interface LLMConfig {
  provider: LLMProvider;
  gemini: {
    apiKey: string;
  };
  openAI: {
    apiKey: string;
    endpoint: string;
    model: string;
  };
}