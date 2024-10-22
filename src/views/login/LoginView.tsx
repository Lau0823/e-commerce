// views/login/LoginView.tsx
"use client"; 

import React, { useState } from 'react';
import { ILoginProps } from '@/interfaces/types';
import { validateLoginForm } from '@/helpers/validate';
import { login } from '@/helpers/auth.helpers';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'; // Cambia aquí

const LoginView: React.FC = () => {
  const initialState: ILoginProps = {
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState<ILoginProps>(initialState);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const router = useRouter(); // Usa useRouter aquí

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validar errores antes de realizar la petición
    const formErrors = validateLoginForm(userData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Salimos si hay errores
    }

    try {
      const response = await login(userData);
      const { token, user } = response;

      // Guardar la sesión del usuario
      localStorage.setItem("UseSession", JSON.stringify({ token, user })); // Cambia el nombre a "UseSession"

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
        title: "Login successful"
      });

      // Redirigir a la página principal
      router.push("/");
    } catch (error) {
      const errorMessage = (error as Error).message || "Unknown error occurred";

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "error",
        title: "Login failed: " + errorMessage
      });
    }
  };

  return (
    <div className="pl-20 ml-15 min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('https://i.pinimg.com/564x/51/bc/71/51bc7139eee46cc9b525c6ae3276592e.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} >
      <div>
        <h1 className="text-black text-2xl mb-6 ml-6 mr-6 ">Sign in to </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-fuchsia-300 text-black p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label htmlFor="email" className="">
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={userData.email}
            placeholder="email@example.com"
            onChange={handleChange}
            className="w-full px-4 py-2 -700 text-black rounded-lg "
            required
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-black text-sm mb-2 ">
            Password:
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={userData.password}
            placeholder="**************"
            onChange={handleChange}
            className="w-full px-4 py-2 font-bold text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          {errors.password && <span className="text-red-500">{errors.password}</span>}
        </div>

        <button
          type="submit"
          className="w-full bg-pink-700 hover:bg-bg-pink-700 text-black font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginView;
