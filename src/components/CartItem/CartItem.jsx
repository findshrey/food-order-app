import styles from "./CartItem.module.scss"

const CartItem = ({ item, handleAddItem, handleRemoveItem }) => {
   return (
      <li className={styles["cart-item"]}>
         <p className={styles["item-name"]}>{item.name}</p>
         <div className={styles["item-info"]}>
            <div className={styles.btns}>
               <button
                  className="btn-red-brick"
                  onClick={handleRemoveItem.bind(null, item.id)}
               >
                  -
               </button>
               <p className={styles["item-qty"]}>{item.quantity}</p>
               <button
                  className="btn-red-brick"
                  onClick={handleAddItem.bind(null, item)}
               >
                  +
               </button>
            </div>
            <p className={styles["item-price"]}>{`₹${
               item.price * item.quantity
            }`}</p>
         </div>
      </li>
   )
}

export default CartItem
