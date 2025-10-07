/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import type { ExcalidrawElement, ExcalidrawInitialDataState } from '@excalidraw/excalidraw/types/types';
import { getSceneVersion } from '@excalidraw/excalidraw';

import Header from './components/Header';
import LoginScreen from './components/LoginScreen';
import BuyCreditsModal from './components/BuyCreditsModal';
import ChatPanel from './components/ChatPanel';
import MenuBar from './components/MenuBar';
import SettingsModal from './components/SettingsModal';
import AboutModal from './components/AboutModal';

import { type ChatMessage, type LLMConfig } from './types';
import { generateChatResponse } from './services/geminiService';

const Excalidraw = lazy(() => import('@excalidraw/excalidraw'));

type User = { name: string; credits: number };

// Helper to read a file as a data URL
const fileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isBuyCreditsModalOpen, setIsBuyCreditsModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    
    const [initialData, setInitialData] = useState<ExcalidrawInitialDataState | null>(null);
    const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);

    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [isChatLoading, setIsChatLoading] = useState(false);

    const [llmConfig, setLlmConfig] = useState<LLMConfig>({
        provider: 'gemini',
        gemini: { apiKey: '' },
        openAI: { apiKey: '', endpoint: 'https://openrouter.ai/api/v1', model: 'gpt-3.5-turbo' },
    });

    const resetEditorState = useCallback(() => {
        setChatMessages([]);
        if (excalidrawAPI) {
            excalidrawAPI.resetScene();
        }
    }, [excalidrawAPI]);

    const handleLogin = useCallback((newUser: User) => {
        setUser(newUser);
        resetEditorState();
    }, [resetEditorState]);

    const handleLogout = useCallback(() => {
        setUser(null);
        resetEditorState();
    }, [resetEditorState]);

    const handlePurchaseCredits = useCallback((amount: number) => {
        setUser(prev => prev ? { ...prev, credits: prev.credits + amount } : null);
        setIsBuyCreditsModalOpen(false);
    }, []);

    const handleImageUpload = useCallback(async (file: File) => {
        if (!excalidrawAPI) return;

        const dataURL = await fileToDataURL(file);
        const image = await new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = dataURL;
        });

        const imageElement: ExcalidrawElement = {
            id: `image-${Date.now()}`,
            type: 'image',
            x: 0,
            y: 0,
            width: image.naturalWidth,
            height: image.naturalHeight,
            fileId: file.name,
            isDeleted: false,
            locked: true,
            angle: 0,
            version: 1,
            versionNonce: 0,
            seed: 0,
            groupIds: [],
            strokeColor: 'transparent',
            backgroundColor: 'transparent',
            fillStyle: 'hachure',
            strokeWidth: 1,
            strokeStyle: 'solid',
            roughness: 1,
            opacity: 100,
            strokeSharpness: 'sharp',
        };

        excalidrawAPI.addFiles([{
            name: file.name,
            mimeType: file.type,
            dataURL,
            id: file.name
        }]);
        excalidrawAPI.addElements([imageElement]);
        excalidrawAPI.zoomToFit(excalidrawAPI.getSceneElements(), 0.9);
    }, [excalidrawAPI]);

    const handleSendMessage = async (message: string) => {
        if (!message.trim()) return;

        const userMessage: ChatMessage = { role: 'user', content: message };
        setChatMessages(prev => [...prev, userMessage]);
        setIsChatLoading(true);

        try {
            const sceneElements = excalidrawAPI?.getSceneElements() || [];
            // In a real implementation, you'd pass the scene data to the LLM
            // const sceneJson = JSON.stringify(sceneElements);
            
            const responseContent = await generateChatResponse(
                [...chatMessages, userMessage], 
                llmConfig
            );
            
            const aiMessage: ChatMessage = { role: 'model', content: responseContent };
            setChatMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            const errorMesssage: ChatMessage = { role: 'model', content: `Error: ${errorMessage}`};
            setChatMessages(prev => [...prev, errorMesssage]);
        } finally {
            setIsChatLoading(false);
        }
    };
    
    // Dynamically load Excalidraw to avoid SSR issues
    const ExcalidrawWrapper = () => (
        <Excalidraw
            excalidrawAPI={(api: any) => setExcalidrawAPI(api)}
            initialData={initialData}
            onChange={(elements: readonly ExcalidrawElement[]) => {
                // You can track changes here if needed
                // console.log("Scene updated, version:", getSceneVersion(elements));
            }}
            UIOptions={{
                canvasActions: {
                    loadScene: false, // We use our own file handling
                }
            }}
            theme="dark"
        />
    );


    return (
        <div className="min-h-screen text-gray-100 flex flex-col bg-gray-900">
            <Header
                user={user}
                onLogout={handleLogout}
                onBuyCredits={() => setIsBuyCreditsModalOpen(true)}
                onOpenSettings={() => setIsSettingsModalOpen(true)}
            />
            
            {!user ? (
                <main className="flex-grow flex items-center justify-center">
                    <LoginScreen onLogin={handleLogin} />
                </main>
            ) : (
                <>
                    <MenuBar onUpload={handleImageUpload} onAbout={() => setIsAboutModalOpen(true)} />
                    <main className="flex-grow flex w-full overflow-hidden">
                        <div className="flex-grow h-[calc(100vh-100px)] relative">
                             <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><p>Loading Canvas...</p></div>}>
                                <ExcalidrawWrapper />
                             </Suspense>
                        </div>
                        <ChatPanel
                            messages={chatMessages}
                            onSendMessage={handleSendMessage}
                            isLoading={isChatLoading}
                        />
                    </main>
                </>
            )}

            <BuyCreditsModal
                isOpen={isBuyCreditsModalOpen}
                onClose={() => setIsBuyCreditsModalOpen(false)}
                onPurchase={handlePurchaseCredits}
            />
            <SettingsModal
                isOpen={isSettingsModalOpen}
                onClose={() => setIsSettingsModalOpen(false)}
                config={llmConfig}
                onConfigChange={setLlmConfig}
            />
            <AboutModal
                isOpen={isAboutModalOpen}
                onClose={() => setIsAboutModalOpen(false)}
            />
        </div>
    );
};

export default App;