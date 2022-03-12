import { useCallback, useState } from "react"

const useHttp = () => {
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState(null)

   const sendRequest = useCallback(async (requestConfig, applyData) => {
      setIsLoading(true)
      setError(null)

      try {
         const response = await fetch(requestConfig.url, {
            method: requestConfig.method ?? "GET",
            headers: requestConfig.headers ?? {},
            body: JSON.stringify(requestConfig.body) ?? null,
         })

         if (!response.ok) {
            throw new Error("Request Failed")
         }

         const data = await response.json()

         setIsLoading(false)
         applyData(data)
      } catch (e) {
         setIsLoading(false)
         setError(e.message || "Something went wrong!")
      }
   }, [])

   return {
      isLoading,
      error,
      sendRequest,
   }
}

export default useHttp
