import { useGoogleBooksApi } from './useGoogleBooksApi'
export const useGetSearchBooks = (initialParameter: string) => {
  const { response, isLoading, isError, doFetch } = useGoogleBooksApi(
    `/volumes?q=${initialParameter}`
  )

  return {
    books: response,
    loading: isLoading,
    error: isError,
    searchBooks: (bookName: string) => {
      doFetch(`/volumes?q=${bookName}`)
    },
  }
}
