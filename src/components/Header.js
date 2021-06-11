import React from 'react'

import Navbar from './Navbar/Navbar'

const Header = () => {
   return (
      <header className="main-head">
         <div className="logo">
            <h1>ReactMeals</h1>
         </div>
         <Navbar />
      </header>
   )
}

export default Header