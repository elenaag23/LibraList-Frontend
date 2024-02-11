import "./App.css";
import "./HomePage.css";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

function Library() {
  const [userBooks, setUserBooks] = useState([]);
  const auth = getAuth();
  const db = getDatabase();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const uid = user.uid;
          const userBooksRef = ref(db, `users/${uid}/books`);

          onValue(userBooksRef, (snapshot) => {
            const booksData = snapshot.val();
            if (booksData) {
              const booksArray = Object.keys(booksData).map((key) => ({
                id: key,
                ...booksData[key],
              }));
              setUserBooks(booksArray);
              setLoading(false);
            } else {
              setUserBooks([]);
              setLoading(false);
            }
          });
        } catch (error) {
          console.error("Error fetching user books:", error);
        }
      } else {
        setUserBooks([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth, db]);

  const BookItem = ({ book, index }) => (
    <div className={index % 3 === 2 ? "col" : "col-4"} id="mycell">
      <Link to={{ pathname: `/book-details/${book.id}` }}>
        <div className="bookItemWrapper">
          <img src={book.cover} alt="Book Cover" className="bookImage" />
          <div className="bookName">
            <span>{book.title}</span>
          </div>
        </div>
      </Link>
    </div>
  );

  const BookRow = ({ books }) => (
    <div className="row">
      {books.map((book, index) => (
        <BookItem key={index} book={book} index={index} />
      ))}
    </div>
  );

  const BookGrid = ({ books }) => {
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

  return (
    <div style={{ width: "100%" }}>
      <Sidebar />
      <div className="pageTitle">
        <span>My Library</span>
      </div>

      {userBooks.length != 0 ? (
        <BookGrid books={userBooks} />
      ) : (
        !loading && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "70px",
              backgroundColor: "#a1acde",
              height: "200px",
              textAlign: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            <h4>
              No books in your library! Go to the bookshelf and search for a
              book to add to your library :)
            </h4>
          </div>
        )
      )}
    </div>
  );
}

export default Library;
