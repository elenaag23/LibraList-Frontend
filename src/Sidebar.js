// import "./App.css";
// import { useTheme } from "@mui/material";
// import "./HomePage.css";
// import React, { useState, useEffect } from "react";

// function Sidebar() {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [shouldShowTitle, setShouldShowTitle] = useState(true);

//   const handleCollapse = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       setShouldShowTitle(!isSidebarOpen);
//     }, 500); // Adjust the delay as needed

//     return () => clearTimeout(timeoutId);
//   }, [isSidebarOpen]);

//   return (
//     <div className="mywrapper">
//       <nav id="navbar2" className="mynavbar flex-row">
//         <div className="container-fluid">
//           <div id="content" className={isSidebarOpen ? "" : "hidden"}>
//             <div style={{ float: "inline-start" }}>
//               <button
//                 type="button"
//                 id="sidebarCollapse"
//                 className="btn btn-info"
//                 onClick={handleCollapse}
//                 style={{
//                   paddingLeft: "6px",
//                   paddingRight: "6px",
//                   paddingTop: "0px",
//                   paddingBottom: "0px",
//                 }}
//               >
//                 <i className="bi bi-list-ul" id="listIcon"></i>
//               </button>
//             </div>
//             <div
//               className={`headerTitle ${
//                 isSidebarOpen ? "hidden1" : "fade-transition show"
//               }`}
//               // style={{ transition: "opacity 0.7s ease-in" }}
//             >
//               {shouldShowTitle && <span>LibraList</span>}
//             </div>
//           </div>
//         </div>
//       </nav>

//       <nav id="sidebar" className={isSidebarOpen ? "" : "hidden"}>
//         <div className="sidebar-header">
//           <h3>LiteraList</h3>
//         </div>

//         <ul className="list-unstyled components">
//           <li>
//             <a href="/library">My books</a>
//           </li>

//           <li>
//             <a href="#">In progress</a>
//           </li>

//           <li>
//             <a href="#">To Read</a>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default Sidebar;

// Sidebar.js
import React, { useState, useEffect } from "react";
import "./App.css"; // Assuming this is your custom CSS file
import "./HomePage.css"; // Assuming this is another custom CSS file
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
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
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(timeoutId);
  }, [isSidebarOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      // Redirect to home page after logout or perform other actions as needed
      window.location.href = "/login"; // Change the window location
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setCurrentUser(user);
      } else {
        // No user is signed in
        setCurrentUser(null);
      }
    });

    // Clean up subscription on unmount
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
            <a href="#">In progress</a>
          </li>

          <li>
            <a href="/toread">To Read</a>
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
              {currentUser ? <span>{currentUser.email}</span> : null}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
