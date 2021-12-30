import React, { useContext } from "react"

import AuthContext from "../../context/AuthContext"
import ChangePassword from "../../components/ChangePassword/ChangePassword"
import PersonalInfo from "../../components/PersonalInfo/PersonalInfo"

import styles from "./Profile.module.scss"

const Profile = () => {
   const authCtx = useContext(AuthContext)

   return (
      <div className={styles.profile}>
         <div className="container">
            <header className={styles["profile-head"]}>
               <h2>MY PROFILE</h2>
            </header>
            <PersonalInfo userId={authCtx.userId} />
            <ChangePassword token={authCtx.token} />
         </div>
      </div>
   )
}

export default Profile
