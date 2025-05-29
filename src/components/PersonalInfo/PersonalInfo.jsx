import { useEffect, useState } from "react"

import useHttp from "../../hooks/useHttp"

import styles from "./PersonalInfo.module.scss"

const PersonalInfo = ({ userId }) => {
   const [userInfo, setUserInfo] = useState({ name: "", phone: 0, address: "" })
   const [editMode, setEditMode] = useState(false)

   const {
      sendRequest: fetchUserInfo,
      isLoading: userInfoLoading,
      error: userInfoErr,
   } = useHttp()

   const {
      sendRequest: updateUserInfo,
      isLoading: updateUserLoading,
      error: updateUserErr,
   } = useHttp()

   // URL to user's personal data
   const dataURL = `https://food-order-app-35a86-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`

   // Get user's data on page load
   useEffect(() => {
      const fetchUserInfoWrapper = async () => {
         const apiRes = await fetchUserInfo({
            url: dataURL,
            method: "GET",
         })

         if (!apiRes) {
            console.warn("User data fetch failed! Aborting further steps.")
            return
         }

         setUserInfo(apiRes)
      }

      fetchUserInfoWrapper()
   }, [fetchUserInfo])

   // Update user's personal info
   const handleUpdate = async (e) => {
      e.preventDefault()

      const apiRes = await updateUserInfo({
         url: dataURL,
         method: "PUT",

         body: userInfo,
      })

      setEditMode(false)

      if (!apiRes) {
         console.warn("Update failed! Aborting further steps.")
         return
      } else {
         console.log("Updated successfully!", apiRes)
      }
   }

   // Controlled input
   const handleFieldValue = (fieldName, val) => {
      setUserInfo((prevState) => ({ ...prevState, [fieldName]: val }))
   }

   return (
      <section className={styles["personal-info"]}>
         <div className={styles["info-head-wrapper"]}>
            <header>
               <h3>Personal Info</h3>
               {!userInfoLoading && !userInfoErr && (
                  <button
                     className={styles["btn-edit"]}
                     onClick={() => setEditMode(true)}
                     disabled={editMode}
                  >
                     [EDIT]
                  </button>
               )}
            </header>
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Doloremque, ex.
            </p>
         </div>
         <div className={styles["info-body"]}>
            {userInfoLoading && (
               <p className={styles.feedback}>Fetching user data ...</p>
            )}
            {!userInfoLoading && userInfoErr && (
               <p className={styles.feedback}>{userInfoErr}</p>
            )}
            {!userInfoLoading && !userInfoErr && (
               <form className={styles["info-form"]}>
                  <div className={styles["fields-wrapper"]}>
                     <div className={styles["form-control"]}>
                        <label>User Name</label>
                        <input
                           type="text"
                           value={userInfo?.name || ""}
                           onChange={(e) =>
                              handleFieldValue("name", e.target.value)
                           }
                           disabled={!editMode}
                        />
                     </div>
                     <div className={styles["form-control"]}>
                        <label>Phone Number</label>
                        <input
                           type="number"
                           value={userInfo?.phone || 0}
                           onChange={(e) =>
                              handleFieldValue("phone", e.target.value)
                           }
                           disabled={!editMode}
                        />
                     </div>
                     <div className={styles["form-control"]}>
                        <label>Address</label>
                        <input
                           type="text"
                           value={userInfo?.address || ""}
                           onChange={(e) =>
                              handleFieldValue("address", e.target.value)
                           }
                           disabled={!editMode}
                        />
                     </div>
                  </div>
                  <div className={styles.btns}>
                     <button
                        className="btn-red-brick"
                        type="button"
                        onClick={() => setEditMode(false)}
                        disabled={!editMode || updateUserLoading}
                     >
                        Cancel
                     </button>
                     <button
                        className="btn-red-brick"
                        type="submit"
                        onClick={handleUpdate}
                        disabled={!editMode || updateUserLoading}
                     >
                        {updateUserLoading ? "Updating ..." : "Save"}
                     </button>
                  </div>
                  {!updateUserLoading && updateUserErr && (
                     <p className={styles.feedback}>{updateUserErr}</p>
                  )}
               </form>
            )}
         </div>
      </section>
   )
}

export default PersonalInfo
