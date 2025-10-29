import React, { useEffect, useRef } from 'react';
import type { Message, UserProfile } from '../types';
import { UserIcon } from './icons/UserIcon';
import { JarvisIcon } from './icons/JarvisIcon';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  userProfile: UserProfile;
}

const ChatMessage: React.FC<{ message: Message; userProfile: UserProfile }> = ({ message, userProfile }) => {
    const isModel = message.role === 'model';
    
    return (
        <div className={`flex w-full items-start gap-4 ${!isModel && 'justify-end'}`}>
            {/* Avatar */}
            <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border ${
                isModel ? 'bg-cyan-900/50 border-cyan-400/30 order-1' : 'bg-slate-700/50 border-gray-500/30 order-2'
            }`}>
                {isModel ? (
                    <JarvisIcon className="h-5 w-5 text-cyan-400" />
                ) : (
                    userProfile.profilePicture ? (
                        <img src={userProfile.profilePicture} alt="User" className="h-full w-full rounded-full object-cover" />
                      ) : (
                        <UserIcon className="h-5 w-5 text-gray-300" />
                      )
                )}
            </div>

            {/* Message Bubble */}
            <div className={`relative prose prose-invert max-w-md p-4 backdrop-blur-sm animate-reveal-message
                ${ isModel
                    ? 'bg-slate-800/60 text-gray-200 order-2'
                    : 'bg-slate-700/50 text-gray-200 order-1'
                }`}
                style={{
                    clipPath: isModel
                        ? 'polygon(0% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 85%)'
                        : 'polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)'
                }}
            >
                 <div className={`absolute inset-0 border ${isModel ? 'border-cyan-500/20' : 'border-gray-500/20'}`}
                    style={{
                        clipPath: isModel
                            ? 'polygon(0% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 85%)'
                            : 'polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)'
                    }}
                ></div>
                {message.parts.split('\n').map((line, i) => (
                    <p key={i} className="my-1 text-gray-200 prose-p:text-gray-200">{line || '\u00A0'}</p> // Use non-breaking space for empty lines
                ))}
            </div>
        </div>
    );
};

const LoadingIndicator = () => (
     <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border bg-cyan-900/50 border-cyan-400/30">
            <JarvisIcon className="h-5 w-5 text-cyan-400" />
        </div>
        <div className="w-20 h-10 mt-1 rounded-lg bg-slate-800/60 border border-cyan-500/20 flex items-center px-3 overflow-hidden">
            <div className="w-full h-1 bg-cyan-900/50 rounded-full relative">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-cyan-400 rounded-full animate-[scanner_2s_infinite_ease-in-out]"></div>
            </div>
            <style>{`
                @keyframes scanner {
                    0% { transform: translateX(-50%); }
                    50% { transform: translateX(200%); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
     </div>
)

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, userProfile }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);
    
    return (
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
           <div className="mx-auto max-w-4xl space-y-4">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg} userProfile={userProfile} />
                ))}
                {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === 'user' && (
                     <LoadingIndicator />
                )}
            </div>
        </div>
    );
};