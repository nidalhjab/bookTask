import { useState } from "react";
import Card from "@mui/material/Card";
import { v4 as uuidv4 } from "uuid";
import "./books.css";
import { CardContent, Typography } from "@mui/material";
import BookObject from "../types/book";
import AllBooks from "../types/allBooks";
import ResponseObject from "../types/respBooks";
const BooksQuery = () => {
  const [book, setBooks] = useState("");
  const [list, setList] = useState<AllBooks>({ books: [] });
  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!book) {
      alert("Please enter a book name");
    } else {
      getData().then((data) => {
        setList(setBooksModel(data.items));
      });
    }
  };
  const getData = async () => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${book}`
    );
    const data = response.json();
    return data;
  };
  const setBooksModel = (data: ResponseObject[]) => {
    let books: AllBooks = { books: [] };
    data.map((book: ResponseObject) => {
      let tempBook: BookObject = {
        id: book.id,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors,
        year: book.volumeInfo.publishedDate,
      };
      books.books.push(tempBook);
    });

    return books;
  };
  return (
    <>
      <div className="search-bar">
        <input
          value={book}
          onChange={(e) => {
            setBooks(e.target.value);
          }}
        />
        <button onClick={submit}>FIND</button>
      </div>
      <div className="books">
        {list.books.map((book: BookObject) => (
          <div key={book.id} className="card-list">
            <Card>
              <CardContent>{book.title}</CardContent>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {book.author.map((auth) => (
                  <p key={uuidv4()}>{auth}</p>
                ))}
              </Typography>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};
export default BooksQuery;
