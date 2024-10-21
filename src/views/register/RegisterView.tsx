"use client";

import React, { useEffect, useState } from 'react';
import { IRegisterProps, IErrorsRegisterProps } from '@/interfaces/types';
import { validateRegisterForm } from '@/helpers/validate';
import { register } from '@/helpers/auth.helpers';
import router from 'next/router';
import Swal from 'sweetalert2';

const RegisterView: React.FC = () => {
  const initialState: IRegisterProps = {
    email: "",
    password: "",
    name: "",
    username: "",
    address: "",
    phone: ""
  };

  const [userData, setUserData] = useState<IRegisterProps>(initialState);
  const [errorsR, setErrorsR] = useState<IErrorsRegisterProps>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    
    
    // Si no hay errores, procede con el registro
   
      
        await register(userData);
        
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });

        Toast.fire({
          icon: "success",
          title: "Registrado exitosamente"
        });
        
        router.push("/login");
    
    
  };

  useEffect(() => {
    const formErrors = validateRegisterForm(userData);
    setErrorsR(formErrors);
  }, [userData]);

  return (
    <div
    className="   max-w-md ml-80 min-h-screen flex items-center justify-center  bg-white p-8 rounded-lg shadow-lg w-full max-w-md  "
    style={{
      backgroundImage: "url('https://i.pinimg.com/564x/a7/64/ac/a764acbe83daddab97b7a3f137785a55.jpg')", // Imagen de fondo (opcional)
      backgroundSize: 'cover', // Ajuste para que la imagen cubra todo el contenedor
      backgroundPosition: 'center', // Centrar la imagen de fondo
    }}
  >
    {/* Contenido del formulario */}
    
    {/* Aquí irían los demás inputs y botones del formulario */}
  
      <div className="  bg-transparent rounded-lg shadow-lg">
        <h1 className="text-3xl  text-center text-black mb-6">Regístrate en la Tienda</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className=" text-black text-sm  mb-2">
              Nombre completo:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="w-full p-2  text-white focus:outline-none focus:border-fuchsia-500"
              required
            />
            {errorsR.name && <p className="text-red-500 text-xs mt-2">{errorsR.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="  text-sm  mb-2">
              Correo electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full p-2 text-black rounded focus:outline-none focus:border-fuchsia-500"
              required
            />
            {errorsR.email && <p className="text-red-500 text-xs mt-2">{errorsR.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-black text-sm  mb-2">
              Nombre de usuario:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="w-full p-2 text-black  rounded focus:outline-none focus:border-fuchsia-500"
              required
            />
            {errorsR.username && <p className="text-red-500 text-xs mt-2">{errorsR.username}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-sm  mb-2">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full p-2 text-white  rounded focus:outline-none focus:border-fuchsia-500"
              required
            />
            {errorsR.password && <p className="text-red-500 text-xs mt-2">{errorsR.password}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block black text-sm  mb-2">
              Dirección de envío:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={userData.address}
              onChange={handleChange}
              className="w-full p-2 text-white rounded focus:outline-none focus:border-fuchsia-500"
              required
            />
            {errorsR.address && <p className="text-red-500 text-xs mt-2">{errorsR.address}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block text-black text-sm  mb-2">
              Teléfono:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className="w-full p-2  text-black rounded focus:outline-none focus:border-bg-pink-300"
              required
            />
            {errorsR.phone && <p className="text-red-500 text-xs mt-2">{errorsR.phone}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-pink-300 text-black rounded hover:bg-fuchsia-600 focus:outline-none focus:shadow-outline"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterView;
