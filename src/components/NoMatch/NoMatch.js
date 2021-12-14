import React from "react"
import { Link } from "react-router-dom"

import { HOME } from "../../constants/routes"
import styles from "./NoMatch.module.scss"

const NoMatch = () => {
   return (
      <section className={styles["no-match"]}>
         <h2>
            <span>404 - Not Found.</span>
            <Link to={HOME}>Go Home</Link>
         </h2>
      </section>
   )
}

export default NoMatch
