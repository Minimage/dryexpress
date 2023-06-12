import React, { useState, useEffect } from "react";
import Axios from "axios";

export const RegEmployee = () => {
  const [data, setData] = useState([]);
  const [drop, setDrop] = useState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [apartmentID, setApartmentID] = useState("");

  const handleSelectApartment = (e) => {
    setApartmentID(e.target.value);
  };

  const handleSelect = (e) => {
    setRole(e.target.value);
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    try {
      await Axios.post("https://dryexpress.herokuapp.com/employeeRegister", {
        firstName: firstName,
        lastName: lastName,
        Username: username,
        Password: password,
        Role: role,
        ApartmentID: apartmentID,
      });
      // Handle the success response here if needed
    } catch (error) {
      // Handle the error here if needed
    }
  };

  useEffect(() => {
    Axios.get("https://dryexpress.herokuapp.com/getApartments")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        // Handle the error here if needed
      });
  }, []);

  return (
    <div>
      <form onSubmit={formSubmit}>
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

        <label>Username:</label>
        <input
          name="username"
          id="username"
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
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

        <label>Role:</label>
        <select name="role" id="role" onChange={handleSelect}>
          <option value="Driver">Driver</option>
          <option value="Sub">Sub</option>
          <option value="Owner">Owner</option>
          <option value="Admin">Admin</option>
        </select>

        <label>Apartment:</label>
        <select name="apartment" onChange={handleSelectApartment}>
          <option>Please select a facility</option>
          {data.map((item, index) => (
            <option key={index} value={item._id}>
              {item.apparmentName}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
