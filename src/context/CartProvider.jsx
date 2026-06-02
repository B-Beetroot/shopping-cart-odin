import { useState } from "react";
import { CartContext } from "./CartContext.js";

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, setCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}
