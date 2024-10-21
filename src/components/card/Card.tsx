import React, { useState } from "react";
import { ICardProps } from "@/interfaces/types";
import Image from 'next/image'; // Importar el componente Image

const Card: React.FC<ICardProps> = ({ name, price, stock, description, image }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Controlar la expansión de la descripción
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="min-h-screen p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-md min-h-[450px] flex flex-col">
      {/* Imagen del producto */}
      <Image
        src={image}
        alt={`Imagen del producto ${name}`}
        width={500} // Ajusta según el tamaño que prefieras
        height={300} // Ajusta según el tamaño que prefieras
        className="w-full h-30 object-cover rounded-t-lg" // Ajustando la altura y manteniendo `object-cover`
      />
      
      {/* Información del producto */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-gray-800 bg-gradient-to-br from-yellow-500 to-orange-500 p-2 rounded-lg">
          {name}
        </h2>
        <p className="text-gray-600 mt-2 flex-grow">
          {isExpanded ? description : `${description.substring(0, 100)}...`}
        </p>
        <button 
          onClick={toggleDescription} 
          className="mt-2 text-blue-500 underline"
        >
          {isExpanded ? "Ver menos" : "Ver más"}
        </button>

        {/* Precio y stock */}
        <div className="mt-4">
          <p className="text-lg font-bold text-gray-900">Price: ${price}</p>
          <p className={`mt-2 text-sm font-medium ${stock > 0 ? "text-green-500" : "text-red-500"}`}>
            {stock > 0 ? `In stock: ${stock}` : "Out of stock"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
