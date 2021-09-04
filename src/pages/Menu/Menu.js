import React from 'react'
import { Link } from 'react-router-dom'

import { MENU_CATEGORY } from './../../data/constants'
import styles from './Menu.module.scss'

const Menu = () => {
   return (
      <section className="menu">
         <div className="container">
            <header>
               <h2>Menu</h2>
            </header>
            <ul className="menu-inner">
               {
                  MENU_CATEGORY.map((category) => (
                     <li key={category}>
                        <Link to={`/menu/${category}`}>
                           {category}
                        </Link>
                     </li>
                  ))
               }
            </ul>
         </div>
      </section>
   )
}

export default Menu