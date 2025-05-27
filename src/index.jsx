import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import App from "./App"

import "./index.scss"

const root = createRoot(document.getElementById("root"))

root.render(
   <AuthProvider>
      <CartProvider>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </CartProvider>
   </AuthProvider>
)
