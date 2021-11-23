import React, { useState, useEffect } from "react"

import { capitalizeFirst } from "../../utils/commonFunction"
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

   // Submenu keys array (apptizers, pizza etc..)
   const subMenuKeys = Object.keys(menu)

   return (
      <section className={styles["menu"]}>
         <header className={styles["menu-head"]}>
            <h2>MENU</h2>
         </header>
         <div className={styles["menu-wrapper"]}>
            {!isLoading && subMenuKeys.length > 0 && (
               <div className={styles["menu-container"]}>
                  {subMenuKeys.map((key) => (
                     <div className={styles["sub-menu"]}>
                        <header>
                           <h3>{capitalizeFirst(key)}</h3>
                        </header>
                        <ul className={styles["sub-menu-list"]}>
                           {menu[key].map((item) => (
                              <MenuItem item={item} />
                           ))}
                        </ul>
                     </div>
                  ))}
               </div>
            )}
            {isLoading && <p>Loading ...</p>}
            {!isLoading && subMenuKeys.length === 0 && !error && (
               <p>Found No Items to show</p>
            )}
            {!isLoading && error && <p>{error}</p>}
         </div>
      </section>
   )
}

export default Menu
