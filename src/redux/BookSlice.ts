import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GoogleBook } from '../api/GoogleBook'
import { Items } from '../types/GoogleBooks'
import { State } from '../types/ReduxState'
import { RootState } from './Store'
const initialState: State = {
  searchInput: 'react',
  loading: false,
  error: false,
  fetchedBooks: [],
}
const VOLUMES_SEAECH_PATH = '/volumes?q='
export const searchBooks = createAsyncThunk(
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
  reducers: {
    getSearchInput: (state, action) => {
      state.searchInput = action.payload
    },
    unsetFirstLoad: (state) => {
      state.fetchedBooks = []
      state.searchInput = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBooks.pending, (state) => {
        state.loading = true
        state.fetchedBooks = []
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.loading = false
        state.fetchedBooks = action.payload
      })
      .addCase(searchBooks.rejected, (state) => {
        state.fetchedBooks = []
        state.error = true
      })
  },
})
export const { getSearchInput, unsetFirstLoad } = BookSlice.actions
export const selectBook = (state: RootState) => {
  return {
    searchInput: state.book.searchInput,
    fetchedBooks: state.book.fetchedBooks,
    loading: state.book.loading,
    error: state.book.error,
  }
}
export const firstLoad = (state: RootState) => {
  if (state.book.searchInput === 'react') return true
  else return false
}
export default BookSlice.reducer
