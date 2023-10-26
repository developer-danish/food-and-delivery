import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import isEmpty from "validator/lib/isEmpty";
import { showErrorMsg, showSuccessMsg } from "./../helpers/message";
import { showLoading } from "./../helpers/loading";
import { useDispatch, useSelector } from "react-redux";
import { clear_message } from "./../redux/actions/messageActions";
import { createProduct } from "./../redux/actions/productActions";
import { addLeftOverFood, addNewFood } from "../api/food";


const LeftOverModal = () => {
  /* REDUX GLOBAL STATE PROPERTIES*/
  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  /* component state properties */
  const [clientSideError, setClientSideError] = useState("");

  const [productData, setProductData] = useState({
    productImage: null,
    productName: "",
    productDesc: "",
    productPrice: "",
    productDiscount:"",
    productLatitude: null,
    productLongitude: null,
    productQuantity: "",
  });

  const {
    productImage,
    productName,
    productDesc,
    productPrice,
    productDiscount,
    productLatitude,
    productLongitude,
    productQuantity,
  } = productData;

  // const closeBtn = () => {
  //   dispatch(clear_message());
  // };

  const handleProductImage = (evt) => {
    setProductData({
      ...productData,
      [evt.target.name]: evt.target.files[0],
    });
    dispatch(clear_message());
  };

  const handleProductChange = (evt) => {
    setProductData({
      ...productData,
      [evt.target.name]: evt.target.value,
    });
    getLocation();
    dispatch(clear_message());
    setClientSideError("");
  };

  function showPosition(position) {
    productLatitude = position.coords.latitude; 
    productLongitude =  position.coords.longitude;
  }
  
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  const submitProduct = (e) => {
    e.preventDefault();
    // console.log(productData);
    if (
      productImage === null ||
      isEmpty(productName) ||
      isEmpty( productLatitude) ||
      isEmpty( productLongitude) ||
      isEmpty(productDesc) ||
      isEmpty(productPrice) ||
      isEmpty(productDiscount)||
      isEmpty(productQuantity)
    ) {
      setClientSideError("All fields are required");
    } else {
      const formData = new FormData();
      formData.append("productImage", productImage);
      formData.append("productName", productName);
      formData.append("productDesc", productDesc);
      formData.append("productPrice", productPrice);
      formData.append("productDiscount", productDiscount);
      formData.append("productLatitude", productLatitude);
      formData.append("productLongitude", productLongitude);
      formData.append("productQuantity", productQuantity);

      console.log("formData", formData);
      console.log("productData", productData);
      // dispatch(createProduct(formData));
      addLeftOverFood(formData).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
      setProductData({
        productImage: null,
        productName: "",
        productDesc: "",
        productPrice: "",
        productDiscount: "",
        productLatitude:null,
        productLongitude:null,
        productQuantity: "",
      });
    }
  };
  return (
    <div>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <form onSubmit={submitProduct}>
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">Add LeftOver Food</h5>
            </div>
            <div className="modal-body my-3">
              {clientSideError && showErrorMsg(clientSideError)}
              {errorMsg && showErrorMsg(errorMsg)}
              {successMsg && showSuccessMsg(successMsg)}
              {loading && <div className="text-center">{showLoading()}</div>}
              <div className="mb-2">
                {/* <label className='text-secondary'>Upload File</label> */}
                <input
                  name="productImage"
                  onChange={handleProductImage}
                  type="file"
                  className="form-control"
                  placeholder="Upload"
                />
              </div>
              <div className="mb-2">
                <input
                  name="productName"
                  onChange={handleProductChange}
                  value={productName}
                  type="text"
                  className="form-control"
                  placeholder="Name Of Food"
                />
              </div>
              <div className="mb-2">
                <textarea
                  name="productDesc"
                  onChange={handleProductChange}
                  value={productDesc}
                  rows="4"
                  placeholder="Description"
                  className="form-control"
                ></textarea>
              </div>
              <div className="mb-2">
                <input
                  name="productPrice" 
                  placeholder="Price"
                  onChange={handleProductChange}
                  value={productPrice}
                  type="number"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <input
                  name="productDiscount"
                  placeholder="Discount Percentage"
                  onChange={handleProductChange}
                  value={productDiscount}
                  type="number"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <input
                  name="productLatitude"
                  placeholder="product Latitude"
                  onChange={handleProductChange}
                  value={productLatitude}
                  type="number"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <input
                  name="productLongitude"
                  placeholder="Product Longitude"
                  onChange={handleProductChange}
                  value={productLongitude}
                  type="number"
                  className="form-control"
                />
              </div>
              <div>
                <input
                  name="productQuantity"
                  value={productQuantity}
                  onChange={handleProductChange}
                  placeholder="Quantity"
                  type="number"
                  min={0}
                  className="form-control"
                />
              </div>
            </div>
            <div className="modal-footer">
              {/* <Button
                onClick={closeBtn}
                variant="text"
                className="close"
                color="secondary"
                data-bs-dismiss="modal"
              >
                Close
              </Button> */}
              <Button type="submit" variant="text">
                Add
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeftOverModal;
