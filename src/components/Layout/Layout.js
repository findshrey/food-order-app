import React from "react"

import Footer from "./Footer"
import Header from "./Header"

import styles from "./Layout.module.scss"

const Layout = (props) => {
   return (
      <>
         <Header />
         <main className={styles["main-content"]}>{props.children}</main>
         <Footer />
      </>
   )
}

export default Layout
