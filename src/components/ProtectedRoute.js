import React from "react"
import { Navigate } from "react-router-dom"

import { AUTH } from "../constants/routes"

const ProtectedRoute = ({ isAuth, children }) => {
   return isAuth ? children : <Navigate to={AUTH} />
}

export default ProtectedRoute
