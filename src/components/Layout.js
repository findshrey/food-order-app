import React from "react"

import Footer from "./Footer/Footer"
import Header from "./Header/Header"

import styles from "./Layout.module.scss"

const Layout = (props) => {
   return (
      <div className={styles.layout}>
         <Header />
         <main className={styles["main-content"]}>{props.children}</main>
         <Footer />
      </div>
   )
}

export default Layout
