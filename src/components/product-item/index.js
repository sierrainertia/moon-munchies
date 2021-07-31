import React, { useCallback, useMemo } from "react";
import { useShoppingCart } from "use-shopping-cart";
import "./index.scss";

const CartButtons = ({ product }) => {
  const {
    addItem,
    cartDetails,
    decrementItem,
    incrementItem,
  } = useShoppingCart();

  const addItemToCart = useCallback(
    () =>
      addItem({
        id: product.id,
        price: product.unit_amount,
        currency: product.currency,
      }),
    [addItem, product.currency, product.unit_amount, product.id]
  );

  const quantityInCart = useMemo(() => cartDetails[product.id]?.quantity ?? 0, [
    cartDetails,
    product.id,
  ]);

  return (
    <>
      {quantityInCart ? (
        <div className="cart-buttons">
          <button
            className="light-btn"
            onClick={() => decrementItem(product.id)}
          >
            -
          </button>
          <div className="cart-buttons__quantity">
            {quantityInCart} bag{quantityInCart !== 1 ? "s" : ""}
          </div>
          <button
            className="light-btn"
            onClick={() => incrementItem(product.id)}
          >
            +
          </button>
        </div>
      ) : (
        <button className="light-btn" onClick={addItemToCart}>
          Add to cart
        </button>
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
          <div className="product-item__title">{product.product.name}</div>
          <div className="product-item__price-box">
            <div className="product-item__price-tag">
              ${product.unit_amount / 100}
            </div>
            <CartButtons product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};
