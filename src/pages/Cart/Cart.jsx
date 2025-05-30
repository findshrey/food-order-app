import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { ROUTES } from "../../utils/constants"
import CartContext from "../../context/CartContext"
import CartItem from "../../components/CartItem/CartItem"
import CartSummary from "../../components/CartSummary/CartSummary"
import useTitle from "../../hooks/useTitle"

import styles from "./Cart.module.scss"

const Cart = () => {
   const cartCtx = useContext(CartContext)
   useTitle("React Meals | Cart")
   let navigate = useNavigate()

   const handleAddItem = (item) => {
      cartCtx.addItem({ ...item, quantity: 1 })
   }

   const handleRemoveItem = (id) => {
      cartCtx.removeItem(id)
   }

   // Check if cart has items
   const emptyCart = cartCtx.cartItems.length === 0

   return (
      <main className={styles.cart}>
         <div className="container">
            <header className={styles["cart-head"]}>
               <h2>MY CART</h2>
            </header>
            {emptyCart ? (
               <section className={styles["empty-cart"]}>
                  <p>
                     YOUR CART IS EMPTY. <br />
                     LET'S START AN ORDER!
                  </p>
                  <button
                     className="btn-red-brick"
                     onClick={() => navigate(ROUTES.menu)}
                  >
                     Start Order
                  </button>
               </section>
            ) : (
               <section className={styles["cart-inner"]}>
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
                  <CartSummary
                     cartItems={cartCtx.cartItems}
                     totalAmount={cartCtx.totalAmount}
                  />
               </section>
            )}
         </div>
      </main>
   )
}

export default Cart
