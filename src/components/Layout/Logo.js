import React from "react"
import { Link } from "react-router-dom"

import { HOME } from "../../constants/routes"

import styles from "./Logo.module.scss"

const Logo = () => {
   return (
      <div className={styles.logo}>
         <Link to={HOME}>
            <h1>
               <span>React</span>Meals
            </h1>
         </Link>
      </div>
   )
}

export default Logo
