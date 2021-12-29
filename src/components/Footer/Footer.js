import React from "react"
import { Link } from "react-router-dom"

import NAV_LINKS from "../../constants/navLinks"
import {
   IconFacebook,
   IconInstagram,
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
               <header className={styles.logo}>
                  <h2>
                     <span>React</span>Meals
                  </h2>
                  <p>
                     Our job is to fill your tummy with delicious food and fast
                     and free delivery!
                  </p>
               </header>
               <div className={styles.navigation}>
                  <h3>Quick Links</h3>
                  <nav>
                     <ul>
                        {NAV_LINKS.map((link, index) => (
                           <li key={index}>
                              <Link to={link.url}>{link.name}</Link>
                           </li>
                        ))}
                     </ul>
                  </nav>
               </div>
               <div className={styles.contact}>
                  <h3>Get in Touch</h3>
                  <ul>
                     <li>
                        <IconLocation />
                        <span>16 Pandara Rd, Delhi 110003</span>
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
                     <IconInstagram />
                  </li>
                  <li>
                     <IconTwitter />
                  </li>
               </ul>
            </div>
         </div>
      </footer>
   )
}

export default Footer
