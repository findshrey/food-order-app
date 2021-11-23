const calculateRemainingTime = (expirationTime) => {
   return expirationTime - Date.now()
}

// Capitalize first letter
const capitalizeFirst = (str) => {
   const newString = str.charAt(0).toUpperCase() + str.slice(1)

   return newString
}

export { calculateRemainingTime, capitalizeFirst }
