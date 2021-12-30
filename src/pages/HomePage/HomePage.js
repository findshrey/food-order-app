import React from "react"
import { useNavigate } from "react-router-dom"

import { MENU } from "../../constants/routes"
import imgCooking from "../../assets/images/cooking.svg"

import styles from "./HomePage.module.scss"

const HomePage = () => {
   let navigate = useNavigate()

   // Navigate to menu
   const handleOrder = () => {
      navigate(MENU)
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

export default HomePage
