import React from "react"

import imgContact from "../../assets/images/contact.svg"

import styles from "./Contact.module.scss"

const Contact = () => {
   const handleSubmit = (e) => {
      e.preventDefault()

      console.log("Form Submitted!")
   }

   return (
      <section className={styles.contact}>
         <div className="container">
            <header className={styles["contact-head"]}>
               <h2>CONTACT US</h2>
               <span>We'd love to hear from you.</span>
            </header>
            <div className={styles["contact-body"]}>
               <div className={styles["contact-img"]}>
                  <img src={imgContact} />
               </div>
               <div className={styles["form-wrapper"]}>
                  <form onSubmit={handleSubmit}>
                     <div className={styles["form-control"]}>
                        <label>Name</label>
                        <input type="text" required />
                     </div>
                     <div className={styles["form-control"]}>
                        <label>Email</label>
                        <input type="email" required />
                     </div>
                     <div className={styles["form-control"]}>
                        <label>Message</label>
                        <textarea rows="8" required />
                     </div>
                     <button className="btn-red-brick" type="submit">
                        Send Message
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Contact
