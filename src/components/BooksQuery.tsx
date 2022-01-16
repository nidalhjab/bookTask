import { SyntheticEvent, useState } from 'react'
import './books.css'
import { useGoogleBooksApi } from '../hooks/useGoogleApi'
const BooksQuery = () => {
  const [book, setBooks] = useState('')
  const [{ response, isLoading, isError }, searchBooks] =
    useGoogleBooksApi('react')

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    book ? searchBooks(book) : alert('Please insert book name')
  }

  return (
    <>
      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={book}
            onChange={(e) => {
              setBooks(e.target.value)
            }}
          />
          <button type="submit">FIND</button>
        </form>
      </div>
      {isLoading && <div className="loader"></div>}
      {isError && <div className="error">Error occured</div>}
      <div className="books">
        {response?.map((book) => (
          <div key={book.id} className="books-list">
            <div className="book-title">
              <div className="id">
                <strong>Title :</strong>
              </div>
              <div className="info">{book.volumeInfo.title}</div>
            </div>

            {book.volumeInfo.authors?.map((author) => (
              <p key={author} className="book-authors">
                <div className="id">
                  <strong>Authors :</strong>
                </div>
                <div className="info">{author}</div>
              </p>
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
  )
}
export default BooksQuery
