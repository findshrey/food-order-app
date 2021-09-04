import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"

import styles from "./MenuCategory.module.scss"
import CartContext from "../../context/CartContext"
import useHttp from "../../hooks/useHttp"

const MenuCategory = () => {
   const [menuList, setMenuList] = useState([])
   const cartCtx = useContext(CartContext)
   const { category } = useParams()
   const { isLoading, error, sendRequest: fetchMenu } = useHttp()

   useEffect(() => {
      const transformMenuData = (menuData) => {
         const updatedMenu = []

         for (const itemKey in menuData[category]) {
            updatedMenu.push({
               id: itemKey,
               name: menuData[category][itemKey].name,
               description: menuData[category][itemKey].description,
               price: menuData[category][itemKey].price,
            })
         }

         setMenuList(updatedMenu)
      }

      fetchMenu(
         {
            url: "https://food-order-app-35a86-default-rtdb.asia-southeast1.firebasedatabase.app/menu.json",
         },
         transformMenuData
      )
   }, [fetchMenu])

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
            {isLoading && <p>Loading ...</p>}
            {!isLoading && menuList.length === 0 && !error && (
               <p>Found No Items to show</p>
            )}
            {!isLoading && menuList.length > 0 && (
               <ul className="menu-list">
                  {menuList?.map((item) => {
                     const inCartItem = cartCtx.cartItems.find(
                        (cartItem) => cartItem.id === item.id
                     )

                     return (
                        <li>
                           <div>
                              <div>{item.name}</div>
                              <span>{item.price}</span>
                           </div>
                           {!inCartItem ? (
                              <button onClick={handleAddItem.bind(null, item)}>
                                 Add to Cart
                              </button>
                           ) : (
                              <div>
                                 <button
                                    onClick={handleAddItem.bind(null, item)}
                                 >
                                    +
                                 </button>
                                 <span>{inCartItem?.quantity ?? 0}</span>
                                 <button
                                    onClick={handleRemoveItem.bind(
                                       null,
                                       item.id
                                    )}
                                 >
                                    -
                                 </button>
                              </div>
                           )}
                        </li>
                     )
                  })}
               </ul>
            )}
            {!isLoading && error && <p>{error}</p>}
         </div>
      </section>
   )
}

export default MenuCategory
