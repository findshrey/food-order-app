import React from "react"

const Input = ({ label, inputProps }) => {
   return (
      <>
         <label>{label}</label>
         <input {...inputProps} />
      </>
   )
}

export default Input
