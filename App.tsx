import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { Chat } from '@google/genai';
// Fix: Removed non-existent LiveSession import.
import { GoogleGenAI, Modality, Blob as GenaiBlob } from '@google/genai';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { MessageInput } from './components/MessageInput';
import { IntroScreen } from './components/IntroScreen';
import { MenuIcon } from './components/icons/MenuIcon';
import type { Message, ChatHistoryItem, UserProfile } from './types';
import { createChatSession, createLiveSession } from './services/geminiService';
import { ProfileModal } from './components/ProfileModal';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/LoginScreen';
import { MembershipModal } from './components/MembershipModal';
import { PaymentModal } from './components/PaymentModal';
import { useTranslations } from './hooks/useTranslations';
import { encode, decode, decodeAudioData } from './utils/audioUtils';

type AppState = 'loading' | 'welcome' | 'login' | 'intro' | 'chat';
const UPLOAD_LIMIT = 5; // 5 uploads
const UPLOAD_WINDOW = 10 * 60 * 60 * 1000; // 10 hours in ms

function App() {
  const [appState, setAppState] = useState<AppState>('loading');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: 'Tony Stark',
    profilePicture: null,
    isProMember: false,
    voice: 'Zephyr',
    language: 'en',
  });
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isMembershipModalOpen, setMembershipModalOpen] = useState(false);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  
  const [uploadCount, setUploadCount] = useState(0);
  const [firstUploadTime, setFirstUploadTime] = useState<number | null>(null);
  
  const [isVoiceSessionActive, setVoiceSessionActive] = useState(false);
  // Fix: Inferred session promise type from createLiveSession function.
  const sessionPromise = useRef<ReturnType<typeof createLiveSession> | null>(null);
  const inputAudioContext = useRef<AudioContext | null>(null);
  const outputAudioContext = useRef<AudioContext | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const scriptProcessor = useRef<ScriptProcessorNode | null>(null);
  const nextStartTime = useRef(0);
  const audioSources = useRef<Set<AudioBufferSourceNode>>(new Set());

  const translations = useTranslations(userProfile.language);
  const chatSessions = useRef<Record<string, Chat>>({});

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      // Merge saved profile with defaults to ensure new fields are present
      setUserProfile(prev => ({...prev, ...JSON.parse(savedProfile)}));
    }
    
    if (isLoggedIn) {
      setAppState('intro');
    } else {
      setAppState('welcome');
    }

    const savedUploadCount = localStorage.getItem('uploadCount');
    const savedFirstUploadTime = localStorage.getItem('firstUploadTime');
    const now = Date.now();

    if (savedFirstUploadTime && (now - parseInt(savedFirstUploadTime, 10) < UPLOAD_WINDOW)) {
        setUploadCount(parseInt(savedUploadCount || '0', 10));
        setFirstUploadTime(parseInt(savedFirstUploadTime, 10));
    } else {
        localStorage.removeItem('uploadCount');
        localStorage.removeItem('firstUploadTime');
    }

  }, []);

  const handleNewChat = useCallback(() => {
    const newChatId = Date.now().toString();
    const newChatSession = createChatSession(userProfile.language, translations);
    chatSessions.current[newChatId] = newChatSession;

    const newChatItem: ChatHistoryItem = {
      id: newChatId,
      title: translations.newChat,
      messages: [{
        role: 'model',
        parts: translations.welcomeMessage,
      }],
    };
    
    setChatHistory(prev => [newChatItem, ...prev]);
    setActiveChatId(newChatId);
  }, [userProfile.language, translations]);
  
  useEffect(() => {
    // This effect now only ensures a chat exists when the app is ready.
    // The transition from 'intro' to 'chat' is handled by handleIntroComplete.
    if (appState === 'intro' && chatHistory.length === 0) {
      handleNewChat();
    }
  }, [appState, chatHistory.length, handleNewChat]);

  const handleGetStarted = () => setAppState('login');
  
  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setAppState('intro');
  };

  const handleIntroComplete = () => {
    setAppState('chat');
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
  };

  const handleProfileUpdate = (newProfile: UserProfile) => {
    const updatedProfile = { ...userProfile, ...newProfile };
    setUserProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setProfileModalOpen(false);
  };

  const handleSendMessage = useCallback(async (text: string, files: File[]) => {
    if ((!text.trim() && files.length === 0) || !activeChatId || !chatSessions.current[activeChatId]) return;

    if (files.length > 0 && !userProfile.isProMember) {
        const now = Date.now();
        let currentUploadCount = uploadCount;
        let currentFirstUploadTime = firstUploadTime;

        if (!currentFirstUploadTime || (now - currentFirstUploadTime > UPLOAD_WINDOW)) {
            currentFirstUploadTime = now;
            currentUploadCount = 0;
            setFirstUploadTime(currentFirstUploadTime);
            localStorage.setItem('firstUploadTime', currentFirstUploadTime.toString());
        }

        if (currentUploadCount >= UPLOAD_LIMIT) {
             alert(translations.uploadLimitReached);
             return;
        }

        const newCount = currentUploadCount + files.length;
        setUploadCount(newCount);
        localStorage.setItem('uploadCount', newCount.toString());
    }
    
    const fileInfo = files.length > 0 ? `\n\n[${translations.attachedFiles}: ${files.map(f => f.name).join(', ')}]` : '';
    const messageContent = text + fileInfo;
    const userMessage: Message = { role: 'user', parts: messageContent };

    const currentChat = chatHistory.find(c => c.id === activeChatId);
    if (currentChat && currentChat.messages.length === 1) { // Only greeting message
      const newTitle = text.length > 30 ? text.substring(0, 27) + '...' : text;
      setChatHistory(prev => prev.map(chat =>
        chat.id === activeChatId ? { ...chat, title: newTitle, messages: [...chat.messages, userMessage] } : chat
      ));
    } else {
       setChatHistory(prev => prev.map(chat => 
        chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, userMessage] }
            : chat
      ));
    }
    
    setIsLoading(true);
    
    try {
      const stream = await chatSessions.current[activeChatId].sendMessageStream({ message: text });
      
      let fullResponse = '';
      setChatHistory(prev => prev.map(chat => 
          chat.id === activeChatId
              ? { ...chat, messages: [...chat.messages, { role: 'model', parts: '' }] }
              : chat
      ));

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        fullResponse += chunkText;
        setChatHistory(prev => prev.map(chat => {
          if (chat.id === activeChatId) {
            const newMessages = [...chat.messages];
            newMessages[newMessages.length - 1].parts = fullResponse;
            return { ...chat, messages: newMessages };
          }
          return chat;
        }));
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = translations.errorSendingMessage;
      setChatHistory(prev => prev.map(chat => {
          if (chat.id === activeChatId) {
            const newMessages = [...chat.messages];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.role === 'model') {
                lastMessage.parts = errorMessage;
            } else {
                newMessages.push({ role: 'model', parts: errorMessage });
            }
            return { ...chat, messages: newMessages };
          }
          return chat;
      }));
    } finally {
      setIsLoading(false);
    }
  }, [activeChatId, chatHistory, userProfile.isProMember, uploadCount, firstUploadTime, translations]);
  
  const handleUpgradeToPro = () => {
    setUserProfile(prev => {
      const newProfile = { ...prev, isProMember: true };
      localStorage.setItem('userProfile', JSON.stringify(newProfile));
      return newProfile;
    });
    setPaymentModalOpen(false);
    setMembershipModalOpen(false);
    setUploadCount(0);
    setFirstUploadTime(null);
    localStorage.removeItem('uploadCount');
    localStorage.removeItem('firstUploadTime');
  };

  const stopVoiceSession = useCallback(async () => {
    if (sessionPromise.current) {
        const session = await sessionPromise.current;
        session.close();
        sessionPromise.current = null;
    }
    mediaStream.current?.getTracks().forEach(track => track.stop());
    scriptProcessor.current?.disconnect();
    inputAudioContext.current?.close();
    outputAudioContext.current?.close();

    audioSources.current.forEach(source => source.stop());
    audioSources.current.clear();
    
    mediaStream.current = null;
    scriptProcessor.current = null;
    inputAudioContext.current = null;
    outputAudioContext.current = null;
    setVoiceSessionActive(false);
  }, []);

  const startVoiceSession = useCallback(async () => {
    try {
        setVoiceSessionActive(true);
        mediaStream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Fix: Use a cross-browser compatible way to instantiate AudioContext.
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        inputAudioContext.current = new AudioContext({ sampleRate: 16000 });
        outputAudioContext.current = new AudioContext({ sampleRate: 24000 });

        const systemInstruction = translations.systemInstruction.replace('{language}', new Intl.DisplayNames([userProfile.language], { type: 'language' }).of(userProfile.language) || 'English');
        
        sessionPromise.current = createLiveSession(userProfile.voice, systemInstruction, {
            onopen: () => {
                const source = inputAudioContext.current!.createMediaStreamSource(mediaStream.current!);
                scriptProcessor.current = inputAudioContext.current!.createScriptProcessor(4096, 1, 1);
                
                scriptProcessor.current.onaudioprocess = (audioProcessingEvent) => {
                    const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                    const pcmBlob: GenaiBlob = {
                        data: encode(new Uint8Array(new Int16Array(inputData.map(f => f * 32768)).buffer)),
                        mimeType: 'audio/pcm;rate=16000',
                    };
                    sessionPromise.current?.then((session) => {
                        session.sendRealtimeInput({ media: pcmBlob });
                    });
                };

                source.connect(scriptProcessor.current);
                scriptProcessor.current.connect(inputAudioContext.current!.destination);
            },
            onmessage: async (message) => {
                const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData.data;
                if (audioData && outputAudioContext.current) {
                    nextStartTime.current = Math.max(nextStartTime.current, outputAudioContext.current.currentTime);
                    const audioBuffer = await decodeAudioData(decode(audioData), outputAudioContext.current, 24000, 1);
                    const source = outputAudioContext.current.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(outputAudioContext.current.destination);
                    source.addEventListener('ended', () => {
                        audioSources.current.delete(source);
                    });
                    source.start(nextStartTime.current);
                    nextStartTime.current += audioBuffer.duration;
                    audioSources.current.add(source);
                }
                 if (message.serverContent?.interrupted) {
                    audioSources.current.forEach(source => source.stop());
                    audioSources.current.clear();
                    nextStartTime.current = 0;
                }
            },
            onerror: (e) => {
                console.error('Voice session error:', e);
                stopVoiceSession();
            },
            onclose: () => {
                // No need to call stopVoiceSession here to avoid loops
            },
        });

    } catch (error) {
        console.error("Failed to start voice session:", error);
        alert(translations.microphonePermissionError);
        setVoiceSessionActive(false);
    }
  }, [userProfile.voice, userProfile.language, stopVoiceSession, translations]);

  const toggleVoiceSession = useCallback(() => {
    if (isVoiceSessionActive) {
      stopVoiceSession();
    } else {
      startVoiceSession();
    }
  }, [isVoiceSessionActive, startVoiceSession, stopVoiceSession]);

  const activeChat = chatHistory.find(chat => chat.id === activeChatId);
  const messages = activeChat ? activeChat.messages : [];
  
  if (appState === 'loading') {
    return null; // Render nothing while checking localStorage
  }

  const uploadsLeft = UPLOAD_LIMIT - uploadCount;

  return (
    <>
      <WelcomeScreen isVisible={appState === 'welcome'} onGetStarted={handleGetStarted} t={translations} />
      <LoginScreen isVisible={appState === 'login'} onLogin={handleLogin} t={translations} />
      <IntroScreen isVisible={appState === 'intro'} onIntroComplete={handleIntroComplete} username={userProfile.username} />
       <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        userProfile={userProfile}
        onSave={handleProfileUpdate}
        onOpenUpgradeModal={() => {
            setProfileModalOpen(false);
            setMembershipModalOpen(true);
        }}
        uploadsLeft={uploadsLeft}
        t={translations}
      />
      <MembershipModal
        isOpen={isMembershipModalOpen}
        onClose={() => setMembershipModalOpen(false)}
        onProceedToPayment={() => {
            setMembershipModalOpen(false);
            setPaymentModalOpen(true);
        }}
        t={translations}
       />
       <PaymentModal 
         isOpen={isPaymentModalOpen}
         onClose={() => setPaymentModalOpen(false)}
         onConfirmPayment={handleUpgradeToPro}
         t={translations}
       />
      <div className={`relative h-screen w-full text-gray-200 transform-gpu transition-all duration-700 ease-in-out ${appState !== 'chat' ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
        <div className="hud-corner hud-corner-top-left"></div>
        <div className="hud-corner hud-corner-top-right"></div>
        <div className="hud-corner hud-corner-bottom-left"></div>
        <div className="hud-corner hud-corner-bottom-right"></div>

        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setSidebarOpen}
          chatHistory={chatHistory}
          activeChatId={activeChatId}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          userProfile={userProfile}
          onOpenProfileModal={() => setProfileModalOpen(true)}
          t={translations}
        />
        <main className={`flex h-full flex-col transition-all duration-300 ${isSidebarOpen ? 'md:pl-64' : 'pl-0'}`}>
          <header className="flex h-16 flex-shrink-0 items-center border-b border-cyan-400/20 px-4 bg-slate-900/50 backdrop-blur-sm">
             <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-cyan-300 hover:text-white">
                <MenuIcon className="h-6 w-6" />
            </button>
            <h1 className="ml-4 text-lg font-bold tracking-widest text-cyan-300" style={{fontFamily: 'Orbitron, sans-serif'}}>JARVIS</h1>
          </header>
          <div className="flex flex-1 flex-col overflow-hidden">
            <ChatWindow messages={messages} isLoading={isLoading} userProfile={userProfile} />
            <MessageInput 
              onSendMessage={handleSendMessage} 
              isLoading={isLoading || isVoiceSessionActive} 
              isProMember={userProfile.isProMember}
              uploadsLeft={uploadsLeft}
              toggleVoiceSession={toggleVoiceSession}
              isVoiceSessionActive={isVoiceSessionActive}
              t={translations}
            />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;