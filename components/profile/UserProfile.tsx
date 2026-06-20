'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { authStore } from '@/store/authStore';
import { User, ClipboardList, Save, Edit2, Loader2, X } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function UserProfile() {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const { user, setUser } = authStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [diagnosisInfo, setDiagnosisInfo] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (user?.profile) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setName(user.profile.name);
      setDiagnosisInfo(user.profile.diagnosisInfo || '');
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, [user?.profile]);

  if (!isClient || !user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Mock save delay
    await new Promise(r => setTimeout(r, 600));
    
    if (user.profile) {
      setUser({
        ...user,
        profile: {
          ...user.profile,
          name,
          diagnosisInfo
        }
      });
    }
    
    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <div className="bg-slate-100 rounded-[32px] p-6 shadow-sm flex flex-col border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-serif italic text-xl text-primary-500 flex items-center gap-2">
          <User size={20} className="text-secondary-500" />
          {isEn ? 'My Profile' : 'ملفي الشخصي'}
        </h3>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-primary-500 hover:text-primary-600 p-2 rounded-full hover:bg-slate-200 transition"
            title={isEn ? "Edit Profile" : "تعديل الملف الشخصي"}
          >
            <Edit2 size={18} />
          </button>
        )}
      </div>

      {isEditing ? (
        <motion.form 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSave} 
          className="space-y-4 bg-white p-5 rounded-[24px] border border-slate-200 shadow-sm"
        >
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1 font-bold">{isEn ? 'Display Name' : 'اسم العرض'}</label>
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm font-medium text-slate-800"
              required
            />
          </div>
          
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1 font-bold flex items-center gap-1">
              {isEn ? 'ADHD Diagnosis & Notes' : 'تشخيص اضطراب فرط الحركة وملاحظات'}
            </label>
            <textarea 
              value={diagnosisInfo}
              onChange={e => setDiagnosisInfo(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm font-medium text-slate-800 min-h-[100px] resize-y"
              placeholder={isEn ? "E.g., Inattentive type, diagnosed in 2022..." : "مثال: تشتت الانتباه، شُخص في 2022..."}
            />
          </div>
          
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-100">
            <button 
              type="button" 
              onClick={() => {
                setIsEditing(false);
                setName(user?.profile?.name || '');
                setDiagnosisInfo(user?.profile?.diagnosisInfo || '');
              }}
              className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors flex items-center gap-1"
            >
              <X size={14} />
              {isEn ? 'Cancel' : 'إلغاء'}
            </button>
            <button 
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-primary-500 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary-600 transition-colors shadow-sm flex items-center gap-2"
            >
              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {isEn ? 'Save' : 'حفظ'}
            </button>
          </div>
        </motion.form>
      ) : (
        <div className="bg-white p-5 rounded-[24px] border border-slate-200 shadow-sm space-y-5 flex-1">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">{isEn ? 'Display Name' : 'اسم العرض'}</p>
            <p className="font-serif italic text-lg text-slate-800">{user.profile?.name}</p>
          </div>
          
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1 flex items-center gap-1">
              <ClipboardList size={12} />
              {isEn ? 'Diagnosis Info' : 'معلومات التشخيص'}
            </p>
            {user.profile?.diagnosisInfo ? (
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{user.profile.diagnosisInfo}</p>
            ) : (
              <p className="text-sm text-slate-400 italic">
                {isEn ? "No diagnosis information added yet." : "لم تتم إضافة معلومات التشخيص بعد."}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
