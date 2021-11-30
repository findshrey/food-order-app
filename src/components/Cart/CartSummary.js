import React from "react"

import { addZeroes } from "../../utils/commonFunction"

import styles from "./CartSummary.module.scss"

const CartSummary = ({ items, totalAmount, handleOrder }) => {
   const hasItems = items.length > 0

   const numberOfItems = items.reduce((acc, item) => {
      return acc + item.quantity
   }, 0)

   return (
      <aside className={styles["cart-summary"]}>
         <header>
            <h3>{`${numberOfItems} ITEMS`}</h3>
         </header>
         <div className={styles["summary-content"]}>
            <span>Subtotal</span>
            <span>{`$${addZeroes(totalAmount)}`}</span>
         </div>
         <button
            className={styles["place-order"]}
            disabled={!hasItems}
            onClick={handleOrder}
         >
            Place Order
         </button>
      </aside>
   )
}

export default CartSummary
