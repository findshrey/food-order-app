import { ToastContainer } from "react-toastify"

import Footer from "./Footer"
import Header from "./Header"

import styles from "./Layout.module.scss"

const Layout = (props) => {
   return (
      <div className={styles.layout}>
         <ToastContainer theme="dark" />
         <Header />
         <main className={styles["main-content"]}>{props.children}</main>
         <Footer />
      </div>
   )
}

export default Layout
