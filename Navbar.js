import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">Add a file</Link>
        </li>
        <li>
          <Link to="/remove">Remove a file</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
