import React, { useContext } from "react"
import { Link } from "react-router-dom"

import AuthContext from "../../context/AuthContext"
import CartContext from "../../context/CartContext"
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
               <Link to="/menu" className="nav-link">
                  Menu
               </Link>
            </li>
            <li>
               <Link to="/cart" className="nav-link">
                  Cart - {numberOfItems}
               </Link>
            </li>
            {!authCtx.isLoggedIn ? (
               <li>
                  <Link to="/auth">Login</Link>
               </li>
            ) : (
               <li>
                  <Link to="/profile">Profile</Link>
               </li>
            )}
            {authCtx.isLoggedIn && (
               <li>
                  <button onClick={authCtx.logout}>Logout</button>
               </li>
            )}
         </ul>
      </nav>
   )
}

export default Navbar
