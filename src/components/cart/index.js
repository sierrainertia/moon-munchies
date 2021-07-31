import React, { useLayoutEffect, useMemo, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import "./index.scss";

const CartItem = ({ product }) => {
  const { decrementItem, incrementItem } = useShoppingCart();

  return (
    <div className="cart-item">
      <div style={{ display: "flex" }}>
        <img width="50" src={product.product.images[0]} />
        <div className="cart-item__title">{product.product.name}</div>
      </div>
      <div className="cart-buttons">
        <button className="light-btn" onClick={() => decrementItem(product.id)}>
          -
        </button>
        <div className="cart-buttons__quantity">
          {product.quantity} bag{product.quantity !== 1 ? "s" : ""}
        </div>
        <button className="light-btn" onClick={() => incrementItem(product.id)}>
          +
        </button>
      </div>
    </div>
  );
};

export const Cart = ({ prices }) => {
  const [cartExpanded, setCartExpanded] = useState(false);

  const {
    cartCount,
    cartDetails,
    clearCart,
    redirectToCheckout,
    totalPrice,
  } = useShoppingCart();

  const cartProducts = useMemo(
    () =>
      Object.values(cartDetails).map((cartItem) => {
        const x = prices.find((price) => price.id === cartItem.id);
        return {
          ...cartItem,
          product: x.product,
        };
      }),
    [cartDetails, prices]
  );

  useLayoutEffect(() => {
    if (cartExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    () => (document.body.style.overflow = "auto");
  }, [cartExpanded]);

  if (cartCount < 1) {
    if (cartExpanded) {
      setCartExpanded(false);
    }

    return null;
  }

  return (
    <div className={`cart ${cartExpanded ? "cart--expanded" : ""}`}>
      <div className="cart__container">
        <button
          className="cart__checkout-button"
          onClick={() => setCartExpanded(true)}
        >
          Checkout {cartCount} item{cartCount === 1 ? "" : "s"} ($
          {totalPrice / 100}.00)
        </button>
        <div className="cart__page">
          <button
            className="cart__close-button"
            onClick={() => setCartExpanded(false)}
          >
            &times;
          </button>
          <h2>Your cart</h2>
          <ul className="cart__item-list">
            {cartProducts.map((product) => {
              return (
                <li key={product.id}>
                  <CartItem product={product} />
                </li>
              );
            })}
          </ul>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Delivery is currently only possible within the Airdrie area.</p>
            <div>
              <button className="secondary-btn" onClick={clearCart}>
                Clear cart
              </button>
              <button className="primary-btn" onClick={redirectToCheckout}>
                Proceed to payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
