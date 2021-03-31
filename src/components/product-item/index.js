import React from "react";
import "./index.scss";

export const ProductItem = ({ product }) => {
  return (
    <div className="product-item">
      <img src={product.images[0]} alt={product.name} />
      <div>{product.name}</div>
      {/* <div>{product.description}</div> */}
    </div>
  );
};
