import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { format } from 'date-fns';

export interface Medication {
  id: string;
  name: string;
  time: string; // HH:mm format
  dosage: string;
}

export interface MedicationLog {
  medicationId: string;
  date: string; // YYYY-MM-DD
  takenAt: string; // ISO string
}

interface MedicationStore {
  medications: Medication[];
  logs: MedicationLog[];
  addMedication: (med: Omit<Medication, 'id'>) => void;
  removeMedication: (id: string) => void;
  logMedication: (medId: string) => void;
  isTakenToday: (medId: string) => boolean;
}

export const useMedicationStore = create<MedicationStore>()(
  persist(
    (set, get) => ({
      medications: [],
      logs: [],
      addMedication: (med) => set((state) => ({ 
        medications: [...state.medications, { ...med, id: Math.random().toString(36).substring(7) }] 
      })),
      removeMedication: (id) => set((state) => ({
        medications: state.medications.filter(m => m.id !== id)
      })),
      logMedication: (medId) => set((state) => ({
        logs: [...state.logs, {
          medicationId: medId,
          date: format(new Date(), 'yyyy-MM-dd'),
          takenAt: new Date().toISOString(),
        }]
      })),
      isTakenToday: (medId) => {
        const today = format(new Date(), 'yyyy-MM-dd');
        return get().logs.some(log => log.medicationId === medId && log.date === today);
      }
    }),
    {
      name: 'medication-store'
    }
  )
);
