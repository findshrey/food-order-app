import React from "react"
import { Navigate, Route } from "react-router-dom"

import { AUTH } from "../constants/routes"

const ProtectedRoute = ({ isAuth, component: Component, ...rest }) => {
   return (
      <Route
         {...rest}
         render={(routeProps) => {
            if (isAuth) {
               return <Component {...routeProps} />
            }

            return <Navigate to={AUTH} />
         }}
      />
   )
}

export default ProtectedRoute
