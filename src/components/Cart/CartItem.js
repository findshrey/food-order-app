import React from "react"

import styles from "./CartItem.module.scss"

const CartItem = ({ item, handleAddItem, handleRemoveItem }) => {
   return (
      <li className={styles["cart-item"]}>
         <div>{`Item: ${item.name}, Price: ${item.price}`}</div>
         <div>
            <button onClick={handleAddItem.bind(null, item)}>+</button>
            <span>{item.quantity}</span>
            <button onClick={handleRemoveItem.bind(null, item.id)}>-</button>
         </div>
      </li>
   )
}

export default CartItem
