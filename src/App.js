import React, { useContext } from "react"
import { Switch, Route } from "react-router-dom"

import * as ROUTES from "./constants/routes"
import {
   AuthPage,
   Cart,
   Contact,
   DealsPage,
   HomePage,
   Menu,
   MenuCategory,
   NotFound,
   ProfilePage,
} from "./pages"
import AuthContext from "./context/AuthContext"
import Layout from "./components/Layout/Layout"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
   const authCtx = useContext(AuthContext)

   // Authentication status
   const isAuth = authCtx.isLoggedIn

   return (
      <Layout>
         <Switch>
            <Route path={ROUTES.HOME} exact component={HomePage} />
            {!isAuth && <Route path={ROUTES.AUTH} component={AuthPage} />}
            <ProtectedRoute
               path={ROUTES.PROFILE}
               isAuth={isAuth}
               component={ProfilePage}
            />
            <ProtectedRoute
               path={ROUTES.DEALS}
               isAuth={isAuth}
               component={DealsPage}
            />
            <Route path={ROUTES.MENU} exact component={Menu} />
            <Route path={`${ROUTES.MENU}/:category`} component={MenuCategory} />
            <Route path={ROUTES.CART} component={Cart} />
            <Route path={ROUTES.CONTACT} component={Contact} />
            <Route path="*" component={NotFound} />
         </Switch>
      </Layout>
   )
}

export default App
