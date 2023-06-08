import React, { useEffect, useState } from "react";
import Axios from "axios";

export const Order = ({ user }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage or wherever you store it
        const response = await Axios.get(
          `https://dryexpress.herokuapp.com/orders?userId=${user._id}`,
          {
            headers: {
              "x-access-token": token, // Include the token in the request headers
            },
          }
        );
        const data = response.data;
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div>
      <h1>Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id}>
            <p>First Name: {order.firstName}</p>
            <p>Last Name: {order.lastName}</p>
            <p>Date and Time: {order.formattedDateTime}</p>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
      {console.log(orders)}
    </div>
  );
};
