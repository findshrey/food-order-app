const addZeroes = (num) => {
   const newNum = Number(num)

   if (isNaN(newNum)) {
      return 0
   }

   return newNum.toFixed(2)
}

const calculateRemainingTime = (expirationTime) => {
   return expirationTime - Date.now()
}

// Capitalize first letter
const capitalizeFirst = (str) => {
   const newString = str.charAt(0).toUpperCase() + str.slice(1)

   return newString
}

export { addZeroes, calculateRemainingTime, capitalizeFirst }
