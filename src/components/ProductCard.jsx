import { useEffect, useState, useRef } from "react";
import { useCart } from "../context/useCart.js";
import styles from "./ProductCard.module.css";

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const { setCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        const withQty = data.map((p) => ({ ...p, qty: 1 }));
        setProducts(withQty);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    loadProducts();
  }, []);

  const updateQty = (id, newQty) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, newQty) } : p)),
    );
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.qty }
            : item,
        );
      }

      return [...prev, { ...product, quantity: product.qty }];
    });

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    const id = Date.now();
    setToast({ id, message: `${product.title} added to cart!` });

    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  return (
    <div className={styles.wrapper}>
      {toast && (
        <div key={toast.id} className={styles.toast}>
          {toast.message}
        </div>
      )}

      <div className={styles.grid}>
        {products.map((p) => (
          <div key={p.id} className={styles.card}>
            <img src={p.image} alt={p.title} className={styles.productImage} />

            <h3 className={styles.productTitle}>{p.title}</h3>
            <p className={styles.price}>{p.price} USD</p>

            <div className={styles.qtyControls}>
              <button onClick={() => updateQty(p.id, p.qty - 1)}>-</button>

              <input
                type="number"
                value={p.qty}
                onChange={(e) => updateQty(p.id, Number(e.target.value))}
                className={styles.qtyInput}
              />

              <button onClick={() => updateQty(p.id, p.qty + 1)}>+</button>
            </div>

            <button className={styles.addButton} onClick={() => addToCart(p)}>
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
