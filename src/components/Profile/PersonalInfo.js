import React, { useState } from "react"

import Input from "../UI/Input"

const PersonalInfo = ({ userInfo }) => {
   const [editInfo, setEditInfo] = useState(false)

   const handleEditMode = () => {
      setEditInfo((prevState) => !prevState)
   }

   return (
      <section className="personal-info">
         <header>
            <h3>Personal Info</h3>
         </header>
         <div className="info-form">
            <button onClick={handleEditMode}>Click</button>
            <form>
               <div className="form-control">
                  <label>User Name</label>
                  {editInfo ? (
                     <input type="text" />
                  ) : (
                     <span>{userInfo.name}</span>
                  )}
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
   )
}

export default PersonalInfo
