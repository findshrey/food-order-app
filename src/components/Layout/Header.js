import React, { useContext } from "react"
import { Link, NavLink } from "react-router-dom"

import * as ROUTES from "../../constants/routes"
import { IconCart, IconUser } from "../../icons"
import NAV_LINKS from "../../constants/navLinks"
import AuthContext from "../../context/AuthContext"
import CartContext from "../../context/CartContext"

import styles from "./Header.module.scss"

const Header = () => {
   const cartCtx = useContext(CartContext)
   const authCtx = useContext(AuthContext)

   const numberOfItems = cartCtx.cartItems.reduce((acc, cartItem) => {
      return acc + cartItem.quantity
   }, 0)

   return (
      <header className={styles["main-head"]}>
         <div className="container">
            <nav className={styles["nav-primary"]}>
               <div className={styles.logo}>
                  <Link to={ROUTES.HOME}>
                     <h1>
                        <span>React</span>Meals
                     </h1>
                  </Link>
               </div>
               <ul className={styles["nav-left"]}>
                  {NAV_LINKS.map((link, index) => (
                     <li key={index}>
                        <NavLink
                           to={link.url}
                           activeClassName={styles["active-link"]}
                        >
                           {link.name}
                        </NavLink>
                     </li>
                  ))}
               </ul>
               <ul className={styles["nav-right"]}>
                  <li>
                     <NavLink to={ROUTES.CART}>
                        <IconCart />
                     </NavLink>
                  </li>
                  <li>
                     <NavLink to={ROUTES.PROFILE}>
                        <IconUser />
                     </NavLink>
                  </li>
                  {!authCtx.isLoggedIn ? (
                     <li>
                        <NavLink className="btn-mustard" to={ROUTES.AUTH}>
                           Login
                        </NavLink>
                     </li>
                  ) : (
                     <li>
                        <button
                           className="btn-mustard"
                           onClick={authCtx.logout}
                        >
                           Logout
                        </button>
                     </li>
                  )}
               </ul>
            </nav>
         </div>
      </header>
   )
}

export default Header
