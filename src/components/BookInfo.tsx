import { Link, useLocation } from 'react-router-dom'
import './BookInfo.css'
const BookInfo = () => {
  const location = useLocation()
  const info: any = location.state
  console.log(info)
  return (
    <>
      <Link to={'/bookTask'}>Home</Link>
      <h2>The Details about {info.volumeInfo.title}</h2>
      <div className="info">
        <div className="description">
          <p>
            <strong>Book Title : </strong>
            {info.volumeInfo.title}
          </p>
          {info.subtitle && (
            <p>
              <strong>Book SubTitle : </strong>
              {info.volumeInfo.subtitle}
            </p>
          )}
          <p>
            <strong>Book Description : </strong>
            {info.volumeInfo.description}
          </p>
          <p>
            <strong>Book Puplished Date : </strong>Published in{' '}
            {info.volumeInfo.publishedDate}
          </p>
          {info.publisher && (
            <p>
              <strong>Published BY : </strong>
              {info.volumeInfo.publisher}
            </p>
          )}
        </div>
        <div className="images">
          <div className="book-img">
            <img src={info.volumeInfo.imageLinks.thumbnail} />
          </div>
        </div>
      </div>
    </>
  )
}
export default BookInfo
