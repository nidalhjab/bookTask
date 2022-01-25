import { SyntheticEvent, useState } from 'react'
import './BooksQuery.css'
import { Link } from 'react-router-dom'
import { useGetBooks } from '../../hooks/useGetBooks'
const BooksQuery = () => {
  const [bookName, setBookName] = useState<string>('')
  const { books, loading, error, searchBooks } = useGetBooks('react')
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    bookName ? searchBooks(bookName) : alert('Please insert book name')
  }
  return (
    <>
      <h3>Search by book name ⏬</h3>
      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={bookName}
            onChange={(e) => {
              setBookName(e.target.value)
            }}
          />
          <button type="submit">FIND</button>
        </form>
      </div>
      {loading ? (
        <div className="loader"></div>
      ) : (
        [
          error ? (
            <h2>Error, please try again</h2>
          ) : (
            <div className="books">
              {books?.map(({ id, volumeInfo }) => (
                <Link key={id} to={`/book/${id}`}>
                  <div className="books-list">
                    <div className="book-title">
                      <div className="id">
                        <strong>Title :</strong>
                      </div>
                      <div className="info">{volumeInfo.title}</div>
                    </div>

                    {volumeInfo.authors?.map((author) => (
                      <div key={author} className="book-authors">
                        <div className="id">
                          <strong>Authors :</strong>
                        </div>
                        <div className="info">{author}</div>
                      </div>
                    ))}
                    <div className="book-puplishedYead">
                      <div className="id">
                        <strong>Puplished in </strong>
                      </div>
                      <div className="info">{volumeInfo.publishedDate}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ),
        ]
      )}
    </>
  )
}
export default BooksQuery
