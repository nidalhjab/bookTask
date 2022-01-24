import { Link } from 'react-router-dom'
import { useGetBookFromUrl } from '../../hooks/useGetBookFromUrl'
import './BookInfo.css'
const BookInfo = () => {
  const { book, loading, error } = useGetBookFromUrl()

  return (
    <>
      <Link to={'/bookTask'}>Home</Link>
      {/* 
      <h2>The Details about {book?.book.volumeInfo.title}</h2>
      {loading && <div className="loader"></div>}
      {error ? (
        <h2>The book id is unavailable</h2>
      ) : (
        <div className="info">
          <div className="description">
            <p>
              <strong>Book Title : </strong>
              {book?.book.volumeInfo.title}
            </p>
            {book?.book.volumeInfo.subtitle && (
              <p>
                <strong>Book SubTitle : </strong>
                {book.book.volumeInfo.subtitle}
              </p>
            )}
            <p>
              <strong>Book Description : </strong>
              {book?.book.volumeInfo.description}
            </p>
            <p>
              <strong>Book Puplished Date : </strong>Published in{' '}
              {book?.book.volumeInfo.publishedDate}
            </p>
            {book?.book.volumeInfo.publisher && (
              <p>
                <strong>Published BY : </strong>
                {book?.book.volumeInfo.publisher}
              </p>
            )}
          </div>
          <div className="images">
            <div className="book-img">
              <img src={book?.book.volumeInfo.imageLinks.thumbnail} />
            </div>
          </div>
        </div>
      )} */}
    </>
  )
}
export default BookInfo
