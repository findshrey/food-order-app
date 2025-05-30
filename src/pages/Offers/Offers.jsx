import useTitle from "../../hooks/useTitle"

import styles from "./Offers.module.scss"

const Offers = () => {
   useTitle("React Meals | Deals & Offers")

   return (
      <main className={styles.offers}>
         <section className="container">
            <header className={styles["offers-head"]}>
               <h2>DEALS & OFFERS</h2>
            </header>
            <p className={styles["offers-inner"]}>
               No deals available. <br />
               Check back later!
            </p>
         </section>
      </main>
   )
}

export default Offers
