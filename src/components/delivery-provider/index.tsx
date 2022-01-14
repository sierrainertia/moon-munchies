import React, { createContext, useContext, useState } from "react";

export const DELIVERY = "DELIVERY";
export const PICKUP = "PICKUP";

const DeliveryContext = createContext({
  value: "PICKUP",
  setValue: () => {
    // noop
  },
});

export const DeliveryContextProvider = ({
  children,
}: {
  children: React.ReactChild;
}) => {
  const [value, setValue] = useState("PICKUP");

  return (
    <DeliveryContext.Provider value={{ value, setValue }}>
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDeliveryContext = () => {
  const { value, setValue } = useContext(DeliveryContext);

  return { value, setValue };
};
