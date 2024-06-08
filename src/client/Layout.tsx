import { useMemo } from "react";

import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const description = useMemo(() => {
    switch (location.pathname) {
      case "/":
        return "User Login";
      case "/emails":
        return "Email Inbox";
      default:
        return "";
    }
  }, [location.pathname]); 
  
  return (
    <div className="container">
      <div className="header">
        <div>{description}</div>
        <div className="navbar">
          <Link to="/">{location.pathname === "/" ? "Login" : "Logout"}</Link>
          <Link to="/emails">Email Inbox</Link>
        </div>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout;