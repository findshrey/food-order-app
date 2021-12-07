import React, { useEffect, useState } from "react"

import Input from "../UI/Input"
import useHttp from "../../hooks/useHttp"

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
      <section className="personal-info">
         <header>
            <h3>Personal Info</h3>
         </header>
         {fetchLoad && <p>Fetching user data ...</p>}
         {!fetchLoad && fetchErr && <p>{fetchErr}</p>}
         {!fetchLoad && !fetchErr && (
            <div className="info-form">
               <button onClick={() => setEditMode(true)} disabled={editMode}>
                  Edit
               </button>
               <form>
                  <div className="form-control">
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
                  <div className="form-control">
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
                  <div className="form-control">
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
                  <>
                     {updateLoad && (
                        <p className="request-status">Updating ...</p>
                     )}
                     {!updateLoad && updateErr && (
                        <p className="request-status">{updateErr}</p>
                     )}
                  </>
                  <div className="buttons">
                     <button
                        type="button"
                        onClick={() => setEditMode(false)}
                        disabled={!editMode}
                     >
                        Cancel
                     </button>
                     <button
                        type="submit"
                        onClick={handleUpdate}
                        disabled={!editMode}
                     >
                        Save
                     </button>
                  </div>
               </form>
            </div>
         )}
      </section>
   )
}

export default PersonalInfo
