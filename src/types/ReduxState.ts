import { BooksApiResponse } from './GoogleBooks'

export type State = {
  searchInput: string
  loading: boolean
  error: boolean
  fetchedBooks: BooksApiResponse[]
}
