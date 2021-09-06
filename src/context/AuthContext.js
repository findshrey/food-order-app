import React, { useState } from "react"

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
   const [token, setToken] = useState(null)

   // Check if user is logged in
   const userIsLoggedIn = !!token

   const handleLogIn = (token) => {
      setToken(token)
   }

   const handleLogOut = () => {
      setToken(null)
   }

   // Context data to share
   const contextData = {
      token,
      isLoggedIn: userIsLoggedIn,
      login: handleLogIn,
      logout: handleLogOut,
   }

   return (
      <AuthContext.Provider value={contextData}>
         {children}
      </AuthContext.Provider>
   )
}

export { AuthContext as default, AuthProvider }
