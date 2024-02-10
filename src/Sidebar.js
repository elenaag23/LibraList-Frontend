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
