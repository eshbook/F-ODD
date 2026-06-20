'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { language, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
      aria-label="Toggle language"
    >
      <Globe size={16} />
      <span>{language === 'en' ? 'AR' : 'EN'}</span>
    </button>
  );
}
