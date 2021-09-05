import React, { useState } from "react"

import SignUp from "../components/SignupForm/SignUpForm"
import LoginForm from "../components/LoginForm/LoginForm"

const AuthPage = () => {
   const [isLogin, setIsLogin] = useState(true)

   const handleAuthMode = () => {
      setIsLogin((prevState) => !prevState)
   }

   return (
      <section>
         {isLogin ? (
            <LoginForm handleAuthMode={handleAuthMode} />
         ) : (
            <SignUp handleAuthMode={handleAuthMode} />
         )}
      </section>
   )
}

export default AuthPage
