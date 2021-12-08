import React, { useRef } from "react"

import useHttp from "../../hooks/useHttp"

const ChangePassword = ({ token }) => {
   const { isLoading, error, sendRequest: updatePassword } = useHttp()
   const passwordRef = useRef()
   const passwordConfirmRef = useRef()

   // Updates account password
   const handlePassword = (e) => {
      e.preventDefault()

      // Validation
      if (
         passwordRef.current.value.trim() !==
         passwordConfirmRef.current.value.trim()
      ) {
         return console.log("Passwords do not match!")
      }

      updatePassword(
         {
            url: "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCAfdliDaU39tcKz0o6mP08DN1Ie0lGmhE",
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: {
               idToken: token,
               password: passwordRef.current.value,
               returnSecureToken: false,
            },
         },
         (data) => console.log(data)
      )
   }

   return (
      <section className="change-password">
         <header>
            <h3>Change Your Password</h3>
         </header>
         <form onSubmit={handlePassword}>
            <div className="form-control">
               <label>New Password</label>
               <input type="password" ref={passwordRef} required />
            </div>
            <div className="form-control">
               <label>Confirm Password</label>
               <input type="password" ref={passwordConfirmRef} required />
            </div>
            <button type="submit">Change</button>
         </form>
      </section>
   )
}

export default ChangePassword
