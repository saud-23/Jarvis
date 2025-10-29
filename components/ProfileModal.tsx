import React, { useState, useRef, useEffect } from 'react';
import type { UserProfile } from '../types';
import { UserIcon } from './icons/UserIcon';
import { XIcon } from './icons/XIcon';
import { Translation, availableLanguages, availableVoices } from '../utils/translations';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: UserProfile) => void;
  userProfile: UserProfile;
  onOpenUpgradeModal: () => void;
  uploadsLeft: number;
  t: Translation;
}

const RadialProgress: React.FC<{ progress: number }> = ({ progress }) => {
    const strokeWidth = 8;
    const size = 80;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="absolute top-0 left-0" width={size} height={size}>
                <circle
                    className="text-slate-700"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="text-cyan-400"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                />
            </svg>
            <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center text-lg font-bold text-cyan-300">
                {Math.round((progress / 100) * 5)}/5
            </div>
        </div>
    );
};

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onSave, userProfile, onOpenUpgradeModal, uploadsLeft, t }) => {
  const [username, setUsername] = useState(userProfile.username);
  const [profilePicture, setProfilePicture] = useState<string | null>(userProfile.profilePicture);
  const [voice, setVoice] = useState(userProfile.voice);
  const [language, setLanguage] = useState(userProfile.language);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
        setUsername(userProfile.username);
        setProfilePicture(userProfile.profilePicture);
        setVoice(userProfile.voice);
        setLanguage(userProfile.language);
    }
  }, [isOpen, userProfile]);

  if (!isOpen) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({ ...userProfile, username, profilePicture, voice, language });
  };
  
  const customSelectStyle = "mt-1 block w-full rounded-md border-cyan-400/30 bg-slate-800 py-2 pl-3 pr-10 text-base text-gray-200 focus:border-cyan-400 focus:outline-none focus:ring-cyan-400 sm:text-sm";
  const customInputStyle = "mt-1 block w-full rounded-md border-cyan-400/30 bg-slate-800 shadow-sm focus:border-cyan-400 focus:ring-cyan-400 sm:text-sm text-gray-200";
  const customButtonStyle = "rounded-md border border-cyan-400/30 bg-slate-800/50 px-3 py-2 text-sm font-medium text-cyan-300 hover:bg-cyan-900/50 hover:border-cyan-400/60 transition-all duration-200";

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-lg rounded-lg bg-slate-900/80 border-2 border-cyan-400/20 p-6 shadow-2xl shadow-cyan-500/10" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-cyan-400/50 hover:text-cyan-300">
          <XIcon className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-bold text-cyan-300 tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif'}}>{t.profileSettings}</h2>
        
        <div className="mt-6 space-y-6">
          <div className="flex items-center gap-6">
             <div className="relative h-24 w-24">
                <div className="absolute inset-0 bg-slate-700" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}></div>
                <div className="absolute inset-1.5 flex items-center justify-center overflow-hidden" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
                    {profilePicture ? (
                      <img src={profilePicture} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <UserIcon className="h-10 w-10 text-cyan-300" />
                    )}
                </div>
              </div>
              <div className="flex-1">
                 <label className="block text-sm font-medium text-cyan-400">{t.profilePicture}</label>
                 <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                 <button type="button" onClick={() => fileInputRef.current?.click()} className={`${customButtonStyle} mt-2`}>{t.change}</button>
              </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-cyan-400">{t.username}</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className={customInputStyle} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                 <label htmlFor="voice" className="block text-sm font-medium text-cyan-400">{t.voiceSelection}</label>
                 <select id="voice" value={voice} onChange={(e) => setVoice(e.target.value)} className={customSelectStyle}>
                    {availableVoices.map(v => <option key={v.id} value={v.id} className="bg-slate-800 text-gray-200">{v.name}</option>)}
                 </select>
              </div>
               <div>
                 <label htmlFor="language" className="block text-sm font-medium text-cyan-400">{t.language}</label>
                 <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)} className={customSelectStyle}>
                    {Object.entries(availableLanguages).map(([id, name]) => <option key={id} value={id} className="bg-slate-800 text-gray-200">{name}</option>)}
                 </select>
              </div>
          </div>

           <div className="border-t border-cyan-400/20 pt-6">
            <h3 className="text-lg font-semibold text-cyan-300 tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif'}}>{t.membership}</h3>
            <div className="mt-2 rounded-lg border border-cyan-400/20 bg-slate-800/50 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-gray-200">{t.currentPlan}: <span className={userProfile.isProMember ? "text-yellow-400" : "text-cyan-400"}>{userProfile.isProMember ? t.proMembershipTitle : t.freeTier}</span></p>
                         {!userProfile.isProMember && (<p className="text-sm text-gray-400">{t.uploadsRemaining(uploadsLeft)}</p>)}
                    </div>
                    {userProfile.isProMember ? (
                         <div className="flex items-center gap-2">
                             <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                             <span className="font-medium text-green-400">{t.active}</span>
                         </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <RadialProgress progress={(uploadsLeft / 5) * 100} />
                            <button onClick={onOpenUpgradeModal} className="rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-cyan-700 transition-colors">{t.upgradeToPro}</button>
                        </div>
                    )}
                </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button type="button" onClick={onClose} className={customButtonStyle}>{t.cancel}</button>
          <button type="button" onClick={handleSave} className="rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 transition-colors">{t.saveChanges}</button>
        </div>
      </div>
    </div>
  );
};