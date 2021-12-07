import React, { useState, useContext, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

import AuthContext from "../../context/AuthContext"
import PersonalInfo from "./PersonalInfo"

import styles from "./Profile.module.scss"

const Profile = () => {
   const navigate = useNavigate()
   const passwordRef = useRef()
   const authCtx = useContext(AuthContext)

   // const handleSubmit = (e) => {
   //    e.preventDefault()

   //    // add validation

   //    fetch(
   //       "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCAfdliDaU39tcKz0o6mP08DN1Ie0lGmhE",
   //       {
   //          method: "POST",
   //          body: JSON.stringify({
   //             idToken: authCtx.token,
   //             password: passwordRef.current.value,
   //             returnSecureToken: false,
   //          }),
   //          headers: {
   //             "Content-Type": "application/json",
   //          },
   //       }
   //    ).then((res) => {
   //       // assumption: Always succeeds!
   //       navigate("/", { replace: true })
   //    })
   // }

   return (
      <div className={styles.profile}>
         <header className={styles["profile-head"]}>
            <h2>MY PROFILE</h2>
         </header>
         <PersonalInfo userId={authCtx.userId} />
         {/* <h3>Change your Password</h3>
         <form onSubmit={handleSubmit}>
            <div className="form-control">
               <label>New Password</label>
               <input type="password" ref={passwordRef} required />
            </div>
            <button type="submit">Change</button>
         </form> */}
      </div>
   )
}

export default Profile
