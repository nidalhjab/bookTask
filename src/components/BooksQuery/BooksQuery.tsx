/* eslint-disable prefer-const */
import { SyntheticEvent, useEffect, useState } from 'react'
import './BooksQuery.css'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../redux/hook'
import { GoogleBooks, selectCachedData } from '../../redux/BookSlice'
import { BooksApiResponse } from '../../types/GoogleBooks'
const BooksQuery = () => {
  const [bookName, setBookName] = useState<string>('')
  const { searchInput, FetchedBooks, loading, error } =
    useAppSelector(selectCachedData)
  const dispatch = useAppDispatch()
  const [bookList, setBooks] = useState<BooksApiResponse[]>()
  useEffect(() => {
    const setData = async () => {
      try {
        if (!searchInput) {
          const data = await dispatch(GoogleBooks('react'))
          setBooks(data.payload as any)
        } else {
          setBooks(FetchedBooks)
        }
      } catch {
        console.log('data')
      }
    }
    setData()
  }, [])
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const data = await dispatch(GoogleBooks(bookName))
    setBooks(data.payload as any)
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
        {bookList?.map((book) => (
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
            value={bookName ? bookName : searchInput}
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
