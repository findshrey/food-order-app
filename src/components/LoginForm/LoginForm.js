import React, { useRef } from "react"

const LoginForm = ({ handleAuthMode }) => {
   const emailRef = useRef()
   const passwordRef = useRef()

   return (
      <div className="login-form">
         <h3>Login</h3>
         <form>
            <div className="form-control">
               <label>Email:</label>
               <input type="email" ref={emailRef} required />
            </div>
            <div className="form-control">
               <label>Password:</label>
               <input type="password" ref={passwordRef} required />
            </div>
            <button type="submit">Login</button>
            <button type="button" onClick={handleAuthMode}>
               Create new account
            </button>
         </form>
      </div>
   )
}

export default LoginForm
