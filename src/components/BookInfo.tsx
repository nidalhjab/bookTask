import { Link, useParams } from 'react-router-dom'
import { useGetBookFromUrl } from '../hooks/useGetBookFromUrl'
import './BookInfo.css'
const BookInfo = () => {
  const parameter = useParams()
  const bookId = `${parameter.number}`
  const [{ bookInfo, loading, error }] = useGetBookFromUrl(bookId)
  return (
    <>
      <Link to={'/bookTask'}>Home</Link>
      <h2>The Details about {bookInfo?.title}</h2>
      {loading && <div className="loader"></div>}
      {error ? (
        <h2>The book id is unavailable</h2>
      ) : (
        <div className="info">
          <div className="description">
            <p>
              <strong>Book Title : </strong>
              {bookInfo?.title}
            </p>
            {bookInfo?.subtitle && (
              <p>
                <strong>Book SubTitle : </strong>
                {bookInfo.subtitle}
              </p>
            )}
            <p>
              <strong>Book Description : </strong>
              {bookInfo?.description}
            </p>
            <p>
              <strong>Book Puplished Date : </strong>Published in{' '}
              {bookInfo?.publishedDate}
            </p>
            {bookInfo?.publisher && (
              <p>
                <strong>Published BY : </strong>
                {bookInfo?.publisher}
              </p>
            )}
          </div>
          <div className="images">
            <div className="book-img">
              <img src={bookInfo?.imageLinks.thumbnail} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default BookInfo
