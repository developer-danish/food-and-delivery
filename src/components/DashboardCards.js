import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderdProducts } from "../redux/actions/adminOrdersActions";
import { getUserSpecificOrders } from "../redux/actions/orderActions";
import "./DashboardCards.css";
const DashbardCards = () => {
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrderdProducts());
  }, [dispatch]);

  const { allUserOrders } = useSelector((state) => state.adminOrders.orders);

  useEffect(() => {
    setOrders(
      allUserOrders.length > 0
        ? allUserOrders[0]
            .map((order) => JSON.parse(order.orderdProducts))
            .flat(2)
        : []
    );
  }, [allUserOrders, setOrders]);

  useEffect(() => {
    setTotalAmount(
      orders
        .map((order) => order.productPrice * order.productQuantity)
        .reduce((partialSum, a) => partialSum + a, 0)
    );
  }, [orders]);

  return (
    <>
      <div id="root">
        <div class="container pt-5">
          <div class="row align-items-stretch">
            <div class="c-dashboardInfo col-lg-3 col-md-6">
              <div class="wrap">
                <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                  Order amount
                  <svg
                    class="MuiSvgIcon-root-19"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    role="presentation"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                  </svg>
                </h4>
                <span class="hind-font caption-12 c-dashboardInfo__count">
                  ₹{totalAmount}
                </span>
              </div>
            </div>
            <div class="c-dashboardInfo col-lg-3 col-md-6">
              <div class="wrap">
                <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                  Total orders
                  <svg
                    class="MuiSvgIcon-root-19"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    role="presentation"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                  </svg>
                </h4>
                <span class="hind-font caption-12 c-dashboardInfo__count">
                  {orders.length}
                </span>
                {/* <span class="hind-font caption-12 c-dashboardInfo__subInfo">
                  Last month: €30
                </span> */}
              </div>
            </div>
            <div class="c-dashboardInfo col-lg-3 col-md-6">
              <div class="wrap">
                <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                  Total Products
                  <svg
                    class="MuiSvgIcon-root-19"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    role="presentation"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                  </svg>
                </h4>
                <span class="hind-font caption-12 c-dashboardInfo__count">
                  {products.length}
                </span>
              </div>
            </div>
            <div class="c-dashboardInfo col-lg-3 col-md-6">
              <div class="wrap">
                <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                  Categories
                  <svg
                    class="MuiSvgIcon-root-19"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    role="presentation"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                  </svg>
                </h4>
                <span class="hind-font caption-12 c-dashboardInfo__count">
                  {categories.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashbardCards;
