import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Header from "./components/Header/Header"
import Menu from "./pages/Menu/Menu"
import MenuCategory from "./pages/MenuCategory/MenuCategory"
import Cart from "./pages/Cart/Cart"
import NotFound from "./pages/NotFound/NotFound"
import { CartProvider } from "./context/CartContext"
import AuthPage from "./pages/AuthPage"

function App() {
   return (
      <BrowserRouter>
         <CartProvider>
            <Header />
            <main>
               <Switch>
                  <Route path="/auth">
                     <AuthPage />
                  </Route>
                  <Route path="/menu" exact>
                     <Menu />
                  </Route>
                  <Route path="/menu/:category">
                     <MenuCategory />
                  </Route>
                  <Route path="/cart">
                     <Cart />
                  </Route>
                  <Route>
                     <NotFound />
                  </Route>
               </Switch>
            </main>
         </CartProvider>
      </BrowserRouter>
   )
}

export default App
