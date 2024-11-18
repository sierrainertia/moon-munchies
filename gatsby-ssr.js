/* global process */
import React from "react";
import {
  DeliveryContextProvider,
  useDeliveryContext,
} from "./src/components/delivery-provider";
import { CartProvider } from "use-shopping-cart";

const stripeKey = process.env.GATSBY_STRIPE_PUBLISHABLE_KEY;

const OuterProvider = ({ children }) => (
  <DeliveryContextProvider>{children}</DeliveryContextProvider>
);

const InnerProvider = ({ children }) => {
  const { value } = useDeliveryContext();

  let baseUrl;

  if (typeof window !== "undefined") {
    baseUrl = window.location.origin;
  } else {
    baseUrl = process.env.URL;
  }

  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={stripeKey}
      successUrl={`${baseUrl}/success/`}
      cancelUrl={baseUrl}
      currency="CAD"
      allowedCountries={value === "DELIVERY" ? ["CA"] : []} // CA somehow just enables shipping address collection
    >
      {children}
    </CartProvider>
  );
};

export const wrapPageElement = ({ element }) => {
  return (
    <OuterProvider>
      <InnerProvider>{element}</InnerProvider>
    </OuterProvider>
  );
};
