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
               <button onClick={handleAddItem.bind(null, item)}>+</button>
               <span>{inCartItem?.quantity ?? 0}</span>
               <button onClick={handleRemoveItem.bind(null, item.id)}>-</button>
            </div>
         )}
      </li>
   )
}

export default MenuItem
