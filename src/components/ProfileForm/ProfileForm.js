import React, { useRef, useContext } from "react"
import { useHistory } from "react-router-dom"

import AuthContext from "../../context/AuthContext"

const ProfileForm = () => {
   const history = useHistory()
   const passwordRef = useRef()
   const authCtx = useContext(AuthContext)

   const handleSubmit = (e) => {
      e.preventDefault()

      // add validation

      fetch(
         "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCAfdliDaU39tcKz0o6mP08DN1Ie0lGmhE",
         {
            method: "POST",
            body: JSON.stringify({
               idToken: authCtx.token,
               password: passwordRef.current.value,
               returnSecureToken: false,
            }),
            headers: {
               "Content-Type": "application/json",
            },
         }
      ).then((res) => {
         // assumption: Always succeeds!
         history.replace("/")
      })
   }

   return (
      <div className="profile-form">
         <h3>Change your Password</h3>
         <form onSubmit={handleSubmit}>
            <div className="form-control">
               <label>New Password</label>
               <input type="password" ref={passwordRef} required />
            </div>
            <button type="submit">Change</button>
         </form>
      </div>
   )
}

export default ProfileForm
