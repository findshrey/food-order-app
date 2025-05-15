import React, { useState } from "react"

import * as MODES from "../../constants/formModes"
import LoginForm from "../../components/Forms/LoginForm"
import SignUpForm from "../../components/Forms/SignUpForm"
import useTitle from "../../hooks/useTitle"

import styles from "./Auth.module.scss"

const Auth = () => {
   const [formMode, setFormMode] = useState(MODES.LOGIN)

   // Check if Login enabled
   const isLoginMode = formMode === MODES.LOGIN

   useTitle(`React Meals | ${isLoginMode ? "Login" : "Sign Up"}`, formMode)

   // Switch mode - login/ sign-up
   const handleFormMode = (mode) => {
      setFormMode(mode)
   }

   return (
      <div className="container">
         <div className={styles["form-wrapper"]}>
            {isLoginMode ? (
               <LoginForm handleFormMode={handleFormMode} />
            ) : (
               <SignUpForm handleFormMode={handleFormMode} />
            )}
         </div>
      </div>
   )
}

export default Auth
