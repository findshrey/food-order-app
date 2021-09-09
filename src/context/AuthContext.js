import React, { useEffect, useState } from "react"

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
   const [token, setToken] = useState(null)

   useEffect(() => {
      const storedToken = localStorage.getItem("token")

      if (storedToken) {
         setToken(storedToken)
      }
   }, [])

   // Check if user is logged in
   const userIsLoggedIn = !!token

   const handleLogIn = (token) => {
      setToken(token)
      localStorage.setItem("token", token)
   }

   const handleLogOut = () => {
      setToken(null)
      localStorage.removeItem("token")
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
