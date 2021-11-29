import React, { useContext } from "react"

import { addZeroes } from "../../utils/commonFunction"
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
      <li className={styles["menu-item"]}>
         <div className={styles["item-img"]}>
            <img src={item.img} />
         </div>
         <div className={styles["item-info"]}>
            <header className={styles["item-head"]}>
               <h4>{item.name}</h4>
               <span className={styles["item-price"]}>
                  {`$${addZeroes(item.price)}`}
               </span>
            </header>
            <p className={styles["item-desc"]}>{item.description}</p>
            <div className={styles["item-lower"]}>
               {!inCartItem ? (
                  <button
                     className={styles["btn-add"]}
                     onClick={handleAddItem.bind(null, item)}
                  >
                     ADD
                  </button>
               ) : (
                  <div className={styles["btns-qty"]}>
                     <button
                        className={styles["btn-qty-adjust"]}
                        onClick={handleAddItem.bind(null, item)}
                     >
                        +
                     </button>
                     <span className={styles["item-qty"]}>
                        {inCartItem?.quantity ?? 0}
                     </span>
                     <button
                        className={styles["btn-qty-adjust"]}
                        onClick={handleRemoveItem.bind(null, item.id)}
                     >
                        -
                     </button>
                  </div>
               )}
            </div>
         </div>
      </li>
   )
}

export default MenuItem