// components/ProductCarousel.tsx
import React from "react";
import Slider from "react-slick";


interface ProductCarouselProps {
  images: string[]; // Array de strings para manejar las imágenes
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Solo muestra una imagen a la vez
    slidesToScroll: 1,
    autoplay: true, // Habilitar el desplazamiento automático
    autoplaySpeed: 3000, // Tiempo en milisegundos entre cada desplazamiento
  };

  return (
    <div className="w-screen h-auto"> {/* Contenedor que ocupa el ancho completo */}
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="p-4">
            <div className="relative overflow-hidden">
              {/* Imagen con ajuste de ancho completo, altura automática y bordes redondeados */}
              <img
                className="w-full h-96 object-cover rounded-lg" // w-full para ocupar todo el ancho, h-96 para altura fija
                src={image}
                alt={`Publicidad ${index + 1}`}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 opacity-0 hover:opacity-100">
                <button className="bg-yellow-500 text-white font-bold py-2 px-4 rounded">
                  ¡Cómpralo ya!
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
