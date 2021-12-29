import React, { useEffect, useState } from "react"

import Input from "../UI/Input"
import useHttp from "../../hooks/useHttp"

import styles from "./PersonalInfo.module.scss"

const PersonalInfo = ({ userId }) => {
   const [userInfo, setUserInfo] = useState({ name: "", phone: 0, address: "" })
   const [editMode, setEditMode] = useState(false)

   const {
      isLoading: fetchLoad,
      error: fetchErr,
      sendRequest: fetchUserInfo,
   } = useHttp()

   const {
      isLoading: updateLoad,
      error: updateErr,
      sendRequest: updateUserInfo,
   } = useHttp()

   // URL to user's personal data
   const dataURL = `https://food-order-app-35a86-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`

   // Get user's data on page load
   useEffect(() => {
      fetchUserInfo(
         {
            url: dataURL,
         },
         (data) => {
            setUserInfo(data)
         }
      )
   }, [fetchUserInfo])

   // Update user's personal info
   const handleUpdate = (e) => {
      e.preventDefault()

      updateUserInfo(
         {
            url: dataURL,
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: userInfo,
         },
         (data) => console.log(data)
      )

      setEditMode(false)
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
               {!fetchLoad && !fetchErr && (
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
            {fetchLoad && (
               <p className={styles.feedback}>Fetching user data ...</p>
            )}
            {!fetchLoad && fetchErr && (
               <p className={styles.feedback}>{fetchErr}</p>
            )}
            {!fetchLoad && !fetchErr && (
               <form className={styles["info-form"]}>
                  <div className={styles["fields-wrapper"]}>
                     <div className={styles["form-control"]}>
                        <Input
                           label="User Name"
                           inputProps={{
                              type: "text",
                              value: userInfo?.name || "",
                              onChange: (e) => {
                                 handleFieldValue("name", e.target.value)
                              },
                              disabled: !editMode,
                           }}
                        />
                     </div>
                     <div className={styles["form-control"]}>
                        <Input
                           label="Phone Number"
                           inputProps={{
                              type: "number",
                              value: userInfo?.phone || 0,
                              onChange: (e) => {
                                 handleFieldValue("phone", e.target.value)
                              },
                              disabled: !editMode,
                           }}
                        />
                     </div>
                     <div className={styles["form-control"]}>
                        <Input
                           label="Address"
                           inputProps={{
                              type: "text",
                              value: userInfo?.address || "",
                              onChange: (e) => {
                                 handleFieldValue("address", e.target.value)
                              },
                              disabled: !editMode,
                           }}
                        />
                     </div>
                  </div>
                  <div className={styles.btns}>
                     <button
                        className="btn-red-brick"
                        type="button"
                        onClick={() => setEditMode(false)}
                        disabled={!editMode || updateLoad}
                     >
                        Cancel
                     </button>
                     <button
                        className="btn-red-brick"
                        type="submit"
                        onClick={handleUpdate}
                        disabled={!editMode || updateLoad}
                     >
                        {updateLoad ? "Updating ..." : "Save"}
                     </button>
                  </div>
                  {!updateLoad && updateErr && (
                     <p className={styles.feedback}>{updateErr}</p>
                  )}
               </form>
            )}
         </div>
      </section>
   )
}

export default PersonalInfo
