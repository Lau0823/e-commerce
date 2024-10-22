"use client";

import { getOrders } from "@/helpers/orders.helpers";
import { IUserSession, IOrder } from "@/interfaces/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";

const OrdersView = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [userData, setUserData] = useState<IUserSession | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userSession");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserData(userData);
    }
  }, []);

  // Función para obtener las órdenes del usuario, envuelta en useCallback
  const fetchData = useCallback(async () => {
    if (userData?.token) {
      const ordersResponse = await getOrders(userData.token);
      setOrders(ordersResponse);
    }
  }, [userData]); // Dependencia de userData

  // useEffect para redirigir o cargar órdenes
  useEffect(() => {
    if (!userData || !userData.user.name) {
      router.push("/login");
    } else {
      fetchData(); // Ahora fetchData se puede llamar sin advertencias
    }
  }, [userData, fetchData, router]); // Ahora incluye fetchData

  return (
    <div>
      {orders.length > 0 ? ( // Verificación de orders
        orders.map((order: IOrder) => (
          <div className="flex flex-row items-center gap-4 flex space-x-8 items-center" key={order.id}>
            <section className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <p className="text-xl font-semibold text-gray-800 bg-gradient-to-r from-violet-500 to-fuchsia-500 p-2 rounded-lg mb-4">
                {new Date(order.date).toDateString()}
              </p>
              <p className="text-xl font-semibold text-gray-800 bg-gradient-to-r from-violet-500 to-fuchsia-500 p-2 rounded-lg mb-4">
                Status: {order.status.toLocaleUpperCase()}
              </p>
            </section>
          </div>
        ))
      ) : (
        <p>You do not have any products in your orders</p> // Mensaje corregido
      )}
    </div>
  );
};

export default OrdersView;
