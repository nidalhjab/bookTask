import axios from "axios";
import { useState } from "react";
import Card from "@mui/material/Card";
import "./books.css";
import { CardContent, Typography } from "@mui/material";
type book = {
  id: number;
  title: string;
  author: string;
  year: string;
};
const BooksQuery = () => {
  const [book, setBooks] = useState("");
  const [list, setList] = useState([]);
  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!book) {
      alert("Please enter a book name");
    } else {
      getData();
    }
    console.log(list);
  };
  const getData = () => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${book}`)
      .then((data) => {
        setList(setBooksModel(data.data.items));
      });
  };

  const setBooksModel = (data: any) => {
    const bookDetails = data.map((book: any) => {
      return {
        id: Math.random() * 10,
        title: book.volumeInfo.title,
        author: { ...book.volumeInfo.authors },
        year: book.volumeInfo.publishedDate,
      };
    });

    return bookDetails;
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
        {list.map((book: book) => (
          <div key={book.id} className="card-list">
            <Card>
              <CardContent>{book.title}</CardContent>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {book.author[0]}
                <p> pupblished in {book.year}</p>
              </Typography>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};
export default BooksQuery;
