import React, { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import * as MODES from "../../constants/formModes"
import AuthContext from "../../context/AuthContext"

import styles from "./Forms.module.scss"

const SignUpForm = ({ handleFormMode }) => {
   const navigate = useNavigate()
   const emailRef = useRef()
   const passwordRef = useRef()

   const authCtx = useContext(AuthContext)

   const [isLoading, setIsLoading] = useState(false)

   const handleSubmit = (e) => {
      e.preventDefault()

      // Add validation

      setIsLoading(true)

      fetch(
         "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAfdliDaU39tcKz0o6mP08DN1Ie0lGmhE",
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
      <div className={styles["sign-up-form"]}>
         <div className={styles["form-inner"]}>
            <h3>Sign Up</h3>
            <form onSubmit={handleSubmit}>
               <div className={styles["form-control"]}>
                  <label>Name:</label>
                  <input type="text" required />
               </div>
               <div className={styles["form-control"]}>
                  <label>Email:</label>
                  <input type="email" ref={emailRef} required />
               </div>
               <div className={styles["form-control"]}>
                  <label>Password:</label>
                  <input type="password" ref={passwordRef} required />
               </div>
               <div className={styles["form-control"]}>
                  <label>Phone:</label>
                  <input type="number" required />
               </div>
               <div className={styles["form-control"]}>
                  <label>Address:</label>
                  <input type="text" required />
               </div>
               {!isLoading ? (
                  <button type="submit" className={styles["btn-primary"]}>
                     Sign up
                  </button>
               ) : (
                  <p className={styles["logging-message"]}>Signing Up ...</p>
               )}
               <div className={styles["text-row"]}>
                  Already a member?
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
