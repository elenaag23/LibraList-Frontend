import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./HomePage.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const auth = getAuth();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in successfully:", userCredential.user);
      window.location.href = "/";
      // Add your logic for successful login (e.g., redirect)
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="mycontainer" style={{ backgroundColor: "#d9def2" }}>
      <div className="loginComponent">
        <div
          className="pageTitle"
          style={{ marginTop: "50px", color: "white" }}
        >
          <span>Login</span>
        </div>

        <div className="form-group">
          <div className="formItem">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inputStyle"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inputStyle"
            />
          </div>

          <div>
            <button onClick={handleLogin} className="loginButton">
              Login
            </button>
            {error && <p>{error}</p>}
          </div>

          <div className="redirectRegister">
            <a href="/register">
              <span>
                If you don't have an account yet, click here to register
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
