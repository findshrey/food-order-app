import React, { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"

import styles from "./CartSummary.module.scss"

let stripePromise

const getStripe = () => {
   if (!stripePromise) {
      stripePromise = loadStripe(
         "pk_test_51K87LqSE7SqEevLjGC30xxSsXegE04p6nU0XnaxWrpaDJgeVf8fQDWia5AqmyvZmmG5Fkp3WAOyysSjFGhXyu52r00Tq29iAkz"
      )
   }

   return stripePromise
}

const CartSummary = ({ cartItems, totalAmount }) => {
   const [isLoading, setIsLoading] = useState(false)
   const [stripeError, setStripeError] = useState(null)

   const handleCheckout = async () => {
      setIsLoading(true)

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

      if (error) setStripeError(error.message)
      setIsLoading(false)
   }

   if (stripeError) alert(stripeError)

   // Total no.of items in the cart
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
            <span>{`₹${totalAmount}`}</span>
         </div>
         <div className={styles["req-wrapper"]}>
            <button
               className="btn-red-brick"
               onClick={() => {
                  handleCheckout()
               }}
               disabled={isLoading}
            >
               {isLoading ? "Checking out ..." : "Checkout"}
            </button>
         </div>
      </aside>
   )
}

export default CartSummary
