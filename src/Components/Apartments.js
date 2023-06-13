import React, { useState, useEffect } from "react";
import Axios from "axios";

export const Apartments = () => {
  const [data, setData] = useState(null);
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);

  useEffect(() => {
    const fetchData = async () => {
      if (userData && userData.apartmentId) {
        try {
          const response = await Axios.get(
            `https://dryexpress.herokuapp.com/apartments/${userData.apartmentId}`
          );
          setData(response.data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    console.log(data);

    fetchData();
  }, []);

  return (
    <div>
      <h1>{data?.apartment?.apparmentName}</h1>
      <br />
      <span>{data?.apartment?.address}</span>
    </div>
  );
};
