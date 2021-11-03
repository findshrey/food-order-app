import React from "react"
import { Redirect, Route } from "react-router-dom"

import { AUTH } from "../constants/routes"

const ProtectedRoute = ({ isAuth, component: Component, ...rest }) => {
   return (
      <Route
         {...rest}
         render={(routeProps) => {
            if (isAuth) {
               return <Component {...routeProps} />
            }

            return <Redirect to={AUTH} />
         }}
      />
   )
}

export default ProtectedRoute
