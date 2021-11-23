import React, { useContext } from "react"

import CartContext from "../../context/CartContext"

import styles from "./MenuItem.module.scss"

const MenuItem = ({ item }) => {
   const cartCtx = useContext(CartContext)

   const handleAddItem = (item) => {
      cartCtx.addItem({ ...item, quantity: 1 })
   }

   const handleRemoveItem = (id) => {
      cartCtx.removeItem(id)
   }

   // Check if item exists in cart
   const inCartItem = cartCtx.cartItems.find(
      (cartItem) => cartItem.id === item.id
   )

   return (
      <li className="menu-item">
         <header className="item-head">
            <h4>{item.name}</h4>
            <span>{item.price}</span>
         </header>
         <p className="item-desc">{item.description}</p>
         {!inCartItem ? (
            <button
               className={styles["add-to-cart"]}
               onClick={handleAddItem.bind(null, item)}
            >
               Add to Cart
            </button>
         ) : (
            <div className={styles["content"]}>
               <button
                  className={styles["btn-cart"]}
                  onClick={handleAddItem.bind(null, item)}
               >
                  +
               </button>
               <span className="item-qty">{inCartItem?.quantity ?? 0}</span>
               <button
                  className={styles["btn-cart"]}
                  onClick={handleRemoveItem.bind(null, item.id)}
               >
                  -
               </button>
            </div>
         )}
      </li>
   )
}

export default MenuItem
