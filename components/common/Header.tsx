'use client';

import Link from 'next/link';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/hooks/useLanguage';
import { authStore } from '@/store/authStore';
import { LogOut } from 'lucide-react';

export default function Header() {
  const { t } = useLanguage();
  const { isAuthenticated, logout, user } = authStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-primary-500 font-serif italic text-xl">
            F
          </div>
          <span className="font-serif italic text-2xl text-slate-800">Fardy ODD</span>
        </Link>

        <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
          {isAuthenticated() && (
            <>
              <Link href="/dashboard" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary-500 transition-colors border-b-2 border-transparent hover:border-primary-500 pb-1">{t('dashboard')}</Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          
          {isAuthenticated() ? (
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 hidden sm:inline-block">
                {user?.profile?.name || user?.email}
              </span>
              <button 
                onClick={logout}
                className="text-slate-400 hover:text-secondary-500 hover:bg-slate-50 p-2 rounded-full transition"
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                href="/login" 
                className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary-500 transition-colors"
              >
                {t('login')}
              </Link>
              <Link 
                href="/register" 
                className="text-xs font-bold uppercase tracking-widest bg-primary-500 text-white px-5 py-2.5 rounded-full hover:bg-primary-600 transition-colors"
              >
                {t('register')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
