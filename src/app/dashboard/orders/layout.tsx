import Link from "next/link";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="flex space-x-8 justify-center items-center">
        {/* Enlace al perfil */}
        <Link href="/dashboard" className=" mr- 8  text-xl font-semibold text-gray-800 bg-gradient-to-br from-yellow-500 to-orange-500 p-2 rounded-lg">
          Profile
        </Link>
        {/* Enlace a las órdenes */}
        <Link href="/dashboard/orders"   className="text-xl font-semibold text-gray-800 bg-gradient-to-br from-yellow-500 to-orange-500 p-2 rounded-lg">
          Orders 
        </Link>
      </nav>
      
      <main style={{ padding: '20px' }}>
        {children}
      </main>
    </>
  );
}
