import { useContext } from "react"
import { Routes, Route } from "react-router-dom"
import "@stripe/stripe-js"

import { ROUTES } from "./utils/constants"
import {
   Auth,
   Cancel,
   Cart,
   Contact,
   Homepage,
   Menu,
   NotFound,
   Offers,
   Profile,
   Success,
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
            <Route path={ROUTES.home} element={<Homepage />} />
            {!isAuth && <Route path={ROUTES.auth} element={<Auth />} />}
            <Route
               path={ROUTES.profile}
               element={
                  <ProtectedRoute isAuth={isAuth}>
                     <Profile />
                  </ProtectedRoute>
               }
            />
            <Route path={ROUTES.offers} element={<Offers />} />
            <Route path={ROUTES.menu} element={<Menu />} />
            <Route path={ROUTES.cart} element={<Cart />} />
            <Route path={ROUTES.contact} element={<Contact />} />
            <Route path={ROUTES.success} element={<Success />} />
            <Route path={ROUTES.cancel} element={<Cancel />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </Layout>
   )
}

export default App
