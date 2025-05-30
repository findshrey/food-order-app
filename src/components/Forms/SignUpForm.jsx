import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { FORM_MODES } from "../../utils/constants"
import AuthContext from "../../context/AuthContext"
import useHttp from "../../hooks/useHttp"

import styles from "./Forms.module.scss"

const initialValidations = {
   email: "",
   password: "",
   phone: "",
   address: "",
}

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
   const {
      sendRequest: userSignUp,
      isLoading: signUpLoading,
      error: signUpError,
   } = useHttp()

   const { sendRequest: addUserDetails } = useHttp()

   const authCtx = useContext(AuthContext)

   const [formData, setFormData] = useState({
      email: "",
      password: "",
      phone: "",
      address: "",
   })

   const [formValidations, setFormValidations] = useState(initialValidations)

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

   const handleSignUp = async (e) => {
      e.preventDefault()

      const { isValid, errors } = validationCheck(formData)

      if (!isValid) {
         setFormValidations(errors)
         return
      } else {
         setFormValidations(initialValidations)
      }

      const apiRes = await userSignUp({
         url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAfdliDaU39tcKz0o6mP08DN1Ie0lGmhE",
         method: "POST",

         body: {
            email: formData.email,
            password: formData.password,
            returnSecureToken: true,
         },
      })

      if (!apiRes) {
         console.warn("Signup failed! Aborting further steps.")
         return
      }

      await addUserDetails({
         url: `https://food-order-app-35a86-default-rtdb.asia-southeast1.firebasedatabase.app/users/${apiRes?.localId}.json`,
         method: "PUT",

         body: {
            name: formData.email.split("@")[0],
            phone: formData.phone,
            address: formData.address,
         },
      })

      const expirationTime = Date.now() + apiRes.expiresIn * 1000
      authCtx.login(apiRes.idToken, expirationTime, apiRes.localId)
      navigate("/", { replace: true })
   }

   return (
      <section className={styles["auth-form"]}>
         <header>
            <h2>Sign Up</h2>
         </header>
         <form onSubmit={handleSignUp}>
            <div className={styles["form-control"]}>
               <label>Email*</label>
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
               <label>Password*</label>
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
               <label>Phone*</label>
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
               <label>Address*</label>
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
               disabled={signUpLoading}
            >
               {signUpLoading ? "Signing Up ..." : "Sign up"}
            </button>
            {!signUpLoading && signUpError && (
               <p className={styles.feedback}>{signUpError}</p>
            )}
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
      </section>
   )
}

export default SignUpForm
