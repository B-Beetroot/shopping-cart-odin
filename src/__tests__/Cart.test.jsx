import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "../pages/Cart";
import { CartContext } from "../context/CartContext";
import { vi, test, expect } from "vitest";

function renderWithCart(cart, setCart = vi.fn()) {
  return render(
    <CartContext.Provider value={{ cart, setCart }}>
      <Cart />
    </CartContext.Provider>,
  );
}

test("shows empty message when cart is empty", () => {
  renderWithCart([]);

  expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
});

test("renders cart items", () => {
  renderWithCart([{ id: 1, title: "Item", price: 10, quantity: 1, image: "" }]);

  expect(screen.getByText("Item")).toBeInTheDocument();
});

test("increase quantity triggers setCart", () => {
  const setCart = vi.fn();
  renderWithCart(
    [{ id: 1, title: "Item", price: 10, quantity: 1, image: "" }],
    setCart,
  );

  fireEvent.click(screen.getByText("+"));
  expect(setCart).toHaveBeenCalled();
});

test("remove item triggers setCart", () => {
  const setCart = vi.fn();
  renderWithCart(
    [{ id: 1, title: "Item", price: 10, quantity: 1, image: "" }],
    setCart,
  );

  fireEvent.click(screen.getByRole("button", { name: "" }));
  expect(setCart).toHaveBeenCalled();
});

test("shows total price", () => {
  renderWithCart([{ id: 1, title: "Item", price: 10, quantity: 2, image: "" }]);

  expect(screen.getByText("Total: 20.00 USD")).toBeInTheDocument();
});
