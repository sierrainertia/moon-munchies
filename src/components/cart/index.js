import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { useDeliveryContext } from "../delivery-provider";
import Img from "gatsby-image";
import { useDebouncedCallback } from "use-debounce";
import "./index.scss";

const DELIVERY_CUTOFF = 7000; // $70 (in cents)
const DELIVERY_FEE_5 = "DELIVERY_FEE_5";
const DELIVERY_FEE_20 = "DELIVERY_FEE_20";

const CartItem = ({ product, deliveryFee = false }) => {
  const { decrementItem, incrementItem } = useShoppingCart();

  const imgData = product.product?.localFiles[0].childImageSharp.fluid;

  return (
    <div className="cart-item">
      {imgData && (
        <Img
          style={{ width: 75, marginRight: 20, borderRadius: 10 }}
          fluid={imgData}
        />
      )}
      <div className="cart-item__contents">
        <div className="cart-item__title">
          {deliveryFee ? "Delivery Fee" : product.product?.name}
        </div>
        {deliveryFee && <span>${product.price / 100}</span>}
        {!deliveryFee && (
          <div className="cart-buttons">
            <button
              className="light-btn"
              onClick={() => decrementItem(product.id)}
            >
              -
            </button>
            <div className="cart-buttons__quantity">
              {product.quantity} bag{product.quantity !== 1 ? "s" : ""}
            </div>
            <button
              className="light-btn"
              onClick={() => incrementItem(product.id)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const Cart = ({ prices }) => {
  const [cartExpanded, setCartExpanded] = useState(false);

  const {
    addItem,
    cartCount,
    cartDetails,
    redirectToCheckout,
    removeItem,
    totalPrice,
  } = useShoppingCart();

  const cartProducts = useMemo(
    () =>
      Object.values(cartDetails).map((cartItem) => {
        const cartItemPrice = prices.find((price) => price.id === cartItem.id);
        return {
          ...cartItem,
          product: cartItemPrice?.product,
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

  const { value, setValue } = useDeliveryContext();

  const _manageDeliveryFees = useDebouncedCallback(() => {
    const deliveryFee5Present = Object.values(cartDetails).find(
      (item) => item.id === DELIVERY_FEE_5
    );
    const deliveryFee20Present = Object.values(cartDetails).find(
      (item) => item.id === DELIVERY_FEE_20
    );
    // Are candies in the cart?
    const candiesInCart =
      Object.values(cartDetails).filter(
        (item) => ![DELIVERY_FEE_5, DELIVERY_FEE_20].includes(item.id)
      )?.length > 0;
    const candyTotalPrice = Object.values(cartDetails).reduce(
      (total, curr) =>
        total +
        ([DELIVERY_FEE_5, DELIVERY_FEE_20].includes(curr.id)
          ? 0
          : curr.price * curr.quantity),
      0
    );

    console.log("candiesInCart", candiesInCart);
    console.log("candyTotalPrice", candyTotalPrice);

    if (value === "DELIVERY" && candiesInCart) {
      if (candyTotalPrice >= DELIVERY_CUTOFF) {
        if (deliveryFee20Present) {
          console.log("Removing a $20 delivery fee");
          removeItem(DELIVERY_FEE_20);
        }
        if (!deliveryFee5Present) {
          console.log("Adding a $5 delivery fee");
          addItem({
            id: DELIVERY_FEE_5,
            price: 500,
            currency: "CAD",
          });
        }
      } else {
        if (deliveryFee5Present) {
          console.log("Removing a $5 delivery fee");
          removeItem(DELIVERY_FEE_5);
        }
        if (!deliveryFee20Present) {
          console.log("Adding a $20 delivery fee");
          addItem({
            id: DELIVERY_FEE_20,
            price: 2000,
            currency: "CAD",
          });
        }
      }
    } else {
      if (deliveryFee5Present) {
        console.log("Removing a $5 delivery fee");
        removeItem(DELIVERY_FEE_5);
      }
      if (deliveryFee20Present) {
        console.log("Removing a $20 delivery fee");
        removeItem(DELIVERY_FEE_20);
      }
    }
  }, 100);

  useEffect(() => _manageDeliveryFees(), [
    value,
    totalPrice,
    _manageDeliveryFees,
  ]);

  return (
    <div
      className={`cart ${cartExpanded ? "cart--expanded" : ""} ${
        cartCount < 1 ? "cart--empty" : ""
      }`}
    >
      <button
        className="cart__checkout-button"
        onClick={() => setCartExpanded(true)}
      >
        Checkout {cartCount} item{cartCount === 1 ? "" : "s"} ($
        {totalPrice / 100}.00)
      </button>
      <div className="cart__page">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <h2>Your cart</h2>
          <button
            className="cart__close-button"
            onClick={() => setCartExpanded(false)}
          >
            &times;
          </button>
        </div>
        <div className="cart__item-list">
          {cartProducts.length > 0 ? (
            <>
              <ul>
                {cartProducts
                  .reduce((products, product) => {
                    return product.id.indexOf("DELIVERY_") > -1
                      ? [...products, product]
                      : [product, ...products];
                  }, [])
                  .map((product) => {
                    return (
                      <li key={product.id}>
                        <CartItem
                          product={product}
                          deliveryFee={product.id.indexOf("DELIVERY_") > -1}
                        />
                      </li>
                    );
                  })}
              </ul>
              {totalPrice && (
                <div className="cart__total">
                  <span>Total</span>
                  <span>${totalPrice / 100}</span>
                </div>
              )}
            </>
          ) : (
            <p>
              Your cart is empty. Add some items from the list of products to
              make a purchase.
            </p>
          )}
        </div>
        <div className="cart__footer">
          <div>
            <p style={{ fontWeight: "bold", marginBottom: 20 }}>
              How would you like to receive you order?
            </p>
            <div className="cart__pickup-options-container">
              <div>
                <input
                  type="radio"
                  id="shipping-mode-pickup"
                  checked={value === "PICKUP"}
                  onChange={() => setValue("PICKUP")}
                />
                <label htmlFor="shipping-mode-pickup">
                  Pickup (Calgary and surrounding area)
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="shipping-mode-delivery"
                  checked={value === "DELIVERY"}
                  onChange={() => setValue("DELIVERY")}
                />
                <label htmlFor="shipping-mode-delivery">Delivery</label>
              </div>
            </div>
          </div>
          <div className="cart__checkout-button-box">
            {value === "PICKUP" ? (
              <></>
            ) : (
              <p>Delivery is possible in Canada only</p>
            )}
            <button className="primary-btn" onClick={redirectToCheckout}>
              Proceed to payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
