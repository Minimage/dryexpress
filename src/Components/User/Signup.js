import React, { useState } from "react";
import style from "./Signup.module.css";
import Axios from "axios";
export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");

  function formSubmit(event) {
    event.preventDefault();
    Axios.post("https://dryexpress.herokuapp.com/register", {
      firstName,
      lastName,
      address,
      email,
      password,
      role,
    });

    setFirstName("");
    setLastName("");
    setAddress("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className={style.signup}>
      <div className={style.wrapper}>
        <form className={style.form} onSubmit={formSubmit}>
          <label>First Name:</label>
          <input
            name="firstName"
            id="firstName"
            type="text"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
          />

          <label>Last Name:</label>
          <input
            name="lastName"
            id="lastName"
            type="text"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
          />

          <label>Address:</label>
          <input
            name="address"
            id="address"
            type="text"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            value={address}
          />

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
          ></input>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
