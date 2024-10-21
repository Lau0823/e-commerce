"use client";

import { getOrders } from "@/helpers/orders.helpers";
import { IUserSession, IOrder } from "@/interfaces/types";
import { useRouter} from "next/navigation"
import React, { useEffect, useState } from "react";

const OrdersView = () => {
  
  const router = useRouter()
  
  const [orders, setOrders] = useState<IOrder[]>([]); // Inicia con un array vacío
  const [userData, setUserData] = useState<IUserSession | null>(null); 

  useEffect(() => {

    if (typeof window !== "undefined" && window.localStorage) {
      const userData = JSON.parse(localStorage.getItem("UseSession")!);
      setUserData(userData);
    }
  }, []); // Cierre adecuado del hook useEffect

  // Función para obtener las órdenes del usuario
  const fetchData = async () => {
    if (userData?.token) {
      const ordersResponse = await getOrders(userData?.token);
      setOrders(ordersResponse);
    }
  };

  // useEffect para redirigir o cargar órdenes
  useEffect(() => {
    if (userData?.user.name) {
      userData.user.name === undefined ? router.push("/login") : fetchData();
    }
  }, [userData?.user, router]); // Cierre correcto

  return (
    <div>
      {orders && orders.length > 0 ? ( // Verificación de orders
        orders.map((order: IOrder) => {
          return (
            <div className="flex flex-row items-center gap-4 flex space-x-8 items-center" key={order.id}>
              <section className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <p className="text-xl font-semibold text-gray-800 bg-gradient-to-r from-violet-500 to-fuchsia-500 p-2 rounded-lg mb-4">{new Date(order.date).toDateString()}</p>
                <p className="text-xl font-semibold text-gray-800 bg-gradient-to-r from-violet-500 to-fuchsia-500 p-2 rounded-lg mb-4">status: {order.status.toLocaleUpperCase()}</p>
              </section>
            </div>
          );
        })
      ) : (
        <p>You don't have any products in your orders</p>
      )}
    </div>
  );
};

export default OrdersView;
