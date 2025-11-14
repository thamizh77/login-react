import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css"; // Make sure your CSS file is still imported

function App() {
  const navigate = useNavigate();
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // State for registration
  const [regName, setRegName] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegistration, setShowRegistration] = useState(false);

  function handleLoginUsername(evt) {
    setLoginUsername(evt.target.value);
  }

  function handleLoginPassword(evt) {
    setLoginPassword(evt.target.value);
  }

  function handleRegName(evt) {
    setRegName(evt.target.value);
  }

  function handleRegUsername(evt) {
    setRegUsername(evt.target.value);
  }

  function handleRegPassword(evt) {
    setRegPassword(evt.target.value);
  }

  function handleRegConfirmPassword(evt) {
    setRegConfirmPassword(evt.target.value);
  }

  function checkLogin() {
    axios
      .post("http://localhost:5000/login", {
        username: loginUsername,
        password: loginPassword,
      })
      .then((response) => {
        console.log("Login Response:", response);
        if (response.data === true) {
          navigate("/success");
        } else {
          navigate("/fail");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("Login failed. Please try again later.");
      });
  }

  function handleRegister() {
    if (regPassword !== regConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    axios
      .post("http://localhost:5000/register", {
        name: regName,
        username: regUsername,
        password: regPassword,
      })
      .then((response) => {
        console.log("Registration Response:", response);
        if (response.status === 201) {
          alert("Registration successful!");
          setShowRegistration(false); // Go back to login form
          // Optionally clear the registration form fields
          setRegName("");
          setRegUsername("");
          setRegPassword("");
          setRegConfirmPassword("");
        } else {
          alert("Registration failed: " + response.data);
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        if (error.response && error.response.status === 409) {
          alert("Username already exists. Please choose a different one.");
        } else {
          alert("Registration failed. Please try again later.");
        }
      });
  }

  function toggleRegistrationForm() {
    setShowRegistration(!showRegistration);
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{showRegistration ? "Register" : "Login"}</h2>
        {showRegistration ? (
          <>
            <div className="input-group">
              <label htmlFor="regName">Name</label>
              <input
                type="text"
                id="regName"
                onChange={handleRegName}
                name="regName"
                placeholder="Your Name"
                value={regName}
              />
            </div>
            <div className="input-group">
              <label htmlFor="regUsername">Username</label>
              <input
                type="text"
                id="regUsername"
                onChange={handleRegUsername}
                name="regUsername"
                placeholder="Choose a Username"
                value={regUsername}
              />
            </div>
            <div className="input-group">
              <label htmlFor="regPassword">Password</label>
              <input
                type="password"
                id="regPassword"
                onChange={handleRegPassword}
                name="regPassword"
                placeholder="Password"
                value={regPassword}
              />
            </div>
            <div className="input-group">
              <label htmlFor="regConfirmPassword">Confirm Password</label>
              <input
                type="password"
                id="regConfirmPassword"
                onChange={handleRegConfirmPassword}
                name="regConfirmPassword"
                placeholder="Confirm Password"
                value={regConfirmPassword}
              />
            </div>
            <button onClick={handleRegister} className="submit-button">
              Register
            </button>
            <button
              onClick={toggleRegistrationForm}
              className="toggle-button"
            >
              Back to Login
            </button>
          </>
        ) : (
          <>
            <div className="input-group">
              <label htmlFor="loginUsername">Username</label>
              <input
                type="text"
                id="loginUsername"
                onChange={handleLoginUsername}
                name="username"
                placeholder="Username"
                value={loginUsername}
              />
            </div>
            <div className="input-group">
              <label htmlFor="loginPassword">Password</label>
              <input
                type="password"
                id="loginPassword"
                onChange={handleLoginPassword}
                name="password"
                placeholder="Password"
                value={loginPassword}
              />
            </div>
            <button onClick={checkLogin} className="submit-button">
              Login
            </button>
            <button
              onClick={toggleRegistrationForm}
              className="toggle-button"
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;