import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import styles from './MenuCategory.module.scss'
import CartContext from './../../context/CartContext'

const MenuCategory = () => {
   const cartCtx = useContext(CartContext)
   const [menuList, setMenuList] = useState({})
   const { category } = useParams()

   useEffect(() => {
      const getMenu = async () => {
         const response = await fetch('https://food-order-app-35a86-default-rtdb.asia-southeast1.firebasedatabase.app/menu.json')
         const menuData = await response.json()

         let updatedMenu = {}

         for (const category in menuData) {
            const categoryArray = []

            for (const itemKey in menuData[category]) {
               categoryArray.push({
                  id: itemKey,
                  name: menuData[category][itemKey].name,
                  description: menuData[category][itemKey].description,
                  price: menuData[category][itemKey].price
               })
            }

            updatedMenu = { ...updatedMenu, [category]: categoryArray }
         }

         setMenuList(updatedMenu)
      }

      getMenu()
   }, [])

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
                  renderedMenu?.map((item) => {
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