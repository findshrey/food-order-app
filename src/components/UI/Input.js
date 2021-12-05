import React from "react"

import styles from "Input.module.scss"

const Input = ({ label, input }) => {
   return (
      <div className={styles["input"]}>
         <label htmlFor="">{label}</label>
         <input {...input} />
      </div>
   )
}

export default Input
