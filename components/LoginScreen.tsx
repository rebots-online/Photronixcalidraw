/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useCallback, useState } from 'react';
import { GoogleIcon, LightningIcon } from './icons';
import { requestProvider } from 'webln';

interface LoginScreenProps {
  onLogin: (user: { name: string; credits: number }) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [error, setError] = useState('');

    const handleWebLNLogin = useCallback(async () => {
        setError('');
        try {
            const webln = await requestProvider();
            const { publicKey } = await webln.getInfo();
            // In a real app, you would verify this pubkey with a backend to get user data
            onLogin({ name: `LN User ${publicKey.slice(0, 6)}...`, credits: 50 });
        } catch (err) {
            console.error("Failed to connect with WebLN:", err);
            setError('Could not connect to WebLN. Make sure you have a compatible browser extension (e.g., Alby) installed and enabled.');
        }
    }, [onLogin]);
  
  return (
    <div className="w-full max-w-2xl mx-auto text-center p-8 animate-fade-in">
        <div className="flex flex-col items-center gap-6">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-100 sm:text-6xl">
                Welcome to <span className="text-blue-400">Pixshop</span>
            </h1>
            <p className="max-w-xl text-lg text-gray-400">
                Log in to start editing your photos with powerful AI tools.
            </p>
            
            <div className="mt-8 w-full max-w-sm flex flex-col items-center gap-4">
                <button 
                    onClick={() => onLogin({ name: 'Demo User', credits: 25 })}
                    className="w-full inline-flex items-center justify-center px-6 py-4 text-lg font-bold text-white bg-gray-700 rounded-lg group hover:bg-gray-600 transition-colors"
                >
                    <GoogleIcon className="w-6 h-6 mr-4" />
                    Continue with Google
                </button>
                 <button 
                    onClick={handleWebLNLogin}
                    className="w-full inline-flex items-center justify-center px-6 py-4 text-lg font-bold text-gray-800 bg-yellow-400 rounded-lg group hover:bg-yellow-300 transition-colors"
                >
                    <LightningIcon className="w-6 h-6 mr-4" />
                    Continue with Lightning
                </button>
                 <button 
                    onClick={() => onLogin({ name: 'Guest', credits: 5 })}
                    className="mt-4 text-sm text-gray-400 hover:text-white transition-colors"
                >
                    Continue as Guest (5 free credits)
                </button>
            </div>
            {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        </div>
    </div>
  );
};

export default LoginScreen;
