import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GoogleBook } from '../api/GoogleBook'
import { Items, State } from '../types/GoogleBooks'
import { RootState } from './Store'
const initialState: State = {
  searchInput: '',
  loading: false,
  error: false,
  fetchedBooks: [],
}
const VOLUMES_SEAECH_PATH = '/volumes?q='
export const GoogleBooks = createAsyncThunk(
  'book/fetchBooks',
  async (initalParameter: string) => {
    const response = await GoogleBook.get<Items>(
      VOLUMES_SEAECH_PATH + initalParameter
    )
    return response.data.items
  }
)
export const BookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GoogleBooks.pending, (state) => {
        state.loading = true
        state.fetchedBooks = []
      })
      .addCase(GoogleBooks.fulfilled, (state, action) => {
        state.searchInput = action.meta.arg
        state.loading = false
        state.fetchedBooks = action.payload
      })
      .addCase(GoogleBooks.rejected, (state) => {
        state.fetchedBooks = []
        state.error = true
      })
  },
})
export const selectCachedData = (state: RootState) => {
  return {
    searchInput: state.book.searchInput,
    FetchedBooks: state.book.fetchedBooks,
    loading: state.book.loading,
    error: state.book.error,
  }
}
export default BookSlice.reducer
