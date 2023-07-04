import React, { useState, useEffect } from "react";
import Axios from "axios";

//  This page should display all orders that the apartment has by grabbing the
//  aparmentID from localStorage and doing a post request

export const AparmtentOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    console.log(localStorage.getItem("ApartmentID"));
    Axios.post("http://dryexpress.herokuapp.com/getOrderByApartmentID", {
      apartmentID: localStorage.getItem("ApartmentID"),
    })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      AparmtentOrders
      <div>
        {orders
          ? orders.map((order) => {
              console.log(order);
              return (
                <div>
                  <br />
                  {order.firstName} {order.lastName}
                  <br />
                  {new Date(order.dateTime).toDateString()}
                  {"  "}
                  {new Date(order.dateTime).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                  <br />
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};
