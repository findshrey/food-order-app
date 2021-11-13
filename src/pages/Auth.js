import React, { useState } from "react"

import LoginForm from "../components/LoginForm/LoginForm"
import SignUp from "../components/SignupForm/SignUpForm"

const Auth = () => {
   const [isLogin, setIsLogin] = useState(true)

   const handleAuthMode = () => {
      setIsLogin((prevState) => !prevState)
   }

   return (
      <div className="container">
         {isLogin ? (
            <LoginForm handleAuthMode={handleAuthMode} />
         ) : (
            <SignUp handleAuthMode={handleAuthMode} />
         )}
      </div>
   )
}

export default Auth
