/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        REACT_APP_API_URL: process.env.REACT_APP_API_URL,  // Replace CUSTOM_VAR with your actual env variable name
    },
};

export default nextConfig;
