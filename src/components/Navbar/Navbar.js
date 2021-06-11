import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
   return (
      <nav className="navbar">
         <ul>
            <li>
               <Link to="/menu">Menu</Link>
            </li>
            <li>
               <Link to="/cart">Cart</Link>
            </li>
         </ul>
      </nav>
   )
}

export default Navbar