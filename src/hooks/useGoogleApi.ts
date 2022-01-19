import { GoogleBook } from '../components/API/GoogleBook'
import { useEffect, useState } from 'react'
import { BooksApiResponse, Items } from '../types/GoogleBooks'
import { useParams } from 'react-router-dom'
export const useGoogleBooksApi = (initialParameter: string) => {
  const [response, setResponse] = useState<BooksApiResponse[]>([])
  const [info, setInfo] = useState<BooksApiResponse>()
  const [params, searchTerm] = useState(initialParameter)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const parameter = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        if (parameter.id != undefined) {
          const response = await GoogleBook.get<BooksApiResponse>(
            `/${parameter.id}`
          )

          if (response.status === 200) {
            const data = response.data
            setInfo(data)
          }
        } else {
          const response = await GoogleBook.get<Items>('', {
            params: { q: params },
          })
          const data = response.data.items
          setResponse(data)
        }
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

  return [{ response, info, isLoading, isError }, searchTerm] as const
}
