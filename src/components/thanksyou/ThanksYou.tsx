import { useRouter } from "next/router";
import { useEffect } from "react";

const ThankYou = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirigir a la página principal después de 5 segundos
    const timer = setTimeout(() => {
      router.push("/products");
    }, 5000);

    return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-green-500">Thank You!</h1>
      <p className="text-xl text-gray-700">Your order has been successfully placed.</p>
      <p className="text-gray-500 mt-2">You will be redirected to the products page shortly.</p>
      <button
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={() => router.push("/products")} // Redirigir manualmente
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default ThankYou;
