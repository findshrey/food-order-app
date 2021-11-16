import React, { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import * as MODES from "../../constants/formModes"
import AuthContext from "../../context/AuthContext"

import styles from "./Forms.module.scss"

const LoginForm = ({ handleFormMode }) => {
   const navigate = useNavigate()
   const emailRef = useRef()
   const passwordRef = useRef()
   const [isLoading, setIsLoading] = useState(false)

   const authCtx = useContext(AuthContext)

   const handleSubmit = (e) => {
      e.preventDefault()

      // Add validation

      setIsLoading(true)

      fetch(
         "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAfdliDaU39tcKz0o6mP08DN1Ie0lGmhE",
         {
            method: "POST",
            body: JSON.stringify({
               email: emailRef.current.value,
               password: passwordRef.current.value,
               returnSecureToken: true,
            }),
            headers: {
               "Content-Type": "application/json",
            },
         }
      )
         .then((res) => {
            setIsLoading(false)

            if (res.ok) {
               return res.json()
            } else {
               return res.json().then((data) => {
                  const errorMessage =
                     data?.error?.message || "Authentication failed"

                  throw new Error(errorMessage)
               })
            }
         })
         .then((data) => {
            const expirationTime = Date.now() + data.expiresIn * 1000

            authCtx.login(data.idToken, expirationTime)
            navigate("/", { replace: true })
         })
         .catch((err) => {
            alert(err)
         })
   }

   return (
      <div className={styles["login-form"]}>
         <div className={styles["form-inner"]}>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
               <div className={styles["form-control"]}>
                  <label>Email:</label>
                  <input type="email" ref={emailRef} required />
               </div>
               <div className={styles["form-control"]}>
                  <label>Password:</label>
                  <input type="password" ref={passwordRef} required />
               </div>
               {!isLoading ? (
                  <button type="submit" className={styles["btn-primary"]}>
                     Login
                  </button>
               ) : (
                  <p className={styles["logging-message"]}>Logging In ...</p>
               )}
               <div className={styles["text-row"]}>
                  <span>Don't have an account?</span>
                  <button
                     type="button"
                     className={styles["button-secondary"]}
                     onClick={() => handleFormMode(MODES.SIGN_UP)}
                  >
                     Sign Up
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}

export default LoginForm
