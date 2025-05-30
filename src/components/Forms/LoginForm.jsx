import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { FORM_MODES } from "../../utils/constants"
import AuthContext from "../../context/AuthContext"
import useHttp from "../../hooks/useHttp"

import styles from "./Forms.module.scss"

const LoginForm = ({ handleFormMode }) => {
   const [passVisible, setPassVisible] = useState(false)
   const { sendRequest: loginUser, isLoading, error } = useHttp()
   const authCtx = useContext(AuthContext)

   const [formData, setFormData] = useState({ email: "", password: "" })

   const navigate = useNavigate()

   // Toggle password visibility
   const handlePassVisible = () => {
      setPassVisible((prevState) => !prevState)
   }

   const handleFormDataChange = (e) => {
      const { name, value } = e.target

      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }))
   }

   const handleLogin = async (e) => {
      e.preventDefault()

      const apiRes = await loginUser({
         url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAfdliDaU39tcKz0o6mP08DN1Ie0lGmhE",
         method: "POST",
         body: {
            email: formData.email,
            password: formData.password,
            returnSecureToken: true,
         },
      })

      if (!apiRes) {
         console.warn("Login failed! Aborting further steps.")
         return
      }

      const expirationTime = Date.now() + apiRes.expiresIn * 1000

      authCtx.login(apiRes.idToken, expirationTime, apiRes.localId)
      navigate("/", { replace: true })
   }

   return (
      <div className={styles["auth-form"]}>
         <header>
            <h2>Login</h2>
         </header>
         <form onSubmit={handleLogin}>
            <div className={styles["form-control"]}>
               <label>Email</label>
               <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleFormDataChange}
                  required
               />
            </div>
            <div className={styles["form-control"]}>
               <label>Password</label>
               <input
                  type={passVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleFormDataChange}
                  required
               />
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
               {isLoading ? "Logging In ..." : "Login"}
            </button>
            {!isLoading && error && <p className={styles.feedback}>{error}</p>}
            <div className={styles["mode-change"]}>
               <span>Don't have an account?</span>
               <button
                  type="button"
                  className={styles["button-secondary"]}
                  onClick={() => handleFormMode(FORM_MODES.signUp)}
               >
                  Sign Up
               </button>
            </div>
         </form>
      </div>
   )
}

export default LoginForm
