import React, { useEffect, useState } from "react"

import { calculateRemainingTime } from "../utils/commonFunction"

const AuthContext = React.createContext()

let SignoutTimer

const AuthProvider = ({ children }) => {
   const [token, setToken] = useState(null)

   // Check if user is signed in
   const userSignedIn = !!token

   useEffect(() => {
      const tokenData = JSON.parse(localStorage.getItem("token"))

      if (tokenData) {
         let remainingTime = calculateRemainingTime(tokenData.expirationTime)

         // Check if token will expire within 30s
         if (remainingTime <= 30000) {
            localStorage.removeItem("token")
         } else {
            setToken(tokenData.token)
            SignoutTimer = setTimeout(handleSignOut, remainingTime)
         }
      }
   }, [])

   const handleSignIn = (token, expirationTime) => {
      setToken(token)
      localStorage.setItem("token", JSON.stringify({ token, expirationTime }))

      const remainingTime = calculateRemainingTime(expirationTime)

      // Auto-logout on token expiration
      SignoutTimer = setTimeout(handleSignOut, remainingTime)
   }

   const handleSignOut = () => {
      setToken(null)
      localStorage.removeItem("token")

      if (SignoutTimer) {
         clearTimeout(SignoutTimer)
      }
   }

   // Context data to share
   const contextData = {
      token,
      isSignedIn: userSignedIn,
      login: handleSignIn,
      logout: handleSignOut,
   }

   return (
      <AuthContext.Provider value={contextData}>
         {children}
      </AuthContext.Provider>
   )
}

export { AuthContext as default, AuthProvider }
