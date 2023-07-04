import React, { useEffect, useState } from "react";
import Axios from "axios";

export const Order = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [date, setDate] = useState();

  const currentDate = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await Axios.get(
          `https://dryexpress.herokuapp.com/orders?userId=${user._id}`
        );
        const data = response.data;
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [user]);

  // console.log(currentDate.toLocaleDateString("en-us", options));
  const newDate = orders.dateTime;
  // console.log(date);

  return (
    <div>
      <h1>Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id}>
            <p>First Name: {order.firstName}</p>
            <p>Last Name: {order.lastName}</p>
            <p>
              Date and Time: {new Date(order.dateTime).toDateString()}
              {"  "}
              {new Date(order.dateTime).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
              :
            </p>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
      {/* {console.log(orders)} */}
    </div>
  );
};
