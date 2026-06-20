'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authStore } from '@/store/authStore';
import { useLanguage } from '@/hooks/useLanguage';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = authStore();
  const { language } = useLanguage();
  const router = useRouter();

  const isEn = language === 'en';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Using a mock successful login since backend isn't real in MVP
    if (email && password) {
      // Mock login delay
      await new Promise(r => setTimeout(r, 800));
      authStore.getState().setUser({
        id: '123',
        email,
        is_verified: true,
        profile: {
          id: 'p123',
          user_id: '123',
          name: email.split('@')[0],
          language_preference: language,
        }
      });
      router.push('/dashboard');
    } else {
      setError(isEn ? 'Please fill in all fields' : 'الرجاء ملء جميع الحقول');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif italic mb-2 text-slate-800">
            {isEn ? 'Welcome Back' : 'مرحباً بعودتك'}
          </h1>
          <p className="text-slate-500">
            {isEn ? 'Sign in to connect with the community' : 'قم بتسجيل الدخول للتواصل مع المجتمع'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium">{isEn ? 'Password' : 'كلمة المرور'}</label>
              <Link href="/forgot" className="text-xs font-bold uppercase tracking-widest text-primary-500 hover:text-primary-600">
                {isEn ? 'Forgot?' : 'نسيت؟'}
              </Link>
            </div>
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
            disabled={isLoading}
            className="w-full py-3 mt-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-70 text-white rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center transition"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (isEn ? 'Sign In' : 'تسجيل الدخول')}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          {isEn ? "Don't have an account? " : "ليس لديك حساب؟ "}
          <Link href="/register" className="text-primary-500 font-bold hover:underline">
            {isEn ? 'Register' : 'إنشاء حساب'}
          </Link>
        </div>
      </div>
    </div>
  );
}
