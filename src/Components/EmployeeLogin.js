import React, { useState } from "react";
import { RegEmployee } from "./RegEmployee";
import { Route, Routes, Link } from "react-router-dom";
import { Axios } from "axios";

export const EmployeeLogin = ({ employee, user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
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
