import Axios from "axios";
import React, { useState, useEffect } from "react";

export const DriverGoing = () => {
  const [orders, setOrders] = useState([]);
  const [orderData, setOrderData] = useState([]);

  const handleCheckboxChange = (orderId) => {
    if (orders.includes(orderId)) {
      setOrders(orders.filter((id) => id !== orderId));
    } else {
      setOrders([...orders, orderId]);
    }
  };

  const handleSave = () => {
    Axios.post("https://dryexpress.herokuapp.com/DriverGoing", {
      orderIds: orders, // Pass the array of order IDs to the backend
    })
      .then((response) => {
        // Handle the response here if needed
      })
      .catch((error) => {
        // Handle the error here if needed
      });
  };

  useEffect(() => {
    Axios.post("https://dryexpress.herokuapp.com/DriverOrders", {
      apartmentID: localStorage.getItem("DriverApartment"),
    })
      .then((response) => {
        setOrderData(response.data);
        setOrders(response.data.map((order) => order._id));
      })
      .catch((error) => {
        // Handle the error here if needed
      });
  }, []);

  return (
    <div>
      <div>
        {orderData.map((order) => {
          const { _id, timestamps } = order;
          return (
            <div key={_id}>
              <input
                type="checkbox"
                checked={orders.includes(_id)}
                onChange={() => handleCheckboxChange(_id)}
              />
              <span>{JSON.stringify(timestamps?.driver_going)}</span>
            </div>
          );
        })}
      </div>
      <button onClick={handleSave}>Save Orders</button>
    </div>
  );
};
