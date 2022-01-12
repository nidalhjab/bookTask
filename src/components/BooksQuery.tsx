import { useState } from "react";
import Card from "@mui/material/Card";
import { v4 as uuidv4 } from "uuid";
import "./books.css";
import { CardContent, Typography } from "@mui/material";
import { Book } from "../types/book";
import { AllBooks } from "../types/allBooks";
import { ResponseBook, Items } from "../types/respBooks";
import { GoogleBooks } from "./API/GoogleBooks";
const BooksQuery = () => {
  const [book, setBooks] = useState("");
  const [list, setList] = useState<AllBooks>({ books: [] });
  const generateId = () => {
    const temp = uuidv4();
    return temp;
  };
  const submit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!book) {
      alert("Please enter a book name");
    } else {
      await getData().then((data) => {
        setList(setBooksModel(data));
      });
    }
  };
  const getData = async () => {
    const response = await GoogleBooks.get<ResponseBook>("/volumes", {
      params: {
        q: book,
      },
    });
    return response.data.items;
  };
  const setBooksModel = (data: Items[]) => {
    let books: AllBooks = { books: [] };
    data.map((book: Items) => {
      let tempBook: Book = {
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
        {list.books.map((book) => (
          <div key={book.id} className="card-list">
            <Card>
              <CardContent>
                <strong>Title :</strong>
                {book.title}
              </CardContent>
              <Typography color="text.secondary">
                {book.author?.map((auth) => (
                  <p key={generateId()}>authors :{auth}</p>
                ))}
              </Typography>
              <Typography>
                <strong>Published in </strong>
                {book.year}
              </Typography>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};
export default BooksQuery;
