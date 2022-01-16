import { GoogleBook } from '../components/API/GoogleBook'
import { useEffect, useState } from 'react'
import { BooksApiResponse, Items } from '../types/GoogleBooks'
export const useGoogleBooksApi = (initialParameter: string) => {
  const [response, setResponse] = useState<BooksApiResponse[]>([])
  const [params, searchTerm] = useState(initialParameter)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        const response = await GoogleBook.get<Items>('/volumes', {
          params: { q: params },
        })
        const data = response.data.items
        setResponse(data)
      } catch (isError) {
        setIsError(true)
      }
      setIsLoading(false)
    }
    if (params === '') {
      return
    }
    getData()
  }, [params])

  return [{ response, isLoading, isError }, searchTerm] as const
}
