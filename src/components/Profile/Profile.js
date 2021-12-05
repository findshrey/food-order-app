import React, { useState, useContext, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

import AuthContext from "../../context/AuthContext"
import useHttp from "../../hooks/useHttp"

const Profile = () => {
   const navigate = useNavigate()
   const passwordRef = useRef()
   const authCtx = useContext(AuthContext)
   const { isLoading, error, sendRequest: fetchUserInfo } = useHttp()
   const [userInfo, setUserInfo] = useState({})

   // Get user data on mount
   useEffect(() => {
      fetchUserInfo(
         {
            url: `https://food-order-app-35a86-default-rtdb.asia-southeast1.firebasedatabase.app/users/${authCtx.userId}.json`,
         },
         (data) => {
            setUserInfo(data)
         }
      )
   }, [fetchUserInfo])

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
      <div className="profile">
         <header className="profile-head">
            <h2>My Profile</h2>
         </header>
         <section className="personal-info">
            <header>
               <h3>Personal Info</h3>
            </header>
            <div className="info-container">
               <form>
                  <div className="form-control">
                     <label>User Name</label>
                     <span>{userInfo.name}</span>
                  </div>
                  <div className="form-control">
                     <label>Phone Number</label>
                     <span>{userInfo.phone}</span>
                  </div>
                  <div className="form-control">
                     <label>Address</label>
                     <span>{userInfo.address}</span>
                  </div>
               </form>
            </div>
         </section>
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
