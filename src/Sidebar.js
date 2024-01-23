import "./App.css";
import { useTheme } from "@mui/material";
import "./HomePage.css";
import React, { useState, useEffect } from "react";

function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [shouldShowTitle, setShouldShowTitle] = useState(true);

  const handleCollapse = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShouldShowTitle(!isSidebarOpen);
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(timeoutId);
  }, [isSidebarOpen]);

  return (
    <div className="wrapper">
      <nav id="sidebar" className={isSidebarOpen ? "" : "hidden"}>
        <div className="sidebar-header">
          <h3>LiteraList</h3>
        </div>

        <ul className="list-unstyled components">
          <li>
            <a href="#">My books</a>
          </li>

          <li>
            <a href="#">In progress</a>
          </li>

          <li>
            <a href="#">To Read</a>
          </li>
        </ul>
      </nav>

      <nav
        id="navbar2"
        className="navbar navbar-expand-lg navbar-light bg-light flex-row"
      >
        <div className="container-fluid">
          <div id="content" className={isSidebarOpen ? "" : "hidden"}>
            <div style={{ float: "inline-start" }}>
              <button
                type="button"
                id="sidebarCollapse"
                className="btn btn-info"
                onClick={handleCollapse}
              >
                <i className="bi bi-list-ul" id="listIcon"></i>
              </button>
            </div>
            <div
              className={`col-6 headerTitle ${
                isSidebarOpen ? "hidden1" : "fade-transition show"
              }`}
              sx={{ transition: "opacity 0.7s ease-in;" }}
            >
              {shouldShowTitle && <span>LibraList</span>}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
