import React, { useState, useEffect } from "react";
import Axios from "axios";

//  This page should display all orders that the apartment has

export const AparmtentOrders = () => {
  useEffect(() => {
    console.log(localStorage.getItem("ApartmentID"));
    Axios.get("/getOrderByApartmentID")
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>AparmtentOrders</div>;
};