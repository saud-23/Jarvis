import React, { useState, useRef, useEffect } from 'react';
import { SendIcon } from './icons/SendIcon';
import { PaperclipIcon } from './icons/PaperclipIcon';
import { XIcon } from './icons/XIcon';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { StopIcon } from './icons/StopIcon';
import { Translation } from '../utils/translations';

interface MessageInputProps {
    onSendMessage: (text: string, files: File[]) => void;
    isLoading: boolean;
    isProMember: boolean;
    uploadsLeft: number;
    toggleVoiceSession: () => void;
    isVoiceSessionActive: boolean;
    t: Translation;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading, isProMember, uploadsLeft, toggleVoiceSession, isVoiceSessionActive, t }) => {
    const [text, setText] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isFileUploadDisabled = !isProMember && uploadsLeft <= 0;

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(prev => [...prev, ...Array.from(event.target.files as FileList)]);
        }
        if(fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if ((text.trim() || files.length > 0) && !isLoading) {
            onSendMessage(text, files);
            setText('');
            setFiles([]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as unknown as React.FormEvent);
        }
    };
    
    return (
        <div className="w-full flex-shrink-0 border-t border-cyan-400/20 bg-slate-900/50 px-4 py-3 backdrop-blur-sm sm:px-6">
            <div className="mx-auto max-w-3xl">
                {files.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-2">
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center gap-2 rounded-full bg-cyan-900/70 py-1 pl-3 pr-2 text-sm text-cyan-200 border border-cyan-400/30">
                                <span className="truncate" style={{maxWidth: '120px'}}>{file.name}</span>
                                <button onClick={() => removeFile(index)} className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-700 text-cyan-100 hover:bg-cyan-600">
                                    <XIcon className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                     <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={isLoading || isFileUploadDisabled}
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading || isFileUploadDisabled}
                        title={isFileUploadDisabled ? t.upgradeForUploads : t.attachFiles}
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-cyan-300 transition-colors enabled:hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <PaperclipIcon className="h-5 w-5" />
                    </button>
                    <textarea
                        ref={textareaRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={t.messagePlaceholder}
                        rows={1}
                        className="w-full resize-none rounded-full border border-cyan-400/30 bg-slate-800/50 py-3 pl-6 pr-16 text-gray-200 placeholder-gray-400 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                        style={{ maxHeight: '150px' }}
                        disabled={isLoading}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <button
                            type="submit"
                            disabled={isLoading || (!text.trim() && files.length === 0)}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 text-white transition-all duration-200 enabled:hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <SendIcon className="h-5 w-5" />
                        </button>
                    </div>
                     <button
                        type="button"
                        onClick={toggleVoiceSession}
                        disabled={isLoading && !isVoiceSessionActive}
                        className={`relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300
                            ${isVoiceSessionActive 
                                ? 'bg-red-500 text-white hover:bg-red-600' 
                                : 'bg-slate-700 text-cyan-300 hover:bg-slate-600'
                            }
                        `}
                        title={isVoiceSessionActive ? t.stopListening : t.startListening}
                    >
                         {isVoiceSessionActive && (
                            <span className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-75"></span>
                        )}
                        {isVoiceSessionActive ? <StopIcon className="h-5 w-5" /> : <MicrophoneIcon className="h-5 w-5" />}
                    </button>
                </form>
                <p className="mt-2 text-center text-xs text-gray-500">{t.jarvisDisclaimer}</p>
            </div>
        </div>
    );
};