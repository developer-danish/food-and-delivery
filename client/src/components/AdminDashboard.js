import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../helpers/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { createCategory } from '../api/category';
import isEmpty from 'validator/lib/isEmpty';
import { showErrorMsg, showSuccessMsg } from './../helpers/message';
import { showLoading } from './../helpers/loading';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const [message, setMessage] = useState({
    errorMsg: "",
    successMsg: "",
    loading: false
  });

  const { errorMsg, successMsg, loading } = message;

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      //For admin
      navigate('/admin/dashboard');
    }
    else if (isAuthenticated() && isAuthenticated().role === 0) {
      //For user
      navigate('/user/dashboard');
    }
    else {
      navigate('/signin');
    }
  }, [navigate]);

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
            successMsg: "category created successfully"
          })
        })
        .catch((err) => {
          console.log(err);
          setMessage({
            ...message,
            loading: false,
            errorMsg:  err.response.data.errorMessage
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

  const closeBtn = () => {
    setCategory("");
    setMessage({
      errorMsg: "",
      successMsg: "",
      loading: false
    })

  }

  const showHeader = () => (
    <div className='bg-dark text-white py-4'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <h1>
              <i className='fas fa-home'></i> Admin Dashboard
            </h1>
          </div>
        </div>
      </div>
    </div>
  );

  const showActionBtns = () => (
    <div className='bg-light'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4 text-center py-3 my-1'>
            <Button data-bs-toggle='modal' data-bs-target='#addCategoryModal' size="large" variant="outlined">
              <i className='fas fa-plus'></i>  Add Category
            </Button>
          </div>

          <div className='col-md-4 text-center py-3 my-1'>
            <Button size="large" variant="outlined">
              <i className='fas fa-plus'></i> Add Food
            </Button>
          </div>

          <div className='col-md-4 text-center py-3 my-1'>
            <Button size="large" variant="outlined">View Orders</Button>
          </div>

        </div>
      </div>
    </div>
  );

  const showCategoryModal = () => (
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
  );

  return (
    <section>
      {showHeader()}
      {showActionBtns()}
      {showCategoryModal()}
    </section>
  )
}

export default AdminDashboard
