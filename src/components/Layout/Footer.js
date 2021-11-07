import React from "react"

import {
   IconFacebook,
   IconLinkedIn,
   IconLocation,
   IconMail,
   IconPhone,
   IconTwitter,
} from "../../icons"

import styles from "./Footer.module.scss"

const Footer = () => {
   return (
      <footer className={styles.footer}>
         <div className="container">
            <div className={styles["footer-upper"]}>
               <div className={styles["block-1"]}>
                  <h3>
                     <span>React</span>Meals
                  </h3>
                  <p>
                     Our job is to fill your tummy with delicious food and fast
                     and free delivery!
                  </p>
               </div>
               <div className={styles["block-2"]}>
                  <h4>Feature</h4>
                  <ul>
                     <li>Home</li>
                     <li>Menu</li>
                     <li>Contact</li>
                  </ul>
               </div>
               <div className={styles["block-3"]}>
                  <h4>Get in Touch</h4>
                  <ul>
                     <li>
                        <IconLocation />
                        <span>8819 Ohio St. South Gate, CA 90280</span>
                     </li>
                     <li>
                        <IconMail />
                        <span>reactmeals@gmail.com</span>
                     </li>
                     <li>
                        <IconPhone />
                        <span>+1 386-688-3295</span>
                     </li>
                  </ul>
               </div>
            </div>
            <div className={styles["footer-lower"]}>
               <span>Copyright &copy; React Meals 2021</span>
               <ul className={styles["external-links"]}>
                  <li>
                     <IconFacebook />
                  </li>
                  <li>
                     <IconTwitter />
                  </li>
                  <li>
                     <IconLinkedIn />
                  </li>
               </ul>
            </div>
         </div>
      </footer>
   )
}

export default Footer
