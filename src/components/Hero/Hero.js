import React from "react"

import styles from "./Hero.module.scss"
import imgCooking from "../../assets/illustrations/cooking.svg"

const Hero = () => {
   return (
      <section className={styles.hero}>
         <div className={styles["hero-text"]}>
            <h2>
               Made with love, <span>savoured</span> with interest.
            </h2>
            <p>
               Our job is to fill your tummy with delicious food with fast and
               free delivery
            </p>
            <button className="btn-red">Order Food</button>
         </div>
         <div className={styles["hero-img"]}>
            <img src={imgCooking} />
         </div>
      </section>
   )
}

export default Hero
