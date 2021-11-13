import React, { useState } from "react"

import * as MODES from "../constants/formModes"
import SignInForm from "../components/SignInForm/SignInForm"
import SignUpForm from "../components/SignUpForm/SignUpForm"

const Auth = () => {
   const [formMode, setFormMode] = useState(MODES.SIGN_IN)

   // Switch b/w sign-in/ sign-up
   const handleFormMode = (mode) => {
      setFormMode(mode)
   }

   return (
      <div className="container">
         {formMode === MODES.SIGN_IN ? (
            <SignInForm handleFormMode={handleFormMode} />
         ) : (
            <SignUpForm handleFormMode={handleFormMode} />
         )}
      </div>
   )
}

export default Auth
