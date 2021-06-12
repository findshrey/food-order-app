import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Navbar.module.scss'

const Navbar = () => {
   return (
      <nav className={styles.navbar}>
         <ul>
            <li>
               <Link to="/menu" className="nav-link">Menu</Link>
            </li>
            <li>
               <Link to="/cart" className="nav-link">Cart</Link>
            </li>
         </ul>
      </nav>
   )
}

export default Navbar