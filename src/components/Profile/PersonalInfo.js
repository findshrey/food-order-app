import React, { useEffect, useState } from "react"

import Input from "../UI/Input"
import useHttp from "../../hooks/useHttp"

const PersonalInfo = ({ userId }) => {
   const [userInfo, setUserInfo] = useState({ name: "", phone: 0, address: "" })
   const { isLoading, error, sendRequest: fetchUserInfo } = useHttp()
   const [editMode, setEditMode] = useState(false)

   // Get user data on page load
   useEffect(() => {
      fetchUserInfo(
         {
            url: `https://food-order-app-35a86-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`,
         },
         (data) => {
            setUserInfo(data)
         }
      )
   }, [fetchUserInfo])

   // Controlled field values
   const handleFieldValue = (fieldName, val) => {
      setUserInfo((prevState) => ({ ...prevState, [fieldName]: val }))
   }

   return (
      <section className="personal-info">
         <header>
            <h3>Personal Info</h3>
         </header>
         <div className="info-form">
            <button onClick={() => setEditMode(true)}>Edit</button>
            <form>
               <div className="form-control">
                  <Input
                     label="User Name"
                     inputProps={{
                        type: "text",
                        value: userInfo.name,
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
                        value: userInfo.phone,
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
                        value: userInfo.address,
                        onChange: (e) => {
                           handleFieldValue("address", e.target.value)
                        },
                        disabled: !editMode,
                     }}
                  />
               </div>
               <button type="button" onClick={() => setEditMode(false)}>
                  Cancel
               </button>
               <button type="submit">Save</button>
            </form>
         </div>
      </section>
   )
}

export default PersonalInfo
