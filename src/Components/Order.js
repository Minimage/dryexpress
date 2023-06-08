import React, { useEffect, useState } from "react";
import Axios from "axios";

export const Order = ({ user }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await Axios.get(
          `https://dryexpress.herokuapp.com/orders?userId=${user._id}`
        );
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div>
      <h2>Orders</h2>
      {orders.map((order) => (
        <div key={order._id}>
          <p>Order ID: {order._id}</p>
          <p>Date: {order.dateTime}</p>
          {/* Display other order details */}
        </div>
      ))}
    </div>
  );
};
