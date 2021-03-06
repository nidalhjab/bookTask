import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GoogleBook } from '../api/GoogleBook'
import { BooksApiResponse, Items } from '../types/GoogleBooks'
import { RootState } from './Store'
export type State = {
  firstLoad: boolean
  searchInput: string
  loading: boolean
  error: boolean
  fetchedBooks: BooksApiResponse[]
}
const initialState: State = {
  firstLoad: true,
  searchInput: 'react',
  loading: false,
  error: false,
  fetchedBooks: [],
}
export const searchBooks = createAsyncThunk(
  'book/fetchBooks',
  async (googleBookName: string) => {
    const response = await GoogleBook.get<Items>('/volumes?q=' + googleBookName)
    return response.data.items
  }
)
export const BookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    getSearchInput: (state, action) => {
      state.searchInput = action.payload
    },
    unsetFirstLoad: (state) => {
      state.firstLoad = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBooks.pending, (state) => {
        state.loading = true
        state.error = false
        state.fetchedBooks = []
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.loading = false
        state.fetchedBooks = action.payload
        state.error = false
      })
      .addCase(searchBooks.rejected, (state) => {
        state.fetchedBooks = []
        state.loading = false
        state.error = true
      })
  },
})
export const { getSearchInput, unsetFirstLoad } = BookSlice.actions
export const selectBook = (state: RootState) => state.book

export default BookSlice.reducer
