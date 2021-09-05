import React, { useState, useRef } from "react"

const SignUp = ({ handleAuthMode }) => {
   const emailRef = useRef()
   const passwordRef = useRef()
   const confirmPasswordRef = useRef()

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
      ).then((res) => {
         setIsLoading(false)

         if (res.ok) {
            // ..
         } else {
            return res.json().then((data) => {
               const errorMessage =
                  data.error.message || "Authentication failed"
               // can show modal
               alert(errorMessage)
            })
         }
      })
   }

   return (
      <div className="sign-up">
         <h3>Sign Up</h3>
         <form onSubmit={handleSubmit}>
            <div className="form-control">
               <label>Email:</label>
               <input type="email" ref={emailRef} required />
            </div>
            <div className="form-control">
               <label>Password:</label>
               <input type="password" ref={passwordRef} required />
            </div>
            <div className="form-control">
               <label>Confirm Password:</label>
               <input type="password" ref={confirmPasswordRef} required />
            </div>
            {!isLoading ? (
               <button type="submit">Sign up</button>
            ) : (
               <p>Sending Request...</p>
            )}
            <button type="button" onClick={handleAuthMode}>
               Login with existing account
            </button>
         </form>
      </div>
   )
}

export default SignUp
