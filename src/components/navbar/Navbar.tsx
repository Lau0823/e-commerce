"use client";
import { IUserSession } from "@/interfaces/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const [userData, setUserData] = useState<IUserSession>();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = JSON.parse(localStorage.getItem("userSession")!);
      setUserData(userData);
    }
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    // Implementa la lógica de búsqueda aquí
  };

  return (
    <nav className="p-8">
      <div className="flex items-center justify-between">
        <Link href="/" passHref>
          <div className="flex items-center cursor-pointer">
            <Image
              src="/logo.png" // Ruta correcta a la imagen
              alt="Logo"
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </div>
        </Link>

        <form onSubmit={handleSearch} className="flex flex-grow mx-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar productos..."
            className="border rounded-lg p-2 w-full"
          />
          <button
            type="submit"
            className="bg-amber-400 text-white rounded-lg px-4 ml-2 hover:bg-violet-500 transition"
          >
            Buscar
          </button>
        </form>
      </div>

      <div>
        <ul className="flex space-x-8 justify-center items-center">
          <li>
            <Link href="/Tienda" className="text-gray-700 hover:text-orange-400 transition-colors duration-300">
              Tienda
            </Link>
          </li>
          <li>
            <Link href="/Dispositivos moviles" className="text-gray-700 hover:text-orange-400 transition-colors duration-300">
              Dispositivos Portatiles
            </Link>
          </li>
          <li>
            <Link href="/ Home" className="text-gray-700 hover:text-orange-400 transition-colors duration-300">
              Home
            </Link>
          </li>
         
          
        </ul>
      </div>

      <div className="flex items-center justify-end gap-3">
        {userData?.user?.email ? (
          <>
            <Link href="/dashboard" className="text-gray-700 hover:text-cyan-400">Profile</Link>
            <Link href="/cart" className="text-gray-700 hover:text-cyan-400">Cart</Link>
          </>
        ) : (
          <>
            <Link href="/register" className="hover:text-cyan-400 flex items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold">
              Sign in
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-cyan-400">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
