import { Link } from 'react-router-dom'
import { useGetBookFromUrl } from '../../hooks/useGetBookFromUrl'
import { VolumeInfo } from '../../types/GoogleBooks'
import './BookInfo.css'
const BookInfo = () => {
  const { book = {} as VolumeInfo, loading, error } = useGetBookFromUrl()
  const { title, subtitle, description, publishedDate, publisher, imageLinks } =
    book
  let content
  if (loading) {
    content = <div className="loader"></div>
  }
  if (error) {
    content = <div className="error">Error,Try agian</div>
  }
  if (!loading && !error) {
    content = (
      <div className="container">
        <h2>The Details about {title}</h2>
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
      </div>
    )
  }
  return (
    <>
      <Link to={'/bookTask'}>Home</Link>
      {content}
    </>
  )
}
export default BookInfo
