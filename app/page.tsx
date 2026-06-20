'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { Activity, BrainCircuit, Users, HeartPulse, Sparkles, Smile, Star, Coffee } from 'lucide-react';
import * as motion from "motion/react-client";

export default function Home() {
  const { language } = useLanguage();
  
  const text = {
    en: {
      headline: 'A Cozy Corner For Your Brain',
      subheadline: 'Find your rhythm, connect with kind minds, and build routines that actually work for you in a vibrant community designed for ADHD adults.',
      cta: 'Join the Community',
      altCta: 'Learn More',
    },
    ar: {
      headline: 'ركن دافئ لعقلك',
      subheadline: 'ابحث عن إيقاعك، وتواصل مع عقول لطيفة، وابنِ روتيناً يناسبك حقاً في مجتمع نابض بالحياة مصمم للبالغين المصابين باضطراب فرط الحركة.',
      cta: 'انضم للمجتمع',
      altCta: 'اعرف المزيد',
    }
  };

  const currentText = text[language];

  return (
    <div className="flex-1 flex flex-col items-center justify-center pt-24 pb-20 px-6 overflow-hidden relative selection:bg-secondary-500 selection:text-white">
      
      {/* Vibrant & Cozy Background Blurs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-amber-50/50">
        <div className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] bg-rose-200/40 rounded-full blur-[100px]"></div>
        <div className="absolute top-[20%] -left-[10%] w-[40vw] h-[40vw] bg-amber-300/30 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[60vw] h-[60vw] bg-sky-200/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] bg-emerald-200/30 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-6xl w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-8 flex flex-col items-center"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-sm text-secondary-600 font-bold text-xs uppercase tracking-widest"
          >
            <Sparkles size={16} className="text-amber-500" />
            <span>{language === 'en' ? 'A Warm, Welcoming Space' : 'مساحة دافئة ومرحبة'}</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-serif italic text-slate-800 leading-tight max-w-4xl drop-shadow-sm">
            {currentText.headline}
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            {currentText.subheadline}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-10">
            <Link 
              href="/register" 
              className="w-full sm:w-auto px-10 py-5 bg-secondary-500 hover:bg-secondary-600 text-white rounded-[32px] font-bold text-[13px] uppercase tracking-widest transition-all hover:-translate-y-1 hover:shadow-xl shadow-lg flex items-center justify-center gap-2"
            >
              <HeartPulse size={18} />
              {currentText.cta}
            </Link>
            <Link 
              href="/about" 
              className="w-full sm:w-auto px-10 py-5 bg-white/80 backdrop-blur-md text-slate-700 hover:text-secondary-600 rounded-[32px] font-bold text-[13px] uppercase tracking-widest transition-all hover:-translate-y-1 hover:shadow-md shadow-sm border border-white/50 inline-flex items-center justify-center"
            >
              {currentText.altCta}
            </Link>
          </div>
        </motion.div>

        {/* Vibrant Bento Grid Features */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-32 grid grid-cols-1 md:grid-cols-12 gap-6 w-full"
        >
          <FeatureCard 
            className="md:col-span-6 lg:col-span-5 bg-orange-100 border-orange-200/50 text-orange-950"
            iconWrapper="bg-orange-200/80 text-orange-600"
            icon={<Smile size={28} />}
            title={language === 'en' ? 'Verified Community' : 'مجتمع موثوق'}
            desc={language === 'en' ? 'Connect with others who truly understand. A very cozy, judgment-free zone for you.' : 'تواصل مع من يفهمك حقاً. منطقة مريحة جداً وخالية من الأحكام.'}
          />
          
          <FeatureCard 
            className="md:col-span-6 lg:col-span-7 bg-sky-100 border-sky-200/50 text-sky-950"
            iconWrapper="bg-sky-200/80 text-sky-600"
            icon={<Coffee size={28} />}
            title={language === 'en' ? 'Routine & Focus' : 'النظام والتركيز'}
            desc={language === 'en' ? 'Shared Pomodoro rooms and highly visual routine trackers tailored for ADHD brains.' : 'غرف بومودورو مشتركة ومتتبعات روتين مرئية صُممت خصيصاً لأدمغة ADHD.'}
          />

          <FeatureCard 
            className="md:col-span-6 lg:col-span-4 bg-emerald-100 border-emerald-200/50 text-emerald-950"
            iconWrapper="bg-emerald-200/80 text-emerald-600"
            icon={<Star size={28} />}
            title={language === 'en' ? 'Daily Wins' : 'انتصارات يومية'}
            desc={language === 'en' ? 'Celebrate small milestones with beautiful streak badges to keep momentum going.' : 'احتفل بالنجاحات الصغيرة بأوسمة سلسلة الأيام للحفاظ على استمرارية الإنجاز.'}
          />

          <FeatureCard 
            className="md:col-span-6 lg:col-span-8 bg-rose-100 border-rose-200/50 text-rose-950"
            iconWrapper="bg-rose-200/80 text-rose-600"
            icon={<BrainCircuit size={28} />}
            title={language === 'en' ? 'Specialist Matching' : 'مطابقة المتخصصين'}
            desc={language === 'en' ? 'Find and book sessions with verified ADHD specialists locally and virtually, right when you need them most.' : 'ابحث واحجز جلسات مع متخصصين معتمدين لاضطراب فرط الحركة محلياً وافتراضياً.'}
          />
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  desc, 
  className = "",
  iconWrapper = "" 
}: { 
  icon: React.ReactNode, 
  title: string, 
  desc: string,
  className?: string,
  iconWrapper?: string
}) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, rotate: -0.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`p-10 rounded-[40px] shadow-sm border flex flex-col items-start ${className}`}
    >
      <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center mb-6 shadow-sm rotate-3 ${iconWrapper}`}>
        {icon}
      </div>
      <h3 className="text-3xl font-serif italic mb-4 font-bold">{title}</h3>
      <p className="text-base font-medium opacity-80 leading-relaxed max-w-sm">{desc}</p>
    </motion.div>
  );
}
