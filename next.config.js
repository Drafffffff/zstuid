const path = require("path");
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    images: {
        domains: ["127.0.0.1", "localhost", "192.168.1.4"],
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        // ignoreBuildErrors: true,
    },
    swcMinify: false
};

const withTM = require("next-transpile-modules")(["gsap"]);

module.exports = withTM(nextConfig);
