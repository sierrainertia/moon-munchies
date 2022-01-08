import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { useDeliveryContext } from "../delivery-provider";
import Img from "gatsby-image";
import { useDebouncedCallback } from "use-debounce";
import { formatMoney } from "../../utils";
import "./index.scss";

const DELIVERY_CUTOFF = 9800; // $70 (in cents)

const DELIVERY_DISCOUNT_HINT_THRESHOLD = 4900; // $49 (in cents)

const CartItem = ({ product, deliveryFee = false }) => {
  const { decrementItem, incrementItem } = useShoppingCart();

  const imgData = product.product?.localFiles?.[0]?.childImageSharp.fluid;

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

  const DELIVERY_FEE_REGULAR = useMemo(
    () =>
      prices.find((price) => price.product.metadata.delivery_fee === "regular"),
    [prices]
  );
  const DELIVERY_FEE_DISCOUNT = useMemo(
    () =>
      prices.find(
        (price) => price.product.metadata.delivery_fee === "discount"
      ),
    [prices]
  );

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

  const candyTotalPrice = useMemo(
    () =>
      Object.values(cartDetails).reduce(
        (total, curr) =>
          total +
          ([DELIVERY_FEE_DISCOUNT.id, DELIVERY_FEE_REGULAR.id].includes(curr.id)
            ? 0
            : curr.price * curr.quantity),
        0
      ),
    [DELIVERY_FEE_DISCOUNT.id, DELIVERY_FEE_REGULAR.id, cartDetails]
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
    const deliveryFeeDiscountPresent = Object.values(cartDetails).find(
      (item) => item.id === DELIVERY_FEE_DISCOUNT.id
    );

    const deliveryFeeRegularPresent = Object.values(cartDetails).find(
      (item) => item.id === DELIVERY_FEE_REGULAR.id
    );

    // Are candies in the cart?
    const candiesInCart =
      Object.values(cartDetails).filter(
        (item) =>
          ![DELIVERY_FEE_DISCOUNT.id, DELIVERY_FEE_REGULAR.id].includes(item.id)
      )?.length > 0;

    if (value === "DELIVERY" && candiesInCart) {
      if (candyTotalPrice >= DELIVERY_CUTOFF) {
        if (deliveryFeeRegularPresent) {
          console.log("Removing a regular delivery fee", DELIVERY_FEE_REGULAR);
          removeItem(DELIVERY_FEE_REGULAR.id);
        }
        if (!deliveryFeeDiscountPresent) {
          // Commented out so that it's free shipping above a certain amount
          // console.log("Adding a discount delivery fee", DELIVERY_FEE_DISCOUNT);
          // addItem({
          //   id: DELIVERY_FEE_DISCOUNT.id,
          //   price: DELIVERY_FEE_DISCOUNT.unit_amount,
          //   currency: "CAD",
          // });
        }
      } else {
        if (deliveryFeeDiscountPresent) {
          console.log(
            "Removing a discount delivery fee",
            DELIVERY_FEE_DISCOUNT
          );
          removeItem(DELIVERY_FEE_DISCOUNT.id);
        }
        if (!deliveryFeeRegularPresent) {
          console.log("Adding a regular delivery fee", DELIVERY_FEE_REGULAR);
          addItem({
            id: DELIVERY_FEE_REGULAR.id,
            price: DELIVERY_FEE_REGULAR.unit_amount,
            currency: "CAD",
          });
        }
      }
    } else {
      if (deliveryFeeDiscountPresent) {
        console.log("Removing a discount delivery fee", DELIVERY_FEE_DISCOUNT);
        removeItem(DELIVERY_FEE_DISCOUNT.id);
      }
      if (deliveryFeeRegularPresent) {
        console.log("Removing a regular delivery fee", DELIVERY_FEE_REGULAR);
        removeItem(DELIVERY_FEE_REGULAR.id);
      }
    }
  }, 100);

  useEffect(_manageDeliveryFees, [
    value,
    totalPrice,
    DELIVERY_FEE_REGULAR,
    DELIVERY_FEE_DISCOUNT,
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
        Checkout {cartCount} item{cartCount === 1 ? "" : "s"} (
        {formatMoney(totalPrice)})
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
                {/* // .reduce((products, product) => {
                //   product.product.metadata.delivery_fee
                //     ? [...products, product]
                //     : [product, ...products];
                // }, []) */}
                {cartProducts.map((product) => {
                  return (
                    <li key={product.id}>
                      <CartItem
                        product={product}
                        deliveryFee={product.product.metadata.delivery_fee}
                      />
                    </li>
                  );
                })}
              </ul>
              {totalPrice && (
                <div className="cart__total">
                  <span>Total</span>
                  <span>{formatMoney(totalPrice)}</span>
                </div>
              )}
              {value === "DELIVERY" &&
                candyTotalPrice < DELIVERY_CUTOFF &&
                candyTotalPrice >= DELIVERY_DISCOUNT_HINT_THRESHOLD && (
                  <div className="cart__discount-notice">
                    <span>
                      Add only ${(DELIVERY_CUTOFF - candyTotalPrice) / 100} more
                      for free shipping!
                    </span>
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
                  Free Pickup (Airdrie, AB)
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
