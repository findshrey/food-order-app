import React from "react"
import { Link } from "react-router-dom"

import { HOME } from "../../constants/routes"
import Navbar from "./Navbar"

import styles from "./Header.module.scss"

const Header = () => {
   return (
      <header className={styles["main-head"]}>
         <div className="container">
            <Link to={HOME}>
               <div className={styles.logo}>
                  <h1>
                     <span>React</span>Meals
                  </h1>
               </div>
            </Link>
            <Navbar />
         </div>
      </header>
   )
}

export default Header
