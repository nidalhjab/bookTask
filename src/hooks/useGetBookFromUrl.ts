import { useParams } from 'react-router-dom'
import { BooksApiResponse } from '../types/GoogleBooks'
import { useGoogleBooksApi } from './useGoogleBooksApi'
const VOLUMES_SEAECH_PATH = '/volumes/'
export const useGetBookFromUrl = () => {
  const { id } = useParams()
  const { response, loading, error } = useGoogleBooksApi<BooksApiResponse>(
    VOLUMES_SEAECH_PATH + id
  )
  return {
    book: response?.volumeInfo,
    loading,
    error,
  }
}
