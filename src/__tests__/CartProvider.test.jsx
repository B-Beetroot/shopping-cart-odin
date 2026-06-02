import { renderHook, act } from "@testing-library/react";
import CartProvider from "../context/CartProvider";
import { CartContext } from "../context/CartContext";
import React from "react";
import { test, expect } from "vitest";

test("provides default empty cart", () => {
  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

  const { result } = renderHook(() => React.useContext(CartContext), {
    wrapper,
  });

  expect(result.current.cart).toEqual([]);
});

test("setCart updates cart", () => {
  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

  const { result } = renderHook(() => React.useContext(CartContext), {
    wrapper,
  });

  act(() => {
    result.current.setCart([{ id: 1, quantity: 2 }]);
  });

  expect(result.current.cart).toEqual([{ id: 1, quantity: 2 }]);
});

test("cartCount calculates correctly", () => {
  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

  const { result } = renderHook(() => React.useContext(CartContext), {
    wrapper,
  });

  act(() => {
    result.current.setCart([
      { id: 1, quantity: 2 },
      { id: 2, quantity: 3 },
    ]);
  });

  expect(result.current.cartCount).toBe(5);
});
