import "./App.css";
import { useTheme } from "@mui/material";
import "./HomePage.css";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

function Library() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://openlibrary.org/search.json?q=the+lord+of+the+rings"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
        console.log("date: ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Import all photos from the photos folder dynamically
  const photos = [];
  const photoContext = require.context("./books", false, /\.(png|jpe?g|svg)$/);
  photoContext.keys().forEach((key) => {
    console.log("key: ", key);
    console.log("photocontext: ", photoContext(key));
    console.log("photocontext def: ", photoContext(key).default);
    photos.push(photoContext(key));
  });

  console.log("photos: ", photoContext);

  // Component to render a single photo
  const PhotoItem = ({ src }) => (
    <div className="col" id="mycell">
      <img src={src} alt="Photo" />
      <div className="bookName">
        <span>Title</span>
      </div>
    </div>
  );

  // Component to render a row of photos (3 columns)
  const PhotoRow = ({ photos }) => (
    <div className="row">
      {photos.map((photo, index) => (
        <PhotoItem key={index} src={photo} />
      ))}
    </div>
  );

  // Component to render all photos in a grid layout
  const PhotoGrid = ({ photos }) => {
    // Split photos into groups of three for each row
    const rows = [];
    for (let i = 0; i < photos.length; i += 3) {
      rows.push(photos.slice(i, i + 3));
    }

    return (
      <div style={{ margin: "16px" }}>
        {rows.map((row, index) => (
          <PhotoRow key={index} photos={row} />
        ))}
      </div>
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <Sidebar />
      {/* <div sx={{ display: "block" }}>my Library</div> */}
      <div className="pageTitle">
        <span>My Library</span>
      </div>

      <PhotoGrid photos={photos} />

      {/* <div>
        <img src={require("./books/images (1).jpg")}></img>
      </div> */}
    </div>
  );
}

export default Library;
