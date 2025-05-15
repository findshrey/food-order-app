import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import App from "./App"

import "./index.scss"

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
