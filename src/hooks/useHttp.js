import { useCallback, useState } from "react"

const useHttp = () => {
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState(null)

   const sendRequest = useCallback(async (reqConfig) => {
      setIsLoading(true)
      setError(null)

      try {
         const options = {
            method: reqConfig.method,
            headers: {
               "Content-Type": "application/json",
            },
         }

         if (reqConfig.method !== "GET" && reqConfig.body) {
            options.body = JSON.stringify(reqConfig.body)
         }

         const res = await fetch(reqConfig.url, options)

         if (!res.ok) {
            const errBody = await res.json()
            throw errBody
         }

         const resData = await res.json()
         return resData
      } catch (err) {
         setError(err.error.message)
      } finally {
         setIsLoading(false)
      }
   }, [])

   return {
      sendRequest,
      isLoading,
      error,
   }
}

export default useHttp
