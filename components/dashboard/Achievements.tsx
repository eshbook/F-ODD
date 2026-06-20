'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { Award, Zap, Flame, Star, Trophy } from 'lucide-react';
import * as motion from 'motion/react-client';
import { useState, useEffect } from 'react';

const MOCK_ACHIEVEMENTS = [
  {
    id: 'streak-7',
    icon: Flame,
    color: 'text-orange-500',
    bgColor: 'bg-orange-100',
    en: { title: '7-Day Streak', desc: 'Maintained routines for a week.' },
    ar: { title: 'سلسلة 7 أيام', desc: 'الحفاظ على الروتين لمدة أسبوع.' }
  },
  {
    id: 'focus-50',
    icon: Zap,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    en: { title: 'Deep Focus', desc: 'Completed 50 focus sessions.' },
    ar: { title: 'تركيز عميق', desc: 'إكمال 50 جلسة تركيز.' }
  },
  {
    id: 'med-master',
    icon: Star,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100',
    en: { title: 'Consistent Tracker', desc: 'Logged meds 30 days in a row.' },
    ar: { title: 'متتبع ثابت', desc: 'تسجيل الأدوية لمدة 30 يومًا متتالية.' }
  }
];

export default function Achievements() {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex flex-col">
      <div className="flex items-center gap-2 mb-6 text-secondary-500">
        <Trophy size={20} />
        <h3 className="font-serif italic text-xl text-primary-500">
          {isEn ? 'Achievements' : 'الإنجازات'}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {MOCK_ACHIEVEMENTS.map((achievement, idx) => {
          const Icon = achievement.icon;
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center p-4 rounded-[24px] border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className={`w-12 h-12 rounded-full ${achievement.bgColor} ${achievement.color} flex items-center justify-center mb-3 shadow-sm`}>
                <Icon size={24} />
              </div>
              <h4 className="font-bold text-sm text-slate-800 mb-1">
                {isEn ? achievement.en.title : achievement.ar.title}
              </h4>
              <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest">
                {isEn ? achievement.en.desc : achievement.ar.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
