import { Items } from '../types/GoogleBooks'
import { useGoogleBooksApi } from './useGoogleBooksApi'
export const useGetBooks = (initialParameter: string) => {
  const VOLUMES_SEAECH_PATH = '/volumes?q='
  const { response, loading, error, doFetch } = useGoogleBooksApi<Items>(
    VOLUMES_SEAECH_PATH + initialParameter
  )
  return {
    books: response?.items,
    loading,
    error,
    searchBooks: (bookName: string) => {
      doFetch(VOLUMES_SEAECH_PATH + bookName)
    },
  }
}
