import logo from "./logo.svg";
import "./App.css";
import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Sidebar from "./Sidebar";

function App() {
  const theme = useMemo(() => createTheme(themeSettings(), []));
  return (
    <div className="App">
      <Sidebar />
      {/* <ThemeProvider theme={theme}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            //className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </ThemeProvider> */}
    </div>
  );
}

export default App;
