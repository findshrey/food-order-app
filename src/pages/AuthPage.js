import React, { useState } from "react"

import LoginForm from "../components/LoginForm/LoginForm"
import SignUp from "../components/SignupForm/SignUpForm"

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
