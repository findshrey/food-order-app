import React, { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import * as MODES from "../../constants/formModes"
import AuthContext from "../../context/AuthContext"
import useHttp from "../../hooks/useHttp"

import styles from "./Forms.module.scss"

const LoginForm = ({ handleFormMode }) => {
   const [passVisible, setPassVisible] = useState(false)
   const { isLoading, error, sendRequest: loginRequest } = useHttp()
   const authCtx = useContext(AuthContext)

   const emailRef = useRef()
   const passwordRef = useRef()

   const navigate = useNavigate()

   // Toggle password visibility
   const handlePassVisible = () => {
      setPassVisible((prevState) => !prevState)
   }

   const handleLogin = (e) => {
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
            <header>
               <h2>Login</h2>
            </header>
            <form onSubmit={handleLogin}>
               <div className={styles["form-control"]}>
                  <label>Email:</label>
                  <input type="email" ref={emailRef} required />
               </div>
               <div className={styles["form-control"]}>
                  <label>Password:</label>
                  <input
                     type={passVisible ? "text" : "password"}
                     ref={passwordRef}
                     required
                  />
               </div>
               <div className={styles["content-checkbox"]}>
                  <input type="checkbox" onClick={handlePassVisible} />
                  <label>Show Password</label>
               </div>
               {!isLoading ? (
                  <button type="submit" className="btn-tomato">
                     Login
                  </button>
               ) : (
                  <p className={styles["loading-msg"]}>Logging In ...</p>
               )}
               {!isLoading && error && <p>{error}</p>}
               <div className={styles["mode-change"]}>
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
