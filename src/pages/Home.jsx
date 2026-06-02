import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <h1>Welcome to Store</h1>
        <p>Your trusted place for quality products at great prices.</p>

        <Link to="/shop" className={styles.imageLink}>
          <img
            src="https://images.unsplash.com/photo-1472851294608-062f824d29cc"
            alt="Shop our collection"
            className={styles.heroImage}
          />
        </Link>

        <h2 className={styles.cta}>Start Shopping</h2>
      </section>
    </main>
  );
}
