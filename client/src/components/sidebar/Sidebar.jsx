import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Sidebar({ items }) {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-secondary"
      style={{
        maxWidth: "100%",
      }}
    >
      <hr className="d-md-none" />
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
          <Link className="nav-link" to="/admin" style={{ color: "white" }}>
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="AddHouseType"
            style={{ color: "white" }}
          >
            add house type
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
