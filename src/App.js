import { Route, Routes, Link, Navigate } from "react-router-dom";
import { Login } from "./Components/Login";
import HomePage from "./Components/HomePage";
import { useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
