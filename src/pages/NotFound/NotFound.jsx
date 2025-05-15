import { Link } from "react-router-dom"

import { ROUTES } from "../../utils/constants"
import useTitle from "../../hooks/useTitle"

import styles from "./NotFound.module.scss"

const NotFound = () => {
   useTitle("React Meals | Not Found")

   return (
      <section className={styles["not-found"]}>
         <div className="container">
            <h2>
               <span>404 - Not Found.</span>
               <Link to={ROUTES.home}>Go Home</Link>
            </h2>
         </div>
      </section>
   )
}

export default NotFound
