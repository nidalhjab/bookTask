import { Link, useParams } from 'react-router-dom'
import { useGoogleBooksApi } from '../hooks/useGoogleApi'
import './BookInfo.css'
const BookInfo = () => {
  const param = useParams()

  const [{ info, isLoading, isError }] = useGoogleBooksApi(`${param.id}`)

  return (
    <>
      <Link to={'/bookTask'}>Home</Link>

      <h2>The Details about {info?.volumeInfo.title}</h2>
      {isLoading && <div className="loader"></div>}
      {isError ? (
        <h2>The book id is unavailable</h2>
      ) : (
        <div className="info">
          <div className="description">
            <p>
              <strong>Book Title : </strong>
              {info?.volumeInfo.title}
            </p>
            {info?.volumeInfo.subtitle && (
              <p>
                <strong>Book SubTitle : </strong>
                {info.volumeInfo.subtitle}
              </p>
            )}
            <p>
              <strong>Book Description : </strong>
              {info?.volumeInfo.description}
            </p>
            <p>
              <strong>Book Puplished Date : </strong>Published in{' '}
              {info?.volumeInfo.publishedDate}
            </p>
            {info?.volumeInfo.publisher && (
              <p>
                <strong>Published BY : </strong>
                {info?.volumeInfo.publisher}
              </p>
            )}
          </div>
          <div className="images">
            <div className="book-img">
              <img src={info?.volumeInfo.imageLinks.thumbnail} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default BookInfo
