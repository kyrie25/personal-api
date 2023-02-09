module.exports = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: "/",
                destination: "https://kyrie25.me",
                permanent: true,
            },
        ];
    },
    rewrites: async () => [{ source: "/:path*", destination: "/api/:path*" }],
};
