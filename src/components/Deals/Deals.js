import React from "react"

import styles from "./Deals.module.scss"

const Deals = () => {
   return (
      <section className={styles.deals}>
         <header className={styles["deals-head"]}>
            <h2>DEALS & OFFERS</h2>
         </header>
         <div className={styles["deals-inner"]}>
            <div className="content">
               <p>
                  No deals available. <br />
                  Check back later!
               </p>
            </div>
         </div>
      </section>
   )
}

export default Deals
