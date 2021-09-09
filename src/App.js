import React, { useContext } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import Header from "./components/Header/Header"
import Menu from "./pages/Menu/Menu"
import MenuCategory from "./pages/MenuCategory/MenuCategory"
import Cart from "./pages/Cart/Cart"
import NotFound from "./pages/NotFound/NotFound"
import { CartProvider } from "./context/CartContext"
import AuthPage from "./pages/AuthPage"
import AuthContext, { AuthProvider } from "./context/AuthContext"
import ProfilePage from "./pages/ProfilePage"

function App() {
   const authCtx = useContext(AuthContext)

   return (
      <AuthProvider>
         <CartProvider>
            <BrowserRouter>
               <Header />
               <main>
                  <Switch>
                     {!authCtx?.isLoggedIn && (
                        <Route path="/auth">
                           <AuthPage />
                        </Route>
                     )}
                     <Route path="/profile">
                        {authCtx?.isLoggedIn ? (
                           <ProfilePage />
                        ) : (
                           <Redirect to="/auth" />
                        )}
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
                     <Route path="*">
                        <NotFound />
                     </Route>
                  </Switch>
               </main>
            </BrowserRouter>
         </CartProvider>
      </AuthProvider>
   )
}

export default App
