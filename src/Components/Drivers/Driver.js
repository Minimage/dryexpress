import React, { useState, useEffect } from "react";
import { Route, Routes, Link, Outlet, useLocation } from "react-router-dom";

import { DriverGoing } from "./DriverGoing";
import { DriverComing } from "./DriverComing";
import { Status } from "./Status";

export const Driver = () => {
  const location = useLocation();

  useEffect(() => {
    /* If path starts with /Driver then the navbar will be hiden */

    const shouldShowNavbar = !location.pathname.startsWith("/Driver");
    setShowNavbar(shouldShowNavbar);
  }, [location]);

  const [showNavbar, setShowNavbar] = useState(true);

  return (
    <div>
      <>
        Welcome to the driver page
        {showNavbar && (
          <nav>
            <Link to="/Driver/Going">Going</Link>
            <Link to="/Driver/Coming">Coming</Link>
            <Link to="/Driver/Status">Status</Link>
          </nav>
        )}
      </>

      <Outlet />
    </div>
  );
};
