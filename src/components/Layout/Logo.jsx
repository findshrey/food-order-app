import { Link } from "react-router-dom"

import { ROUTES } from "../../utils/constants"

import styles from "./Logo.module.scss"

const Logo = () => {
   return (
      <div className={styles.logo}>
         <Link to={ROUTES.home}>
            <h1>
               <span>React</span>Meals
            </h1>
         </Link>
      </div>
   )
}

export default Logo
