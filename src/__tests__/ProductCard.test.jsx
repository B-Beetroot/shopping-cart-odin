import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import { vi, test, expect } from "vitest";

globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, title: "Test Product", price: 10, image: "img.png" },
      ]),
  }),
);

function renderWithCart(ui, cartValue = { cart: [], setCart: vi.fn() }) {
  return render(
    <CartContext.Provider value={cartValue}>{ui}</CartContext.Provider>,
  );
}

test("renders fetched products", async () => {
  renderWithCart(<ProductCard />);

  expect(await screen.findByText("Test Product")).toBeInTheDocument();
});

test("increments quantity", async () => {
  renderWithCart(<ProductCard />);

  const plusBtn = await screen.findByText("+");
  fireEvent.click(plusBtn);

  const input = screen.getByRole("spinbutton");
  expect(input.value).toBe("2");
});

test("adds product to cart", async () => {
  const setCart = vi.fn();
  renderWithCart(<ProductCard />, { cart: [], setCart });

  const addBtn = await screen.findByText("Add To Cart");
  fireEvent.click(addBtn);

  expect(setCart).toHaveBeenCalled();
});

test("shows toast when adding to cart", async () => {
  renderWithCart(<ProductCard />);

  const addBtn = await screen.findByText("Add To Cart");
  fireEvent.click(addBtn);

  expect(await screen.findByText(/added to cart/i)).toBeInTheDocument();
});
