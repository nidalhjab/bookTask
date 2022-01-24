import { GoogleBook } from '../api/GoogleBook'
import { useEffect, useState } from 'react'
export const useGoogleBooksApi = <T>(path: string) => {
  const [response, setResponse] = useState<T>()
  const [loading, setLoading] = useState<boolean>(false)
  const [searchTerm, doFetch] = useState<string>(path)
  const [error, setError] = useState<boolean>(false)
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const response = await GoogleBook.get<T>(searchTerm)
        setResponse(response.data)
      } catch (isError) {
        setError(true)
      }
      setLoading(false)
    }
    getData()
  }, [searchTerm])

  return { response, loading, error, doFetch } as const
}
