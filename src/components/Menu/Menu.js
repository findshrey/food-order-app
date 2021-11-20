import React, { useState, useEffect } from "react"

import MenuItem from "./MenuItem"
import useHttp from "../../hooks/useHttp"

import styles from "./Menu.module.scss"

const Menu = () => {
   const [menu, setMenu] = useState({})
   const { isLoading, error, sendRequest: fetchMenu } = useHttp()

   useEffect(() => {
      fetchMenu(
         {
            url: "https://food-order-app-35a86-default-rtdb.asia-southeast1.firebasedatabase.app/menu.json",
         },
         (data) => {
            // Transformed menu data
            const updatedMenu = {}

            for (const subMenu in data) {
               updatedMenu[subMenu] = []

               for (const itemKey in data[subMenu]) {
                  updatedMenu[subMenu].push({
                     id: itemKey,
                     ...data[subMenu][itemKey],
                  })
               }
            }

            setMenu(updatedMenu)
         }
      )
   }, [fetchMenu])

   // Submenu keys array
   const subMenuKeys = Object.keys(menu)

   return (
      <section className="menu">
         <header>
            <h3>ReactMeals Menu</h3>
         </header>
         {isLoading && <p>Loading ...</p>}
         {!isLoading && subMenuKeys.length === 0 && !error && (
            <p>Found No Items to show</p>
         )}
         {!isLoading && subMenuKeys.length > 0 && (
            <div className="menu-wrapper">
               {subMenuKeys.map((el) => (
                  <ul className="menu-list">
                     {menu[el].map((item) => (
                        <MenuItem item={item} />
                     ))}
                  </ul>
               ))}
            </div>
         )}
         {!isLoading && error && <p>{error}</p>}
      </section>
   )
}

export default Menu
