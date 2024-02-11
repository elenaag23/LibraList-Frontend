// Register.js
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const auth = getAuth();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      window.location.href = "/login";
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="mycontainer" style={{ backgroundColor: "#b4bce4" }}>
      <div className="registerComponent">
        <div className="pageTitle" style={{ marginTop: "50px" }}>
          <span>Register</span>
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
            <button
              onClick={handleRegister}
              className="loginButton"
              style={{ width: "100px" }}
            >
              Register
            </button>

            {error && <p>{error}</p>}
          </div>

          <div className="redirectLogin">
            <a href="/login">
              <span>If you already have an account, click here to sign in</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
