import React, { useState } from "react"

import * as MODES from "../../constants/formModes"
import LoginForm from "../../components/Forms/LoginForm"
import SignUpForm from "../../components/Forms/SignUpForm"

import styles from "./Auth.module.scss"

const Auth = () => {
   const [formMode, setFormMode] = useState(MODES.LOGIN)

   // Switch mode - login/ sign-up
   const handleFormMode = (mode) => {
      setFormMode(mode)
   }

   return (
      <div className="container">
         <div className={styles["form-wrapper"]}>
            {formMode === MODES.LOGIN ? (
               <LoginForm handleFormMode={handleFormMode} />
            ) : (
               <SignUpForm handleFormMode={handleFormMode} />
            )}
         </div>
      </div>
   )
}

export default Auth
