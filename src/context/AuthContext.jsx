import React, { useEffect, useState } from "react"

import { calculateRemainingTime } from "../utils/commonFunction"

const AuthContext = React.createContext({
   token: "",
   userId: "",
   isLoggedIn: false,
   login: (token, expirationTime, localId) => {},
   logout: () => {},
})

let logoutTimer

const AuthProvider = ({ children }) => {
   const [token, setToken] = useState(null)
   const [userId, setUserId] = useState(null)

   // Check if user is logged in
   const userLoggedIn = !!token

   // Check if token is valid when app starts
   useEffect(() => {
      const authData = JSON.parse(localStorage.getItem("auth_data"))

      if (authData) {
         let remainingTime = calculateRemainingTime(authData.expirationTime)

         // Check if auth data will expire within 10s
         if (remainingTime <= 10000) {
            localStorage.removeItem("auth_data")
         } else {
            setToken(authData.token)
            setUserId(authData.userId)
            logoutTimer = setTimeout(handleLogout, remainingTime)
         }
      }
   }, [])

   const handleLogin = (token, expirationTime, localId) => {
      setToken(token)
      setUserId(localId)

      localStorage.setItem(
         "auth_data",
         JSON.stringify({ token, expirationTime, userId: localId })
      )

      const remainingTime = calculateRemainingTime(expirationTime)

      // Auto-logout on auth data expiration
      logoutTimer = setTimeout(handleLogout, remainingTime)
   }

   const handleLogout = () => {
      setToken(null)
      setUserId(null)

      localStorage.removeItem("auth_data")

      if (logoutTimer) {
         clearTimeout(logoutTimer)
      }
   }

   // Context data to share
   const contextData = {
      token,
      userId,
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
