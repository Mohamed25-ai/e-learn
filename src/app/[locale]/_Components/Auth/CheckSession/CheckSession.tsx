"use client";

import { useEffect, useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';
import MainLoader from '../../Loaders/MainLoader/MainLoader';
import toast from 'react-hot-toast';

export default function CheckSession({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const hasShownToast = useRef(false);

    // Monitor session errors from your jwt callback
    useEffect(() => {
        if (status === 'loading') return;
        if (hasShownToast.current) return; // Prevent multiple toasts

        const tokenError = session?.tokenError;
        const tokenErrorMessage = session?.tokenErrorMessage;

        if (tokenError) {
            hasShownToast.current = true;

            let errorMessage = 'Session error. Please login again.';
            
            if (tokenErrorMessage === 'RefreshTokenExpired') {
                errorMessage = '⏰ Your session has expired. Please login again.';
            } else if (tokenErrorMessage === 'RefreshAccessTokenError') {
                errorMessage = '❌ Failed to refresh session. Please login again.';
            } else if (tokenErrorMessage === 'MissingTokenData') {
                errorMessage = '⚠️ Invalid session data. Please login again.';
            }

            // Show toast alert
            toast.error(errorMessage, {
                duration: 3000,
                position: 'top-center',
                icon: '🔐',
            });

            // Sign out after toast
            setTimeout(() => {
                signOut({ 
                    redirect: true,
                    callbackUrl: '/login'
                });
            }, 2000);
        }
    }, [session, status]);

    // Show loading state
    if (status === 'loading') {
        return <MainLoader />;
    }

    return <>{children}</>;
}