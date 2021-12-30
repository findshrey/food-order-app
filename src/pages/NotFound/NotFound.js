import React from "react"
import { Link } from "react-router-dom"

import { HOME } from "../../constants/routes"
import styles from "./NotFound.module.scss"

const NotFound = () => {
   return (
      <section className={styles["not-found"]}>
         <div className="container">
            <h2>
               <span>404 - Not Found.</span>
               <Link to={HOME}>Go Home</Link>
            </h2>
         </div>
      </section>
   )
}

export default NotFound
