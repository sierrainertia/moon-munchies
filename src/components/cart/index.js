import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { useDeliveryContext } from "../delivery-provider";
import Img from "gatsby-image";
import "./index.scss";

const DELIVERY_CUTOFF = 7000; // $70 (in cents)
const DELIVERY_FEE_5 = "DELIVERY_FEE_5";
const DELIVERY_FEE_20 = "DELIVERY_FEE_20";

const CartItem = ({ product }) => {
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
        <div className="cart-item__title">{product.product?.name}</div>
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
      </div>
    </div>
  );
};

export const Cart = ({ prices }) => {
  const [cartExpanded, setCartExpanded] = useState(false);

  const {
    addItem,
    setItemQuantity,
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

  useEffect(() => {
    // Remove all delivery fees
    if (value === "DELIVERY") {
      // Add a delivery fee to the cart
      // console.log("Total price", totalPrice, DELIVERY_CUTOFF);
      if (totalPrice >= DELIVERY_CUTOFF) {
        // console.log("Adding a $5 delivery fee");
        // removeItem(DELIVERY_FEE_ID);
        // addItem({
        //   id: DELIVERY_FEE_ID,
        //   price: 500,
        //   currency: "CAD",
        // });
      } else {
        // if (
        //   Object.values(cartDetails).find((item) => item.id === DELIVERY_FEE_5)
        // ) {
        //   console.log("Clearing a $5 delivery fee");
        //   setItemQuantity(DELIVERY_FEE_5, 0);
        // }
        // if (
        //   Object.values(cartDetails).find(
        //     (item) => item.id === DELIVERY_FEE_20 && item.quantity > 1
        //   )
        // ) {
        //   console.log("Clearing excess $20 delivery fee");
        //   setItemQuantity(DELIVERY_FEE_20, 1);
        // } else {
        //   console.log("Adding a $20 delivery fee");
        //   addItem({
        //     id: DELIVERY_FEE_20,
        //     price: 2000,
        //     currency: "CAD",
        //   });
        // }
      }
    } else {
      // console.log("Removing");
      // if (
      //   Object.values(cartDetails).find((item) => item.id === DELIVERY_FEE_20)
      // ) {
      //   setItemQuantity(DELIVERY_FEE_20, 0);
      // }
      // if (
      //   Object.values(cartDetails).find((item) => item.id === DELIVERY_FEE_5)
      // ) {
      //   setItemQuantity(DELIVERY_FEE_5, 0);
      // }
    }
  }, [value, addItem, removeItem, setItemQuantity, cartDetails]);

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
            <ul>
              {cartProducts.map((product) => {
                return (
                  <li key={product.id}>
                    <CartItem product={product} />
                  </li>
                );
              })}
            </ul>
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
                  Pickup (Calgary area only)
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
              <p>Pickup must be done in Airdrie, AB</p>
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
