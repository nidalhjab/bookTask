import { SyntheticEvent, useEffect, useState } from 'react'
import './BooksQuery.css'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../redux/hook'
import {
  searchBooks,
  unsetFirstLoad,
  getSearchInput,
  selectBook,
} from '../../redux/BookSlice'
const BooksQuery = () => {
  const dispatch = useAppDispatch()
  const { firstLoad, searchInput, fetchedBooks, loading, error } =
    useAppSelector(selectBook)
  const [bookName, setBookName] = useState<string>(searchInput)
  useEffect(() => {
    if (firstLoad) {
      dispatch(searchBooks(bookName))
      dispatch(unsetFirstLoad())
    }
  }, [])
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(getSearchInput(bookName))
    dispatch(searchBooks(bookName))
  }
  let content
  if (loading) {
    content = <div className="loader"></div>
  }
  if (error) {
    content = <div className="error">Error,please try again</div>
  }
  if (!loading && !error) {
    content = (
      <div className="books">
        {fetchedBooks?.map((book) => (
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
                  Author{book.volumeInfo.authors?.length > 1 && 's'}
                </strong>
                :{book.volumeInfo.authors?.join(', ')}
              </div>
              <div className="book-puplishedYear">
                <div className="id">{book.volumeInfo.publishedDate}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )
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
      {content}
    </>
  )
}
export default BooksQuery
