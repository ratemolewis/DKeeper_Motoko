import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper } from "../../../declarations/dkeeper";


function App() {
  // useState([]), once the state is UpdateRounded, the function causes the APP react component to be re-rendered.
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      //ssave the note to motoko backend
      dkeeper.newNote(newNote.title, newNote.content);
      return [...prevNotes, newNote];
    });
  }
// this function is triggered every time the app react componet is rerendered
  useEffect(()=>{
    console.log("useEffect is trigered.");
   fatchData();
  }, []);

  async function fatchData(){
    // because dkeeper.readNotes() is returned asynchronously, we prepend await key-word 
    const notesArray = await dkeeper.readNotes();
    setNotes(notesArray);

  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      { (notes && Array.isArray(notes)) ? notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      }) : console.log(notes)}
      <Footer />
    </div>
  );
}

export default App;
