import React from "react"

import Footer from "./Footer/Footer"
import Header from "./Header/Header"

const Layout = (props) => {
   return (
      <>
         <Header />
         <main className="main-content">{props.children}</main>
         <Footer />
      </>
   )
}

export default Layout
