import "./App.css";
import { useTheme } from "@mui/material";
import "./HomePage.css";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CompressOutlined } from "@mui/icons-material";

function Library() {
  const [data, setData] = useState(null);
  const [userBooks, setUserBooks] = useState([]);
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get the UID of the authenticated user
          const uid = user.uid;

          console.log("current user: ", user);

          // Reference to the user's 'books' node
          const userBooksRef = ref(db, `users/${uid}/books`);

          // Fetch user's books from the database
          onValue(userBooksRef, (snapshot) => {
            const booksData = snapshot.val();
            if (booksData) {
              // Convert the object of books into an array
              const booksArray = Object.keys(booksData).map((key) => ({
                id: key,
                ...booksData[key],
              }));
              setUserBooks(booksArray);
            } else {
              setUserBooks([]);
            }
          });
        } catch (error) {
          console.error("Error fetching user books:", error);
        }
      } else {
        setUserBooks([]);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [auth, db]);

  const BookItem = ({ book, index }) => (
    <div className={index % 3 === 2 ? "col" : "col-4"} id="mycell">
      <div className="bookItemWrapper">
        <img src={book.cover} alt="Book Cover" className="bookImage" />
        <div className="bookName">
          <span>{book.title}</span>
        </div>
      </div>
    </div>
  );

  // Component to render a row of books (3 columns)
  const BookRow = ({ books }) => (
    <div className="row">
      {books.map((book, index) => (
        <BookItem key={index} book={book} index={index} />
      ))}
    </div>
  );

  // Component to render all books in a grid layout
  const BookGrid = ({ books }) => {
    console.log("books in book grid: ", books);
    console.log("user books: ", userBooks);
    // Split books into groups of three for each row
    const rows = [];
    for (let i = 0; i < books.length; i += 3) {
      rows.push(books.slice(i, i + 3));
    }

    return (
      <div style={{ margin: "16px" }}>
        {rows.map((row, index) => (
          <BookRow key={index} books={row} />
        ))}
      </div>
    );
  };

  console.log("books array: ", userBooks);

  return (
    <div style={{ width: "100%" }}>
      <Sidebar />
      {/* <div sx={{ display: "block" }}>my Library</div> */}
      <div className="pageTitle">
        <span>My Library</span>
      </div>

      <BookGrid books={userBooks} />
    </div>
  );
}

export default Library;
