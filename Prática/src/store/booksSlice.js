import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, query, where, getDocs, deleteDoc, setDoc, addDoc } from "firebase/firestore";
import { auth } from "../firebase/config";
import { db } from '../firebase/config';

import { doc, updateDoc } from "firebase/firestore";


export const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    status: 'idle'
  }
  ,
  reducers: {
    addBook: (books, action) => {
      let newBook = action.payload;
      newBook.id = books.length ? Math.max(...books.map(book => book.id)) + 1 : 1;
      books.push(newBook);
    },
    resetStatus: (status, action) =>{
      status = 'idle';
    }
    /*     eraseBook: (books, action) => {
          return books.filter(book => book.id != action.payload);
        }, */
    /*   toggleRead: (books, action) => {
        books.map(book => {
          if (book.id == action.payload) {
            book.isRead = !book.isRead;
          }
        });
      } */
  },

  //atualizar o state da variavel global de acordo c o state do 
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state, action) => {

        state.status = 'pending'

      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded"
        console.log("success")
        state.books = action.payload;

      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed"
        console.log(action.error.message)

      })
      .addCase(toggleRead.fulfilled, (state, action) => {
        state.status = "succeeded"
        console.log(action.payload)
/*         state.books.map(b => {if(b.id == action.payload) b.isRead = !b.isRead} );
 */        state.books = state.books.map(b => b.id == action.payload ? { ...b, isRead: !b.isRead } : b)


      })
      .addCase(toggleRead.rejected, (state, action) => {
        state.status = "failed"
        console.log(action.error.message)

      })
      .addCase(eraseBook.pending, (state, action) => {

        state.status = 'loading'

      })
      .addCase(eraseBook.fulfilled, (state, action) => {
        state.status = "succeeded"
        console.log(action.payload)
        state.books = state.books.filter(b => b.id != action.payload)


      })
      .addCase(eraseBook.rejected, (state, action) => {
        state.status = "failed"
        console.log(action.error.message)

      })
      .addCase(addBook.pending, (state, action) => {
        state.status = "loading"


      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.status = "succeeded"
        console.log(action.payload)
        state.books.push(action.payload)


      })
      .addCase(addBook.rejected, (state, action) => {
        state.status = "failed"
        console.log(action.error.message)

      })

  },

})

export const {resetStatus} = booksSlice.actions;

export const selectBooks = state => state.books;
export const selectStatus = state => state.status;

export default booksSlice.reducer;


//midlewares:

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const q = query(collection(db, "books"), where("user_id", "==", auth.currentUser.uid));
  const querySnapshot = await getDocs(q);
  let bookList = [];
  querySnapshot.forEach((doc) => {
    bookList.push({ id: doc.id, ...doc.data() })
  });
  return bookList;
},
)




export const toggleRead = createAsyncThunk('books/toggleRead', async (payload) => {
  const bookRef = doc(db, "books", payload.id);

  console.log(payload.id)
  await updateDoc(bookRef, {
    isRead: !payload.isRead
  });
  return payload.id;
},
)



export const eraseBook = createAsyncThunk('books/eraseBook', async (payload) => {


    await deleteDoc(doc(db, "books", payload.id));



  return payload.id;
},
)

export const addBook = createAsyncThunk('books/addBook', async (payload) => {
  const newBook = payload;
  newBook.user_id = auth.currentUser.uid;

  const docRef = await addDoc(collection(db, "books"), newBook);

  console.log("Objeto criado com o ID: " + docRef.id);
  return { ...newBook, id: docRef.id }; // Retorne o novo livro com o ID gerado pelo Firestore
});