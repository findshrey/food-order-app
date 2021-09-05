import React, { useRef } from "react"

const SignUp = ({ handleAuthMode }) => {
   const emailRef = useRef()
   const passwordRef = useRef()
   const confirmPasswordRef = useRef()

   return (
      <div className="sign-up">
         <h3>Sign Up</h3>
         <form>
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
