import React, { useContext } from 'react'

import styles from './Cart.module.scss'
import CartContext from '../../context/CartContext'

const Cart = () => {
   const cartCtx = useContext(CartContext)

   const handleAddItem = (item) => {
      cartCtx.addItem({ ...item, quantity: 1 })
   }

   const handleRemoveItem = (id) => {
      cartCtx.removeItem(id)
   }

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
                        <div>
                           {`Item: ${item.name}, Price: ${item.price}`}
                        </div>
                        <div>
                           <button onClick={handleAddItem.bind(null, item)}>+</button>
                           <span>{item.quantity}</span>
                           <button onClick={handleRemoveItem.bind(null, item.id)}>-</button>
                        </div>
                     </li>
                  ))
               }
            </ul>
         </div>
      </section>
   )
}

export default Cart