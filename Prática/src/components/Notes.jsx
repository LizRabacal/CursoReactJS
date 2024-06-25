
import { useSelector, useDispatch } from 'react-redux';
import { selectNotes, eraseNote, addNote } from '../store/notesSlice.js';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, deleteDoc, setDoc, addDoc } from "firebase/firestore";
import { db } from '../firebase/config.js';
import { doc, updateDoc } from "firebase/firestore";


function Notes({ bookId }) {
  const [notes, setNotes] = useState([])
  const [fetchStatus, setFetchStatus] = useState("idle");

  const handleEraseNote = async(id) => {
    if (confirm("Are you sure you wanna erase this note?")) {

      await deleteDoc(doc(db, "notes", id));
      setNotes(notes.filter(n => n.id != id));

    try{

    }catch(e){
      alert("Error deleting note: " + e)

    }
    }
  }

  const handleAddNote = async (e) => {
    e.preventDefault();

    const newNote = {
      book_id: bookId,
      title: document.querySelector('input[name=title]').value,
      text: document.querySelector('textarea[name=note]').value
    }
    if (newNote.title && newNote.text) {
      const docRef = await addDoc(collection(db, "notes"), newNote);
      newNote.id = docRef.id;
      setNotes([...notes, newNote])
      
      
      

      document.querySelector('input[name=title]').value = "";
      document.querySelector('textarea[name=note]').value = "";
    } else {
      alert('Please fill the mandatory fields.');
    }

  }




  const fetchNotes = async (book_id) => {

    try {

      const q = query(collection(db, "notes"), where("book_id", "==", book_id));

      let notesList = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        notesList.push({ ...doc.data(), id: doc.id });
      });

      setNotes(notesList);

      setFetchStatus("success");
    } catch (err) {
      console.log('error', err);
      setFetchStatus("error");
    }
  }



  useEffect(() => {
    if (fetchStatus == 'idle') {
      fetchNotes(bookId);
    }

  }, []);

  /*     const notes = useSelector(selectNotes).filter(note => note.book_id == bookId);
   */
  return (
    <>

      <div className="notes-wrapper">

        <h2>Reader's Notes</h2>

        {notes.length ?

          <div className="notes">
            {notes.map(note =>
              <div key={note.id} className="note">
                <div onClick={() => handleEraseNote(note.id)} className="erase-note">Erase note</div>
                <h3>{note.title}</h3>
                <p>{note.text}</p>
              </div>
            )}
          </div>

          : fetchStatus == 'success' ?

            <div>
              <p>Book not found. Click the button above to go back to the list of books.</p>
            </div>

            : fetchStatus == 'error' ?

              <div>
                <p>Error fetching the notes.</p>
              </div> :

              <div>
                <p>Loading...</p>
              </div>

        }


        <details>
          <summary>Add a note</summary>
          <form className="add-note">
            <div className="form-control">
              <label>Title *</label>
              <input type="text" name="title" placeholder="Add a note title" />
            </div>
            <div className="form-control">
              <label>Note *</label>
              <textarea type="text" name="note" placeholder="Add note" />
            </div>

            <button onClick={(e) => { handleAddNote(e) }} className="btn btn-block">Add Note</button>
          </form>
        </details>

      </div>

    </>
  )
}

export default Notes
