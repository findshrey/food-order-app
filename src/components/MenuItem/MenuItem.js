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

   // Check item existance in cart
   const itemInCart = cartCtx.cartItems.find(
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
               <span className={styles["item-price"]}>{`₹${item.price}`}</span>
            </header>
            <p className={styles["item-desc"]}>{item.description}</p>
            <div className={styles["item-lower"]}>
               {!itemInCart ? (
                  <button
                     className="btn-red-brick"
                     onClick={handleAddItem.bind(null, item)}
                  >
                     ADD
                  </button>
               ) : (
                  <div className={styles["btns-qty"]}>
                     <button
                        className="btn-red-brick"
                        onClick={handleRemoveItem.bind(null, item.id)}
                     >
                        -
                     </button>
                     <span className={styles["item-qty"]}>
                        {itemInCart?.quantity ?? 0}
                     </span>
                     <button
                        className="btn-red-brick"
                        onClick={handleAddItem.bind(null, item)}
                     >
                        +
                     </button>
                  </div>
               )}
            </div>
         </div>
      </li>
   )
}

export default MenuItem
