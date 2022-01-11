import axios from "axios";
import { useState } from "react";
type book = {
  id: number;
  title: string;
  author: string;
  year: string;
};
type allBooks = {
  books: book[];
};
const BooksQuery = () => {
  const [book, setBooks] = useState("");
  const [list, setList] = useState<allBooks>({ books: [] });
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
    <div className="search-bar">
      <p>Search the book by start tapping here ⏬</p>
      <input
        value={book}
        onChange={(e) => {
          setBooks(e.target.value);
        }}
      />
      <button onClick={submit}>FIND</button>

      <div className="list">
        {list.books.length ? (
          <p>
            {list.books.map((data) => (
              <span>{data.title}</span>
            ))}
          </p>
        ) : (
          <p>NO</p>
        )}
      </div>
    </div>
  );
};
export default BooksQuery;
