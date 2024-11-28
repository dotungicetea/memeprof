"use client";

import { useCart } from "../hooks/useCart";
import { useEffect } from "react";

const BeforeUnload = () => {
  const { clearCart, items } = useCart();

  useEffect(() => {
    const handleBeforeUnload = () => {
      clearCart();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      }

      if (items.length) clearCart();
    };
  }, [clearCart, items.length]);

  return null;
};

export default BeforeUnload;
