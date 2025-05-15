import { useNavigate } from "react-router-dom"

import { ROUTES } from "../../utils/constants"
import imgSuccess from "../../assets/images/order-success.svg"

import styles from "./Success.module.scss"

const Success = () => {
   let navigate = useNavigate()

   return (
      <section className={styles.success}>
         <div className="container">
            <div className={styles["success-text"]}>
               <header className={styles["success-head"]}>
                  <h2>Order Placed!</h2>
               </header>
               <p>
                  Thank you for ordering from React Meals. Your order will be
                  delivered to your home shortly.
               </p>
               <button
                  className="btn-red-brick"
                  onClick={() => navigate(ROUTES.home)}
               >
                  Back To Home
               </button>
            </div>
            <div className={styles["success-img"]}>
               <img src={imgSuccess} />
            </div>
         </div>
      </section>
   )
}

export default Success
