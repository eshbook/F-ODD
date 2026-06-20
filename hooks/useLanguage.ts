import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect } from 'react';

type LanguageState = {
  language: 'ar' | 'en';
  direction: 'rtl' | 'ltr';
  setLanguage: (lang: 'ar' | 'en') => void;
  toggle: () => void;
};

// Simplified translation mechanism for now
const translations = {
  en: {
    welcome: 'Welcome to Fardy ODD',
    login: 'Login',
    register: 'Register',
    dashboard: 'Dashboard',
    // ... add more as needed
  },
  ar: {
    welcome: 'مرحباً بك في فردي',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    dashboard: 'لوحة التحكم',
    // ... add more as needed
  }
} as const;

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      direction: 'ltr',
      setLanguage: (lang) => set({ language: lang, direction: lang === 'ar' ? 'rtl' : 'ltr' }),
      toggle: () => set((state) => {
        const nextLang = state.language === 'en' ? 'ar' : 'en';
        return { language: nextLang, direction: nextLang === 'ar' ? 'rtl' : 'ltr' };
      })
    }),
    { name: 'language-store' }
  )
);

export const useLanguage = () => {
  const { language, direction, toggle, setLanguage } = useLanguageStore();

  useEffect(() => {
    // Update document direction for RTL support when language changes
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  const t = (key: keyof typeof translations['en']): string => {
    return translations[language][key] || key;
  };

  return { language, direction, toggle, setLanguage, t };
};
