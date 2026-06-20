'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { Heart, Brain, Shield, Globe, ArrowRight, ArrowLeft } from 'lucide-react';
import * as motion from 'motion/react-client';
import Link from 'next/link';

export default function AboutPage() {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const content = {
    en: {
      title: 'About Fardy ODD',
      subtitle: 'A sanctuary built for ADHD minds, designed to bridge the gap between neurodivergent living and professional support.',
      missionTitle: 'Our Mission',
      missionDesc: 'Fardy ODD was created with a singular focus: to foster a safe, bilingual, and genuinely supportive community for adults with ADHD. We understand that standard productivity tools often fail neurodivergent brains, and finding peers who truly "get it" can be exhausting.',
      pillars: [
        {
          title: 'Verified Community',
          desc: 'We gate our community with an ADHD screening tool to ensure a safe, empathetic space populated by peers who share similar experiences.',
          icon: <Shield size={24} className="text-primary-500" />
        },
        {
          title: 'Bilingual by Design',
          desc: 'Built from the ground up to support both Arabic and English seamlessly, respecting your natural language nuances.',
          icon: <Globe size={24} className="text-secondary-500" />
        },
        {
          title: 'Neuro-Friendly Tools',
          desc: 'Integrated Focus Rooms, visual routines, and medication trackers that work with your brain, not against it.',
          icon: <Brain size={24} className="text-primary-500" />
        },
        {
          title: 'Compassionate Care',
          desc: 'Direct access to verified ADHD specialists, therapists, and coaches who understand your unique challenges.',
          icon: <Heart size={24} className="text-secondary-500" />
        }
      ],
      ctaTitle: 'Ready to find your focus?',
      ctaButton: 'Join the Community'
    },
    ar: {
      title: 'عن فردي (Fardy ODD)',
      subtitle: 'ملاذ صُمم خصيصاً لعقول المصابين باضطراب فرط الحركة وتشتت الانتباه، لسد الفجوة بين الحياة العصبية المتنوعة والدعم المهني.',
      missionTitle: 'مهمتنا',
      missionDesc: 'تم إنشاء Fardy ODD بتركيز أساسي: تعزيز مجتمع آمن وثنائي اللغة وداعم بصدق للبالغين المصابين باضطراب فرط الحركة. نحن ندرك أن أدوات الإنتاجية التقليدية غالباً ما تفشل مع العقول العصبية المتنوعة، وأن إيجاد أقران "يفهمونك" حقاً قد يكون مرهقاً.',
      pillars: [
        {
          title: 'مجتمع موثوق',
          desc: 'نحمي مجتمعنا بأداة فحص لاضطراب فرط الحركة لضمان مساحة آمنة وعطوفة تضم أقراناً يشاركونك تجارب مماثلة.',
          icon: <Shield size={24} className="text-primary-500" />
        },
        {
          title: 'ثنائي اللغة أصلياً',
          desc: 'تم بناؤه من الصفر ليدعم اللغتين العربية والإنجليزية بسلاسة، مع احترام الفروق الدقيقة للغتك الطبيعية.',
          icon: <Globe size={24} className="text-secondary-500" />
        },
        {
          title: 'أدوات صديقة للعقل',
          desc: 'غرف تركيز متكاملة، وروتين مرئي، ومتتبعات أدوية تعمل مع عقلك وليس ضده.',
          icon: <Brain size={24} className="text-primary-500" />
        },
        {
          title: 'رعاية عطوفة',
          desc: 'وصول مباشر إلى متخصصين ومعالجين ومدربين معتمدين لاضطراب فرط الحركة يتفهمون تحدياتك الفريدة.',
          icon: <Heart size={24} className="text-secondary-500" />
        }
      ],
      ctaTitle: 'هل أنت مستعد لتجد تركيزك؟',
      ctaButton: 'انضم إلى المجتمع'
    }
  };

  const current = content[isEn ? 'en' : 'ar'];

  return (
    <div className="flex-1 flex flex-col items-center p-6 md:p-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 -z-10 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-secondary-50 rounded-full blur-3xl opacity-50 -z-10 translate-y-1/3 -translate-x-1/4"></div>

      <div className="max-w-4xl w-full">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-8 mt-4">
            <span className="w-2 h-2 rounded-full bg-secondary-500"></span>
            <span>{isEn ? 'Our Story' : 'قصتنا'}</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-serif italic text-slate-800 mb-6">
            {current.title}
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {current.subtitle}
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-100 mb-12 text-center md:text-start"
        >
          <h2 className="text-3xl font-serif italic text-primary-500 mb-6">{current.missionTitle}</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {current.missionDesc}
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {current.pillars.map((pillar, idx) => (
            <motion.div 
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + (idx * 0.1) }}
              className="bg-slate-100 rounded-[32px] p-8 shadow-sm flex flex-col"
            >
              <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-6">
                {pillar.icon}
              </div>
              <h3 className="text-2xl font-serif italic text-slate-800 mb-3">{pillar.title}</h3>
              <p className="text-slate-500 leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-primary-500 rounded-[32px] p-10 md:p-16 text-center text-white"
        >
          <h2 className="text-4xl font-serif italic mb-8">{current.ctaTitle}</h2>
          <Link 
            href="/register" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-500 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-sm"
          >
            <span>{current.ctaButton}</span>
            {isEn ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
