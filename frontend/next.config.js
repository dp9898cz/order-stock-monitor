/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/produkty",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
