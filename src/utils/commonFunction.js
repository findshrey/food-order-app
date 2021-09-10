const calculateRemainingTime = (expirationTime) => {
   return expirationTime - Date.now()
}

export { calculateRemainingTime }
