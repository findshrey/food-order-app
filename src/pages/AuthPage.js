import React, { useState } from "react"

import * as MODES from "../constants/formModes"
import LoginForm from "../components/Forms/LoginForm"
import SignUpForm from "../components/Forms/SignUpForm"

const AuthPage = () => {
   const [formMode, setFormMode] = useState(MODES.LOGIN)

   // Switch b/w login/ sign-up
   const handleFormMode = (mode) => {
      setFormMode(mode)
   }

   return (
      <div className="container">
         {formMode === MODES.LOGIN ? (
            <LoginForm handleFormMode={handleFormMode} />
         ) : (
            <SignUpForm handleFormMode={handleFormMode} />
         )}
      </div>
   )
}

export default AuthPage