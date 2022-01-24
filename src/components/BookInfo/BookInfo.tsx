import { Link } from 'react-router-dom'
import { useGetBookFromUrl } from '../../hooks/useGetBookFromUrl'
import './BookInfo.css'
const BookInfo = () => {
  const { book, loading, error } = useGetBookFromUrl()
  return (
    <>
      <Link to={'/bookTask'}>Home</Link>

      <h2>The Details about {book?.title}</h2>
      {loading && <div className="loader"></div>}
      {error ? (
        <h2>The book id is unavailable</h2>
      ) : (
        <div className="info">
          <div className="description">
            <p>
              <strong>Book Title : </strong>
              {book?.title}
            </p>
            {book?.subtitle && (
              <p>
                <strong>Book SubTitle : </strong>
                {book.subtitle}
              </p>
            )}
            <p>
              <strong>Book Description : </strong>
              {book?.description}
            </p>
            <p>
              <strong>Book Puplished Date : </strong>Published in{' '}
              {book?.publishedDate}
            </p>
            {book?.publisher && (
              <p>
                <strong>Published BY : </strong>
                {book?.publisher}
              </p>
            )}
          </div>
          <div className="images">
            <div className="book-img">
              <img src={book?.imageLinks.thumbnail} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default BookInfo
