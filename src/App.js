import React, { useContext } from "react"
import { Switch, Route, Redirect } from "react-router-dom"

import Header from "./components/Header/Header"
import Menu from "./pages/Menu/Menu"
import MenuCategory from "./pages/MenuCategory/MenuCategory"
import Cart from "./pages/Cart/Cart"
import NotFound from "./pages/NotFound/NotFound"
import AuthPage from "./pages/AuthPage"
import AuthContext from "./context/AuthContext"
import ProfilePage from "./pages/ProfilePage"

function App() {
   const authCtx = useContext(AuthContext)

   return (
      <>
         <Header />
         <main>
            <Switch>
               {!authCtx.isLoggedIn && (
                  <Route path="/auth">
                     <AuthPage />
                  </Route>
               )}
               <Route path="/profile">
                  {authCtx.isLoggedIn ? (
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
      </>
   )
}

export default App
