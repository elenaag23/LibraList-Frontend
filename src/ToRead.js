import React, { useState, useEffect } from "react";
import "./App.css"; // Assuming this is your custom CSS file
import "./HomePage.css"; // Assuming this is another custom CSS file
import Sidebar from "./Sidebar";

function ToRead() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [bookData, setBookData] = useState(null);
  const [search, setSearch] = useState(false);

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
        break;
      }
    }
  };

  const BookComponent = ({ title, author, description, cover }) => {
    return (
      <div>
        <img src={cover} alt="Book Cover" />
        <div className="book-details" style={{ marginTop: "28px" }}>
          <h2>{title}</h2>
          <p style={{ fontSize: "20px", color: "#6d7fcc" }}>Author: {author}</p>
          <p style={{ fontSize: "20px", fontWeight: 500, color: "#6d7fcc" }}>
            {description}
          </p>
        </div>
      </div>
    );
  };

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
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ToRead;
