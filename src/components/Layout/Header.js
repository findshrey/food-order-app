import React from "react"
import { Link } from "react-router-dom"

import Navbar from "./Navbar"
import styles from "./Header.module.scss"

const Header = () => {
   return (
      <header className={styles["main-head"]}>
         <div className="container">
            <Link to="/">
               <div className="logo">
                  <h1>ReactMeals</h1>
               </div>
            </Link>
            <Navbar />
         </div>
      </header>
   )
}

export default Header
