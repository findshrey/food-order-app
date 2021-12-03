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

   // Submenu keys array (apptizers, beverages etc..)
   const subMenuKeys = Object.keys(menu)

   return (
      <section className={styles["menu"]}>
         <header className={styles["menu-head"]}>
            <h2>OUR MENU</h2>
         </header>
         <div className={styles["menu-inner"]}>
            {isLoading && <p className={styles.message}>Loading ...</p>}
            {!isLoading && subMenuKeys.length === 0 && !error && (
               <p className={styles.message}>Found no items to show!</p>
            )}
            {!isLoading && subMenuKeys.length > 0 && (
               <>
                  {subMenuKeys.map((subKey, index) => (
                     <div key={index} className={styles["sub-menu"]}>
                        <header>
                           <h3>{capitalizeFirst(subKey)}</h3>
                        </header>
                        <ul className={styles["sub-menu-list"]}>
                           {menu[subKey].map((item) => (
                              <MenuItem key={item.id} item={item} />
                           ))}
                        </ul>
                     </div>
                  ))}
               </>
            )}
            {!isLoading && error && <p className={styles.message}>{error}</p>}
         </div>
      </section>
   )
}

export default Menu
