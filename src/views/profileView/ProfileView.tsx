"use client";
import Button from "@/components/CustomButton/Button";
import { IUserSession } from "@/interfaces/types";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Asegúrate de importar Link
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProfileView: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<IUserSession | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedUserData = localStorage.getItem("userSession");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    }
  }, []);

  const handleClick = () => {
    localStorage.removeItem("userSession");
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
    Toast.fire({
      icon: "success",
      title: "Logout successfully",
    });
    router.push("/");
  };

  return (
    <div className="px-8 ml-4">
      <h1 className="px-8 ml-4">Profile</h1>
      
      {userData ? (
        <>
          <h3 className="ml-4 px-8">Bienvenido {userData.user.name}</h3>
          <p className="ml-4 px-8">Tu correo: {userData.user.email}</p>
          <p className="ml-4 px-8">Tu dirección de envío: {userData.user.address}</p>
          
        
          <Link href="/dashboard/orders" className="ml-4 px-8 text-blue-600 hover:underline">
            Ver tus órdenes
          </Link>
          
          <Button onClick={handleClick} disabled={false}>
            Desconectar
          </Button>
        </>
      ) : (
        <p className="px-8 ml-4">Cargando...</p>
      )}
    </div>
  );
};

export default ProfileView;
