import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import styles from './MenuCategory.module.scss'

const DUMMY_STATE = {
   appetizers: [{ name: 'garlic bread', price: 10 }],
   pasta: [{ name: 'spaghetti', price: 11 }],
   entrees: [{ name: 'fritto misto', price: 12 }],
   pizza: [{ name: 'margherita', price: 13 }],
   beverages: [{ name: 'soda', price: 14 }]
}

const MenuCategory = () => {
   const [menuList, setMenuList] = useState(DUMMY_STATE)
   const { category } = useParams()

   const renderedMenu = menuList[category]

   return (
      <section className="menu-category">
         <div className="container">
            <header>
               <h2>Menu Category</h2>
            </header>
            <ul className="menu-list">
               {
                  renderedMenu.map((item) => (
                     <li>
                        <div>{item.name}</div>
                        <span>{item.price}</span>
                     </li>
                  ))
               }
            </ul>
         </div>
      </section>
   )
}

export default MenuCategory