import React, { useContext } from "react"

import CartContext from "../../context/CartContext"
import CartItem from "./CartItem"
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

   const hasItems = cartCtx.cartItems.length > 0

   return (
      <div className={styles.cart}>
         <header>
            <h2>My Cart</h2>
         </header>
         <div className={styles["cart-wrapper"]}>
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
            <aside className="cart-summary">
               <div className="card">
                  <header>
                     <h3>3 Items</h3>
                  </header>
                  <span>Subtotal $25</span>
                  <button disabled={!hasItems} onClick={handleOrder}>
                     Place Order
                  </button>
               </div>
            </aside>
         </div>
      </div>
   )
}

export default Cart
