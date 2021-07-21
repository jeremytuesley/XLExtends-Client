import { useState, useEffect } from "react";
import { createModel } from "hox";

function useCart() {
  const [cartData, setCart] = useState(
    JSON.parse(localStorage.getItem("Cart")) || []
  );

  const [cartDisplay, setCartDisplay] = useState(false);

  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cartData));
  }, [cartData]);

  return {
    cartData,
    setCart,
    cartDisplay,
    setCartDisplay
  };
}

export default createModel(useCart);
