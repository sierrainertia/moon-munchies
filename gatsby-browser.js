import React from "react";
import {
  DeliveryContextProvider,
  useDeliveryContext,
} from "./src/components/delivery-provider";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import { CartProvider } from "use-shopping-cart";
import smoothscroll from "smoothscroll-polyfill";

Bugsnag.start({
  apiKey: "17b8f3e8cc06ebd5bb9fe74c9f122c0f",
  plugins: [new BugsnagPluginReact()],
});

smoothscroll.polyfill();

const stripeKey = process.env.GATSBY_STRIPE_PUBLISHABLE_KEY;

const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

const OuterProvider = ({ children }) => (
  <ErrorBoundary>
    <DeliveryContextProvider>{children}</DeliveryContextProvider>
  </ErrorBoundary>
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
