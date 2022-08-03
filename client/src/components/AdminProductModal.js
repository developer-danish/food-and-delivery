import React, { useEffect, useState } from 'react';
import { readCategory } from '../api/category';
import { Button } from '@mui/material';
import isEmpty from 'validator/lib/isEmpty';
import { addNewFood } from './../api/food';
import { showErrorMsg, showSuccessMsg } from './../helpers/message';
import { showLoading } from './../helpers/loading';

const AdminProductModal = () => {
    const [categoryValues, setCategoryValues] = useState([]);

    const [productData, setProductData] = useState({
        productImage: null,
        productName: '',
        productDesc: '',
        productPrice: '',
        productCategory: '',
        productQuantity: ''
    });

    const { productImage, productName, productDesc, productPrice, productCategory, productQuantity } = productData;

    const [message, setMessage] = useState({
        errorMsg: "",
        successMsg: "",
        loading: false
    });

    const { errorMsg, successMsg, loading } = message;

    useEffect(() => {
        readcategory();
      }, [loading]);

    //reading category values ..........
  const readcategory = () => {
    readCategory()
      .then((res) => {
        setCategoryValues(res.data.categories);
      })
      .catch(err => {
        console.log("read category error");
      })
  }

      const closeBtn = () => {
        setMessage({
          errorMsg: "",
          successMsg: "",
          loading: false
        })
    
      }

      const handleProductImage = (evt) => {
        setProductData({
          ...productData,
          [evt.target.name]: evt.target.files[0],
        })
        setMessage(
          {
            errorMsg: "",
            successMsg: "",
            loading: false
          }
        )
      }
    
      const handleProductChange = (evt) => {
        setProductData({
          ...productData,
          [evt.target.name]: evt.target.value
        })
        setMessage(
          {
            errorMsg: "",
            successMsg: "",
            loading: false
          }
        )
      }

      const submitProduct = (e) => {
        e.preventDefault();
        // console.log(productData);
        if (productImage === null || isEmpty(productName) || isEmpty(productCategory) || isEmpty(productDesc) || isEmpty(productPrice) || isEmpty(productQuantity)) {
          setMessage({
            ...message,
            errorMsg: "All Fields are required."
          });
        } else {
          setMessage({
            ...message,
            loading: true
          });
          // const foodData = {productImage, productName, productCategory, productDesc, productPrice, productQuantity};
          const formData = new FormData();
          formData.append('productImage', productImage);
          formData.append('productName', productName);
          formData.append('productDesc', productDesc);
          formData.append('productPrice', productPrice);
          formData.append('productCategory', productCategory);
          formData.append('productQuantity', productQuantity);
          //sending data to server
          addNewFood(formData)
            .then((response) => {
              setMessage({
                ...message,
                successMsg: response.data.successMessage,
                loading: false
              });
              setProductData({
                productImage: null,
                productName: '',
                productDesc: '',
                productPrice: '',
                productCategory: '',
                productQuantity: ''
              })
            }).catch((err) => {
              setMessage({
                ...message,
                errorMsg: err.response.data.errorMessage,
                loading: false
              });
            });
    
          console.log(productData);
        }
      }
    return (
        <div id='addFoodModal' className='modal'>
            <div className='modal-dialog modal-dialog-centered modal-lg'>
                <div className='modal-content'>
                    <form onSubmit={submitProduct} >
                        <div className='modal-header bg-info text-white'>
                            <h5 className='modal-title'>Add New Food</h5>
                            <Button onClick={closeBtn} size="large" variant="text" className='close' data-bs-dismiss='modal'>
                                <span><i className='fas text-black fa-times'></i></span>
                            </Button>
                        </div>
                        <div className='modal-body my-3'>
                            {
                                errorMsg && showErrorMsg(errorMsg)
                            }
                            {
                                successMsg && showSuccessMsg(successMsg)
                            }
                            {
                                loading && <div className='text-center'>{showLoading()}</div>
                            }
                            <div className='mb-2'>
                                {/* <label className='text-secondary'>Upload File</label> */}
                                <input name='productImage' onChange={handleProductImage} type='file' className='form-control' placeholder='Upload' />
                            </div>
                            <div className='mb-2'>
                                <input name='productName' onChange={handleProductChange} value={productName} type='text' className='form-control' placeholder='Name Of Food' />
                            </div>
                            <div className='mb-2'>
                                <textarea name='productDesc' onChange={handleProductChange} value={productDesc} rows="4" placeholder='Description' className="form-control" ></textarea>
                            </div>
                            <div className='mb-2'>
                                <input name='productPrice' placeholder='Price' onChange={handleProductChange} value={productPrice} type='number' className='form-control' />
                            </div>
                            <div className='mb-2'>
                                <select name='productCategory' onChange={handleProductChange} className='form-control' placeholder='Category'>
                                    <option defaultChecked value=" " >Choose any one</option>
                                    {
                                        categoryValues && categoryValues.map((data) => (
                                            <option key={data._id} value={data._id} >{data.category}</option>
                                        )
                                        )
                                    }

                                </select>
                            </div>
                            <div>
                                <input name='productQuantity' value={productQuantity} onChange={handleProductChange} placeholder='Quantity' type='number' min={0} className='form-control' />
                            </div>

                        </div>
                        <div className='modal-footer'>
                            <Button onClick={closeBtn} variant="text" className='close' color="secondary" data-bs-dismiss='modal'>
                                Close
                            </Button>
                            <Button type='submit' variant="text" >Add</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default AdminProductModal;