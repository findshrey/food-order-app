import React, { useContext } from "react"
import { NavLink } from "react-router-dom"

import * as ROUTES from "../../constants/routes"
import AuthContext from "../../context/AuthContext"
import CartContext from "../../context/CartContext"
import IconCart from "../../icons/IconCart"
import IconUser from "../../icons/IconUser"

import styles from "./Navbar.module.scss"

const Navbar = () => {
   const cartCtx = useContext(CartContext)
   const authCtx = useContext(AuthContext)

   const numberOfItems = cartCtx.cartItems.reduce((acc, cartItem) => {
      return acc + cartItem.quantity
   }, 0)

   return (
      <nav className={styles.navbar}>
         <ul>
            <li>
               <NavLink
                  to={ROUTES.HOME}
                  activeClassName={styles["active-link"]}
                  exact
               >
                  Home
               </NavLink>
            </li>
            <li>
               <NavLink
                  to={ROUTES.MENU}
                  activeClassName={styles["active-link"]}
               >
                  Menu
               </NavLink>
            </li>
            <li>
               <NavLink
                  to={ROUTES.CONTACT}
                  activeClassName={styles["active-link"]}
               >
                  Contact
               </NavLink>
            </li>
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
                  <NavLink className="btn-red" to={ROUTES.AUTH}>
                     Login
                  </NavLink>
               </li>
            ) : (
               <li>
                  <button className="btn-red" onClick={authCtx.logout}>
                     Logout
                  </button>
               </li>
            )}
         </ul>
      </nav>
   )
}

export default Navbar
