import React, { useState, useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"

import * as ROUTES from "../../constants/routes"
import { IconCart, IconMenu, IconMenuClose, IconUser } from "../../icons"
import NAV_LINKS from "../../constants/navLinks"
import AuthContext from "../../context/AuthContext"
import CartContext from "../../context/CartContext"
import Logo from "./Logo"

import styles from "./Header.module.scss"

const Header = () => {
   const [sideDrawer, setSideDrawer] = useState(false)
   const authCtx = useContext(AuthContext)
   const cartCtx = useContext(CartContext)

   let navigate = useNavigate()

   // Toggle sideDrawer
   const handleSideDrawer = () => {
      setSideDrawer((prevDrawerState) => !prevDrawerState)
   }

   // Add 'active' class
   const activeDrawerClass = sideDrawer ? styles.active : ""

   const numberOfItems = cartCtx.cartItems.reduce((acc, cartItem) => {
      return acc + cartItem.quantity
   }, 0)

   return (
      <header className={styles["main-head"]}>
         <div className="container">
            {/* DESKTOP NAVIGATION */}
            <nav className={styles["nav-desktop"]}>
               <Logo />
               <ul className={styles["nav-left"]}>
                  {NAV_LINKS.map((link, index) => (
                     <li key={index}>
                        <NavLink
                           to={link.url}
                           className={(navData) =>
                              navData.isActive ? styles["active-link"] : ""
                           }
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
                  <li>
                     {!authCtx.isLoggedIn ? (
                        <NavLink
                           to={ROUTES.AUTH}
                           className="btn-yellow-mustard"
                        >
                           Login
                        </NavLink>
                     ) : (
                        <button
                           className="btn-yellow-mustard"
                           onClick={() => {
                              authCtx.logout()
                              navigate(ROUTES.HOME)
                           }}
                        >
                           Logout
                        </button>
                     )}
                  </li>
               </ul>
            </nav>

            {/* MOBILE NAVIGATION */}
            <nav className={styles["nav-mobile"]}>
               <button className={styles.hamburger} onClick={handleSideDrawer}>
                  {sideDrawer ? <IconMenuClose /> : <IconMenu />}
               </button>
               <Logo />
               <div className={styles.cart}>
                  <NavLink to={ROUTES.CART}>
                     <IconCart />
                  </NavLink>
               </div>

               {/* SIDE DRAWER */}
               <ul className={`${styles["side-drawer"]} ${activeDrawerClass}`}>
                  <li>
                     <NavLink
                        to={ROUTES.PROFILE}
                        className={(navData) =>
                           navData.isActive ? styles["active-link"] : ""
                        }
                        onClick={handleSideDrawer}
                     >
                        Profile
                     </NavLink>
                  </li>
                  {NAV_LINKS.map((link, index) => (
                     <li key={index}>
                        <NavLink
                           to={link.url}
                           className={(navData) =>
                              navData.isActive ? styles["active-link"] : ""
                           }
                           onClick={handleSideDrawer}
                        >
                           {link.name}
                        </NavLink>
                     </li>
                  ))}
                  <li>
                     {!authCtx.isLoggedIn ? (
                        <NavLink
                           to={ROUTES.AUTH}
                           className={(navData) =>
                              navData.isActive ? styles["active-link"] : ""
                           }
                           onClick={handleSideDrawer}
                        >
                           Login
                        </NavLink>
                     ) : (
                        <button
                           onClick={() => {
                              authCtx.logout()
                              navigate(ROUTES.HOME)
                              handleSideDrawer()
                           }}
                        >
                           Logout
                        </button>
                     )}
                  </li>
               </ul>
            </nav>
         </div>
      </header>
   )
}

export default Header
