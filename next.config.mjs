/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'example.com',           // Reemplaza con tus dominios
      'support.apple.com',     // Dominio que ya agregaste
      'www.aptronixindia.com', // Agregado aquí
    ],
  },
  env: {
    CUSTOM_ENV_VARIABLE: process.env.CUSTOM_ENV_VARIABLE,
  },
  webpack: (config) => {
    // Modificaciones personalizadas a la configuración de webpack
    return config;
  },
};

export default nextConfig;
