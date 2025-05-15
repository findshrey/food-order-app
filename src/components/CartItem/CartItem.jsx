import styles from "./CartItem.module.scss"

const CartItem = ({ item, handleAddItem, handleRemoveItem }) => {
   return (
      <li className={styles["cart-item"]}>
         <span className={styles["item-name"]}>{item.name}</span>
         <div className={styles["item-info"]}>
            <div className={styles.btns}>
               <button
                  className="btn-red-brick"
                  onClick={handleRemoveItem.bind(null, item.id)}
               >
                  -
               </button>
               <span className={styles["item-qty"]}>{item.quantity}</span>
               <button
                  className="btn-red-brick"
                  onClick={handleAddItem.bind(null, item)}
               >
                  +
               </button>
            </div>
            <span className={styles["item-price"]}>{`₹${
               item.price * item.quantity
            }`}</span>
         </div>
      </li>
   )
}

export default CartItem
