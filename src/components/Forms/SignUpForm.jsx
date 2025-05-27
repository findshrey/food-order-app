import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { FORM_MODES } from "../../utils/constants"
import AuthContext from "../../context/AuthContext"
import useHttp from "../../hooks/useHttp"

import styles from "./Forms.module.scss"

const validationCheck = (data) => {
   let isValid = true
   const errors = {}

   const { email, password, phone, address } = data
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   // indian mobile number - should start with 6, 7, 8, or 9 and be 10 digits long
   const mobileRegex = /^[6-9]\d{9}$/

   // Utility to check if a value is empty (handles strings, null, undefined)
   const isEmpty = (val) => !val || val.trim() === ""

   if (isEmpty(email)) {
      errors.email = "Email is required."
      isValid = false
   } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address."
      isValid = false
   }

   if (isEmpty(password)) {
      errors.password = "Password is required."
      isValid = false
   } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long."
      isValid = false
   }

   if (isEmpty(phone)) {
      errors.phone = "Phone number is required."
      isValid = false
   } else if (!mobileRegex.test(phone)) {
      errors.phone = "Please enter a valid mobile number."
      isValid = false
   }

   if (isEmpty(address)) {
      errors.address = "Address is required."
      isValid = false
   }

   return { isValid, errors }
}

const SignUpForm = ({ handleFormMode }) => {
   const [passVisible, setPassVisible] = useState(false)
   const { isLoading, error, sendRequest: signUpRequest } = useHttp()
   const authCtx = useContext(AuthContext)

   const [formData, setFormData] = useState({
      email: "",
      password: "",
      phone: "",
      address: "",
   })

   const [formValidations, setFormValidations] = useState({
      email: "",
      password: "",
      phone: "",
      address: "",
   })

   const handleFormDataChange = (e) => {
      const { name, value } = e.target

      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }))
   }

   const navigate = useNavigate()

   // Toggle password visibility
   const handlePassVisible = () => {
      setPassVisible((prevState) => !prevState)
   }

   const handleSignUp = (e) => {
      e.preventDefault()

      const { isValid, errors } = validationCheck(formData)

      if (!isValid) {
         setFormValidations(errors)
         return
      } else {
         setFormValidations({
            email: "",
            password: "",
            phone: "",
            address: "",
         })
      }

      signUpRequest(
         {
            url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAfdliDaU39tcKz0o6mP08DN1Ie0lGmhE",
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: {
               email: formData.email,
               password: formData.password,
               returnSecureToken: true,
            },
         },
         (data) => {
            // Create and populate user data
            fetch(
               `https://food-order-app-35a86-default-rtdb.asia-southeast1.firebasedatabase.app/users/${data.localId}.json`,
               {
                  method: "PUT",
                  headers: {
                     "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                     name: formData.email.split("@")[0],
                     phone: formData.phone,
                     address: formData.address,
                  }),
               }
            )

            const expirationTime = Date.now() + data.expiresIn * 1000

            authCtx.login(data.idToken, expirationTime, data.localId)
            navigate("/", { replace: true })
         }
      )
   }

   return (
      <div className={styles["auth-form"]}>
         <header>
            <h2>Sign Up</h2>
         </header>
         <form onSubmit={handleSignUp}>
            <div className={styles["form-control"]}>
               <label>Email:</label>
               <input
                  type="text"
                  name="email"
                  onChange={handleFormDataChange}
                  value={formData.email}
               />
               <p className={styles["validation-err"]}>
                  {formValidations.email}
               </p>
            </div>
            <div className={styles["form-control"]}>
               <label>Password:</label>
               <input
                  type={passVisible ? "text" : "password"}
                  name="password"
                  onChange={handleFormDataChange}
                  value={formData.password}
               />
               <p className={styles["validation-err"]}>
                  {formValidations.password}
               </p>
            </div>
            <div className={styles["form-control"]}>
               <label>Phone:</label>
               <input
                  type="number"
                  name="phone"
                  onChange={handleFormDataChange}
                  value={formData.phone}
               />
               <p className={styles["validation-err"]}>
                  {formValidations.phone}
               </p>
            </div>
            <div className={styles["form-control"]}>
               <label>Address:</label>
               <input
                  type="text"
                  name="address"
                  onChange={handleFormDataChange}
                  value={formData.address}
               />
               <p className={styles["validation-err"]}>
                  {formValidations.address}
               </p>
            </div>
            <div className={styles["form-options"]}>
               <input
                  id="check-visible"
                  type="checkbox"
                  onClick={handlePassVisible}
               />
               <label htmlFor="check-visible">Show Password</label>
            </div>
            <button
               type="submit"
               className="btn-red-brick"
               disabled={isLoading}
            >
               {isLoading ? "Signing Up ..." : "Sign up"}
            </button>
            {!isLoading && error && <p className={styles.feedback}>{error}</p>}
            <div className={styles["mode-change"]}>
               <span>Already a member?</span>
               <button
                  type="button"
                  className={styles["button-secondary"]}
                  onClick={() => handleFormMode(FORM_MODES.login)}
               >
                  Log in
               </button>
            </div>
         </form>
      </div>
   )
}

export default SignUpForm
