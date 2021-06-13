import React, { useReducer } from 'react'

const CartContext = React.createContext()

const defaultCartState = {
   items: [],
   totalAmount: 0
}

const cartReducer = (state, action) => {
   switch (action.type) {
      case 'ADD': {
         const updatedAmount = state.amount + action.item.quantity * action.item.price

         // Check if cart item already exists
         const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id)
         const existingItem = state.items[existingItemIndex]

         let updatedItems

         if (existingItem) {
            const updateExistingItem = {
               ...existingItem,
               quantity: existingItem.quantity + action.item.quantity
            }

            updatedItems = [...state.items]
            updatedItems[existingItemIndex] = updateExistingItem
         } else {
            updatedItems = [...state.items, action.item]
         }

         return {
            updatedItems,
            updatedAmount
         }
      }
      default: {
         return defaultCartState
      }
   }
}

const CartProvider = ({ children }) => {
   const [cartState, dispatchCartAction] = useReducer(
      cartReducer, defaultCartState
   )

   const handleAddItem = (item) => {
      dispatchCartAction({ type: 'ADD', item: item })
   }

   const handleRemoveItem = (id) => {
      dispatchCartAction({ type: 'REMOVE', id: id })
   }

   // Context data to share
   const contextData = {
      cartItems: cartState.items,
      totalAmount: cartState.totalAmount,
      handleAddItem,
      handleRemoveItem
   }

   return (
      <CartContext.Provider value={contextData}>
         {children}
      </CartContext.Provider>
   )
}

export { CartContext as default, CartProvider }