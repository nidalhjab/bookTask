import { SyntheticEvent, useState } from 'react'
import './books.css'
import { Link } from 'react-router-dom'
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
      <h3>Search by book name ⏬</h3>
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
          <Link key={book.id} to={`/book/${book.id}`}>
            <div className="books-list">
              <div className="book-title">
                <div className="id">
                  <strong>Title :</strong>
                </div>
                <div className="info">{book.volumeInfo.title}</div>
              </div>

              <div className="book-authors">
                <strong>
                  Author{book.volumeInfo.authors.length > 1 && 's'}
                </strong>
                :{book.volumeInfo.authors.join(', ')}
              </div>
              <div className="book-puplishedYead">
                <div className="id"></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
export default BooksQuery
