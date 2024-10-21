"use client";

import CardList from "@/components/cardList/CardList";
import ProductCarousel from "@/components/productcarousel/ProductCarousel";
import React from "react";

// Asegúrate de que estas imágenes sean accesibles desde tu servidor
const images = [
  "https://www.apple.com/v/iphone-16-pro/c/images/overview/welcome/hero_endframe__b3cjfkquc2s2_xlarge.jpg",
  "https://img1.telcel.com/equipos/applewatch/images/banner1-bne.jpg",
  "https://support.apple.com/content/dam/edam/applecare/images/en_US/psp_heros/psp-hero-banner-homepod.image.large_2x.jpg",
];

const HomeView = () => {
  return (
    <>
      <div className="container mx-auto">
        {/* Sección del Carrusel */}
        <section className="my-12">
          <ProductCarousel images={images} /> {/* Renderiza el carrusel publicitario aquí */}
        </section>

        <section>
          <CardList /> {/* Renderiza la lista de productos */}
        </section>
      </div>
    </>
  );
};

export default HomeView;
