import { useEffect } from "react"

const useTitle = (title, dependency = null) => {
   useEffect(() => {
      document.title = title
   }, [dependency])
}

export default useTitle
