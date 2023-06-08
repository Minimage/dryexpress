import { Route, Routes, Link } from "react-router-dom";
import { Login } from "./Components/Login";
import { HomePage } from "./HomePage";
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
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            user ? <HomePage user={user} /> : <Login onLogin={handleLogin} />
          }
        />
      </Routes>
    </>
  );
};

export default App;
