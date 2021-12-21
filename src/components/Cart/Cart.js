import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js"

import * as ROUTES from "../../constants/routes"
import CartContext from "../../context/CartContext"
import CartItem from "./CartItem"
import CartSummary from "./CartSummary"

import styles from "./Cart.module.scss"

let stripePromise

const getStripe = () => {
   if (!stripePromise) {
      stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)
   }

   return stripePromise
}

const Cart = () => {
   const cartCtx = useContext(CartContext)
   let navigate = useNavigate()

   const handleAddItem = (item) => {
      cartCtx.addItem({ ...item, quantity: 1 })
   }

   const handleRemoveItem = (id) => {
      cartCtx.removeItem(id)
   }

   // Check if cart has items
   const emptyCart = cartCtx.cartItems.length === 0

   const devItem = {
      price: "price_1K9A72SE7SqEevLjF1ypHU3r",
      quantity: 1,
   }

   const redirectToCheckout = async () => {
      const stripe = await getStripe()

      const { error } = await stripe.redirectToCheckout({
         lineItems: [devItem],
         mode: "payment",
         successUrl: `http://localhost:3000/`,
         cancelUrl: `http://localhost:3000/offers`,
      })

      console.log(error)
   }

   return (
      <div className={styles.cart}>
         <header className={styles["cart-head"]}>
            <h2>MY CART</h2>
         </header>
         {emptyCart ? (
            <div className={styles["empty-cart"]}>
               <p>
                  YOUR CART IS EMPTY. <br />
                  LET'S START AN ORDER!
               </p>
               <button
                  className="btn-red-brick"
                  onClick={() => navigate(ROUTES.MENU)}
               >
                  Start Order
               </button>
            </div>
         ) : (
            <div className={styles["cart-inner"]}>
               <section>
                  <ul>
                     {cartCtx.cartItems.map((item) => (
                        <CartItem
                           key={item.id}
                           item={item}
                           handleAddItem={handleAddItem}
                           handleRemoveItem={handleRemoveItem}
                        />
                     ))}
                  </ul>
               </section>
               <CartSummary
                  cartItems={cartCtx.cartItems}
                  totalAmount={cartCtx.totalAmount}
                  redirectToCheckout={redirectToCheckout}
               />
            </div>
         )}
      </div>
   )
}

export default Cart
