import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiClient from '@/lib/api-client';

export interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  bio?: string;
  diagnosisInfo?: string;
  avatar_url?: string;
  language_preference: 'ar' | 'en';
}

export interface User {
  id: string;
  email: string;
  profile?: UserProfile;
  is_verified?: boolean;
}

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  refreshAccessToken: () => Promise<void>;
  isAuthenticated: () => boolean;
  isVerified: () => boolean;
}

export const authStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await apiClient.post('/auth/login', { email, password });
          set({
            user: response.data.user,
            accessToken: response.data.tokens.access_token,
            refreshToken: response.data.tokens.refresh_token,
          });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        try {
          // Attempt server logout, but don't block clearing local state if it fails
          await apiClient.post('/auth/logout');
        } catch (e) {
          console.error("Logout failed on server, clearing locale state anyway", e);
        }
        set({ user: null, accessToken: null, refreshToken: null });
      },

      setUser: (user) => set({ user }),

      refreshAccessToken: async () => {
        const token = get().refreshToken;
        if (!token) return;

        try {
          const response = await apiClient.post('/auth/refresh', { refresh_token: token });
          set({ accessToken: response.data.access_token });
        } catch {
          await get().logout();
        }
      },

      isAuthenticated: () => !!get().accessToken,
      isVerified: () => get().user?.is_verified ?? false,
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
