import React, { useContext } from "react"
import { Switch, Redirect, Route } from "react-router-dom"

import * as ROUTES from "./constants/routes"
import AuthPage from "./pages/AuthPage"
import AuthContext from "./context/AuthContext"
import Cart from "./pages/Cart"
import Contact from "./components/Contact/Contact"
import HomePage from "./pages/HomePage"
import Layout from "./components/Layout/Layout"
import Menu from "./pages/Menu"
import MenuCategory from "./pages/MenuCategory"
import NotFound from "./pages/NotFound"
import ProfilePage from "./pages/ProfilePage"

const App = () => {
   const authCtx = useContext(AuthContext)

   return (
      <Layout>
         <Switch>
            <Route path={ROUTES.HOME} exact>
               <HomePage />
            </Route>
            {!authCtx.isLoggedIn && (
               <Route path={ROUTES.AUTH}>
                  <AuthPage />
               </Route>
            )}
            <Route path={ROUTES.PROFILE}>
               {authCtx.isLoggedIn ? (
                  <ProfilePage />
               ) : (
                  <Redirect to={ROUTES.AUTH} />
               )}
            </Route>
            <Route path={ROUTES.MENU} exact>
               <Menu />
            </Route>
            <Route path={`${ROUTES.MENU}/:category`}>
               <MenuCategory />
            </Route>
            <Route path={ROUTES.CART}>
               <Cart />
            </Route>
            <Route path={ROUTES.CONTACT}>
               <Contact />
            </Route>
            <Route path="*">
               <NotFound />
            </Route>
         </Switch>
      </Layout>
   )
}

export default App
