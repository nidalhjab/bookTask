import { Items } from '../types/GoogleBooks'
import { useGoogleBooksApi } from './useGoogleBooksApi'
const VOLUMES_SEAECH_PATH = '/volumes?q='
export const useGetBooks = (initialParameter: string) => {
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
