import React, { useContext } from "react"
import { Routes, Route } from "react-router-dom"

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
         <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            {!isAuth && <Route path={ROUTES.AUTH} element={<AuthPage />} />}
            {/* <ProtectedRoute
               path={ROUTES.PROFILE}
               isAuth={isAuth}
               component={ProfilePage}
            /> */}
            {/* <ProtectedRoute
               path={ROUTES.DEALS}
               isAuth={isAuth}
               component={DealsPage}
            /> */}
            <Route path={ROUTES.MENU} element={<Menu />} />
            <Route
               path={`${ROUTES.MENU}/:category`}
               element={<MenuCategory />}
            />
            <Route path={ROUTES.CART} element={<Cart />} />
            <Route path={ROUTES.CONTACT} element={<Contact />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </Layout>
   )
}

export default App
