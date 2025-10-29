import React, { useState } from 'react';
import { Translation } from '../utils/translations';

interface LoginScreenProps {
  onLogin: () => void;
  isVisible: boolean;
  t: Translation;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, isVisible, t }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="w-full max-w-sm rounded-lg border border-cyan-400/20 bg-slate-900/50 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-md">
        <h1 className="mb-2 text-center text-3xl font-bold text-cyan-300 tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 8px rgba(0, 255, 255, 0.5)' }}>
          JARVIS
        </h1>
        <p className="mb-8 text-center text-sm text-gray-400">{t.loginPrompt}</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-cyan-400">
              {t.starkIndustriesId}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={t.emailPlaceholder}
              className="mt-1 block w-full rounded-md border-cyan-400/30 bg-slate-800 px-3 py-2 text-white placeholder-gray-500 shadow-sm focus:border-cyan-400 focus:outline-none focus:ring-cyan-400 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-cyan-400">
              {t.password}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="mt-1 block w-full rounded-md border-cyan-400/30 bg-slate-800 px-3 py-2 text-white placeholder-gray-500 shadow-sm focus:border-cyan-400 focus:outline-none focus:ring-cyan-400 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            {t.authenticate}
          </button>
        </form>
      </div>
    </div>
  );
};