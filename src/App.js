import { Route, Routes, Link } from "react-router-dom";
import { Login } from "./Components/Login";
import { HomePage } from "./HomePage";
import { Order } from "./Components/Order";
import { Admin } from "./Admin";
import { RegEmployee } from "./Components/RegEmployee";
import { RegisterApparments } from "./Components/RegisterApparments";
import { useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/order">Order</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/register">Register</Link>
        <Link to="/EmployeeRegister">Register Employee</Link>

        {user ? <button onClick={handleLogout}>Logout</button> : ""}
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <HomePage user={user} onLogout={handleLogout} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/order"
          element={
            user ? <Order user={user} /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/admin"
          element={user ? <Admin /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={
            user ? <RegisterApparments /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/employeeRegister"
          element={user ? <RegEmployee /> : <Login onLogin={handleLogin} />}
        />
      </Routes>
    </>
  );
};

export default App;
