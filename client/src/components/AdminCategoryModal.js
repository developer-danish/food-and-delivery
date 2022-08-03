import React, { useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import { Button } from '@mui/material';
import { showErrorMsg, showSuccessMsg } from './../helpers/message';
import { showLoading } from './../helpers/loading';
import { createCategory } from './../api/category';

const AdminCategoryModal = () => {

    const [category, setCategory] = useState("");

    const [message, setMessage] = useState({
        errorMsg: "",
        successMsg: "",
        loading: false
    });

    const { errorMsg, successMsg, loading } = message;

    const submitCategory = (e) => {
        console.log(category);
        const data = { category };
        if (!isEmpty(category)) {
            setMessage({
                ...message,
                loading: true
            })
            createCategory(data)
                .then((response) => {
                    console.log(response);
                    setCategory("");
                    setMessage({
                        ...message,
                        loading: false,
                        successMsg: response.data.successMessage
                    })
                })
                .catch((err) => {
                    console.log(err);
                    setMessage({
                        ...message,
                        loading: false,
                        errorMsg: err.response.data.errorMessage
                    })
                });

        }
        else {
            setMessage({
                ...message,
                errorMsg: "empty field"
            })
        }

    };

    const onChangeInput = (e) => {
        setCategory(e.target.value);
        setMessage(
          {
            errorMsg: "",
            successMsg: "",
            loading: false
          }
        )
      }

      const closeBtn = () => {
        setCategory("");
        setMessage({
          errorMsg: "",
          successMsg: "",
          loading: false
        })
    
      }

    return (
        <>
            <div id='addCategoryModal' className='modal'>
                <div className='modal-dialog modal-dialog-centered modal-lg'>
                    <div className='modal-content'>
                        <div className='modal-header bg-info text-white'>
                            <h5 className='modal-title'>Add Category</h5>
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
                            <form>
                                <label className='text-secondary'>Category</label>
                                <input onChange={onChangeInput} value={category} type='text' className='form-control' />
                            </form>
                        </div>
                        <div className='modal-footer'>
                            <Button onClick={closeBtn} variant="text" className='close' color="secondary" data-bs-dismiss='modal'>
                                Close
                            </Button>
                            <Button onClick={() => submitCategory()} variant="text" >Add</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AdminCategoryModal;