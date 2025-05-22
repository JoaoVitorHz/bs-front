/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        REACT_APP_API_URL: process.env.REACT_APP_API_URL,  // Replace CUSTOM_VAR with your actual env variable name
    },
    trailingSlash: true, // Garante que as rotas sejam transformadas em pastas com index.html
    output: 'export',
};

export default nextConfig;
