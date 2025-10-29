import React from 'react';
import { MenuIcon } from './icons/MenuIcon';
import { PlusIcon } from './icons/PlusIcon';
import { UserIcon } from './icons/UserIcon';
import type { ChatHistoryItem, UserProfile } from '../types';
import { Translation } from '../utils/translations';
import { GeminiLogo } from './icons/GeminiLogo';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  chatHistory: ChatHistoryItem[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  userProfile: UserProfile;
  onOpenProfileModal: () => void;
  t: Translation;
}

const HistoryItem: React.FC<{ children: React.ReactNode, onClick: () => void, isActive: boolean }> = ({ children, onClick, isActive }) => (
    <a href="#" onClick={e => {e.preventDefault(); onClick();}} className={`relative block truncate rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-cyan-900/50 text-white' : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'}`}>
        {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-2/3 w-1 bg-cyan-400 rounded-r-full"></div>}
        {children}
    </a>
);


export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, chatHistory, activeChatId, onNewChat, onSelectChat, userProfile, onOpenProfileModal, t }) => {
  return (
    <>
        {/* Overlay for mobile */}
        {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-10 bg-black/80 md:hidden"></div>}

        <aside className={`fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-shrink-0 flex-col bg-slate-900/70 backdrop-blur-md border-r-2 border-cyan-400/20 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-cyan-400/20 px-4">
                <div className="text-lg font-bold text-cyan-300 tracking-widest" style={{fontFamily: 'Orbitron, sans-serif'}}>
                    JARVIS
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 text-cyan-300 hover:text-white md:hidden">
                    <MenuIcon className="h-6 w-6" />
                </button>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto p-4">
                <button 
                  onClick={onNewChat}
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-cyan-400/30 bg-slate-800/50 px-3 py-2 text-sm font-medium text-cyan-300 hover:bg-cyan-900/50 hover:border-cyan-400/60 transition-all duration-200">
                    <PlusIcon className="h-5 w-5" />
                    {t.newChat}
                </button>
                <div className="mt-6 space-y-1">
                    <h3 className="px-3 text-xs font-semibold uppercase text-cyan-500 tracking-wider">{t.history}</h3>
                    {chatHistory.map((chat) => (
                      <HistoryItem 
                        key={chat.id}
                        onClick={() => onSelectChat(chat.id)}
                        isActive={chat.id === activeChatId}
                      >
                        {chat.title}
                      </HistoryItem>
                    ))}
                </div>
            </div>
            <div className="border-t border-cyan-400/20 p-2">
                 <button onClick={onOpenProfileModal} className="flex w-full items-center gap-3 rounded-md p-2 text-left text-sm font-medium text-gray-200 hover:bg-slate-700/50">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 border border-cyan-400/30">
                      {userProfile.profilePicture ? (
                        <img src={userProfile.profilePicture} alt="User" className="h-full w-full rounded-full object-cover" />
                      ) : (
                        <UserIcon className="h-5 w-5 text-cyan-300" />
                      )}
                    </div>
                    <span className="truncate">{userProfile.username}</span>
                </button>
            </div>
            <div className="space-y-2 mb-2 p-4 text-center text-xs text-gray-500">
                <p>Designed & Developed by Saud Khan</p>
                 <a href="https://deepmind.google/technologies/gemini/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
                    <GeminiLogo className="h-4 w-4" />
                    Powered by Gemini
                </a>
            </div>
        </aside>
    </>
  );
};