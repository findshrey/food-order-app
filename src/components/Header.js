import React from 'react'

import Navbar from './Navbar/Navbar'
import styles from './Header.module.scss'

const Header = () => {
   return (
      <header className={styles['main-head']}>
         <div className="container">
            <div className="logo">
               <h1>ReactMeals</h1>
            </div>
            <Navbar />
         </div>
      </header>
   )
}

export default Header