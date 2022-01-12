import axios from "axios";

export const GoogleBooks = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
});
