import { useParams } from 'react-router-dom'
import { BooksApiResponse } from '../types/GoogleBooks'
import { useGoogleBooksApi } from './useGoogleBooksApi'
export const useGetBookFromUrl = () => {
  const { id } = useParams()
  const { response, isLoading, isError } = useGoogleBooksApi<BooksApiResponse>(
    `/volumes/${id}`
  )
  return {
    book: response,
    loading: isLoading,
    error: isError,
  }
}
