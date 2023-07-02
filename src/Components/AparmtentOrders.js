import React, { useState, useEffect } from "react";
import Axios from "axios";

//  This page should display all orders that the apartment has

export const AparmtentOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    console.log(localStorage.getItem("ApartmentID"));
    Axios.post("http://dryexpress.herokuapp.com/getOrderByApartmentID", {
      apartmentID: localStorage.getItem("ApartmentID"),
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>AparmtentOrders</div>;
};
