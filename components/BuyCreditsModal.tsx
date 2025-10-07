/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { CloseIcon, LightningIcon } from './icons';

interface BuyCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (amount: number) => void;
}

const BuyCreditsModal: React.FC<BuyCreditsModalProps> = ({ isOpen, onClose, onPurchase }) => {
  if (!isOpen) {
    return null;
  }

  const creditPackages = [
    { credits: 50, price: 4.99, popular: false },
    { credits: 120, price: 9.99, popular: true },
    { credits: 300, price: 19.99, popular: false },
  ];
  
  const handlePurchase = (credits: number) => {
    // In a real app, this would trigger a payment flow
    console.log(`Purchasing ${credits} credits...`);
    onPurchase(credits);
    alert(`${credits} credits have been added to your account!`);
  }

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

        <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-100">Get More Credits</h2>
            <p className="mt-2 text-gray-400">Choose a package to continue creating with AI.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {creditPackages.map((pkg) => (
                <div 
                    key={pkg.credits}
                    className={`relative bg-gray-900/50 p-6 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:border-blue-500 hover:scale-105 ${pkg.popular ? 'border-blue-500' : 'border-gray-700'}`}
                    onClick={() => handlePurchase(pkg.credits)}
                >
                    {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                            Popular
                        </div>
                    )}
                    <div className="text-center">
                        <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{pkg.credits}</p>
                        <p className="text-lg font-semibold text-gray-200">Credits</p>
                        <p className="mt-4 text-lg font-bold text-white">${pkg.price.toFixed(2)}</p>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z"/></svg>
                Pay with Card (Demo)
            </button>
            <button className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                <LightningIcon className="w-5 h-5" />
                Pay with Lightning (Demo)
            </button>
        </div>

      </div>
    </div>
  );
};

export default BuyCreditsModal;
