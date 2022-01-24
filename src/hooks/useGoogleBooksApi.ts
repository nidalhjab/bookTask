import { GoogleBook } from '../api/GoogleBook'
import { useEffect, useState } from 'react'
export const useGoogleBooksApi = <T>(path: string) => {
  const [response, setResponse] = useState<T>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchTerm, doFetch] = useState<string>(path)
  const [isError, setIsError] = useState<boolean>(false)
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        const response = await GoogleBook.get<T>(searchTerm)
        setResponse(response.data)
      } catch (isError) {
        setIsError(true)
      }
      setIsLoading(false)
    }
    getData()
  }, [searchTerm])

  return { response, isLoading, isError, doFetch } as const
}
