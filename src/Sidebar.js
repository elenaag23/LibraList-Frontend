import React, { useState, useEffect } from "react";
import "./App.css";
import "./HomePage.css";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import LogoutIcon from "@mui/icons-material/Logout";

function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [shouldShowTitle, setShouldShowTitle] = useState(true);
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);

  const handleCollapse = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShouldShowTitle(!isSidebarOpen);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [isSidebarOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="mywrapper">
      <nav id="sidebar" className={isSidebarOpen ? "" : "hidden"}>
        <div className="navbarTitle">
          <span>LibraList</span>
        </div>

        <ul className="list-unstyled components" id="myList">
          <li>
            <a href="/library">My books</a>
          </li>

          <li>
            <a href="/toread">Bookshelf</a>
          </li>

          <li style={{ marginTop: "620px" }}>
            <div style={{ height: "46px" }}>
              <button
                onClick={handleLogout}
                style={{
                  border: "none",
                  backgroundColor: "inherit",
                  color: "inherit",
                  paddingTop: "7px",
                  fontSize: "18px",
                }}
              >
                <LogoutIcon style={{ marginRight: "5px" }}></LogoutIcon>
                Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>

      <nav id="navbar2" className="mynavbar flex-row">
        <div className="container-fluid">
          <div id="content" className={isSidebarOpen ? "" : "hidden"}>
            <div style={{ float: "inline-start" }}>
              <button
                type="button"
                id="sidebarCollapse"
                className="btn btn-info"
                onClick={handleCollapse}
                style={{ padding: "0px" }}
              >
                <i className="bi bi-list-ul" id="listIcon"></i>
              </button>
            </div>
            <div
              className={`headerTitle ${
                isSidebarOpen ? "hidden1" : "fade-transition show"
              }`}
              style={{ width: "1840px" }}
            >
              {shouldShowTitle && <span>LibraList</span>}
            </div>
            <div
              style={{
                marginTop: "-25px",
                float: "inline-end",
                color: "white",
              }}
            >
              {shouldShowTitle && currentUser ? (
                <span>{currentUser.email}</span>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
