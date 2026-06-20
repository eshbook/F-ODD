'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useMedicationStore } from '@/store/medicationStore';
import { CheckCircle2, Clock, Plus, BellRing, Trash2 } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function MedicationTracker() {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const medicationStore = useMedicationStore();
  const { medications, addMedication, logMedication, removeMedication, isTakenToday } = medicationStore;
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedName, setNewMedName] = useState('');
  const [newMedTime, setNewMedTime] = useState('');
  const [newMedDosage, setNewMedDosage] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMedName && newMedTime) {
      addMedication({
        name: newMedName,
        time: newMedTime,
        dosage: newMedDosage,
      });
      setShowAddForm(false);
      setNewMedName('');
      setNewMedTime('');
      setNewMedDosage('');
    }
  };

  const getUpcomingMedications = () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return medications.map(med => {
      const [hours, minutes] = med.time.split(':').map(Number);
      const medMinutes = hours * 60 + minutes;
      const timeDiff = medMinutes - currentMinutes;
      const isTaken = isTakenToday(med.id);
      
      // Due if time has passed and not taken, or due within 60 mins
      const isDue = !isTaken && timeDiff <= 60;
      
      return {
        ...med,
        isTaken,
        isDue,
        timeDiff
      };
    }).sort((a, b) => {
      // Sort by taken status (taken at bottom), then by time
      if (a.isTaken !== b.isTaken) return a.isTaken ? 1 : -1;
      return a.time.localeCompare(b.time);
    });
  };

  const meds = getUpcomingMedications();

  if (!isClient) return null; // Prevent hydration issues

  return (
    <div className="bg-slate-100 rounded-[32px] p-6 shadow-sm flex flex-col h-full border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-serif italic text-xl text-primary-500 flex items-center gap-2">
          <BellRing size={20} className="text-secondary-500" />
          {isEn ? 'Daily Medications' : 'الأدوية اليومية'}
        </h3>
        {!showAddForm && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="text-primary-500 hover:text-primary-600 p-1 rounded-full hover:bg-slate-200 transition"
          >
            <Plus size={20} />
          </button>
        )}
      </div>

      {showAddForm ? (
        <motion.form 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleAdd} 
          className="space-y-4 bg-white p-5 rounded-[24px] border border-slate-200 shadow-sm mb-4"
        >
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1 font-bold">{isEn ? 'Name' : 'الاسم'}</label>
            <input 
              type="text" 
              value={newMedName}
              onChange={e => setNewMedName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm font-medium"
              placeholder={isEn ? "e.g., Adderall" : "مثال: أديرال"}
              required
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1 font-bold">{isEn ? 'Time' : 'الوقت'}</label>
              <input 
                type="time" 
                value={newMedTime}
                onChange={e => setNewMedTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm font-medium"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1 font-bold">{isEn ? 'Dosage' : 'الجرعة'}</label>
              <input 
                type="text" 
                value={newMedDosage}
                onChange={e => setNewMedDosage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm font-medium"
                placeholder="10mg"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4 pt-2 border-t border-slate-100">
            <button 
              type="button" 
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors"
            >
              {isEn ? 'Cancel' : 'إلغاء'}
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-primary-500 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary-600 transition-colors shadow-sm"
            >
              {isEn ? 'Save' : 'حفظ'}
            </button>
          </div>
        </motion.form>
      ) : (
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto min-h-[300px]">
          {meds.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-sm text-center py-8">
              <p>{isEn ? "No medications tracked." : "لا توجد أدوية متتبعة."}</p>
              <button 
                onClick={() => setShowAddForm(true)}
                className="mt-2 text-primary-500 font-bold hover:text-primary-600 text-xs uppercase tracking-widest"
              >
                {isEn ? "Add your first one" : "أضف دوائك الأول"}
              </button>
            </div>
          ) : (
            meds.map((med, i) => (
              <motion.div 
                key={med.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`p-4 rounded-[24px] flex flex-col gap-4 border transition-all ${
                  med.isTaken 
                    ? 'bg-slate-50/50 border-transparent opacity-60' 
                    : med.isDue 
                      ? 'bg-secondary-50 border-secondary-500/30 shadow-sm' 
                      : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {med.isTaken ? (
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                          <CheckCircle2 size={16} className="text-slate-500" />
                        </div>
                      ) : med.isDue ? (
                        <div className="w-6 h-6 rounded-full bg-secondary-500 flex items-center justify-center shadow-sm shadow-secondary-500/30">
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-slate-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className={`font-serif italic text-lg ${med.isTaken ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                        {med.name}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 flex items-center gap-1 font-bold">
                          <Clock size={12} />
                          {med.time}
                        </p>
                        {med.dosage && (
                          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                            {med.dosage}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => removeMedication(med.id)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title={isEn ? "Remove" : "إزالة"}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {!med.isTaken && (
                  <button 
                    onClick={() => logMedication(med.id)}
                    className={`mt-2 w-full py-3 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                      med.isDue
                        ? 'bg-secondary-500 text-white border-secondary-500 hover:bg-secondary-600 shadow-sm shadow-secondary-500/20'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {isEn ? 'Log as Taken' : 'سجل كمتناول'}
                  </button>
                )}
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
