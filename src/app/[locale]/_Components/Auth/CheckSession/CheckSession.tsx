"use client";

import { useEffect, useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';
import MainLoader from '../../Loaders/MainLoader/MainLoader';
import toast from 'react-hot-toast';

// Module-level flag — survives locale-triggered remounts
let sessionErrorHandled = false;

async function logOutUser() {
    await signOut({
        redirect: true,
        callbackUrl: '/login'
    });
}
export default function CheckSession({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    useEffect(() => {
        if (status === 'loading') return;
        if (sessionErrorHandled) return;

        const tokenError = session?.tokenError;
        const tokenErrorMessage = session?.tokenErrorMessage;

        if (tokenError) {
            sessionErrorHandled = true;

            let errorMessage = 'Session error. Please login again.';
            if (tokenErrorMessage === 'RefreshTokenExpired') {
                errorMessage = '⏰ Your session has expired. Please login again.';
            } else if (tokenErrorMessage === 'RefreshAccessTokenError') {
                errorMessage = '❌ Failed to refresh session. Please login again.';
            } else if (tokenErrorMessage === 'MissingTokenData') {
                errorMessage = '⚠️ Invalid session data. Please login again.';
            }

            toast.error(errorMessage, {
                duration: 3000,
                position: 'top-center',
                icon: '🔐',
            });

            logOutUser()

        }
    }, [session, status]);

    if (status === 'loading') {
        return <MainLoader />;
    }

    return <>{children}</>;
}