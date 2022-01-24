import { useParams } from 'react-router-dom'
import { useGoogleBooksApi } from './useGoogleBooksApi'
export const useGetBookFromUrl = () => {
  const { id } = useParams()

  const {
    response: book,
    isLoading: loading,
    isError: error,
  } = useGoogleBooksApi(`/volumes/${id}`)

  return { book, loading, error }
}
