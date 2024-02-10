import React, { useState, useEffect } from "react";
import "./App.css"; // Assuming this is your custom CSS file
import "./HomePage.css"; // Assuming this is another custom CSS file
import Sidebar from "./Sidebar";

function ToRead() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const processData = (data) => {
    var book = data["docs"][0];
    var authName = book["author_name"][0];
    var bookTitle = book["title"];
    var isbns = book["isbn"];

    var apiURL = "https://covers.openlibrary.org/b/isbn/9781094015286-M.jpg";

    fetch(apiURL, { redirect: "manual" }).then((response) => {
      // Check the status code
      if (response.status >= 200 && response.status < 300) {
        // Successful response
        console.log("Initial response status code:", response.status);
        // Now you can handle the response, including checking for redirects if needed
      } else if (response.status >= 300 && response.status < 400) {
        // Redirection response
        console.log("Redirection status code:", response.status);
        // Optionally, you can handle redirection here
      } else {
        // Error response
        console.error("Error response status code:", response.status);
        // Optionally, handle error response
      }
    });

    //   .then((data) => {
    //     //setSearchResults(data);
    //     console.log(data); // Log the response to see what data is returned
    //     //processData(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });

    // for(var isbn in isbns)
    // {

    // }
  };

  const handleSearch = () => {
    const apiUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(
      searchTerm
    )}&rating=asc`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
        console.log(data); // Log the response to see what data is returned
        processData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div style={{ width: "100%" }}>
      {/* <Sidebar /> */}
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
    </div>
  );
}

export default ToRead;
