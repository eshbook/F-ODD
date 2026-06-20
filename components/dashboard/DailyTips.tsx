'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { Lightbulb } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import * as motion from 'motion/react-client';

const DAILY_TIPS = [
  {
    en: {
      title: 'The Pomodoro Technique',
      content: 'Work for 25 minutes, then take a 5-minute break. This helps prevent burnout and maintains high focus.'
    },
    ar: {
      title: 'تقنية بومودورو',
      content: 'اعمل لمدة 25 دقيقة، ثم استرح لمدة 5 دقائق. هذا يساعد على منع الإرهاق ويحافظ على التركيز العالي.'
    }
  },
  {
    en: {
      title: 'Body Doubling',
      content: 'Work alongside someone else, even virtually. The presence of another person can significantly boost productivity.'
    },
    ar: {
      title: 'المضاعفة الجسدية',
      content: 'اعمل بجانب شخص آخر، حتى لو كان ذلك افتراضياً. وجود شخص آخر يمكن أن يعزز إنتاجيتك بشكل كبير.'
    }
  },
  {
    en: {
      title: 'The "Two-Minute" Rule',
      content: 'If a task takes less than two minutes, do it immediately. This prevents small tasks from piling up and causing overwhelm.'
    },
    ar: {
      title: 'قاعدة "الدقيقتين"',
      content: 'إذا كانت المهمة تستغرق أقل من دقيقتين، فقم بها فوراً. هذا يمنع تراكم المهام الصغيرة ويقلل من الشعور بالإرهاق.'
    }
  },
  {
    en: {
      title: 'Visual Timers',
      content: 'Use an analog clock or visual timer app. "Seeing" time pass helps with time blindness, a common ADHD trait.'
    },
    ar: {
      title: 'المؤقتات المرئية',
      content: 'استخدم ساعة تناظرية أو تطبيق مؤقت مرئي. "رؤية" مرور الوقت يساعد في التغلب على العمى الزمني، وهي سمة شائعة في اضطراب فرط الحركة.'
    }
  },
  {
    en: {
      title: 'Break Down Tasks',
      content: 'Instead of writing "Clean house," write "Wipe counters." Breaking tasks into micro-steps reduces paralysis.'
    },
    ar: {
      title: 'تجزئة المهام',
      content: 'بدلاً من كتابة "تنظيف المنزل"، اكتب "مسح الأسطح". تجزئة المهام إلى خطوات ميكروية يقلل من شلل البدء.'
    }
  }
];

export default function DailyTips() {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  const todayTip = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return DAILY_TIPS[dayOfYear % DAILY_TIPS.length];
  }, []);

  if (!isClient) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-secondary-50 text-slate-800 rounded-[32px] p-6 shadow-sm border border-secondary-500/20"
    >
      <div className="flex items-center gap-2 mb-3 text-secondary-600">
        <Lightbulb size={20} />
        <h3 className="font-bold text-[10px] uppercase tracking-widest">
          {isEn ? 'Tip of the Day' : 'نصيحة اليوم'}
        </h3>
      </div>
      <h4 className="font-serif italic text-xl mb-2 text-primary-500">
        {isEn ? todayTip.en.title : todayTip.ar.title}
      </h4>
      <p className="text-slate-600 text-sm leading-relaxed">
        {isEn ? todayTip.en.content : todayTip.ar.content}
      </p>
    </motion.div>
  );
}
