import { useParams } from 'react-router-dom'
import { BooksApiResponse } from '../types/GoogleBooks'
import { useGoogleBooksApi } from './useGoogleBooksApi'
export const useGetBookFromUrl = () => {
  const { id } = useParams()
  const VOLUMES_SEAECH_PATH = `/volumes/${id}`
  const { response, loading, error } =
    useGoogleBooksApi<BooksApiResponse>(VOLUMES_SEAECH_PATH)
  return {
    book: response?.volumeInfo,
    loading,
    error,
  }
}
