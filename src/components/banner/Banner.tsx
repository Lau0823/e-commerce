import React from 'react';

const Banner = () => {
  return (
    <div className="relative h-screen w-full bg-cover bg-center" 
         style={{ backgroundImage: "url('https://i.pinimg.com/originals/e6/6a/de/e66ade5e76d675d5f1b6fa83bdc6045f.jpg')" }}>
      
      {/* Contenido superpuesto en el banner */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold">Bienvenido a Catflix</h1>
          <p className="mt-4 text-lg">Explora lo mejor del contenido online</p>
          <button className="mt-6 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg">
            Ver ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
