import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";

function renderNav(cartCount = 0) {
  return render(
    <BrowserRouter>
      <CartContext.Provider value={{ cartCount }}>
        <Navbar />
      </CartContext.Provider>
    </BrowserRouter>,
  );
}

test("renders Home and Shop links", () => {
  renderNav();

  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Shop")).toBeInTheDocument();
});

test("shows cart count badge", () => {
  renderNav(3);

  expect(screen.getByText("3")).toBeInTheDocument();
});

test("hides badge when cartCount is 0", () => {
  renderNav(0);

  expect(screen.queryByText("0")).not.toBeInTheDocument();
});
