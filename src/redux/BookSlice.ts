import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { State } from '../types/GoogleBooks'
import { RootState } from './Store'
const initialState: State = {
  searchInput: '',
  fetchedBooks: [],
}
export const BookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    search: (state, action: PayloadAction<State>) => {
      state.searchInput = action.payload.searchInput
      state.fetchedBooks = action.payload.fetchedBooks
    },
  },
})
export const { search } = BookSlice.actions
export const selectSearch = (state: RootState) => state.book.searchInput
export const selectBooks = (state: RootState) => state.book.fetchedBooks
export default BookSlice.reducer
