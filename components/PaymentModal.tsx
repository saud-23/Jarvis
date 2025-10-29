import React from 'react';
import { XIcon } from './icons/XIcon';
import { Translation } from '../utils/translations';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPayment: () => void;
  t: Translation;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onConfirmPayment, t }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-md rounded-lg bg-slate-900/80 border-2 border-cyan-400/20 shadow-2xl shadow-cyan-500/10" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 rounded-t-lg border-b border-cyan-400/20">
             <button onClick={onClose} className="absolute top-4 right-4 text-cyan-400/50 hover:text-cyan-300">
                <XIcon className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-bold text-cyan-300 tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif'}}>{t.securePayment}</h2>
            <p className="mt-1 text-sm text-gray-400">{t.confirmSubscription}</p>
        </div>

        <div className="p-6">
            <div className="rounded-lg bg-slate-800/50 p-4 border border-cyan-400/20">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">{t.proMembershipTitle} ({t.monthly})</span>
                    <span className="font-semibold text-gray-200">$100.00</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-gray-400">{t.taxesAndFees}</span>
                    <span className="font-semibold text-gray-200">$0.00</span>
                </div>
                <hr className="my-3 border-cyan-400/20" />
                <div className="flex justify-between items-center font-bold text-white">
                    <span>{t.total}</span>
                    <span>$100.00</span>
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-sm font-semibold text-cyan-400 mb-3">{t.selectPaymentMethod}</h3>
                <div className="space-y-3">
                    <button className="w-full text-left rounded-md border border-cyan-400/60 bg-slate-700/50 p-3 text-sm font-medium text-cyan-200 shadow-sm ring-2 ring-cyan-400">{t.paymentMethodStarkPay}</button>
                    <button className="w-full text-left rounded-md border border-cyan-400/30 bg-slate-800 p-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-slate-700/50 hover:border-cyan-400/60">{t.paymentMethodUpi}</button>
                    <button className="w-full text-left rounded-md border border-cyan-400/30 bg-slate-800 p-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-slate-700/50 hover:border-cyan-400/60">{t.paymentMethodCard}</button>
                </div>
            </div>

            <div className="mt-8">
                 <button
                    type="button"
                    onClick={onConfirmPayment}
                    className="w-full rounded-md border border-transparent bg-cyan-600 py-3 px-4 text-base font-medium text-white shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                    {t.confirmPayment}
                </button>
            </div>
             <p className="mt-4 text-center text-xs text-gray-500">{t.secureConnection}</p>
        </div>
      </div>
    </div>
  );
};