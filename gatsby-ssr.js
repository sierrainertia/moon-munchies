import React from "react";
import { DeliveryContextProvider } from "./src/components/delivery-provider";

export const wrapPageElement = ({ element }) => {
  return <DeliveryContextProvider>{element}</DeliveryContextProvider>;
};
