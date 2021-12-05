import React, { useReducer } from "react"

const CartContext = React.createContext({
   items: [],
   totalAmount: 0,
   addItem: (item) => {},
   removeItem: (id) => {},
})

// useReducer default state
const defaultCartState = {
   items: [],
   totalAmount: 0,
}

const cartReducer = (state, action) => {
   switch (action.type) {
      case "ADD": {
         const updatedAmount =
            state.totalAmount + action.item.quantity * action.item.price

         // Check if cart item already exists
         const existingItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
         )
         const existingItem = state.items[existingItemIndex]

         let updatedItems

         if (existingItem) {
            const updateExistingItem = {
               ...existingItem,
               quantity: existingItem.quantity + 1,
            }

            updatedItems = [...state.items]
            updatedItems[existingItemIndex] = updateExistingItem
         } else {
            updatedItems = [...state.items, action.item]
         }

         return {
            items: updatedItems,
            totalAmount: updatedAmount,
         }
      }

      case "REMOVE": {
         // Check if cart item already exists
         const existingItemIndex = state.items.findIndex(
            (item) => item.id === action.id
         )
         const existingItem = state.items[existingItemIndex]

         const updatedAmount = state.totalAmount - existingItem.price

         let updatedItems

         if (existingItem.quantity === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id)
         } else {
            const updateExistingItem = {
               ...existingItem,
               quantity: existingItem.quantity - 1,
            }

            updatedItems = [...state.items]
            updatedItems[existingItemIndex] = updateExistingItem
         }

         return {
            items: updatedItems,
            totalAmount: updatedAmount,
         }
      }

      default: {
         return defaultCartState
      }
   }
}

const CartProvider = ({ children }) => {
   const [cartState, dispatchCartAction] = useReducer(
      cartReducer,
      defaultCartState
   )

   const handleAddItem = (item) => {
      dispatchCartAction({ type: "ADD", item: item })
   }

   const handleRemoveItem = (id) => {
      dispatchCartAction({ type: "REMOVE", id: id })
   }

   // Context data to share
   const contextData = {
      cartItems: cartState.items,
      totalAmount: cartState.totalAmount,
      addItem: handleAddItem,
      removeItem: handleRemoveItem,
   }

   return (
      <CartContext.Provider value={contextData}>
         {children}
      </CartContext.Provider>
   )
}

export { CartContext as default, CartProvider }
