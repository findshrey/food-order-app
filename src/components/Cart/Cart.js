import React, { useContext } from 'react'

import styles from './Cart.module.scss'
import CartContext from '../../context/CartContext'
import useHttp from './../../hooks/useHttp'

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
      placeOrder({
         url: 'https://food-order-app-35a86-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: cartCtx.cartItems
      }, (data) => {
         console.log(data);
      })
   }

   const hasItems = cartCtx.cartItems.length > 0

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
            <button disabled={!hasItems} onClick={handleOrder}>Place Order</button>
         </div>
      </section>
   )
}

export default Cart