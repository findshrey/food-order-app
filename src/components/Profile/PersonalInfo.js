import React, { useEffect, useState } from "react"

import Input from "../UI/Input"
import useHttp from "../../hooks/useHttp"

const PersonalInfo = ({ userId }) => {
   const [userInfo, setUserInfo] = useState({ name: "", phone: 0, address: "" })
   const { isLoading, error, sendRequest: fetchUserInfo } = useHttp()
   const [editInfo, setEditInfo] = useState(false)

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

   // Toggle edit form
   const handleEditMode = () => {
      setEditInfo((prevState) => !prevState)
   }

   return (
      <section className="personal-info">
         <header>
            <h3>Personal Info</h3>
         </header>
         <div className="info-form">
            <button onClick={handleEditMode}>Edit</button>
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
                        disabled: !editInfo,
                     }}
                  />
               </div>
               <div className="form-control">
                  <Input
                     label="Phone Number"
                     inputProps={{
                        type: "text",
                        value: userInfo.phone,
                        onChange: (e) => {
                           handleFieldValue("phone", e.target.value)
                        },
                        disabled: !editInfo,
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
                        disabled: !editInfo,
                     }}
                  />
               </div>
            </form>
         </div>
      </section>
   )
}

export default PersonalInfo
