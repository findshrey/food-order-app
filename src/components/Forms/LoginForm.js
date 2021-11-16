import React, { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import * as MODES from "../../constants/formModes"
import AuthContext from "../../context/AuthContext"
import useHttp from "../../hooks/useHttp"

import styles from "./Forms.module.scss"

const LoginForm = ({ handleFormMode }) => {
   const navigate = useNavigate()
   const emailRef = useRef()
   const passwordRef = useRef()
   const { isLoading, error, sendRequest: loginRequest } = useHttp()

   const authCtx = useContext(AuthContext)

   const handleSubmit = (e) => {
      e.preventDefault()

      loginRequest(
         {
            url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAfdliDaU39tcKz0o6mP08DN1Ie0lGmhE",
            method: "POST",
            body: {
               email: emailRef.current.value,
               password: passwordRef.current.value,
               returnSecureToken: true,
            },
         },
         (data) => {
            const expirationTime = Date.now() + data.expiresIn * 1000

            authCtx.login(data.idToken, expirationTime)
            navigate("/", { replace: true })
         }
      )
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
               {!isLoading && error && <p>{error}</p>}
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
