import React, { useState } from "react";
import { RegEmployee } from "./RegEmployee";
import { Route, Routes, Link } from "react-router-dom";
import axios from "axios";

export const EmployeeLogin = ({ employee, user, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [userData, setUserData] = useState(null); // State to store user data

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username);
    axios
      .post("https://dryexpress.herokuapp.com/employeelogin", {
        username,
        password,
      })
      .then((response) => {
        // Login successful, perform necessary actions (e.g., store user data)
        console.log(response.data);
        if (response.data.auth) {
          setLoginStatus(true);
          localStorage.setItem("token", response.data.token);
          setUserData(response.data.results); // Store user data in state
          onLogin(response.data.results); // Call the onLogin callback with user data
        }
      })
      .catch((error) => {
        // Handle login error (e.g., display error message)
        console.error(error);
        setLoginStatus(false);
      });

    setUsername("");
    setPassword("");
  };

  console.log(user?.role);
  return (
    <div>
      <form class="form">
        <p class="form-title">Employee Login</p>
        <div class="input-container">
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="username"
            placeholder="Enter username"
          />
          <span></span>
        </div>
        <div class="input-container">
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Enter password"
          />
        </div>
        <button type="submit" class="submit" onClick={handleSubmit}>
          Sign in
        </button>

        {/* <p class="signup-link">
          No account?
          <Link to="/employeeRegister">Register Employee</Link>
        </p> */}
      </form>

      <Routes>
        <Route
          path="/employeeRegister"
          element={
            localStorage.getItem("isAuthenticated") === "true" ? (
              <RegEmployee />
            ) : (
              ""
            )
          }
        />
      </Routes>
    </div>
  );
};
