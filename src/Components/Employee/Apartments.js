import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";

export const Apartments = ({ employee, data, onDataUpdate }) => {
  // Remove the useState for data and setData
  // const [data, setData] = useState(null);
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);

  useEffect(() => {
    const fetchData = async () => {
      if (userData && userData.apartmentId) {
        try {
          const response = await Axios.get(
            `https://dryexpress.herokuapp.com/apartments/${userData.apartmentId}`
          );
          onDataUpdate(response.data); // Update the data in the App component
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchData();
  }, [userData.apartmentId]);

  console.log(data);
  console.log(userData);

  return (
    <div>
      {userData.apartmentId !== undefined ? (
        <>
          {data?.apartment.apparmentName}
          <br />
          <span>{data?.apartment?.address}</span>
        </>
      ) : (
        "No aparment attached to your account"
      )}
      <br />

      {userData?.role != "User" ? (
        <div className="employeeHolder">
          <h1>Employees</h1>
          {data?.employees.map((employee) => {
            return (
              <div className="employee">
                {employee.firstName} {employee.lastName}
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}

      {userData?.role != "User" ? (
        <div className="usersHolder">
          <h1>Users</h1>
          {data?.users.map((user) => {
            return (
              <div className="users">
                <Link
                  className={data != null ? "show" : "hide"}
                  to="/AddUserQR"
                >
                  <button>Add User</button>
                </Link>
                <br />
                {user.firstName} {user.lastName}
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
