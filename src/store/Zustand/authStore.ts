// stores/authStore.ts
import { create } from 'zustand';

interface AuthUIState {
    // Password visibility states
    isPasswordShown: boolean;
    isConfirmPasswordShown: boolean;

    // Actions
    togglePasswordVisibility: () => void;
    toggleConfirmPasswordVisibility: () => void;
    setPasswordVisibility: (value: boolean) => void;
    setConfirmPasswordVisibility: (value: boolean) => void;
    resetPasswordVisibility: () => void;
}

export const useAuthUIStore = create<AuthUIState>((set) => ({
    // Initial states
    isPasswordShown: false,
    isConfirmPasswordShown: false,

    // Actions
    togglePasswordVisibility: () => set((state) => ({
        isPasswordShown: !state.isPasswordShown
    })),

    toggleConfirmPasswordVisibility: () => set((state) => ({
        isConfirmPasswordShown: !state.isConfirmPasswordShown
    })),

    setPasswordVisibility: (value: boolean) => set({
        isPasswordShown: value
    }),

    setConfirmPasswordVisibility: (value: boolean) => set({
        isConfirmPasswordShown: value
    }),

    resetPasswordVisibility: () => set({
        isPasswordShown: false,
        isConfirmPasswordShown: false
    }),
}));