import axios from 'axios'
export const GoogleBook = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1',
})
