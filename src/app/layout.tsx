import type { Metadata } from "next";
import {Roboto} from "next/font/google"
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";


const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], 
});





export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body
          
         
      >
      <Navbar/>
      
        {children}
       
        <Footer/>
      </body>
    </html>
  );
}
