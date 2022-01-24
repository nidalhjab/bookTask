import { Items } from '../types/GoogleBooks'
import { useGoogleBooksApi } from './useGoogleBooksApi'
export const useGetSearchBooks = (initialParameter: string) => {
  const { response, isLoading, isError, doFetch } = useGoogleBooksApi<Items>(
    `/volumes?q=${initialParameter}`
  )

  return {
    books: response?.items,
    loading: isLoading,
    error: isError,
    searchBooks: (bookName: string) => {
      doFetch(`/volumes?q=${bookName}`)
    },
  }
}
