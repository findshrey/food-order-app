import React, { useContext } from "react"
import { Link } from "react-router-dom"

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
               <Link to="/">Home</Link>
            </li>
            <li>
               <Link to="/menu">Menu</Link>
            </li>
            <li>
               <Link to="/contact">Contact</Link>
            </li>
            <li>
               <Link to="/cart">
                  <IconCart />
               </Link>
            </li>
            <li>
               <Link to="/profile">
                  <IconUser />
               </Link>
            </li>
            {!authCtx.isLoggedIn ? (
               <li>
                  <Link to="/auth">Login</Link>
               </li>
            ) : (
               <li>
                  <button onClick={authCtx.logout}>Logout</button>
               </li>
            )}
         </ul>
      </nav>
   )
}

export default Navbar
