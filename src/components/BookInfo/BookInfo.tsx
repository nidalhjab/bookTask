import { Link } from 'react-router-dom'
import { useGetBookFromUrl } from '../../hooks/useGetBookFromUrl'
import { VolumeInfo } from '../../types/GoogleBooks'
import './BookInfo.css'
const BookInfo = () => {
  const { book = {} as VolumeInfo, loading, error } = useGetBookFromUrl()
  const { title, subtitle, description, publishedDate, publisher, imageLinks } =
    book
  return (
    <>
      <Link to={'/bookTask'}>Home</Link>

      <h2>The Details about {title}</h2>

      {loading ? (
        <div className="loader"></div>
      ) : (
        [
          error ? (
            <h2>Error, please try agian</h2>
          ) : (
            <div className="info">
              <div className="description">
                <p>
                  <strong>Book Title : </strong>
                  {title}
                </p>
                {subtitle && (
                  <p>
                    <strong>Book SubTitle : </strong>
                    {subtitle}
                  </p>
                )}
                {description && (
                  <p>
                    <strong>Book Description : </strong>
                    {description}
                  </p>
                )}
                {publishedDate && (
                  <p>
                    <strong>Book Puplished Date : </strong>Published in{' '}
                    {publishedDate}
                  </p>
                )}

                {publisher && (
                  <p>
                    <strong>Published BY : </strong>
                    {publisher}
                  </p>
                )}
              </div>
              <div className="images">
                <div className="book-img">
                  <img src={imageLinks?.thumbnail} />
                </div>
              </div>
            </div>
          ),
        ]
      )}
    </>
  )
}
export default BookInfo
