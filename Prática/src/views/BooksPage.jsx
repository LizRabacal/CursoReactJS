import Book from '../components/Book.jsx';
import Header from '../components/Header.jsx';
import { useSelector } from 'react-redux';
import { selectBooks, selectStatus } from '../store/booksSlice.js';
import { doc, getDocFromCache } from "firebase/firestore";
import { db } from '../firebase/config.js';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { selectUsers } from '../store/usersSlice.js';
import { useDispatch } from 'react-redux';
import { fetchBooks } from '../store/booksSlice.js';


function BooksPage() {

  const dispatch = useDispatch();


  const pageTitle = "📖 Book List with Router, Redux & Firebase";

  const books = useSelector(selectBooks).books;
  const bookStatus = useSelector(selectBooks).status;







  return (
    <>
      <div className="container">
        <Header pageTitle={pageTitle} />
        <div className="books-container">
          <div className="books-list">

            {bookStatus == 'loading' ? <h2>Loading...</h2> : (

              books && books.map(book =>

                <Book key={book.id} book={book} />

              )
            )


            }

          </div>
        </div>
      </div>
    </>
  )
}

export default BooksPage
