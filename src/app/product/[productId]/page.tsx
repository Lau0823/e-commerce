import React from "react";

import ProductDetail from "@/views/productDetail/ProductDetail";
import { getProductsById } from "@/helpers/products.helper";
const Detail :React.FC <{params:{productId:string}}> = async ({params}) => {
const Product = await getProductsById(params.productId)

    return (
       <ProductDetail { ...Product} />
    
    )
}
export default Detail;