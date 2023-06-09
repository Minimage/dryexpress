import React, { useState } from "react";

export const RegisterApparments = () => {
  const [apparmentName, setAppartmentName] = useState();
  const [address, setAddress] = useState();

  const handleSubmit = () => {};

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

      <button>Submit</button>
    </div>
  );
};
