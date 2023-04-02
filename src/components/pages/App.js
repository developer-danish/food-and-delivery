import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import Header from "../Header";
import Home from "../Home";
import Signin from "../Signin";
import Signup from "../Signup";
import NotFound from "../NotFound";
import AdminDashboard from "../AdminDashboard";
import UserDashboard from "../UserDashboard";
import AdminEditProduct from "../AdminEditProduct";
import Shop from "../Shop";
import Cart from "../Cart";
import Product from "../Product";
import Shipping from "../Shipping";
import Payment from "../Payment";
import OrderSummary from "../OrderSummary";
import ViewAdminOrders from "../ViewAdminOrders";
import AdminOrderDetailView from "../AdminOrderDetailView";
import UserOrderdProducts from "../UserOrderdProducts";
import Footer from "../Footer";
import SideBar from "../SideBar";

import { isAuthenticated } from "../../helpers/auth";
import React, { useEffect } from "react";
import AdminBody from "../AdminBody";

const App = () => {
  const location = useLocation();
  const isAdmin = React.useMemo(() => {
    return (
      isAuthenticated() &&
      isAuthenticated().role === 1 &&
      location.pathname.includes("admin")
    );
  }, [isAuthenticated(), isAuthenticated().role, location]);

  useEffect(() => {
    console.log(location);
  });

  return (
    <>
      <Header />
      {isAdmin && <SideBar />}

      <main style={{ marginTop: "85px", marginLeft: isAdmin ? "200px" : "0" }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/orders" element={<UserOrderdProducts />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/product/:productId" element={<Product />} />
          <Route exact path="/shipping" element={<Shipping />} />
          <Route exact path="/orderSummary" element={<OrderSummary />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
          <Route exact path="/admin/orders" element={<ViewAdminOrders />} />
          <Route
            exact
            path="/admin/orders/view/:id"
            element={<AdminOrderDetailView />}
          />
          <Route exact path="/admin/products" element={<AdminBody />} />
          <Route exact path="/user/dashboard" element={<UserDashboard />} />
          <Route
            exact
            path="/admin/edit/product/:productId"
            element={<AdminEditProduct />}
          />
          <Route exact path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </main>
    </>
  );
};

export default App;
