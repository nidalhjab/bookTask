import './App.css'
import BooksQuery from './components/BooksQuery'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookInfo from './components/BookInfo'
function App() {
  return (
    <div className="App">
      <h1>BOOKS LIBRARY</h1>

      <BrowserRouter>
        <Routes>
          <Route path="/bookTask" element={<BooksQuery />}></Route>
          <Route path="/book/:id" element={<BookInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
