import React from "react"

import { addZeroes } from "../../utils/commonFunction"

import styles from "./CartItem.module.scss"

const CartItem = ({ item, handleAddItem, handleRemoveItem }) => {
   return (
      <li className={styles["cart-item"]}>
         <span className={styles["item-name"]}>{item.name}</span>
         <div className={styles["item-info"]}>
            <div className={styles["btns"]}>
               <button
                  className={styles["btn-qty-adjust"]}
                  onClick={handleRemoveItem.bind(null, item.id)}
               >
                  -
               </button>
               <span>{item.quantity}</span>
               <button
                  className={styles["btn-qty-adjust"]}
                  onClick={handleAddItem.bind(null, item)}
               >
                  +
               </button>
            </div>
            <span>{`$${addZeroes(item.price)}`}</span>
         </div>
      </li>
   )
}

export default CartItem
