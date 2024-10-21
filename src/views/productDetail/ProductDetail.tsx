"use client";
import { IProduct, IUserSession } from "@/interfaces/types";
import { useRouter } from "next/navigation";
import router from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProductDetail: React.FC<IProduct> = ({
  name,
  image,
  description,
  price,
  stock,
  id,
  categoryId,
}) => {
  const [userData, setUserData] = useState<IUserSession>();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = JSON.parse(localStorage.getItem("userSession")!);
      setUserData(userData);
    }
  }, []);

  const handleAddtoCart = () => {
    // Si el usuario no está logueado
    if (!userData?.token) {
      Toast.fire({
        icon: "error",
        title: "You must be logged in to add products",
      });
      return; // Terminar la ejecución aquí si no hay token
    } else {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const productExist = cart.some((product: IProduct) => product.id === id);

      if (productExist) {
        Toast.fire({
          icon: "warning",
          title: "This product is already in the cart",
        });
        router.push("/cart"); // Redirigir al carrito si el producto ya está
      } else {
        // Cambiar esta parte para agregar un objeto de producto
        const productToAdd = { name, image, description, price, stock, id, categoryId };
        cart.push(productToAdd); // Agregar el objeto al carrito
        localStorage.setItem("cart", JSON.stringify(cart));

        Toast.fire({
          icon: "success",
          title: "Product added to cart!",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-full max-w-md flex flex-col space-y-4 p-4">
        <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-br from-yellow-500 to-orange-500 p-2 rounded-lg text-center">
          {name}
        </h2>
        <img
          className="w-full h-38 object-cover rounded-t-lg"
          src={image}
          alt={`Imagen del producto ${name}`}
        />
        <p className="text-gray-700">{description}</p>
        
        {/* Contenedor para el precio y el botón */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-semibold">Price: ${price}</p>
          <p className={`text-lg font-semibold ${stock > 0 ? "text-green-500" : "text-red-500"}`}>
            Stock: {stock}
          </p>
        </div>
        
        <button
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition duration-300"
          onClick={handleAddtoCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
