import React from 'react';
import { XIcon } from './icons/XIcon';
import { Translation } from '../utils/translations';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToPayment: () => void;
  t: Translation;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onClose, onProceedToPayment, t }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-lg rounded-lg bg-slate-900/80 border-2 border-cyan-400/20 p-8 shadow-2xl shadow-cyan-500/10" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-cyan-400/50 hover:text-cyan-300">
          <XIcon className="h-6 w-6" />
        </button>

        <div className="text-center">
            <h2 className="text-3xl font-bold text-cyan-300 tracking-wider" style={{fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 8px rgba(0, 255, 255, 0.5)'}}>{t.proMembershipTitle}</h2>
            <p className="mt-2 text-gray-400">{t.proMembershipSubtitle}</p>
        </div>
        
        <div className="mt-8 rounded-lg border-2 border-cyan-600 bg-slate-800/50 p-6 shadow-inner shadow-cyan-900/20">
            <div className="flex items-baseline justify-center">
                <span className="text-5xl font-extrabold text-white">$100</span>
                <span className="ml-2 text-xl font-medium text-gray-400">/{t.month}</span>
            </div>
            <ul className="mt-6 space-y-3 text-left text-gray-300">
                <li className="flex items-center gap-3">
                    <CheckIcon />
                    {t.featureUnlimitedUploads}
                </li>
                <li className="flex items-center gap-3">
                    <CheckIcon />
                    {t.featurePriorityAccess}
                </li>
                <li className="flex items-center gap-3">
                    <CheckIcon />
                    {t.featureEnhancedPerformance}
                </li>
                 <li className="flex items-center gap-3">
                    <CheckIcon />
                    {t.featureDedicatedSupport}
                </li>
            </ul>
        </div>
        
        <div className="mt-8">
           <button
            type="button"
            onClick={onProceedToPayment}
            className="w-full rounded-md border border-transparent bg-cyan-600 py-3 px-4 text-lg font-medium text-white shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            {t.proceedToPayment}
          </button>
           <button
            type="button"
            onClick={onClose}
            className="mt-4 w-full rounded-md py-3 px-4 text-sm font-medium text-gray-400 hover:bg-slate-800/50 hover:text-white transition-colors"
          >
            {t.maybeLater}
          </button>
        </div>
      </div>
    </div>
  );
};

const CheckIcon = () => (
    <svg className="h-6 w-6 flex-shrink-0 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);