import React, { useRef } from "react"

const SignUp = ({ handleAuthMode }) => {
   const emailRef = useRef()
   const passwordRef = useRef()
   const confirmPasswordRef = useRef()

   const handleSubmit = (e) => {
      e.preventDefault()

      // Add validation

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
         if (res.ok) {
            // ..
         } else {
            return res.json().then((data) => {
               // show error modal
               console.log(data)
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
            <button type="submit">Sign up</button>
            <button type="button" onClick={handleAuthMode}>
               Login with existing account
            </button>
         </form>
      </div>
   )
}

export default SignUp
