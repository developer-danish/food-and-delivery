import React from "react";
import { useSelector } from "react-redux";
import ActionBtns from "./ActionBtns";
import AdminCategoryModal from "./AdminCategoryModal";
import AdminProductModal from "./AdminProductModal";
import CardOne from "./CardOne";

const AdminBody = () => {
  const { products } = useSelector((state) => state.products);
  return (
    <div className="container">
      <ActionBtns />

      <AdminCategoryModal />
      <AdminProductModal />
      <div className="row">
        <div className="d-flex flex-wrap ">
          {products &&
            products.map((product) => (
              // <Card key={product._id} product={product} adminPage={true}/>
              <CardOne key={product._id} product={product} adminPage={true} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBody;
