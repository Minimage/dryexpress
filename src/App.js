import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Axios from "axios";
import { Login } from "./Components/Login";
import { HomePage } from "./HomePage";
import { Order } from "./Components/Order";
import { Admin } from "./Admin";
import { RegEmployee } from "./Components/RegEmployee";
import { Apartments } from "./Components/Apartments";
import { EmployeeLogin } from "./Components/EmployeeLogin";
import { RegisterApparments } from "./Components/RegisterApparments";
import { AddUser } from "./Components/AddUser";

const App = () => {
  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState(null);

  const [data, setData] = useState(null);

  const handleDataUpdate = (newData) => {
    setData(newData);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("isAuthenticated", "true"); // Set authentication status in local storage
    localStorage.setItem("userData", JSON.stringify(userData)); // Store user data in local storage
    const userDataString = localStorage.getItem("userData");
    const myData = JSON.parse(userDataString);
    // setEmployee({
    //   apartmentId: myData.apartmentId,
    // });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated"); // Remove authentication status from local storage
    localStorage.removeItem("userData"); // Remove user data from local storage
  };

  console.log(employee);

  const userAuth = () => {
    Axios.get("https://dryexpress.herokuapp.com/isUserAuthenticated", {
      headers: { "x-access-token": localStorage.getItem("token") },
    })
      .then((response) => {
        if (response.data.auth) {
          setUser(response.data.results);
          localStorage.setItem("isAuthenticated", "true"); // Set authentication status in local storage
        } else {
          handleLogout(); // Logout the user if not authenticated
        }
      })
      .catch((error) => {
        console.log(error);
        handleLogout(); // Logout the user if an error occurs
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAuthenticated = localStorage.getItem("isAuthenticated"); // Get authentication status from local storage
    const storedUserData = localStorage.getItem("userData"); // Get user data from local storage

    if (token && isAuthenticated) {
      if (storedUserData) {
        setUser(JSON.parse(storedUserData)); // Set the user data from local storage
      } else {
        userAuth(); // Retrieve user data from the backend if not available in local storage
      }
    }
  }, []);

  return (
    <>
      <nav className="links">
        <Link to="/">Home</Link>
        <Link to="/order">Order</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/register">Register</Link>
        <Link to="/employeeRegister">Register Employee</Link>
        <Link to="/apartments">Apartments</Link>
        <Link className={user == null ? "show" : "hide"} to="/EmployeeLogin">
          Employee Login
        </Link>
        <Link className={employee != null ? "show" : "hide"} to="/AddUserQR">
          ok
        </Link>

        {localStorage.getItem("isAuthenticated") === "true" ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          ""
        )}
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("isAuthenticated") === "true" ? (
              <HomePage user={user} onLogout={handleLogout} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/order"
          element={
            localStorage.getItem("isAuthenticated") === "true" ? (
              <Order user={user} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/admin"
          element={
            localStorage.getItem("isAuthenticated") === "true" ? (
              <Admin />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/register"
          element={
            localStorage.getItem("isAuthenticated") === "true" ? (
              <RegisterApparments />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/employeeRegister"
          element={
            localStorage.getItem("isAuthenticated") === "true" ? (
              <RegEmployee />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/apartments"
          element={
            localStorage.getItem("isAuthenticated") === "true" ? (
              <Apartments
                employee={employee}
                data={data}
                onDataUpdate={handleDataUpdate}
              />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/EmployeeLogin"
          element={
            user?.role == null ? (
              <EmployeeLogin
                onLogin={handleLogin}
                employee={employee}
                setEmployee={setEmployee}
                user={user}
              />
            ) : (
              <div>
                {user?.role != "User" ||
                user?.role === "Sub" ||
                user?.role === "Admin" ? (
                  <Apartments
                    employee={employee}
                    data={data}
                    onDataUpdate={handleDataUpdate}
                  />
                ) : (
                  ""
                )}
              </div>
            )
          }
        />

        <Route
          path="/AddUserQR"
          element={
            <div>
              <AddUser employee={employee} />
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;
