import React from "react"

import styles from "./Contact.module.scss"

const Contact = () => {
   return (
      <section className={styles.contact}>
         <header className={styles["contact-head"]}>
            <h2>CONTACT US</h2>
            <span>We'd love to hear from you.</span>
         </header>
      </section>
   )
}

export default Contact
