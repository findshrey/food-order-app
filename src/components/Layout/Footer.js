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
               <div className={styles.logo}>
                  <h3>
                     <span>React</span>Meals
                  </h3>
                  <p>
                     Our job is to fill your tummy with delicious food and fast
                     and free delivery!
                  </p>
               </div>
               <div className={styles.navigation}>
                  <h4>Feature</h4>
                  <ul>
                     {NAV_LINKS.map((link, index) => (
                        <li key={index}>
                           <Link to={link.url}>{link.name}</Link>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className={styles.contact}>
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
                     <IconInstagram />
                  </li>
                  <li>
                     <IconFacebook />
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
