import React, { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import * as MODES from "../../constants/formModes"
import AuthContext from "../../context/AuthContext"
import useHttp from "../../hooks/useHttp"

import styles from "./Forms.module.scss"

const SignUpForm = ({ handleFormMode }) => {
   const [passVisible, setPassVisible] = useState(false)
   const { isLoading, error, sendRequest: signUpRequest } = useHttp()
   const authCtx = useContext(AuthContext)

   const emailRef = useRef()
   const passwordRef = useRef()

   const navigate = useNavigate()

   // Toggle password visibility
   const handlePassVisible = () => {
      setPassVisible((prevState) => !prevState)
   }

   const handleSignUp = (e) => {
      e.preventDefault()

      signUpRequest(
         {
            url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAfdliDaU39tcKz0o6mP08DN1Ie0lGmhE",
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
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
      <div className={styles["sign-up-form"]}>
         <div className={styles["form-inner"]}>
            <header>
               <h2>Sign Up</h2>
            </header>
            <form onSubmit={handleSignUp}>
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
               <div className={styles["form-control"]}>
                  <label>Phone:</label>
                  <input type="number" required />
               </div>
               <div className={styles["form-control"]}>
                  <label>Address:</label>
                  <input type="text" required />
               </div>
               <div className={styles["content-checkbox"]}>
                  <input type="checkbox" onClick={handlePassVisible} />
                  <span>Show Password</span>
               </div>
               {!isLoading ? (
                  <button type="submit" className="btn-tomato">
                     Sign up
                  </button>
               ) : (
                  <p className={styles["loading-msg"]}>Signing Up ...</p>
               )}
               {!isLoading && error && <p>{error}</p>}
               <div className={styles["mode-change"]}>
                  <span>Already a member?</span>
                  <button
                     type="button"
                     className={styles["button-secondary"]}
                     onClick={() => handleFormMode(MODES.LOGIN)}
                  >
                     Log in
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}

export default SignUpForm
