/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { WalletIcon, LogoutIcon, UserCircleIcon, CogIcon } from './icons';

interface HeaderProps {
    user: { name: string; credits: number; } | null;
    onLogout: () => void;
    onBuyCredits: () => void;
    onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onBuyCredits, onOpenSettings }) => {
  return (
    <header className="w-full py-2 px-4 sm:px-6 border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50 flex-shrink-0">
      <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-gray-100">
                Photronic
            </h1>
          </div>
          {user && (
            <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 bg-black/20 p-2 pr-3 rounded-full border border-gray-700">
                    <WalletIcon className="w-5 h-5 text-green-400"/>
                    <span className="font-semibold text-gray-200 text-sm">{user.credits} Credits</span>
                </div>
                <button 
                    onClick={onBuyCredits}
                    className="hidden sm:block bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full text-sm transition-colors"
                >
                    Buy Credits
                </button>
                 <div className="h-8 w-px bg-gray-600 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                    <UserCircleIcon className="w-6 h-6 text-gray-400" />
                    <span className="hidden sm:block font-medium text-gray-300">{user.name}</span>
                </div>
                <button 
                    onClick={onOpenSettings}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Settings"
                >
                    <CogIcon className="w-5 h-5 text-gray-400" />
                </button>
                <button 
                    onClick={onLogout}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Logout"
                >
                    <LogoutIcon className="w-5 h-5 text-gray-400" />
                </button>
            </div>
          )}
      </div>
    </header>
  );
};

export default Header;