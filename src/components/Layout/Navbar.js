import React, { useContext } from "react"
import { NavLink } from "react-router-dom"

import AuthContext from "../../context/AuthContext"
import CartContext from "../../context/CartContext"
import IconCart from "../../assets/icons/IconCart"
import IconUser from "../../assets/icons/IconUser"

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
               <NavLink to="/" activeClassName={styles["active-link"]} exact>
                  Home
               </NavLink>
            </li>
            <li>
               <NavLink to="/menu" activeClassName={styles["active-link"]}>
                  Menu
               </NavLink>
            </li>
            <li>
               <NavLink to="/contact" activeClassName={styles["active-link"]}>
                  Contact
               </NavLink>
            </li>
            <li>
               <NavLink to="/cart">
                  <IconCart />
               </NavLink>
            </li>
            <li>
               <NavLink to="/profile">
                  <IconUser />
               </NavLink>
            </li>
            {!authCtx.isLoggedIn ? (
               <li>
                  <NavLink className="btn-red" to="/auth">
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
