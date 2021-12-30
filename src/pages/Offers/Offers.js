import React from "react"

import styles from "./Offers.module.scss"

const Offers = () => {
   return (
      <section className={styles.offers}>
         <div className="container">
            <header className={styles["offers-head"]}>
               <h2>DEALS & OFFERS</h2>
            </header>
            <div className={styles["offers-inner"]}>
               <div className="content">
                  <p>
                     No deals available. <br />
                     Check back later!
                  </p>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Offers
