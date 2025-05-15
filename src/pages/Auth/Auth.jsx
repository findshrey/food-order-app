import { useState } from "react"

import { FORM_MODES } from "../../utils/constants"
import LoginForm from "../../components/Forms/LoginForm"
import SignUpForm from "../../components/Forms/SignUpForm"
import useTitle from "../../hooks/useTitle"

import styles from "./Auth.module.scss"

const Auth = () => {
   const [formMode, setFormMode] = useState(FORM_MODES.login)

   // Check if Login enabled
   const isLoginMode = formMode === FORM_MODES.login

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
