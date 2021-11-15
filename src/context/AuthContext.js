import React, { useEffect, useState } from "react"

import { calculateRemainingTime } from "../utils/commonFunction"

const AuthContext = React.createContext()

let logoutTimer

const AuthProvider = ({ children }) => {
   const [token, setToken] = useState(null)

   // Check if user is logged in
   const userLoggedIn = !!token

   useEffect(() => {
      const tokenData = JSON.parse(localStorage.getItem("token"))

      if (tokenData) {
         let remainingTime = calculateRemainingTime(tokenData.expirationTime)

         // Check if token will expire within 30s
         if (remainingTime <= 30000) {
            localStorage.removeItem("token")
         } else {
            setToken(tokenData.token)
            logoutTimer = setTimeout(handleLogout, remainingTime)
         }
      }
   }, [])

   const handleLogin = (token, expirationTime) => {
      setToken(token)
      localStorage.setItem("token", JSON.stringify({ token, expirationTime }))

      const remainingTime = calculateRemainingTime(expirationTime)

      // Auto-logout on token expiration
      logoutTimer = setTimeout(handleLogout, remainingTime)
   }

   const handleLogout = () => {
      setToken(null)
      localStorage.removeItem("token")

      if (logoutTimer) {
         clearTimeout(logoutTimer)
      }
   }

   // Context data to share
   const contextData = {
      token,
      isLoggedIn: userLoggedIn,
      login: handleLogin,
      logout: handleLogout,
   }

   return (
      <AuthContext.Provider value={contextData}>
         {children}
      </AuthContext.Provider>
   )
}

export { AuthContext as default, AuthProvider }
