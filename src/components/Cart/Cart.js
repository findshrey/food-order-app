import React, { useContext } from 'react'

import styles from './Cart.module.scss'
import CartContext from '../../context/CartContext'

const Cart = () => {
   const cartCtx = useContext(CartContext)

   return (
      <section className="cart">
         <div className="container">
            <header>
               <h2>Cart</h2>
            </header>
            <ul>
               {
                  cartCtx.cartItems.map((item) => (
                     <li>
                        {`Item: ${item.name}, Quantity: ${item.quantity}`}
                     </li>
                  ))
               }
            </ul>
         </div>
      </section>
   )
}

export default Cart