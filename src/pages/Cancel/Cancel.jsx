import { useNavigate } from "react-router-dom"

import { ROUTES } from "../../utils/constants"

import styles from "./Cancel.module.scss"

const Cancel = () => {
   let navigate = useNavigate()

   return (
      <main className={styles.cancel}>
         <div className="container">
            <header className={styles["cancel-head"]}>
               <h2>Order Cancelled!</h2>
            </header>
            <p>Your order has been cancelled.</p>
            <div className={styles["btn-wrapper"]}>
               <button
                  className="btn-red-brick"
                  onClick={() => navigate(ROUTES.home)}
               >
                  Back To Home
               </button>
               <button
                  className="btn-red-brick"
                  onClick={() => navigate(ROUTES.menu)}
               >
                  Order Again
               </button>
            </div>
         </div>
      </main>
   )
}

export default Cancel
