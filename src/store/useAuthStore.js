import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { isTokenExpired } from '../utils/jwtUtils';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: (userData, token) => {
        if (isTokenExpired(token)) {
          set({ user: null, token: null, isAuthenticated: false });
          return;
        }
        set({ 
          user: userData, 
          token: token, 
          isAuthenticated: true 
        });
      },
      
      logout: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false 
      }),
      
      updateUser: (userData) => set({ user: userData }),
      
      checkAuth: () => {
        const state = get();
        if (state.token && isTokenExpired(state.token)) {
          set({ user: null, token: null, isAuthenticated: false });
          return false;
        }
        return state.isAuthenticated;
      },
      
      getToken: () => get().token,
      getUser: () => get().user,
    }),
    {
      name: 'dental-auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);