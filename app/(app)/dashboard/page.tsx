'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { authStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, Activity, MessageSquare } from 'lucide-react';
import MedicationTracker from '@/components/routines/MedicationTracker';
import UserProfile from '@/components/profile/UserProfile';
import DailyTips from '@/components/dashboard/DailyTips';
import Achievements from '@/components/dashboard/Achievements';

export default function DashboardPage() {
  const { language } = useLanguage();
  const { user, isVerified, isAuthenticated } = authStore();
  const router = useRouter();
  const isEn = language === 'en';

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    } else if (!isVerified()) {
      router.push('/screening');
    }
  }, [isAuthenticated, isVerified, router]);

  if (!user || !isVerified()) return null;

  return (
    <div className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {isEn ? `Hello, ${user.profile?.name}` : `مرحباً، ${user.profile?.name}`}
        </h1>
        <p className="text-slate-500">
          {isEn ? "Here's your ADHD toolkit for today." : "إليك أدواتك لاضطراب فرط الحركة اليوم."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard 
          href="/feed"
          icon={<Users size={24} />}
          title={isEn ? "Community Feed" : "مجتمع الأعضاء"}
          desc={isEn ? "Connect with peers" : "تواصل مع أقرانك"}
          color="bg-primary-500"
        />
        <DashboardCard 
          href="/focus-rooms"
          icon={<Activity size={24} />}
          title={isEn ? "Focus Rooms" : "غرف التركيز"}
          desc={isEn ? "Work together" : "العمل معاً"}
          color="bg-secondary-500"
        />
        <DashboardCard 
          href="/routines"
          icon={<LayoutDashboard size={24} />}
          title={isEn ? "Routines" : "الروتين"}
          desc={isEn ? "Track daily habits" : "تتبع عاداتك اليومية"}
          color="bg-emerald-500"
        />
        <DashboardCard 
          href="/specialists"
          icon={<MessageSquare size={24} />}
          title={isEn ? "Specialists" : "المتخصصون"}
          desc={isEn ? "Find professional help" : "ابحث عن مساعدة متخصصة"}
          color="bg-warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-8">
          <DailyTips />
          <Achievements />
          <UserProfile />
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex flex-col flex-1">
            <h3 className="font-serif italic text-xl mb-4 text-primary-500">{isEn ? 'Recent Activity' : 'النشاطات الأخيرة'}</h3>
            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm py-12">
              {isEn ? "No recent activity yet." : "لا توجد نشاطات أخيرة."}
            </div>
          </div>
        </div>
        
        <div className="h-[600px]">
          <MedicationTracker />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, desc, href, color }: any) {
  return (
    <Link href={href} className="group block bg-white border border-slate-100 p-6 rounded-[32px] shadow-sm hover:shadow-md transition">
      <div className={`w-12 h-12 rounded-full ${color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-lg font-serif italic text-slate-800 mb-1">{title}</h3>
      <p className="text-slate-500 text-sm">{desc}</p>
    </Link>
  );
}
