// Fix: Removed non-existent LiveSession import.
import { GoogleGenAI, Chat, Modality, LiveServerMessage } from "@google/genai";
import { Translation } from '../utils/translations';

let ai: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
    if (!ai) {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set");
        }
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
};

export const createChatSession = (language: string, translations: Translation): Chat => {
    const client = getClient();
    const systemInstruction = translations.systemInstruction.replace('{language}', new Intl.DisplayNames([language], { type: 'language' }).of(language) || 'English');
    
    return client.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction,
        },
    });
};

type LiveSessionCallbacks = {
    onopen: () => void;
    onmessage: (message: LiveServerMessage) => Promise<void>;
    onerror: (e: ErrorEvent) => void;
    onclose: (e: CloseEvent) => void;
}

// Fix: Removed explicit 'Promise<LiveSession>' return type to allow for type inference.
export const createLiveSession = (
    voiceName: string,
    systemInstruction: string,
    callbacks: LiveSessionCallbacks
) => {
    const client = getClient();
    return client.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks,
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName } },
            },
            systemInstruction,
        },
    });
};
