'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authStore } from '@/store/authStore';
import { useLanguage } from '@/hooks/useLanguage';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import * as motion from "motion/react-client";

const questionsEn = [
  "How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?",
  "How often do you leave your seat in meetings or other situations in which you are expected to remain seated?",
  "How often do you have difficulty unwinding and relaxing when you have time to yourself?",
  "When you're in a conversation, how often do you find yourself finishing the sentences of the people you are talking to?",
  "How often do you put things off until the last minute?",
  "How often do you depend on others to keep your life in order and attend to details?"
];

const questionsAr = [
  "كم مرة تجد صعوبة في التركيز على ما يقوله لك الناس، حتى عندما يتحدثون إليك مباشرة؟",
  "كم مرة تغادر مقعدك في الاجتماعات أو في المواقف الأخرى التي يتوقع منك البقاء جالساً فيها؟",
  "كم مرة تجد صعوبة في الاسترخاء وأخذ قسط من الراحة عندما يكون لديك وقت لنفسك؟",
  "عندما تكون في محادثة، كم مرة تجد نفسك تكمل جمل الأشخاص الذين تتحدث إليهم؟",
  "كم مرة تؤجل الأمور إلى اللحظة الأخيرة؟",
  "كم مرة تعتمد على الآخرين للحفاظ على ترتيب حياتك والاهتمام بالتفاصيل؟"
];

const optionsEn = ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'];
const optionsAr = ['أبداً', 'نادراً', 'أحياناً', 'غالباً', 'كثيراً جداً'];

export default function ScreeningPage() {
  const { language } = useLanguage();
  const { user, setUser } = authStore();
  const router = useRouter();
  const isEn = language === 'en';
  
  const questions = isEn ? questionsEn : questionsAr;
  const options = isEn ? optionsEn : optionsAr;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<'pending' | 'passed' | 'failed'>('pending');

  const handleSelect = (val: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = val;
    setAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Mock API call to submit screening
    await new Promise(r => setTimeout(r, 1500));
    
    // Simple logic: sum of answers > 12 passes.
    const score = answers.reduce((a, b) => a + b, 0);
    const passed = score >= 12;
    
    setResult(passed ? 'passed' : 'failed');
    
    if (passed && user) {
      setUser({ ...user, is_verified: true });
    }
    setIsSubmitting(false);
  };

  if (result === 'passed') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-6">
          <div className="w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-serif italic mb-4 text-slate-800">{isEn ? 'Screening Passed' : 'تم اجتياز التقييم'}</h2>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            {isEn ? 'Welcome to Fardy ODD. Your account is verified and you can now access all features.' : 'مرحباً بك في فردي. تم التحقق من حسابك ويمكنك الآن الوصول إلى جميع الميزات.'}
          </p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="px-8 py-3 bg-primary-500 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-primary-600 transition"
          >
            {isEn ? 'Go to Dashboard' : 'الذهاب إلى لوحة التحكم'}
          </button>
        </motion.div>
      </div>
    );
  }

  if (result === 'failed') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-24 h-24 bg-warning/10 text-warning rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={48} />
          </div>
          <h2 className="text-3xl font-serif italic mb-4 text-slate-800">{isEn ? 'Screening Complete' : 'اكتمل التقييم'}</h2>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            {isEn ? 'Based on your answers, you did not meet the threshold for community access right now. You can retake the assessment in 30 days or browse as a guest.' : 'بناءً على إجاباتك، لم تستوفِ الحد الأدنى للوصول للمجتمع حالياً. يمكنك إعادة التقييم بعد 30 يوماً أو التصفح كضيف.'}
          </p>
          <button 
            onClick={() => router.push('/')}
            className="px-8 py-3 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition"
          >
            {isEn ? 'Return Home' : 'العودة للرئيسية'}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full p-4 justify-center">
      <div className="mb-8">
        <div className="flex justify-between text-xs uppercase tracking-widest font-bold text-slate-500 mb-3">
          <span>{isEn ? 'ADHD Screening Gate' : 'بوابة تقييم لاضطراب فرط الحركة'}</span>
          <span>{currentStep + 1} / {questions.length}</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-500 transition-all duration-500 ease-out" 
            style={{ width: `${((currentStep) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <motion.div 
        key={currentStep}
        initial={{ opacity: 0, x: isEn ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: isEn ? -20 : 20 }}
        className="bg-white p-8 md:p-10 rounded-[32px] border border-slate-100 shadow-sm"
      >
        <h2 className="text-2xl md:text-3xl font-serif italic mb-8 leading-tight text-slate-800">
          {questions[currentStep]}
        </h2>

        <div className="space-y-3">
          {options.map((opt, idx) => {
            const isSelected = answers[currentStep] === idx;
            return (
              <button
                key={opt}
                onClick={() => handleSelect(idx)}
                className={`w-full text-start p-4 rounded-xl border-2 transition-all font-medium ${
                  isSelected 
                  ? 'border-primary-500 bg-primary-50 text-primary-600' 
                  : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                }`}
              >
                {opt}
              </button>
            )
          })}
        </div>

        <div className="mt-10 flex justify-between">
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 0}
            className="px-6 py-2 font-medium text-slate-500 disabled:opacity-30 hover:text-slate-800 transition"
          >
            {isEn ? 'Back' : 'السابق'}
          </button>
          
          {currentStep === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={answers[currentStep] === -1 || isSubmitting}
              className="px-8 py-3 bg-primary-500 text-white rounded-full font-bold text-xs uppercase tracking-widest disabled:opacity-50 flex items-center justify-center min-w-[140px]"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : (isEn ? 'Submit' : 'إرسال')}
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={answers[currentStep] === -1}
              className="px-8 py-3 bg-slate-800 text-white rounded-full font-bold text-xs uppercase tracking-widest disabled:opacity-50"
            >
              {isEn ? 'Next' : 'التالي'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
