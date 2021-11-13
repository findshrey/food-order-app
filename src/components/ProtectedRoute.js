import React from "react"
import { Navigate } from "react-router-dom"

import * as ROUTES from "../constants/routes"

const ProtectedRoute = ({ isAuth, children }) => {
   return isAuth ? children : <Navigate to={ROUTES.AUTH} replace />
}

export default ProtectedRoute
