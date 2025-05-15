import { useNavigate } from "react-router-dom"

import { ROUTES } from "../../utils/constants"
import imgCooking from "../../assets/images/cooking.svg"
import useTitle from "../../hooks/useTitle"

import styles from "./Homepage.module.scss"

const Homepage = () => {
   let navigate = useNavigate()
   useTitle("React Meals | Home")

   // Navigate to menu
   const handleOrder = () => {
      navigate(ROUTES.menu)
   }

   return (
      <section className={styles.hero}>
         <div className="container">
            <div className={styles["hero-text"]}>
               <h2>
                  Made With Love, <span>Savoured</span> With Interest
               </h2>
               <p>
                  Our job is to fill your tummy with delicious food and fast and
                  free delivery!
               </p>
               <button className="btn-yellow-mustard" onClick={handleOrder}>
                  Order Food
               </button>
            </div>
            <div className={styles["hero-img"]}>
               <img src={imgCooking} />
            </div>
         </div>
      </section>
   )
}

export default Homepage
