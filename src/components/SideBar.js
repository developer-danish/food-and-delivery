import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../api/constants";
import { getAllOrderdProducts } from "../redux/actions/adminOrdersActions";
import "./SideBar.css";
import "react-notifications/lib/notifications.css";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

function Sidebar() {
  const { allUserOrders } = useSelector((state) => state.adminOrders.orders);
  const [newOrderCount, setNewOrderCount] = useState(0);
  const [newOrders, setNewOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (allUserOrders.length && allUserOrders[0]) {
      let newCount = newOrders.length;
      let oldCount = allUserOrders[0].length;
      if (newCount > oldCount) {
        let diff = newCount - oldCount;
        // console.log("newCount", newCount);
        // console.log("oldCount", oldCount);
        // console.log("newOrderCount", newOrderCount);
        // console.log("diff", diff);
        if (diff > newOrderCount) {
          setNewOrderCount(diff);
          console.log("new Order");
          NotificationManager.success("Order received", "New Order");
        }
      } else {
        setNewOrderCount(0);
      }
    }
  }, [allUserOrders, newOrders]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      loadOrders();
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const loadOrders = async () => {
    const response = await axios.get("/api/order/getall", {
      baseURL: API_ENDPOINTS.BASE_URL,
    });
    let newCount = 0;
    let oldCount = !!allUserOrders.length ? allUserOrders[0].length : 0;
    if (response && response.data && response.data.orders) {
      newCount = response.data.orders.length;
      setNewOrders(response.data.orders);
    }
  };
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to={"admin/dashboard"}>
            <a href="#">Dashboard</a>
          </Link>
        </li>
        <li>
          <Link
            to={"/admin/orders"}
            onClick={() => {
              setNewOrderCount(0);

              dispatch(getAllOrderdProducts());
              console.log("reset new order count");
            }}
          >
            <a href="#">
              Orders{" "}
              <span
                style={{ fontSize: "12px", fontWeight: "bold", color: "red" }}
              >
                {!!newOrderCount && `(${newOrderCount})`}
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
      <NotificationContainer />
    </div>
  );
}

export default Sidebar;
