//Reverted Rearranging_app branch, we will need to push again

import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Axios from "axios";
import { Login } from "./Components/User/Login";
import { HomePage } from "./HomePage";
import { Order } from "./Components/User/Order";
import { Admin } from "./Components/Admin/Admin";
import { RegEmployee } from "./Components/Employee/RegEmployee";
import { Apartments } from "./Components/Employee/Apartments";
import { EmployeeLogin } from "./Components/Employee/EmployeeLogin";
import { RegisterApparments } from "./Components/Admin/RegisterApparments";
import { AddUser } from "./Components/Apartment/AddUser";
import { Setter } from "./Components/Setter/Setter";
import { AparmtentOrders } from "./Components/Apartment/AparmtentOrders";
import { Driver } from "./Components/Drivers/Driver";
import { DriverGoing } from "./Components/Drivers/DriverGoing";
import { DriverComing } from "./Components/Drivers/DriverComing";
import { Status } from "./Components/Drivers/Status";

const App = () => {
  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState(null);

  const [data, setData] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);

  const handleDataUpdate = (newData) => {
    setData(newData);
  };
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userData", JSON.stringify(userData));
    const userDataString = localStorage.getItem("userData");
    const myData = JSON.parse(userDataString);

    //   if (myData.role === "Driver") {
    //     setShowNavbar(false);
    //   } else {
    //     setShowNavbar(true);
    //   }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated"); // Remove authentication status from local storage
    localStorage.removeItem("userData"); // Remove user data from local storage
  };

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
          Add user to apartment
        </Link>

        {localStorage.getItem("isAuthenticated") === "true" ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          ""
        )}
      </nav>

      <Routes>
        {/*Owner*/}
        {user?.role === "Owner" ? (
          <Route
            path="/"
            element={
              localStorage.getItem("isAuthenticated") === "true" ? (
                <HomePage user={user} onLogout={handleLogout} />
              ) : (
                ""
              )
            }
          />
        ) : (
          ""
        )}

        {/*Driver*/}
        {user?.role === "Driver" ? (
          <Route
            path="/Driver"
            element={
              localStorage.getItem("isAuthenticated") === "true" ? (
                <Driver showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
              ) : (
                ""
              )
            }
          >
            <Route
              path="Going"
              element={
                <DriverGoing
                  showNavbar={showNavbar}
                  setShowNavbar={setShowNavbar}
                />
              }
            />
            <Route
              path="Coming"
              element={<DriverComing showNavbar={showNavbar} />}
            />
            <Route path="Status" element={<Status showNavbar={showNavbar} />} />
          </Route>
        ) : (
          ""
        )}

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

        {/* <Route
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
        <Route
          path="/AparmtentOrders"
          element={
            <div>
              <AparmtentOrders />
            </div>
          }
        />

        <Route
          path="/Setter"
          element={user?.role === "Setter" ? <Setter /> : "No access"}
        /> */}
      </Routes>
    </>
  );
};

export default App;
