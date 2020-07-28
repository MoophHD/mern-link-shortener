import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../context/auth.context";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const handleLogout = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };
  return (
    <nav>
      <div
        className="nav-wrapper blue darken-1"
        style={{ padding: "0rem 2rem" }}
      >
        <span className="brand-logo">Link Shrinker</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
          <li>
            <NavLink to="/links">Create</NavLink>
          </li>
          <li>
            <a href="/" onClick={handleLogout}>
              Log out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
