import React from "react";
import { DeliveryContextProvider } from "./src/components/delivery-provider";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";

Bugsnag.start({
  apiKey: "17b8f3e8cc06ebd5bb9fe74c9f122c0f",
  plugins: [new BugsnagPluginReact()],
});

const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

export const wrapPageElement = ({ element }) => {
  return (
    <ErrorBoundary>
      <DeliveryContextProvider>{element}</DeliveryContextProvider>
    </ErrorBoundary>
  );
};
