import React from "react"

import imgHero from "../../assets/img-hero.png"
import styles from "./Hero.module.scss"

const Hero = () => {
   return (
      <section className={styles.hero}>
         <div className={styles["hero-text"]}>
            <h2>BE THE FASTEST IN DELIVERING YOUR FOOD</h2>
            <p>
               Our job is to fill your tummy with delicious food and with fast
               and free delivery
            </p>
            <button>Get Started</button>
         </div>
         <div className={styles["hero-img"]}>
            <img src={imgHero} />
         </div>
      </section>
   )
}

export default Hero
