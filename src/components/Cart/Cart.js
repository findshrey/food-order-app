import React, { useContext } from "react"

import CartContext from "../../context/CartContext"
import CartItem from "./CartItem"
import CartSummary from "./CartSummary"
import useHttp from "../../hooks/useHttp"

import styles from "./Cart.module.scss"

const Cart = () => {
   const { isLoading, error, sendRequest: placeOrder } = useHttp()
   const cartCtx = useContext(CartContext)

   const handleAddItem = (item) => {
      cartCtx.addItem({ ...item, quantity: 1 })
   }

   const handleRemoveItem = (id) => {
      cartCtx.removeItem(id)
   }

   const handleOrder = () => {
      placeOrder(
         {
            url: "https://food-order-app-35a86-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: cartCtx.cartItems,
         },
         (data) => {
            console.log(data)
         }
      )
   }

   return (
      <div className={styles.cart}>
         <header className={styles["cart-head"]}>
            <h2>My Cart</h2>
         </header>
         <div className={styles["cart-inner"]}>
            <section className={styles["cart-item-list"]}>
               <ul>
                  {cartCtx.cartItems.map((item) => (
                     <CartItem
                        item={item}
                        handleAddItem={handleAddItem}
                        handleRemoveItem={handleRemoveItem}
                     />
                  ))}
               </ul>
            </section>
            <CartSummary
               items={cartCtx.cartItems}
               totalAmount={cartCtx.totalAmount}
               handleOrder={handleOrder}
            />
         </div>
      </div>
   )
}

export default Cart
