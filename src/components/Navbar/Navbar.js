import React, { useContext } from "react"
import { Link } from "react-router-dom"

import styles from "./Navbar.module.scss"
import CartContext from "../../context/CartContext"

const Navbar = () => {
   const cartCtx = useContext(CartContext)

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
            <li>
               <Link to="/auth">Login</Link>
            </li>
         </ul>
      </nav>
   )
}

export default Navbar
