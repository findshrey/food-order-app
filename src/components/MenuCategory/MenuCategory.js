import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'

import styles from './MenuCategory.module.scss'
import CartContext from './../../context/CartContext'

const DUMMY_STATE = {
   appetizers: [{ name: 'garlic bread', price: 10, id: 'a1' }],
   pasta: [{ name: 'spaghetti', price: 11, id: 'a2' }],
   entrees: [{ name: 'fritto misto', price: 12, id: 'a3' }],
   pizza: [{ name: 'margherita', price: 13, id: 'a4' }],
   beverages: [{ name: 'soda', price: 14, id: 'a5' }]
}

const MenuCategory = () => {
   const cartCtx = useContext(CartContext)
   const [menuList, setMenuList] = useState(DUMMY_STATE)
   const { category } = useParams()

   const renderedMenu = menuList[category]

   const handleAddItem = (item) => {
      cartCtx.addItem({ ...item, quantity: 1 })
   }

   const handleRemoveItem = (id) => {
      cartCtx.removeItem(id)
   }

   return (
      <section className="menu-category">
         <div className="container">
            <header>
               <h2>Menu Category</h2>
            </header>
            <ul className="menu-list">
               {
                  renderedMenu.map((item) => {
                     const inCartItem = cartCtx.cartItems.find(cartItem => cartItem.id === item.id)

                     return (
                        <li>
                           <div>
                              <div>{item.name}</div>
                              <span>{item.price}</span>
                           </div>
                           <div>
                              <button onClick={handleAddItem.bind(null, item)}>+</button>
                              <span>{inCartItem?.quantity ?? 0}</span>
                              <button onClick={handleRemoveItem.bind(null, item.id)}>-</button>
                           </div>
                        </li>
                     )
                  })
               }
            </ul>
         </div>
      </section>
   )
}

export default MenuCategory