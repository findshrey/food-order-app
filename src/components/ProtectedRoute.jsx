import { Navigate } from "react-router-dom"

import { ROUTES } from "../utils/constants"

const ProtectedRoute = ({ isAuth, children }) => {
   return isAuth ? children : <Navigate to={ROUTES.auth} replace />
}

export default ProtectedRoute
