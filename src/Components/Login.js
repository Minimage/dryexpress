import React, { useState } from "react";
import style from "./Login.module.css";
import Axios from "axios";

export const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [userData, setUserData] = useState(null); // State to store user data

  function formSubmit(event) {
    event.preventDefault();
    Axios.post("https://dryexpress.herokuapp.com/login", {
      email,
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

    setEmail("");
    setPassword("");
  }

  function logout(event) {
    event.preventDefault();
    localStorage.clear();
    setUserData(null); // Clear user data from state
    setLoginStatus(false);
    onLogin(null); // Call the onLogin callback with null to indicate logout
  }

  const userAuth = () => {
    Axios.get("https://dryexpress.herokuapp.com/isUserAuthenticated", {
      headers: { "x-access-token": localStorage.getItem("token") },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={style.login}>
      <div className={style.wrapper}>
        <form className={style.form} onSubmit={formSubmit}>
          <label>Email:</label>
          <input
            name="email"
            id="email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />

          <label>Password:</label>
          <input
            name="password"
            id="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />

          <button type="submit">Submit</button>
          <button onClick={logout}>Logout</button>
        </form>

        {loginStatus && <button onClick={userAuth}>Check Auth</button>}
        {localStorage.getItem("token") ? (
          <>
            <h1>You are logged in!</h1>
            <h2>Welcome, {userData && userData.firstName}</h2>{" "}
            {/* Display user data */}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
