import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Home from "../../src/screens/home";
import AddNote from "../../src/screens/addNote";
import EditNote from "../../src/screens/editNote";

const CurrentPageWidget = ({
  currentPage,
  noteList,
  setCurrentPage,
  addNote,
  editNote,
  getNotById,
  note,
  deleteNote,
}) => {
  switch (currentPage) {
    case "home":
      return (
        <Home
          noteList={noteList}
          setCurrentPage={setCurrentPage}
          getNotById={getNotById}
          deleteNote={deleteNote}
        />
      );
    case "add":
      return <AddNote setCurrentPage={setCurrentPage} addNote={addNote} />;
    case "edit":
      return <EditNote setCurrentPage={setCurrentPage} editNote={editNote} note={note} />;
    default:
      return <Home />;
  }
};

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const [noteList, setNoteList] = useState([
    {
      id: 1,
      title: "Note pertama",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry",
    },
  ]);

  const [note,setNote]=useState({

  });

  const addNote = (title, desc) => {
    const id = noteList.length > 0 ? noteList[noteList.length - 1].id + 1 : 1;
    const currentNote = {
      id,
      title: title,
      desc: desc,
    };
  
    setNoteList([
      ...noteList, currentNote
    ]);
  };

  const editNote = (id, title, desc) => {
    const note = noteList.find((note) => note.id === id);

    note.title = title;
    note.desc = desc;

    const filterNote = noteList.filter((note) => note.id !== id);

    setNoteList([...filterNote, note]);
  };

  const getNotById = (id) => {
    setNote(noteList.find((note) => note.id === id));
  };

  const deleteNote = (id) => {
    const filterNote = noteList.filter((note) => note.id !== id);
    setNoteList(filterNote);
  }


  return (
    <CurrentPageWidget
      currentPage={currentPage}
      noteList={noteList}
      setCurrentPage={setCurrentPage}
      addNote={addNote}
      editNote={editNote}
      getNotById={getNotById}
      note={note}
      deleteNote={deleteNote}
    />
  );
};

export default App;
