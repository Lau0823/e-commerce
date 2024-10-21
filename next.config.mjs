/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['example.com'], // Permite cargar imágenes desde dominios externos
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
  
