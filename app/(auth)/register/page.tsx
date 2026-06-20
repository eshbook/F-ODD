'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authStore } from '@/store/authStore';
import { useLanguage } from '@/hooks/useLanguage';
import { Loader2, ArrowRight, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();
  const router = useRouter();

  const isEn = language === 'en';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (name && email && password) {
      setLoading(true);
      // Mock register delay
      await new Promise(r => setTimeout(r, 800));
      authStore.getState().setUser({
        id: '123',
        email,
        is_verified: false, // Must pass screening next
        profile: {
          id: 'p123',
          user_id: '123',
          name,
          language_preference: language,
        }
      });
      setLoading(false);
      router.push('/screening'); // Next step is screening
    } else {
      setError(isEn ? 'Please fill in all fields' : 'الرجاء ملء جميع الحقول');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif italic mb-2 text-slate-800">
            {isEn ? 'Join Fardy ODD' : 'انضم إلى فردي'}
          </h1>
          <p className="text-slate-500 text-sm">
            {isEn ? 'Create an account to connect with the ADHD community.' : 'أنشئ حساباً للتواصل مع مجتمعنا.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">{isEn ? 'Full Name' : 'الاسم الكامل'}</label>
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition"
              placeholder={isEn ? "Ahmed Ali" : "أحمد علي"}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1.5">{isEn ? 'Email' : 'البريد الإلكتروني'}</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition"
              placeholder="you@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1.5">{isEn ? 'Password' : 'كلمة المرور'}</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 mt-6 bg-primary-500 hover:bg-primary-600 disabled:opacity-70 text-white rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                <span>{isEn ? 'Continue to Screening' : 'المتابعة للتقييم'}</span>
                {isEn ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          {isEn ? "Already have an account? " : "لديك حساب بالفعل؟ "}
          <Link href="/login" className="text-primary-500 font-bold hover:underline">
            {isEn ? 'Sign In' : 'تسجيل الدخول'}
          </Link>
        </div>
      </div>
    </div>
  );
}
