import React, { useContext } from "react"
import { Routes, Route } from "react-router-dom"

import * as ROUTES from "./constants/routes"
import {
   AuthPage,
   CartPage,
   ContactPage,
   HomePage,
   MenuPage,
   NotFound,
   OffersPage,
   ProfilePage,
} from "./pages"
import AuthContext from "./context/AuthContext"
import Layout from "./components/Layout"
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
            <Route
               path={ROUTES.PROFILE}
               element={
                  <ProtectedRoute isAuth={isAuth}>
                     <ProfilePage />
                  </ProtectedRoute>
               }
            />
            <Route
               path={ROUTES.OFFERS}
               element={
                  <ProtectedRoute isAuth={isAuth}>
                     <OffersPage />
                  </ProtectedRoute>
               }
            />
            <Route path={ROUTES.MENU} element={<MenuPage />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route path={ROUTES.CONTACT} element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </Layout>
   )
}

export default App
