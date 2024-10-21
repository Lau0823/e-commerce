
" use client "
import React from "react";
import Card from "@/components/card/Card";
import { getProductsDB } from "@/helpers/products.helper";
import Link from "next/link";

const CardList = async () => {
    const products = await getProductsDB();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 " >
            {products && products.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id}>
                    <Card {...product} /> {/* Pasar solo las propiedades de product */}
                </Link>
            ))}
        </div>
    );
}

export default CardList;
