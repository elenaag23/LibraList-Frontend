import React, { useState, useEffect } from "react";
import "./App.css"; // Assuming this is your custom CSS file
import "./HomePage.css"; // Assuming this is another custom CSS file
import Sidebar from "./Sidebar";

import { Menu } from "@mui/icons-material";
import { getAuth, currentUser, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, push, onValue } from "firebase/database";
import BookComponent from "./BookComponent";

function ToRead() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [bookData, setBookData] = useState(null);
  const [search, setSearch] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [addedBook, setAddedBook] = useState(false);
  const auth = getAuth();
  const db = getDatabase();
  const [userBooks, setUserBooks] = useState([]);

  const addBook = async (title, author, description, cover) => {
    try {
      var uid = currentUser.uid;

      if (!uid) {
        throw new Error("User is not authenticated.");
      }

      // Reference to the user's 'books' node
      const userBooksRef = ref(db, `users/${uid}/books`);

      // Push a new book object to the user's 'books' node
      const newBookRef = push(userBooksRef, {
        title: title,
        author: author,
        description: description,
        cover: cover,
      });
      setAddedBook(true);
      console.log("New book added with key: ", newBookRef.key);
    } catch (error) {
      console.error("Error adding book: ", error);
    }
  };

  const process = (data) => {
    for (var book of data["items"]) {
      if (
        book["volumeInfo"]["language"] == "en" &&
        book["volumeInfo"]["imageLinks"] != undefined
      ) {
        console.log("carte buna: ", book);
        var title = book["volumeInfo"]["title"];
        var author = book["volumeInfo"]["authors"][0];
        var description = book["volumeInfo"]["description"];
        var cover = book["volumeInfo"]["imageLinks"]["thumbnail"];
        setBookData({ title, author, description, cover });

        const bookExists = userBooks.some((userBook) => {
          return userBook.title === title && userBook.author === author;
        });

        if (bookExists) {
          console.log("Book already exists in the user's database");
          setAddedBook(true);
        } else {
          setAddedBook(false);
          console.log("Book does not exist in the user's database");
        }
        break;
      }
    }
  };

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setCurrentUser(user);
        console.log("current user: ", user);

        var uid = user.uid;
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
      } else {
        // No user is signed in
        setCurrentUser(null);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      searchTerm
    )}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
        setSearch(true);
        console.log("raspuns: ", data); // Log the response to see what data is returned
        process(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ zIndex: "-1" }}>
        <Sidebar />
      </div>

      <div className="pageTitle">
        <span>ReadList</span>
      </div>

      <div className="mysearchbar">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group mb-4 border" style={{ width: "500px" }}>
            <input
              type="search"
              placeholder="Search for a book"
              aria-describedby="button-addon4"
              className="form-control bg-none border-0"
              value={searchTerm || ""}
              onChange={handleInputChange}
            ></input>
            <div
              className="input-group-prepend border-0"
              style={{
                marginLeft: "5px",
                marginBottom: "5px",
                marginRight: "5px",
              }}
            >
              <button
                id="button-addon4"
                type="button"
                className="searchbtn"
                onClick={handleSearch}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </form>
      </div>

      {search && (
        <div className="displayBook">
          <div style={{ width: "70%" }} className="book">
            {bookData && (
              <BookComponent
                title={bookData.title}
                author={bookData.author}
                description={bookData.description}
                cover={bookData.cover}
                addedBook={addedBook}
                addBook={addBook}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ToRead;
