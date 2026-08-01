import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb', // or whatever size you need
        },
    },
    images: {
        remotePatterns: [
            {
                // https://res.cloudinary.com/dgcjvvlwf/raw/upload/v1782228712/Sad_Tom_danjl8.jpg
                // "https://res.cloudinary.com/dgcjvvlwf/raw/upload/v1782047533/Screenshot_2026-06-18_175924_itvvpq.png"
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**/raw/upload/**/**'
            },
            {
                // https://lh3.googleusercontent.com/a/ACg8ocLYTHuAZ-foVOTAd2CJBYyRhk77CcLvCCwTJdlnIbZSi41m4g=s96-c
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/**'
            }
        ]
    }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);