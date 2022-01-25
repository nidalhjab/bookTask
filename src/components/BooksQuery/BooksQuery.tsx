import { SyntheticEvent, useState } from 'react'
import './BooksQuery.css'
import { Link } from 'react-router-dom'
import { useGetBooks } from '../../hooks/useGetBooks'
import { useAppSelector, useAppDispatch } from '../../redux/hook'
import { search, selectSearch } from '../../redux/BookSlice'
const BooksQuery = () => {
  const [bookName, setBookName] = useState<string>('')
  const cachedInput = useAppSelector(selectSearch)
  const { books, loading, error, searchBooks } = useGetBooks(
    cachedInput ? cachedInput : 'react'
  )
  const dispatch = useAppDispatch()
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    bookName ? searchBooks(bookName) : alert('Please insert book name')
    dispatch(search({ searchInput: bookName, fetchedBooks: books }))
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
        {books?.map(({ id, volumeInfo }) => (
          <Link key={id} to={`/book/${id}`}>
            <div className="books-list">
              <div className="book-title">
                <div className="id">
                  <strong>Title :</strong>
                </div>
                <div className="info">{volumeInfo.title}</div>
              </div>
              <div className="book-authors">
                <strong>Author{volumeInfo.authors?.length > 1 && 's'}</strong>:
                {volumeInfo.authors?.join(', ')}
              </div>
              <div className="book-puplishedYear">
                <div className="id">{volumeInfo.publishedDate}</div>
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
            value={cachedInput ? cachedInput : bookName}
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