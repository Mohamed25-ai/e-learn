import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '5mb', // or whatever size you need
        },
    },
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'res.cloudinary.com',
                pathname:'/dgcjvvlwf/image/upload/**/Courses/**/Thumbnail/**'

            },
        ]
    }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);