import React from "react"

import { addZeroes } from "../../utils/commonFunction"
import useHttp from "../../hooks/useHttp"

import styles from "./CartSummary.module.scss"

const CartSummary = ({ cartItems, totalAmount }) => {
   const { isLoading, error, sendRequest: placeOrder } = useHttp()

   // Place order if autheticated
   const handleOrder = () => {
      placeOrder(
         {
            url: "https://food-order-app-35a86-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: cartItems,
         },
         (data) => {
            console.log(data)
         }
      )
   }

   const numberOfItems = cartItems.reduce((acc, item) => {
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
         <div className={styles["req-wrapper"]}>
            {isLoading && (
               <p className={styles["req-status"]}>Placing Order ...</p>
            )}
            {!isLoading && error && (
               <p className={styles["req-status"]}>{error}</p>
            )}
            {!isLoading && !error && (
               <button className="btn-red-brick" onClick={handleOrder}>
                  Place Order
               </button>
            )}
         </div>
      </aside>
   )
}

export default CartSummary
