import React, { useState } from "react";
import Axios from "axios";

export const RegisterApparments = () => {
  const [apparmentName, setAppartmentName] = useState();
  const [address, setAddress] = useState();

  const handleSubmit = () => {
    Axios.post("https://dryexpress.herokuapp.com/apparmentRegister", {
      apparmentName: apparmentName,
      address: address,
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div>
      <label>Appartment Name</label>
      <br />
      <input
        onChange={(e) => {
          setAppartmentName(e.target.value);
        }}
      />
      <br />
      <label>Address:</label>
      <br />
      <input
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />

      <br />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
