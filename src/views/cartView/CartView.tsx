"use client";
import { IProduct, IUserSession } from "@/interfaces/types";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { createOrder } from "@/helpers/orders.helpers";

const CartView = () => {
  const [cart, setCart] = useState<IProduct[]>([]);
  const [totalCart, setTotalCart] = useState<number>(0);
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
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (storedCart) {
        let totalCart = 0;
        storedCart.map((item: IProduct) => {
          totalCart = totalCart + item.price;
        });
        setTotalCart(totalCart);
        setCart(storedCart);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = JSON.parse(localStorage.getItem("userSession") || "[]");
      setUserData(userData); // Guardar los datos del usuario
    }
  }, []);

  const handleClick = async () => {
    const idProducts: number[] = cart?.map((product) => product.id);
    await createOrder(idProducts, userData?.token!);
    setCart([]);
    setTotalCart(0);
    localStorage.setItem("cart", "[]");

    Toast.fire({
      icon: "success",
      title: "Buy Successfully!",
    });

    // Redirigir al home después de la compra exitosa
    // No se usa router.push, se redirige a través del link en el render
  };

  // Función para eliminar un producto del carrito
  const handleRemoveProduct = (productId: number) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    Swal.fire({
      icon: "success",
      title: "Product removed from cart!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // Función para vaciar el carrito
  const handleClearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove all products from the cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCart([]);
        localStorage.removeItem("cart");

        Swal.fire("Cleared!", "Your cart is now empty.", "success");
      }
    });
  };

  // Calcular el total de los productos en el carrito
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
        <Link href="/">
          <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cart.map((product) => (
          <div
            key={product.id}
            className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg w-full max-w-sm m-6 p-6 transition-transform duration-300 hover:scale-105"
          >
            <img
              className="m-6 w-38 h-48 object-cover rounded-t-lg"
              src={product.image}
              alt={`Image of ${product.name}`}
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 bg-gradient-to-br from-yellow-500 to-orange-500 p-2 rounded-lg">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800 font-bold">${product.price}</p>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => handleRemoveProduct(product.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold">Total: ${totalPrice}</p>
        <div className="flex space-x-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            onClick={handleClick}
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartView;
