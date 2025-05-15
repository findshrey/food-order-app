import React from "react"
import { useNavigate } from "react-router-dom"

import * as ROUTES from "../../constants/routes"

import styles from "./Cancel.module.scss"

const Cancel = () => {
   let navigate = useNavigate()

   return (
      <section className={styles.cancel}>
         <div className="container">
            <header className={styles["cancel-head"]}>
               <h2>Order Cancelled!</h2>
            </header>
            <p>Your order has been cancelled.</p>
            <div className={styles["btn-wrapper"]}>
               <button
                  className="btn-red-brick"
                  onClick={() => navigate(ROUTES.HOME)}
               >
                  Back To Home
               </button>
               <button
                  className="btn-red-brick"
                  onClick={() => navigate(ROUTES.MENU)}
               >
                  Order Again
               </button>
            </div>
         </div>
      </section>
   )
}

export default Cancel
