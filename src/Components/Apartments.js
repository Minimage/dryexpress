import React, { useState, useEffect } from "react";
import Axios from "axios";

export const Apartments = ({ employee }) => {
  console.log(employee.apartmentID);
  useEffect(() => {
    Axios.get(
      `https://dryexpress.herokuapp.com/apartments/${employee.ApartmentID}`
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   useEffect(() => {
  //     const fetchOrders = async () => {
  //       try {
  //         const response = await Axios.get(
  //           `https://dryexpress.herokuapp.com/apartments/${employee.ApartmentID}`
  //         );
  //         const data = response.data;
  //         console.log(data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     fetchOrders();
  //   }, []);

  return <div>Apartments</div>;
};
