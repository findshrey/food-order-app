import React from "react"

import imgHero from "../../assets/img-hero.png"
import styles from "./Hero.module.scss"

const Hero = () => {
   return (
      <section className={styles.hero}>
         <div className={styles["hero-text"]}>
            <h2>
               Be The Fastest In Delivering Your <span>Food</span>
            </h2>
            <p>
               Our job is to fill your tummy with delicious food with fast and
               free delivery
            </p>
            <button className="btn-red">Order Food</button>
         </div>
         <div className={styles["hero-img"]}>
            <img src={imgHero} />
         </div>
      </section>
   )
}

export default Hero
