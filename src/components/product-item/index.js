import React, { useCallback, useMemo } from "react";
import { useShoppingCart } from "use-shopping-cart";
import "./index.scss";

const CartInteractor = ({ product }) => {
  const {
    addItem,
    decrementItem,
    incrementItem,
    cartDetails,
  } = useShoppingCart();

  const addItemToCart = useCallback(
    () =>
      addItem({
        id: product.id,
        price: product.unit_amount,
        currency: product.currency,
      }),
    []
  );

  const quantityInCart = useMemo(() => cartDetails[product.id]?.quantity ?? 0, [
    cartDetails,
  ]);

  return (
    <>
      {quantityInCart ? (
        <>
          <button onClick={() => decrementItem(product.id)}>-</button>
          {quantityInCart}
          <button onClick={() => incrementItem(product.id)}>+</button>
        </>
      ) : (
        <button onClick={addItemToCart}>Add to cart</button>
      )}
    </>
  );
};

// product is a misnomer here, it's actually a 'price'
export const ProductItem = ({ product }) => {
  return (
    <div className="product-item">
      <div className="product-item__container">
        <div className="product-item__image">
          <img src={product.product.images[0]} alt={product.product.name} />
        </div>
        <div className="product-item__contents">
          <div>{product.product.name}</div>
          <div className="product-item__price-box">
            <div>${product.unit_amount / 100}</div>
            <CartInteractor product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};
