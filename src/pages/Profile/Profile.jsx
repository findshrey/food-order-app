import { useContext } from "react"

import AuthContext from "../../context/AuthContext"
import ChangePassword from "../../components/ChangePassword/ChangePassword"
import PersonalInfo from "../../components/PersonalInfo/PersonalInfo"

import useTitle from "../../hooks/useTitle"

import styles from "./Profile.module.scss"

const Profile = () => {
   const authCtx = useContext(AuthContext)
   useTitle("React Meals | Profile")

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
