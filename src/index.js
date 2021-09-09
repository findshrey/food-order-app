import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import "./index.scss"
import App from "./App"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"

ReactDOM.render(
   <AuthProvider>
      <CartProvider>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </CartProvider>
   </AuthProvider>,
   document.getElementById("root")
)
