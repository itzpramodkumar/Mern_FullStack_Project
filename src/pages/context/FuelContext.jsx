
import { createContext, useState } from "react";

export const FuelContext = createContext();

export const FuelProvider = ({ children }) => {
  const [selectedFuel, setSelectedFuel] = useState("petrol");

  return (
    <FuelContext.Provider value={{ selectedFuel, setSelectedFuel }}>
      {children}
    </FuelContext.Provider>
  );
};
