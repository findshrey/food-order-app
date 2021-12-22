import React from "react"
import { loadStripe } from "@stripe/stripe-js"

import styles from "./CartSummary.module.scss"

let stripePromise

const getStripe = () => {
   if (!stripePromise) {
      stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)
   }

   return stripePromise
}

const CartSummary = ({ cartItems, totalAmount }) => {
   const numberOfItems = cartItems.reduce((acc, item) => {
      return acc + item.quantity
   }, 0)

   const handleCheckout = async () => {
      // Collect items by stripe_item_id and quantity
      const checkoutItems = cartItems.reduce((acc, item) => {
         return [
            ...acc,
            { price: item["stripe-price"], quantity: item.quantity },
         ]
      }, [])

      const stripe = await getStripe()

      const { error } = await stripe.redirectToCheckout({
         lineItems: checkoutItems,
         mode: "payment",
         successUrl: `${document.location.origin}`,
         cancelUrl: `${document.location.origin}/offers`,
      })

      console.log(error)
   }

   return (
      <aside className={styles["cart-summary"]}>
         <header>
            <h3>{`${numberOfItems} ITEMS`}</h3>
         </header>
         <div className={styles["summary-content"]}>
            <span>Subtotal</span>
            <span>{`₹${totalAmount}`}</span>
         </div>
         <div className={styles["req-wrapper"]}>
            <button
               className="btn-red-brick"
               onClick={() => {
                  handleCheckout()
               }}
            >
               Checkout
            </button>
         </div>
      </aside>
   )
}

export default CartSummary
