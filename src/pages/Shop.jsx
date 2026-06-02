import ProductCard from "../components/ProductCard";
import styles from "./Shop.module.css";

export default function Shop() {
  return (
    <div className={styles.shopPage}>
      <h1 className={styles.title}>Products</h1>
      <ProductCard />
    </div>
  );
}
