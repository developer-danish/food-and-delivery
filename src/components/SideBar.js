import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to={"admin/dashboard"}>
            <a href="#">Dashboard</a>
          </Link>
        </li>
        <li>
          <Link to={"/admin/orders"}>
            <a href="#">
              Orders{" "}
              <span
                style={{ fontSize: "12px", fontWeight: "bold", color: "red" }}
              >
                (+3)
              </span>
            </a>
          </Link>
        </li>
        <li>
          <Link to={"admin/products"}>
            <a href="#">Products</a>
          </Link>
        </li>
        {/* <li>
          <Link to={"admin/categories"}>
            <a href="#">Categories</a>
          </Link>
        </li> */}
      </ul>
    </div>
  );
}

export default Sidebar;
