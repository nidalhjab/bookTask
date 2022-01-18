import { useEffect, useState } from 'react'
import { GoogleBook } from '../components/API/GoogleBook'
import { BooksApiResponse, Items, VolumeInfo } from '../types/GoogleBooks'

export const useGetBookFromUrl = (bookId: string) => {
  const [bookInfo, setBookInfo] = useState<VolumeInfo>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  useEffect(() => {
    const getBookDetails = async () => {
      try {
        setLoading(true)
        const response = await GoogleBook.get<BooksApiResponse>(
          `/volumes/${bookId}`
        )
        if (response.status === 200) {
          const data = response.data.volumeInfo
          setBookInfo(data)
        } else {
          setError(true)
        }
      } catch (error) {
        setError(true)
      }
      setLoading(false)
    }
    getBookDetails()
  }, [bookId])

  return [{ bookInfo, loading, error }] as const
}
