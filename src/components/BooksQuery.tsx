import { SyntheticEvent, useState } from "react";
import "./books.css";
import { useGoogleBooksApi } from "../hooks/useGoogleApi";
const BooksQuery = () => {
  const [book, setBooks] = useState("");
  const [{ response, isLoading, isError }, searchBooks] =
    useGoogleBooksApi(book);
  let loading = isLoading;

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    loading = true;
    book ? searchBooks(book) : alert("Please insert book name");
    loading = false;
  };

  return (
    <>
      <div className="search-bar">
        <form onSubmit={submit}>
          <input
            type="text"
            value={book}
            onChange={(e) => {
              setBooks(e.target.value);
            }}
          />
          <button type="submit">FIND</button>
        </form>
      </div>
      {loading ? <div className="loader"></div> : null}
      {isError ? <div className="error">Error occured</div> : null}
      <div className="books">
        {response?.map((book) => (
          <div key={book.id} className="books-list">
            <div className="book-title">
              <div className="id">
                <strong>Title :</strong>
              </div>
              <div className="info">{book.volumeInfo.title}</div>
            </div>

            {book.volumeInfo.authors?.map((auth) => (
              <div key={auth} className="book-authors">
                <div className="id">
                  <strong>Authors :</strong>
                </div>
                <div className="info">{auth}</div>
              </div>
            ))}
            <div className="book-puplishedYead">
              <div className="id">
                <strong>Puplished in </strong>
              </div>
              <div className="info">{book.volumeInfo.publishedDate}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default BooksQuery;
