import { translations, Translation } from '../utils/translations';

export const useTranslations = (language: string): Translation => {
  return translations[language] || translations.en;
};
