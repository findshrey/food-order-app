import React, { useContext } from "react"
import { Routes, Route } from "react-router-dom"

import * as ROUTES from "./constants/routes"
import {
   Auth,
   Cart,
   Contact,
   Offers,
   Home,
   Menu,
   NotFound,
   Profile,
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
            <Route path={ROUTES.HOME} element={<Home />} />
            {!isAuth && <Route path={ROUTES.AUTH} element={<Auth />} />}
            <Route
               path={ROUTES.PROFILE}
               element={
                  <ProtectedRoute isAuth={isAuth}>
                     <Profile />
                  </ProtectedRoute>
               }
            />
            <Route
               path={ROUTES.OFFERS}
               element={
                  <ProtectedRoute isAuth={isAuth}>
                     <Offers />
                  </ProtectedRoute>
               }
            />
            <Route path={ROUTES.MENU} element={<Menu />} />
            <Route path={ROUTES.CART} element={<Cart />} />
            <Route path={ROUTES.CONTACT} element={<Contact />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </Layout>
   )
}

export default App
