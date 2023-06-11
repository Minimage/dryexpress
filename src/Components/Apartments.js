import React, { useState, useEffect } from "react";
import Axios from "axios";

export const Apartments = ({ employee }) => {
  const [aptID, setAptID] = useState(employee.apartmentID);
  const [data, setData] = useState();

  console.log(employee);
  useEffect(() => {
    if (employee.apartmentID) {
      Axios.get(
        `https://dryexpress.herokuapp.com/apartments/${employee.apartmentID}`
      )
        .then((response) => {
          console.log(response);
          setData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [employee.ApartmentID]);

  return (
    <div>
      <h1>{data?.apartment?.apparmentName}</h1>
      <br />
      <span>{data?.apartment?.address}</span>
    </div>
  );
};
