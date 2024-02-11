import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getDatabase,
  ref,
  onValue,
  push,
  remove,
  get,
} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import BookComponent from "./BookComponent";
import Sidebar from "./Sidebar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const BookDetailsPage = () => {
  const { bookId } = useParams();
  const auth = getAuth();
  const db = getDatabase();
  const [book, setBook] = useState("");
  const [inputText, setInputText] = useState("");
  const [displayedTexts, setDisplayedTexts] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const displayInput = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const commentsRef = ref(
          db,
          `users/${user.uid}/books/${bookId}/comments`
        );
        await push(commentsRef, inputText);
        setInputText("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const deleteInput = async (index) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const commentsRef = ref(
          db,
          `users/${user.uid}/books/${bookId}/comments`
        );
        const snapshot = await get(commentsRef);

        if (snapshot.exists()) {
          const commentsData = snapshot.val();
          const commentKeys = Object.keys(commentsData);

          if (index >= 0 && index < commentKeys.length) {
            const commentKey = commentKeys[index];

            const commentToDeleteRef = ref(
              db,
              `users/${user.uid}/books/${bookId}/comments/${commentKey}`
            );
            await remove(commentToDeleteRef, null);
          } else {
            console.error("Index out of bounds");
          }
        } else {
          console.error("Snapshot does not contain valid data");
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const uid = user.uid;
          const userBooksRef = ref(db, `users/${uid}/books/${bookId}`);
          onValue(userBooksRef, (snapshot) => {
            const booksData = snapshot.val();
            if (booksData) {
              setBook(booksData);
            } else {
              setBook("");
            }
          });

          const commentsRef = ref(db, `users/${uid}/books/${bookId}/comments`);

          onValue(commentsRef, (snapshot) => {
            const comments = snapshot.val();
            if (comments) {
              const commentsArray = Object.values(comments);
              setDisplayedTexts(commentsArray);
              console.log("comments array: ", commentsArray);
            } else {
              setDisplayedTexts([]);
            }
          });
        } catch (error) {
          console.error("Error fetching user books:", error);
        }
      } else {
        setBook("");
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  return (
    <div style={{ width: "100%" }}>
      <Sidebar />
      <div style={{ marginTop: "120px", marginLeft: "16px" }} className="row">
        <div className="col-6">
          <div className="book">
            <BookComponent
              title={book.title}
              author={book.author}
              description={book.description}
              cover={book.cover}
              addedBook={true}
              addBook={null}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="book">
            <div className="bookComm">Book Comments</div>
            <div className="input-group">
              <textarea
                class="form-control"
                rows="3"
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Write your thoughts"
                style={{
                  marginTop: "30px",
                  marginBottom: "50px",
                  marginLeft: "20px",
                  width: "60%",
                  height: "auto",
                  borderRadius: "5px",
                  borderColor: "#6d7fcc",
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              />
              <button
                onClick={displayInput}
                className="addButton"
                style={{
                  marginLeft: "8px",
                  borderRadius: "5px",
                  fontWeight: "500",
                }}
              >
                Add
              </button>
              <div
                id="displayArea"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                {displayedTexts.map((text, index) => (
                  <div style={{ display: "flex" }}>
                    <p key={index} style={{ margin: "12px", width: "90%" }}>
                      {text}
                    </p>
                    <button
                      className="trashIcon"
                      onClick={() => deleteInput(index)}
                    >
                      <DeleteOutlineIcon></DeleteOutlineIcon>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
